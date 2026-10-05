/**
 * FAHAD BRAND — layout & surface primitives. Every component takes `t` (global seconds)
 * and cue times, so the same element can be re-timed to any voiceover.
 */
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BACK, IN, lerp, OUT, p, rise } from "../motion";
import { COLORS, INK, MARK, SURFACE, TYPE } from "../tokens";

/** 1 → 0 as an element leaves at `out` (quick ease-in). */
export const leave = (t: number, out?: number, dur = 0.3) => (out === undefined ? 1 : 1 - p(t, out, dur, IN));

/**
 * Absolutely positioned, centred on (x, y). Pops in at `at`, optionally leaves at `out`.
 * `from` offsets the entrance (slides in from dx/dy).
 */
export const At: React.FC<{
  x: number; y: number; t: number; at: number; out?: number; dur?: number;
  dx?: number; dy?: number; scaleFrom?: number; anchor?: "center" | "left" | "right";
  style?: React.CSSProperties; children: React.ReactNode;
}> = ({ x, y, t, at, out, dur = 0.55, dx = 0, dy = 26, scaleFrom = 0.9, anchor = "center", style, children }) => {
  const k = p(t, at, dur, OUT);
  const s = lerp(scaleFrom, 1, p(t, at, dur, BACK));
  const o = Math.min(1, p(t, at, dur * 0.6)) * leave(t, out);
  if (o <= 0.001) return null;
  const ax = anchor === "center" ? "-50%" : anchor === "left" ? "0%" : "-100%";
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: o,
      transform: `translate(${ax}, -50%) translate(${(1 - k) * dx}px, ${(1 - k) * dy}px) scale(${s})`, ...style }}>
      {children}
    </div>
  );
};

/** Masked line of text that rises into place. */
export const Rise: React.FC<{ t: number; at: number; dur?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ t, at, dur, style, children }) => (
  <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.08em", ...style }}>
    <span style={{ display: "inline-block", ...rise(t, at, dur) }}>{children}</span>
  </span>
);

/**
 * Headline: words rise one after another. Words listed in `mark` get the crimson highlight
 * (revealed at `markAt`, defaults to their entrance).
 */
export const Headline: React.FC<{
  text: string; t: number; at: number; stagger?: number; mark?: string[]; markAt?: number;
  style?: React.CSSProperties; align?: "left" | "center";
}> = ({ text, t, at, stagger = 0.07, mark = [], markAt, style, align = "center" }) => {
  const words = text.split(" ");
  return (
    <div style={{ ...TYPE.title, textAlign: align, ...style }}>
      {words.map((w, i) => {
        const isMark = mark.includes(w.replace(/[?.,!]/g, ""));
        const m = isMark ? p(t, markAt ?? at + i * stagger + 0.25, 0.4) : 0;
        return (
          <span key={i}>
            <Rise t={t} at={at + i * stagger}>
              <span style={isMark ? { ...MARK, background: `rgba(128,1,31,${m})`, color: m > 0.5 ? COLORS.ivory : "inherit" } : undefined}>{w}</span>
            </Rise>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </div>
  );
};

/** Small uppercase eyebrow with a leading tick. */
export const Eyebrow: React.FC<{ t: number; at: number; children: React.ReactNode; color?: string }> = ({ t, at, children, color = INK.accent }) => {
  const k = p(t, at, 0.5);
  return (
    <div style={{ ...TYPE.label, color, display: "flex", alignItems: "center", gap: 16, opacity: k }}>
      <span style={{ width: 46 * k, height: 3, background: color, borderRadius: 2 }} />
      <Rise t={t} at={at}>{children}</Rise>
    </div>
  );
};

/** Card surface. `hot` = burgundy active state; `glass` = hero glass (sparingly). */
export const Card: React.FC<{
  w?: number | string; h?: number | string; hot?: number; glass?: boolean; pad?: number | string;
  style?: React.CSSProperties; children?: React.ReactNode;
}> = ({ w, h, hot = 0, glass, pad = 28, style, children }) => {
  const base = glass ? SURFACE.glass : SURFACE.card;
  return (
    <div style={{ ...base, width: w, height: h, padding: pad, boxSizing: "border-box", position: "relative", overflow: "hidden", ...style }}>
      <div style={{ position: "absolute", inset: 0, background: COLORS.burgundy, opacity: hot, borderRadius: "inherit" }} />
      <div style={{ position: "relative", height: "100%", color: hot > 0.5 ? COLORS.ivory : undefined }}>{children}</div>
    </div>
  );
};

/** Rounded label chip. */
export const Pill: React.FC<{ children: React.ReactNode; hot?: number; size?: number; style?: React.CSSProperties; outline?: boolean }> = ({ children, hot = 0, size = 22, style, outline }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 10, whiteSpace: "nowrap",
    padding: `${size * 0.55}px ${size * 1.05}px`, borderRadius: 999, fontSize: size, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase",
    background: hot > 0 ? `rgba(114,0,19,${hot})` : outline ? "transparent" : "rgba(255,255,255,0.85)",
    color: hot > 0.5 ? COLORS.ivory : INK.strong,
    border: outline ? `2px dashed ${INK.lineStrong}` : `2px solid ${hot > 0.5 ? COLORS.burgundy : INK.line}`,
    boxShadow: hot > 0.5 ? "0 14px 34px rgba(114,0,19,0.25)" : "0 8px 22px rgba(45,0,1,0.05)",
    ...style,
  }}>{children}</div>
);

/** Full-frame SVG layer for connectors (1920×1080 user space). */
export const Lines: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible", ...style }}>{children}</svg>
);

/** Ivory brand backdrop: slow-drifting grid + soft crimson glow + vignette. */
export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const k = frame / durationInFrames;
  return (
    <AbsoluteFill style={{ background: COLORS.ivory }}>
      <AbsoluteFill style={{ inset: -120,
        backgroundImage: "linear-gradient(rgba(114,0,19,0.04) 2px, transparent 2px), linear-gradient(90deg, rgba(114,0,19,0.04) 2px, transparent 2px)",
        backgroundSize: "96px 96px", transform: `translate(${-96 * ((k * 6) % 1)}px, ${-48 * ((k * 6) % 1)}px)` }} />
      <div style={{ position: "absolute", width: 1500, height: 1500, left: 500 + 500 * Math.sin(k * Math.PI * 2), top: -300 + 200 * Math.cos(k * Math.PI * 3),
        background: "radial-gradient(circle, rgba(128,1,31,0.06) 0%, rgba(128,1,31,0) 60%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(251,252,235,0) 45%, rgba(238,229,210,0.6) 100%)" }} />
    </AbsoluteFill>
  );
};

/** Wraps a scene so it fades out (with a slight lift) over its final `overlap` seconds. */
export const SceneFader: React.FC<{ children: React.ReactNode; fadeFrom: number | null; overlap: number }> = ({ children, fadeFrom, overlap }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = fadeFrom === null ? 0 : interpolate(frame, [fadeFrom, fadeFrom + overlap * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity: 1 - k, transform: `scale(${1 + 0.015 * k})` }}>{children}</AbsoluteFill>;
};

/** Value meter: LOW → HIGH, relative only (never a number). */
export const ValueBar: React.FC<{ value: number; w?: number; h?: number; label?: boolean; color?: string }> = ({ value, w = 220, h = 12, label = false, color = COLORS.crimson }) => (
  <div style={{ width: w }}>
    <div style={{ width: w, height: h, borderRadius: h, background: "rgba(114,0,19,0.1)", overflow: "hidden" }}>
      <div style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%`, height: "100%", borderRadius: h, background: color }} />
    </div>
    {label ? (
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 15, fontWeight: 800, letterSpacing: "0.16em", color: INK.muted }}>
        <span>LOW</span><span>HIGH</span>
      </div>
    ) : null}
  </div>
);
