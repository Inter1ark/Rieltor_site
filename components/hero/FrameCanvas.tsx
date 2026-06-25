"use client";

import { useCallback, useEffect, useRef } from "react";
import { type MotionValue, useMotionValueEvent } from "motion/react";
import { FRAME_COUNT } from "@/lib/hero.config";
import type { FrameSequence } from "./useFrameSequence";

/**
 * Canvas, рисующий кадр секвенции по дробному значению `frame`
 * (0…FRAME_COUNT-1). Между двумя соседними кадрами выполняется плавное
 * смешивание (cross-dissolve), поэтому даже малое число кадров между стопами
 * выглядит как непрерывное 60 fps видео без ступенек.
 */
export function FrameCanvas({
  frame,
  sequence,
}: {
  frame: MotionValue<number>;
  sequence: FrameSequence;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastValue = useRef(-1);
  const seqRef = useRef(sequence);
  seqRef.current = sequence;

  /** Рисует изображение в режиме object-fit: cover с заданной прозрачностью. */
  const paint = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement | undefined,
      alpha: number
    ) => {
      if (!img || !img.complete || img.naturalWidth === 0) return false;
      const cw = ctx.canvas.width;
      const ch = ctx.canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      ctx.globalAlpha = 1;
      return true;
    },
    []
  );

  const render = useCallback(
    (value: number) => {
      if (Math.abs(value - lastValue.current) < 0.0008) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const max = FRAME_COUNT - 1;
      const v = Math.min(max, Math.max(0, value));
      const lo = Math.floor(v);
      const hi = Math.min(max, lo + 1);
      const frac = v - lo;

      const imgs = seqRef.current.images;
      // нижний кадр — непрозрачно (перекрывает предыдущую отрисовку)
      const drew = paint(ctx, imgs[lo], 1);
      // верхний кадр — поверх с прозрачностью = дробная часть → плавный dissolve
      if (drew && frac > 0.012 && hi !== lo) {
        paint(ctx, imgs[hi], frac);
      }
      if (drew) lastValue.current = value;
    },
    [paint]
  );

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    lastValue.current = -1;
    render(frame.get());
  }, [frame, render]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useMotionValueEvent(frame, "change", (v) => render(v));

  // Перерисовать, как только догрузились кадры
  useEffect(() => {
    lastValue.current = -1;
    render(frame.get());
  }, [sequence.firstReady, sequence.loadedCount, frame, render]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
