/**
 * Shared building blocks for the Fahad intro: seconds-based animation helpers,
 * one line-icon family, glass nodes and pills. All motion is a pure function of time.
 */
import { evolvePath } from "@remotion/paths";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../theme/theme";

// ───────────── time ─────────────
/** Global time in seconds, for components rendered inside a <Sequence from={start}>. */
export const useT = (sceneStart: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return sceneStart + frame / fps;
};

export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const IN = Easing.bezier(0.7, 0, 0.84, 0);
export const BACK = Easing.out(Easing.back(1.5));

/** 0 → 1 between start and start+dur (seconds), eased and clamped. */
export const p = (t: number, start: number, dur: number, easing: (x: number) => number = OUT) =>
  interpolate(t, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

/** Masked rise (use inside an overflow:hidden wrapper). */
export const rise = (t: number, start: number, dur = 0.5): React.CSSProperties => ({
  transform: `translateY(${(1 - p(t, start, dur)) * 125}%)`,
});
/** Fade + lift. */
export const fadeUp = (t: number, start: number, dur = 0.45, dist = 22) => {
  const k = p(t, start, dur);
  return { opacity: k, ty: (1 - k) * dist };
};
/** Spring-like pop (back-out). Returns opacity and scale. */
export const pop = (t: number, start: number, dur = 0.45) => {
  const k = p(t, start, dur, BACK);
  return { opacity: Math.min(1, p(t, start, dur * 0.6)), scale: lerp(0.85, 1, k) };
};
/** stroke-dasharray/offset for drawing an SVG path on. */
export const drawn = (d: string, t: number, start: number, dur = 0.6) => evolvePath(p(t, start, dur, IN_OUT), d);

// ───────────── icons ─────────────
const P: Record<string, string> = {
  ads: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M7 15l3-6 3 6M8 13h4M15.5 9v6M15.5 9h1.5a2 2 0 0 1 0 4h-1.5"/>',
  strategy: '<circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 6h5a3 3 0 0 1 3 3v1M16 18h-5a3 3 0 0 1-3-3v-1M14 8l2 2 2-2M6 16l2-2 2 2"/>',
  users: '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c.7-3 2.8-4.6 5.5-4.6s4.8 1.6 5.5 4.6"/><circle cx="16.5" cy="9" r="2.4"/><path d="M15.5 14.6c2.6 0 4.3 1.5 5 4.4"/>',
  image: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M4 17l5-4.5 3.5 3 3-2.5L20 17"/>',
  db: '<ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6"/>',
  funnel: '<path d="M4 5h16l-6 7.5V19l-4-2v-4.5z"/>',
  growth: '<path d="M4 18l5-5 4 3 7-8M15 8h5v5"/>',
  building: '<path d="M5 21V6l7-3v18M12 9l7 2.5V21M3 21h18M8 8.5h1.5M8 12h1.5M8 15.5h1.5M15 14h1.5M15 17h1.5"/>',
  grad: '<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5V16c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.5M21.5 9.5V15"/>',
  plane: '<path d="M10.5 13.5L4 11l1.5-1.5 7 1L17 6c1-1 2.6-1.3 3-1s0 2-1 3l-4.5 4.5 1 7L14 21l-2.5-6.5L8 18v2.5L6.5 22 5 18.5 1.5 17 3 15.5h2.5z"/>',
  car: '<path d="M4 15.5l1.6-5A2 2 0 0 1 7.5 9h9a2 2 0 0 1 1.9 1.5l1.6 5V19h-3v-2H7v2H4z"/><circle cx="7.5" cy="14.5" r="1.1"/><circle cx="16.5" cy="14.5" r="1.1"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V9M16 16v-6"/>',
  nodes: '<circle cx="12" cy="12" r="2.6"/><circle cx="5" cy="6" r="1.6"/><circle cx="19" cy="6" r="1.6"/><circle cx="5" cy="18" r="1.6"/><circle cx="19" cy="18" r="1.6"/><path d="M6.3 7l3.7 3.2M17.7 7 14 10.2M6.3 17l3.7-3.2M17.7 17 14 13.8"/>',
  laptop: '<rect x="5" y="5" width="14" height="10" rx="1.5"/><path d="M3 18.5h18"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.8L16.2 9.6"/>',
  phone: '<path d="M6.5 3.5h3l1.5 4-2 1.5a10 10 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z"/>',
  star: '<path d="M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/>',
  cal: '<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
  tag: '<path d="M3.5 12.5V4.5h8l9 9-8 8z"/><circle cx="8" cy="9" r="1.5"/>',
  ai: '<rect x="6" y="6" width="12" height="12" rx="2.5"/><path d="M9.5 15l1.6-6h1.8l1.6 6M10.1 13h3.8M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
  crm: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9h17M8 13h3M8 16h6M15.5 13h1"/>',
  revenue: '<path d="M4 20h16M6 20v-5M10 20v-8M14 20v-6M18 20V7"/><path d="M15 5h3v3"/>',
  leak: '<path d="M12 3s5 6 5 10a5 5 0 0 1-10 0c0-4 5-10 5-10z"/>',
};
export type IconName = keyof typeof P;

export const Icon: React.FC<{ name: IconName; size?: number; color?: string }> = ({ name, size = 40, color = COLORS.burgundy }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: "block", flex: "none" }}>
    <g fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: P[name] }} />
  </svg>
);

// ───────────── surfaces ─────────────
export const GLASS: React.CSSProperties = {
  background: "linear-gradient(160deg, rgba(255,255,255,0.84), rgba(255,255,255,0.52))",
  border: "2px solid rgba(114,0,19,0.14)",
  borderRadius: 28,
  boxShadow: "0 24px 60px rgba(45,0,1,0.08), inset 0 2px 0 rgba(255,255,255,0.95)",
};
export const HOT: React.CSSProperties = {
  background: COLORS.burgundy,
  border: `2px solid ${COLORS.burgundy}`,
  color: COLORS.ivory,
  boxShadow: "0 24px 60px rgba(114,0,19,0.25)",
};

/** Centered glass node: [icon] LABEL. Pass extra transform via `style.transform`-free props. */
export const Node: React.FC<{
  label: string;
  icon?: IconName;
  x: number;
  y: number;
  hot?: boolean;
  small?: boolean;
  opacity?: number;
  scale?: number;
  dx?: number;
  dy?: number;
  borderColor?: string;
}> = ({ label, icon, x, y, hot, small, opacity = 1, scale = 1, dx = 0, dy = 0, borderColor }) => (
  <div
    style={{
      position: "absolute", left: x, top: y, opacity,
      transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(${scale})`,
      display: "inline-flex", alignItems: "center", gap: small ? 10 : 14, whiteSpace: "nowrap",
      height: small ? 64 : 88, padding: small ? "0 18px" : "0 28px", borderRadius: small ? 16 : 22,
      fontSize: small ? 22 : 30, fontWeight: 800, letterSpacing: "0.04em", color: COLORS.maroon,
      ...GLASS, ...(hot ? HOT : {}), ...(borderColor ? { borderColor } : {}),
    }}
  >
    {icon ? <Icon name={icon} size={small ? 30 : 40} color={hot ? COLORS.ivory : COLORS.burgundy} /> : null}
    <span>{label}</span>
  </div>
);

export const PillTag: React.FC<{ icon?: IconName; children: React.ReactNode; style?: React.CSSProperties }> = ({ icon, children, style }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 64, padding: "0 26px", borderRadius: 32,
    background: COLORS.burgundy, color: COLORS.ivory, fontSize: 24, fontWeight: 800, letterSpacing: "0.12em", whiteSpace: "nowrap", ...style }}>
    {icon ? <Icon name={icon} size={30} color={COLORS.ivory} /> : null}
    {children}
  </div>
);

export const LAB: React.CSSProperties = { fontWeight: 600, fontSize: 26, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(63,21,33,0.68)" };
export const H1: React.CSSProperties = { fontWeight: 800, fontSize: 150, lineHeight: 1.02, letterSpacing: "-0.035em", color: COLORS.maroon };
export const H2: React.CSSProperties = { fontWeight: 800, fontSize: 92, lineHeight: 1.06, letterSpacing: "-0.025em", color: COLORS.maroon };
export const H3: React.CSSProperties = { fontWeight: 600, fontSize: 54, lineHeight: 1.3, color: COLORS.wine };
export const MARK: React.CSSProperties = { display: "inline-block", background: COLORS.crimson, color: COLORS.ivory, borderRadius: 14, padding: "0.06em 0.16em 0", lineHeight: 1 };

/** Full-width centered row at a given top. */
export const Center: React.FC<{ top: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ top, children, style }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, textAlign: "center", ...style }}>{children}</div>
);

/** A line of text that rises out of a mask at `start`. */
export const RiseLine: React.FC<{ t: number; start: number; children: React.ReactNode; style?: React.CSSProperties; dur?: number }> = ({ t, start, children, style, dur }) => (
  <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
    <div style={{ ...style, ...rise(t, start, dur) }}>{children}</div>
  </div>
);
