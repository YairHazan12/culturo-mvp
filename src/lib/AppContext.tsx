"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { OnboardingAnswers, Role } from "./types";

interface AppState {
  role: Role;
  setRole: (r: Role) => void;
  onboarding: OnboardingAnswers;
  setOnboarding: (o: OnboardingAnswers) => void;
  readinessScore: number;
  hasOnboarded: boolean;
}

const DEFAULT_ONBOARDING: OnboardingAnswers = {
  country: "us",
  market: "CN",
  team: null,
  purpose: null,
  experience: null,
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("employee");
  const [onboarding, setOnboarding] = useState<OnboardingAnswers>(DEFAULT_ONBOARDING);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const r = localStorage.getItem("culturo:role");
      if (r === "admin" || r === "employee") setRole(r);
      const o = localStorage.getItem("culturo:onboarding");
      if (o) {
        const parsed = JSON.parse(o);
        setOnboarding(parsed);
      }
      const done = localStorage.getItem("culturo:onboarded");
      if (done) setHasOnboarded(done === "true");
    } catch {
      /* noop */
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem("culturo:role", role);
    } catch {}
  }, [role]);

  useEffect(() => {
    try {
      localStorage.setItem("culturo:onboarding", JSON.stringify(onboarding));
      localStorage.setItem("culturo:onboarded", String(hasOnboarded));
    } catch {}
  }, [onboarding, hasOnboarded]);

  const readinessScore = useMemo(() => {
    // Deterministic score derived from onboarding answers
    let s = 50;
    if (onboarding.team === "sales") s += 10;
    if (onboarding.team === "executive") s += 6;
    if (onboarding.team === "partnerships") s += 8;
    if (onboarding.team === "procurement") s += 9;
    if (onboarding.team === "operations") s += 4;
    if (onboarding.team === "hr") s += 5;

    if (onboarding.purpose === "negotiation") s += 4;
    if (onboarding.purpose === "first-meeting") s += 8;
    if (onboarding.purpose === "supplier") s += 5;
    if (onboarding.purpose === "partnership") s += 6;

    if (onboarding.experience === "beginner") s -= 10;
    if (onboarding.experience === "intermediate") s += 4;
    if (onboarding.experience === "advanced") s += 14;

    return Math.max(28, Math.min(94, s));
  }, [onboarding]);

  const value: AppState = {
    role,
    setRole: (r) => setRole(r),
    onboarding,
    setOnboarding: (o) => {
      setOnboarding(o);
      setHasOnboarded(true);
    },
    readinessScore,
    hasOnboarded,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside <AppProvider>");
  return ctx;
}
