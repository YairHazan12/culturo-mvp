import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { PlaybookModuleCard } from "@/components/PlaybookModuleCard";
import { conceptModules, playbook, SKILL_LABELS } from "@/lib/mock";
import { cls } from "@/lib/utils";

const PROGRESS_BY_INDEX = [100, 60, 25, 0, 0, 40, 10, 0, 0, 0];

export default function PlaybookPage() {
  const grouped = playbook.reduce<Record<string, typeof playbook>>((acc, m) => {
    (acc[m.skill] ??= []).push(m);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
            China Deal Playbook
          </div>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900 tracking-tight">
            Ten moments that decide your China deal.
          </h1>
          <p className="mt-2 text-sm text-navy-500 max-w-2xl">
            Each module: business situation → what usually goes wrong → what it
            means in China → what to say instead → quick quiz → live practice.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-navy-500">Filter:</span>
          {Object.keys(grouped).map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="px-2.5 py-1 rounded-md border border-[var(--color-line)] text-navy-700 hover:bg-white"
            >
              {SKILL_LABELS[s as keyof typeof SKILL_LABELS]}
            </a>
          ))}
        </div>
      </div>

      <Section
        title="Start here — Culture Foundations"
        eyebrow="New"
        description="Two visual primers that make every scenario below click faster."
      >
        <div className="grid md:grid-cols-2 gap-4 stagger">
          {conceptModules.map((m) => (
            <ConceptCard key={m.slug} m={m} />
          ))}
        </div>
      </Section>

      <Section title="All modules" eyebrow="In order">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playbook.map((m, i) => (
            <PlaybookModuleCard
              key={m.slug}
              module={m}
              index={i}
              progress={PROGRESS_BY_INDEX[i] ?? 0}
            />
          ))}
        </div>
      </Section>

      <Section
        title="By cultural skill"
        eyebrow="Grouped"
        description="Use this view to close a specific gap surfaced on the dashboard."
      >
        <div className="space-y-8">
          {Object.entries(grouped).map(([skill, mods]) => (
            <div key={skill} id={skill}>
              <h3 className="text-base font-semibold text-navy-900 mb-3">
                {SKILL_LABELS[skill as keyof typeof SKILL_LABELS]}{" "}
                <span className="text-xs text-navy-500 font-normal">
                  ({mods.length} modules)
                </span>
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mods.map((m) => {
                  const idx = playbook.indexOf(m);
                  return (
                    <PlaybookModuleCard
                      key={m.slug}
                      module={m}
                      index={idx}
                      progress={PROGRESS_BY_INDEX[idx] ?? 0}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function ConceptCard({ m }: { m: (typeof conceptModules)[number] }) {
  const accentSoft =
    m.accent === "red"
      ? "bg-red-warm-soft"
      : m.accent === "gold"
      ? "bg-gold-soft"
      : "bg-navy-50";
  const accentBar =
    m.accent === "red" ? "bg-red-warm" : m.accent === "gold" ? "bg-gold" : "bg-navy-900";
  return (
    <Link
      href={`/modules/${m.slug}`}
      className="exec-card card-lift block relative overflow-hidden group"
    >
      <span className={cls("absolute top-0 left-0 w-1 h-full z-10", accentBar)} />
      <div className="relative aspect-[21/9] bg-navy-50 overflow-hidden">
        <Image
          src={m.image}
          alt={m.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start gap-4 p-5">
        <div className={cls("w-12 h-12 rounded-xl grid place-items-center text-2xl shrink-0 -mt-9 relative z-10 border-2 border-white shadow-sm", accentSoft)}>
          {m.emoji}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-navy-900 group-hover:text-navy-700">
              {m.title}
            </h3>
            <span className="text-[11px] text-navy-400">{m.minutes} min</span>
          </div>
          <p className="mt-1 text-sm text-navy-500 leading-relaxed">{m.subtitle}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {m.takeaways.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded-full bg-navy-50 text-navy-600 border border-navy-100"
              >
                {t.length > 36 ? t.slice(0, 34) + "…" : t}
              </span>
            ))}
          </div>
          <div className="mt-3 text-sm text-navy-900 font-medium border-b border-gold inline-block pb-0.5 group-hover:text-red-warm">
            Open module →
          </div>
        </div>
      </div>
    </Link>
  );
}
