"use client";

import { useEffect, useRef, useState } from "react";
import { FRAME_COUNT, framePath } from "@/lib/hero.config";

export type FrameSequence = {
  images: HTMLImageElement[];
  loadedCount: number;
  total: number;
  /** Первый кадр готов — можно начинать рисовать. */
  firstReady: boolean;
  /** Все кадры загружены — скролл будет идеально плавным. */
  ready: boolean;
};

/**
 * Предзагружает всю секвенцию кадров.
 * Набор (desktop/mobile) выбирается один раз по ширине экрана, чтобы на
 * телефонах грузить лёгкие кадры (~1.3 МБ против ~3 МБ).
 */
export function useFrameSequence(): FrameSequence {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstReady, setFirstReady] = useState(false);

  useEffect(() => {
    const set =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches
        ? "mobile"
        : "desktop";

    let cancelled = false;
    let done = 0;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    const onOne = (i: number, ok: boolean) => {
      if (cancelled) return;
      done += 1;
      // firstReady — по декодированному первому кадру; либо подстраховка,
      // чтобы лоадер не завис, если самый первый кадр не загрузился
      if ((i === 0 && ok) || done >= 12) setFirstReady(true);
      if (!ok && typeof console !== "undefined") {
        console.warn(`[hero] кадр не загрузился: ${framePath(i, set)}`);
      }
      // Батчим обновления, чтобы не спамить рендерами
      if (done === FRAME_COUNT || done % 4 === 0) setLoadedCount(done);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i, set);
      if (img.complete && img.naturalWidth > 0) {
        onOne(i, true);
      } else {
        img.onload = () => onOne(i, true);
        img.onerror = () => onOne(i, false);
      }
      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    images: imagesRef.current,
    loadedCount,
    total: FRAME_COUNT,
    firstReady,
    ready: loadedCount >= FRAME_COUNT,
  };
}
