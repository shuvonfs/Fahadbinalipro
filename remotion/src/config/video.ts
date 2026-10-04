/**
 * Global video settings. Change resolution / frame rate here and every
 * composition that uses these defaults follows.
 */
export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

/** Common presets — spread one into a composition's meta to switch format. */
export const FORMATS = {
  landscape: { width: 1920, height: 1080 },
  landscape4k: { width: 3840, height: 2160 },
  portrait: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
} as const;

/** Seconds → frames at the given frame rate (default: VIDEO.fps). */
export const sec = (seconds: number, fps: number = VIDEO.fps) =>
  Math.round(seconds * fps);
