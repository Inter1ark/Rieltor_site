import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { POSTS, getPost, type Block } from "@/lib/blog";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Статья" };
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: { title: p.title, description: p.excerpt, images: [p.cover] },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-6 pb-28 pt-28 lg:pt-36">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-sans text-sm text-fg-muted transition-colors hover:text-emerald"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 19l-7-7 7-7" />
          </svg>
          Все статьи
        </Link>

        <div className="mt-8 flex items-center gap-3 font-sans text-[12px] text-fg-dim">
          <span className="text-emerald">{post.tag}</span>
          <span>{post.dateLabel}</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-semibold leading-[1.08] tracking-tight text-fg">
          {post.title}
        </h1>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
          <Image src={post.cover} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
        </div>

        <div className="mt-12 space-y-6">
          {post.body.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-emerald/25 bg-emerald/[0.05] p-8 text-center lg:p-10">
          <p className="font-display text-xl font-semibold text-fg">
            Нужна экспертиза по конкретному объекту?
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

function BlockView({ block }: { block: Block }) {
  if (block.type === "h2") {
    return (
      <h2 className="pt-4 font-display text-2xl font-semibold text-fg">
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="space-y-3">
        {block.items.map((it) => (
          <li key={it} className="flex gap-3 text-[17px] leading-relaxed text-fg-muted">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
            {it}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="text-[17px] leading-relaxed text-fg-muted">{block.text}</p>
  );
}
