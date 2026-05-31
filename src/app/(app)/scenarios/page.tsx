import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { RiskIndicator } from "@/components/RiskIndicator";
import { scenarios, SKILL_LABELS } from "@/lib/mock";

export default function ScenariosPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
          Scenario Simulator
        </div>
        <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900 tracking-tight">
          Practice the moments that actually decide deals.
        </h1>
        <p className="mt-2 text-sm text-navy-500 max-w-2xl">
          Each scenario is built around a high-stakes business moment with a
          Chinese counterpart. Pick a response, or write your own — get a score,
          cultural risk read, and a better business response.
        </p>
      </div>

      <Section
        title="Recommended for your current deal"
        eyebrow="Personalized"
        description="Chosen based on your business context and weak skills."
      >
        <div className="grid md:grid-cols-2 gap-4">
          {scenarios.slice(0, 2).map((s) => (
            <ScenarioCard key={s.id} s={s} featured />
          ))}
        </div>
      </Section>

      <Section title="All scenarios" eyebrow="Library">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map((s) => (
            <ScenarioCard key={s.id} s={s} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function ScenarioCard({
  s,
  featured,
}: {
  s: (typeof scenarios)[number];
  featured?: boolean;
}) {
  return (
    <Link
      href={`/scenarios/${s.id}`}
      className="exec-card group hover:border-navy-300 transition block relative overflow-hidden"
    >
      {featured && (
        <span className="absolute top-2.5 right-2.5 z-10 text-[10px] uppercase tracking-[0.16em] bg-gold text-navy-900 px-2 py-0.5 rounded">
          Recommended
        </span>
      )}
      <div className="relative aspect-[16/9] bg-navy-50 overflow-hidden">
        <Image
          src={s.image}
          alt={s.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em]">
          <span className="text-red-warm font-medium">{s.difficulty}</span>
          <span className="text-navy-400">{s.industry}</span>
        </div>
        <h3 className="mt-2 text-base font-semibold text-navy-900 leading-snug group-hover:text-navy-700">
          {s.title}
        </h3>
        <p className="mt-1.5 text-xs text-navy-500 line-clamp-2">{s.setup}</p>
        <div className="mt-4 hairline pt-3 flex items-center justify-between">
          <span className="text-xs text-navy-500">
            Skill: <span className="text-navy-900">{SKILL_LABELS[s.skill]}</span>
          </span>
          <RiskIndicator level={s.options[1].risk} size="sm" />
        </div>
      </div>
    </Link>
  );
}
