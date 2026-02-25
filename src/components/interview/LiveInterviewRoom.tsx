"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useInterviewStore } from "@/store/interviewStore";
import { useGeminiLive } from "@/hooks/useGeminiLive";
import { useInterviewSession } from "@/hooks/useInterviewSession";
import { AIAvatar } from "./AIAvatar";
import { MicVisualizer } from "./MicVisualizer";
import { TranscriptPanel } from "./TranscriptPanel";
import { QuestionTracker } from "./QuestionTracker";
import { Timer } from "./Timer";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Mic,
  MicOff,
  PhoneOff,
  Pause,
  ChevronRight,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LiveInterviewRoomProps {
  sessionId: string;
}

export function LiveInterviewRoom({ sessionId }: LiveInterviewRoomProps) {
  const router = useRouter();
  const { user } = useUser();
  const store = useInterviewStore();
  const { finalizeSession, abandonSession } = useInterviewSession();

  const [isConnecting, setIsConnecting] = useState(true);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);

  const setup = store.setup;
  const { connect, disconnect, getAnalyser } = useGeminiLive(setup);

  // Connect on mount
  useEffect(() => {
    const init = async () => {
      try {
        setIsConnecting(true);
        setConnectError(null);
        await connect();
        setIsConnecting(false);
      } catch (err: unknown) {
        setIsConnecting(false);
        const message = err instanceof Error ? err.message : "Failed to connect";
        setConnectError(message);
        toast.error(message);
      }
    };
    init();
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEndInterview = useCallback(async () => {
    setShowEndDialog(false);
    disconnect();
    await finalizeSession(sessionId);
  }, [disconnect, finalizeSession, sessionId]);

  const handleAbandon = useCallback(async () => {
    setShowEndDialog(false);
    disconnect();
    await abandonSession(sessionId);
  }, [disconnect, abandonSession, sessionId]);

  if (!setup) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0f1e]">
        <div className="text-center">
          <p className="text-slate-400">No interview setup found.</p>
          <Button className="mt-4" onClick={() => router.push("/interview/setup")}>
            Start New Interview
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0a0f1e] overflow-hidden">
      {/* Main interview area */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Live
              </span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-sm font-medium text-white">{setup.role}</span>
            <DifficultyBadge difficulty={setup.difficulty} />
            <span className="hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400">
              {setup.type}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Timer startTime={store.startTime} />
            <Button
              variant="ghost"
              size="sm"
              className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
              onClick={() => setShowEndDialog(true)}
            >
              <PhoneOff className="h-4 w-4 mr-1.5" />
              End
            </Button>
          </div>
        </div>

        {/* Center stage */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 py-10">
          {/* Connection loading */}
          <AnimatePresence>
            {isConnecting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0f1e]/90 z-10"
              >
                <Loader2 className="h-8 w-8 animate-spin text-teal-400 mb-4" />
                <p className="text-sm text-slate-400">Connecting to AI interviewer...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Connect error */}
          {connectError && (
            <div className="flex flex-col items-center gap-3 text-center">
              <AlertTriangle className="h-8 w-8 text-amber-400" />
              <p className="text-sm text-slate-400">{connectError}</p>
              <Button
                size="sm"
                onClick={async () => {
                  setConnectError(null);
                  setIsConnecting(true);
                  try {
                    await connect();
                    setIsConnecting(false);
                  } catch (err: unknown) {
                    setIsConnecting(false);
                    setConnectError(err instanceof Error ? err.message : "Failed to connect");
                  }
                }}
              >
                Retry Connection
              </Button>
            </div>
          )}

          {/* AI Avatar */}
          <AIAvatar
            isSpeaking={store.isSpeaking}
            isConnected={store.isConnected}
            className="h-44 w-44"
          />

          {/* Waveform */}
          <div className="w-full max-w-xs">
            <MicVisualizer
              analyser={getAnalyser()}
              className="h-16"
            />
          </div>

          {/* Question tracker */}
          <div className="w-full max-w-sm">
            <QuestionTracker
              current={store.questionIndex}
              total={setup.questionCount}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full border-2 transition-all",
                isMuted
                  ? "border-rose-500/60 bg-rose-500/10 text-rose-400"
                  : "border-white/20 bg-white/5 text-slate-400 hover:border-teal-500/40 hover:text-teal-400"
              )}
              onClick={() => setIsMuted((m) => !m)}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>

            <Button
              size="lg"
              className="rounded-full bg-rose-500 hover:bg-rose-600 text-white px-6 h-12"
              onClick={() => setShowEndDialog(true)}
            >
              <PhoneOff className="h-4 w-4 mr-2" />
              End Interview
            </Button>
          </div>

          {/* Scoring overlay */}
          <AnimatePresence>
            {store.isScoring && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0f1e]/95 z-20"
              >
                <div className="text-center space-y-4">
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className="h-16 w-16 rounded-full border-2 border-teal-500/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute">
                      <Loader2 className="h-6 w-6 text-teal-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Analyzing your performance...</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      Our AI is reviewing your interview responses
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Transcript sidebar */}
      <div className="hidden lg:flex w-80 flex-col border-l border-white/[0.06] bg-white/[0.02]">
        <TranscriptPanel transcript={store.transcript} className="flex-1" />
      </div>

      {/* End dialog */}
      <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <DialogContent className="bg-[#111827] border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>End Interview?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-400">
            Are you sure you want to end the interview? Your responses will be scored and feedback
            will be generated.
          </p>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleAbandon}
              className="border-white/10 text-slate-400 hover:text-white"
            >
              Abandon Session
            </Button>
            <Button
              onClick={handleEndInterview}
              className="bg-gradient-to-r from-teal-500 to-violet-500 text-white border-0"
            >
              <ChevronRight className="h-4 w-4 mr-1" />
              Get Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
