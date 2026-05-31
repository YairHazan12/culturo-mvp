"use client";

import { use, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { conceptModules } from "@/lib/mock";
import { cls } from "@/lib/utils";

export default function ConceptModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const moduleMaybe = useMemo(
    () => conceptModules.find((m) => m.slug === slug),
    [slug]
  );
  if (!moduleMaybe) notFound();
  const m = moduleMaybe;

  const accentBar =
    m.accent === "red" ? "bg-red-warm" : m.accent === "gold" ? "bg-gold" : "bg-navy-900";
  const accentSoft =
    m.accent === "red"
      ? "bg-red-warm-soft"
      : m.accent === "gold"
      ? "bg-gold-soft"
      : "bg-navy-50";

  return (
    <div className="animate-fade">
      <div className="mb-4 text-xs text-navy-500 flex items-center gap-2">
        <Link href="/playbook" className="hover:text-navy-900">
          Playbook
        </Link>
        <span aria-hidden>›</span>
        <span className="text-navy-700">{m.title}</span>
      </div>

      {/* Hero */}
      <div className="exec-card relative overflow-hidden animate-rise">
        <span className={cls("absolute top-0 left-0 w-1.5 h-full z-10", accentBar)} />
        <div className="relative aspect-[21/9] md:aspect-[3/1] bg-navy-50 overflow-hidden">
          <Image
            src={m.image}
            alt={m.imageAlt}
            fill
            sizes="100vw"
            preload
            className="object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-navy-900/45 via-navy-900/5 to-transparent" />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div
              className={cls(
                "w-14 h-14 rounded-xl grid place-items-center text-3xl shrink-0 -mt-12 relative z-10 border-2 border-white shadow-md",
                accentSoft
              )}
            >
              {m.emoji}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
                Culture Foundation · {m.minutes} min read
              </div>
              <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900 tracking-tight">
                {m.title}
              </h1>
              <p className="mt-1 text-sm text-navy-500">{m.subtitle}</p>
            </div>
          </div>
          <p className="mt-5 text-base md:text-lg font-serif text-navy-900 leading-relaxed max-w-3xl">
            {m.bigIdea}
          </p>
        </div>
      </div>

      {/* Concept cards */}
      <div className="mt-6 grid sm:grid-cols-2 gap-4 stagger">
        {m.cards.map((c) => (
          <div key={c.title} className="exec-card card-lift p-5">
            <div className={cls("w-10 h-10 rounded-lg grid place-items-center text-xl mb-3", accentSoft)}>
              {c.icon}
            </div>
            <h3 className="text-sm font-semibold text-navy-900">{c.title}</h3>
            <p className="mt-1.5 text-sm text-navy-600 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>

      {/* Mistakes + Tips, side by side, visual */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="exec-card p-5">
          <div className="text-[10px] uppercase tracking-[0.16em] text-red-warm mb-3">
            Common mistakes
          </div>
          <ul className="space-y-2.5">
            {m.mistakes.map((x) => (
              <li key={x} className="flex gap-2.5 text-sm text-navy-700">
                <span className="text-red-warm mt-0.5 shrink-0">✕</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="exec-card p-5">
          <div className="text-[10px] uppercase tracking-[0.16em] text-emerald-700 mb-3">
            Practical tips
          </div>
          <ul className="space-y-2.5">
            {m.tips.map((x) => (
              <li key={x} className="flex gap-2.5 text-sm text-navy-700">
                <span className="text-emerald-600 mt-0.5 shrink-0">✓</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key takeaways band */}
      <div className="mt-6 rounded-2xl bg-navy-900 text-white p-6 relative overflow-hidden">
        <span className="absolute top-0 right-0 w-40 h-40 -translate-y-1/2 translate-x-1/3 rounded-full bg-gold/15 blur-2xl" />
        <div className="text-[10px] uppercase tracking-[0.2em] text-gold mb-3">
          Key takeaways
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {m.takeaways.map((t, i) => (
            <div key={t} className="flex gap-3">
              <span className="font-serif text-gold text-lg leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-white/90 leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Short scenario */}
      <ScenarioBlock module={m} />
    </div>
  );
}

function ScenarioBlock({ module: m }: { module: (typeof conceptModules)[number] }) {
  const [picked, setPicked] = useState<number | null>(null);
  const chosen = picked === null ? null : m.scenario.choices[picked];

  return (
    <div className="mt-6 exec-card p-6">
      <div className="text-[10px] uppercase tracking-[0.16em] text-red-warm font-medium">
        Quick scenario
      </div>
      <p className="mt-2 text-sm text-navy-700 leading-relaxed">{m.scenario.prompt}</p>
      <div className="mt-4 relative pl-4 border-l-2 border-gold">
        <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
          Your counterpart says
        </div>
        <p className="mt-1 text-base font-serif text-navy-900 leading-relaxed">
          &ldquo;{m.scenario.partnerLine}&rdquo;
        </p>
      </div>

      <div className="mt-4 space-y-2.5">
        {m.scenario.choices.map((c, i) => {
          const isPicked = picked === i;
          const reveal = picked !== null;
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              disabled={reveal}
              className={cls(
                "w-full text-left text-sm px-4 py-3 rounded-lg border transition",
                reveal && c.good
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                  : reveal && isPicked && !c.good
                  ? "border-red-300 bg-red-50 text-red-warm-dark"
                  : isPicked
                  ? "border-navy-900 bg-white"
                  : "border-[var(--color-line)] bg-white hover:border-navy-300"
              )}
            >
              {c.text}
            </button>
          );
        })}
      </div>

      {chosen && (
        <div
          className={cls(
            "mt-4 p-4 rounded-lg text-sm leading-relaxed animate-rise",
            chosen.good ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-warm-dark"
          )}
        >
          <span className="font-semibold">{chosen.good ? "Strong read. " : "Watch out. "}</span>
          {chosen.feedback}
        </div>
      )}

      <div className="mt-5 hairline pt-4 flex flex-wrap gap-3">
        <Link
          href="/scenarios"
          className="text-sm bg-navy-900 text-white px-4 py-2.5 rounded-md hover:bg-navy-800"
        >
          Practice full scenarios →
        </Link>
        <Link
          href="/playbook"
          className="text-sm border border-navy-200 px-4 py-2.5 rounded-md hover:bg-white text-navy-900"
        >
          Back to playbook
        </Link>
      </div>
    </div>
  );
}
