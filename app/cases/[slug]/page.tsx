import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/ui/Reveal";
import { CASES, getCase } from "@/lib/cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "Кейс" };
  return { title: c.title, description: c.summary };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  return (
    <SiteShell>
      <article className="mx-auto max-w-4xl px-6 pb-28 pt-28 lg:pt-36">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 font-sans text-sm text-fg-muted transition-colors hover:text-emerald"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 19l-7-7 7-7" />
          </svg>
          Все кейсы
        </Link>

        <Reveal className="mt-8">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald">
            {c.sector}
          </span>
          <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.06] tracking-tight text-fg">
            {c.title}
          </h1>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line">
            <Image src={c.image} alt={c.title} fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover" priority />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {c.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-line bg-white/[0.02] p-6">
              <p className="font-display text-3xl font-semibold text-emerald">{m.value}</p>
              <p className="mt-1 text-[13px] text-fg-muted">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 space-y-12">
          <Block title="Задача">
            <p className="text-[16px] leading-relaxed text-fg-muted">{c.challenge}</p>
          </Block>
          <Block title="Что мы сделали">
            <ul className="space-y-3">
              {c.work.map((w) => (
                <li key={w} className="flex gap-3 text-[16px] leading-relaxed text-fg">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                  {w}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Результат">
            <p className="text-[16px] leading-relaxed text-fg-muted">{c.result}</p>
          </Block>
        </div>

        <div className="mt-16 rounded-2xl border border-emerald/25 bg-emerald/[0.05] p-8 text-center lg:p-10">
          <p className="font-display text-xl font-semibold text-fg">
            Хотите такой же разбор своего объекта?
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald px-7 py-3.5 font-sans text-sm font-semibold text-[#04130d] transition-shadow duration-300 hover:shadow-[0_12px_40px_-8px_rgba(47,224,166,0.55)]"
          >
            Отправить объект на разбор
          </Link>
        </div>
      </article>
    </SiteShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-fg-dim">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
