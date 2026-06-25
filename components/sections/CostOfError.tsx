import Image from "next/image";
import { RISKS } from "@/lib/site.content";
import { Reveal } from "@/components/ui/Reveal";

export function CostOfError() {
  return (
    <section id="cost" className="relative overflow-hidden border-y border-line">
      <Image
        src="/images/skyline-night.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/85 to-bg" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald">
              <span className="h-px w-6 bg-emerald/60" />
              Цена ошибки
            </span>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.06] tracking-tight text-fg">
              Ошибка стоит от сотен тысяч до миллионов
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-fg-muted">
              Серьёзные последствия видны уже после сделки, когда изменить решение
              сложно или невозможно.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3.5 font-sans text-sm font-semibold text-[#04130d] transition-shadow duration-300 hover:shadow-[0_12px_40px_-8px_rgba(47,224,166,0.55)]"
            >
              Проверить объект
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </Reveal>

          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {RISKS.map((r, i) => (
              <Reveal key={r.title} delay={(i % 2) * 0.08}>
                <div className="border-t border-line pt-4">
                  <h3 className="font-display text-base font-semibold text-fg">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                    {r.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
