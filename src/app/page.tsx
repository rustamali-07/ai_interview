"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Mic,
  BarChart3,
  ArrowRight,
  Zap,
  Target,
  Trophy,
  Star,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  BookOpen,
  Users,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/Navbar";

const features = [
  {
    icon: Mic,
    title: "Real-Time Voice Interviews",
    desc: "Speak naturally with our AI interviewer powered by Gemini Multimodal Live API — just like a real interview.",
    tag: "core",
  },
  {
    icon: MessageSquare,
    title: "Live Transcription",
    desc: "Every word transcribed in real-time. Review your answers as the conversation unfolds.",
    tag: "core",
  },
  {
    icon: BarChart3,
    title: "Detailed Scoring",
    desc: "Get scored across 5 key dimensions with per-answer feedback and model answers.",
    tag: "core",
  },
  {
    icon: Target,
    title: "Role-Specific Questions",
    desc: "Tailored questions for 14+ job roles — from Software Engineer to Marketing Manager.",
    tag: "core",
  },
  {
    icon: Trophy,
    title: "Performance Tracking",
    desc: "Track progress with score trends, skill radar charts, and full interview history.",
    tag: "optional",
  },
  {
    icon: Sparkles,
    title: "AI-Generated Tips",
    desc: "Personalized improvement tips, model answers, and recommended resources after each interview.",
    tag: "optional",
  },
];

const roles = [
  { name: "Software Engineer", count: 50 },
  { name: "Product Manager", count: 40 },
  { name: "Data Scientist", count: 45 },
  { name: "UX Designer", count: 30 },
  { name: "DevOps Engineer", count: 35 },
  { name: "ML Engineer", count: 40 },
  { name: "Business Analyst", count: 35 },
  { name: "Marketing Manager", count: 25 },
  { name: "Frontend Developer", count: 45 },
  { name: "Backend Developer", count: 45 },
  { name: "Full Stack Developer", count: 50 },
  { name: "Cloud Architect", count: 30 },
  { name: "QA Engineer", count: 25 },
  { name: "System Design", count: 35 },
];

const faqs = [
  {
    q: "How does the AI interview work?",
    a: "Our AI interviewer uses Google Gemini's Multimodal Live API to conduct voice-based interviews. You speak naturally, and the AI responds with follow-up questions, just like a real interviewer. Everything is transcribed in real-time.",
  },
  {
    q: "What roles are supported?",
    a: "We support 14+ roles including Software Engineer, Product Manager, Data Scientist, ML Engineer, UX Designer, DevOps, and more. Each role has tailored questions across easy, medium, and hard difficulty levels.",
  },
  {
    q: "How is my interview scored?",
    a: "After each interview, our AI evaluates your answers across 5 dimensions: Technical Accuracy, Communication, Problem Solving, Relevance, and Depth. You receive an overall score plus per-answer breakdowns with model answers.",
  },
  {
    q: "Is it free to use?",
    a: "Yes! You can sign up for free and start practicing immediately. No credit card required.",
  },
  {
    q: "Can I review my past interviews?",
    a: "Absolutely. Your full interview history is saved with transcripts, scores, and feedback. You can track your progress over time with score trends and skill radar charts.",
  },
];

const stats = [
  { value: "14+", label: "Job Roles", icon: BookOpen },
  { value: "3", label: "Difficulty Levels", icon: GraduationCap },
  { value: "5", label: "Score Categories", icon: BarChart3 },
  { value: "Real-time", label: "AI Voice", icon: Mic },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-semibold text-slate-900">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 shrink-0 ml-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />

        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-medium text-blue-700 mb-6"
          >
            <Zap className="h-3 w-3" />
            Powered by Google Gemini
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            ONE STOP Platform For
            <br />
            <span className="text-blue-600">AI Interview Practice</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-base text-slate-500 leading-relaxed sm:text-lg"
          >
            Practice real voice interviews with an AI interviewer. Get live transcription,
            personalized roadmaps, detailed scoring, and free resources — all tailored to your target role.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 h-11 text-sm font-semibold shadow-sm"
              >
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 h-11 text-sm"
              >
                Explore Paths
              </Button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
                <stat.icon className="h-4 w-4 text-blue-600" />
                <p className="text-xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-b border-slate-100 bg-slate-50 py-6">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span><strong className="text-slate-900">Free Forever</strong> — No credit card required</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-300" />
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            <span>Built for <strong className="text-slate-900">students &amp; job seekers</strong></span>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-16 sm:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Everything you need to <span className="text-blue-600">land the job</span>
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto text-sm">
              A complete interview preparation platform built with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-slate-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                    <feat.icon className="h-4.5 w-4.5 text-blue-600" />
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold uppercase rounded ${
                      feat.tag === "core"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Preview Card */}
      <section className="py-16 sm:py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              See it in action
            </h2>
            <p className="mt-3 text-slate-500 text-sm">
              A realistic preview of the live interview experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden"
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 bg-slate-50">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-slate-400 font-mono">
                Live Interview — Software Engineer — Medium
              </span>
            </div>
            <div className="p-6 space-y-5">
              {/* AI Message */}
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-blue-600">AI Interviewer</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400">Question 3 of 10</span>
                  </div>
                  <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Tell me about a time you had to debug a particularly challenging issue in production. How did you approach it?
                    </p>
                  </div>
                </div>
              </div>

              {/* Waveform */}
              <div className="flex items-center gap-0.5 px-12 h-10">
                {Array.from({ length: 50 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full bg-blue-500/30"
                    animate={{
                      height: [
                        `${6 + Math.random() * 16}px`,
                        `${12 + Math.random() * 20}px`,
                        `${6 + Math.random() * 16}px`,
                      ],
                    }}
                    transition={{
                      duration: 0.8 + Math.random() * 0.4,
                      repeat: Infinity,
                      delay: i * 0.025,
                    }}
                    style={{ minHeight: "3px" }}
                  />
                ))}
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mic className="h-3.5 w-3.5 text-blue-600" />
                  <span className="font-mono">Recording...</span>
                </div>
                <span className="font-mono text-slate-400">12:34</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roles Grid */}
      <section className="py-16 sm:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Interview Preparation Sheet
            </h2>
            <p className="mt-3 text-slate-500 text-sm">
              Tailored question banks for every role — track your progress as you practice
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {roles.map((role, i) => {
              const progress = Math.floor(Math.random() * 60) + 10;
              return (
                <motion.div
                  key={role.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md hover:border-slate-300 transition-all cursor-default"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="text-sm font-semibold text-slate-900">{role.name}</h3>
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-700 rounded">
                      {role.count}+ Qs
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mb-1.5">{progress}% explored</div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-blue-600 h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.03 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              How it works
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Pick your role",
                desc: "Choose from 14+ job roles and select your difficulty level.",
              },
              {
                step: "2",
                title: "Practice live",
                desc: "Have a real-time voice conversation with your AI interviewer.",
              },
              {
                step: "3",
                title: "Get scored",
                desc: "Receive detailed feedback, scores, and tips to improve.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Frequently asked questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 bg-blue-600">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to practice?
            </h2>
            <p className="mt-3 text-blue-100 text-base">
              Sign up for free and start your first AI mock interview.
            </p>
            <ul className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-blue-100">
              {["Free to get started", "No credit card required", "14+ job roles"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                    {item}
                  </li>
                )
              )}
            </ul>
            <div className="mt-8">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 px-10 h-11 text-sm font-semibold shadow-sm"
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
      <footer className="border-t border-slate-200 bg-white px-4 py-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600">
              <Brain className="h-3 w-3 text-white" />
            </div>
            <span className="font-bold text-slate-600">MockAI</span>
          </div>
          <p>Powered by Google Gemini &bull; Built for students and job seekers</p>
        </div>
      </footer>
    </div>
  );
}
