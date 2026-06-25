import Image from "next/image";
import Link from "next/link";
import { POSTS } from "@/lib/blog";
import { Reveal } from "@/components/ui/Reveal";

export function BlogTeaser() {
  const items = POSTS.slice(0, 3);
  return (
    <section
      id="blog"
      className="relative border-t border-line bg-bg-elev/40 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <span className="mb-4 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald">
                <span className="h-px w-6 bg-emerald/60" />
                Блог
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.06] tracking-tight text-fg">
                Разбираемся в недвижимости и инвестициях
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-sans text-sm font-medium text-fg transition-colors hover:border-emerald/60 hover:text-emerald"
            >
              Все статьи
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link
                href={`/blog/${p.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-line bg-bg transition-colors duration-300 hover:border-emerald/30"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 font-sans text-[12px] text-fg-dim">
                    <span className="text-emerald">{p.tag}</span>
                    <span>{p.readingTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-fg">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
