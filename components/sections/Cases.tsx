import Image from "next/image";
import Link from "next/link";
import { CASES } from "@/lib/cases";
import { Reveal } from "@/components/ui/Reveal";

export function Cases() {
  const items = CASES.slice(0, 3);
  return (
    <section
      id="cases"
      className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <div>
            <span className="mb-4 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald">
              <span className="h-px w-6 bg-emerald/60" />
              Кейсы
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.06] tracking-tight text-fg">
              Как анализ меняет исход
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-sans text-sm font-medium text-fg transition-colors hover:border-emerald/60 hover:text-emerald"
          >
            Все кейсы
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.1}>
            <Link
              href={`/cases/${c.slug}`}
              className="group block h-full overflow-hidden rounded-2xl border border-line bg-bg transition-colors duration-300 hover:border-emerald/30"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-line-strong bg-bg/70 px-3 py-1 font-sans text-[11px] uppercase tracking-wider text-fg-muted backdrop-blur">
                  {c.sector}
                </span>
              </div>
              <div className="p-7">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-semibold text-emerald">
                    {c.metrics[0].value}
                  </span>
                  <span className="text-[13px] text-fg-dim">{c.metrics[0].label}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-fg">
                  {c.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                  {c.summary}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
