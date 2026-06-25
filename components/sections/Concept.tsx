import Image from "next/image";
import { STANDARD_APPROACH, OUR_APPROACH } from "@/lib/site.content";
import { Reveal } from "@/components/ui/Reveal";

export function Concept() {
  return (
    <section
      id="concept"
      className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Изображение с наложенной карточкой (dimensional layering) */}
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <Image
                src="/images/building-dark.jpg"
                alt="Современное здание"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 w-52 rounded-2xl border border-emerald/25 bg-bg-elev/90 p-5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md sm:-right-6">
              <p className="font-display text-3xl font-semibold text-emerald">
                0%
              </p>
              <p className="mt-1 text-[13px] leading-snug text-fg-muted">
                комиссий от продавцов. Только ваши интересы.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Текст и сравнение подходов */}
        <Reveal delay={0.1}>
          <div>
            <span className="mb-5 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald">
              <span className="h-px w-6 bg-emerald/60" />
              Подход
            </span>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-[1.08] tracking-tight text-fg">
              Брокер ищет помещение. Мы отвечаем, стоит ли вкладывать деньги.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted">
              Анализируем локацию, спрос, экономику и риски, чтобы вы приняли
              решение до вложения денег.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-fg-dim">
                  Стандартный подход
                </p>
                <ul className="mt-4 space-y-2.5">
                  {STANDARD_APPROACH.map((i) => (
                    <li key={i} className="text-[14px] text-fg-muted">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald">
                  Наш подход
                </p>
                <ul className="mt-4 space-y-2.5">
                  {OUR_APPROACH.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] text-fg">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
