/**
 * FAHAD BRAND — optics kit (camera/lens motion language).
 *   AudienceField  a soft, breathing population of dots = broad audience / delivery
 *   FocusLens      the precise ring = strategy; content inside is razor sharp
 *   Sharp / Soft   text that focus-pulls blur → sharp (or stays soft and wide)
 *   FocusTick      a tiny crisp ring pulse — the "beat" accent on emphasis words
 *   ApertureWipe   six-blade iris transition (opens to reveal / closes to a point)
 * Blur here carries meaning (soft = broad, sharp = strategy) — never decoration.
 */
import { random } from "remotion";
import { IN_OUT, lerp, OUT, p } from "../motion";
import { COLORS, INK } from "../tokens";

// ───────────── AudienceField ─────────────
export type FieldState = {
  spread: number; // 0 collapsed to centre → 1 fills frame
  blur: number; // px of soft focus on the population
  o: number; // overall opacity
  cx: number; cy: number; cw: number; ch: number; // crop window (normalised); dots outside it fade
  hl: number; // highlight threshold (0..1 share of dots that turn sharp crimson)
  hlK: number; // highlight intensity
  hlSeed: number; // which highlight subset (integer)
  org: number; // 0 free drift → 1 organised into clusters
};
export const FIELD0: FieldState = { spread: 0, blur: 2.2, o: 1, cx: 0.5, cy: 0.5, cw: 1.3, ch: 1.3, hl: 0, hlK: 0, hlSeed: 0, org: 0 };

const N = 640;
const CLUSTERS = [[420, 330], [860, 250], [1330, 330], [1560, 700], [1000, 780], [470, 760]];
const DOTS = Array.from({ length: N }, (_, i) => {
  const x = 70 + random(`fx${i}`) * 1780;
  const y = 50 + random(`fy${i}`) * 980;
  const d = Math.hypot(x - 960, y - 540) / 1100;
  return { x, y, d, r: 2 + random(`fr${i}`) * 2.6, a: 0.22 + random(`fa${i}`) * 0.3, ph: random(`fp${i}`) * 6.28, c: i % CLUSTERS.length };
});

/** Screen position of dot i under a field state (shared by scenes that need to point at dots). */
export const fieldDot = (i: number, st: FieldState, t: number) => {
  const D = DOTS[i];
  const e = p(st.spread, D.d * 0.45, 0.55, OUT);
  let x = lerp(960, D.x, e) + Math.sin(t * 0.5 + D.ph) * 7;
  let y = lerp(540, D.y, e) + Math.cos(t * 0.42 + D.ph * 1.3) * 6;
  if (st.org > 0) {
    const [kx, ky] = CLUSTERS[D.c];
    const a = D.ph + t * 0.12, rr = 30 + (i % 17) * 6.5;
    x = lerp(x, kx + Math.cos(a) * rr, st.org);
    y = lerp(y, ky + Math.sin(a) * rr * 0.75, st.org);
  }
  return { x, y };
};
export const isHighlighted = (i: number, st: FieldState) => random(`hl${Math.round(st.hlSeed)}-${i}`) < st.hl;

export const AudienceField: React.FC<{ st: FieldState; t: number }> = ({ st, t }) => {
  if (st.o <= 0.001) return null;
  const crop = (x: number, y: number) => {
    const inX = Math.abs(x / 1920 - st.cx) <= st.cw / 2, inY = Math.abs(y / 1080 - st.cy) <= st.ch / 2;
    return inX && inY ? 1 : 0.13;
  };
  const pts = DOTS.map((D, i) => ({ ...fieldDot(i, st, t), D, i, hot: st.hlK > 0.01 && isHighlighted(i, st) }));
  const breath = 1 + 0.04 * Math.sin(t * 0.8);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: st.o }}>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, filter: `blur(${st.blur}px)` }}>
        {st.spread < 0.02 ? <circle cx={960} cy={540} r={9 * breath} fill={COLORS.crimson} /> : null}
        {pts.map(({ x, y, D, i, hot }) => (
          <circle key={i} cx={x} cy={y} r={D.r * breath} fill={COLORS.burgundy} opacity={D.a * crop(x, y) * (hot ? 1 - st.hlK * 0.8 : 1) * Math.min(1, st.spread * 3)} />
        ))}
      </svg>
      {st.hlK > 0.01 ? (
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          {pts.filter((q) => q.hot).map(({ x, y, D, i }) => (
            <g key={i} opacity={st.hlK}>
              <circle cx={x} cy={y} r={D.r * 2.6} fill={COLORS.crimson} opacity={0.14} />
              <circle cx={x} cy={y} r={D.r + 1.4} fill={COLORS.crimson} />
            </g>
          ))}
        </svg>
      ) : null}
    </div>
  );
};

// ───────────── FocusLens ─────────────
export const FocusLens: React.FC<{
  t: number; r?: number; k?: number; glass?: boolean; spin?: number; children?: React.ReactNode; label?: string;
}> = ({ t, r = 200, k = 1, glass = true, spin = 1, children, label }) => {
  const size = r * 2 + 60;
  const c = size / 2;
  const rot = t * 8 * spin;
  return (
    <div style={{ position: "relative", width: size, height: size, opacity: Math.min(1, k * 1.5), transform: `scale(${lerp(0.85, 1, k)})` }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {glass ? <circle cx={c} cy={c} r={r} fill="rgba(255,255,255,0.62)" /> : null}
        <circle cx={c} cy={c} r={r} fill="none" stroke={COLORS.burgundy} strokeWidth={2.6} />
        <circle cx={c} cy={c} r={r + 16} fill="none" stroke={INK.line} strokeWidth={1.5} />
        <g transform={`rotate(${rot} ${c} ${c})`}>
          {Array.from({ length: 72 }, (_, i) => {
            const a = (i / 72) * Math.PI * 2, long = i % 6 === 0;
            const r1 = r + 18, r2 = r + (long ? 34 : 25);
            return <line key={i} x1={c + Math.cos(a) * r1} y1={c + Math.sin(a) * r1} x2={c + Math.cos(a) * r2} y2={c + Math.sin(a) * r2} stroke={long ? COLORS.burgundy : INK.lineStrong} strokeWidth={long ? 2 : 1.2} />;
          })}
        </g>
        <g transform={`rotate(${-rot * 2.2} ${c} ${c})`}>
          <path d={`M ${c + r - 8} ${c} A ${r - 8} ${r - 8} 0 0 1 ${c} ${c + r - 8}`} fill="none" stroke={COLORS.crimson} strokeWidth={3.5} strokeLinecap="round" strokeDasharray={`${r * 0.5} ${r * 2}`} />
        </g>
        {[0, 90, 180, 270].map((a) => (
          <line key={a} x1={c} y1={c - r + 6} x2={c} y2={c - r + 20} stroke={COLORS.crimson} strokeWidth={2.5} transform={`rotate(${a} ${c} ${c})`} />
        ))}
      </svg>
      <div style={{ position: "absolute", inset: 30, borderRadius: "50%", display: "grid", placeItems: "center", textAlign: "center" }}>{children}</div>
      {label ? <div style={{ position: "absolute", left: 0, right: 0, top: size + 8, textAlign: "center", fontSize: 15, fontWeight: 800, letterSpacing: "0.24em", color: COLORS.crimson }}>{label}</div> : null}
    </div>
  );
};

// ───────────── focus-pull text ─────────────
/** Pulls into focus at `at`: blur → 0, wide tracking → normal, fades in. */
export const Sharp: React.FC<{ t: number; at: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties; track?: number }> = ({ t, at, dur = 0.45, children, style, track = 0.25 }) => {
  const k = p(t, at, dur, OUT);
  return (
    <span style={{ display: "inline-block", filter: `blur(${(1 - k) * 9}px)`, opacity: k, letterSpacing: `${(1 - k) * track}em`, transform: `scale(${lerp(1.04, 1, k)})`, ...style }}>{children}</span>
  );
};
/** Deliberately soft and wide — "broad" words. `k` 0 sharp → 1 fully soft. */
export const Soft: React.FC<{ k?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ k = 1, children, style }) => (
  <span style={{ display: "inline-block", filter: `blur(${1.8 * k}px)`, letterSpacing: `${0.28 * k}em`, opacity: lerp(1, 0.78, k), ...style }}>{children}</span>
);

/** Crisp ring pulse at (x,y) when `at` passes (use inside an SVG layer). */
export const FocusTick: React.FC<{ x: number; y: number; t: number; at: number; r?: number }> = ({ x, y, t, at, r = 30 }) => {
  if (t < at || t > at + 0.7) return null;
  const k = p(t, at, 0.6, OUT);
  return <circle cx={x} cy={y} r={r * lerp(0.4, 1.4, k)} fill="none" stroke={COLORS.crimson} strokeWidth={2.5 * (1 - k) + 0.5} opacity={1 - k} />;
};

// ───────────── ApertureWipe ─────────────
/** Ivory iris with a hexagonal hole. Radius eases from `from` to `to` over [at, at+dur]. */
export const ApertureWipe: React.FC<{ t: number; at: number; dur?: number; from: number; to: number; cx?: number; cy?: number; out?: number }> = ({ t, at, dur = 0.9, from, to, cx = 960, cy = 540, out }) => {
  const k = p(t, at, dur, IN_OUT);
  const r = lerp(from, to, k);
  const fade = out === undefined ? 1 : 1 - p(t, out, 0.4);
  if (r > 1250 || fade <= 0) return null;
  const rot = lerp(-30, 0, k);
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 + rot) * Math.PI) / 180;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });
  const d = `M 0 0 H 1920 V 1080 H 0 Z M ${hex.map(([x, y]) => `${x} ${y}`).join(" L ")} Z`;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: fade }}>
      <path d={d} fill={COLORS.ivory} fillRule="evenodd" />
      {hex.map(([x, y], i) => {
        const a = ((i * 60 + rot + 90) * Math.PI) / 180;
        return <line key={i} x1={x} y1={y} x2={x + Math.cos(a) * 900} y2={y + Math.sin(a) * 900} stroke={INK.line} strokeWidth={2} />;
      })}
      <path d={`M ${hex.map(([x, y]) => `${x} ${y}`).join(" L ")} Z`} fill="none" stroke={COLORS.burgundy} strokeWidth={2} opacity={0.6} />
    </svg>
  );
};
