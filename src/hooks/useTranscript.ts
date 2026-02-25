"use client";

import { useState, useCallback, useRef } from "react";
import { TranscriptEntry } from "@/types";
import { useInterviewStore } from "@/store/interviewStore";

export function useTranscript() {
  const addTranscriptEntry = useInterviewStore((s) => s.addTranscriptEntry);
  const transcript = useInterviewStore((s) => s.transcript);
  const incrementQuestion = useInterviewStore((s) => s.incrementQuestion);

  const pendingAiText = useRef<string>("");
  const pendingUserText = useRef<string>("");

  const addAIText = useCallback(
    (text: string) => {
      pendingAiText.current += text;
      // Flush when we get a meaningful chunk (ends with sentence punctuation)
      if (/[.!?]\s*$/.test(pendingAiText.current) || pendingAiText.current.length > 200) {
        const entry: TranscriptEntry = {
          speaker: "ai",
          text: pendingAiText.current.trim(),
          timestamp: Date.now(),
        };
        addTranscriptEntry(entry);
        pendingAiText.current = "";
      }
    },
    [addTranscriptEntry]
  );

  const flushAIText = useCallback(() => {
    if (pendingAiText.current.trim()) {
      const entry: TranscriptEntry = {
        speaker: "ai",
        text: pendingAiText.current.trim(),
        timestamp: Date.now(),
      };
      addTranscriptEntry(entry);
      pendingAiText.current = "";
    }
  }, [addTranscriptEntry]);

  const addUserText = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const entry: TranscriptEntry = {
        speaker: "user",
        text: text.trim(),
        timestamp: Date.now(),
      };
      addTranscriptEntry(entry);
    },
    [addTranscriptEntry]
  );

  return {
    transcript,
    addAIText,
    flushAIText,
    addUserText,
  };
}
