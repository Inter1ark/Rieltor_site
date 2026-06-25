import { PROCESS, OUTCOMES } from "@/lib/site.content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Process() {
  return (
    <section
      id="process"
      className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36"
    >
      <SectionHeading
        eyebrow="Как мы работаем"
        title="Принимаем решения как инвесторы, а не как продавцы"
        description="Прозрачный путь от задачи клиента до обоснованного заключения. Вы видите логику на каждом шаге."
      />

      <div className="mt-16 grid gap-x-10 gap-y-10 md:grid-cols-2">
        {PROCESS.map((step, i) => (
          <Reveal key={step.title} delay={(i % 2) * 0.08}>
            <div className="flex gap-5 border-b border-line pb-7">
              <span className="font-display text-2xl font-semibold tabular-nums text-emerald/80">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-fg">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                  {step.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Три варианта заключения */}
      <Reveal className="mt-16" delay={0.05}>
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-fg-dim">
          Заключение всегда одно из трёх
        </p>
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {OUTCOMES.map((o, i) => (
          <Reveal key={o.title} delay={i * 0.1}>
            <div
              className={cn(
                "h-full rounded-2xl border p-7",
                o.tone === "go" && "border-emerald/30 bg-emerald/[0.05]",
                o.tone === "improve" && "border-azure/30 bg-azure/[0.05]",
                o.tone === "stop" && "border-line bg-white/[0.02]"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    o.tone === "go" && "bg-emerald",
                    o.tone === "improve" && "bg-azure",
                    o.tone === "stop" && "bg-fg-dim"
                  )}
                />
                <h3 className="font-display text-lg font-semibold text-fg">
                  {o.title}
                </h3>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                {o.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
