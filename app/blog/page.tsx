import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/ui/Reveal";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Статьи об анализе недвижимости, локаций, рисков и инвестиций. Практические разборы до сделки.",
};

export default function BlogPage() {
  const [lead, ...rest] = POSTS;
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-28 lg:px-10 lg:pt-36">
        <Reveal>
          <span className="mb-4 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald">
            <span className="h-px w-6 bg-emerald/60" />
            Блог
          </span>
          <h1 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-tight text-fg">
            Аналитика недвижимости и инвестиций
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Практические разборы о том, как оценивать объекты, локации и риски до
            того, как вложить деньги.
          </p>
        </Reveal>
      </section>

      {/* Главная статья */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <Link
            href={`/blog/${lead.slug}`}
            className="group grid overflow-hidden rounded-2xl border border-line bg-bg transition-colors duration-300 hover:border-emerald/30 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              <Image src={lead.cover} alt={lead.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="flex items-center gap-3 font-sans text-[12px] text-fg-dim">
                <span className="text-emerald">{lead.tag}</span>
                <span>{lead.dateLabel}</span>
                <span>{lead.readingTime}</span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-semibold leading-tight text-fg">
                {lead.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                {lead.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-emerald">
                Читать статью
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 pt-6 lg:px-10 lg:pb-36">
        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.1}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex h-full gap-5 rounded-2xl border border-line bg-bg p-5 transition-colors duration-300 hover:border-emerald/30"
              >
                <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-xl">
                  <Image src={p.cover} alt={p.title} fill sizes="144px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div>
                  <div className="flex items-center gap-3 font-sans text-[12px] text-fg-dim">
                    <span className="text-emerald">{p.tag}</span>
                    <span>{p.readingTime}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-fg">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-fg-muted">
                    {p.excerpt}
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
