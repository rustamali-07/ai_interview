"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Brain, LayoutDashboard, History, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/history", label: "History", icon: History },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0a0f1e]/80 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-violet-500 shadow-lg shadow-teal-500/20">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white tracking-tight">
              MockAI
            </span>
          </Link>

          {/* Nav links — only shown when signed in */}
          <SignedIn>
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === href
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </SignedIn>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-teal-500 to-violet-500 text-white border-0 hover:opacity-90"
                >
                  Get Started
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/interview/setup">
                <Button
                  size="sm"
                  className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-teal-500 to-violet-500 text-white border-0 hover:opacity-90"
                >
                  <Play className="h-3.5 w-3.5" />
                  New Interview
                </Button>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
