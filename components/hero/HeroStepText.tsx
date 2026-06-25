"use client";

import { AnimatePresence, motion } from "motion/react";
import { type HeroStep } from "@/lib/hero.config";
import { cn } from "@/lib/utils";

/**
 * Тексты текущего шага Hero. При смене шага старый блок быстро растворяется,
 * новый — появляется с задержкой (когда видео уже почти домотано до кадра).
 */
export function HeroStepText({
  steps,
  step,
  duration,
  onNavigate,
}: {
  steps: HeroStep[];
  step: number;
  /** Длительность перехода к текущему шагу — текст появляется ближе к её концу. */
  duration: number;
  /** Клик по CTA с якорем: отпускаем Hero и скроллим к секции. */
  onNavigate?: (href: string) => void;
}) {
  const s = steps[step];
  const align = s.align ?? "center";
  // Текст проявляется, когда видео уже почти домотано до кадра шага
  const enterDelay = Math.max(0.35, duration - 0.7);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
              duration: 0.7,
              delay: enterDelay,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          exit={{
            opacity: 0,
            y: -18,
            filter: "blur(10px)",
            transition: { duration: 0.35, ease: "easeIn" },
          }}
          className={cn(
            "pointer-events-auto flex w-full flex-col",
            align === "center" && "items-center text-center",
            align === "left" && "items-start text-left",
            align === "right" && "items-end text-right"
          )}
        >
          <div
            className={cn(
              // Полупрозрачная подложка (мягкий скрим), чтобы текст не сливался
              // с фоном. Без backdrop-blur — чтобы не нагружать перемотку.
              "flex flex-col rounded-[28px] border border-white/10 px-7 py-9 shadow-[0_24px_90px_-30px_rgba(0,0,0,0.9)] sm:px-11 sm:py-11",
              "bg-[radial-gradient(120%_120%_at_50%_50%,rgba(5,7,10,0.66)_0%,rgba(5,7,10,0.42)_100%)]",
              align === "center" && "max-w-4xl items-center",
              align === "left" && "max-w-2xl items-start",
              align === "right" && "max-w-2xl items-end"
            )}
          >
            {s.eyebrow && (
              <p className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.34em] text-emerald sm:text-xs">
                {s.eyebrow}
              </p>
            )}
            {s.title && (
              <h2 className="font-display text-balance text-[clamp(2.4rem,6.4vw,5.6rem)] font-semibold leading-[1.02] tracking-tight text-fg text-glow-emerald">
                {s.title}
              </h2>
            )}
            {s.subtitle && (
              <p className="mt-6 text-pretty font-sans text-base leading-relaxed text-fg-muted sm:text-lg md:text-xl">
                {s.subtitle}
              </p>
            )}
            {s.ctas && s.ctas.length > 0 && (
              <div
                className={cn(
                  "mt-10 flex flex-wrap gap-4",
                  align === "center" && "justify-center",
                  align === "right" && "justify-end"
                )}
              >
                {s.ctas.map((cta) => (
                  <a
                    key={cta.label}
                    href={cta.href}
                    onClick={(e) => {
                      if (cta.href.startsWith("#") && onNavigate) {
                        e.preventDefault();
                        onNavigate(cta.href);
                      }
                    }}
                    className={cn(
                      "group relative overflow-hidden rounded-full px-7 py-3.5 font-sans text-sm font-semibold transition-all duration-300",
                      cta.variant === "ghost"
                        ? "border border-line-strong text-fg hover:border-emerald/60 hover:bg-white/5"
                        : "bg-emerald text-[#04130d] hover:shadow-[0_10px_40px_-8px_rgba(47,224,166,0.55)]"
                    )}
                  >
                    <span className="relative z-10">{cta.label}</span>
                    {cta.variant !== "ghost" && (
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
