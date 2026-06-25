"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

/** Доступ к инстансу Lenis (для остановки/запуска скролла из Hero). */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Плавный инерционный скролл (Lenis) для статичной части сайта.
 * Hero на время своей пошаговой анимации останавливает Lenis.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    setLenis(instance);

    let rafId = 0;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
