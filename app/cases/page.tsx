import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/ui/Reveal";
import { CASES } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Кейсы",
  description:
    "Примеры независимой экспертизы недвижимости и бизнеса: анализ локации, рисков и экономики до сделки.",
};

export default function CasesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-28 lg:px-10 lg:pt-36">
        <Reveal>
          <span className="mb-4 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald">
            <span className="h-px w-6 bg-emerald/60" />
            Кейсы
          </span>
          <h1 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-tight text-fg">
            Решения, проверенные цифрами
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Реальные проекты, где независимая экспертиза изменила исход сделки.
            Детали могут быть раскрыты частично из-за конфиденциальности.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10 lg:pb-36">
        <div className="grid gap-6 md:grid-cols-2">
          {CASES.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 0.1}>
              <Link
                href={`/cases/${c.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-line bg-bg transition-colors duration-300 hover:border-emerald/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/85 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-line-strong bg-bg/70 px-3 py-1 font-sans text-[11px] uppercase tracking-wider text-fg-muted backdrop-blur">
                    {c.sector}
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="flex items-baseline gap-1.5">
                        <span className="font-display text-xl font-semibold text-emerald">
                          {m.value}
                        </span>
                        <span className="text-[12px] text-fg-dim">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <h2 className="mt-5 font-display text-xl font-semibold text-fg">
                    {c.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                    {c.summary}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
