/**
 * FAHAD BRAND — CreativeSignalCanvas: a floating editorial ad creative that can assemble,
 * morph its headline/context, break into layers, and act as the source of signal trails.
 * State is plain numbers so a whole video can keyframe it continuously (see canvasTrack).
 */
import { BACK, IN_OUT, lerp, p } from "../motion";
import { COLORS, INK } from "../tokens";

export const CW = 460;
export const CH = 600;

export type CanvasState = {
  x: number; y: number; s: number; o: number;
  build: number; // 0→1 staged assembly (frame → image → headline → CTA)
  typeA: number; typeB: number; showB: number; // headline typing + crossfade A→B
  family: number; // 0 product-only art → 1 family/home context art
  explode: number; // 0 → 1 layers separate
  ripple: number; // attention field intensity
  bg: number; // background tint index (clones)
  rot: number;
};
export const CANVAS0: CanvasState = { x: 960, y: 540, s: 1, o: 1, build: 0, typeA: 0, typeB: 0, showB: 0, family: 0, explode: 0, ripple: 0, bg: 0, rot: 0 };

export type CanvasKey = { at: number; dur?: number } & Partial<CanvasState>;
/** Fold keyframes: each key eases the state toward its values from `at` over `dur` (IN_OUT). */
export const canvasTrack = (t: number, keys: CanvasKey[], base: CanvasState = CANVAS0): CanvasState => {
  const st = { ...base };
  for (const k of keys) {
    const e = p(t, k.at, k.dur ?? 0.8, IN_OUT);
    if (e <= 0) continue;
    for (const f of Object.keys(k) as (keyof CanvasKey)[]) {
      if (f === "at" || f === "dur") continue;
      const v = k[f] as number;
      (st as Record<string, number>)[f] = lerp((st as Record<string, number>)[f], v, e);
    }
  }
  return st;
};
/** Screen point of a canvas-local point (lx, ly in 0..CW, 0..CH). */
export const canvasPoint = (st: Pick<CanvasState, "x" | "y" | "s">, lx: number, ly: number): [number, number] => [st.x + (lx - CW / 2) * st.s, st.y + (ly - CH / 2) * st.s];
/** Local anchors for signal extraction. */
export const ANCHOR = { image: [230, 214], headL: [110, 420], headR: [360, 420], headMid: [230, 420], cta: [110, 548], meta: [330, 548], top: [230, 40] } as const;

const BG_TINTS = ["#FFFFFF", "#F6E9E4", "#F1EAD6", "#EFE2E6", "#F7F1DF"];

/** Editorial apartment illustration (300px tall image area). `family` adds home/family context. */
export const ApartmentArt: React.FC<{ family: number; t: number; w?: number }> = ({ family, t, w = CW }) => {
  const lit = (i: number) => family * (((i * 7) % 5) < 3 ? 1 : 0.2);
  return (
    <svg viewBox="0 0 460 300" width={w} height={(w / 460) * 300} style={{ display: "block" }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3E7DA" />
          <stop offset="1" stopColor="#FBFCEB" />
        </linearGradient>
      </defs>
      <rect width="460" height="300" fill="url(#sky)" />
      <rect width="460" height="300" fill={COLORS.crimson} opacity={0.07 * family} />
      <circle cx="372" cy={78 - family * 10} r="34" fill={COLORS.crimson} opacity={0.16 + 0.1 * family} />
      <rect x="58" y="96" width="112" height="204" rx="4" fill={COLORS.burgundy} opacity="0.2" />
      {Array.from({ length: 12 }, (_, i) => <rect key={i} x={72 + (i % 3) * 32} y={112 + Math.floor(i / 3) * 42} width="18" height="22" rx="2" fill="#FBFCEB" opacity="0.5" />)}
      <rect x="170" y={40} width="150" height="260" rx="5" fill={COLORS.burgundy} />
      <rect x="170" y="40" width="150" height="10" fill={COLORS.maroon} opacity="0.5" />
      {Array.from({ length: 21 }, (_, i) => {
        const cx = 186 + (i % 3) * 44, cy = 64 + Math.floor(i / 3) * 32;
        return (
          <g key={i}>
            <rect x={cx} y={cy} width="28" height="18" rx="2" fill="#FBFCEB" opacity={0.28 + 0.62 * lit(i)} />
            <rect x={cx - 3} y={cy + 18} width="34" height="3" fill="#FBFCEB" opacity="0.22" />
          </g>
        );
      })}
      <rect x="320" y="122" width="92" height="178" rx="4" fill={COLORS.wine} opacity="0.32" />
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={334 + (i % 2) * 36} y={140 + Math.floor(i / 2) * 38} width="22" height="20" rx="2" fill="#FBFCEB" opacity="0.45" />)}
      <rect y="288" width="460" height="12" fill={COLORS.maroon} opacity="0.14" />
      <circle cx="44" cy="268" r="24" fill={COLORS.wine} opacity="0.22" />
      <circle cx="430" cy="270" r="20" fill={COLORS.wine} opacity="0.22" />
      {/* family context: abstract figures (no faces) + soft swing of the child figure */}
      <g opacity={family} transform={`translate(${lerp(-30, 0, family)} 0)`}>
        {[{ x: 92, h: 1 }, { x: 122, h: 0.92 }, { x: 148, h: 0.62 }].map((f, i) => (
          <g key={i} transform={`translate(${f.x} ${288 - (i === 2 ? Math.abs(Math.sin(t * 3)) * 3 : 0)})`}>
            <circle cx="0" cy={-52 * f.h} r={8.5 * Math.max(0.8, f.h)} fill={COLORS.maroon} />
            <path d={`M ${-11 * f.h} 0 Q ${-12 * f.h} ${-38 * f.h} 0 ${-40 * f.h} Q ${12 * f.h} ${-38 * f.h} ${11 * f.h} 0 Z`} fill={COLORS.maroon} />
          </g>
        ))}
      </g>
      <g opacity={family} transform={`translate(16 ${lerp(4, 16, family)})`}>
        <rect width="104" height="34" rx="17" fill={COLORS.ivory} />
        <text x="52" y="23" textAnchor="middle" fontSize="15" fontWeight="800" letterSpacing="1.5" fill={COLORS.burgundy}>3 BED · HOME</text>
      </g>
    </svg>
  );
};

/** The creative itself. Renders centred on (state.x, state.y). */
export const CreativeSignalCanvas: React.FC<{
  st: CanvasState; t: number; headlineA?: string; headlineB?: string; brand?: string; cta?: string; labels?: boolean;
}> = ({ st, t, headlineA = "Premium Apartment for Sale in Dhaka.", headlineB = "নিজের পরিবারের জন্য ঢাকাতে ৩ Bedroom Apartment খুঁজছেন?", brand = "Skyline Residences", cta = "Learn more", labels = true }) => {
  if (st.o <= 0.001) return null;
  const b = st.build;
  const frameK = p(b, 0, 0.25);
  const imgK = p(b, 0.1, 0.4, BACK);
  const headK = p(b, 0.4, 0.3);
  const ctaK = p(b, 0.68, 0.3, BACK);
  const ex = st.explode;
  const float = Math.sin(t * 1.3) * 4 * (1 - ex * 0.5);
  const layer = (dx: number, dy: number, rot: number): React.CSSProperties => ({
    transform: `translate(${dx * ex}px, ${dy * ex + float * 0.3}px) rotate(${rot * ex}deg)`,
    boxShadow: ex > 0.05 ? `0 ${24 * ex}px ${50 * ex}px rgba(45,0,1,${0.12 * ex})` : "none",
    borderRadius: 18 * ex, background: ex > 0.05 ? "#fff" : "transparent", position: "relative",
  });
  const tag = (text: string, k: number) => labels && ex > 0.05 ? (
    <div style={{ position: "absolute", top: -30, left: 0, fontSize: 15, fontWeight: 800, letterSpacing: "0.22em", color: COLORS.crimson, opacity: k }}>{text}</div>
  ) : null;
  const nA = Math.round(headlineA.length * st.typeA);
  const nB = Math.round([...headlineB].length * st.typeB);
  const ripples = [0, 1, 2].map((i) => ((t * 0.55 + i / 3) % 1));
  return (
    <div style={{ position: "absolute", left: st.x, top: st.y, width: CW, height: CH, opacity: st.o,
      transform: `translate(-50%,-50%) scale(${st.s}) rotate(${st.rot}deg) translateY(${float}px)`, transformOrigin: "50% 50%" }}>
      {/* attention field */}
      {st.ripple > 0.01 ? ripples.map((r, i) => (
        <div key={i} style={{ position: "absolute", inset: -20 - r * 120, borderRadius: 40 + r * 60, border: `2px solid ${COLORS.crimson}`, opacity: st.ripple * (1 - r) * 0.35 }} />
      )) : null}
      {/* frame */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 30, background: BG_TINTS[Math.round(st.bg) % BG_TINTS.length],
        border: `2px ${ex > 0.3 ? "dashed" : "solid"} rgba(114,0,19,${0.1 + 0.25 * ex})`,
        boxShadow: `0 40px 90px rgba(45,0,1,${0.13 * frameK * (1 - ex)})`, opacity: frameK * lerp(1, 0.25, ex) }} />
      <div style={{ position: "absolute", inset: 0, padding: 0 }}>
        {/* header */}
        <div style={{ height: 64, display: "flex", alignItems: "center", gap: 12, padding: "0 22px", opacity: frameK * (1 - ex) }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: COLORS.burgundy, color: COLORS.ivory, fontSize: 15, fontWeight: 800, display: "grid", placeItems: "center" }}>S</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: INK.strong }}>{brand}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: INK.muted }}>Sponsored</div>
          </div>
        </div>
        {/* image layer */}
        <div style={{ ...layer(-170, -70, -4), margin: "0 0", opacity: Math.min(1, imgK * 1.3), overflow: "hidden" }}>
          {tag("IMAGE", ex)}
          <div style={{ transform: `scale(${lerp(0.92, 1, imgK)})`, borderRadius: 14 * ex, overflow: "hidden" }}><ApartmentArt family={st.family} t={t} /></div>
        </div>
        {/* headline layer */}
        <div style={{ ...layer(210, 10, 3), margin: "16px 22px 0", padding: `${10 * ex}px ${12 * ex}px`, minHeight: 96, opacity: headK }}>
          {tag("HEADLINE", ex)}
          <div style={{ position: "relative", fontSize: 29, fontWeight: 800, lineHeight: 1.2, color: INK.strong, letterSpacing: "-0.01em" }}>
            <div style={{ opacity: 1 - st.showB, transform: `translateY(${-14 * st.showB}px)` }}>{headlineA.slice(0, nA)}</div>
            <div style={{ position: "absolute", inset: 0, opacity: st.showB, transform: `translateY(${14 * (1 - st.showB)}px)` }}>{[...headlineB].slice(0, nB).join("")}</div>
          </div>
        </div>
        {/* CTA layer */}
        <div style={{ ...layer(40, 180, -2), margin: "14px 22px 0", padding: `${10 * ex}px ${12 * ex}px`, display: "flex", alignItems: "center", justifyContent: "space-between", opacity: Math.min(1, ctaK * 1.3), transformOrigin: "left center" }}>
          {tag("CTA", ex)}
          <div style={{ padding: "12px 26px", borderRadius: 999, background: COLORS.burgundy, color: COLORS.ivory, fontSize: 17, fontWeight: 800, letterSpacing: "0.1em", transform: `scale(${lerp(0.85, 1, ctaK)})` }}>{cta.toUpperCase()}</div>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.14em", color: INK.muted }}>DHAKA · RESIDENTIAL</div>
        </div>
      </div>
    </div>
  );
};
