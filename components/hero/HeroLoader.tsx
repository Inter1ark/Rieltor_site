"use client";

import { AnimatePresence, motion } from "motion/react";

/**
 * Премиальный лоадер: держится, пока не готов первый кадр,
 * затем плавно растворяется. Прогресс показывает загрузку секвенции.
 */
export function HeroLoader({
  firstReady,
  loadedCount,
  total,
}: {
  firstReady: boolean;
  loadedCount: number;
  total: number;
}) {
  const pct = Math.round((loadedCount / total) * 100);

  return (
    <AnimatePresence>
      {!firstReady && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-bg"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl tracking-tight text-fg sm:text-3xl"
          >
            Правильная Локация
          </motion.p>
          <div className="mt-6 h-px w-48 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-emerald"
              animate={{ width: `${pct}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-fg-dim">
            {pct}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
