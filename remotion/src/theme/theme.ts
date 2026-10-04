/** Brand design tokens. Use these instead of hard-coded colours. */
export const COLORS = {
  ivory: "#FBFCEB",
  burgundy: "#720013",
  maroon: "#2D0001",
  wine: "#3F1521",
  crimson: "#80011F",
} as const;

export const THEME = {
  background: COLORS.ivory,
  text: COLORS.maroon,
  textMuted: "rgba(63, 21, 33, 0.68)",
  accent: COLORS.crimson,
  surface: "rgba(255, 255, 255, 0.72)",
  border: "rgba(114, 0, 19, 0.16)",
  radius: 28,
} as const;

export const TYPE = {
  hero: { fontSize: 140, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.02 },
  title: { fontSize: 88, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.05 },
  body: { fontSize: 44, fontWeight: 600, lineHeight: 1.3 },
  label: { fontSize: 24, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" as const },
} as const;
