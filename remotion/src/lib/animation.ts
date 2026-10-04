/**
 * Animation helpers. Everything is a pure function of the frame number, so
 * renders are deterministic. Never use CSS transitions/animations in Remotion.
 */
import { Easing, interpolate, spring } from "remotion";

export const EASE = {
  out: Easing.bezier(0.16, 1, 0.3, 1), // expo-like ease-out for entrances
  inOut: Easing.bezier(0.65, 0, 0.35, 1), // smooth moves
  in: Easing.bezier(0.7, 0, 0.84, 0), // exits
} as const;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 → 1 progress between two frames, eased. */
export const progress = (
  frame: number,
  start: number,
  duration: number,
  easing: (t: number) => number = EASE.out,
) => interpolate(frame, [start, start + duration], [0, 1], { ...clamp, easing });

/** Linear map with clamping (shorthand for interpolate). */
export const mapRange = (
  frame: number,
  input: [number, number],
  output: [number, number],
  easing?: (t: number) => number,
) => interpolate(frame, input, output, { ...clamp, easing });

/** Physically based 0 → 1 spring starting at `delay` frames. */
export const springIn = (
  frame: number,
  fps: number,
  delay = 0,
  config: { damping?: number; stiffness?: number; mass?: number } = { damping: 200 },
) => spring({ frame: frame - delay, fps, config });

/** Frame offset for item `index` in a staggered group. */
export const stagger = (index: number, every: number, start = 0) => start + index * every;

/** Fade + rise entrance style for any element. */
export const enter = (
  frame: number,
  start: number,
  duration = 18,
  distance = 40,
): React.CSSProperties => {
  const p = progress(frame, start, duration);
  return { opacity: p, transform: `translateY(${(1 - p) * distance}px)` };
};

/** Fade + drift exit style. */
export const exit = (
  frame: number,
  start: number,
  duration = 12,
  distance = 30,
): React.CSSProperties => {
  const p = progress(frame, start, duration, EASE.in);
  return { opacity: 1 - p, transform: `translateY(${-p * distance}px)` };
};
