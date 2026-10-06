/**
 * FAHAD BRAND — "Editorial Kinetic" kit (trend-driven social explainer style).
 *   Stage        paper (ivory, vignette, film grain, rotating corner stars) or dark (glow) set + brand header
 *   KLine        kinetic typography: mixed-size words that blur-rise in on their cue; accent words glow
 *   SelectBox    Figma-style dashed selection with handles + cursor, drawn around a word/object
 *   Obj          3D object (Fluent 3D PNG) with whoosh entrance, idle float, optional mono (B&W) grade
 *   AppTile      glossy dark tile with a real brand glyph (Meta, Facebook, Instagram …)
 *   PinNote      pinned note card with a 3D pushpin and icon rows
 *   Phone / FeedPost / AdsPanel   ad-interface mockups
 *   Stamp        rubber-stamp slam
 * Every animation is a pure function of global seconds `t`.
 */
import { Img, random, staticFile, useCurrentFrame } from "remotion";
import { BACK, IN, IN_OUT, lerp, OUT, p } from "../motion";
import { COLORS } from "../tokens";
import { LOGOS, LogoName } from "./logos";

export const DISPLAY = `"Montserrat", "Noto Sans Bengali", sans-serif`;
export const K = {
  ink: "#141012", soft: "rgba(20,16,18,0.55)", faint: "rgba(20,16,18,0.28)",
  paper: "#F6F3EA", dark: "#0B0708", accent: "#B0102C", hot: COLORS.crimson, burgundy: COLORS.burgundy,
  blue: "#0866FF", line: "rgba(20,16,18,0.12)",
} as const;

// ───────────── background stage ─────────────
const Grain: React.FC<{ o?: number }> = ({ o = 0.08 }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: o, mixBlendMode: "multiply", pointerEvents: "none" }}>
      <filter id={`grain${frame % 6}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={frame % 6} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width={1920} height={1080} filter={`url(#grain${frame % 6})`} />
    </svg>
  );
};

/** 4-point star (the brand's corner ornament). */
const Star: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100"><path d="M0 -50 C 6 -12, 12 -6, 50 0 C 12 6, 6 12, 0 50 C -6 12, -12 6, -50 0 C -12 -6, -6 -12, 0 -50 Z" fill={color} /></svg>
);

export const Stage: React.FC<{ t: number; dark?: boolean; stars?: boolean; header?: boolean; children?: React.ReactNode; tint?: string }> = ({ t, dark, stars = true, header = true, children, tint }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: dark ? K.dark : K.paper }}>
    {dark ? (
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 45%, ${tint ?? "rgba(176,16,44,0.16)"} 0%, rgba(11,7,8,0) 55%)` }} />
    ) : (
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 42%, #FFFDF7 0%, #F4F0E4 52%, #CFC8B8 100%)" }} />
    )}
    {!dark && stars ? (
      <>
        <div style={{ position: "absolute", left: -120, top: -120, transform: `rotate(${t * 9}deg)` }}><Star size={340} color={K.ink} /></div>
        <div style={{ position: "absolute", right: -150, bottom: -150, transform: `rotate(${-t * 7}deg)` }}><Star size={400} color={K.ink} /></div>
      </>
    ) : null}
    {header ? (
      <div style={{ position: "absolute", left: 0, right: 0, top: 42, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, zIndex: 5 }}>
        <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 26, letterSpacing: "0.14em", color: dark ? "#fff" : K.ink }}>FAHAD</span>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: K.hot }} />
      </div>
    ) : null}
    {children}
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: dark ? "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%)" : "radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 58%, rgba(30,20,10,0.32) 100%)" }} />
    <Grain o={dark ? 0.06 : 0.09} />
  </div>
);

// ───────────── kinetic typography ─────────────
export type Word = { w: string; at: number; s?: number; c?: string; wt?: number; glow?: boolean; strike?: number; out?: number; dy?: number; ls?: string };
/** Words blur-rise in on their own cue. Mixed sizes sit on a shared baseline (reference: editorial reels). */
export const KLine: React.FC<{ t: number; words: Word[]; size?: number; color?: string; gap?: number; align?: "center" | "flex-start" | "flex-end"; dark?: boolean; style?: React.CSSProperties; lh?: number }> = ({ t, words, size = 64, color, gap = 0.26, align = "center", dark, style, lh = 1.0 }) => (
  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: align, columnGap: `${gap}em`, fontFamily: DISPLAY, fontSize: size, lineHeight: lh, ...style }}>
    {words.map((wd, i) => {
      const k = p(t, wd.at, 0.42, OUT);
      const o = wd.out === undefined ? 1 : 1 - p(t, wd.out, 0.3, IN);
      const st = wd.strike === undefined ? 0 : p(t, wd.strike, 0.35, IN_OUT);
      const col = wd.c ?? color ?? (dark ? "#fff" : K.ink);
      return (
        <span key={i} style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap", fontSize: (wd.s ?? 1) + "em", fontWeight: wd.wt ?? 800, color: col, letterSpacing: wd.ls ?? "-0.02em",
          opacity: k * o, filter: `blur(${(1 - k) * 14}px)`, transform: `translateY(${(1 - k) * 0.35 + (wd.dy ?? 0)}em) scale(${lerp(0.92, 1, k)})`,
          textShadow: wd.glow ? `0 0 ${dark ? 34 : 18}px ${col}${dark ? "AA" : "55"}` : undefined }}>
          {wd.w}
          {wd.strike !== undefined ? <span style={{ position: "absolute", left: "-4%", top: "54%", height: "0.09em", width: `${st * 108}%`, background: K.hot, borderRadius: 4 }} /> : null}
        </span>
      );
    })}
  </div>
);

/** Figma-like selection: dashed frame + square handles + cursor arrow arriving at the corner. */
export const SelectBox: React.FC<{ t: number; at: number; children: React.ReactNode; pad?: number; color?: string; dark?: boolean; out?: number }> = ({ t, at, children, pad = 14, color, dark, out }) => {
  const k = p(t, at, 0.45, OUT);
  const o = out === undefined ? 1 : 1 - p(t, out, 0.3);
  const c = color ?? (dark ? "#fff" : K.ink);
  const cur = p(t, at - 0.15, 0.6, OUT);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      <span style={{ position: "absolute", inset: -pad, border: `2px dashed ${c}`, opacity: k * o, clipPath: `inset(0 ${(1 - k) * 100}% 0 0)` }} />
      {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => (
        <span key={i} style={{ position: "absolute", left: `calc(${x * 100}% + ${x ? pad : -pad}px - 6px)`, top: `calc(${y * 100}% + ${y ? pad : -pad}px - 6px)`, width: 12, height: 12, background: dark ? K.dark : "#fff", border: `2px solid ${c}`, opacity: k * o }} />
      ))}
      <svg width={34} height={34} viewBox="0 0 24 24" style={{ position: "absolute", right: -pad - 30 - (1 - cur) * 70, bottom: -pad - 30 - (1 - cur) * 60, opacity: cur * o }}>
        <path d="M4 2l15 9-6.5 1.6L9 19z" fill={dark ? "#fff" : K.ink} stroke={dark ? K.dark : "#fff"} strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
    </span>
  );
};

// ───────────── 3D objects ─────────────
export type ObjFrom = "left" | "right" | "top" | "bottom" | "scale" | "spin";
/** A 3D object (public/broad-sharp-v2/3d/<name>.png) with a whoosh entrance and idle float. */
export const Obj: React.FC<{
  name: string; t: number; at: number; x: number; y: number; size?: number; from?: ObjFrom; mono?: boolean; rot?: number; out?: number; float?: number; shadow?: boolean;
}> = ({ name, t, at, x, y, size = 260, from = "scale", mono = true, rot = 0, out, float = 1, shadow = true }) => {
  const k = p(t, at, 0.6, BACK);
  const m = p(t, at, 0.5, OUT);
  const o = out === undefined ? 1 : 1 - p(t, out, 0.3, IN);
  if (t < at - 0.05 || o <= 0) return null;
  const off = { left: [-700, 0], right: [700, 0], top: [0, -600], bottom: [0, 600], scale: [0, 0], spin: [0, 0] }[from];
  const bob = Math.sin((t - at) * 1.6 + x) * 10 * float;
  const blur = (1 - m) * (from === "scale" ? 6 : 18);
  return (
    <div style={{ position: "absolute", left: x + off[0] * (1 - m), top: y + off[1] * (1 - m) + bob, width: size, height: size, transform: `translate(-50%,-50%) rotate(${rot + (from === "spin" ? (1 - m) * -180 : 0) + Math.sin(t * 0.9 + x) * 2.5}deg) scale(${from === "scale" || from === "spin" ? lerp(0.4, 1, k) : 1})`, opacity: Math.min(1, m * 1.6) * o,
      filter: `blur(${blur}px)${shadow ? " drop-shadow(0 28px 30px rgba(0,0,0,0.28))" : ""}` }}>
      <Img src={staticFile(`broad-sharp-v2/3d/${name}.png`)} style={{ width: "100%", height: "100%", filter: mono ? "grayscale(1) contrast(1.18) brightness(1.04)" : "saturate(1.05)" }} />
    </div>
  );
};

// ───────────── logos & tiles ─────────────
export const Logo: React.FC<{ name: LogoName; size?: number; color?: string }> = ({ name, size = 40, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block", flex: "none" }}><path d={LOGOS[name].path} fill={color ?? LOGOS[name].hex} /></svg>
);
/** Glossy dark app tile with a white brand glyph (reference: Meta / Google Ads tiles). */
export const AppTile: React.FC<{ name: LogoName; size?: number; label?: boolean; color?: boolean }> = ({ name, size = 170, label = true, color = false }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.24, position: "relative", background: "linear-gradient(150deg, #3a3436 0%, #120e0f 55%, #050404 100%)",
    boxShadow: `0 ${size * 0.16}px ${size * 0.3}px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.22), inset 0 -6px 14px rgba(0,0,0,0.6)`, display: "grid", placeItems: "center" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0) 45%)" }} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.05 }}>
      <Logo name={name} size={size * 0.46} color={color ? LOGOS[name].hex : "#fff"} />
      {label ? <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: size * 0.1, color: "rgba(255,255,255,0.85)" }}>{LOGOS[name].title}</span> : null}
    </div>
  </div>
);

/** Pop-in wrapper (absolute, centred). */
export const Pop: React.FC<{ t: number; at: number; x: number; y: number; out?: number; from?: ObjFrom; children: React.ReactNode; rot?: number; dur?: number }> = ({ t, at, x, y, out, from = "scale", children, rot = 0, dur = 0.55 }) => {
  const k = p(t, at, dur, BACK);
  const m = p(t, at, dur * 0.8, OUT);
  const o = out === undefined ? 1 : 1 - p(t, out, 0.3, IN);
  if (t < at - 0.05 || o <= 0) return null;
  const off = { left: [-500, 0], right: [500, 0], top: [0, -400], bottom: [0, 400], scale: [0, 0], spin: [0, 0] }[from];
  return (
    <div style={{ position: "absolute", left: x + off[0] * (1 - m), top: y + off[1] * (1 - m), transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${from === "scale" ? lerp(0.6, 1, k) : 1})`, opacity: Math.min(1, m * 1.5) * o, filter: `blur(${(1 - m) * 10}px)` }}>{children}</div>
  );
};

// ───────────── pinned note ─────────────
export const PinNote: React.FC<{ t: number; at: number; title?: string; rows: { text: string; at: number; icon?: string; strike?: number }[]; w?: number; dark?: boolean }> = ({ t, at, title, rows, w = 560, dark = true }) => (
  <div style={{ position: "relative", width: w, padding: "46px 40px 34px", borderRadius: 10, background: dark ? "linear-gradient(160deg, #3b3537, #241f21)" : "#fff",
    boxShadow: "0 40px 70px rgba(0,0,0,0.32), 0 6px 14px rgba(0,0,0,0.2)", transform: `rotate(${lerp(-4, -1.2, p(t, at, 0.7, OUT))}deg)`, fontFamily: DISPLAY }}>
    <div style={{ position: "absolute", left: "50%", top: -50, width: 92, height: 92, transform: "translateX(-50%) rotate(-12deg)" }}>
      <Img src={staticFile("broad-sharp-v2/3d/pushpin.png")} style={{ width: "100%", height: "100%" }} />
    </div>
    {title ? <div style={{ fontSize: 44, fontWeight: 800, color: dark ? "#fff" : K.ink, marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{title}</div> : null}
    {title ? <div style={{ height: 3, background: dark ? "rgba(255,255,255,0.35)" : K.line, marginBottom: 18, width: `${p(t, at + 0.2, 0.6) * 100}%` }} /> : null}
    {rows.map((r) => {
      const k = p(t, r.at, 0.4, OUT);
      const st = r.strike === undefined ? 0 : p(t, r.strike, 0.35);
      return (
        <div key={r.text} style={{ display: "flex", alignItems: "center", gap: 16, margin: "12px 0", opacity: k * lerp(1, 0.5, st), transform: `translateX(${(1 - k) * 30}px)`, filter: `blur(${(1 - k) * 6}px)` }}>
          {r.icon ? <Img src={staticFile(`broad-sharp-v2/3d/${r.icon}.png`)} style={{ width: 46, height: 46, filter: "grayscale(1) contrast(1.15) brightness(1.15)" }} /> : null}
          <span style={{ position: "relative", fontSize: 30, fontWeight: 700, color: dark ? "#fff" : K.ink }}>
            {r.text}
            <span style={{ position: "absolute", left: 0, top: "52%", height: 3, width: `${st * 100}%`, background: K.hot }} />
          </span>
        </div>
      );
    })}
  </div>
);

// ───────────── ad interface mockups ─────────────
export const Phone: React.FC<{ w?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 380, children, style }) => (
  <div style={{ width: w, height: w * 2.05, borderRadius: w * 0.14, background: "#111", padding: w * 0.03, boxSizing: "border-box", boxShadow: "0 50px 90px rgba(0,0,0,0.38), inset 0 0 0 2px #333", ...style }}>
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: w * 0.115, overflow: "hidden", background: "#fff" }}>
      <div style={{ position: "absolute", left: "50%", top: 10, width: w * 0.3, height: 26, borderRadius: 20, background: "#111", transform: "translateX(-50%)", zIndex: 3 }} />
      {children}
    </div>
  </div>
);

/** Facebook / Instagram style sponsored post (real logos; no metrics). */
export const FeedPost: React.FC<{
  t: number; platform: "facebook" | "instagram"; page: string; text: string; textAt?: number; typeDur?: number; image: React.ReactNode; cta: string; w?: number; headline?: string;
}> = ({ t, platform, page, text, textAt, typeDur = 1.5, image, cta, w = 356, headline }) => {
  const n = textAt === undefined ? text.length : Math.round(text.length * p(t, textAt, typeDur, (x) => x));
  const chars = [...text];
  return (
    <div style={{ width: w, fontFamily: `"Inter","Noto Sans Bengali",sans-serif`, color: "#050505", background: "#fff" }}>
      <div style={{ height: 50, display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderBottom: "1px solid #e4e6eb", marginTop: 34 }}>
        <Logo name={platform} size={26} />
        {platform === "instagram" ? <span style={{ fontSize: 20, fontWeight: 700, fontStyle: "italic" }}>Instagram</span> : <span style={{ fontSize: 20, fontWeight: 800, color: K.blue }}>facebook</span>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#720013,#2D0001)", color: "#fff", fontWeight: 800, fontSize: 16, display: "grid", placeItems: "center" }}>{page[0]}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{page}</div>
          <div style={{ fontSize: 12, color: "#65676b" }}>Sponsored · 🌐</div>
        </div>
        <span style={{ marginLeft: "auto", fontSize: 18, color: "#65676b" }}>•••</span>
      </div>
      <div style={{ padding: "0 14px 10px", fontSize: 16, lineHeight: 1.35, minHeight: 44 }}>{chars.slice(0, n).join("")}</div>
      <div style={{ height: w * 0.86, background: "#efe9df", position: "relative", overflow: "hidden" }}>{image}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#f0f2f5" }}>
        <div style={{ fontSize: 14, fontWeight: 700, maxWidth: w * 0.6 }}>{headline ?? page}</div>
        <div style={{ padding: "8px 14px", borderRadius: 6, background: "#e4e6eb", fontSize: 14, fontWeight: 700 }}>{cta}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "10px 0", fontSize: 14, color: "#65676b", fontWeight: 600 }}><span>👍 Like</span><span>💬 Comment</span><span>↗ Share</span></div>
    </div>
  );
};

/** Ads-Manager-style audience panel (conceptual reconstruction; settings only, never results). */
export const AdsPanel: React.FC<{ t: number; w?: number; children: React.ReactNode; title?: string }> = ({ w = 640, children, title = "Audience" }) => (
  <div style={{ width: w, borderRadius: 14, background: "#fff", boxShadow: "0 40px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)", fontFamily: `"Inter",sans-serif`, color: "#1c1e21", overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 22px", borderBottom: "1px solid #e4e6eb" }}>
      <Logo name="meta" size={28} />
      <span style={{ fontSize: 15, fontWeight: 700, color: "#65676b" }}>Ads Manager</span>
      <span style={{ fontSize: 15, color: "#bcc0c4" }}>/</span>
      <span style={{ fontSize: 17, fontWeight: 800 }}>{title}</span>
    </div>
    <div style={{ padding: "18px 22px 22px" }}>{children}</div>
  </div>
);
export const Toggle: React.FC<{ on: number }> = ({ on }) => (
  <div style={{ width: 54, height: 30, borderRadius: 30, background: on > 0.5 ? K.blue : "#ccd0d5", position: "relative", flex: "none" }}>
    <div style={{ position: "absolute", top: 3, left: lerp(3, 27, on), width: 24, height: 24, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
  </div>
);
export const Chip: React.FC<{ children: React.ReactNode; k?: number; x?: boolean; strike?: number }> = ({ children, k = 1, x = true, strike = 0 }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 8, background: "#e7f0ff", color: "#0a3a8c", fontSize: 15, fontWeight: 700, opacity: k * lerp(1, 0.4, strike),
    transform: `scale(${lerp(0.7, 1, k)})`, textDecoration: strike > 0.5 ? "line-through" : "none" }}>{children}{x ? <span style={{ opacity: 0.6 }}>✕</span> : null}</span>
);

/** Rubber stamp slam. */
export const Stamp: React.FC<{ t: number; at: number; text: string; rot?: number; size?: number }> = ({ t, at, text, rot = -8, size = 120 }) => {
  const k = p(t, at, 0.28, IN);
  if (t < at) return null;
  return (
    <div style={{ transform: `rotate(${rot}deg) scale(${lerp(2.2, 1, k)})`, opacity: Math.min(1, k * 2), padding: `${size * 0.12}px ${size * 0.3}px`, border: `${size * 0.07}px solid ${K.hot}`, borderRadius: size * 0.12,
      fontFamily: DISPLAY, fontWeight: 900, fontSize: size, letterSpacing: "0.06em", color: K.hot, background: "rgba(255,255,255,0.06)", mixBlendMode: "multiply" }}>{text}</div>
  );
};

/** Camera shake amount (px) for a hit at `at`. */
export const shake = (t: number, at: number, amp = 14) => {
  if (t < at || t > at + 0.4) return [0, 0];
  const d = 1 - (t - at) / 0.4;
  return [Math.sin(t * 90) * amp * d, Math.cos(t * 77) * amp * d];
};

/** Deterministic avatar grid dot (for "reach many people" fields). */
export const avatarSeed = (i: number) => random(`av${i}`);
