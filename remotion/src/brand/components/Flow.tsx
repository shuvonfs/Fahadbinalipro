/** FAHAD BRAND — framework nodes, flow rows and conceptual charts. */
import { lerp, p } from "../motion";
import { COLORS, INK } from "../tokens";
import { Icon, IconName } from "./Icon";
import { Card } from "./Primitives";

/** A framework node: optional icon + uppercase title (+ optional caption). */
export const Node: React.FC<{
  title: string; icon?: IconName; caption?: string; w?: number; h?: number; hot?: number; dim?: number; size?: number;
  style?: React.CSSProperties; dashed?: boolean;
}> = ({ title, icon, caption, w = 220, h = 110, hot = 0, dim = 0, size = 22, style, dashed }) => (
  <Card w={w} h={h} hot={hot} pad="14px 18px" style={{
    opacity: lerp(1, 0.38, dim), ...(dashed ? { border: `2px dashed ${INK.lineStrong}`, background: "transparent", boxShadow: "none" } : {}), ...style,
  }}>
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, textAlign: "center" }}>
      {icon ? <Icon name={icon} size={size * 1.7} color={hot > 0.5 ? COLORS.ivory : COLORS.burgundy} /> : null}
      <div style={{ fontSize: size, fontWeight: 800, letterSpacing: "0.06em", lineHeight: 1.15, textTransform: "uppercase" }}>{title}</div>
      {caption ? <div style={{ fontSize: size * 0.7, fontWeight: 600, opacity: 0.7 }}>{caption}</div> : null}
    </div>
  </Card>
);

/** Conceptual bar (relative height only — no axis numbers). Grows from the baseline. */
export const Bar: React.FC<{
  t: number; at: number; value: number; w?: number; maxH?: number; label: string; hot?: number; tag?: React.ReactNode; dur?: number;
}> = ({ t, at, value, w = 150, maxH = 440, label, hot = 0, tag, dur = 0.9 }) => {
  const k = p(t, at, dur);
  const h = Math.max(6, value * maxH * k);
  return (
    <div style={{ width: w, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ height: maxH + 70, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: 14 }}>
        <div style={{ opacity: p(t, at + dur * 0.6, 0.3), fontSize: 40, fontWeight: 800, color: COLORS.crimson }}>{tag}</div>
        <div style={{ width: w, height: h, borderRadius: "16px 16px 4px 4px",
          background: hot > 0.5 ? `linear-gradient(180deg, ${COLORS.crimson}, ${COLORS.burgundy})` : "linear-gradient(180deg, rgba(114,0,19,0.28), rgba(114,0,19,0.16))",
          boxShadow: hot > 0.5 ? "0 18px 40px rgba(114,0,19,0.25)" : "none" }} />
      </div>
      <div style={{ marginTop: 18, fontSize: 24, fontWeight: 800, letterSpacing: "0.14em", color: INK.strong }}>{label}</div>
    </div>
  );
};
