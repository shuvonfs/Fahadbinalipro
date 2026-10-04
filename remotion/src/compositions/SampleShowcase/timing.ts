import { sec } from "../../config/video";

/**
 * Scene lengths in frames. Edit these to change the video's duration —
 * the composition's total length is computed from them below.
 */
export const TIMING = {
  intro: sec(4),
  shapes: sec(5),
  outro: sec(4),
  crossfade: sec(0.7),
};

/** Transitions overlap neighbouring scenes, so they shorten the total. */
export const TOTAL_FRAMES = TIMING.intro + TIMING.shapes + TIMING.outro - 2 * TIMING.crossfade;
