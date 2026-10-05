/**
 * FAHAD BRAND — motion language.
 *
 * The same motion vocabulary used in the HyperFrames productions (videos/), expressed as
 * pure functions of time so Remotion renders it frame-accurately:
 *   • entrances: expo-out ease (OUT), 0.35–0.6s
 *   • text: masked rise from below (rise)
 *   • emphasis / objects: back-out pop with slight overshoot (pop)
 *   • data flow: SVG line draw-on (drawn) + travelling signal dots (along)
 *   • exits: quick ease-in fade (IN), ~0.3s
 *   • progressive disclosure: stagger 0.12–0.3s between siblings
 * Everything is keyed to *seconds on the voiceover timeline* (cue times), not frames.
 */
import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const IN = Easing.bezier(0.7, 0, 0.84, 0);
export const BACK = Easing.out(Easing.back(1.5));

/** Global time (seconds) for a component rendered inside <Sequence from={start}>. */
export const useT = (sceneStart: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return sceneStart + frame / fps;
};

/** 0 → 1 between start and start+dur (seconds), eased + clamped. */
export const p = (t: number, start: number, dur: number, easing: (x: number) => number = OUT) =>
  interpolate(t, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

/** 1 while t is inside [a, b], easing in/out over `fade` seconds. */
export const on = (t: number, a: number, b: number, fade = 0.3) => p(t, a, fade) * (1 - p(t, b, fade, IN));

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

/** Masked rise — place inside an overflow:hidden wrapper. */
export const rise = (t: number, start: number, dur = 0.55): React.CSSProperties => ({
  transform: `translateY(${(1 - p(t, start, dur)) * 115}%)`,
});

export const fadeUp = (t: number, start: number, dur = 0.45, dist = 24) => {
  const k = p(t, start, dur);
  return { opacity: k, y: (1 - k) * dist };
};

export const pop = (t: number, start: number, dur = 0.5) => ({
  opacity: p(t, start, dur * 0.6),
  scale: lerp(0.86, 1, p(t, start, dur, BACK)),
});

/** stroke-dasharray / offset to draw an SVG path on. */
export const drawn = (d: string, t: number, start: number, dur = 0.6) => evolvePath(p(t, start, dur, IN_OUT), d);

/** Point travelling along `d`, looping every `period` seconds after `start` (null before). */
export const along = (d: string, t: number, start: number, period = 1.2, offset = 0) => {
  if (t < start) return null;
  const phase = (((t - start) / period + offset) % 1 + 1) % 1;
  return { ...getPointAtLength(d, phase * getLength(d)), phase };
};
