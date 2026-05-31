"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { scenarios, SKILL_LABELS, playbook } from "@/lib/mock";
import { RiskIndicator } from "@/components/RiskIndicator";
import { cls, scoreColor, scoreLabel } from "@/lib/utils";
import { RiskLevel } from "@/lib/types";

type Mode = "choose" | "custom";

interface Result {
  score: number;
  risk: RiskLevel;
  feedback: string;
  missed: string;
  optionId?: string;
  custom?: string;
}

function scoreCustom(text: string): Result {
  const t = text.toLowerCase().trim();
  let score = 60;
  const hits: string[] = [];

  const directWords = ["must", "need to", "ultimatum", "or else", "final", "deadline", "asap", "immediately"];
  const warmWords = ["thank", "honored", "appreciate", "together", "partnership", "relationship"];
  const facePhrases = ["help me understand", "would it be possible", "could we", "perhaps", "we understand"];
  const transactional = ["price", "discount", "vendor", "contract this week", "sign"];

  directWords.forEach((w) => {
    if (t.includes(w)) {
      score -= 10;
      hits.push(`Avoid "${w}" — reads as pressure.`);
    }
  });
  warmWords.forEach((w) => {
    if (t.includes(w)) {
      score += 6;
    }
  });
  facePhrases.forEach((p) => {
    if (t.includes(p)) {
      score += 6;
    }
  });
  transactional.forEach((w) => {
    if (t.includes(w)) {
      score -= 4;
      hits.push(`"${w}" frames the moment as transactional.`);
    }
  });

  if (t.length < 20) {
    score -= 15;
    hits.push("Response is too short for the moment.");
  }
  if (t.length > 600) {
    score -= 5;
    hits.push("Response is long — Chinese B2B prefers concise + warm.");
  }

  score = Math.max(15, Math.min(95, score));

  let risk: RiskLevel = "low";
  if (score < 80) risk = "moderate";
  if (score < 60) risk = "elevated";
  if (score < 40) risk = "high";

  return {
    score,
    risk,
    feedback:
      hits.length === 0
        ? "Strong response. Tone, framing, and pacing are aligned with Chinese B2B norms."
        : hits.join(" "),
    missed:
      score < 70
        ? "You're missing one of: (1) acknowledging the soft signal, (2) keeping a relationship frame, (3) proposing a concrete but face-saving next step."
        : "Minor polish opportunities — overall, well-framed.",
  };
}

function FeedbackPanel({
  result,
  scenario,
  onReset,
}: {
  result: Result;
  scenario: (typeof scenarios)[number];
  onReset: () => void;
}) {
  return (
    <div className="mt-6 space-y-4">
      <div className="exec-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-red-warm font-medium">
              Feedback
            </div>
            <h3 className="mt-1 text-xl font-semibold text-navy-900">
              {scoreLabel(result.score)}
            </h3>
          </div>
          <div className="text-right">
            <div className={cls("text-4xl font-semibold tabular-nums", scoreColor(result.score))}>
              {result.score}
            </div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
              / 100
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <RiskIndicator level={result.risk} />
          <span className="text-xs text-navy-500">
            cultural risk on this exchange
          </span>
        </div>

        <div className="mt-5 hairline pt-4 space-y-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
              What you did
            </div>
            <p className="mt-1.5 text-sm text-navy-700 leading-relaxed">
              {result.feedback}
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
              What you missed
            </div>
            <p className="mt-1.5 text-sm text-navy-700 leading-relaxed">
              {result.missed}
            </p>
          </div>
        </div>
      </div>

      <div className="exec-card p-6 relative overflow-hidden">
        <span className="absolute top-0 left-0 w-1 h-full bg-gold" />
        <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
          Better business response
        </div>
        <p className="mt-2 text-base md:text-lg font-serif text-navy-900 leading-relaxed">
          &ldquo;{scenario.bestResponse}&rdquo;
        </p>
        <div className="mt-4 hairline pt-3">
          <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
            Why this works
          </div>
          <p className="mt-1.5 text-sm text-navy-700 leading-relaxed">
            {scenario.bestResponseRationale}
          </p>
        </div>
      </div>

      <div className="exec-card p-5">
        <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
          Suggested follow-up
        </div>
        <p className="mt-1.5 text-sm text-navy-700 leading-relaxed">
          {scenario.followUp}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onReset}
          className="text-sm bg-navy-900 text-white px-4 py-2.5 rounded-md hover:bg-navy-800"
        >
          Try again
        </button>
        <Link
          href="/scenarios"
          className="text-sm border border-navy-200 px-4 py-2.5 rounded-md hover:bg-white text-navy-900"
        >
          Pick another scenario
        </Link>
        <Link
          href={`/playbook/${scenario.relatedModuleSlug}`}
          className="text-sm border border-navy-200 px-4 py-2.5 rounded-md hover:bg-white text-navy-900"
        >
          Open related module
        </Link>
      </div>
    </div>
  );
}

export default function ScenarioClient({ id }: { id: string }) {
  const scenarioMaybe = useMemo(() => scenarios.find((s) => s.id === id), [id]);
  if (!scenarioMaybe) notFound();
  const scenario = scenarioMaybe;

  const [mode, setMode] = useState<Mode>("choose");
  const [optionId, setOptionId] = useState<string | null>(null);
  const [custom, setCustom] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  function submitOption() {
    if (!optionId) return;
    const opt = scenario.options.find((o) => o.id === optionId);
    if (!opt) return;
    setResult({
      score: opt.score,
      risk: opt.risk,
      feedback: opt.feedback,
      missed:
        opt.score < 70
          ? "You missed the soft-no signal and the chance to reframe the moment around the relationship."
          : "You read the moment correctly — small refinements below.",
      optionId,
    });
  }

  function submitCustom() {
    if (!custom.trim()) return;
    setResult({ ...scoreCustom(custom), custom });
  }

  function reset() {
    setResult(null);
    setOptionId(null);
    setCustom("");
  }

  const relatedModule = playbook.find((m) => m.slug === scenario.relatedModuleSlug);

  return (
    <div>
      <div className="mb-4 text-xs text-navy-500 flex items-center gap-2">
        <Link href="/scenarios" className="hover:text-navy-900">
          Scenarios
        </Link>
        <span aria-hidden>›</span>
        <span className="text-navy-700">{scenario.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Setup card */}
          <div className="exec-card overflow-hidden">
            <div className="relative aspect-[2/1] md:aspect-[5/2] bg-navy-50 overflow-hidden">
              <Image
                src={scenario.image}
                alt={scenario.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                preload
                className="object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] uppercase tracking-[0.18em] text-red-warm font-medium">
                  {scenario.difficulty} · {scenario.industry}
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                  Skill: {SKILL_LABELS[scenario.skill]}
                </span>
              </div>
              <h1 className="mt-1 text-2xl font-semibold text-navy-900 tracking-tight">
                {scenario.title}
              </h1>
              <p className="mt-4 text-sm text-navy-700 leading-relaxed">
                {scenario.setup}
              </p>

              <div className="mt-5 relative pl-4 border-l-2 border-gold">
                <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                  Your counterpart says
                </div>
                <p className="mt-1 text-lg font-serif text-navy-900 leading-relaxed">
                  &ldquo;{scenario.partnerLine}&rdquo;
                </p>
              </div>

              <div className="mt-5 hairline pt-4 text-xs text-navy-500">
                <span className="font-medium text-navy-700">Context: </span>
                {scenario.context}
              </div>
            </div>
          </div>

          {/* Response section */}
          {!result && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-navy-900">
                  Your response
                </h2>
                <div className="flex rounded-md bg-navy-50 p-0.5 text-xs">
                  <button
                    onClick={() => setMode("choose")}
                    className={cls(
                      "px-3 py-1 rounded-md transition",
                      mode === "choose"
                        ? "bg-white text-navy-900 shadow-sm"
                        : "text-navy-600"
                    )}
                  >
                    Choose an option
                  </button>
                  <button
                    onClick={() => setMode("custom")}
                    className={cls(
                      "px-3 py-1 rounded-md transition",
                      mode === "custom"
                        ? "bg-white text-navy-900 shadow-sm"
                        : "text-navy-600"
                    )}
                  >
                    Write your own
                  </button>
                </div>
              </div>

              {mode === "choose" && (
                <div className="space-y-3">
                  {scenario.options.map((o, i) => {
                    const chosen = optionId === o.id;
                    return (
                      <button
                        key={o.id}
                        onClick={() => setOptionId(o.id)}
                        className={cls(
                          "w-full text-left p-4 rounded-lg border transition",
                          chosen
                            ? "border-navy-900 bg-white shadow-[0_0_0_3px_rgba(184,146,74,0.18)]"
                            : "bg-white border-[var(--color-line)] hover:border-navy-300"
                        )}
                      >
                        <div className="flex gap-3">
                          <div className="w-7 h-7 rounded-md bg-navy-900 text-white grid place-items-center text-xs shrink-0">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div className="text-sm text-navy-900 leading-relaxed">
                            {o.text}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  <button
                    onClick={submitOption}
                    disabled={!optionId}
                    className={cls(
                      "w-full text-sm px-4 py-2.5 rounded-md font-medium",
                      optionId
                        ? "bg-navy-900 text-white hover:bg-navy-800"
                        : "bg-navy-100 text-navy-400 cursor-not-allowed"
                    )}
                  >
                    Submit response →
                  </button>
                </div>
              )}

              {mode === "custom" && (
                <div className="space-y-3">
                  <textarea
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    rows={6}
                    placeholder="Type how you would actually reply to your counterpart…"
                    className="w-full text-sm p-4 rounded-lg border border-[var(--color-line)] bg-white focus:outline-none focus:border-navy-900 focus:shadow-[0_0_0_3px_rgba(184,146,74,0.18)]"
                  />
                  <button
                    onClick={submitCustom}
                    disabled={!custom.trim()}
                    className={cls(
                      "w-full text-sm px-4 py-2.5 rounded-md font-medium",
                      custom.trim()
                        ? "bg-navy-900 text-white hover:bg-navy-800"
                        : "bg-navy-100 text-navy-400 cursor-not-allowed"
                    )}
                  >
                    Analyze response →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Feedback */}
          {result && (
            <FeedbackPanel
              result={result}
              scenario={scenario}
              onReset={reset}
            />
          )}
        </div>

        {/* Side rail */}
        <div className="space-y-4">
          <div className="exec-card p-4">
            <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
              Why this scenario matters
            </div>
            <p className="mt-2 text-sm text-navy-700 leading-relaxed">
              This is one of the highest-cost moments in a U.S.–China deal cycle.
              Handled well, it builds trust faster than a quarter of meetings.
              Handled poorly, it ends the deal silently.
            </p>
          </div>

          {relatedModule && (
            <Link
              href={`/playbook/${relatedModule.slug}`}
              className="exec-card p-4 block hover:border-navy-300 transition"
            >
              <div className="text-[10px] uppercase tracking-[0.16em] text-red-warm">
                Related Playbook module
              </div>
              <div className="mt-1 text-sm font-semibold text-navy-900">
                {relatedModule.title}
              </div>
              <div className="text-xs text-navy-500 mt-1">
                {relatedModule.minutes} min · {SKILL_LABELS[relatedModule.skill]}
              </div>
              <div className="mt-3 text-xs text-navy-900 border-b border-gold inline-block pb-0.5">
                Open module →
              </div>
            </Link>
          )}

          <div className="exec-card p-4">
            <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
              How scoring works
            </div>
            <ul className="mt-2 space-y-1.5 text-xs text-navy-700">
              <li className="flex gap-2"><span className="text-gold">•</span>Cultural risk read</li>
              <li className="flex gap-2"><span className="text-gold">•</span>Relationship vs. transactional framing</li>
              <li className="flex gap-2"><span className="text-gold">•</span>Face preservation</li>
              <li className="flex gap-2"><span className="text-gold">•</span>Clear, low-pressure next step</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
