/**
 * Voiceover cue map (seconds) for public/ai-max-briefing/voiceover.mp3 — 257.88s.
 * Measured with tools/measure_voiceover.py (offline ASR word timestamps) + an energy
 * envelope for the opening line. Every visual event in scenes/* is keyed to a cue here.
 */
export const C = {
  // "AI Max-এ marketer-এর নতুন skill Prompting না, Business Briefing."
  aiMax: 0.1, marketer: 0.76, skill: 1.72, prompting: 2.3, briefing: 3.18,
  // "হ্যাঁ, আপনি ঠিকই শুনেছেন।"
  heard: 4.45,
  // "অনেকে ভাবছেন— AI আসছে, তাই marketer-এর সবচেয়ে important skill হবে AI-কে ভালো prompt দেওয়া।"
  many: 6.15, aiComing: 7.2, importantSkill: 9.16, goodPrompt: 10.68, promptWord: 11.0,
  // "আমি কিন্তু একটু অন্যভাবে দেখি।"
  differently: 11.95,
  // "কারণ Google Ads-এর AI যত বেশি intelligent হচ্ছে, তত বেশি important হয়ে যাচ্ছে—"
  because: 13.87, intelligent: 15.71, moreImportant: 16.83,
  // "আপনি AI-কে আপনার Business সম্পর্কে কতটা ভালো context দিতে পারছেন।"
  youGive: 18.82, business: 20.06, context: 21.82,
  // "আগে Google Ads-এ আমরা অনেক কিছু manually control করতাম— keyword, match type, bid, ad copy, landing page, তারপর campaign optimize।"
  before: 23.54, manually: 25.18, keyword: 26.67, matchType: 27.35, bid: 28.1, adCopy: 28.69, landingPage: 29.57, optimize: 30.65,
  // "কিন্তু AI Max-এর মতো system-এ Google আরও বেশি real-time signals ব্যবহার করে"
  aiMaxSystem: 32.6, realTime: 35.0,
  // "search-এর intent বুঝতে, relevant keywords খুঁজতে, ad assets customize করতে এবং relevant landing page বেছে নিতে পারে।"
  intent: 36.56, keywords: 38.09, assets: 39.58, customize: 40.1, landing: 41.86,
  // "তাই এখন প্রশ্নটা শুধু— ‘Google-কে কী setting দেব?’ না। প্রশ্নটা হচ্ছে— ‘Google AI-কে আমার Business সম্পর্কে কী context দেব?’"
  soNow: 43.48, settingQ: 45.03, realQ: 46.85, contextQ: 47.91, contextQBiz: 49.23, contextQWord: 50.39,
  // Example 01 — study abroad
  study: 51.62, studyWord: 52.34, youTellAI: 55.1, genUK: 56.34, thisPrompt: 58.43, notBrief: 59.49, properBrief: 61.69,
  audience: 63.39, bdStudents: 64.51, undergrad: 66.67, postgrad: 67.63,
  strength: 69.47, uniSelection: 70.47, application: 71.71, visa: 73.03,
  notJustLeads: 74.15, suchStudents: 76.05, academic: 77.63, budget: 78.87, partnerUni: 79.71,
  message: 82.26, affordability: 82.94, career: 84.26, course: 85.18, trusted: 86.3,
  // "এখন difference-টা দেখুন। প্রথমটা … শুধু কী বানাতে হবে বলছে। দ্বিতীয়টা … কাদের জন্য, কেন, কী message, আর কোন ধরনের customer … valuable। এটাই business briefing."
  difference: 88.54, first: 89.98, whatToMake: 91.34, second: 92.8, forWhom: 94.49, why: 95.45, whatMessage: 96.05,
  whichCustomer: 97.17, valuable: 98.93, thisIsBriefing: 99.84,
  // Example 02 — healthcare
  doctor: 101.42, doctorWord: 102.22, promptLabel: 104.0, cardioPrompt: 104.71, niceAd: 106.59, deeper: 109.16,
  forExample: 112.11, appointmentGoal: 112.96, appointment: 114.28,
  targetAudience: 115.93, chest: 117.89, hypertension: 119.09, heartSymptoms: 120.09, preventive: 121.33, qualified: 123.41,
  priority: 125.38, moreCalls: 126.62, relevantAppt: 127.74, genuine: 129.1,
  adLanguage: 130.7, trustworthy: 131.82, responsible: 132.5, nonSensational: 133.98,
  notJustCopy: 135.55, objective: 139.08, audienceB: 139.76, boundary: 140.6,
  sensitive: 142.71, clarity: 144.95,
  // Example 03 — real estate
  another: 146.88, realEstate: 147.94, rePrompt: 149.59, generic: 151.96, goodBrief: 153.18,
  residential: 154.72, seriousBuyers: 156.96, reAudience: 158.42, family: 159.26, locationBuyers: 160.3,
  differentiators: 162.56, location: 163.96, aptSize: 164.76, amenities: 165.72, payment: 166.56,
  cheapLeads: 167.86, buyerWant: 169.56, purchaseIntent: 171.32, reBudget: 172.28, realisticMatch: 173.4,
  clearPicture: 175.05,
  // "তাই আমার কাছে— Prompting মানে AI-কে একটা কাজ বলা। আর Business Briefing মানে AI-কে বুঝিয়ে দেওয়া, business আসলে কী achieve করতে চায়। এই দুইটা এক জিনিস না।"
  soForMe: 178.09, promptingIs: 179.16, aTask: 180.48, briefingIs: 182.24, explain: 183.8, achieve: 184.8, notSame: 186.75,
  // skillset
  skillset: 188.33, keywordResearch: 191.37, copywriting: 193.56, aiPrompting: 195.77,
  // "আপনাকে বুঝতে হবে— Business থেকে Customer, Intent, Message, Conversion, Revenue।"
  understand: 198.08, chBusiness: 199.28, chCustomer: 200.12, chIntent: 201.08, chMessage: 201.96, chConversion: 202.8, chRevenue: 203.72,
  then: 204.43, giveContext: 205.59, giveAI: 206.75,
  // AI brief direction
  aiBriefDir: 208.03, aiBrief: 209.23, ownWords: 211.39, bBusiness: 212.75, bAudience: 213.35, bMessaging: 214.11,
  reporting: 216.16, searchTerm: 218.64, creative: 219.36, landingJ: 220.48, journey: 221.08, report: 222.48,
  // "মানে ভবিষ্যতে marketer-এর কাজ শুধু AI-কে চালানো না— বরং AI-কে সঠিকভাবে steer করা।"
  future: 223.48, operate: 225.92, rather: 226.87, steer: 228.55,
  // "Future-এর best marketer সে না, যে সবচেয়ে ভালো prompt লিখতে পারে। বরং সে—"
  inMyView: 229.47, bestMarketer: 230.99, notHe: 231.99, bestPrompt: 233.31, ratherHe: 234.43,
  // "যে সবচেয়ে ভালোভাবে Business বুঝতে পারে, Customer …, Data …, এবং সেই understanding AI-কে দিতে পারে।"
  whoBest: 235.43, uBusiness: 236.5, uCustomer: 237.79, uData: 238.95, understanding: 240.75, toAI: 241.35,
  // "কারণ AI আপনার হয়ে marketing করতে পারে। কিন্তু আপনার business কী চায়, সেটা AI-কে বোঝানোর দায়িত্ব এখনও আপনার।"
  becauseAI: 242.58, aiMarkets: 243.34, but: 245.63, whatWants: 246.49, explainAI: 247.87, responsibility: 249.07, yours: 249.67,
  // "আমি Fahad। The future of marketing is not AI replacing marketers. It's marketers who know how to work with AI."
  fahad: 250.82, futureOf: 251.88, notAI: 253.24, replacing: 253.88, marketers: 255.31, workWithAI: 256.87,
  end: 257.880813,
} as const;

/** Scene windows — each begins a beat before its first spoken cue and runs until the next. */
export const SCENES = [
  { id: "hook", start: 0, concept: "Prompting vs Business Briefing" },
  { id: "promptMyth", start: C.many - 0.2, concept: "Prompt box with no business context" },
  { id: "contextAnchor", start: C.because - 0.25, concept: "Smarter AI → context matters more" },
  { id: "manual", start: C.before - 0.3, concept: "Manual control → morphs into dynamic signals" },
  { id: "aiMaxWork", start: C.intent - 0.25, concept: "Intent, assets, landing page" },
  { id: "questions", start: C.soNow - 0.25, concept: "Settings question → context question" },
  { id: "studyChapter", start: C.study - 0.25, concept: "Example 01 — study abroad" },
  { id: "studyPrompt", start: C.youTellAI - 0.25, concept: "Generic prompt → generic ads" },
  { id: "studyBrief", start: C.properBrief - 0.25, concept: "Business brief built section by section" },
  { id: "difference", start: C.difference - 0.25, concept: "Prompt = task, brief = context" },
  { id: "healthChapter", start: C.doctor - 0.25, concept: "Example 02 — healthcare" },
  { id: "healthPrompt", start: C.promptLabel - 0.3, concept: "Good copy ≠ good context" },
  { id: "healthBrief", start: C.forExample - 0.25, concept: "Healthcare business brief" },
  { id: "boundary", start: C.notJustCopy - 0.25, concept: "Clarity + responsibility" },
  { id: "reChapter", start: C.another - 0.25, concept: "Example 03 — real estate" },
  { id: "rePrompt", start: C.rePrompt - 0.25, concept: "Generic real-estate prompt" },
  { id: "reBrief", start: C.residential - 0.3, concept: "Real-estate business brief" },
  { id: "synthesis", start: C.clearPicture - 0.25, concept: "Three industries → business briefing" },
  { id: "bigIdea", start: C.soForMe - 0.2, concept: "Prompting = task, briefing = understanding" },
  { id: "skillset", start: C.skillset - 0.3, concept: "Skills become parts of a larger system" },
  { id: "chain", start: C.understand - 0.25, concept: "Business → … → revenue growth loop" },
  { id: "aiBrief", start: C.aiBriefDir - 0.25, concept: "Conceptual AI brief" },
  { id: "reporting", start: C.reporting - 0.25, concept: "Search term → asset → page journey" },
  { id: "steer", start: C.future - 0.25, concept: "Control → steer" },
  { id: "bestPrompt", start: C.inMyView - 0.25, concept: "Best prompt loses importance" },
  { id: "understanding", start: C.whoBest - 0.15, concept: "Business + customer + data → AI" },
  { id: "responsibility", start: C.becauseAI - 0.25, concept: "AI executes, human defines direction" },
  { id: "finale", start: C.fahad - 0.2, concept: "Fahad signature → marketer + AI → business growth" },
] as const;
export type SceneId = (typeof SCENES)[number]["id"];
