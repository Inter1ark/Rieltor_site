import { AUDIENCE } from "@/lib/site.content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Audience() {
  return (
    <section
      id="audience"
      className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28"
    >
      <SectionHeading eyebrow="Кому помогаем" title="Решения для тех, кто вкладывает" />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {AUDIENCE.map((a, i) => (
          <Reveal key={a.title} delay={(i % 5) * 0.06}>
            <div className="group h-full rounded-xl border border-line bg-white/[0.02] p-6 transition-colors duration-300 hover:border-emerald/30">
              <h3 className="font-display text-base font-semibold text-fg">
                {a.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                {a.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
