import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Linear interpolation. */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Clamp a value to the [min, max] range. */
export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}
