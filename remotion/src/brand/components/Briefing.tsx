/**
 * FAHAD BRAND — prompt / brief / chapter components (AI & strategy explainers).
 * All take global seconds `t` and cue times, so they can be re-timed to any voiceover.
 */
import { interpolate } from "remotion";
import { BACK, IN_OUT, lerp, OUT, p } from "../motion";
import { COLORS, INK, SURFACE, TYPE } from "../tokens";
import { Icon, IconName } from "./Icon";
import { Card, Rise } from "./Primitives";

/** Typewriter: the visible slice of `text` between `at` and `at + dur`. */
export const typed = (text: string, t: number, at: number, dur: number) =>
  text.slice(0, Math.floor(interpolate(t, [at, at + dur], [0, text.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));

export const Caret: React.FC<{ t: number; until: number; h?: number }> = ({ t, until, h = 40 }) => (
  <span style={{ display: "inline-block", width: 3, height: h, marginLeft: 4, verticalAlign: "-0.15em", background: COLORS.crimson,
    opacity: t < until ? (Math.floor(t * 2.4) % 2 === 0 ? 1 : 0) : 0 }} />
);

/** Prompt box: a chat-style input that types `text` (a quoted instruction to an AI). */
export const PromptBox: React.FC<{
  t: number; at: number; text: string; dur?: number; w?: number; size?: number; label?: string; extra?: { text: string; at: number }[]; dim?: number;
}> = ({ t, at, text, dur = 1.4, w = 760, size = 44, label = "PROMPT", extra = [], dim = 0 }) => (
  <div style={{ ...SURFACE.card, width: w, padding: "28px 36px 30px", boxSizing: "border-box", opacity: lerp(1, 0.45, dim), borderRadius: 28 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: COLORS.crimson }} />
      <span style={{ ...TYPE.label, fontSize: 18, color: COLORS.crimson }}>{label}</span>
      <div style={{ flex: 1, height: 2, background: INK.line }} />
    </div>
    <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.18, color: INK.strong, letterSpacing: "-0.01em" }}>
      {typed(text, t, at, dur)}
      {extra.length === 0 ? <Caret t={t} until={at + dur + 0.8} h={size} /> : null}
    </div>
    {extra.map((e, i) => (
      <div key={i} style={{ fontSize: size * 0.62, fontWeight: 600, color: INK.body, marginTop: 10, opacity: p(t, e.at, 0.2) }}>
        {typed(e.text, t, e.at, Math.min(1, e.text.length * 0.03))}
        {i === extra.length - 1 ? <Caret t={t} until={e.at + 1.4} h={size * 0.62} /> : null}
      </div>
    ))}
  </div>
);

/** An item that reveals on its own cue — a checked row inside a brief section. */
export type BriefItem = { text: string; at: number; strike?: number };

/** A section of a business brief: kicker + icon, items revealed one by one. */
export const BriefSection: React.FC<{
  t: number; at: number; kicker: string; icon: IconName; items: BriefItem[]; w?: number; hot?: number; size?: number; focus?: number;
}> = ({ t, at, kicker, icon, items, w = 520, hot = 0, size = 27, focus = 0 }) => (
  <Card w={w} hot={hot} pad="24px 28px" style={{ boxShadow: focus > 0 ? `0 26px 60px rgba(114,0,19,${0.1 + 0.12 * focus}), 0 0 0 ${3 * focus}px rgba(128,1,31,0.55)` : undefined }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, display: "grid", placeItems: "center", background: hot > 0.5 ? "rgba(251,252,235,0.15)" : "rgba(114,0,19,0.07)" }}>
        <Icon name={icon} size={30} color={hot > 0.5 ? COLORS.ivory : COLORS.burgundy} />
      </div>
      <Rise t={t} at={at}><span style={{ ...TYPE.label, fontSize: 20, color: hot > 0.5 ? COLORS.ivory : COLORS.crimson }}>{kicker}</span></Rise>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((it) => {
        const k = p(t, it.at, 0.45);
        const s = it.strike === undefined ? 0 : p(t, it.strike, 0.35, IN_OUT);
        return (
          <div key={it.text} style={{ display: "flex", alignItems: "center", gap: 12, opacity: k * lerp(1, 0.45, s), transform: `translateX(${(1 - k) * 24}px)` }}>
            <div style={{ width: 22, height: 22, borderRadius: 7, flex: "none", display: "grid", placeItems: "center",
              background: it.strike !== undefined ? "transparent" : hot > 0.5 ? COLORS.ivory : COLORS.crimson,
              border: it.strike !== undefined ? `2px solid ${INK.lineStrong}` : "none" }}>
              {it.strike === undefined ? (
                <svg width={14} height={14} viewBox="0 0 14 14"><path d="M3 7.5l2.6 2.6L11 4.6" fill="none" stroke={hot > 0.5 ? COLORS.burgundy : COLORS.ivory} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : null}
            </div>
            <span style={{ position: "relative", fontSize: size, fontWeight: 600, lineHeight: 1.2 }}>
              {it.text}
              <span style={{ position: "absolute", left: 0, top: "55%", height: 3, width: `${s * 100}%`, background: COLORS.crimson, borderRadius: 2 }} />
            </span>
          </div>
        );
      })}
    </div>
  </Card>
);

/** Small labelled icon tile (industry assets: student, visa, doctor, floor plan …). */
export const AssetTile: React.FC<{ icon: IconName; label: string; hot?: number; w?: number }> = ({ icon, label, hot = 0, w = 210 }) => (
  <Card w={w} hot={hot} pad="20px 16px">
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <Icon name={icon} size={52} color={hot > 0.5 ? COLORS.ivory : COLORS.burgundy} />
      <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center" }}>{label}</div>
    </div>
  </Card>
);

/** Chapter reveal: "EXAMPLE 01" + title, with a crimson rule wiping in. */
export const ChapterTitle: React.FC<{ t: number; at: number; index: string; title: string; size?: number }> = ({ t, at, index, title, size = 150 }) => {
  const wipe = p(t, at, 0.7, IN_OUT);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Rise t={t} at={at}><span style={{ ...TYPE.label, fontSize: 26, color: COLORS.crimson, letterSpacing: "0.4em" }}>Example {index}</span></Rise>
      <div style={{ width: 520 * wipe, height: 4, background: COLORS.crimson, margin: "22px 0 18px", borderRadius: 2 }} />
      <Rise t={t} at={at + 0.15} dur={0.7}><span style={{ ...TYPE.hero, fontSize: size, whiteSpace: "nowrap" }}>{title}</span></Rise>
    </div>
  );
};

/** Camera move: scales and pans the whole scene around a focus point (seconds-based keyframes). */
export const Camera: React.FC<{
  t: number; keys: { at: number; dur?: number; scale: number; x?: number; y?: number }[]; children: React.ReactNode;
}> = ({ t, keys, children }) => {
  let scale = 1, x = 0, y = 0;
  for (const k of keys) {
    const e = p(t, k.at, k.dur ?? 1.2, IN_OUT);
    scale = lerp(scale, k.scale, e);
    x = lerp(x, k.x ?? 0, e);
    y = lerp(y, k.y ?? 0, e);
  }
  return <div style={{ position: "absolute", inset: 0, transform: `translate(${x}px, ${y}px) scale(${scale})`, transformOrigin: "50% 50%" }}>{children}</div>;
};

/** Left→right clip reveal for key statements. */
export const Wipe: React.FC<{ t: number; at: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ t, at, dur = 0.7, children, style }) => {
  const k = p(t, at, dur, OUT);
  return <div style={{ clipPath: `inset(-20% ${(1 - k) * 100}% -20% 0)`, ...style }}>{children}</div>;
};

/** Generic AI output card (deliberately bland — "low context" output). */
export const OutputCard: React.FC<{ text: string; t: number; at: number; w?: number; tone?: "generic" | "polished" }> = ({ text, t, at, w = 360, tone = "generic" }) => {
  const k = p(t, at, 0.5, BACK);
  return (
    <div style={{ opacity: Math.min(1, p(t, at, 0.3)), transform: `translateY(${(1 - k) * 30}px) scale(${lerp(0.9, 1, k)})` }}>
      <Card w={w} pad="20px 24px" style={tone === "generic" ? { background: "rgba(255,255,255,0.55)", boxShadow: "none" } : undefined}>
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.18em", color: tone === "generic" ? INK.faint : COLORS.crimson, marginBottom: 8 }}>AD</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: tone === "generic" ? INK.muted : INK.strong, lineHeight: 1.2 }}>{text}</div>
      </Card>
    </div>
  );
};
