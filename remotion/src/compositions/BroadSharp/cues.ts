/**
 * Voiceover cue map (seconds) for public/broad-delivery-sharp-strategy/voiceover.mp3 — 191.71s.
 * Measured with tools/measure_voiceover.py (offline ASR word onsets) + an RMS energy pass for the
 * list passages. Brief: videos/briefs/broad-delivery-sharp-strategy.md (§07 scene map).
 */
export const C = {
  // 01 hook
  meta: 0.12, broad: 0.76, targeting: 1.04, notBroad: 2.59, strategy: 3.95, broadNo: 4.47,
  // 02 old way
  used: 5.77, whoTarget: 7.66, interest: 9.18, age: 10.2, location: 11.03, behaviour: 12.27,
  // 03 question changes
  today: 13.73, aiDriven: 14.3, changing: 16.5, notJustWho: 18.3, rather: 20.38, whatCustomer: 21.15, silhouette: 22.0,
  // 04 study abroad
  study: 23.19, metaGiven: 26.58, broadAud: 27.3, students: 29.06, manyPeople: 29.82, bizStrategy: 32.81,
  ukMasters: 35.0, academic: 37.52, budget: 38.56, qualified: 40.44,
  // 05 sharpness dial
  stratNotBroad: 42.73, broadNa: 43.45, delivery: 44.66, customerDef: 45.71, sharp1: 46.63, offer: 47.29, message: 48.2, conversion: 49.0, goalSharp: 49.56,
  // 06 doctor
  doctor: 50.47, audBroad: 52.9, creativeSays: 54.24, chest: 55.65, cardio: 57.39, people: 59.87, problem: 62.08, need: 64.5, connect: 65.8,
  formula: 67.74, fBroad: 68.18, fMessage: 69.46, fSpecific: 69.94,
  // 07 real estate
  realEstate: 70.94, creativeA: 75.77, family: 77.33, dhaka: 78.05, bedroom: 78.53, creativeB: 80.18, nextProperty: 81.52, investment: 82.48,
  deliveryBroad: 83.62, needW: 86.46, intent: 86.94, contextW: 87.74, specific: 88.46, thisStrategy: 89.78,
  // 08 thesis
  clearly: 91.03, bTargeting: 93.83, bStrategy: 94.91, notSame: 95.43, defTargeting: 96.38, space: 98.42, system: 99.54, find: 100.94,
  defStrategy: 101.92, who: 103.68, problemQ: 104.72, offerQ: 106.04, success: 107.96, unclear: 109.24, skyGround: 110.77,
  // 09 spine
  evenBroad: 113.38, neverBroad: 116.18, objective: 117.3, ideal: 118.4, custProblem: 119.8, offerN: 121.1, creativeMsg: 121.9, convSignal: 123.15, outcome: 124.5,
  clearer: 125.38, clear: 126.3, aiContext: 129.8,
  // 10 meta signals
  metaRanking: 131.2, ranking: 132.04, behaviourS: 133.56, engagement: 134.32, signals: 135.28, stated: 137.56,
  butNot: 138.43, marketer: 139.79, stratNeeded: 140.39, relevant: 143.61, responsibility: 145.09,
  // 11 what I mean
  whenISay: 147.35, broadTargetingQ: 148.35, never: 149.35, anyone: 150.59, showAds: 151.75, iSay: 152.45, deliveryF: 153.27, flexibility: 154.19,
  strategyC: 155.32, clarity: 156.0, because: 157.14, audienceOk: 157.77, broadOk: 158.21, thinking: 159.6, thinkingBroad: 160.0,
  // 12 shift
  modern: 161.33, shift: 164.25, manual: 164.84, now: 168.97, discovery: 170.0, youMust: 172.36, youYourself: 173.64, valuableQ: 174.56, valuable: 175.68, customerV: 176.2,
  // 13 close
  fahad: 177.76, goodAd: 178.75, reach: 181.07, clicks: 181.83, leads: 182.67, na: 183.19, goodMeans: 183.74, rightCustomer: 185.02, rightMessage: 186.26, rightOutcome: 187.06,
  broadDelivery: 188.72, sharpStrategy: 189.78, endSpoken: 190.46,
  end: 191.712625,
} as const;

export const SCENES = [
  { id: "hook", start: 0, concept: "Wide soft field → the Lens: strategy isn't broad" },
  { id: "oldWay", start: C.used - 0.37, concept: "Manual reticle + dials narrowing the field" },
  { id: "question", start: C.today - 0.18, concept: "Aperture opens → what customer do I want?" },
  { id: "study", start: C.study - 0.14, concept: "Example 1: broad delivery vs sharp brief" },
  { id: "dial", start: C.stratNotBroad - 0.68, concept: "Sharpness Dial: delivery broad, rest sharp" },
  { id: "doctor", start: C.doctor - 0.12, concept: "Example 2: broad audience, specific message" },
  { id: "realEstate", start: C.realEstate - 0.09, concept: "Example 3: one building, two lenses" },
  { id: "thesis", start: C.clearly - 0.18, concept: "Broad targeting ≠ broad strategy" },
  { id: "spine", start: C.evenBroad - 0.28, concept: "Seven things that must never be broad" },
  { id: "signals", start: C.metaRanking - 0.2, concept: "Meta's signals + marketer's relevant signals" },
  { id: "meaning", start: C.whenISay - 0.2, concept: "Flexible delivery, clear strategy" },
  { id: "shift", start: C.modern - 0.18, concept: "Manual search → AI discovery → define valuable customer" },
  { id: "close", start: C.fahad - 0.16, concept: "Fahad → right customer/message/outcome → final lockup" },
] as const;
export type SceneId = (typeof SCENES)[number]["id"];
