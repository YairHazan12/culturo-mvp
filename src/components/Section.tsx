import { ReactNode } from "react";

export function Section({
  title,
  eyebrow,
  description,
  action,
  children,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          {eyebrow && (
            <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm font-medium">
              {eyebrow}
            </div>
          )}
          <h2 className="mt-1 text-xl md:text-2xl font-semibold text-navy-900 tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-1.5 text-sm text-navy-500 max-w-2xl">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function KpiTile({
  label,
  value,
  delta,
  hint,
  accent,
}: {
  label: string;
  value: string | number;
  delta?: { dir: "up" | "down"; text: string };
  hint?: string;
  accent?: "gold" | "red" | "navy" | "emerald";
}) {
  const accentBar =
    accent === "red"
      ? "bg-red-warm"
      : accent === "emerald"
      ? "bg-emerald-500"
      : accent === "navy"
      ? "bg-navy-900"
      : "bg-gold";
  return (
    <div className="exec-card p-4 relative overflow-hidden">
      <span className={`absolute left-0 top-0 bottom-0 w-0.5 ${accentBar}`} />
      <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
        {label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <div className="text-2xl font-semibold text-navy-900 tabular-nums">
          {value}
        </div>
        {delta && (
          <div
            className={`text-xs font-medium ${
              delta.dir === "up" ? "text-emerald-700" : "text-red-warm"
            }`}
          >
            {delta.dir === "up" ? "▲" : "▼"} {delta.text}
          </div>
        )}
      </div>
      {hint && <div className="mt-1 text-[11px] text-navy-500">{hint}</div>}
    </div>
  );
}
