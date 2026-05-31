"use client";

import Link from "next/link";
import { Section, KpiTile } from "@/components/Section";
import { RiskIndicator } from "@/components/RiskIndicator";
import {
  SKILL_LABELS,
  adminDepartments,
  dealRiskMap,
  recentScenarioRuns,
  weakSkillsTeam,
} from "@/lib/mock";
import { cls, scoreColor } from "@/lib/utils";

export default function AdminPage() {
  const teamReadiness = Math.round(
    adminDepartments.reduce((acc, d) => acc + d.readiness * d.headcount, 0) /
      adminDepartments.reduce((acc, d) => acc + d.headcount, 0)
  );
  const totalCompletion = Math.round(
    adminDepartments.reduce((acc, d) => acc + d.completion * d.headcount, 0) /
      adminDepartments.reduce((acc, d) => acc + d.headcount, 0)
  );
  const highRiskDeals = dealRiskMap.filter(
    (d) => d.risk === "high" || d.risk === "elevated"
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
            Admin · L&amp;D / Sales Enablement / Leadership
          </div>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900 tracking-tight">
            Team Deal Readiness — Globex Co.
          </h1>
          <p className="mt-1.5 text-sm text-navy-500 max-w-2xl">
            Track who is ready for the next China deal, where cultural risk is
            highest, and which training campaigns will move the needle fastest.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm px-4 py-2 rounded-md border border-navy-200 text-navy-700 hover:bg-white">
            Export report
          </button>
          <button className="inline-flex items-center gap-2 bg-navy-900 text-white text-sm px-4 py-2 rounded-md hover:bg-navy-800 transition">
            Launch new campaign
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <KpiTile
          label="Team Readiness Score"
          value={teamReadiness}
          delta={{ dir: "up", text: "+4 vs. last month" }}
          accent="navy"
          hint="Weighted by headcount"
        />
        <KpiTile
          label="Completion rate"
          value={`${totalCompletion}%`}
          delta={{ dir: "up", text: "+9 pts" }}
          accent="gold"
          hint="China Deal Playbook"
        />
        <KpiTile
          label="High-risk deals"
          value={highRiskDeals.length}
          delta={{ dir: "down", text: "-1 this week" }}
          accent="red"
          hint={`${highRiskDeals.length} of ${dealRiskMap.length} active accounts`}
        />
        <KpiTile
          label="Scenarios run"
          value={142}
          delta={{ dir: "up", text: "+38 this week" }}
          accent="emerald"
          hint="Avg. score 74 across teams"
        />
      </div>

      {/* Department comparison + deal risk map */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <Section
            eyebrow="Department comparison"
            title="Which teams are deal-ready"
            description="Readiness × completion view across departments. Click to drill in."
          >
            <div className="exec-card overflow-hidden">
              <div className="grid grid-cols-12 px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-navy-500 bg-navy-50">
                <div className="col-span-3">Department</div>
                <div className="col-span-2">Headcount</div>
                <div className="col-span-3">Readiness</div>
                <div className="col-span-2">Completion</div>
                <div className="col-span-2 text-right">Risk</div>
              </div>
              <div className="divide-y divide-[var(--color-line)]">
                {adminDepartments.map((d) => (
                  <div
                    key={d.name}
                    className="grid grid-cols-12 px-4 py-3 items-center text-sm hover:bg-white transition"
                  >
                    <div className="col-span-3 font-medium text-navy-900">
                      {d.name}
                    </div>
                    <div className="col-span-2 text-navy-500">{d.headcount}</div>
                    <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-navy-100 rounded-full overflow-hidden">
                          <div
                            className={cls(
                              "h-full rounded-full",
                              d.readiness >= 75
                                ? "bg-emerald-500"
                                : d.readiness >= 60
                                ? "bg-gold"
                                : "bg-red-warm"
                            )}
                            style={{ width: `${d.readiness}%` }}
                          />
                        </div>
                        <span
                          className={cls(
                            "text-xs font-semibold tabular-nums",
                            scoreColor(d.readiness)
                          )}
                        >
                          {d.readiness}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 text-navy-700 tabular-nums">
                      {d.completion}%
                    </div>
                    <div className="col-span-2 text-right">
                      <RiskIndicator level={d.risk} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        <div>
          <Section
            eyebrow="Cultural skill gaps"
            title="Where the team is weakest"
            description="Aggregated across departments. Recommended training below."
          >
            <div className="exec-card p-5">
              <ul className="space-y-4">
                {weakSkillsTeam.map(({ skill, gap }) => (
                  <li key={skill}>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-navy-900">
                        {SKILL_LABELS[skill]}
                      </span>
                      <span className="text-red-warm font-semibold tabular-nums">
                        −{gap}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 bg-navy-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-warm rounded-full"
                        style={{ width: `${gap * 1.6}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-5 w-full text-sm bg-navy-900 text-white px-4 py-2.5 rounded-md hover:bg-navy-800">
                Recommend training actions
              </button>
            </div>
          </Section>
        </div>
      </div>

      {/* Deal risk map */}
      <Section
        eyebrow="Deal risk map"
        title="China deals at cultural risk"
        description="Active accounts ranked by cultural risk × deal value."
        action={
          <button className="text-sm text-navy-700 hover:text-navy-900 border-b border-navy-200">
            View all 18 accounts →
          </button>
        }
      >
        <div className="exec-card overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-navy-500 bg-navy-50">
            <div className="col-span-4">Account</div>
            <div className="col-span-2">Value</div>
            <div className="col-span-2">Stage</div>
            <div className="col-span-2">Risk</div>
            <div className="col-span-2">Weak skill</div>
          </div>
          <div className="divide-y divide-[var(--color-line)]">
            {dealRiskMap.map((d) => (
              <div
                key={d.account}
                className="grid grid-cols-12 px-4 py-3 items-center text-sm hover:bg-white transition"
              >
                <div className="col-span-4 font-medium text-navy-900">
                  {d.account}
                </div>
                <div className="col-span-2 tabular-nums text-navy-700">
                  {d.value}
                </div>
                <div className="col-span-2 text-navy-500">{d.stage}</div>
                <div className="col-span-2">
                  <RiskIndicator level={d.risk} size="sm" />
                </div>
                <div className="col-span-2 text-navy-700 text-xs">
                  {SKILL_LABELS[d.weakSkill]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Recent scenario performance + campaign */}
      <div className="grid lg:grid-cols-3 gap-6 mb-4">
        <div className="lg:col-span-2">
          <Section
            eyebrow="Recent scenario performance"
            title="What teams have been practicing"
          >
            <div className="exec-card divide-y divide-[var(--color-line)]">
              {recentScenarioRuns.map((r) => (
                <div
                  key={`${r.user}-${r.scenario}`}
                  className="grid grid-cols-12 px-4 py-3 items-center text-sm"
                >
                  <div className="col-span-3">
                    <div className="font-medium text-navy-900">{r.user}</div>
                    <div className="text-[11px] text-navy-500">{r.dept}</div>
                  </div>
                  <div className="col-span-6 text-navy-700">{r.scenario}</div>
                  <div className="col-span-2 tabular-nums">
                    <span className={cls("font-semibold", scoreColor(r.score))}>
                      {r.score}
                    </span>
                    <span className="text-[10px] text-navy-400"> /100</span>
                  </div>
                  <div className="col-span-1 text-[11px] text-navy-500 text-right">
                    {r.when}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div>
          <Section eyebrow="Campaign" title="Recommended next campaign">
            <div className="exec-card p-6 relative overflow-hidden">
              <span className="absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold/15" />
              <span className="text-[10px] uppercase tracking-[0.16em] bg-red-warm text-white px-2 py-0.5 rounded">
                14-day campaign
              </span>
              <h3 className="mt-3 text-lg font-semibold text-navy-900">
                Prepare team for China negotiation — Q3 push
              </h3>
              <p className="mt-2 text-sm text-navy-700 leading-relaxed">
                Targeted at Sales, Partnerships, and Procurement. 4 modules + 6
                scenarios + 1 live coaching session. Projected readiness lift:{" "}
                <span className="font-semibold text-emerald-700">+12 pts</span>.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xl font-semibold text-navy-900">84</div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-navy-500">
                    People
                  </div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-navy-900">14d</div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-navy-500">
                    Duration
                  </div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-emerald-700">
                    +12
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-navy-500">
                    Score lift
                  </div>
                </div>
              </div>
              <button className="mt-5 w-full text-sm bg-navy-900 text-white px-4 py-2.5 rounded-md hover:bg-navy-800">
                Launch campaign
              </button>
              <Link
                href="/dashboard"
                className="mt-2 text-center w-full block text-xs text-navy-500 hover:text-navy-900"
              >
                Preview as an employee
              </Link>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
