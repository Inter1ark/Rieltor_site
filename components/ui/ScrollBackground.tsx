"use client";

import { motion, useScroll, useTransform } from "motion/react";

/**
 * Плавная смена фона при скролле (фиксированный слой за контентом).
 * Тёмные премиальные оттенки перетекают друг в друга. Прозрачные секции
 * показывают этот слой, секции с картинками и акцентным фоном его перекрывают.
 */
export function ScrollBackground() {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#05070a", "#080c12", "#0b1117", "#070a0e", "#05070a"]
  );

  return (
    <motion.div
      aria-hidden
      style={{ backgroundColor }}
      className="fixed inset-0 -z-10"
    />
  );
}
