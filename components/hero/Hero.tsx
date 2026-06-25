"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { HERO_STEPS, STEP_DURATION } from "@/lib/hero.config";
import { useLenis } from "@/components/SmoothScroll";
import { useFrameSequence } from "./useFrameSequence";
import { FrameCanvas } from "./FrameCanvas";
import { HeroStepText } from "./HeroStepText";
import { CalibrationHud } from "./CalibrationHud";
import { HeroLoader } from "./HeroLoader";

const LAST = HERO_STEPS.length - 1;
// Мягкая симметричная кривая — без резкого «выстрела» в середине,
// чтобы доводка видео ощущалась плавной и дорогой.
const EASE: [number, number, number, number] = [0.45, 0, 0.25, 1];

/**
 * Пошаговый Hero. Каждый скролл = переход к следующему стопу: текст
 * растворяется, видео плавно доматывается до нужного кадра, появляются новые
 * тексты. После последнего стопа управление отдаётся обычному скроллу страницы.
 */
export function Hero() {
  const lenis = useLenis();
  const sequence = useFrameSequence();

  // 0-based индекс кадра, которым управляет анимация
  const frame = useMotionValue(HERO_STEPS[0].frame - 1);

  const [step, setStep] = useState(0);
  const [released, setReleased] = useState(false);

  const stepRef = useRef(0);
  const releasedRef = useRef(false);
  const animatingRef = useRef(false);
  const controls = useRef<ReturnType<typeof animate> | null>(null);

  const goTo = useCallback(
    (next: number) => {
      next = Math.max(0, Math.min(LAST, next));
      if (next === stepRef.current) return;
      stepRef.current = next;
      setStep(next);
      animatingRef.current = true;
      controls.current?.stop();
      controls.current = animate(frame, HERO_STEPS[next].frame - 1, {
        duration: HERO_STEPS[next].duration ?? STEP_DURATION,
        ease: EASE,
        onComplete: () => {
          animatingRef.current = false;
        },
      });
    },
    [frame]
  );

  // Блокировка/разблокировка скролла страницы
  const lock = useCallback(() => {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  }, [lenis]);
  const unlock = useCallback(() => {
    lenis?.start();
    document.documentElement.style.overflow = "";
  }, [lenis]);

  const release = useCallback(() => {
    if (releasedRef.current) return;
    releasedRef.current = true;
    setReleased(true);
    unlock();
  }, [unlock]);

  // Клик по CTA в Hero: отпускаем и плавно скроллим к нужной секции
  const navigate = useCallback(
    (href: string) => {
      release();
      requestAnimationFrame(() => {
        const el = document.querySelector(href);
        if (!el) return;
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -64 });
        else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
      });
    },
    [release, lenis]
  );

  const reenter = useCallback(() => {
    if (!releasedRef.current) return;
    releasedRef.current = false;
    setReleased(false);
    lock();
    stepRef.current = LAST;
    setStep(LAST);
    frame.set(HERO_STEPS[LAST].frame - 1);
  }, [lock, frame]);

  // Синхронизируем состояние блокировки, когда появляется Lenis
  useEffect(() => {
    if (!lenis) return;
    if (releasedRef.current) lenis.start();
    else lenis.stop();
  }, [lenis, released]);

  useEffect(() => {
    window.scrollTo(0, 0);
    lock();

    let touchY = 0;

    const advance = (dir: number) => {
      if (animatingRef.current) return;
      if (dir > 0) {
        if (stepRef.current >= LAST) release();
        else goTo(stepRef.current + 1);
      } else {
        goTo(stepRef.current - 1);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (releasedRef.current) {
        // вернуться в Hero, если докрутили до самого верха и тянем вверх
        if (e.deltaY < 0 && window.scrollY <= 0) {
          e.preventDefault();
          reenter();
        }
        return;
      }
      e.preventDefault();
      if (Math.abs(e.deltaY) < 4) return;
      advance(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (releasedRef.current) return;
      if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) {
        e.preventDefault();
        advance(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        advance(-1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchY - e.touches[0].clientY;
      if (releasedRef.current) {
        if (dy < 0 && window.scrollY <= 0) {
          e.preventDefault();
          reenter();
        }
        return;
      }
      e.preventDefault();
      if (Math.abs(dy) < 28) return;
      advance(dy > 0 ? 1 : -1);
      touchY = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      controls.current?.stop();
      unlock();
    };
  }, [goTo, lock, unlock, release, reenter]);

  return (
    <>
      <motion.div
        animate={{ y: released ? "-102%" : "0%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        style={{ pointerEvents: released ? "none" : "auto" }}
        className="fixed inset-0 z-40 h-screen w-full overflow-hidden bg-bg"
      >
        <FrameCanvas frame={frame} sequence={sequence} />

        {/* Затемнения для читаемости текста */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(120%_120%_at_50%_40%,transparent_28%,rgba(5,7,10,0.6)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-bg/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

        <HeroStepText
          steps={HERO_STEPS}
          step={step}
          duration={HERO_STEPS[step].duration ?? STEP_DURATION}
          onNavigate={navigate}
        />

        {/* Индикатор «листайте» — только на первом шаге */}
        <motion.div
          animate={{ opacity: step === 0 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 text-fg-muted"
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.3em]">
            листайте
          </span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-line-strong">
            <motion.span
              animate={{ y: [3, 14, 3], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-1.5 h-1.5 w-1 rounded-full bg-emerald"
            />
          </span>
        </motion.div>

        <HeroLoader
          firstReady={sequence.firstReady}
          loadedCount={sequence.loadedCount}
          total={sequence.total}
        />
      </motion.div>

      {!released && (
        <CalibrationHud
          frame={frame}
          step={step}
          loadedCount={sequence.loadedCount}
        />
      )}
    </>
  );
}
