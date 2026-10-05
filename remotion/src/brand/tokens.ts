/** FAHAD BRAND — design tokens shared by every video in the series. */
import { COLORS } from "../theme/theme";

export { COLORS };

export const INK = {
  strong: COLORS.maroon, // headlines
  body: COLORS.wine, // supporting text
  muted: "rgba(63,21,33,0.62)", // labels
  faint: "rgba(63,21,33,0.35)",
  line: "rgba(114,0,19,0.18)", // hairlines / connectors
  lineStrong: "rgba(114,0,19,0.45)",
  accent: COLORS.crimson, // key signal / emphasis
  hot: COLORS.burgundy, // active state fill
} as const;

export const SURFACE = {
  card: {
    background: "linear-gradient(160deg, rgba(255,255,255,0.88), rgba(255,255,255,0.6))",
    border: "2px solid rgba(114,0,19,0.12)",
    borderRadius: 26,
    boxShadow: "0 22px 50px rgba(45,0,1,0.07), inset 0 2px 0 rgba(255,255,255,0.95)",
  } as React.CSSProperties,
  /** Glass — use sparingly (hero panels only). */
  glass: {
    background: "linear-gradient(150deg, rgba(255,255,255,0.7), rgba(251,252,235,0.35))",
    border: "2px solid rgba(255,255,255,0.9)",
    borderRadius: 32,
    boxShadow: "0 30px 70px rgba(45,0,1,0.10), inset 0 0 0 1px rgba(114,0,19,0.08)",
  } as React.CSSProperties,
  hot: {
    background: COLORS.burgundy,
    border: `2px solid ${COLORS.burgundy}`,
    color: COLORS.ivory,
    boxShadow: "0 24px 60px rgba(114,0,19,0.28)",
  } as React.CSSProperties,
};

export const TYPE = {
  hero: { fontWeight: 800, fontSize: 108, lineHeight: 1.04, letterSpacing: "-0.035em", color: INK.strong },
  title: { fontWeight: 800, fontSize: 72, lineHeight: 1.08, letterSpacing: "-0.025em", color: INK.strong },
  sub: { fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: INK.body },
  label: { fontWeight: 800, fontSize: 22, letterSpacing: "0.2em", textTransform: "uppercase", color: INK.muted },
  ui: { fontWeight: 800, fontSize: 26, letterSpacing: "0.02em", color: INK.strong },
} satisfies Record<string, React.CSSProperties>;

/** 16:9 safe area (≈9% horizontal, ≈9% vertical) at 1920×1080. */
export const SAFE = { x: 170, y: 100, w: 1920 - 340, h: 1080 - 200 } as const;

export const MARK: React.CSSProperties = {
  display: "inline-block", background: COLORS.crimson, color: COLORS.ivory, borderRadius: 12, padding: "0.04em 0.16em 0", lineHeight: 1,
};
