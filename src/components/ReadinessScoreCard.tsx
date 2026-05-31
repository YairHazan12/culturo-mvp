"use client";

import { scoreColor, scoreLabel } from "@/lib/utils";

export function ReadinessScoreCard({
  score,
  delta,
  subtitle = "China Deal Readiness",
  compact = false,
}: {
  score: number;
  delta?: number;
  subtitle?: string;
  compact?: boolean;
}) {
  const r = compact ? 40 : 54;
  const stroke = compact ? 8 : 10;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, score)) / 100) * c;
  const size = (r + stroke) * 2;

  return (
    <div className="exec-card p-5 md:p-6 flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            fill="none"
            className="score-track"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="score-fill"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className={`text-3xl font-semibold ${scoreColor(score)}`}>
              {score}
            </div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
              / 100
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-[0.16em] text-navy-500">
          {subtitle}
        </div>
        <div className="mt-1 text-lg font-medium text-navy-900">
          {scoreLabel(score)}
        </div>
        {typeof delta === "number" && (
          <div className="mt-1 text-xs text-navy-500">
            <span
              className={
                delta >= 0 ? "text-emerald-700 font-medium" : "text-red-warm font-medium"
              }
            >
              {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}
            </span>{" "}
            vs. last week
          </div>
        )}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-1 w-8 rounded-full bg-gold" />
          <span className="text-[11px] text-navy-500">
            Updated just now
          </span>
        </div>
      </div>
    </div>
  );
}
