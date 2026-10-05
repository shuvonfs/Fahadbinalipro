/**
 * Voiceover cue map (seconds) for public/meta-creative-signal/voiceover.mp3 — 108.28s.
 * Measured with tools/measure_voiceover.py (offline ASR word timestamps); the two passages
 * the ASR garbled (28–31s, 39–48s) were refined with an RMS energy envelope.
 */
export const C = {
  // "আপনি হয়তো ভাবছেন, Creative-এর কাজ শুধু মানুষকে থামানো।"
  open: 0.24, creativeWord: 1.36, stop: 2.8,
  // "কিন্তু Meta Ads-এর AI-driven world-এ Creative-এর কাজ তার চেয়ে অনেক বড়।"
  but: 3.79, aiDriven: 4.75, bigger: 6.39, muchBigger: 7.07,
  // "Creative শুধু আপনার offer দেখায় না— এটা Meta-কে বুঝতেও সাহায্য করে, এই ad-টা কোন ধরনের মানুষের কাছে relevant হতে পারে।"
  offer: 8.19, metaUnderstands: 10.15, whichPeople: 12.28, people: 13.64, relevant: 14.24,
  // "ধরুন আপনি একটা Real Estate ad বানালেন।"
  realEstate: 15.52, reWord: 16.2,
  // "একটা Creative-এ শুধু লিখলেন— ‘Premium Apartment for Sale in Dhaka.’"
  creativeA: 17.79, headlineA: 19.4, dhakaA: 20.88,
  // "আরেকটা Creative-এ বললেন— ‘নিজের পরিবারের জন্য ঢাকাতে ৩ Bedroom Apartment খুঁজছেন?’"
  creativeB: 21.68, headlineB: 23.17, family: 23.45, dhakaB: 24.25, bedroom: 24.69, home: 25.6,
  // "দুটোতেই একই apartment। কিন্তু problem, desire আর context আলাদা। আর এটাই গুরুত্বপূর্ণ।"
  sameApartment: 26.58, problem: 28.5, desire: 29.2, context: 30.0, different: 30.6, important: 31.39,
  // "কারণ একজন মানুষ কী ধরনের message-এ engage করছে, সেটা advertising system-এর জন্য একটা signal তৈরি করতে পারে।"
  because: 32.91, message: 34.43, engage: 34.79, advertising: 36.03, signal: 37.63,
  // "Meta নিজেই বলছে তাদের newer ranking models … longer user-behavior sequences … organic engagement data ব্যবহার করার জন্য…"
  metaSays: 39.1, ranking: 40.5, sequences: 41.5, organic: 43.5, data: 44.95, using: 46.0,
  // "তাই Creative এখন শুধু ‘দেখতে সুন্দর কি না’ এই প্রশ্নের বিষয় না। প্রশ্ন হলো— এই Creative কোন customer-এর সঙ্গে কোন problem-এর মাধ্যমে connect করছে?"
  soCreative: 48.35, beautiful: 50.15, question: 52.37, whichCustomer: 53.36, customer: 54.4, viaProblem: 55.72, connect: 56.6,
  // "আর এখানেই একটা বড় ভুল হয়। অনেকে দশটা creative বানায়— একই ছবি, একই headline, শুধু background বদলেছে।"
  mistake: 57.69, tenCreatives: 59.63, sameImage: 61.37, sameHeadline: 62.27, background: 63.23,
  // "এটা Creative Diversification না।"
  notDiversification: 64.71,
  // "Creative diversification মানে হতে পারে— different problem, different desire, different objection, different value proposition, different customer context."
  realDiv: 66.83, dProblem: 69.13, dDesire: 70.22, dObjection: 71.21, dValue: 72.47, dContext: 73.99,
  // "এই পাঁচটা frame-এর মধ্যে প্রতিটায় সামান্য আলাদা emphasis দিন, কিন্তু robotic list-এর মতো নয়।"
  fiveFrames: 75.72, notRobotic: 79.29,
  // "তাই আমি Creative-কে শুধু design হিসেবে দেখি না। আমি দেখি— Creative = message + context + customer relevance."
  notDesign: 81.33, iSee: 83.81, equation: 84.75, eqMessage: 85.59, eqContext: 86.47, eqRelevance: 87.39,
  // "AI যত বেশি delivery এবং ranking handle করবে, creative strategy তত বেশি গুরুত্বপূর্ণ হবে।"
  aiMore: 89.02, delivery: 90.02, rankingB: 90.78, strategy: 92.1, moreImportant: 93.42,
  // "কারণ AI-কে ভালো creative দেওয়া মানে শুধু সুন্দর ad দেওয়া না— AI-কে customer বোঝার জন্য better material দেওয়া।"
  goodCreative: 94.74, prettyAd: 97.06, aiCustomer: 98.48, betterMaterial: 100.08,
  // "আমি Fahad।" / "আর marketing-এ আমার কাছে creative মানে শুধু ভালো দেখতে না।" / "Creative should have a business reason."
  fahad: 101.59, inMarketing: 102.58, goodLooking: 104.74, finalLine: 106.16, businessReason: 107.24, reason: 107.8,
  end: 108.2775,
} as const;

export const SCENES = [
  { id: "hook", start: 0, concept: "A creative assembles; stopping is only the first layer" },
  { id: "breakOpen", start: C.but - 0.2, concept: "The creative breaks into layers that emit signals" },
  { id: "understand", start: C.offer - 0.2, concept: "Signals cluster into relevance patterns" },
  { id: "creativeA", start: C.realEstate - 0.25, concept: "Real-estate creative A + extracted signals" },
  { id: "creativeB", start: C.creativeB - 0.2, concept: "A morphs into B — same apartment, new meaning" },
  { id: "twoWorlds", start: C.sameApartment - 0.25, concept: "Product vs product + context; problem/desire/context" },
  { id: "engagement", start: C.because - 0.25, concept: "Message → reactions → signal loop" },
  { id: "ranking", start: C.metaSays - 0.25, concept: "Illustrative ranking field + behaviour sequence" },
  { id: "relevance", start: C.soCreative - 0.2, concept: "Good looking? → relevant to whom?" },
  { id: "clones", start: C.mistake - 0.2, concept: "Ten clones → not diversification" },
  { id: "worlds", start: C.realDiv - 0.2, concept: "Five creative worlds → constellation" },
  { id: "framework", start: C.notDesign - 0.25, concept: "Creative = message + context + customer relevance" },
  { id: "strategy", start: C.aiMore - 0.25, concept: "AI delivery/ranking → creative strategy dominant" },
  { id: "material", start: C.goodCreative - 0.25, concept: "Beautiful creative → better signal material" },
  { id: "close", start: C.fahad - 0.2, concept: "Fahad → creative should have a business reason" },
] as const;
export type SceneId = (typeof SCENES)[number]["id"];
