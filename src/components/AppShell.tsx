"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/AppContext";
import { Logo } from "./Logo";
import { cls } from "@/lib/utils";

const employeeNav = [
  { href: "/dashboard", label: "Deal Readiness", icon: "dashboard" },
  { href: "/playbook", label: "China Deal Playbook", icon: "book" },
  { href: "/scenarios", label: "Scenario Simulator", icon: "play" },
  { href: "/coach", label: "AI Message Coach", icon: "message" },
];

const adminNav = [
  { href: "/admin", label: "Team Overview", icon: "team" },
  { href: "/admin/deals", label: "Deal Risk Map", icon: "map" },
  { href: "/admin/skills", label: "Skill Gaps", icon: "chart" },
  { href: "/admin/campaigns", label: "Campaigns", icon: "flag" },
];

function Icon({ name }: { name: string }) {
  const stroke = "currentColor";
  const sw = 1.6;
  switch (name) {
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <path d="M3 12a9 9 0 1 1 18 0" stroke={stroke} strokeWidth={sw} />
          <path d="M12 12l4-3" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.2" fill={stroke} />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <path d="M5 5h7v14H5z" stroke={stroke} strokeWidth={sw} />
          <path d="M12 5h7v14h-7" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "play":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth={sw} />
          <path d="M10 9l5 3-5 3V9z" fill={stroke} />
        </svg>
      );
    case "message":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <path d="M4 6h16v10H8l-4 4V6z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <circle cx="9" cy="9" r="3" stroke={stroke} strokeWidth={sw} />
          <path d="M3 19c0-3 3-5 6-5s6 2 6 5" stroke={stroke} strokeWidth={sw} />
          <circle cx="17" cy="8" r="2.4" stroke={stroke} strokeWidth={sw} />
          <path d="M15 19c0-2 2-3.5 4-3.5s2 1 2 3.5" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "map":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M9 4v14M15 6v14" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <path d="M4 20V8M10 20v-6M16 20V4M22 20H2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "flag":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <path d="M5 21V4h12l-2 4 2 4H5" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, setRole } = useApp();
  const nav = role === "admin" ? adminNav : employeeNav;

  return (
    <div className="flex min-h-screen w-full bg-[var(--color-paper)]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-navy-900 text-white relative">
        <div className="p-5 border-b border-white/10">
          <Logo light />
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cls(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 mb-2">
              Role view
            </div>
            <div className="flex rounded-md bg-white/5 p-1 text-xs">
              <button
                onClick={() => setRole("employee")}
                className={cls(
                  "flex-1 px-2 py-1.5 rounded-md transition",
                  role === "employee" ? "bg-white text-navy-900 font-medium" : "text-white/70"
                )}
              >
                Employee
              </button>
              <button
                onClick={() => setRole("admin")}
                className={cls(
                  "flex-1 px-2 py-1.5 rounded-md transition",
                  role === "admin" ? "bg-white text-navy-900 font-medium" : "text-white/70"
                )}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-md bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gold-soft text-navy-900 grid place-items-center text-xs font-semibold">
              JM
            </div>
            <div className="text-xs leading-tight">
              <div className="font-medium text-white">Jordan Mitchell</div>
              <div className="text-white/60">
                {role === "admin" ? "L&D Lead, Globex Co." : "Sr. Account Exec"}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="border-b border-[var(--color-line)] bg-white/80 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-3 px-4 md:px-8 h-14">
            <div className="md:hidden">
              <Logo />
            </div>
            <div className="flex items-center gap-2 text-xs text-navy-500">
              <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-navy-50 border border-navy-100">
                <span className="w-1.5 h-1.5 rounded-full bg-red-warm" />
                Market: <span className="font-medium text-navy-900">China 🇨🇳</span>
              </span>
              <span className="hidden md:inline text-navy-400">/</span>
              <span className="hidden md:inline">Globex Co.</span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/onboarding"
                className="hidden md:inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-[var(--color-line)] text-navy-700 hover:bg-navy-50"
              >
                Update business context
              </Link>
              <button className="relative p-2 rounded-md hover:bg-navy-50">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-navy-700" fill="none">
                  <path
                    d="M6 8a6 6 0 1 1 12 0v4l2 3H4l2-3V8z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-warm border border-white" />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile nav strip */}
        <div className="md:hidden flex overflow-x-auto px-3 py-2 gap-1 border-b border-[var(--color-line)] bg-white">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cls(
                  "shrink-0 px-3 py-1.5 text-xs rounded-md border",
                  active
                    ? "bg-navy-900 text-white border-navy-900"
                    : "border-[var(--color-line)] text-navy-700"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <main className="flex-1 px-4 md:px-8 py-6 md:py-8 min-w-0">{children}</main>

        <footer className="px-4 md:px-8 py-4 text-[11px] text-navy-400 border-t border-[var(--color-line)]">
          Culturo — Cultural intelligence for global business. All scenarios and signals are
          illustrative and adapted from established cross-cultural research.
        </footer>
      </div>
    </div>
  );
}
