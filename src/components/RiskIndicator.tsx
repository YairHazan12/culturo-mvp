import { RiskLevel } from "@/lib/types";
import { cls, riskColor } from "@/lib/utils";

export function RiskIndicator({
  level,
  label,
  size = "md",
}: {
  level: RiskLevel;
  label?: string;
  size?: "sm" | "md";
}) {
  const c = riskColor(level);
  return (
    <span
      className={cls(
        "inline-flex items-center gap-1.5 rounded-full border",
        c.chip,
        size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1"
      )}
    >
      <span className={cls("w-1.5 h-1.5 rounded-full", c.dot)} />
      {label ?? c.label}
    </span>
  );
}
