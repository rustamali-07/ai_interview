"use client";

import { useEffect, useRef } from "react";
import { useInterviewStore } from "@/store/interviewStore";
import { cn } from "@/lib/utils";

interface MicVisualizerProps {
  analyser: AnalyserNode | null;
  className?: string;
  barCount?: number;
}

export function MicVisualizer({ analyser, className, barCount = 32 }: MicVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isListening = useInterviewStore((s) => s.isListening);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (!analyser || !isListening) {
        // Idle state — subtle flat bars
        const barW = width / barCount - 2;
        for (let i = 0; i < barCount; i++) {
          const x = i * (barW + 2);
          const barH = 3;
          const y = height / 2 - barH / 2;
          ctx.fillStyle = "rgba(45, 212, 191, 0.2)";
          ctx.beginPath();
          ctx.roundRect(x, y, barW, barH, 2);
          ctx.fill();
        }
        return;
      }

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);

      const barW = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * dataArray.length);
        const value = dataArray[dataIndex] / 255;
        const barH = Math.max(3, value * height * 0.85);
        const x = i * (barW + 2);
        const y = height / 2 - barH / 2;

        // Gradient: teal → violet
        const gradient = ctx.createLinearGradient(x, y + barH, x, y);
        gradient.addColorStop(0, `rgba(45, 212, 191, ${0.4 + value * 0.6})`);
        gradient.addColorStop(1, `rgba(139, 92, 246, ${0.4 + value * 0.6})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, 2);
        ctx.fill();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [analyser, isListening, barCount]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={64}
      className={cn("w-full", className)}
    />
  );
}
