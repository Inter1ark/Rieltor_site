import Image from "next/image";
import { PRINCIPLES, STATS } from "@/lib/site.content";
import { Reveal } from "@/components/ui/Reveal";

export function WhyUs() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div>
            <span className="mb-5 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald">
              <span className="h-px w-6 bg-emerald/60" />
              Наш подход
            </span>
            <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.08] tracking-tight text-fg">
              Сами проходим путь, который рекомендуем
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted">
              Смотрим на объект как собственники и инвесторы. Оцениваем не
              недвижимость, а её влияние на ваши деньги и результат.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line">
            <Image
              src="/images/handshake.jpg"
              alt="Партнёрство"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/70 to-transparent" />
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.07}>
            <article className="h-full bg-bg p-8">
              <h3 className="font-display text-base font-semibold text-fg">
                {p.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                {p.text}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="rounded-2xl border border-line bg-white/[0.02] p-8">
              <p className="font-display text-3xl font-semibold text-emerald">
                {s.value}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
