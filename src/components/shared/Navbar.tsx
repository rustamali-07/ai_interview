"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Brain, LayoutDashboard, History, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/interview/setup", label: "Practice", icon: Play },
  { href: "/history", label: "History", icon: History },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
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
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    pathname === href
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
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
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Get Started
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/interview/setup">
                <Button
                  size="sm"
                  className="hidden sm:flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
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
    </header>
  );
}
