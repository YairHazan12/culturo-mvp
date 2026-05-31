"use client";

import { useState } from "react";
import { cls } from "@/lib/utils";
import { RiskIndicator } from "@/components/RiskIndicator";
import { RiskLevel } from "@/lib/types";

type Tone = "formal" | "warmer" | "direct";

interface CoachReading {
  tooDirect: number;       // 0-100, higher = more direct/risky
  faceRisk: number;
  transactional: number;
  missingRelationship: number;
  unclearNext: number;
  overall: number;         // composite risk 0-100 (lower = better)
  risk: RiskLevel;
  flags: string[];
  better: Record<Tone, string>;
  explanation: string;
}

const SAMPLES: { label: string; text: string }[] = [
  {
    label: "Deadline pressure",
    text:
      "We need your answer by Friday or we will move forward with another vendor.",
  },
  {
    label: "Cold follow-up",
    text:
      "Hi — circling back. Did you get a chance to review the contract? Please advise.",
  },
  {
    label: "Asking for a discount",
    text:
      "Your pricing is way above budget. We need a 15% discount to move forward.",
  },
];

function analyze(text: string): CoachReading {
  const t = text.toLowerCase();

  const directHits = [
    "must",
    "need to",
    "have to",
    "asap",
    "immediately",
    "by friday",
    "or we will",
    "final offer",
    "deadline",
    "non-negotiable",
  ].filter((p) => t.includes(p)).length;

  const transactionalHits = [
    "price",
    "discount",
    "vendor",
    "po",
    "quote",
    "budget",
    "rate card",
    "%",
  ].filter((p) => t.includes(p)).length;

  const relationshipHits = [
    "thank",
    "appreciate",
    "honored",
    "together",
    "relationship",
    "partnership",
    "trust",
    "team",
  ].filter((p) => t.includes(p)).length;

  const faceRiskHits = [
    "wrong",
    "incorrect",
    "you didn",
    "you failed",
    "unacceptable",
    "disappointed",
  ].filter((p) => t.includes(p)).length;

  const nextStepHits = [
    "let's",
    "could we",
    "would it",
    "next step",
    "propose",
    "suggest",
    "follow up",
    "meet",
  ].filter((p) => t.includes(p)).length;

  const tooDirect = Math.min(100, 25 + directHits * 22);
  const transactional = Math.min(100, 20 + transactionalHits * 18);
  const missingRelationship = Math.max(0, 70 - relationshipHits * 22);
  const faceRisk = Math.min(100, 15 + faceRiskHits * 28 + directHits * 6);
  const unclearNext = Math.max(0, 75 - nextStepHits * 22);

  const overall = Math.round(
    tooDirect * 0.25 +
      faceRisk * 0.25 +
      transactional * 0.15 +
      missingRelationship * 0.2 +
      unclearNext * 0.15
  );

  let risk: RiskLevel = "low";
  if (overall >= 70) risk = "high";
  else if (overall >= 55) risk = "elevated";
  else if (overall >= 40) risk = "moderate";

  const flags: string[] = [];
  if (directHits) flags.push(`Direct / pressure phrasing (×${directHits}) — likely to be read as a threat.`);
  if (transactionalHits) flags.push(`Transactional vocabulary (×${transactionalHits}) — could be reframed around partnership.`);
  if (relationshipHits === 0) flags.push("No relationship language — message reads as cold.");
  if (faceRiskHits) flags.push("Phrasing risks loss of face for your counterpart.");
  if (nextStepHits === 0) flags.push("No clear, low-pressure next step proposed.");

  const better: Record<Tone, string> = {
    formal:
      "Dear [Name], thank you again for the productive discussion. We understand that internal review takes time, and we remain very committed to finding a path that works well for both sides. To help both teams plan, would it be possible to align on a target date for next steps? Please let us know if anything from our side would help your team.",
    warmer:
      "Hi [Name], thank you again for the warm welcome last week. I know there are several internal considerations on your side — we are not in a rush, only eager to keep building something good together. Whenever the moment is right, we would love to hear how your team is thinking. We are here to support however we can.",
    direct:
      "Hi [Name], thank you for the conversation. To plan our side cleanly, could we agree on a target response date by the end of next week? We remain very interested in working together and would appreciate any visibility you can share.",
  };

  const explanation =
    overall >= 55
      ? "Your message communicates urgency but uses framing that Chinese B2B counterparts often read as pressure, loss-of-face risk, or transactional. The rewrites move the message from 'demand' to 'aligned planning', preserve face, and keep a clear ask."
      : "Your message is in a reasonable zone. The rewrites strengthen relationship signal, lower urgency framing, and clarify the next step without losing your underlying ask.";

  return {
    tooDirect,
    faceRisk,
    transactional,
    missingRelationship,
    unclearNext,
    overall,
    risk,
    flags,
    better,
    explanation,
  };
}

export default function CoachPage() {
  const [text, setText] = useState("");
  const [reading, setReading] = useState<CoachReading | null>(null);
  const [tone, setTone] = useState<Tone>("formal");
  const [loading, setLoading] = useState(false);

  function run(input: string) {
    setLoading(true);
    setText(input);
    setReading(null);
    // simulate analysis
    setTimeout(() => {
      setReading(analyze(input));
      setLoading(false);
    }, 650);
  }

  return (
    <div>
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
          AI Message Coach
        </div>
        <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900 tracking-tight">
          Don&apos;t send it until Culturo has read it.
        </h1>
        <p className="mt-2 text-sm text-navy-500 max-w-2xl">
          Paste an email, Slack message, or proposal snippet. Culturo flags
          cultural risk, then rewrites it in three tones — formal, warmer, or
          more direct.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="exec-card p-5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                Your draft
              </div>
              <div className="text-xs text-navy-500">
                {text.length} chars
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              placeholder="Paste your message to your Chinese counterpart here…"
              className="mt-3 w-full text-sm p-4 rounded-lg border border-[var(--color-line)] bg-white focus:outline-none focus:border-navy-900 focus:shadow-[0_0_0_3px_rgba(184,146,74,0.18)]"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-[0.16em] text-navy-500 mr-1">
                  Try a sample:
                </span>
                {SAMPLES.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => run(s.text)}
                    className="text-xs px-2.5 py-1 rounded-md border border-[var(--color-line)] text-navy-700 hover:bg-white"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => run(text)}
                disabled={!text.trim() || loading}
                className={cls(
                  "text-sm px-4 py-2.5 rounded-md font-medium",
                  !text.trim() || loading
                    ? "bg-navy-100 text-navy-400 cursor-not-allowed"
                    : "bg-navy-900 text-white hover:bg-navy-800"
                )}
              >
                {loading ? "Analyzing…" : "Analyze message →"}
              </button>
            </div>
          </div>

          {reading && (
            <div className="mt-6 space-y-4">
              {/* Better version */}
              <div className="exec-card p-6 relative overflow-hidden">
                <span className="absolute top-0 left-0 w-1 h-full bg-gold" />
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                    Better version
                  </div>
                  <div className="flex rounded-md bg-navy-50 p-0.5 text-xs">
                    {(["formal", "warmer", "direct"] as Tone[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={cls(
                          "px-3 py-1 rounded-md capitalize transition",
                          tone === t
                            ? "bg-white text-navy-900 shadow-sm"
                            : "text-navy-600"
                        )}
                      >
                        {t === "warmer" ? "Warmer" : t === "direct" ? "More direct" : "More formal"}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-base md:text-lg font-serif text-navy-900 leading-relaxed whitespace-pre-wrap">
                  {reading.better[tone]}
                </p>
                <div className="mt-4 hairline pt-3 flex items-center justify-between">
                  <div className="text-xs text-navy-500">
                    Tone: <span className="capitalize text-navy-700">{tone}</span>
                  </div>
                  <button
                    onClick={() => {
                      try {
                        navigator.clipboard.writeText(reading.better[tone]);
                      } catch {}
                    }}
                    className="text-xs px-3 py-1.5 rounded-md border border-[var(--color-line)] hover:bg-white"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Explanation */}
              <div className="exec-card p-5">
                <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                  Why we rewrote it this way
                </div>
                <p className="mt-1.5 text-sm text-navy-700 leading-relaxed">
                  {reading.explanation}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Side: scoring */}
        <div className="space-y-4">
          {!reading && (
            <div className="exec-card p-5">
              <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                What we check
              </div>
              <ul className="mt-3 space-y-2 text-sm text-navy-700">
                {[
                  "Too direct or pressure framing",
                  "Risk of causing loss of face",
                  "Too transactional",
                  "Missing relationship signal",
                  "Unclear next step",
                ].map((s) => (
                  <li key={s} className="flex gap-2 items-start">
                    <span className="text-gold mt-1">●</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {reading && (
            <>
              <div className="exec-card p-5">
                <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                  Cultural risk score
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="text-4xl font-semibold text-navy-900 tabular-nums">
                    {reading.overall}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                    / 100 risk
                  </div>
                </div>
                <div className="mt-2">
                  <RiskIndicator level={reading.risk} />
                </div>
                <div className="mt-4 space-y-2">
                  <Bar label="Too direct" v={reading.tooDirect} />
                  <Bar label="Face risk" v={reading.faceRisk} />
                  <Bar label="Transactional" v={reading.transactional} />
                  <Bar label="Missing relationship" v={reading.missingRelationship} />
                  <Bar label="Unclear next step" v={reading.unclearNext} />
                </div>
              </div>

              {reading.flags.length > 0 && (
                <div className="exec-card p-5">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-red-warm">
                    Flags
                  </div>
                  <ul className="mt-2 space-y-2 text-sm text-navy-700">
                    {reading.flags.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-red-warm mt-0.5">!</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Bar({ label, v }: { label: string; v: number }) {
  const color =
    v >= 70 ? "bg-red-warm" : v >= 50 ? "bg-orange-500" : v >= 30 ? "bg-gold" : "bg-emerald-500";
  return (
    <div>
      <div className="flex justify-between text-xs text-navy-500">
        <span>{label}</span>
        <span className="tabular-nums">{v}</span>
      </div>
      <div className="mt-1 h-1.5 bg-navy-100 rounded-full overflow-hidden">
        <div className={cls("h-full rounded-full", color)} style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}
