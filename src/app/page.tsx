"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Mic,
  BarChart3,
  Star,
  ArrowRight,
  Zap,
  Target,
  Trophy,
  Play,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/Navbar";

const features = [
  {
    icon: Mic,
    title: "Real-Time Voice Interviews",
    desc: "Speak naturally with our AI interviewer powered by Gemini Multimodal Live API. Just like a real interview.",
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
  },
  {
    icon: Zap,
    title: "Live Transcription",
    desc: "See every word transcribed in real-time. Review your answers as the conversation unfolds.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: BarChart3,
    title: "Detailed Scoring",
    desc: "Get scored across 5 key dimensions with specific per-answer feedback and model answers.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Target,
    title: "Role-Specific Questions",
    desc: "Tailored questions for 14+ job roles from Software Engineer to Marketing Manager.",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    icon: Trophy,
    title: "Performance Tracking",
    desc: "Track your progress over time with score trends, skill radar charts, and interview history.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Star,
    title: "AI-Generated Tips",
    desc: "Get personalized improvement tips, model answers, and recommended resources for each interview.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
];

const roles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "DevOps Engineer",
  "ML Engineer",
  "Business Analyst",
  "Marketing Manager",
];

const stats = [
  { value: "14+", label: "Job Roles" },
  { value: "3", label: "Difficulty Levels" },
  { value: "5", label: "Score Categories" },
  { value: "Real-time", label: "AI Voice" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16 pb-24 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/8 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-400/5 blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-medium text-teal-400 mb-8"
          >
            <Zap className="h-3 w-3" />
            Powered by Google Gemini Multimodal Live API
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Ace Your Next{" "}
            <span className="gradient-text">Interview</span>
            <br />
            with AI Practice
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed"
          >
            Practice real voice interviews with an AI interviewer. Get live transcription,
            detailed scoring, and personalized feedback — all tailored to your target job role.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-violet-500 text-white border-0 hover:opacity-90 px-8 h-12 text-base font-semibold shadow-lg shadow-teal-500/20"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Free Interview
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 px-8 h-12 text-base"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-display font-black text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mock interview card preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 mt-20 w-full max-w-2xl mx-auto"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3 bg-white/[0.02]">
              <div className="h-3 w-3 rounded-full bg-rose-500/60" />
              <div className="h-3 w-3 rounded-full bg-amber-500/60" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
              <span className="ml-2 text-xs text-slate-600 font-mono">Live Interview — Software Engineer</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500/30 to-violet-500/30 border border-teal-500/30 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-teal-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-teal-400">Alex</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                  </div>
                  <div className="rounded-xl rounded-tl-sm bg-white/[0.04] border border-white/[0.06] px-3.5 py-2.5">
                    <p className="font-mono text-xs text-slate-300">
                      Tell me about a time you had to debug a particularly challenging issue in production. How did you approach it?
                    </p>
                  </div>
                </div>
              </div>
              {/* Waveform mock */}
              <div className="flex items-center gap-1 px-12 h-10">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full bg-gradient-to-t from-teal-500/40 to-violet-500/40"
                    animate={{
                      height: [
                        `${8 + Math.random() * 20}px`,
                        `${16 + Math.random() * 24}px`,
                        `${8 + Math.random() * 20}px`,
                      ],
                    }}
                    transition={{
                      duration: 0.8 + Math.random() * 0.4,
                      repeat: Infinity,
                      delay: i * 0.03,
                    }}
                    style={{ minHeight: "4px" }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-mono">Question 3 of 10</span>
                <span className="font-mono">12:34</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
              Everything you need to{" "}
              <span className="gradient-text">land the job</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              A complete interview preparation platform built with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors group"
              >
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${feat.bg} mb-4`}
                >
                  <feat.icon className={`h-5 w-5 ${feat.color}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="px-4 py-16 sm:py-24 bg-white/[0.01] border-y border-white/[0.04]">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-black text-white mb-4">
              Roles we cover
            </h2>
            <p className="text-slate-400 mb-10">
              From engineering to business, we have tailored questions for your target role
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {roles.map((role, i) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-slate-300 hover:border-teal-500/30 hover:text-teal-300 transition-colors cursor-default"
              >
                {role}
              </motion.span>
            ))}
            <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm text-slate-500">
              + 6 more roles
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-black text-white sm:text-5xl">
              Ready to practice?
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Sign up for free and start your first AI mock interview in minutes.
            </p>
            <ul className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-400">
              {["Free to get started", "No credit card required", "14+ job roles"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-violet-500 text-white border-0 hover:opacity-90 px-10 h-12 text-base font-semibold shadow-lg shadow-teal-500/20"
                >
                  Start Practicing Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] px-4 py-8">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-teal-500/60" />
            <span className="font-display font-bold text-slate-500">MockAI</span>
          </div>
          <p>Powered by Google Gemini • Built for students and job seekers</p>
        </div>
      </footer>
    </div>
  );
}
