/** Scene windows for the V2 (editorial kinetic) cut. Times are voiceover seconds (see ../BroadSharp/cues.ts). */
export const SCENES2 = [
  { id: "s01", start: 0, dark: false },
  { id: "s02", start: 2.45, dark: true },
  { id: "s03", start: 5.45, dark: false },
  { id: "s04", start: 8.95, dark: false },
  { id: "s05", start: 13.55, dark: true },
  { id: "s06", start: 18.15, dark: false },
  { id: "s07", start: 23.0, dark: false },
  { id: "s08", start: 29.7, dark: true },
  { id: "s09", start: 32.65, dark: false },
  { id: "s10", start: 42.05, dark: false },
  { id: "s11", start: 50.35, dark: false },
  { id: "s12", start: 59.75, dark: false },
  { id: "s13", start: 67.6, dark: true },
  { id: "s14", start: 70.8, dark: false },
  { id: "s15", start: 80.0, dark: false },
  { id: "s16", start: 90.85, dark: false },
  { id: "s17", start: 110.6, dark: true },
  { id: "s18", start: 113.05, dark: false },
  { id: "s19", start: 130.95, dark: true },
  { id: "s20", start: 147.1, dark: false },
  { id: "s21", start: 152.35, dark: false },
  { id: "s22", start: 161.1, dark: true },
  { id: "s23", start: 172.1, dark: false },
  { id: "s24", start: 177.55, dark: true },
  { id: "s25", start: 183.45, dark: false },
  { id: "s26", start: 188.5, dark: true },
] as const;
export type SceneId2 = (typeof SCENES2)[number]["id"];
export const isDarkAt = (t: number) => {
  let d: boolean = SCENES2[0].dark;
  for (const s of SCENES2) if (t >= s.start) d = s.dark;
  return d;
};
