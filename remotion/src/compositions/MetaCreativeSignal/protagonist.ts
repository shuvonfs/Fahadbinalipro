/**
 * The protagonist creative's state across the whole timeline (global seconds). It is rendered once,
 * above the scenes, so it morphs continuously instead of being re-entered every scene.
 */
import { CanvasKey, canvasTrack } from "../../brand";
import { C } from "./cues";

export const PROTAGONIST_KEYS: CanvasKey[] = [
  // hook — assemble at centre, attention field forms
  { at: C.open, dur: 2.2, build: 1, typeA: 1 },
  { at: 2.0, dur: 0.6, ripple: 1 },
  // break open
  { at: C.aiDriven, dur: 1.4, explode: 1, ripple: 0, s: 0.92 },
  // reassemble, move left to emit signals
  { at: C.offer, dur: 1.0, explode: 0 },
  { at: C.offer + 0.5, dur: 1.2, x: 430, s: 0.72 },
  // real estate — clear headline, retype creative A
  { at: C.realEstate, dur: 1.0, x: 720, y: 540, s: 0.95, typeA: 0 },
  { at: C.headlineA, dur: 1.5, typeA: 1 },
  // morph into creative B
  { at: C.creativeB + 0.3, dur: 0.7, showB: 1 },
  { at: C.headlineB, dur: 2.2, typeB: 1 },
  { at: C.family, dur: 1.2, family: 1 },
  // two worlds
  { at: C.sameApartment - 0.1, dur: 1.0, x: 1300, y: 430, s: 0.62 },
  // engagement
  { at: C.because - 0.1, dur: 1.0, x: 380, y: 520 },
  // ranking: hand over to mini candidates
  { at: C.metaSays - 0.3, dur: 0.5, o: 0 },
  // relevance — comes back beautiful at centre, then zooms out
  { at: C.soCreative - 0.3, dur: 0.1, x: 960, y: 540, s: 0.85 },
  { at: C.soCreative - 0.1, dur: 0.6, o: 1 },
  { at: C.beautiful, dur: 0.6, ripple: 1 },
  { at: C.question, dur: 1.3, x: 560, y: 560, s: 0.5, ripple: 0 },
  // clones & worlds handled by scenes
  { at: C.mistake - 0.1, dur: 0.4, o: 0 },
  // material — the beautiful creative returns, then decomposes
  { at: C.goodCreative - 0.4, dur: 0.1, x: 520, y: 520, s: 0.8 },
  { at: C.goodCreative - 0.2, dur: 0.6, o: 1, ripple: 1 },
  { at: C.prettyAd - 1.1, dur: 1.2, explode: 1, ripple: 0 },
  { at: C.prettyAd + 0.1, dur: 0.6, o: 0 },
];

export const protagonist = (t: number) => canvasTrack(t, PROTAGONIST_KEYS);
