/**
 * FAHAD BRAND — information-motion kit: signal trails that carry labels, reaction nodes
 * (anonymous people), attention ripples, particle fields that cluster, and an abstract
 * signal-processing field (the "system" — never a brain or robot).
 */
import { getLength, getPointAtLength } from "@remotion/paths";
import { random } from "remotion";
import { drawn, IN_OUT, lerp, OUT, p } from "../motion";
import { COLORS, INK } from "../tokens";

/** Signal trail (inside <Lines>): draws from source; a dot runs ahead; optional label rides it and parks at the end. */
export const Trail: React.FC<{ d: string; t: number; at: number; dur?: number; label?: string; hot?: number; width?: number; out?: number; labelSide?: "end" | "none" }> = ({ d, t, at, dur = 0.8, label, hot = 1, width = 2.5, out, labelSide = "end" }) => {
  if (t < at) return null;
  const o = out === undefined ? 1 : 1 - p(t, out, 0.35);
  if (o <= 0) return null;
  const dd = drawn(d, t, at, dur);
  const k = p(t, at, dur, IN_OUT);
  const len = getLength(d);
  const head = getPointAtLength(d, len * k) ?? { x: 0, y: 0 };
  const end = getPointAtLength(d, len) ?? { x: 0, y: 0 };
  const stroke = hot > 0.5 ? COLORS.crimson : INK.lineStrong;
  const lw = label ? label.length * 9.6 + 34 : 0;
  return (
    <g opacity={o}>
      <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeDasharray={dd.strokeDasharray} strokeDashoffset={dd.strokeDashoffset} />
      {k < 1 ? <circle cx={head.x} cy={head.y} r={6} fill={stroke} /> : null}
      {label && labelSide === "end" ? (
        <g transform={`translate(${k < 1 ? head.x : end.x} ${k < 1 ? head.y : end.y})`} opacity={p(t, at + dur * 0.3, 0.3)}>
          <rect x={-lw / 2} y={-17} width={lw} height={34} rx={17} fill={hot > 0.5 ? COLORS.burgundy : "#fff"} stroke={hot > 0.5 ? "none" : INK.line} strokeWidth={2} />
          <text x={0} y={6} textAnchor="middle" fontSize={15} fontWeight={800} letterSpacing={1.6} fill={hot > 0.5 ? COLORS.ivory : INK.strong}>{label}</text>
        </g>
      ) : null}
    </g>
  );
};

/** A pulse that travels along `d` once, between at and at+dur (inside <Lines>). */
export const Pulse: React.FC<{ d: string; t: number; at: number; dur?: number; r?: number; color?: string }> = ({ d, t, at, dur = 0.8, r = 9, color = COLORS.crimson }) => {
  if (t < at || t > at + dur + 0.15) return null;
  const k = p(t, at, dur, IN_OUT);
  const pt = getPointAtLength(d, getLength(d) * k) ?? { x: 0, y: 0 };
  return (
    <g opacity={1 - p(t, at + dur, 0.15)}>
      <circle cx={pt.x} cy={pt.y} r={r * 2.2} fill={color} opacity={0.15} />
      <circle cx={pt.x} cy={pt.y} r={r} fill={color} />
    </g>
  );
};

/** Expanding rings at a point (inside <Lines>). `level` scales the reaction; `k` fades it in. */
export const Ripple: React.FC<{ x: number; y: number; t: number; k: number; level?: number; base?: number; speed?: number }> = ({ x, y, t, k, level = 1, base = 30, speed = 0.8 }) => (
  <g opacity={k}>
    {[0, 1, 2].map((i) => {
      const r = (t * speed + i / 3) % 1;
      return <circle key={i} cx={x} cy={y} r={base + r * 70 * level} fill="none" stroke={COLORS.crimson} strokeWidth={2} opacity={(1 - r) * 0.5 * Math.min(1, level)} />;
    })}
  </g>
);

/** Anonymous person node (no face): head + shoulders. reaction: 0 low · 1 interest · 2 strong. */
export const PersonNode: React.FC<{ x: number; y: number; t: number; k: number; reaction?: number; size?: number; label?: string }> = ({ x, y, t, k, reaction = 0, size = 1, label }) => {
  const strong = reaction >= 2 ? k : 0;
  const fill = strong > 0.5 ? COLORS.burgundy : reaction >= 1 ? "rgba(114,0,19,0.45)" : "rgba(114,0,19,0.18)";
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      {reaction > 0 ? <Ripple x={0} y={-6} t={t} k={k} level={reaction >= 2 ? 1.2 : 0.55} base={28} speed={reaction >= 2 ? 1 : 0.6} /> : null}
      <circle cx={0} cy={-20} r={11} fill={fill} />
      <path d="M -20 14 Q -20 -6 0 -6 Q 20 -6 20 14 Z" fill={fill} />
      {label ? <text x={0} y={40} textAnchor="middle" fontSize={13} fontWeight={800} letterSpacing={1.4} fill={INK.muted}>{label}</text> : null}
    </g>
  );
};

/** Deterministic particle field: scatter inside a box, then gather into clusters or collapse to a point. */
export const ParticleField: React.FC<{
  t: number; n: number; box: [number, number, number, number]; seed: string; appear: number;
  clusters?: { x: number; y: number }[]; gather?: number; collapse?: { x: number; y: number; k: number }; source?: { x: number; y: number; at: number };
}> = ({ t, n, box, seed, appear, clusters = [], gather = 0, collapse, source }) => {
  const [bx, by, bw, bh] = box;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const sx = bx + random(`${seed}x${i}`) * bw;
        const sy = by + random(`${seed}y${i}`) * bh;
        const drift = Math.sin(t * 0.9 + i) * 6;
        let x = sx + drift, y = sy + Math.cos(t * 0.7 + i * 1.7) * 6;
        const born = source ? p(t, source.at + random(`${seed}b${i}`) * 1.2, 0.9, OUT) : p(t, appear + random(`${seed}b${i}`) * 0.8, 0.5);
        if (source) { x = lerp(source.x, x, born); y = lerp(source.y, y, born); }
        if (clusters.length && gather > 0) {
          const c = clusters[i % clusters.length];
          const a = random(`${seed}a${i}`) * Math.PI * 2, rr = 18 + random(`${seed}r${i}`) * 46;
          x = lerp(x, c.x + Math.cos(a + t * 0.3) * rr, gather);
          y = lerp(y, c.y + Math.sin(a + t * 0.3) * rr, gather);
        }
        if (collapse && collapse.k > 0) { x = lerp(x, collapse.x, collapse.k); y = lerp(y, collapse.y, collapse.k); }
        const big = random(`${seed}s${i}`) > 0.82;
        return <circle key={i} cx={x} cy={y} r={big ? 5 : 3.2} fill={big ? COLORS.crimson : COLORS.burgundy} opacity={born * (big ? 0.85 : 0.45) * (collapse ? 1 - collapse.k * 0.7 : 1)} />;
      })}
    </g>
  );
};

/** Abstract signal-processing field: counter-rotating dotted orbits and crossing arcs. */
export const SystemField: React.FC<{ x: number; y: number; t: number; k: number; r?: number; active?: number; label?: string }> = ({ x, y, t, k, r = 150, active = 0, label }) => (
  <g transform={`translate(${x} ${y})`} opacity={k}>
    <circle r={r * 1.1} fill={COLORS.crimson} opacity={0.04 + 0.05 * active} />
    {[1, 0.74, 0.48].map((m, i) => (
      <g key={i} transform={`rotate(${(i % 2 ? -1 : 1) * t * (14 + 10 * active) * (i + 1)})`}>
        <circle r={r * m} fill="none" stroke={COLORS.burgundy} strokeWidth={1.6} strokeDasharray={i === 1 ? "2 9" : `${r * m * 0.6} ${r * m * 0.25}`} opacity={0.45} />
        {Array.from({ length: 5 + i * 2 }, (_, j) => {
          const a = (j / (5 + i * 2)) * Math.PI * 2;
          return <circle key={j} cx={Math.cos(a) * r * m} cy={Math.sin(a) * r * m} r={j % 3 === 0 ? 5 : 3} fill={j % 3 === 0 ? COLORS.crimson : COLORS.burgundy} opacity={0.7} />;
        })}
      </g>
    ))}
    <circle r={r * 0.24} fill={active > 0.5 ? COLORS.burgundy : "#fff"} stroke={COLORS.burgundy} strokeWidth={2} />
    {label ? <text y={6} textAnchor="middle" fontSize={15} fontWeight={800} letterSpacing={2} fill={active > 0.5 ? COLORS.ivory : COLORS.burgundy}>{label}</text> : null}
  </g>
);
