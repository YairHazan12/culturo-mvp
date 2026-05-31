"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useApp } from "@/lib/AppContext";
import {
  Country,
  Experience,
  Market,
  OnboardingAnswers,
  Purpose,
  Team,
} from "@/lib/types";
import { cls } from "@/lib/utils";

type StepKey = "country" | "market" | "role" | "purpose" | "experience" | "review";

const COUNTRIES: { value: Country; label: string; flag: string }[] = [
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "ca", label: "Canada", flag: "🇨🇦" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "de", label: "Germany", flag: "🇩🇪" },
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "au", label: "Australia", flag: "🇦🇺" },
  { value: "other", label: "Other", flag: "🌍" },
];

const MARKETS: { value: Market; label: string; flag: string; active: boolean }[] = [
  { value: "CN", label: "China", flag: "🇨🇳", active: true },
  { value: "JP", label: "Japan", flag: "🇯🇵", active: false },
  { value: "KR", label: "South Korea", flag: "🇰🇷", active: false },
  { value: "IN", label: "India", flag: "🇮🇳", active: false },
  { value: "AE", label: "UAE", flag: "🇦🇪", active: false },
  { value: "DE", label: "Germany", flag: "🇩🇪", active: false },
  { value: "BR", label: "Brazil", flag: "🇧🇷", active: false },
];

const ROLES: { value: Team; label: string; hint: string }[] = [
  { value: "sales", label: "Sales", hint: "Account execs, BDRs, deal closers" },
  { value: "partnerships", label: "Partnerships", hint: "BD, alliances, co-sell" },
  { value: "procurement", label: "Procurement", hint: "Supply, vendor management" },
  { value: "executive", label: "Executive", hint: "C-suite, VPs, board" },
  { value: "operations", label: "Operations", hint: "Delivery, factory, logistics" },
  { value: "hr", label: "HR / L&D", hint: "Enablement, talent, training" },
];

const PURPOSES: { value: Purpose; label: string; hint: string; emoji: string }[] = [
  { value: "negotiation", label: "Upcoming negotiation", hint: "Terms on the table", emoji: "🤝" },
  { value: "first-meeting", label: "First client meeting", hint: "No margin for error", emoji: "👋" },
  { value: "supplier", label: "Supplier relationship", hint: "Ongoing, operational", emoji: "🏭" },
  { value: "partnership", label: "Partnership discussion", hint: "Long-term JV or alliance", emoji: "🌉" },
];

const EXPERIENCES: { value: Experience; label: string; hint: string }[] = [
  { value: "beginner", label: "Beginner", hint: "New to doing business here" },
  { value: "intermediate", label: "Intermediate", hint: "A few deals or trips in" },
  { value: "advanced", label: "Advanced", hint: "Seasoned, want the edge cases" },
];

const ORDER: StepKey[] = ["country", "market", "role", "purpose", "experience", "review"];

export default function OnboardingPage() {
  const router = useRouter();
  const { setOnboarding, onboarding: existing, hasOnboarded } = useApp();
  const [step, setStep] = useState<StepKey>("country");
  const [draft, setDraft] = useState<OnboardingAnswers>({
    country: "us",
    market: "CN",
    team: null,
    purpose: null,
    experience: null,
  });

  useEffect(() => {
    if (hasOnboarded) setDraft(existing);
  }, [hasOnboarded, existing]);

  const idx = ORDER.indexOf(step);
  const progress = ((idx + 1) / ORDER.length) * 100;

  function next() {
    const i = ORDER.indexOf(step);
    if (i < ORDER.length - 1) setStep(ORDER[i + 1]);
  }
  function back() {
    const i = ORDER.indexOf(step);
    if (i > 0) setStep(ORDER[i - 1]);
  }

  function finish() {
    setOnboarding(draft);
    router.push("/dashboard");
  }

  const canContinue =
    (step === "country" && draft.country !== null) ||
    (step === "market" && draft.market !== null) ||
    (step === "role" && draft.team !== null) ||
    (step === "purpose" && draft.purpose !== null) ||
    (step === "experience" && draft.experience !== null) ||
    step === "review";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper)]">
      <header className="border-b border-[var(--color-line)] bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/" className="text-xs text-navy-500 hover:text-navy-900">
            ← Back to home
          </Link>
        </div>
      </header>

      <div className="border-b border-[var(--color-line)] bg-white/60">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-3 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-navy-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-navy-900 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-navy-500 tabular-nums">
            Step {idx + 1} / {ORDER.length}
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14">
          <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
            Business onboarding · 60 seconds
          </div>

          {step === "country" && (
            <StepCard
              key="country"
              title="Where are you from?"
              subtitle="We calibrate the cultural distance between your home norms and your target market."
            >
              <Grid cols={2}>
                {COUNTRIES.map((c) => (
                  <Option
                    key={c.value}
                    label={c.label}
                    emoji={c.flag}
                    selected={draft.country === c.value}
                    onClick={() => setDraft({ ...draft, country: c.value })}
                  />
                ))}
              </Grid>
            </StepCard>
          )}

          {step === "market" && (
            <StepCard
              key="market"
              title="Where are you doing business?"
              subtitle="China is fully live. More markets are rolling out — we'll let you know the moment yours opens."
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {MARKETS.map((m) => (
                  <MarketOption
                    key={m.value}
                    market={m}
                    selected={draft.market === m.value}
                    onClick={() =>
                      m.active && setDraft({ ...draft, market: m.value })
                    }
                  />
                ))}
              </div>
            </StepCard>
          )}

          {step === "role" && (
            <StepCard
              key="role"
              title="What's your role?"
              subtitle="We tune your readiness score and module mix to how your team actually closes deals."
            >
              <Grid>
                {ROLES.map((r) => (
                  <Option
                    key={r.value}
                    label={r.label}
                    hint={r.hint}
                    selected={draft.team === r.value}
                    onClick={() => setDraft({ ...draft, team: r.value })}
                  />
                ))}
              </Grid>
            </StepCard>
          )}

          {step === "purpose" && (
            <StepCard
              key="purpose"
              title="What brings you here?"
              subtitle="The cultural signals that matter most depend on what you're walking into next."
            >
              <Grid>
                {PURPOSES.map((p) => (
                  <Option
                    key={p.value}
                    label={p.label}
                    hint={p.hint}
                    emoji={p.emoji}
                    selected={draft.purpose === p.value}
                    onClick={() => setDraft({ ...draft, purpose: p.value })}
                  />
                ))}
              </Grid>
            </StepCard>
          )}

          {step === "experience" && (
            <StepCard
              key="experience"
              title="How much experience do you have?"
              subtitle="We'll set the right starting depth — foundational primers or advanced edge cases."
            >
              <Grid cols={3}>
                {EXPERIENCES.map((e) => (
                  <Option
                    key={e.value}
                    label={e.label}
                    hint={e.hint}
                    selected={draft.experience === e.value}
                    onClick={() => setDraft({ ...draft, experience: e.value })}
                  />
                ))}
              </Grid>
            </StepCard>
          )}

          {step === "review" && (
            <StepCard
              key="review"
              title="You're ready."
              subtitle="We'll generate your China Deal Readiness score and a personalized first move."
            >
              <div className="exec-card p-5 grid sm:grid-cols-2 gap-4 animate-rise">
                <ReviewRow
                  label="From"
                  value={COUNTRIES.find((c) => c.value === draft.country)?.label}
                />
                <ReviewRow
                  label="Market"
                  value={MARKETS.find((m) => m.value === draft.market)?.label}
                />
                <ReviewRow label="Role" value={ROLES.find((r) => r.value === draft.team)?.label} />
                <ReviewRow
                  label="Purpose"
                  value={PURPOSES.find((p) => p.value === draft.purpose)?.label}
                />
                <ReviewRow
                  label="Experience"
                  value={EXPERIENCES.find((e) => e.value === draft.experience)?.label}
                />
              </div>
              <div className="mt-5 text-xs text-navy-500 leading-relaxed">
                Mock-data demo. No data leaves your browser.
              </div>
            </StepCard>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={back}
              disabled={idx === 0}
              className={cls(
                "text-sm px-4 py-2 rounded-md transition",
                idx === 0
                  ? "text-navy-300 cursor-not-allowed"
                  : "text-navy-700 hover:bg-white border border-transparent hover:border-navy-100"
              )}
            >
              ← Back
            </button>

            {step !== "review" ? (
              <button
                onClick={next}
                disabled={!canContinue}
                className={cls(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition",
                  canContinue
                    ? "bg-navy-900 text-white hover:bg-navy-800"
                    : "bg-navy-100 text-navy-400 cursor-not-allowed"
                )}
              >
                Continue
                <span aria-hidden>→</span>
              </button>
            ) : (
              <button
                onClick={finish}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm bg-red-warm text-white hover:bg-red-warm-dark transition shadow-lg shadow-red-warm/20"
              >
                Generate Deal Readiness Score
                <span aria-hidden>→</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StepCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-rise">
      <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-navy-900 tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm md:text-base text-navy-500 max-w-2xl leading-relaxed">
        {subtitle}
      </p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Grid({
  children,
  cols = 2,
}: {
  children: React.ReactNode;
  cols?: 2 | 3;
}) {
  return (
    <div
      className={cls(
        "grid gap-3",
        cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
      )}
    >
      {children}
    </div>
  );
}

function Option({
  label,
  hint,
  emoji,
  selected,
  onClick,
}: {
  label: string;
  hint?: string;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls(
        "text-left p-4 rounded-lg border transition-all duration-200",
        selected
          ? "bg-white border-navy-900 shadow-[0_0_0_3px_rgba(184,146,74,0.18)] -translate-y-0.5"
          : "bg-white border-[var(--color-line)] hover:border-navy-300 hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2.5 min-w-0">
          {emoji && <span className="text-xl leading-none">{emoji}</span>}
          <span className="text-sm font-medium text-navy-900">{label}</span>
        </span>
        <span
          className={cls(
            "w-4 h-4 rounded-full border-2 shrink-0 transition-all",
            selected ? "bg-navy-900 border-navy-900" : "border-navy-200"
          )}
        />
      </div>
      {hint && <div className="mt-1 text-xs text-navy-500">{hint}</div>}
    </button>
  );
}

function MarketOption({
  market,
  selected,
  onClick,
}: {
  market: { value: Market; label: string; flag: string; active: boolean };
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!market.active}
      className={cls(
        "relative text-left p-4 rounded-lg border transition-all duration-200 overflow-hidden",
        !market.active && "cursor-not-allowed opacity-70 bg-navy-50/40",
        market.active && selected
          ? "bg-white border-navy-900 shadow-[0_0_0_3px_rgba(184,146,74,0.18)] -translate-y-0.5"
          : market.active
          ? "bg-white border-[var(--color-line)] hover:border-navy-300 hover:-translate-y-0.5"
          : "border-[var(--color-line)]"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl leading-none">{market.flag}</span>
        <div className="min-w-0">
          <div className="text-sm font-medium text-navy-900">{market.label}</div>
          {market.active ? (
            <div className="text-[11px] text-emerald-700 font-medium">Live now</div>
          ) : (
            <div className="text-[11px] text-navy-400">On the roadmap</div>
          )}
        </div>
      </div>
      {!market.active && (
        <span className="absolute top-2 right-2 text-[9px] uppercase tracking-[0.14em] bg-navy-100 text-navy-600 rounded-full px-2 py-0.5">
          Coming soon
        </span>
      )}
      {market.active && selected && (
        <span className="absolute top-2 right-2 text-[9px] uppercase tracking-[0.14em] bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2 py-0.5">
          Selected
        </span>
      )}
    </button>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-navy-900">{value ?? "—"}</div>
    </div>
  );
}
