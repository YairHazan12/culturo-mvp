"use client";

import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/AppContext";
import { ReadinessScoreCard } from "@/components/ReadinessScoreCard";
import { RiskIndicator } from "@/components/RiskIndicator";
import { Section, KpiTile } from "@/components/Section";
import { PlaybookModuleCard } from "@/components/PlaybookModuleCard";
import { CultureExpansionCard } from "@/components/CultureExpansionCard";
import {
  SKILL_LABELS,
  conceptModules,
  cultures,
  playbook,
  scenarios,
  skillProgress,
} from "@/lib/mock";
import { RiskLevel, Skill } from "@/lib/types";
import { cls, scoreLabel } from "@/lib/utils";

const ROLE_LABEL: Record<string, string> = {
  sales: "sales",
  partnerships: "partnerships",
  procurement: "procurement",
  executive: "executive",
  operations: "operations",
  hr: "HR / L&D",
};

const PURPOSE_LABEL: Record<string, string> = {
  negotiation: "an upcoming negotiation",
  "first-meeting": "a first client meeting",
  supplier: "a supplier relationship",
  partnership: "a partnership discussion",
};

const EXPERIENCE_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

function riskFromScore(score: number): RiskLevel {
  if (score >= 80) return "low";
  if (score >= 65) return "moderate";
  if (score >= 50) return "elevated";
  return "high";
}

export default function DashboardPage() {
  const { onboarding, readinessScore } = useApp();
  const risk = riskFromScore(readinessScore);
  const weak = (Object.entries(skillProgress) as [Skill, number][])
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3);

  const upcoming = scenarios.slice(0, 2);

  const nextModule = playbook[1];

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
            Deal Readiness Dashboard
          </div>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900 tracking-tight">
            Good morning, Jordan.
          </h1>
          <p className="mt-1.5 text-sm text-navy-500 max-w-2xl">
            You&apos;re in {ROLE_LABEL[onboarding.team ?? "sales"]}, preparing for{" "}
            {PURPOSE_LABEL[onboarding.purpose ?? "negotiation"]} in China.
            Here&apos;s your readiness at a glance.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <ContextChip emoji="🇨🇳" label="Market: China" />
            <ContextChip
              emoji="🎯"
              label={`Focus: ${PURPOSE_LABEL[onboarding.purpose ?? "negotiation"].replace(/^an? /, "")}`}
            />
            <ContextChip
              emoji="📊"
              label={`Level: ${EXPERIENCE_LABEL[onboarding.experience ?? "intermediate"]}`}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/scenarios"
            className="inline-flex items-center gap-2 bg-navy-900 text-white text-sm px-4 py-2 rounded-md hover:bg-navy-800 transition"
          >
            Start scenario practice
            <span aria-hidden>→</span>
          </Link>
          <button className="text-sm px-4 py-2 rounded-md border border-navy-200 text-navy-700 hover:bg-white">
            Export briefing
          </button>
        </div>
      </div>

      {/* Top row: score + risk + next action */}
      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <ReadinessScoreCard score={readinessScore} delta={+6} />

        <div className="exec-card p-5 md:p-6 flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
              Current cultural risk
            </div>
            <div className="mt-2 flex items-center gap-3">
              <RiskIndicator level={risk} />
              <span className="text-sm text-navy-700">on the active deal</span>
            </div>
            <p className="mt-3 text-sm text-navy-700 leading-relaxed">
              {risk === "high" &&
                "Your timeline and communication style are likely to be read as pressure. Two practice rounds before Thursday recommended."}
              {risk === "elevated" &&
                "A few cultural signals are not yet aligned with how your counterpart operates. Targeted prep can close the gap."}
              {risk === "moderate" &&
                "You're in a workable position. Focus on follow-up tone and hierarchy signals."}
              {risk === "low" &&
                "Strong baseline. Maintain trust signals and keep the meeting cadence."}
            </p>
          </div>
          <div className="mt-4 hairline pt-4 grid grid-cols-3 gap-2 text-center">
            <Mini label="Hierarchy" v={skillProgress.hierarchy} />
            <Mini label="Face" v={skillProgress["saving-face"]} />
            <Mini label="Signals" v={skillProgress["negotiation-signals"]} />
          </div>
        </div>

        <div className="exec-card p-5 md:p-6 relative overflow-hidden">
          <span className="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 rounded-full bg-red-warm/10" />
          <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
            Next recommended action
          </div>
          <div className="mt-2 flex items-start gap-3">
            <div className="w-9 h-9 rounded-md bg-red-warm text-white grid place-items-center text-xs animate-pulse-ring">
              01
            </div>
            <div>
              <div className="text-sm font-semibold text-navy-900">
                Practice: &quot;{scenarios[0].title}&quot;
              </div>
              <div className="text-xs text-navy-500 mt-0.5">
                Reframe a CEO-driven deadline without breaking the relationship.
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href={`/scenarios/${scenarios[0].id}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 border-b border-gold pb-0.5"
            >
              Run scenario — 4 min
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-5 hairline pt-4">
            <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
              Then study
            </div>
            <Link
              href={`/playbook/${nextModule.slug}`}
              className="mt-1.5 text-sm text-navy-900 hover:text-red-warm flex items-center justify-between"
            >
              <span>{nextModule.title}</span>
              <span className="text-navy-500 text-xs">{nextModule.minutes} min</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <KpiTile
          label="Modules complete"
          value="4 / 10"
          delta={{ dir: "up", text: "+2 this week" }}
          accent="navy"
        />
        <KpiTile
          label="Scenarios run"
          value={11}
          delta={{ dir: "up", text: "+5 this week" }}
          hint="Avg. score 76"
          accent="gold"
        />
        <KpiTile
          label="Avg. message risk"
          value="Low"
          delta={{ dir: "down", text: "vs. last week" }}
          hint="Across 8 drafted emails"
          accent="emerald"
        />
        <KpiTile
          label="Days to Friday call"
          value={3}
          accent="red"
          hint="Shenzhen Mfg. Group · $4.2M"
        />
      </div>

      {/* Two-col: skills + upcoming scenarios */}
      <div className="grid lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          <Section
            eyebrow="Progress by skill"
            title="Where you're strong, where to focus"
            description="Tracked against business outcomes — not vocabulary."
          >
            <div className="exec-card divide-y divide-[var(--color-line)]">
              {(Object.entries(skillProgress) as [Skill, number][]).map(
                ([skill, pct]) => (
                  <SkillRow key={skill} skill={skill} pct={pct} />
                )
              )}
            </div>
          </Section>
        </div>

        <div>
          <Section
            eyebrow="Upcoming"
            title="Scenarios recommended for you"
            description="Aligned to your current deal stage."
          >
            <div className="space-y-3">
              {upcoming.map((s) => (
                <Link
                  key={s.id}
                  href={`/scenarios/${s.id}`}
                  className="exec-card block group hover:border-navy-300 transition overflow-hidden"
                >
                  <div className="relative aspect-[16/9] bg-navy-50 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em]">
                      <span className="text-red-warm font-medium">
                        {s.difficulty}
                      </span>
                      <span className="text-navy-400">{s.industry}</span>
                    </div>
                    <div className="mt-2 text-sm font-medium text-navy-900 leading-snug">
                      {s.title}
                    </div>
                    <div className="mt-2 text-xs text-navy-500 line-clamp-2">
                      {s.setup}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-navy-500">
                        Skill: {SKILL_LABELS[s.skill]}
                      </span>
                      <span className="text-navy-900 group-hover:text-red-warm font-medium">
                        Run →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Section>

          <Section
            eyebrow="Top weak areas"
            title="Where the deal is at risk"
            description="Two weeks of prep can move readiness 12 points."
          >
            <div className="exec-card divide-y divide-[var(--color-line)]">
              {weak.map(([skill, pct]) => (
                <div key={skill} className="flex items-center justify-between p-3">
                  <div>
                    <div className="text-sm font-medium text-navy-900">
                      {SKILL_LABELS[skill]}
                    </div>
                    <div className="text-[11px] text-navy-500">
                      Practiced {Math.floor(pct / 12)}× recently
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-semibold text-red-warm">
                      {pct}
                      <span className="text-[10px] text-navy-400 ml-0.5">/100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* Culture foundations */}
      <Section
        eyebrow="Start here"
        title="Culture Foundations"
        description="Two quick visual primers before you dive into scenarios."
        action={
          <Link
            href="/playbook"
            className="text-sm text-navy-700 hover:text-navy-900 border-b border-navy-200"
          >
            All modules →
          </Link>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {conceptModules.map((m) => (
            <Link
              key={m.slug}
              href={`/modules/${m.slug}`}
              className="exec-card card-lift p-5 flex items-center gap-4 group"
            >
              <div className="relative w-14 h-14 shrink-0">
                <Image
                  src={m.image}
                  alt={m.imageAlt}
                  fill
                  sizes="56px"
                  className="object-cover rounded-xl"
                />
                <span
                  className={cls(
                    "absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg grid place-items-center text-sm border-2 border-white",
                    m.accent === "red" ? "bg-red-warm-soft" : "bg-gold-soft"
                  )}
                >
                  {m.emoji}
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-navy-900 group-hover:text-red-warm">
                  {m.title}
                </div>
                <div className="text-xs text-navy-500 mt-0.5 line-clamp-1">
                  {m.subtitle}
                </div>
                <div className="text-[11px] text-navy-400 mt-1">{m.minutes} min · visual primer</div>
              </div>
              <span aria-hidden className="ml-auto text-navy-400 group-hover:text-red-warm">→</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Playbook strip */}
      <Section
        eyebrow="China Deal Playbook"
        title="Continue your modules"
        description="Short, business-first. Each ends with a real practice scenario."
        action={
          <Link
            href="/playbook"
            className="text-sm text-navy-700 hover:text-navy-900 border-b border-navy-200"
          >
            See all 10 →
          </Link>
        }
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playbook.slice(0, 3).map((m, i) => (
            <PlaybookModuleCard
              key={m.slug}
              module={m}
              index={i}
              progress={[100, 60, 25][i] ?? 0}
            />
          ))}
        </div>
      </Section>

      {/* Global expansion strip */}
      <Section
        eyebrow="Coming next"
        title="Global expansion"
        description="China is live. These six markets are next on the roadmap."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cultures.slice(0, 4).map((c) => (
            <CultureExpansionCard key={c.code} culture={c} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function ContextChip({ emoji, label }: { emoji: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-white border border-[var(--color-line)] text-navy-700">
      <span aria-hidden>{emoji}</span>
      {label}
    </span>
  );
}

function Mini({ label, v }: { label: string; v: number }) {
  return (
    <div>
      <div className="text-base font-semibold text-navy-900 tabular-nums">{v}</div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-navy-500 mt-0.5">
        {label}
      </div>
    </div>
  );
}

function SkillRow({ skill, pct }: { skill: Skill; pct: number }) {
  return (
    <div className="grid grid-cols-12 gap-3 items-center p-3">
      <div className="col-span-4">
        <div className="text-sm font-medium text-navy-900">
          {SKILL_LABELS[skill]}
        </div>
        <div className="text-[11px] text-navy-500 mt-0.5">{scoreLabel(pct)}</div>
      </div>
      <div className="col-span-7">
        <div className="h-2 rounded-full bg-navy-100 overflow-hidden relative">
          <div
            className={cls(
              "h-full rounded-full",
              pct >= 70 ? "bg-emerald-500" : pct >= 50 ? "bg-gold" : "bg-red-warm"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="col-span-1 text-right text-sm font-medium text-navy-900 tabular-nums">
        {pct}
      </div>
    </div>
  );
}
