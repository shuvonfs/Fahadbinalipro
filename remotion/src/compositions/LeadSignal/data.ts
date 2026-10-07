/**
 * LEAD SIGNAL (9:16) — cue map + caption phrases for public/lead-signal/voiceover.mp3 (70.69s).
 * Times are measured word onsets (tools/measure_voiceover.py, offline ASR).
 */
import { Phrase } from "../BroadSharpV2/captions";

export const L = {
  leads: 1.52, but: 2.44, bought: 3.72, meta: 4.64, google: 5.16, neither: 5.56,
  seeForm: 6.76, form: 8.04, thenWhat: 9.17, phone: 10.3, meeting: 11.26, paid: 12.3, real: 13.46, offline: 14.62, cantSee: 15.93,
  formOnly: 18.74, success: 19.5, easiest: 21.06, findThem: 23.18, leadsUp: 24.54, qualityDown: 25.22, salesTeam: 26.89, wrong: 28.09, wrongPhone: 28.65,
  system: 30.19, threeSteps: 31.1, one: 31.94, tracking: 32.53, pixel: 34.07, capi: 34.87, googleEC: 36.31, enhanced: 36.9, noLoss: 38.11,
  two: 40.25, journey: 41.58, good: 43.14, meeting2: 43.9, bought2: 44.98, record: 45.94,
  three: 46.95, result: 48.03, platform: 48.63, sendBack: 49.19, capi2: 50.55, dataManager: 52.35,
  learn: 53.67, customer: 55.83, more: 57.95, companies: 59.82, noSystem: 61.94, budget: 63.74, wrongThing: 64.98,
  cta: 66.31, dm: 69.15, leadWord: 70.07,
  end: 70.687313,
} as const;

export const PHRASES_L: Phrase[] = [
  { a: 0.04, b: 2.07, text: "আপনার অ্যাড থেকে প্রতিদিন লিড আসছে।" },
  { a: 2.4, b: 6.2, text: "কিন্তু এর মধ্যে কে আসলে কিনল, সেটা Meta বা Google কেউই জানে না।" },
  { a: 6.7, b: 8.8, text: "Meta আর Google দেখে কে ফর্ম পূরণ করল।" },
  { a: 9.13, b: 9.72, text: "কিন্তু তারপর?" },
  { a: 10.2, b: 12.9, text: "কে ফোন ধরল, কে মিটিংয়ে এল, কে টাকা দিল," },
  { a: 13.18, b: 15.0, text: "এই আসল রেজাল্টটা হয় অফলাইনে।" },
  { a: 15.33, b: 17.55, text: "আর সেটা দুই প্ল্যাটফর্মের কেউই দেখতে পায় না।" },
  { a: 17.98, b: 20.25, text: "যেহেতু ওরা শুধু ফর্ম সাবমিটকেই সাফল্য ধরে," },
  { a: 20.3, b: 23.6, text: "তাই সবচেয়ে সহজে যে মানুষ ফর্ম পূরণ করে, তাদেরই খুঁজে আনে।" },
  { a: 23.98, b: 24.86, text: "লিড সংখ্যা বাড়ে," },
  { a: 24.9, b: 26.15, text: "কিন্তু কোয়ালিটি কমতে থাকে।" },
  { a: 26.45, b: 29.05, text: "আর আপনার সেলস টিম সারাদিন ভুল নাম্বারে ফোন করে।" },
  { a: 29.47, b: 30.8, text: "আমি এর জন্য একটা সিস্টেম বানাই," },
  { a: 31.1, b: 31.6, text: "তিন ধাপে।" },
  { a: 31.94, b: 33.3, text: "এক, ট্র্যাকিং ঠিক করা:" },
  { a: 33.55, b: 37.95, text: "Meta-তে Pixel-এর সাথে Conversions API, আর Google-এ Enhanced Conversions," },
  { a: 38.11, b: 39.92, text: "যাতে কোনো লিডের ডেটা হারিয়ে না যায়।" },
  { a: 40.25, b: 40.62, text: "দুই," },
  { a: 40.82, b: 42.42, text: "প্রতিটা লিডের যাত্রা ট্র্যাক করা:" },
  { a: 42.7, b: 46.5, text: "কোন লিড ভালো, কে মিটিংয়ে এল, কে কিনল, সব রেকর্ড থাকে।" },
  { a: 46.9, b: 49.85, text: "তিন, সেই আসল রেজাল্ট আবার প্ল্যাটফর্মে ফেরত পাঠানো:" },
  { a: 50.1, b: 53.15, text: "Meta-তে Conversions API দিয়ে, Google-এ Data Manager দিয়ে।" },
  { a: 53.55, b: 56.9, text: "এখন Meta আর Google জানে একজন আসল কাস্টমার দেখতে কেমন।" },
  { a: 57.19, b: 59.1, text: "তাই ওরা এরকম মানুষই আরও খুঁজে আনে।" },
  { a: 59.46, b: 61.24, text: "যেসব কোম্পানি Lead Generate করে," },
  { a: 61.26, b: 63.24, text: "তাদের জন্য এই সিস্টেম না থাকা মানে" },
  { a: 63.46, b: 65.85, text: "অ্যাডের বাজেট দিয়ে প্ল্যাটফর্মকে ভুল জিনিস শেখানো।" },
  { a: 66.27, b: 69.05, text: "আপনার বিজনেস এর জন্যে এই রকম একটা সিস্টেম বানাতে চাইলে" },
  { a: 69.12, b: 70.6, text: "DM করুন “Lead”।" },
];

export const SCENES_L = [
  { id: "l01", start: 0, dark: true },
  { id: "l02", start: 2.3, dark: true },
  { id: "l03", start: 6.5, dark: false },
  { id: "l04", start: 9.0, dark: true },
  { id: "l05", start: 13.0, dark: true },
  { id: "l06", start: 17.8, dark: false },
  { id: "l07", start: 23.8, dark: true },
  { id: "l08", start: 29.3, dark: false },
  { id: "l09", start: 31.75, dark: true },
  { id: "l10", start: 40.1, dark: true },
  { id: "l11", start: 46.7, dark: true },
  { id: "l12", start: 53.4, dark: false },
  { id: "l13", start: 59.3, dark: true },
  { id: "l14", start: 66.1, dark: true },
] as const;
export type LId = (typeof SCENES_L)[number]["id"];
export const darkAtL = (t: number) => { let d: boolean = true; for (const s of SCENES_L) if (t >= s.start) d = s.dark; return d; };
