"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestionTrackerProps {
  current: number;
  total: number;
  className?: string;
}

export function QuestionTracker({ current, total, className }: QuestionTrackerProps) {
  const progress = Math.min((current / total) * 100, 100);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-300">
          Question <span className="text-teal-400 font-bold">{Math.min(current + 1, total)}</span>{" "}
          of <span className="text-white font-bold">{total}</span>
        </span>
        <span className="text-slate-500">{Math.round(progress)}% complete</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Dots */}
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              i < current
                ? "bg-teal-500"
                : i === current
                ? "bg-violet-500 animate-pulse"
                : "bg-white/[0.06]"
            )}
          />
        ))}
      </div>
    </div>
  );
}
