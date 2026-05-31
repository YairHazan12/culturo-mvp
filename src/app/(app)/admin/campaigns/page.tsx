"use client";

import { Section } from "@/components/Section";
import { cls } from "@/lib/utils";

interface Campaign {
  name: string;
  audience: string;
  status: "Live" | "Draft" | "Scheduled" | "Recommended";
  participants: number;
  duration: string;
  lift: number;
  description: string;
}

const campaigns: Campaign[] = [
  {
    name: "Prepare team for China negotiation — Q3 push",
    audience: "Sales · Partnerships · Procurement",
    status: "Recommended",
    participants: 84,
    duration: "14 days",
    lift: 12,
    description:
      "4 modules + 6 scenarios + 1 live coaching session before the Shenzhen Mfg. Group close.",
  },
  {
    name: "Saving face: Operations escalation playbook",
    audience: "Operations · Customer Success",
    status: "Live",
    participants: 31,
    duration: "Week 2 of 3",
    lift: 9,
    description:
      "Triggered by 3 supplier disputes last quarter. Focus on indirect escalation and private 1:1 conflict.",
  },
  {
    name: "Executive briefing: First China meeting",
    audience: "Executive Team",
    status: "Scheduled",
    participants: 9,
    duration: "Starts Mar 12",
    lift: 7,
    description:
      "Single 60-minute briefing for the CEO and 8 VPs before the Beijing roadshow.",
  },
  {
    name: "Sales follow-up tone reset",
    audience: "Sales · BDR",
    status: "Draft",
    participants: 42,
    duration: "10 days",
    lift: 8,
    description:
      "Audit found 38% of follow-ups too transactional. Rewrite + scenario practice campaign.",
  },
];

function statusStyle(s: Campaign["status"]) {
  switch (s) {
    case "Live":
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    case "Scheduled":
      return "bg-navy-50 text-navy-700 border-navy-100";
    case "Draft":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "Recommended":
      return "bg-red-warm-soft text-red-warm-dark border-red-200";
  }
}

export default function CampaignsPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
            Admin · Training Campaigns
          </div>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900 tracking-tight">
            Training campaigns
          </h1>
          <p className="mt-2 text-sm text-navy-500 max-w-2xl">
            Bundles of modules, scenarios, and coaching aimed at specific
            business outcomes. Recommended campaigns are generated from your
            current deal risk map.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-navy-900 text-white text-sm px-4 py-2 rounded-md hover:bg-navy-800 transition">
          New campaign
          <span aria-hidden>→</span>
        </button>
      </div>

      <Section title="Active and recommended" eyebrow="Campaigns">
        <div className="grid md:grid-cols-2 gap-4">
          {campaigns.map((c) => (
            <div key={c.name} className="exec-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className={cls(
                      "inline-block text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 rounded border",
                      statusStyle(c.status)
                    )}
                  >
                    {c.status}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-navy-900 leading-snug">
                    {c.name}
                  </h3>
                  <div className="mt-1 text-xs text-navy-500">{c.audience}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-navy-700 leading-relaxed">
                {c.description}
              </p>
              <div className="mt-4 hairline pt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-semibold text-navy-900 tabular-nums">
                    {c.participants}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-navy-500">
                    People
                  </div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-navy-900">
                    {c.duration}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-navy-500">
                    Window
                  </div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-emerald-700">
                    +{c.lift}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-navy-500">
                    Score lift
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button className="text-sm bg-navy-900 text-white px-3 py-2 rounded-md hover:bg-navy-800">
                  {c.status === "Live"
                    ? "View progress"
                    : c.status === "Draft"
                    ? "Continue draft"
                    : c.status === "Scheduled"
                    ? "Manage"
                    : "Launch"}
                </button>
                <button className="text-sm border border-navy-200 text-navy-700 px-3 py-2 rounded-md hover:bg-white">
                  Customize
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
