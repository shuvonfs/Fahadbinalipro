/**
 * FAHAD BRAND — the AI Engine: the recurring "machine" motif.
 * Not a logo — concentric orbit rings around a core. States blend continuously:
 *   uncertain (0→1): core dims, a "?" replaces the label, rings wobble
 *   active (0→1): core turns crimson, rings spin faster, pulse halo
 */
import { lerp, p } from "../motion";
import { COLORS, INK } from "../tokens";

export const AIEngine: React.FC<{
  t: number; size?: number; uncertain?: number; active?: number; label?: string; at?: number;
}> = ({ t, size = 280, uncertain = 0, active = 0, label = "AI", at = -1 }) => {
  const appear = at < 0 ? 1 : p(t, at, 0.7);
  const spin = t * lerp(18, 60, active);
  const wob = uncertain * Math.sin(t * 5) * 4;
  const r = size / 2;
  const halo = active * (0.5 + 0.5 * Math.sin(t * 4));
  return (
    <div style={{ width: size, height: size, position: "relative", opacity: appear, transform: `scale(${lerp(0.7, 1, appear)})` }}>
      <svg viewBox={`${-r} ${-r} ${size} ${size}`} width={size} height={size} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <circle r={r * 1.18} fill="none" stroke={COLORS.crimson} strokeWidth={2} opacity={halo * 0.35} />
        <circle r={r * (1.05 + halo * 0.12)} fill={COLORS.crimson} opacity={active * 0.06} />
        <g transform={`rotate(${spin + wob})`}>
          <circle r={r * 0.96} fill="none" stroke={INK.lineStrong} strokeWidth={2.5} strokeDasharray={`${r * 0.5} ${r * 0.18}`} />
          <circle r={r * 0.96} cx={0} cy={0} fill="none" />
          <circle cx={r * 0.96} cy={0} r={7} fill={COLORS.crimson} />
        </g>
        <g transform={`rotate(${-spin * 1.4 - wob})`}>
          <circle r={r * 0.76} fill="none" stroke={INK.line} strokeWidth={2} strokeDasharray="3 10" />
          <circle cx={0} cy={-r * 0.76} r={5} fill={COLORS.burgundy} opacity={0.7} />
        </g>
      </svg>
      <div style={{
        position: "absolute", left: "50%", top: "50%", width: size * 0.54, height: size * 0.54, borderRadius: "50%",
        transform: "translate(-50%,-50%)", display: "grid", placeItems: "center",
        background: active > 0 ? `radial-gradient(circle at 35% 30%, ${COLORS.crimson}, ${COLORS.burgundy})` : "linear-gradient(160deg,#fff,rgba(255,255,255,0.7))",
        border: `2px solid ${active > 0.5 ? COLORS.burgundy : INK.line}`,
        boxShadow: `0 20px 50px rgba(114,0,19,${0.08 + active * 0.25})`,
        filter: `saturate(${1 - uncertain * 0.6})`,
      }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(160deg,#fff,rgba(251,252,235,0.9))", opacity: 1 - active }} />
        <span style={{ position: "relative", fontSize: size * 0.17, fontWeight: 800, letterSpacing: "-0.02em",
          color: active > 0.5 ? COLORS.ivory : INK.strong, opacity: 1 - uncertain }}>{label}</span>
        <span style={{ position: "absolute", fontSize: size * 0.24, fontWeight: 800, color: COLORS.crimson, opacity: uncertain,
          transform: `translateY(${Math.sin(t * 3) * 3}px)` }}>?</span>
      </div>
    </div>
  );
};
