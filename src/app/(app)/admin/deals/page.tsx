"use client";

import { Section } from "@/components/Section";
import { RiskIndicator } from "@/components/RiskIndicator";
import { SKILL_LABELS, dealRiskMap } from "@/lib/mock";
import { cls } from "@/lib/utils";

const STAGES = ["Discovery", "Proposal", "Pilot", "Final terms", "Renewal"];

export default function DealRiskMapPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
          Admin · Deal Risk Map
        </div>
        <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900 tracking-tight">
          China deals at cultural risk — full board
        </h1>
        <p className="mt-2 text-sm text-navy-500 max-w-2xl">
          A pipeline-style view of cultural risk by deal stage. Use it to plan
          which deals need executive air-cover or a senior-to-senior intro.
        </p>
      </div>

      <Section title="By stage" eyebrow="Kanban view">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {STAGES.map((stage) => {
            const items = dealRiskMap.filter((d) => d.stage === stage);
            return (
              <div key={stage} className="bg-white border border-[var(--color-line)] rounded-xl p-3 min-h-[200px]">
                <div className="flex items-center justify-between px-1">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                    {stage}
                  </div>
                  <div className="text-xs text-navy-700 font-medium tabular-nums">
                    {items.length}
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  {items.length === 0 && (
                    <div className="text-[11px] text-navy-400 italic px-1">No active deals</div>
                  )}
                  {items.map((d) => (
                    <div
                      key={d.account}
                      className={cls(
                        "rounded-lg border p-3 bg-white",
                        d.risk === "high"
                          ? "border-red-200"
                          : d.risk === "elevated"
                          ? "border-orange-200"
                          : d.risk === "moderate"
                          ? "border-amber-200"
                          : "border-[var(--color-line)]"
                      )}
                    >
                      <div className="text-sm font-medium text-navy-900 leading-snug">
                        {d.account}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="text-navy-700 font-medium">{d.value}</span>
                        <RiskIndicator level={d.risk} size="sm" />
                      </div>
                      <div className="mt-2 text-[11px] text-navy-500">
                        Weak: {SKILL_LABELS[d.weakSkill]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
