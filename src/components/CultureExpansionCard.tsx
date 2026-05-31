import { Culture } from "@/lib/types";
import { cls } from "@/lib/utils";

export function CultureExpansionCard({ culture }: { culture: Culture }) {
  const active = culture.status === "active";
  return (
    <div
      className={cls(
        "exec-card p-5 relative overflow-hidden",
        !active && "opacity-90"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cls(
            "text-2xl w-11 h-11 rounded-md grid place-items-center border",
            active ? "bg-red-warm-soft border-red-200" : "bg-navy-50 border-navy-100"
          )}
        >
          {culture.flag}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-navy-900">
              {culture.name}
            </h3>
            {active ? (
              <span className="text-[10px] uppercase tracking-[0.14em] bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full px-2 py-0.5">
                Active
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-[0.14em] bg-navy-50 text-navy-600 border border-navy-100 rounded-full px-2 py-0.5">
                Coming soon
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-navy-500 leading-relaxed">
            {culture.tagline}
          </p>
        </div>
      </div>
      {active && (
        <span className="absolute top-0 right-0 w-16 h-16 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold/10" />
      )}
    </div>
  );
}
