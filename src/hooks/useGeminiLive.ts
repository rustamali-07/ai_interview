"use client";

import { useRef, useCallback, useEffect } from "react";
import { GeminiLiveClient, GeminiLiveEventHandler } from "@/lib/gemini-live";
import { useInterviewStore } from "@/store/interviewStore";
import { InterviewSetup, TranscriptEntry } from "@/types";
import { useTranscript } from "./useTranscript";
import { useAudioCapture } from "./useAudioCapture";

export function useGeminiLive(setup: InterviewSetup | null) {
  const clientRef = useRef<GeminiLiveClient | null>(null);

  const setConnected = useInterviewStore((s) => s.setConnected);
  const setSpeaking = useInterviewStore((s) => s.setSpeaking);
  const incrementQuestion = useInterviewStore((s) => s.incrementQuestion);

  const { addAIText, flushAIText, addUserText } = useTranscript();

  const handleEvent: GeminiLiveEventHandler = useCallback(
    (event) => {
      switch (event.type) {
        case "connected":
          break;
        case "setup_complete":
          setConnected(true);
          setSpeaking(true);
          break;
        case "transcript":
          if (event.speaker === "ai") {
            addAIText(event.text);
          } else {
            addUserText(event.text);
          }
          break;
        case "turn_complete":
          flushAIText();
          setSpeaking(false);
          break;
        case "interrupted":
          setSpeaking(false);
          break;
        case "error":
          console.error("Gemini Live error:", event.error);
          setConnected(false);
          break;
        case "closed":
          setConnected(false);
          setSpeaking(false);
          break;
      }
    },
    [setConnected, setSpeaking, addAIText, flushAIText, addUserText, incrementQuestion]
  );

  const { startCapture, stopCapture, getAnalyser } = useAudioCapture((chunk) => {
    clientRef.current?.sendAudioChunk(chunk);
  });

  const connect = useCallback(async () => {
    if (!setup) return;

    try {
      const res = await fetch("/api/gemini/token", { method: "POST" });
      const { apiKey, error } = await res.json();
      if (error || !apiKey) throw new Error(error || "No API key");

      const client = new GeminiLiveClient(apiKey, setup, handleEvent);
      clientRef.current = client;
      await client.connect();

      // Start mic after connection
      await startCapture();
    } catch (err) {
      console.error("Failed to connect:", err);
      throw err;
    }
  }, [setup, handleEvent, startCapture]);

  const disconnect = useCallback(() => {
    stopCapture();
    clientRef.current?.disconnect();
    clientRef.current = null;
    setConnected(false);
    setSpeaking(false);
  }, [stopCapture, setConnected, setSpeaking]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connect,
    disconnect,
    getAnalyser,
    client: clientRef,
  };
}
