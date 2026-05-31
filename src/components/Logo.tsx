import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span
        className={`relative inline-flex items-center justify-center w-8 h-8 rounded-md ${
          light ? "bg-white" : "bg-navy-900"
        }`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path
            d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
            stroke={light ? "#0a1428" : "#b8924a"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 10.5c1.2-2 2.6-3 4-3s2.8 1 4 3"
            stroke={light ? "#c0392b" : "#ffffff"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="14" r="1.4" fill={light ? "#c0392b" : "#b8924a"} />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-semibold tracking-tight ${
            light ? "text-white" : "text-navy-900"
          }`}
        >
          Culturo
        </span>
        <span
          className={`text-[10px] uppercase tracking-[0.18em] ${
            light ? "text-white/70" : "text-navy-500"
          }`}
        >
          Cultural Intelligence
        </span>
      </span>
    </Link>
  );
}
