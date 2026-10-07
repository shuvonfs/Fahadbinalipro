/** Measured from public/lead-automation/voiceover.mp3 (offline ASR, seconds). */
export const A = {
  night: 0.88, form: 2.8, call: 4.66, nextDay: 5.14, morning: 5.54, whatDid: 6.7,
  solution: 11.18, twoThree: 13.65, company: 14.05, submit: 14.61, first: 16.2, wins: 17.04,
  youCall: 19.0, forgot: 20.56, hbr: 23.52, research: 25.28, million: 25.96,
  hour: 29.79, seven: 34.63, day: 35.88, sixty: 38.4, drop: 39.2, reply: 42.1, fortyTwo: 43.38,
  automation: 45.9, how: 47.27, one: 48.41, instant: 49.55, night2: 50.31, holiday: 50.91, whatsapp: 52.11, personal: 52.83, heard: 55.27,
  two: 56.71, answers: 58.04, segment: 59.76, hot: 60.59, warm: 61.03, cold: 61.43,
  hotLead: 62.29, salesPerson: 64.05, notification: 65.17, inbox: 67.14,
  three: 68.51, customer: 70.24, meta: 71.96, nextMonth: 73.23, morePeople: 74.95,
  notReplace: 76.8, saves: 79.63, allLeads: 81.51, only: 82.91, serious: 83.23,
  money: 86.18, cold2: 89.21, wasted: 90.13, howLong: 93.38, dm: 96.6, word: 97.24,
  end: 98.19425,
} as const;

/** One beat per spoken sentence (start = a little before the sentence begins). */
export const SCENES_A = [
  { id: "a01", start: 0 }, { id: "a02", start: 3.75 }, { id: "a03", start: 6.55 }, { id: "a04", start: 8.6 },
  { id: "a05", start: 12.2 }, { id: "a06", start: 15.6 }, { id: "a07", start: 18.55 }, { id: "a08", start: 23.3 },
  { id: "a09", start: 28.1 }, { id: "a10", start: 35.55 }, { id: "a11", start: 39.75 }, { id: "a12", start: 44.45 },
  { id: "a13", start: 48.25 }, { id: "a14", start: 54.25 }, { id: "a15", start: 56.55 }, { id: "a16", start: 60.35 },
  { id: "a17", start: 62.1 }, { id: "a18", start: 66.25 }, { id: "a19", start: 68.4 }, { id: "a20", start: 72.9 },
  { id: "a21", start: 76.6 }, { id: "a22", start: 80.35 }, { id: "a23", start: 85.3 }, { id: "a24", start: 87.75 },
  { id: "a25", start: 91.4 }, { id: "a26", start: 94.2 },
] as const;
export type AId = (typeof SCENES_A)[number]["id"];
