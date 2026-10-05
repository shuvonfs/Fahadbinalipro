/**
 * Voiceover cue map (seconds) for public/google-ads-ai/voiceover.mp3 — 128.444s.
 * Measured with tools/measure_voiceover.py (offline ASR word timestamps) + energy envelope.
 * Every visual beat in scenes/* is keyed to one of these.
 */
export const C = {
  // 01 hook — "Google-কে campaign settings দাও, AI optimize করবে।"
  hook: 0.06, campaignSettings: 0.6, ai: 1.75, optimize: 2.0,
  // 02 — "শুনতে খুব সহজ, তাই না?" / "কিন্তু এখানেই একটা বড় প্রশ্ন আছে—"
  easy: 3.18, bigQ: 5.13,
  // 03 — "Google AI আসলে কী optimize করবে, যদি আপনি তাকে আপনার Business সম্পর্কে যথেষ্ট context-ই না দেন?"
  whatOptimize: 7.45, optimizeWord: 9.2, ifYou: 9.88, businessWord: 10.9, contextWord: 12.28, q3End: 13.17,
  // 04 — "Google Ads ধীরে ধীরে এমন একটা জায়গায় যাচ্ছে। যেখানে শুধু keyword, bid, audience বা campaign settings manage করাই যথেষ্ট না।"
  changing: 14.1, where: 16.58, keyword: 17.46, bid: 17.9, audience: 18.5, settings: 19.02, notEnough: 20.34,
  // 05 — "AI Max-এর মতো AI-powered Search features … search intent … creative এবং landing page … automation"
  aiMax: 21.34, aiPowered: 22.42, searchIntent: 23.9, creative: 25.1, landingPage: 27.02, automation: 28.78,
  // 06 — "মানে আপনি Google-কে শুধু বলতে পারেন না— ‘এই campaignটা চালাও।’ আপনাকে আরও পরিষ্কারভাবে বুঝতে হবে—"
  cantSay: 30.29, runIt: 32.6, needContext: 33.99,
  // 07–09 — business / customer / problem / message
  business: 36.32, customer: 37.62, valuableCustomer: 38.26, problem: 39.86, message: 42.21, relevant: 43.73,
  // 10 — "আর সবচেয়ে গুরুত্বপূর্ণ— কোন conversion আমার Business-এর জন্য সত্যিকার অর্থে valuable?"
  mostImportant: 44.52, conversion: 46.24, valuable: 48.52,
  // 11 — "কারণ Google যদি শুধু Lead দেখে optimize করে, তাহলে সে হয়তো বেশি Lead এনে দিতে পারে। কিন্তু সেই Lead যদি sales না করে, তাহলে campaign ভালো দেখালেও business ভালো করছে না।"
  leadOnly: 49.47, leadOptimize: 51.11, moreLeads: 52.87, butSales: 54.35, sales: 55.43, campaignGood: 56.86, businessNot: 58.02,
  // 12 — "ধরুন আপনি একটা Real Estate company-এর জন্য Google Ads চালাচ্ছেন। আপনি Google-কে শুধু বললেন— ‘Apartment-এর জন্য Lead চাই।’ Google lead-এর জন্য optimize করবে।"
  realEstate: 59.72, reWord: 60.56, youSaid: 63.35, apartmentLead: 64.86, googleOptimizes: 66.62,
  // 13 — "কিন্তু আপনার Business-এর জন্য হয়তো সব Lead সমান valuable না।"
  notEqual: 68.67, allLeads: 70.39, notEqualValuable: 71.27,
  // 14–15 — price / buyer / form / site visit / booking
  price: 72.23, buyer: 74.09, form: 76.29, siteVisit: 77.77, finally: 79.42, booking: 80.58,
  // 16 — "এই difference-টাই Google-কে বুঝতে সাহায্য করতে হবে।"
  difference: 81.68, helpGoogle: 82.48,
  // 17 — "তাই আমার কাছে future Google Ads-এর সবচেয়ে interesting বিষয় হলো— Campaign settings থেকে business context, better signals, AI optimization"
  interesting: 84.58, shiftSettings: 88.2, shiftContext: 89.25, shiftSignals: 90.45, shiftAI: 91.45,
  // 18 — "AI যত বেশি কাজ করবে, marketer-এর কাজ তত কমবে— এটা পুরোপুরি সত্যি না।" / "বরং marketer-এর কাজ বদলাবে।"
  aiMore: 93.0, marketer: 94.61, less: 95.77, notTrue: 96.41, roleChange: 97.9,
  // 19 — "Campaign operator থেকে strategist, data interpreter এবং AI supervisor"
  operator: 99.98, strategist: 101.46, dataInterpreter: 102.1, aiSupervisor: 103.3,
  // 20 — "তাই প্রশ্নটা এখন শুধু— ‘Google Ads কীভাবে setup করব?’ প্রশ্নটা হওয়া উচিত— ‘Google AI-কে আমি আমার Business সম্পর্কে কতটা ভালো signal দিতে পারছি?’"
  soQuestion: 105.07, setupQ: 106.6, shouldBe: 108.76, signalQ: 110.1, signalWord: 113.12,
  // 21 — "কারণ— AI যত intelligent হবে, আপনার Business Data আর Context-এর value তত বাড়বে।"
  because: 114.35, intelligent: 115.45, bizData: 117.41, bizContext: 118.33, valueGrows: 118.97, grows: 119.65,
  // 22–23 — "আমি Fahad।" / "আর আমি শুধু Ads চালানো নিয়ে কথা বলতে চাই না—" / "আমি কথা বলতে চাই, Marketing কীভাবে সত্যিকার অর্থে Business Growth তৈরি করে।"
  fahad: 120.48, notJustAds: 121.39, wantToTalk: 124.01, marketing: 125.17, businessGrowth: 127.05,
  end: 128.444,
} as const;

/** Scene windows: each starts a beat before its first spoken cue; ends where the next begins. */
export const SCENES = [
  { id: "hook", start: 0 },
  { id: "question", start: C.easy - 0.25 },
  { id: "engine", start: C.whatOptimize - 0.3 },
  { id: "evolution", start: C.changing - 0.3 },
  { id: "aiMax", start: C.aiMax - 0.14 },
  { id: "runCampaign", start: C.cantSay - 0.3 },
  { id: "context", start: C.business - 0.25 },
  { id: "ladder", start: C.mostImportant - 0.25 },
  { id: "leadTrap", start: C.leadOnly - 0.25 },
  { id: "realEstate", start: C.realEstate - 0.3 },
  { id: "spectrum", start: C.notEqual - 0.25 },
  { id: "journey", start: C.price - 0.25 },
  { id: "difference", start: C.difference - 0.25 },
  { id: "bigShift", start: C.interesting - 0.25 },
  { id: "scales", start: C.aiMore - 0.25 },
  { id: "roles", start: C.operator - 0.25 },
  { id: "signalQuestion", start: C.soQuestion - 0.25 },
  { id: "dataValue", start: C.because - 0.25 },
  { id: "closing", start: C.fahad - 0.25 },
] as const;
export type SceneId = (typeof SCENES)[number]["id"];
