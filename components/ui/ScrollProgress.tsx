"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Тонкий индикатор прогресса прокрутки страницы (под Hero, виден на статике). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-30 h-[2px] origin-left bg-gradient-to-r from-emerald via-emerald to-azure"
    />
  );
}
