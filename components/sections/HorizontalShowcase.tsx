"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { SERVICES } from "@/lib/site.content";

/**
 * Горизонтальная галерея «Направления» в стиле phantom.moscow:
 * секция «залипает», и при вертикальном скролле ряд панелей едет по горизонтали.
 * Дистанция измеряется по факту (ref), поэтому работает на любой ширине.
 * Уважает prefers-reduced-motion (fallback: обычная горизонтальная прокрутка).
 */
export function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const measure = () => {
      if (rowRef.current) {
        setTravel(Math.max(0, rowRef.current.scrollWidth - window.innerWidth));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  // Доводим прогресс в проценты для индикатора
  const progressW = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);

  if (reduced) {
    return (
      <section id="services" className="py-24 lg:py-28">
        <Heading />
        <div className="mt-10 flex snap-x gap-5 overflow-x-auto px-6 pb-6 lg:px-10">
          {SERVICES.map((s) => (
            <Panel key={s.title} s={s} className="w-[80vw] sm:w-[60vw] lg:w-[40vw]" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ height: `calc(100vh + ${travel}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="px-6 lg:px-10">
          <Heading />
        </div>

        <motion.div ref={rowRef} style={{ x }} className="mt-8 flex gap-5 px-6 lg:px-10">
          {SERVICES.map((s) => (
            <Panel
              key={s.title}
              s={s}
              className="w-[82vw] sm:w-[58vw] lg:w-[40vw] xl:w-[34vw]"
            />
          ))}
        </motion.div>

        {/* индикатор прогресса */}
        <div className="mx-6 mt-8 h-px max-w-xs bg-white/10 lg:mx-10">
          <motion.div style={{ width: progressW }} className="h-px bg-emerald" />
        </div>
      </div>
    </section>
  );
}

function Heading() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <span className="mb-4 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald">
          <span className="h-px w-6 bg-emerald/60" />
          Направления
        </span>
        <h2 className="font-display text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-fg">
          Ключевые услуги
        </h2>
      </div>
      <p className="hidden font-sans text-[12px] uppercase tracking-[0.2em] text-fg-dim sm:block">
        Листайте вниз →
      </p>
    </div>
  );
}

function Panel({
  s,
  className,
}: {
  s: (typeof SERVICES)[number];
  className?: string;
}) {
  return (
    <article
      className={`group relative aspect-[3/4] shrink-0 overflow-hidden rounded-3xl border border-line ${className}`}
    >
      <Image
        src={s.image}
        alt={s.title}
        fill
        sizes="(max-width: 1024px) 80vw, 40vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/5" />
      <div className="relative flex h-full flex-col justify-end p-8 lg:p-10">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald">
          Услуга
        </span>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-fg lg:text-3xl">
          {s.title}
        </h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-fg-muted">
          {s.text}
        </p>
      </div>
    </article>
  );
}
