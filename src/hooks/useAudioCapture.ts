"use client";

import { useRef, useCallback, useEffect } from "react";
import { useInterviewStore } from "@/store/interviewStore";
import { floatTo16BitPCM, arrayBufferToBase64 } from "@/lib/audio-processor";

const TARGET_SAMPLE_RATE = 16000;
const CHUNK_DURATION_MS = 100; // send audio every 100ms

export function useAudioCapture(onAudioChunk: (float32: Float32Array) => void) {
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);

  const setListening = useInterviewStore((s) => s.setListening);
  const setAudioLevel = useInterviewStore((s) => s.setAudioLevel);

  const startCapture = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: TARGET_SAMPLE_RATE,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      streamRef.current = stream;

      const audioContext = new AudioContext({ sampleRate: TARGET_SAMPLE_RATE });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);

      // Analyser for waveform visualization
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      source.connect(analyser);

      // ScriptProcessor for sending chunks
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const float32 = new Float32Array(inputData);
        onAudioChunk(float32);
      };

      // Audio level animation
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
        setAudioLevel(avg / 255);
        animFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();

      setListening(true);
    } catch (err) {
      console.error("Mic capture error:", err);
      throw err;
    }
  }, [onAudioChunk, setListening, setAudioLevel]);

  const stopCapture = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setListening(false);
    setAudioLevel(0);
  }, [setListening, setAudioLevel]);

  const getAnalyser = useCallback(() => analyserRef.current, []);

  useEffect(() => {
    return () => {
      stopCapture();
    };
  }, [stopCapture]);

  return { startCapture, stopCapture, getAnalyser };
}
