import { MARQUEE } from "@/lib/site.content";

/** Бесконечная бегущая строка (чистый CSS, без JS). */
export function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative overflow-hidden border-y border-line bg-bg py-5">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-12 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-sm uppercase tracking-[0.3em] text-fg-dim">
            {w}
            <span className="h-1 w-1 rounded-full bg-emerald/70" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
