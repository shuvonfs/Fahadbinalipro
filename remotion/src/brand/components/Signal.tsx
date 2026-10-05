/** FAHAD BRAND — signal lines: connectors that draw on, then carry travelling value pulses. */
import { along, drawn, p } from "../motion";
import { COLORS, INK } from "../tokens";
import { leave } from "./Primitives";

/**
 * Use inside <Lines>. Draws `d` from `at`, then (if `pulse`) sends dots along it.
 * `hot` blends the stroke from hairline to crimson.
 */
export const SignalLine: React.FC<{
  d: string; t: number; at: number; dur?: number; out?: number; pulse?: number | false; period?: number; dots?: number;
  hot?: number; width?: number; dashed?: boolean; arrow?: boolean;
}> = ({ d, t, at, dur = 0.6, out, pulse = false, period = 1.3, dots = 2, hot = 0, width = 3, dashed, arrow }) => {
  const o = leave(t, out);
  if (t < at || o <= 0) return null;
  const draw = drawn(d, t, at, dur);
  const stroke = hot > 0.5 ? COLORS.crimson : INK.lineStrong;
  const pulses = pulse === false ? [] : Array.from({ length: dots }, (_, i) => along(d, t, pulse, period, i / dots));
  return (
    <g opacity={o}>
      <path d={d} fill="none" stroke={stroke} strokeWidth={width + hot * 1.5} strokeLinecap="round"
        strokeDasharray={dashed ? "2 12" : draw.strokeDasharray} strokeDashoffset={dashed ? 0 : draw.strokeDashoffset}
        opacity={dashed ? p(t, at, dur) : 1} />
      {arrow ? <ArrowHead d={d} t={t} at={at + dur * 0.85} color={stroke} /> : null}
      {pulses.map((pt, i) => (pt ? (
        <g key={i} opacity={Math.sin(pt.phase * Math.PI) * p(t, pulse as number, 0.3)}>
          <circle cx={pt.x} cy={pt.y} r={14} fill={COLORS.crimson} opacity={0.15} />
          <circle cx={pt.x} cy={pt.y} r={6.5} fill={COLORS.crimson} />
        </g>
      ) : null))}
    </g>
  );
};

/** Arrowhead at the end of a straight-ending path (direction from the last segment). */
const ArrowHead: React.FC<{ d: string; t: number; at: number; color: string }> = ({ d, t, at, color }) => {
  const nums = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  if (nums.length < 4) return null;
  const [x2, y2] = nums.slice(-2);
  const [x1, y1] = nums.slice(-4, -2);
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <path d="M -14 -9 L 0 0 L -14 9" fill="none" stroke={color} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"
      transform={`translate(${x2} ${y2}) rotate(${a})`} opacity={p(t, at, 0.2)} />
  );
};

/** Straight arrow between two points as a flat HTML-free helper path. */
export const seg = (x1: number, y1: number, x2: number, y2: number) => `M ${x1} ${y1} L ${x2} ${y2}`;
/** Smooth horizontal S-curve between two points. */
export const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
};
/** Smooth vertical S-curve. */
export const vcurve = (x1: number, y1: number, x2: number, y2: number) => {
  const my = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${my} ${x2} ${my} ${x2} ${y2}`;
};
