/**
 * FAHAD BRAND — conceptual product UI. Deliberately generic (no real logos, no official
 * screens): a search bar, a settings panel, an ad preview and a landing-page wireframe.
 */
import { interpolate } from "remotion";
import { lerp, p } from "../motion";
import { COLORS, INK } from "../tokens";
import { Icon, IconName } from "./Icon";
import { Card } from "./Primitives";

/** Search bar that types `query` between `at` and `at + typeDur`. */
export const SearchBar: React.FC<{ t: number; at: number; query: string; typeDur?: number; w?: number }> = ({ t, at, query, typeDur = 1.6, w = 1100 }) => {
  const n = Math.floor(interpolate(t, [at, at + typeDur], [0, query.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const caret = t < at + typeDur + 0.6 ? (Math.floor(t * 2.4) % 2 === 0 ? 1 : 0) : 0;
  return (
    <div style={{ width: w, height: 104, borderRadius: 999, background: "#fff", border: `2px solid ${INK.line}`,
      boxShadow: "0 24px 60px rgba(45,0,1,0.08)", display: "flex", alignItems: "center", gap: 22, padding: "0 40px", boxSizing: "border-box" }}>
      <Icon name="search" size={42} color={COLORS.crimson} stroke={2} />
      <div style={{ fontSize: 38, fontWeight: 600, color: INK.strong, whiteSpace: "nowrap" }}>
        {query.slice(0, n)}
        <span style={{ display: "inline-block", width: 3, height: 40, marginLeft: 4, verticalAlign: "-6px", background: COLORS.crimson, opacity: caret }} />
      </div>
    </div>
  );
};

/** Setting row for a generic campaign panel. */
export const SettingRow: React.FC<{ t: number; at: number; icon: IconName; label: string; kind: "slider" | "toggle" | "chips"; chips?: string[]; set?: number }> = ({ t, at, icon, label, kind, chips = [], set = 0.6 }) => {
  const k = p(t, at, 0.5);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, height: 74, borderTop: `2px solid ${INK.line}`, opacity: k, transform: `translateX(${(1 - k) * 30}px)` }}>
      <Icon name={icon} size={34} />
      <div style={{ width: 200, fontSize: 24, fontWeight: 800, letterSpacing: "0.08em", color: INK.strong }}>{label}</div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
        {kind === "slider" ? (
          <div style={{ flex: 1, height: 10, borderRadius: 10, background: "rgba(114,0,19,0.12)", position: "relative" }}>
            <div style={{ width: `${set * 100 * p(t, at + 0.15, 0.7)}%`, height: "100%", borderRadius: 10, background: COLORS.burgundy }} />
            <div style={{ position: "absolute", top: -9, left: `calc(${set * 100 * p(t, at + 0.15, 0.7)}% - 14px)`, width: 28, height: 28, borderRadius: "50%", background: "#fff", border: `3px solid ${COLORS.burgundy}` }} />
          </div>
        ) : kind === "toggle" ? (
          <div style={{ width: 76, height: 40, borderRadius: 40, background: `rgba(114,0,19,${lerp(0.15, 1, p(t, at + 0.2, 0.3))})`, position: "relative" }}>
            <div style={{ position: "absolute", top: 5, left: lerp(5, 41, p(t, at + 0.2, 0.3)), width: 30, height: 30, borderRadius: "50%", background: "#fff" }} />
          </div>
        ) : (
          chips.map((c, i) => (
            <div key={c} style={{ opacity: p(t, at + 0.1 + i * 0.08, 0.3), padding: "8px 16px", borderRadius: 999, border: `2px solid ${INK.line}`, fontSize: 19, fontWeight: 600, color: INK.body, background: "#fff" }}>{c}</div>
          ))
        )}
      </div>
    </div>
  );
};

/** Placeholder text lines (wireframe). */
export const Skeleton: React.FC<{ widths: number[]; h?: number; gap?: number; color?: string }> = ({ widths, h = 12, gap = 12, color = "rgba(114,0,19,0.13)" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap }}>
    {widths.map((w, i) => <div key={i} style={{ width: `${w}%`, height: h, borderRadius: h, background: color }} />)}
  </div>
);

/** Generic ad preview card (conceptual — "Sponsored" label, headline, description lines). */
export const AdPreview: React.FC<{ headline: string; w?: number; hot?: number }> = ({ headline, w = 400, hot = 0 }) => (
  <Card w={w} pad={26} hot={hot * 0}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.16em", color: COLORS.crimson }}>SPONSORED</div>
      <div style={{ flex: 1, height: 2, background: INK.line }} />
    </div>
    <div style={{ fontSize: 27, fontWeight: 800, color: INK.strong, lineHeight: 1.2, marginBottom: 14 }}>{headline}</div>
    <Skeleton widths={[100, 82, 60]} h={10} gap={10} />
  </Card>
);

/** Landing-page wireframe with hero image block, heading and CTA. */
export const PageWire: React.FC<{ title: string; w?: number; cta?: string }> = ({ title, w = 400, cta = "BOOK A VISIT" }) => (
  <Card w={w} pad={0}>
    <div style={{ height: 34, display: "flex", alignItems: "center", gap: 8, padding: "0 16px", borderBottom: `2px solid ${INK.line}` }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(114,0,19,0.18)" }} />)}
    </div>
    <div style={{ padding: 22 }}>
      <div style={{ height: 120, borderRadius: 14, background: "linear-gradient(135deg, rgba(114,0,19,0.16), rgba(128,1,31,0.05))", display: "grid", placeItems: "center", marginBottom: 16 }}>
        <Icon name="building" size={64} color={COLORS.burgundy} />
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: INK.strong, marginBottom: 12 }}>{title}</div>
      <Skeleton widths={[90, 70]} h={10} gap={9} />
      <div style={{ marginTop: 16, display: "inline-block", padding: "10px 20px", borderRadius: 999, background: COLORS.burgundy, color: COLORS.ivory, fontSize: 16, fontWeight: 800, letterSpacing: "0.12em" }}>{cta}</div>
    </div>
  </Card>
);
