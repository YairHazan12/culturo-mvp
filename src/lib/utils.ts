import { RiskLevel } from "./types";

export function cls(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function riskColor(risk: RiskLevel) {
  switch (risk) {
    case "low":
      return {
        chip: "bg-emerald-50 text-emerald-800 border-emerald-200",
        dot: "bg-emerald-500",
        label: "Low risk",
      };
    case "moderate":
      return {
        chip: "bg-amber-50 text-amber-800 border-amber-200",
        dot: "bg-amber-500",
        label: "Moderate risk",
      };
    case "elevated":
      return {
        chip: "bg-orange-50 text-orange-800 border-orange-200",
        dot: "bg-orange-500",
        label: "Elevated risk",
      };
    case "high":
      return {
        chip: "bg-red-50 text-red-800 border-red-200",
        dot: "bg-red-warm",
        label: "High risk",
      };
  }
}

export function scoreColor(score: number) {
  if (score >= 85) return "text-emerald-700";
  if (score >= 70) return "text-amber-700";
  if (score >= 50) return "text-orange-700";
  return "text-red-warm";
}

export function scoreLabel(score: number) {
  if (score >= 85) return "Deal-ready";
  if (score >= 70) return "Mostly ready";
  if (score >= 50) return "Needs prep";
  return "High risk";
}
