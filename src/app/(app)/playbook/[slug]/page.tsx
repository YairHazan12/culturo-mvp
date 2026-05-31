"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { playbook, SKILL_LABELS, scenarios } from "@/lib/mock";
import { cls } from "@/lib/utils";

export default function PlaybookModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const moduleMaybe = useMemo(() => playbook.find((m) => m.slug === slug), [slug]);
  if (!moduleMaybe) notFound();
  const module = moduleMaybe;

  const practice = scenarios.find((s) => s.id === module.practiceScenarioId);

  const [section, setSection] = useState<
    "situation" | "what-to-say" | "quiz" | "practice"
  >("situation");

  return (
    <div>
      <div className="mb-4 text-xs text-navy-500 flex items-center gap-2">
        <Link href="/playbook" className="hover:text-navy-900">
          Playbook
        </Link>
        <span aria-hidden>›</span>
        <span className="text-navy-700">{module.title}</span>
      </div>

      <header className="mb-8">
        <div className="flex items-center gap-3">
          <span className="font-serif text-3xl text-gold leading-none">
            {String(playbook.indexOf(module) + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
              {SKILL_LABELS[module.skill]} · {module.minutes} min
            </div>
            <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900 tracking-tight">
              {module.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Section nav */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-[var(--color-line)]">
        {[
          ["situation", "Business situation"],
          ["what-to-say", "What to say instead"],
          ["quiz", "Quick check"],
          ["practice", "Live practice"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSection(key as typeof section)}
            className={cls(
              "px-3 py-2 text-sm border-b-2 -mb-px transition",
              section === key
                ? "border-navy-900 text-navy-900 font-medium"
                : "border-transparent text-navy-500 hover:text-navy-900"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {section === "situation" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Block label="Business situation" body={module.situation} />
            <Block
              label="What usually goes wrong"
              body={module.whatGoesWrong}
              accent="red"
            />
            <Block
              label="What it means in China"
              body={module.meaningInChina}
              accent="gold"
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-navy-900">
              Do / Don&apos;t at a glance
            </h3>
            <div className="exec-card p-4">
              <div className="text-[10px] uppercase tracking-[0.16em] text-emerald-700 mb-2">
                Do
              </div>
              <ul className="space-y-2 text-sm text-navy-700">
                {module.dos.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-emerald-600 mt-0.5">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="exec-card p-4">
              <div className="text-[10px] uppercase tracking-[0.16em] text-red-warm mb-2">
                Don&apos;t
              </div>
              <ul className="space-y-2 text-sm text-navy-700">
                {module.donts.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-red-warm mt-0.5">✕</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setSection("what-to-say")}
              className="w-full text-sm bg-navy-900 text-white px-4 py-2.5 rounded-md hover:bg-navy-800"
            >
              Next: What to say instead →
            </button>
          </div>
        </div>
      )}

      {section === "what-to-say" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="exec-card p-6 relative">
              <span className="absolute top-0 left-0 w-1 h-full bg-gold rounded-l-xl" />
              <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                What to say instead
              </div>
              <p className="mt-3 text-lg text-navy-900 leading-relaxed font-serif">
                &ldquo;{module.whatToSayInstead}&rdquo;
              </p>
            </div>

            <div className="mt-4 exec-card p-5">
              <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                Why this works
              </div>
              <p className="mt-1.5 text-sm text-navy-700 leading-relaxed">
                You acknowledge the soft signal, share the real constraint
                without forcing a public commitment, and keep the relationship
                framing instead of the deal framing. Your counterpart can move
                without losing face.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="exec-card p-4">
              <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500 mb-2">
                Try a tone
              </div>
              <div className="space-y-2">
                {["More formal", "Warmer", "More direct"].map((t) => (
                  <button
                    key={t}
                    className="w-full text-left text-sm border border-[var(--color-line)] px-3 py-2 rounded-md hover:bg-white"
                  >
                    {t} →
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setSection("quiz")}
              className="w-full text-sm bg-navy-900 text-white px-4 py-2.5 rounded-md hover:bg-navy-800"
            >
              Next: Quick check →
            </button>
          </div>
        </div>
      )}

      {section === "quiz" && <Quiz module={module} onDone={() => setSection("practice")} />}

      {section === "practice" && practice && (
        <div className="exec-card p-6">
          <div className="text-[10px] uppercase tracking-[0.16em] text-red-warm font-medium">
            Live practice
          </div>
          <h3 className="mt-1 text-xl font-semibold text-navy-900">
            {practice.title}
          </h3>
          <p className="mt-2 text-sm text-navy-700 leading-relaxed">
            {practice.setup}
          </p>
          <Link
            href={`/scenarios/${practice.id}`}
            className="mt-4 inline-flex items-center gap-2 bg-red-warm text-white text-sm px-5 py-2.5 rounded-md hover:bg-red-warm-dark"
          >
            Run scenario simulator
            <span aria-hidden>→</span>
          </Link>
        </div>
      )}
    </div>
  );
}

function Block({
  label,
  body,
  accent,
}: {
  label: string;
  body: string;
  accent?: "red" | "gold";
}) {
  const bar =
    accent === "red" ? "bg-red-warm" : accent === "gold" ? "bg-gold" : "bg-navy-900";
  return (
    <div className="exec-card p-5 relative overflow-hidden">
      <span className={cls("absolute top-0 left-0 w-1 h-full", bar)} />
      <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
        {label}
      </div>
      <p className="mt-2 text-sm text-navy-700 leading-relaxed">{body}</p>
    </div>
  );
}

function Quiz({
  module,
  onDone,
}: {
  module: (typeof playbook)[number];
  onDone: () => void;
}) {
  const [picks, setPicks] = useState<Record<number, number | undefined>>({});
  const [reveal, setReveal] = useState(false);

  const score = module.quiz.reduce(
    (acc, q, i) => (picks[i] === q.correctIndex ? acc + 1 : acc),
    0
  );

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {module.quiz.map((q, i) => (
            <div key={i} className="exec-card p-5">
              <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                Question {i + 1} of {module.quiz.length}
              </div>
              <div className="mt-1.5 text-sm font-medium text-navy-900">
                {q.q}
              </div>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, j) => {
                  const chosen = picks[i] === j;
                  const correct = reveal && q.correctIndex === j;
                  const wrong = reveal && chosen && q.correctIndex !== j;
                  return (
                    <button
                      key={j}
                      type="button"
                      disabled={reveal}
                      onClick={() => setPicks({ ...picks, [i]: j })}
                      className={cls(
                        "w-full text-left text-sm px-3 py-2 rounded-md border transition",
                        correct
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                          : wrong
                          ? "border-red-300 bg-red-50 text-red-warm-dark"
                          : chosen
                          ? "border-navy-900 bg-white"
                          : "border-[var(--color-line)] bg-white hover:border-navy-300"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {reveal && (
                <div className="mt-3 text-xs text-navy-500 italic">{q.why}</div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="exec-card p-5">
            <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
              Quick check
            </div>
            <div className="mt-2 text-3xl font-semibold text-navy-900">
              {reveal ? `${score} / ${module.quiz.length}` : "—"}
            </div>
            <div className="mt-1 text-xs text-navy-500">
              {!reveal && "Answer all to reveal"}
              {reveal && score === module.quiz.length && "Excellent — ready for live practice"}
              {reveal && score < module.quiz.length && "Re-read the section, then practice"}
            </div>
          </div>

          {!reveal ? (
            <button
              disabled={Object.keys(picks).length < module.quiz.length}
              onClick={() => setReveal(true)}
              className={cls(
                "w-full text-sm px-4 py-2.5 rounded-md",
                Object.keys(picks).length < module.quiz.length
                  ? "bg-navy-100 text-navy-400 cursor-not-allowed"
                  : "bg-navy-900 text-white hover:bg-navy-800"
              )}
            >
              Reveal answers
            </button>
          ) : (
            <button
              onClick={onDone}
              className="w-full text-sm bg-red-warm text-white px-4 py-2.5 rounded-md hover:bg-red-warm-dark"
            >
              Next: Live practice →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
