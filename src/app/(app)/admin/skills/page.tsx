"use client";

import { Section } from "@/components/Section";
import { SKILL_LABELS, adminDepartments, weakSkillsTeam } from "@/lib/mock";
import { Skill } from "@/lib/types";
import { cls } from "@/lib/utils";

// Derive per-department × per-skill (mocked deterministically)
function skillFor(dept: string, skill: Skill): number {
  const base: Record<Skill, number> = {
    "trust-building": 65,
    "indirect-communication": 55,
    "negotiation-signals": 48,
    hierarchy: 70,
    "saving-face": 50,
    "meeting-etiquette": 62,
    "follow-up-strategy": 58,
  };
  const deptBias: Record<string, number> = {
    Sales: 4,
    Partnerships: 2,
    Procurement: 6,
    "Executive Team": 12,
    Operations: -8,
  };
  const skillBias: Record<Skill, number> = {
    "trust-building": dept === "Partnerships" ? 8 : 0,
    "indirect-communication": dept === "Sales" ? -6 : 0,
    "negotiation-signals": dept === "Procurement" ? 8 : dept === "Operations" ? -10 : 0,
    hierarchy: dept === "Executive Team" ? 8 : 0,
    "saving-face": dept === "Sales" ? -4 : 0,
    "meeting-etiquette": 0,
    "follow-up-strategy": dept === "Operations" ? -6 : 0,
  };
  return Math.max(20, Math.min(95, base[skill] + (deptBias[dept] ?? 0) + skillBias[skill]));
}

export default function SkillGapsPage() {
  const skills = Object.keys(SKILL_LABELS) as Skill[];

  return (
    <div>
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
          Admin · Skill Gaps
        </div>
        <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900 tracking-tight">
          Cultural skill matrix
        </h1>
        <p className="mt-2 text-sm text-navy-500 max-w-2xl">
          Heat-map of cultural skills × departments. Use it to scope a campaign
          with the highest ROI on team readiness.
        </p>
      </div>

      <Section title="Heat map" eyebrow="By department">
        <div className="exec-card p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                <th className="text-left font-normal pb-3 pr-4">Department</th>
                {skills.map((s) => (
                  <th key={s} className="text-center font-normal pb-3 px-2">
                    {SKILL_LABELS[s]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminDepartments.map((d) => (
                <tr key={d.name} className="border-t border-[var(--color-line)]">
                  <td className="py-2 pr-4 font-medium text-navy-900 whitespace-nowrap">
                    {d.name}
                  </td>
                  {skills.map((s) => {
                    const v = skillFor(d.name, s);
                    return (
                      <td key={s} className="py-1.5 px-1.5">
                        <div
                          className={cls(
                            "rounded-md text-center text-xs font-semibold tabular-nums py-2",
                            v >= 75
                              ? "bg-emerald-100 text-emerald-900"
                              : v >= 60
                              ? "bg-gold-soft text-navy-900"
                              : v >= 45
                              ? "bg-orange-100 text-orange-900"
                              : "bg-red-100 text-red-warm-dark"
                          )}
                        >
                          {v}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Biggest gaps" eyebrow="Where to invest">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weakSkillsTeam.map(({ skill, gap }) => (
            <div key={skill} className="exec-card p-4">
              <div className="text-[10px] uppercase tracking-[0.16em] text-red-warm">
                Gap −{gap}
              </div>
              <div className="mt-1.5 text-base font-semibold text-navy-900">
                {SKILL_LABELS[skill]}
              </div>
              <div className="mt-3 h-1.5 bg-navy-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-warm"
                  style={{ width: `${gap * 1.6}%` }}
                />
              </div>
              <button className="mt-4 text-xs text-navy-900 border-b border-gold pb-0.5">
                Schedule training →
              </button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
