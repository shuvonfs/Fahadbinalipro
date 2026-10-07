/**
 * LEAD AUTOMATION — 9:16 scenes.
 * Look: deep red/black set (house background from now on) + navy glass UI, glowing connectors and score cards
 * (blue reference), Playfair italic lead-ins + Montserrat headlines, glowing yellow on key words.
 * Layout rule: words live in the top zone (y ≈ 200–640) on a clean dark area; visuals live below — nothing overlaps text.
 */
import { random } from "remotion";
import { AppTile, Logo, Obj, Phone } from "../../brand/kinetic/Kinetic";
import { drawn, IN_OUT, lerp, OUT, p, useT } from "../../brand";
import { A } from "./data";

type S = React.FC<{ start: number }>;
const W = 1080;
export const GOLD = "#FFD54A";
const BLUE = "#5B9BFF";
const HOT = "#FF5B3A";
const SANS = `"Montserrat","Noto Sans Bengali",sans-serif`;
const SERIF = `"Playfair Display","Noto Sans Bengali",serif`;
const UI = `"Inter","Noto Sans Bengali",sans-serif`;
const glowGold = `0 0 16px rgba(255,213,74,0.75), 0 0 46px rgba(255,170,0,0.4)`;
const glowBlue = `0 0 16px rgba(91,155,255,0.8), 0 0 46px rgba(60,120,255,0.4)`;
const glowHot = `0 0 16px rgba(255,91,58,0.85), 0 0 46px rgba(255,60,30,0.45)`;

const count = (t: number, at: number, dur: number, a: number, b: number) => Math.round(lerp(a, b, p(t, at, dur, IN_OUT)));
const fmt = (n: number) => n.toLocaleString("en-US");

// ───────────── set ─────────────
const BG: React.FC<{ t: number; children: React.ReactNode }> = ({ t, children }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#070102" }}>
    <div style={{ position: "absolute", left: -320 + Math.sin(t * 0.35) * 60, top: 820 + Math.cos(t * 0.3) * 50, width: 1720, height: 1500,
      background: "radial-gradient(closest-side, rgba(226,12,36,0.9), rgba(140,0,20,0.55) 45%, rgba(40,0,6,0) 100%)" }} />
    <div style={{ position: "absolute", right: -420 + Math.cos(t * 0.4) * 50, top: -380, width: 1000, height: 1000, background: "radial-gradient(closest-side, rgba(200,10,30,0.45), transparent)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,0,1,0.88) 0%, rgba(6,0,1,0.55) 30%, rgba(6,0,1,0) 52%)" }} />
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 55%, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 58, textAlign: "center", fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: "0.34em", color: "rgba(255,255,255,0.8)" }}>FAHAD<span style={{ color: GOLD }}> •</span></div>
    {children}
  </div>
);

// ───────────── type ─────────────
type Kind = "serif" | "bold" | "glow" | "sglow" | "blue" | "hot" | "label";
type Wd = { w: string; at: number; k?: Kind };
const STYLE: Record<Kind, React.CSSProperties> = {
  serif: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, color: "rgba(255,255,255,0.92)" },
  bold: { fontFamily: SANS, fontWeight: 900, color: "#fff", textShadow: "0 0 26px rgba(255,255,255,0.18)", letterSpacing: "-0.01em" },
  glow: { fontFamily: SANS, fontWeight: 900, color: GOLD, textShadow: glowGold, letterSpacing: "-0.01em" },
  sglow: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, color: GOLD, textShadow: glowGold },
  blue: { fontFamily: SANS, fontWeight: 900, color: "#8DBBFF", textShadow: glowBlue },
  hot: { fontFamily: SANS, fontWeight: 900, color: HOT, textShadow: glowHot },
  label: { fontFamily: SANS, fontWeight: 800, color: GOLD, letterSpacing: "0.3em", textShadow: glowGold },
};
/** A line of words; each word rises out of a soft blur exactly when it is spoken. */
const Words: React.FC<{ t: number; words: Wd[]; size?: number; gap?: number }> = ({ t, words, size = 64, gap = 0.26 }) => (
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "baseline", columnGap: `${gap}em`, fontSize: size, lineHeight: 1.12 }}>
    {words.map((wd, i) => {
      const k = p(t, wd.at, 0.5, OUT);
      return <span key={i} style={{ display: "inline-block", whiteSpace: "nowrap", ...STYLE[wd.k ?? "bold"], opacity: k, transform: `translateY(${(1 - k) * 34}px)`, filter: `blur(${(1 - k) * 10}px)` }}>{wd.w}</span>;
    })}
  </div>
);
/** Split a phrase into words that all start at one time (convenience). */
const ph = (text: string, at: number, k: Kind = "bold", step = 0.09): Wd[] => text.split(" ").map((w, i) => ({ w, at: at + i * step, k }));
const Top: React.FC<{ children: React.ReactNode; top?: number }> = ({ children, top = 200 }) => (
  <div style={{ position: "absolute", left: 50, right: 50, top, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>{children}</div>
);

// ───────────── glass UI kit (blue reference) ─────────────
const Glass: React.FC<{ children: React.ReactNode; w?: number; style?: React.CSSProperties; glow?: string }> = ({ children, w = 900, style, glow = "rgba(70,120,255,0.28)" }) => (
  <div style={{ width: w, boxSizing: "border-box", padding: "28px 32px", borderRadius: 30, background: "linear-gradient(180deg, rgba(20,34,78,0.94), rgba(7,12,32,0.96))",
    border: "1px solid rgba(130,170,255,0.35)", boxShadow: `0 0 50px ${glow}, 0 40px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)`, fontFamily: UI, color: "#fff", ...style }}>{children}</div>
);
/** Appear: rise + de-blur (the one entrance used for every UI element — calm and consistent). */
const In: React.FC<{ t: number; at: number; x: number; y: number; children: React.ReactNode; dy?: number; dur?: number }> = ({ t, at, x, y, children, dy = 60, dur = 0.6 }) => {
  const k = p(t, at, dur, OUT);
  if (t < at - 0.02) return null;
  return <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) translateY(${(1 - k) * dy}px) scale(${lerp(0.94, 1, k)})`, opacity: k, filter: `blur(${(1 - k) * 12}px)` }}>{children}</div>;
};
const ICONS: Record<string, string> = {
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  clock: "M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0 M12 6v6l4 2",
  inbox: "M22 12h-6l-2 3h-4l-2-3H2 M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M23 21v-2a4 4 0 0 0-3-3.9 M16 3.1a4 4 0 0 1 0 7.8",
  search: "M11 11m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0 M21 21l-4.3-4.3",
  globe: "M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0 M2 12h20 M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  fire: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.3.3 1.1 1.4 2.8 2.5 2.8z",
  sun: "M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M6.3 17.7l-1.4 1.4 M19.1 4.9l-1.4 1.4",
  snow: "M12 2v20 M2 12h20 M5 5l14 14 M19 5 5 19 M9 3l3 3 3-3 M9 21l3-3 3 3",
  check: "M20 6 9 17l-5-5",
  chart: "M3 3v18h18 M7 14l4-4 4 4 5-6",
  form: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h8",
  db: "M12 5m-9 0a9 3 0 1 0 18 0a9 3 0 1 0 -18 0 M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5 M3 12c0 1.7 4 3 9 3s9-1.3 9-3",
  money: "M2 6h20v12H2z M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M6 12h.01 M18 12h.01",
};
const Ico: React.FC<{ n: string; size?: number; color?: string; sw?: number }> = ({ n, size = 34, color = "#fff", sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: "none" }}><path d={ICONS[n]} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Tile: React.FC<{ n: string; size?: number; color?: string; bg?: string }> = ({ n, size = 64, color = "#cfe0ff", bg = "rgba(90,140,255,0.16)" }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.28, background: bg, border: "1px solid rgba(140,180,255,0.3)", display: "grid", placeItems: "center", flex: "none" }}><Ico n={n} size={size * 0.52} color={color} /></div>
);
const Chip: React.FC<{ children: React.ReactNode; tone?: "gold" | "blue" | "hot" | "ok" | "dim"; size?: number }> = ({ children, tone = "blue", size = 24 }) => {
  const c = { gold: [GOLD, "rgba(255,213,74,0.14)", "rgba(255,213,74,0.55)"], blue: ["#cfe0ff", "rgba(91,155,255,0.16)", "rgba(91,155,255,0.5)"], hot: ["#fff", HOT, HOT],
    ok: ["#5CF0A0", "rgba(60,220,140,0.14)", "rgba(60,220,140,0.5)"], dim: ["rgba(255,255,255,0.7)", "rgba(255,255,255,0.08)", "rgba(255,255,255,0.18)"] }[tone];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", padding: `${size * 0.32}px ${size * 0.72}px`, borderRadius: 999, fontFamily: UI, fontWeight: 800, fontSize: size, color: c[0], background: c[1], border: `1px solid ${c[2]}`, boxShadow: tone === "gold" ? `0 0 24px rgba(255,213,74,0.3)` : tone === "hot" ? `0 0 26px ${HOT}88` : undefined }}>{children}</span>;
};
/** Glowing connector with a travelling pulse. */
const Link: React.FC<{ t: number; at: number; d: string; color?: string; dur?: number }> = ({ t, at, d, color = BLUE, dur = 0.6 }) => {
  const dd = drawn(d, t, at, dur);
  return (
    <svg width={W} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <path d={d} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeDasharray={dd.strokeDasharray} strokeDashoffset={dd.strokeDashoffset} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      {t > at + dur ? <path d={d} fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeDasharray="6 60" strokeDashoffset={-(t - at) * 160} style={{ filter: `drop-shadow(0 0 6px #fff)` }} /> : null}
    </svg>
  );
};
const Avatar: React.FC<{ l: string; size?: number; c?: string }> = ({ l, size = 64, c = "#3b5bdb" }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg, ${c}, #0d1530)`, display: "grid", placeItems: "center", fontFamily: UI, fontWeight: 800, fontSize: size * 0.42, color: "#fff", border: "2px solid rgba(255,255,255,0.25)", flex: "none" }}>{l}</div>
);
const Bubble: React.FC<{ t: number; at: number; me?: boolean; children: React.ReactNode; time?: string; ticks?: number }> = ({ t, at, me, children, time, ticks }) => {
  const k = p(t, at, 0.35, OUT);
  if (t < at) return null;
  return (
    <div style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start", margin: "10px 0", opacity: k, transform: `translateY(${(1 - k) * 20}px) scale(${lerp(0.9, 1, k)})`, transformOrigin: me ? "right" : "left" }}>
      <div style={{ maxWidth: "82%", padding: "12px 16px 8px", borderRadius: 18, background: me ? "#005C4B" : "#202C33", color: "#e9edef", fontSize: 21, lineHeight: 1.35, fontFamily: UI }}>
        {children}
        {time ? <div style={{ textAlign: "right", fontSize: 14, opacity: 0.7, marginTop: 4 }}>{time}{ticks !== undefined ? <span style={{ color: ticks > 0.5 ? "#53BDEB" : "#aaa", marginLeft: 6 }}>✓✓</span> : null}</div> : null}
      </div>
    </div>
  );
};

// ═════════════ scenes ═════════════

// 0.0 — "একজন customer রাত ১১টায় আপনার ad দেখে form পূরণ করল।"
export const S01: S = ({ start }) => {
  const t = useT(start);
  const sheet = p(t, 1.5, 0.6, OUT);
  const sent = t >= 3.3;
  const fields = [["Full name", "Rahim Uddin", 1.9], ["Phone", "+880 17XX-XXXXXX", 2.3], ["What do you need?", "Lead generation", 2.7]] as const;
  return (
    <BG t={t}>
      <Top>
        <Words t={t} size={58} words={ph("A customer saw your ad at", 0.1, "serif", 0.07)} />
        <Words t={t} size={120} words={[{ w: "11:00 PM", at: A.night, k: "glow" }]} />
      </Top>
      <In t={t} at={0.05} x={350} y={1230} dy={120}>
        <div style={{ transform: "perspective(1800px) rotateY(12deg) rotateX(4deg)" }}>
          <Phone w={420}>
            <div style={{ position: "absolute", inset: 0, background: "#f0f2f5", fontFamily: UI }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 26px 0", fontSize: 17, fontWeight: 700, color: "#111" }}><span>11:00 PM</span><span>🌙</span></div>
              <div style={{ margin: "22px 14px", borderRadius: 16, background: "#fff", padding: 14, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Avatar l="B" size={40} c="#c2185b" /><div><div style={{ fontWeight: 800, fontSize: 16, color: "#111" }}>Your Business</div><div style={{ fontSize: 13, color: "#65676b" }}>Sponsored · <Logo name="meta" size={12} /></div></div></div>
                <div style={{ marginTop: 12, height: 250, borderRadius: 10, background: "linear-gradient(135deg,#3a0610,#b3122b)", display: "grid", placeItems: "center", color: "#fff", fontFamily: SANS, fontWeight: 900, fontSize: 30, textAlign: "center" }}>Get a free<br />consultation</div>
                <div style={{ marginTop: 10, height: 46, borderRadius: 8, background: "#1877F2", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 17 }}>Sign up</div>
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 560, borderRadius: "24px 24px 0 0", background: "#fff", boxShadow: "0 -10px 30px rgba(0,0,0,0.2)", padding: "22px 22px", transform: `translateY(${(1 - sheet) * 100}%)` }}>
                <div style={{ fontWeight: 800, fontSize: 20, color: "#111", marginBottom: 14 }}>Contact information</div>
                {fields.map(([k, v, at]) => (
                  <div key={k} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 13, color: "#65676b", fontWeight: 700, marginBottom: 5 }}>{k}</div>
                    <div style={{ height: 50, borderRadius: 10, border: `2px solid ${t > at && t < at + 0.4 ? "#1877F2" : "#dddfe2"}`, display: "flex", alignItems: "center", padding: "0 12px", fontSize: 17, color: "#111" }}>{v.slice(0, Math.max(0, Math.floor((t - at) * 40)))}</div>
                  </div>
                ))}
                <div style={{ marginTop: 14, height: 58, borderRadius: 12, background: sent ? "#1f9d55" : "#1877F2", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 19 }}>{sent ? "✓ Submitted" : "Submit"}</div>
              </div>
            </div>
          </Phone>
        </div>
      </In>
      <In t={t} at={1.0} x={830} y={900}><Glass w={380} style={{ padding: "20px 24px" }}><div style={{ fontSize: 16, opacity: 0.6, fontWeight: 700, letterSpacing: "0.12em" }}>LEAD SOURCE</div><div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}><Logo name="meta" size={40} /><span style={{ fontSize: 24, fontWeight: 800 }}>Meta Lead Ad</span></div></Glass></In>
      <In t={t} at={1.3} x={830} y={1090}><Glass w={380} style={{ padding: "20px 24px" }}><div style={{ fontSize: 16, opacity: 0.6, fontWeight: 700, letterSpacing: "0.12em" }}>OR</div><div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}><Logo name="googleads" size={40} /><span style={{ fontSize: 24, fontWeight: 800 }}>Google Lead Form</span></div></Glass></In>
      <In t={t} at={3.35} x={830} y={1300}><Chip tone="ok" size={26}>✓ New lead · 11:00 PM</Chip></In>
    </BG>
  );
};

// 3.75 — "আপনার team তাকে ফোন দিল পরদিন সকাল ১১টায়।"
export const S02: S = ({ start }) => {
  const t = useT(start);
  const sweep = p(t, 4.5, 1.6, IN_OUT);
  const hourA = 330 + sweep * 360, minA = sweep * 360 * 12;
  return (
    <BG t={t}>
      <Top top={220}>
        <Words t={t} size={58} words={ph("Your team called back", 3.9, "serif", 0.08)} />
        <Words t={t} size={92} words={[{ w: "next day,", at: A.nextDay, k: "bold" }, { w: "11:00 AM", at: A.morning, k: "glow" }]} />
      </Top>
      <In t={t} at={3.85} x={540} y={1170} dy={80}>
        <div style={{ position: "relative", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle at 50% 40%, rgba(30,48,110,0.95), rgba(6,10,28,0.98))", border: "2px solid rgba(130,170,255,0.45)", boxShadow: `0 0 80px rgba(70,120,255,0.35), inset 0 0 60px rgba(0,0,0,0.6)` }}>
          <svg width={560} height={560} style={{ position: "absolute", inset: 0 }}>
            {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <line key={i} x1={280 + Math.sin(a) * 236} y1={280 - Math.cos(a) * 236} x2={280 + Math.sin(a) * 210} y2={280 - Math.cos(a) * 210} stroke="rgba(200,220,255,0.7)" strokeWidth={i % 3 ? 3 : 7} strokeLinecap="round" />; })}
            <line x1={280} y1={280} x2={280 + Math.sin((minA * Math.PI) / 180) * 190} y2={280 - Math.cos((minA * Math.PI) / 180) * 190} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
            <line x1={280} y1={280} x2={280 + Math.sin((hourA * Math.PI) / 180) * 130} y2={280 - Math.cos((hourA * Math.PI) / 180) * 130} stroke={GOLD} strokeWidth={14} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 10px ${GOLD})` }} />
            <circle cx={280} cy={280} r={14} fill={GOLD} />
          </svg>
        </div>
      </In>
      <In t={t} at={5.9} x={540} y={1560}><Chip tone="gold" size={34}>+12 hours later</Chip></In>
    </BG>
  );
};

// 6.55 — "ততক্ষণে সে কী করেছে, জানেন?"
export const S03: S = ({ start }) => {
  const t = useT(start);
  const k = p(t, 7.0, 0.8, OUT);
  return (
    <BG t={t}>
      <Top top={240}>
        <Words t={t} size={62} words={ph("By then…", 6.7, "serif")} />
        <Words t={t} size={92} words={[...ph("what did", 7.15), { w: "he do?", at: 7.45, k: "glow" }]} />
      </Top>
      <div style={{ position: "absolute", left: 540, top: 1180, width: 560, height: 560, transform: `translate(-50%,-50%) rotate(${t * 30}deg)`, borderRadius: "50%", border: "2px dashed rgba(255,213,74,0.45)", opacity: k }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 880, textAlign: "center", fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 520, lineHeight: 1, color: GOLD, textShadow: glowGold, opacity: k, transform: `scale(${lerp(1.3, 1, k)})`, filter: `blur(${(1 - k) * 16}px)` }}>?</div>
    </BG>
  );
};

// 8.6 — "যে মানুষটা রাতে form পূরণ করেছে, সে তখনই solution খুঁজছিল।"
export const S04: S = ({ start }) => {
  const t = useT(start);
  const q = "best lead generation agency";
  const n = Math.max(0, Math.min(q.length, Math.floor((t - 9.3) * 22)));
  return (
    <BG t={t}>
      <Top top={220}>
        <Words t={t} size={58} words={ph("At 11 PM he wasn't browsing —", 8.8, "serif", 0.1)} />
        <Words t={t} size={88} words={[...ph("he needed", 10.4), { w: "a solution", at: A.solution, k: "glow" }]} />
      </Top>
      <In t={t} at={8.75} x={540} y={900}>
        <Glass w={940} style={{ padding: "22px 28px", borderRadius: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}><Ico n="search" size={40} color="#cfe0ff" /><span style={{ fontSize: 34, fontWeight: 600 }}>{q.slice(0, n)}<span style={{ opacity: Math.floor(t * 3) % 2 }}>|</span></span></div>
        </Glass>
      </In>
      {[["Sponsored", "Agency A — Free strategy call"], ["Sponsored", "Agency B — Get more leads"], ["", "Top 10 lead gen agencies 2026"]].map(([tag, title], i) => (
        <In key={title} t={t} at={10.7 + i * 0.3} x={540} y={1110 + i * 175}>
          <Glass w={940} style={{ padding: "22px 30px" }}>
            {tag ? <div style={{ fontSize: 18, fontWeight: 800, color: GOLD }}>{tag}</div> : null}
            <div style={{ fontSize: 30, fontWeight: 800, color: "#9cc2ff", marginTop: 4 }}>{title}</div>
          </Glass>
        </In>
      ))}
    </BG>
  );
};

// 12.2 — "হয়তো একই রাতে আরও দুই-তিনটা company-তেও form submit করেছে।"
export const S05: S = ({ start }) => {
  const t = useT(start);
  const cos = [{ n: "Company A", c: "#7048e8", at: 13.75 }, { n: "Company B", c: "#1c7ed6", at: 14.15 }, { n: "Company C", c: "#0ca678", at: 14.6 }];
  return (
    <BG t={t}>
      <Top top={220}>
        <Words t={t} size={58} words={ph("Same night, he also filled forms at", 12.35, "serif", 0.08)} />
        <Words t={t} size={92} words={[{ w: "2–3 other", at: A.twoThree, k: "glow" }, { w: "companies", at: A.company, k: "glow" }]} />
      </Top>
      {cos.map((c, i) => (
        <In key={c.n} t={t} at={c.at} x={540} y={930 + i * 250}>
          <Glass w={880}>
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <Avatar l={c.n.slice(-1)} size={84} c={c.c} />
              <div><div style={{ fontSize: 32, fontWeight: 800 }}>{c.n}</div><div style={{ fontSize: 22, opacity: 0.6, marginTop: 4 }}>Lead form · 11:0{i + 3} PM</div></div>
              <span style={{ marginLeft: "auto" }}><Chip tone="ok">✓ Submitted</Chip></span>
            </div>
          </Glass>
        </In>
      ))}
    </BG>
  );
};

// 15.6 — "যে আগে উত্তর দেবে, customer তার সাথেই কথা বলবে।"
export const S06: S = ({ start }) => {
  const t = useT(start);
  const rows = [{ n: "Company B", time: "2 min", w: 0.08, win: true }, { n: "Company C", time: "3 hours", w: 0.42 }, { n: "You", time: "12 hours", w: 1 }];
  return (
    <BG t={t}>
      <Top top={220}>
        <Words t={t} size={60} words={ph("Whoever replies", 15.8, "serif")} />
        <Words t={t} size={130} words={[{ w: "FIRST", at: A.first, k: "glow" }]} />
        <Words t={t} size={60} words={ph("gets the conversation", 17.1, "bold", 0.1)} />
      </Top>
      <In t={t} at={15.75} x={540} y={1230}>
        <Glass w={940}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.16em", opacity: 0.6, marginBottom: 10 }}>TIME TO FIRST REPLY</div>
          {rows.map((r, i) => {
            const k = p(t, 16.4 + i * 0.25, 0.9, OUT);
            return (
              <div key={r.n} style={{ padding: "18px 0", borderTop: i ? "1px solid rgba(255,255,255,0.08)" : undefined }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <span style={{ fontSize: 28, fontWeight: 800 }}>{r.n}</span>
                  {r.win && t > 17.2 ? <Chip tone="gold" size={20}>★ Won the call</Chip> : null}
                  <span style={{ marginLeft: "auto", fontSize: 26, fontWeight: 800, color: r.win ? GOLD : i === 2 ? "#ff8a8a" : "#cfe0ff" }}>{r.time}</span>
                </div>
                <div style={{ height: 18, borderRadius: 9, background: "rgba(255,255,255,0.08)" }}>
                  <div style={{ width: `${Math.max(3, r.w * 100 * k)}%`, height: "100%", borderRadius: 9, background: r.win ? GOLD : i === 2 ? "#ff5b5b" : BLUE, boxShadow: r.win ? `0 0 18px ${GOLD}` : undefined }} />
                </div>
              </div>
            );
          })}
        </Glass>
      </In>
    </BG>
  );
};

// 18.55 — "আর আপনি যখন ফোন দিচ্ছেন, সে হয়তো মনেও করতে পারছে না আপনার কাছে কী জানতে চেয়েছিল।"
export const S07: S = ({ start }) => {
  const t = useT(start);
  const live = t > 19.9;
  const secs = Math.max(0, Math.floor(t - 19.9));
  return (
    <BG t={t}>
      <Top top={210}>
        <Words t={t} size={58} words={ph("When you finally call,", 18.75, "serif")} />
        <Words t={t} size={80} words={ph("he doesn't even", 20.5)} />
        <Words t={t} size={80} words={[{ w: "remember you.", at: 21.3, k: "glow" }]} />
      </Top>
      <In t={t} at={18.7} x={540} y={1230}>
        <Glass w={760} style={{ textAlign: "center", padding: "36px 36px 30px" }}>
          <Avatar l="R" size={130} c="#c2185b" />
          <div style={{ fontSize: 36, fontWeight: 800, marginTop: 18 }}>Rahim Uddin</div>
          <div style={{ fontSize: 24, opacity: 0.65, marginTop: 6 }}>{live ? `00:0${Math.min(9, secs)}` : "Calling…"}</div>
          <div style={{ textAlign: "left", marginTop: 26 }}>
            <Bubble t={t} at={20.0} me>Hi Rahim, calling about your enquiry yesterday…</Bubble>
            <Bubble t={t} at={21.4}>Sorry… which company is this? 🤔</Bubble>
          </div>
        </Glass>
      </In>
    </BG>
  );
};

// 23.3 — HBR: "১২ লাখের বেশি lead research করা হয়েছিল।"
export const S08: S = ({ start }) => {
  const t = useT(start);
  const n = count(t, A.million - 0.1, 1.4, 0, 1200000);
  return (
    <BG t={t}>
      <Top top={220}>
        <Words t={t} size={60} words={ph("A Harvard Business Review", A.hbr, "serif", 0.12)} />
        <Words t={t} size={72} words={ph("study analysed", A.research - 0.1, "bold", 0.12)} />
      </Top>
      <In t={t} at={A.million - 0.2} x={540} y={830}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 150, color: GOLD, textShadow: glowGold, lineHeight: 1 }}>{fmt(n)}+</div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 40, letterSpacing: "0.3em", color: "#fff", marginTop: 14 }}>LEADS</div>
        </div>
      </In>
      <div style={{ position: "absolute", left: 90, top: 1060, width: 900, display: "grid", gridTemplateColumns: "repeat(20, 1fr)", rowGap: 18 }}>
        {Array.from({ length: 220 }, (_, i) => {
          const at = A.million + random(`d${i}`) * 1.6;
          const k = p(t, at, 0.3);
          return <div key={i} style={{ display: "grid", placeItems: "center" }}><div style={{ width: 16, height: 16, borderRadius: 8, background: i % 9 === 0 ? GOLD : BLUE, opacity: k * (i % 9 === 0 ? 1 : 0.75), boxShadow: `0 0 10px ${i % 9 === 0 ? GOLD : BLUE}`, transform: `scale(${lerp(0.2, 1, k)})` }} /></div>;
        })}
      </div>
      <In t={t} at={27.2} x={540} y={1690}><Chip tone="dim" size={22}>Source: Harvard Business Review, “The Short Life of Online Sales Leads”</Chip></In>
    </BG>
  );
};

/** Vertical comparison bars (the research charts). */
const Bars: React.FC<{ t: number; bars: { label: string; h: number; at: number; tone: "gold" | "dim" | "hot"; value: string; vAt: number }[] }> = ({ t, bars }) => (
  <Glass w={900} style={{ padding: "34px 40px 28px" }}>
    <div style={{ height: 620, display: "flex", alignItems: "flex-end", justifyContent: "space-around", borderBottom: "2px solid rgba(255,255,255,0.2)" }}>
      {bars.map((b) => {
        const k = p(t, b.at, 1.0, OUT);
        const col = b.tone === "gold" ? GOLD : b.tone === "hot" ? HOT : "rgba(200,215,255,0.45)";
        return (
          <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 260 }}>
            <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 64, color: col, textShadow: b.tone === "dim" ? undefined : b.tone === "gold" ? glowGold : glowHot, opacity: p(t, b.vAt, 0.4), marginBottom: 14 }}>{b.value}</div>
            <div style={{ width: 170, height: Math.max(6, b.h * k), borderRadius: "18px 18px 0 0", background: b.tone === "dim" ? col : `linear-gradient(180deg, ${col}, ${b.tone === "gold" ? "#b8860b" : "#8a1a0a"})`, boxShadow: b.tone === "dim" ? undefined : `0 0 40px ${col}88` }} />
          </div>
        );
      })}
    </div>
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: 18 }}>
      {bars.map((b) => <div key={b.label} style={{ width: 260, textAlign: "center", fontSize: 26, fontWeight: 800, opacity: 0.85 }}>{b.label}</div>)}
    </div>
  </Glass>
);

// 28.1 — "যারা lead আসার এক ঘণ্টার মধ্যে contact করেছে ... প্রায় ৭ গুণ বেশি।"
export const S09: S = ({ start }) => {
  const t = useT(start);
  const x = count(t, A.seven - 0.3, 0.6, 1, 7);
  return (
    <BG t={t}>
      <Top top={210}>
        <Words t={t} size={58} words={ph("Leads contacted within", 28.35, "serif", 0.1)} />
        <Words t={t} size={110} words={[{ w: "1 HOUR", at: A.hour, k: "glow" }]} />
        <Words t={t} size={50} words={ph("were nearly 7× more likely to qualify", 31.6, "bold", 0.13)} />
      </Top>
      <In t={t} at={30.3} x={540} y={1240}>
        <Bars t={t} bars={[{ label: "Within 1 hour", h: 440, at: 33.0, tone: "gold", value: `${x}×`, vAt: A.seven - 0.3 }, { label: "After 1 hour", h: 63, at: 32.6, tone: "dim", value: "1×", vAt: 33.2 }]} />
      </In>
    </BG>
  );
};

// 35.55 — "আর ২৪ ঘণ্টা পরে contact করলে সেই সম্ভাবনা ৬০ গুণেরও বেশি কমে যায়।"
export const S10: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={220}>
        <Words t={t} size={58} words={ph("Wait", 35.7, "serif")} />
        <Words t={t} size={110} words={[{ w: "24 HOURS", at: A.day, k: "hot" }]} />
        <Words t={t} size={52} words={[...ph("and your odds drop", 37.5, "bold", 0.1), { w: "60×", at: A.sixty, k: "glow" }]} />
      </Top>
      <In t={t} at={35.7} x={540} y={1240}>
        <Bars t={t} bars={[{ label: "Within 1 hour", h: 440, at: 35.8, tone: "gold", value: "60×", vAt: 35.9 }, { label: "After 24 hours", h: 8, at: 38.6, tone: "hot", value: "1×", vAt: A.drop }]} />
      </In>
    </BG>
  );
};

// 39.75 — "অথচ একই Lead-এ কিছু companies গড়ে reply দিতে সময় নিয়েছিল ৪২ ঘণ্টা।"
export const S11: S = ({ start }) => {
  const t = useT(start);
  const sec = Math.round(lerp(0, 42 * 3600, p(t, 40.6, 2.8, (x) => x * x)));
  const hh = String(Math.floor(sec / 3600)).padStart(2, "0"), mm = String(Math.floor((sec % 3600) / 60)).padStart(2, "0"), ss = String(sec % 60).padStart(2, "0");
  const done = t >= A.fortyTwo;
  return (
    <BG t={t}>
      <Top top={220}>
        <Words t={t} size={58} words={ph("Yet the average company took", 39.9, "serif", 0.1)} />
        <Words t={t} size={120} words={[{ w: "42 HOURS", at: A.fortyTwo, k: "glow" }]} />
        <Words t={t} size={50} words={ph("to reply to a lead", 42.1, "bold", 0.1)} />
      </Top>
      <In t={t} at={40.0} x={540} y={1180}>
        <Glass w={900} style={{ textAlign: "center", padding: "40px 30px" }} glow={done ? "rgba(255,213,74,0.35)" : undefined}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14 }}><Ico n="clock" size={40} color="#cfe0ff" /><span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.16em", opacity: 0.7 }}>AVERAGE RESPONSE TIME</span></div>
          <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 130, marginTop: 20, color: done ? GOLD : "#fff", textShadow: done ? glowGold : glowBlue }}>{hh}:{mm}:{ss}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
            {["Day 1", "Day 2"].map((d, i) => <div key={d} style={{ flex: 1 }}><div style={{ height: 14, borderRadius: 7, background: "rgba(255,255,255,0.1)" }}><div style={{ height: "100%", borderRadius: 7, width: `${Math.min(1, Math.max(0, sec / 86400 - i)) * 100}%`, background: i ? HOT : BLUE }} /></div><div style={{ fontSize: 20, opacity: 0.6, marginTop: 8 }}>{d}</div></div>)}
          </div>
        </Glass>
      </In>
    </BG>
  );
};

// 44.45 — "এই সমস্যার জন্য আমি একটা automation system বানাই। কাজ করে এভাবে—"
export const S12: S = ({ start }) => {
  const t = useT(start);
  const src = [{ l: "Meta lead ads", logo: "meta" as const, y: 930 }, { l: "Google lead form", logo: "googleads" as const, y: 1120 }, { l: "Website form", y: 1310 }];
  const out = [{ l: "WhatsApp", x: 200 }, { l: "Lead score", x: 540 }, { l: "Sales team", x: 880 }];
  return (
    <BG t={t}>
      <Top top={220}>
        <Words t={t} size={58} words={ph("So I build an", 44.6, "serif")} />
        <Words t={t} size={88} words={[{ w: "AUTOMATION", at: A.automation, k: "glow" }, { w: "SYSTEM", at: 46.4, k: "bold" }]} />
        <Words t={t} size={48} words={ph("Here's how it works", A.how, "serif", 0.1)} />
      </Top>
      {src.map((s, i) => <Link key={s.l} t={t} at={45.6 + i * 0.15} d={`M 480 ${s.y} C 600 ${s.y}, 640 1120, 760 1120`} />)}
      {src.map((s, i) => (
        <In key={s.l} t={t} at={44.7 + i * 0.2} x={270} y={s.y}>
          <Glass w={410} style={{ padding: "18px 22px" }}><div style={{ display: "flex", alignItems: "center", gap: 14 }}>{s.logo ? <div style={{ width: 54, height: 54, borderRadius: 14, background: "#fff", display: "grid", placeItems: "center" }}><Logo name={s.logo} size={34} /></div> : <Tile n="globe" size={54} />}<span style={{ fontSize: 26, fontWeight: 800 }}>{s.l}</span></div></Glass>
        </In>
      ))}
      <In t={t} at={A.automation} x={870} y={1120}>
        <div style={{ width: 210, height: 210, borderRadius: "50%", display: "grid", placeItems: "center", background: "radial-gradient(circle, rgba(255,213,74,0.35), rgba(30,40,90,0.95) 70%)", border: `3px solid ${GOLD}`, boxShadow: `0 0 ${50 + Math.sin(t * 5) * 14}px ${GOLD}aa` }}>
          <div style={{ textAlign: "center" }}><Ico n="bolt" size={74} color={GOLD} sw={2.4} /><div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 20, color: "#fff", letterSpacing: "0.1em" }}>AUTOMATION</div></div>
        </div>
      </In>
      {out.map((o, i) => <Link key={o.l} t={t} at={A.how + i * 0.12} color={GOLD} d={`M 870 1230 C 870 1400, ${o.x} 1420, ${o.x} 1530`} />)}
      {out.map((o, i) => <In key={o.l} t={t} at={A.how + 0.3 + i * 0.15} x={o.x} y={1580}><Chip tone="gold" size={26}>{o.l}</Chip></In>)}
    </BG>
  );
};

/** WhatsApp chat on a phone (steps 1 & the reply). */
const WhatsApp: React.FC<{ t: number; msgAt: number; readAt: number; replyAt?: number; nameAt: number }> = ({ t, msgAt, readAt, replyAt, nameAt }) => (
  <Phone w={430}>
    <div style={{ position: "absolute", inset: 0, background: "#0B141A", fontFamily: UI }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "52px 16px 14px", background: "#1F2C34", color: "#e9edef" }}>
        <Avatar l="R" size={46} c="#c2185b" /><div><div style={{ fontWeight: 800, fontSize: 19 }}>Rahim Uddin</div><div style={{ fontSize: 13, opacity: 0.6 }}>New lead · Meta form</div></div>
        <span style={{ marginLeft: "auto" }}><Logo name="whatsapp" size={30} /></span>
      </div>
      <div style={{ padding: "16px 14px" }}>
        <div style={{ textAlign: "center", margin: "6px 0 10px" }}><span style={{ fontSize: 13, padding: "5px 12px", borderRadius: 8, background: "#182229", color: "#8696a0" }}>FRIDAY · 11:00 PM</span></div>
        <Bubble t={t} at={msgAt} me time="11:00 PM" ticks={p(t, readAt, 0.2)}>
          Hi <span style={{ color: t > nameAt ? GOLD : "#e9edef", fontWeight: 800, textShadow: t > nameAt ? glowGold : undefined }}>Rahim</span> 👋 thanks for your interest in our <b>free consultation</b>. Our specialist will call you — what time suits you best tomorrow?
        </Bubble>
        {replyAt !== undefined ? <Bubble t={t} at={replyAt} time="11:02 PM">Thanks for the quick reply! Call me at 10 AM 🙏</Bubble> : null}
      </div>
    </div>
  </Phone>
);

// 48.25 — "এক। Lead আসার সাথে সাথেই, রাত হোক বা ছুটির দিন, customer-এর WhatsApp-এ একটা personalised message চলে যায়।"
export const S13: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={190}>
        <Words t={t} size={34} words={[{ w: "STEP 01", at: A.one, k: "label" }]} />
        <Words t={t} size={84} words={[{ w: "Instant reply", at: A.instant, k: "bold" }]} />
        <Words t={t} size={52} words={[...ph("night or holiday — on", 50.3, "serif", 0.12), { w: "WhatsApp", at: A.whatsapp, k: "sglow" }]} />
      </Top>
      <In t={t} at={48.4} x={540} y={1230} dy={100}><WhatsApp t={t} msgAt={52.3} readAt={99} nameAt={A.personal} /></In>
      <In t={t} at={49.6} x={170} y={850}><Chip tone="blue" size={22}>🔔 New lead</Chip></In>
      <In t={t} at={50.6} x={905} y={850}><Chip tone="dim" size={22}>🌙 Night · Holiday</Chip></In>
      <In t={t} at={52.9} x={540} y={1720}><Chip tone="gold" size={28}>⚡ Sent within seconds · personalised</Chip></In>
    </BG>
  );
};

// 54.25 — "সে বুঝতে পারে—তার কথা শোনা হয়েছে।"
export const S14: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={230}>
        <Words t={t} size={62} words={ph("He knows", 54.4, "serif")} />
        <Words t={t} size={96} words={[{ w: "he's been heard.", at: A.heard, k: "glow" }]} />
      </Top>
      <div style={{ position: "absolute", left: 540, top: 1200, transform: "translate(-50%,-50%)" }}><WhatsApp t={t} msgAt={0} readAt={54.6} replyAt={55.6} nameAt={0} /></div>
      <In t={t} at={54.7} x={905} y={850}><Chip tone="ok" size={22}>✓✓ Seen</Chip></In>
    </BG>
  );
};

// 56.55 — "দুই। Form submit-এর উত্তর দেখে system নিজেই lead-কে ভাগ করে—"
export const S15: S = ({ start }) => {
  const t = useT(start);
  const score = count(t, 58.7, 1.1, 0, 92);
  const ans = [["Budget", "৳5 lakh+"], ["Timeline", "This week"], ["Decision maker", "Yes"]];
  const C = 2 * Math.PI * 120;
  return (
    <BG t={t}>
      <Top top={190}>
        <Words t={t} size={34} words={[{ w: "STEP 02", at: A.two, k: "label" }]} />
        <Words t={t} size={70} words={ph("Form answers →", 57.4, "bold", 0.12)} />
        <Words t={t} size={84} words={[{ w: "auto lead score", at: A.segment - 0.2, k: "glow" }]} />
      </Top>
      {/* parallax score cards (blue reference), kept below the text zone */}
      {Array.from({ length: 9 }, (_, i) => {
        const depth = [0.5, 0.8, 1][i % 3];
        const x = ((i * 260 + (t - 56.5) * 70 * depth) % 1400) - 160;
        const v = 20 + Math.round(random(`s${i}`) * 75);
        return <div key={i} style={{ position: "absolute", left: x, top: 1460 + (i % 3) * 110, transform: `scale(${depth})`, filter: `blur(${(1 - depth) * 8}px)`, opacity: 0.35 + depth * 0.5 * p(t, 56.7, 0.5) }}>
          <Glass w={250} style={{ padding: "14px 18px", borderRadius: 18 }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><Ico n="user" size={26} color="#cfe0ff" /><span style={{ fontSize: 28, fontWeight: 800 }}>{v}/100</span></div></Glass>
        </div>;
      })}
      <In t={t} at={57.5} x={290} y={1040}>
        <Glass w={480} style={{ padding: "24px 26px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}><Tile n="form" size={48} /><span style={{ fontSize: 24, fontWeight: 800 }}>Form answers</span></div>
          {ans.map(([k, v], i) => (
            <div key={k} style={{ padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.08)", opacity: p(t, A.answers + i * 0.25, 0.3) }}>
              <div style={{ fontSize: 17, opacity: 0.6 }}>{k}</div><div style={{ fontSize: 26, fontWeight: 800, color: t > A.answers + i * 0.25 + 0.4 ? GOLD : "#fff" }}>{v}</div>
            </div>
          ))}
        </Glass>
      </In>
      <Link t={t} at={58.4} color={GOLD} d="M 540 1040 L 650 1040" dur={0.3} />
      <In t={t} at={58.5} x={820} y={1040}>
        <div style={{ position: "relative", width: 300, height: 300 }}>
          <svg width={300} height={300} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
            <circle cx={150} cy={150} r={120} fill="rgba(8,14,36,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth={18} />
            <circle cx={150} cy={150} r={120} fill="none" stroke={GOLD} strokeWidth={18} strokeLinecap="round" strokeDasharray={`${(C * score) / 100} ${C}`} style={{ filter: `drop-shadow(0 0 10px ${GOLD})` }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}><div><div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 84, color: GOLD, textShadow: glowGold, lineHeight: 1 }}>{score}</div><div style={{ fontSize: 22, fontWeight: 800, opacity: 0.7, fontFamily: UI, color: "#fff" }}>/ 100</div></div></div>
        </div>
      </In>
    </BG>
  );
};

// 60.35 — "Hot, Warm, আর Cold।"
export const S16: S = ({ start }) => {
  const t = useT(start);
  const cols = [{ l: "HOT", ic: "fire", c: HOT, at: A.hot, k: "hot" as Kind, s: [92, 88, 81] }, { l: "WARM", ic: "sun", c: GOLD, at: A.warm, k: "glow" as Kind, s: [67, 58] }, { l: "COLD", ic: "snow", c: "#8DBBFF", at: A.cold, k: "blue" as Kind, s: [24, 15, 9] }];
  return (
    <BG t={t}>
      <Top top={300}>
        <Words t={t} size={104} gap={0.4} words={cols.map((c) => ({ w: c.l, at: c.at, k: c.k }))} />
      </Top>
      {cols.map((c, i) => (
        <In key={c.l} t={t} at={c.at - 0.05} x={190 + i * 350} y={1180}>
          <Glass w={310} style={{ padding: "24px 20px", minHeight: 640, border: `2px solid ${c.c}88` }} glow={`${c.c}44`}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Ico n={c.ic} size={74} color={c.c} sw={2.2} />
              <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 34, color: c.c }}>{c.l}</div>
            </div>
            {c.s.map((v, j) => {
              const k = p(t, c.at + 0.15 + j * 0.15, 0.4, OUT);
              return <div key={v} style={{ marginTop: 16, opacity: k, transform: `translateY(${(1 - k) * -60}px)` }}><div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}><Ico n="user" size={26} color="#cfe0ff" /><span style={{ fontSize: 26, fontWeight: 800 }}>{v}/100</span></div></div>;
            })}
          </Glass>
        </In>
      ))}
    </BG>
  );
};

// 62.1 — "Hot lead সাথে সাথে চলে যায় সঠিক sales person-এর কাছে, notification সহ।"
export const S17: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={200}>
        <Words t={t} size={92} words={[{ w: "HOT LEAD", at: A.hotLead, k: "hot" }]} />
        <Words t={t} size={52} words={ph("goes straight to the right", 62.9, "serif", 0.1)} />
        <Words t={t} size={72} words={[{ w: "sales person", at: A.salesPerson, k: "glow" }]} />
      </Top>
      <In t={t} at={62.3} x={540} y={830}>
        <Glass w={720} style={{ border: `2px solid ${HOT}`, padding: "22px 28px" }} glow={`${HOT}55`}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}><Avatar l="R" size={70} c="#c2185b" /><div><div style={{ fontSize: 30, fontWeight: 800 }}>Rahim Uddin</div><div style={{ fontSize: 20, opacity: 0.65 }}>Budget ৳5L+ · This week</div></div><span style={{ marginLeft: "auto" }}><Chip tone="hot">🔥 92/100</Chip></span></div>
        </Glass>
      </In>
      <Link t={t} at={63.4} color={HOT} d="M 540 920 L 540 1080" dur={0.4} />
      <In t={t} at={A.salesPerson - 0.1} x={540} y={1170}>
        <Glass w={720} style={{ padding: "22px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}><Avatar l="T" size={70} c="#1c7ed6" /><div><div style={{ fontSize: 30, fontWeight: 800 }}>Tanvir · Senior sales</div><div style={{ fontSize: 20, opacity: 0.65 }}>Handles high-budget leads</div></div><span style={{ marginLeft: "auto" }}><Chip tone="ok">Assigned ✓</Chip></span></div>
        </Glass>
      </In>
      <In t={t} at={A.notification} x={540} y={1470} dy={-60}>
        <div style={{ width: 860, display: "flex", alignItems: "center", gap: 18, padding: "22px 26px", borderRadius: 30, background: "rgba(245,245,250,0.96)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)", fontFamily: UI, color: "#111" }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: GOLD, display: "grid", placeItems: "center" }}><Ico n="bell" size={36} color="#111" /></div>
          <div><div style={{ fontSize: 24, fontWeight: 800 }}>🔥 Hot lead assigned to you</div><div style={{ fontSize: 20, opacity: 0.7 }}>Rahim Uddin · 92/100 · Call now</div></div>
          <span style={{ marginLeft: "auto", fontSize: 16, opacity: 0.5 }}>now</span>
        </div>
      </In>
    </BG>
  );
};

// 66.25 — "কোনো lead কারও inbox-এ পড়ে থাকে না।"
export const S18: S = ({ start }) => {
  const t = useT(start);
  const left = count(t, 67.0, 1.0, 14, 0);
  return (
    <BG t={t}>
      <Top top={230}>
        <Words t={t} size={58} words={ph("No lead is left sitting in", 66.4, "serif", 0.1)} />
        <Words t={t} size={100} words={[{ w: "anyone's inbox", at: A.inbox, k: "glow" }]} />
      </Top>
      <In t={t} at={66.35} x={540} y={1190}>
        <Glass w={860} style={{ textAlign: "center", padding: "40px 30px" }} glow={left === 0 ? "rgba(60,220,140,0.35)" : undefined}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14 }}><Ico n="inbox" size={44} color="#cfe0ff" /><span style={{ fontSize: 26, fontWeight: 800, letterSpacing: "0.14em", opacity: 0.75 }}>UNANSWERED LEADS</span></div>
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 220, lineHeight: 1.1, color: left === 0 ? "#5CF0A0" : "#fff", textShadow: left === 0 ? "0 0 30px rgba(92,240,160,0.7)" : glowBlue }}>{left}</div>
          <div style={{ opacity: p(t, 68.0, 0.3) }}><Chip tone="ok" size={28}>✓ Every lead answered</Chip></div>
        </Glass>
      </In>
    </BG>
  );
};

// 68.4 — "তিন। কোন lead শেষ পর্যন্ত customer হলো, সেই তথ্য আবার Meta-তে ফেরত যায়।"
export const S19: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={190}>
        <Words t={t} size={34} words={[{ w: "STEP 03", at: A.three, k: "label" }]} />
        <Words t={t} size={72} words={ph("Became a customer?", 69.6, "bold", 0.12)} />
        <Words t={t} size={60} words={[...ph("That goes back to", 71.2, "serif", 0.1), { w: "Meta", at: A.meta, k: "sglow" }]} />
      </Top>
      <In t={t} at={A.meta - 0.2} x={540} y={850}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}><AppTile name="meta" size={190} label={false} /><Chip tone="gold" size={24}>Conversions API · Purchase ✓</Chip></div>
      </In>
      <Link t={t} at={71.6} color={GOLD} d="M 540 1360 L 540 1060" dur={0.5} />
      <In t={t} at={69.2} x={540} y={1450}>
        <Glass w={880} style={{ padding: "22px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}><Tile n="db" size={46} /><span style={{ fontSize: 24, fontWeight: 800 }}>CRM</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Avatar l="R" size={60} c="#c2185b" /><span style={{ fontSize: 28, fontWeight: 800 }}>Rahim Uddin</span>
            <span style={{ marginLeft: "auto", display: "flex", gap: 8 }}>{["Called", "Met", "Paid"].map((s, i) => <span key={s} style={{ opacity: p(t, 69.6 + i * 0.25, 0.3) }}><Chip tone={i === 2 ? "gold" : "ok"} size={20}>{s} ✓</Chip></span>)}</span>
          </div>
        </Glass>
      </In>
    </BG>
  );
};

// 72.9 — "তাই পরের মাসে ad system এরকম মানুষই আরও খুঁজে আনতে পারে।"
export const S20: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={230}>
        <Words t={t} size={58} words={ph("Next month, the ads find", A.nextMonth, "serif", 0.1)} />
        <Words t={t} size={84} words={ph("more people like him", A.morePeople - 0.1, "glow", 0.12)} />
      </Top>
      <div style={{ position: "absolute", left: 100, top: 830, width: 880, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", rowGap: 30 }}>
        {Array.from({ length: 16 }, (_, i) => {
          const d = Math.hypot((i % 4) - 1.5, Math.floor(i / 4) - 1.5);
          const lit = p(t, 74.6 + d * 0.3, 0.35);
          const center = d < 0.8;
          return (
            <div key={i} style={{ display: "grid", placeItems: "center", opacity: p(t, 73.0 + i * 0.03, 0.3) }}>
              <div style={{ width: 170, height: 170, borderRadius: "50%", display: "grid", placeItems: "center", background: lit > 0.5 ? "rgba(255,213,74,0.14)" : "rgba(20,34,78,0.8)", border: `3px solid ${lit > 0.5 ? GOLD : "rgba(130,170,255,0.35)"}`, boxShadow: lit > 0.5 ? `0 0 34px ${GOLD}88` : undefined, transform: `scale(${lerp(0.88, 1, lit)})` }}>
                <Ico n="user" size={84} color={lit > 0.5 ? GOLD : "#9cb8f0"} sw={1.6} />
                {center && lit > 0.5 ? <div style={{ position: "absolute", marginTop: 150 }}><Chip tone="gold" size={16}>Buyer</Chip></div> : null}
              </div>
            </div>
          );
        })}
      </div>
    </BG>
  );
};

// 76.6 — "Automation আপনার sales team-কে বাদ দেয় না। বরং তাদের সময় বাঁচায়—"
export const S21: S = ({ start }) => {
  const t = useT(start);
  const auto = ["Instant reply", "Lead scoring", "Assigning", "Follow-ups"];
  const team = ["Serious buyers", "Real conversations", "Closing deals"];
  return (
    <BG t={t}>
      <Top top={210}>
        <Words t={t} size={66} words={ph("Automation doesn't replace", A.notReplace, "bold", 0.12)} />
        <Words t={t} size={84} words={[{ w: "your sales team", at: 77.6, k: "glow" }]} />
        <Words t={t} size={54} words={ph("— it saves their time.", A.saves - 0.1, "serif", 0.1)} />
      </Top>
      <In t={t} at={76.8} x={285} y={1200}>
        <Glass w={470} style={{ minHeight: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}><Tile n="bolt" size={56} color={GOLD} /><span style={{ fontSize: 28, fontWeight: 900 }}>Automation</span></div>
          {auto.map((a, i) => <div key={a} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.08)", opacity: p(t, 77.4 + i * 0.25, 0.3) }}><Ico n="check" size={28} color="#5CF0A0" sw={3} /><span style={{ fontSize: 25, fontWeight: 700 }}>{a}</span></div>)}
        </Glass>
      </In>
      <In t={t} at={77.6} x={795} y={1200}>
        <Glass w={470} style={{ minHeight: 560, border: `2px solid ${GOLD}88` }} glow="rgba(255,213,74,0.25)">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}><Tile n="users" size={56} color={GOLD} /><span style={{ fontSize: 28, fontWeight: 900 }}>Your team</span></div>
          {team.map((a, i) => <div key={a} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.08)", opacity: p(t, 78.6 + i * 0.3, 0.3) }}><Ico n="phone" size={26} color={GOLD} /><span style={{ fontSize: 25, fontWeight: 700 }}>{a}</span></div>)}
        </Glass>
      </In>
    </BG>
  );
};

// 80.35 — "যাতে তারা সারাদিন সব lead-কে ফোন না করে, শুধু serious customer-দের সাথে কথা বলতে পারে।"
export const S22: S = ({ start }) => {
  const t = useT(start);
  const leads = [["Rahim", 92], ["Sadia", 85], ["Imran", 64], ["Nabila", 41], ["Karim", 22], ["Tania", 12]] as const;
  const filter = p(t, 82.4, 0.6, OUT);
  return (
    <BG t={t}>
      <Top top={220}>
        <Words t={t} size={56} words={ph("Not calling every lead all day —", 80.5, "serif", 0.11)} />
        <Words t={t} size={92} words={[{ w: "only serious", at: A.only, k: "glow" }, { w: "buyers", at: A.serious + 0.3, k: "glow" }]} />
      </Top>
      <In t={t} at={80.45} x={540} y={1210}>
        <Glass w={900} style={{ padding: "22px 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}><Tile n="chart" size={46} /><span style={{ fontSize: 24, fontWeight: 800 }}>Today's call list</span><span style={{ marginLeft: "auto" }}><Chip tone={filter > 0.5 ? "gold" : "dim"} size={20}>{filter > 0.5 ? "Filtered: score 80+" : "All leads"}</Chip></span></div>
          {leads.map(([n, s]) => {
            const keep = s >= 80;
            return (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.08)", opacity: keep ? 1 : lerp(1, 0.25, filter) }}>
                <Avatar l={n[0]} size={50} c={keep ? "#c2185b" : "#495057"} />
                <span style={{ fontSize: 26, fontWeight: 800, textDecoration: !keep && filter > 0.6 ? "line-through" : undefined }}>{n}</span>
                <span style={{ marginLeft: "auto" }}>{keep && filter > 0.5 ? <Chip tone="hot" size={20}>🔥 {s} · Call now</Chip> : <Chip tone="dim" size={20}>{s}/100</Chip>}</span>
              </div>
            );
          })}
        </Glass>
      </In>
    </BG>
  );
};

// 85.3 — "আপনি ad-এ টাকা খরচ করে lead আনছেন।"
export const S23: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={240}>
        <Words t={t} size={60} words={ph("You pay for ads", 85.5, "serif", 0.1)} />
        <Words t={t} size={100} words={[{ w: "to get leads", at: 86.9, k: "glow" }]} />
      </Top>
      <Obj name="money_bag" t={t} at={85.5} x={260} y={1180} size={360} from="left" mono={false} />
      <Link t={t} at={86.2} color={GOLD} d="M 450 1180 L 640 1180" dur={0.4} />
      {[0, 1, 2].map((i) => (
        <In key={i} t={t} at={86.6 + i * 0.2} x={830 - i * 14} y={1060 + i * 120}>
          <Glass w={330} style={{ padding: "16px 20px", borderRadius: 20 }}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><Ico n="user" size={34} color="#cfe0ff" /><span style={{ fontSize: 24, fontWeight: 800 }}>New lead</span><span style={{ marginLeft: "auto", color: GOLD, fontWeight: 900, fontSize: 22 }}>৳</span></div></Glass>
        </In>
      ))}
    </BG>
  );
};

// 87.75 — "সেই lead reply-এর অপেক্ষায় ঠান্ডা হয়ে গেলে— সেই টাকাটাই নষ্ট।"
export const S24: S = ({ start }) => {
  const t = useT(start);
  const cool = p(t, 88.4, 1.3, IN_OUT);
  const col = `rgb(${Math.round(lerp(255, 120, cool))}, ${Math.round(lerp(91, 180, cool))}, ${Math.round(lerp(58, 255, cool))})`;
  const wasted = p(t, 90.6, 0.3, OUT);
  return (
    <BG t={t}>
      <Top top={210}>
        <Words t={t} size={58} words={[...ph("If that lead goes", 87.9, "serif", 0.1), { w: "cold", at: A.cold2, k: "blue" }]} />
        <Words t={t} size={52} words={ph("waiting for your reply,", 89.4, "bold", 0.1)} />
        <Words t={t} size={84} words={ph("that money is wasted.", A.wasted, "glow", 0.12)} />
      </Top>
      <In t={t} at={87.9} x={540} y={1100}>
        <Glass w={760} style={{ border: `2px solid ${col}`, padding: "28px 32px" }} glow={`${col}55`}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Avatar l="R" size={76} c="#c2185b" /><div><div style={{ fontSize: 30, fontWeight: 800 }}>Rahim Uddin</div><div style={{ fontSize: 20, opacity: 0.65 }}>Waiting for a reply · {Math.round(lerp(1, 42, cool))}h</div></div>
            <span style={{ marginLeft: "auto" }}><Ico n={cool > 0.6 ? "snow" : "fire"} size={56} color={col} /></span>
          </div>
          <div style={{ height: 16, borderRadius: 8, background: "rgba(255,255,255,0.1)", marginTop: 22 }}><div style={{ width: `${lerp(95, 8, cool)}%`, height: "100%", borderRadius: 8, background: col, boxShadow: `0 0 14px ${col}` }} /></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.6, marginTop: 8 }}><span>Cold</span><span>Lead temperature</span><span>Hot</span></div>
        </Glass>
      </In>
      {t > 90.6 ? (
        <div style={{ position: "absolute", left: 540, top: 1460, transform: `translate(-50%,-50%) rotate(-6deg) scale(${lerp(1.8, 1, wasted)})`, opacity: wasted, padding: "16px 44px", borderRadius: 18, border: `6px solid ${HOT}`, fontFamily: SANS, fontWeight: 900, fontSize: 92, color: HOT, letterSpacing: "0.06em", textShadow: glowHot, boxShadow: `0 0 50px ${HOT}66` }}>৳ WASTED</div>
      ) : null}
    </BG>
  );
};

// 91.4 — "আপনার business-এ একটা lead reply পেতে কত সময় লাগে?"
export const S25: S = ({ start }) => {
  const t = useT(start);
  const s = Math.max(0, t - 91.6) * 3600 * 2.1;
  const hh = String(Math.floor(s / 3600)).padStart(2, "0"), mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0"), ss = String(Math.floor(s % 60)).padStart(2, "0");
  return (
    <BG t={t}>
      <Top top={220}>
        <Words t={t} size={58} words={ph("In your business,", 91.6, "serif", 0.1)} />
        <Words t={t} size={74} words={ph("how long until a lead", 92.4, "bold", 0.1)} />
        <Words t={t} size={92} words={[{ w: "gets a reply?", at: A.howLong, k: "glow" }]} />
      </Top>
      <In t={t} at={91.6} x={540} y={1200}>
        <Glass w={860} style={{ textAlign: "center", padding: "44px 30px" }}>
          <Ico n="clock" size={90} color={GOLD} sw={1.8} />
          <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 130, marginTop: 10, color: "#fff", textShadow: glowBlue }}>{hh}:{mm}:{ss}</div>
          <div style={{ fontSize: 26, fontWeight: 800, opacity: 0.7, letterSpacing: "0.14em" }}>YOUR RESPONSE TIME?</div>
        </Glass>
      </In>
    </BG>
  );
};

// 94.2 — "জানতে চাইলে বা এমন system বানাতে চাইলে— DM করুন “AUTOMATION”।"
export const S26: S = ({ start }) => {
  const t = useT(start);
  const word = "AUTOMATION";
  const typed = word.slice(0, Math.max(0, Math.min(word.length, Math.floor((t - 96.9) * 16))));
  const sent = t > 97.7;
  const k = p(t, A.dm - 0.05, 0.5, OUT);
  return (
    <BG t={t}>
      <Top top={220}>
        <Words t={t} size={58} words={ph("Want this system for your business?", 94.4, "serif", 0.1)} />
      </Top>
      <div style={{ position: "absolute", left: 540, top: 540, transform: `translate(-50%,-50%) scale(${lerp(0.85, 1, k)})`, opacity: k, filter: `blur(${(1 - k) * 12}px)`, display: "flex", alignItems: "center", gap: 20, padding: "26px 50px", borderRadius: 999, background: "rgba(255,213,74,0.12)", border: `3px solid ${GOLD}`, boxShadow: `0 0 ${60 + Math.sin(t * 5) * 16}px ${GOLD}aa` }}>
        <Logo name="instagram" size={70} color="#fff" />
        <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 76, color: GOLD, textShadow: glowGold, whiteSpace: "nowrap" }}>DM “AUTOMATION”</span>
      </div>
      <In t={t} at={94.4} x={540} y={1260} dy={100}>
        <div style={{ transform: "perspective(1800px) rotateY(-8deg) rotateX(4deg)" }}>
          <Phone w={400}>
            <div style={{ position: "absolute", inset: 0, background: "#000", fontFamily: UI, color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "56px 18px 16px", borderBottom: "1px solid #222" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#e3122f,#5a0010)", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 24 }}>F</div>
                <div><div style={{ fontWeight: 800, fontSize: 21 }}>Fahad</div><div style={{ fontSize: 14, opacity: 0.6 }}>Lead automation systems</div></div>
              </div>
              {sent ? <div style={{ position: "absolute", right: 18, bottom: 150, padding: "14px 22px", borderRadius: 24, background: "linear-gradient(135deg,#7a2cff,#e3122f)", fontWeight: 800, fontSize: 24, transform: `scale(${lerp(0.6, 1, p(t, 97.7, 0.25, OUT))})` }}>AUTOMATION</div> : null}
              <div style={{ position: "absolute", left: 16, right: 16, bottom: 60, height: 62, borderRadius: 31, border: "1px solid #333", display: "flex", alignItems: "center", padding: "0 20px", fontSize: 22 }}>
                {sent ? "Message…" : typed}<span style={{ opacity: sent ? 0 : Math.floor(t * 3) % 2 }}>|</span><span style={{ marginLeft: "auto", color: "#3897f0", fontWeight: 800, fontSize: 20 }}>Send</span>
              </div>
            </div>
          </Phone>
        </div>
      </In>
    </BG>
  );
};
