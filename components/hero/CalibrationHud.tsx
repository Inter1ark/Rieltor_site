"use client";

import { useState } from "react";
import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { FRAME_COUNT, HERO_STEPS } from "@/lib/hero.config";
import { cn } from "@/lib/utils";

/**
 * Калибровочная шкала (HUD): показывает текущий кадр и стопы шагов Hero.
 * Удобно для отладки таймингов. Прячется кнопкой.
 */
export function CalibrationHud({
  frame,
  step,
  loadedCount,
}: {
  frame: MotionValue<number>;
  step: number;
  loadedCount: number;
}) {
  const [open, setOpen] = useState(true);
  const [frameNum, setFrameNum] = useState(() => Math.round(frame.get()) + 1);

  useMotionValueEvent(frame, "change", (v) => {
    setFrameNum(Math.round(v) + 1);
  });

  const playheadLeft = useTransform(
    frame,
    (v) => `${(v / (FRAME_COUNT - 1)) * 100}%`
  );
  const fillScale = useTransform(frame, (v) => v / (FRAME_COUNT - 1));

  const loadPct = Math.round((loadedCount / FRAME_COUNT) * 100);

  if (!open) {
    return (
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
        <motion.div
          style={{ scaleX: fillScale }}
          className="h-[2px] origin-left bg-gradient-to-r from-emerald to-azure"
        />
        <button
          onClick={() => setOpen(true)}
          className="pointer-events-auto absolute right-3 top-3 rounded-full border border-line-strong bg-bg-elev/80 px-3 py-1 font-sans text-[11px] uppercase tracking-widest text-fg-muted backdrop-blur transition hover:text-fg"
        >
          калибровка
        </button>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
      <motion.div
        style={{ scaleX: fillScale }}
        className="h-[2px] origin-left bg-gradient-to-r from-emerald to-azure"
      />
      <div className="pointer-events-auto mx-auto mt-2 w-[min(1100px,calc(100%-1.5rem))] rounded-xl border border-line bg-bg-elev/70 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3 font-mono text-[12px] text-fg-muted">
            <span className="uppercase tracking-widest text-fg-dim">Кадр</span>
            <span className="tabular-nums text-xl font-semibold text-fg">
              {String(frameNum).padStart(3, "0")}
            </span>
            <span className="text-fg-dim">/ {FRAME_COUNT}</span>
            <span className="ml-2 rounded bg-white/5 px-2 py-0.5 text-emerald">
              шаг {step + 1}/{HERO_STEPS.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-[11px] text-fg-dim sm:inline">
              {loadPct < 100 ? `загрузка ${loadPct}%` : "кадры готовы"}
            </span>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md border border-line-strong px-2 py-1 font-mono text-[11px] text-fg-muted transition hover:text-fg"
              aria-label="Скрыть калибровку"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="relative mt-3 h-9">
          <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/10" />

          {/* стопы шагов */}
          {HERO_STEPS.map((s, i) => {
            const left = ((s.frame - 1) / (FRAME_COUNT - 1)) * 100;
            return (
              <div
                key={s.id}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${left}%` }}
              >
                <div
                  className={cn(
                    "h-3 w-3 -translate-x-1/2 rotate-45 border",
                    i === step
                      ? "border-emerald bg-emerald"
                      : "border-line-strong bg-bg-elev"
                  )}
                />
                <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider text-fg-dim">
                  {s.frame}
                </span>
              </div>
            );
          })}

          {/* playhead */}
          <motion.div
            style={{ left: playheadLeft }}
            className="absolute top-0 bottom-0 w-px -translate-x-1/2 bg-emerald/80"
          />
        </div>
      </div>
    </div>
  );
}
