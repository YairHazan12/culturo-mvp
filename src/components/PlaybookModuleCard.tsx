import Image from "next/image";
import Link from "next/link";
import { PlaybookModule } from "@/lib/types";
import { SKILL_LABELS } from "@/lib/mock";

export function PlaybookModuleCard({
  module,
  index,
  progress = 0,
}: {
  module: PlaybookModule;
  index: number;
  progress?: number;
}) {
  return (
    <Link
      href={`/playbook/${module.slug}`}
      className="exec-card group hover:border-navy-300 transition-colors block overflow-hidden"
    >
      <div className="relative aspect-[16/9] bg-navy-50 overflow-hidden">
        <Image
          src={module.image}
          alt={module.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-2.5 left-2.5 text-[10px] uppercase tracking-[0.16em] bg-white/90 text-navy-700 px-2 py-0.5 rounded">
          {SKILL_LABELS[module.skill]}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-serif text-xs text-gold tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[11px] text-navy-400">{module.minutes} min</span>
        </div>
        <h3 className="mt-2 text-base font-medium text-navy-900 leading-snug group-hover:text-navy-700">
          {module.title}
        </h3>
        <p className="mt-1.5 text-xs text-navy-500 line-clamp-2">{module.situation}</p>
        <div className="mt-4 h-1 rounded-full bg-navy-100 overflow-hidden">
          <div
            className="h-full bg-navy-900 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="text-navy-500">{progress}% complete</span>
          <span className="text-navy-900 font-medium group-hover:text-red-warm">
            {progress === 0 ? "Start →" : progress < 100 ? "Continue →" : "Review →"}
          </span>
        </div>
      </div>
    </Link>
  );
}
