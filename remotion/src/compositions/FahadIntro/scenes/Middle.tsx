/** Scenes 5–8: not just leads → funnel diagnostics → campaign ≠ business → data · AI · connected. */
import { interpolateColors } from "remotion";
import { COLORS } from "../../../theme/theme";
import { CUES as C } from "../cues";
import { Center, drawn, fadeUp, GLASS, H2, H3, Icon, IconName, LAB, lerp, MARK, Node, p, PillTag, pop, RiseLine, useT } from "../kit";

type SceneProps = { start: number };
const W = 1080, Hh = 1920;

const Path: React.FC<{ d: string; t: number; at: number; dur?: number; stroke?: string; w?: number }> = ({ d, t, at, dur = 0.4, stroke = "rgba(114,0,19,0.45)", w = 3 }) => {
  const s = drawn(d, t, at, dur);
  return <path d={d} stroke={stroke} strokeWidth={w} fill="none" strokeLinecap="round" strokeDasharray={s.strokeDasharray} strokeDashoffset={s.strokeDashoffset} />;
};
/** 1 while t is in [a, b] (eased in/out over 0.3s). */
const on = (t: number, a: number, b: number) => p(t, a, 0.3) * (1 - p(t, b, 0.3));

// ───────────────── 05 · NOT JUST LEADS ───────────────── "আমার কাজের মূল focus সবসময় শুধু Lead Generate করা নয়।"
const CHAIN: [string, IconName][] = [["AD", "ads"], ["LEAD", "users"], ["CONTACTED", "phone"], ["QUALIFIED", "check"], ["MEETING / SITE VISIT", "cal"], ["SALE", "tag"], ["REVENUE", "revenue"]];
export const LeadScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const t0 = C.leadGen + 1.0;
  const span = Math.max(1.6, C.source - 0.55 - t0);
  const stmt = fadeUp(t, C.focus);
  const away = p(t, t0 - 0.35, 0.4);
  const ad0 = pop(t, C.focus + 0.1), lead0 = pop(t, C.focus + 0.7);
  const gone = 1 - p(t, t0 - 0.35, 0.35);
  return (
    <>
      <Center top={280} style={{ ...H3, padding: "0 90px", opacity: stmt.opacity * lerp(1, 0.45, away), transform: `translateY(${stmt.ty - 60 * away}px)` }}>
        শুধু <span style={{ color: COLORS.crimson }}>Lead Generate</span> করা নয়
      </Center>
      <svg width={W} height={Hh} style={{ position: "absolute", left: 0, top: 0 }}>
        <g opacity={gone}><Path d="M430 820 H 630" t={t} at={C.focus + 0.4} stroke={COLORS.burgundy} w={4} /></g>
        {CHAIN.slice(0, 6).map((_, k) => <Path key={k} d={`M540 ${540 + k * 150} V ${610 + k * 150}`} t={t} at={t0 + (k * span) / 7 + 0.2} dur={0.2} />)}
      </svg>
      <Node label="AD" icon="ads" x={330} y={820} opacity={ad0.opacity * gone} scale={ad0.scale * lerp(0.8, 1, gone)} />
      <Node label="LEAD" icon="users" x={750} y={820} hot opacity={lead0.opacity * gone} scale={lead0.scale * lerp(0.8, 1, gone)} />
      {CHAIN.map(([l, ic], k) => {
        const e = fadeUp(t, t0 + (k * span) / 7, 0.35, 24);
        return <Node key={l} label={l} icon={ic} x={540} y={500 + k * 150} hot={k === 6} small={k === 1} opacity={e.opacity} dy={e.ty} />;
      })}
    </>
  );
};

// ───────────────── 06 · FUNNEL DIAGNOSTICS ─────────────────
// "কোথা থেকে Lead আসছে, কোন Lead … Valuable, Funnel-এর কোথায় Leakage, Campaign কোথায় Improve, … Revenue Growth"
const STAGES = ["TRAFFIC", "LEAD", "CONTACTED", "QUALIFIED", "MEETING / SITE VISIT", "SALE", "REVENUE"];
export const FunnelScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const hot = [on(t, C.source, C.valuable - 0.2), 0, 0, on(t, C.valuable, C.leakage - 0.2), 0, 0, p(t, C.revenue, 0.35)];
  const pulse = C.improve <= t && t < C.improve + 0.6 ? Math.sin(((t - C.improve) / 0.6) * Math.PI) : 0;
  const border = [pulse, pulse, p(t, C.leakage, 0.3), 0, 0, 0, 0];
  const calls: [string, IconName, number, number][] = [
    ["WHERE LEADS COME FROM", "search", C.source + 0.1, C.valuable - 0.2], ["LEAD QUALITY", "star", C.valuable + 0.1, C.leakage - 0.2],
    ["FUNNEL LEAKAGE", "leak", C.leakage + 0.3, C.improve - 0.2], ["CAMPAIGN IMPROVEMENT", "target", C.improve, C.revenue - 0.2], ["REVENUE", "revenue", C.revenue + 0.15, 999],
  ];
  const leakX = 540 + (860 - 2 * 82) / 2 - 10, leakY = 400 + 2 * 122 + 80;
  return (
    <>
      {STAGES.map((l, k) => {
        const w = 860 - k * 82;
        const e = p(t, C.source - 0.3 + k * 0.06, 0.35);
        const h = hot[k];
        return (
          <div key={l} style={{ position: "absolute", left: 540 - w / 2, top: 400 + k * 122, width: w, height: 106, borderRadius: 18, overflow: "hidden",
            background: "rgba(114,0,19,0.08)", border: `2px solid ${interpolateColors(border[k], [0, 1], ["rgba(114,0,19,0.16)", COLORS.crimson])}`,
            opacity: e, transform: `scaleX(${lerp(0.85, 1, e)}) scale(${k === 6 ? 1 + 0.08 * h : 1})` }}>
            <div style={{ position: "absolute", inset: 0, background: k === 6 ? COLORS.crimson : COLORS.burgundy, opacity: h }} />
            <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800,
              letterSpacing: "0.08em", color: interpolateColors(h, [0, 1], [COLORS.wine, COLORS.ivory]) }}>{l}</div>
          </div>
        );
      })}
      {calls.map(([txt, ic, a, b]) => {
        const k = p(t, a, 0.45) * (1 - p(t, b, 0.25));
        return <Center key={txt} top={320} style={{ opacity: k, transform: `translateY(${(1 - p(t, a, 0.45)) * 22}px)` }}><PillTag icon={ic}>{txt}</PillTag></Center>;
      })}
      <svg width={W} height={Hh} style={{ position: "absolute", left: 0, top: 0 }}>
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const s = C.leakage + k * 0.16;
          const m = p(t, s, 1.1, (x) => x * x);
          const o = (t >= s ? 0.9 : 0) * (1 - p(t, s + 1.0, 0.3));
          return <circle key={k} cx={leakX + (40 + k * 14) * m} cy={leakY + (150 + k * 20) * m} r={9 - (k % 3) * 2} fill={COLORS.crimson} opacity={o} />;
        })}
      </svg>
    </>
  );
};

// ───────────────── 07 · CAMPAIGN ≠ BUSINESS ─────────────────
// "কারণ একটা Campaign ভালো Perform করছে মানেই Business ভালো Perform করছে— এটা সবসময় সত্যি না।"
const Spark: React.FC<{ d: string; t: number; at: number }> = ({ d, t, at }) => {
  const s = drawn(d, t, at, 0.6);
  return <svg width={120} height={60} viewBox="0 0 120 60"><path d={d} fill="none" stroke={COLORS.crimson} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={s.strokeDasharray} strokeDashoffset={s.strokeDashoffset} /></svg>;
};
const Panel: React.FC<{ t: number; at: number; left: number; eyebrow: string; title: string; rows: [string, string, string][]; dir: number }> = ({ t, at, left, eyebrow, title, rows, dir }) => {
  const k = p(t, at - 0.1, 0.45);
  return (
    <div style={{ position: "absolute", top: 420, left, width: 430, height: 720, padding: "34px 30px", ...GLASS, borderRadius: 32, opacity: k, transform: `translateX(${(1 - k) * 40 * dir}px)` }}>
      <span style={LAB}>{eyebrow}</span>
      <h4 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "0.06em", margin: "14px 0 26px" }}>{title}</h4>
      {rows.map(([n, a, d], i) => (
        <div key={n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 150, borderTop: "2px solid rgba(114,0,19,0.1)", opacity: p(t, at + 0.2 + i * 0.25, 0.3) }}>
          <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.04em" }}>{n}</span>
          <Spark d={d} t={t} at={at + 0.3 + i * 0.25} />
          <em style={{ fontStyle: "normal", fontSize: 44, fontWeight: 800, color: COLORS.crimson }}>{a}</em>
        </div>
      ))}
    </div>
  );
};
export const CampaignScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  return (
    <>
      <Panel t={t} at={C.campaign} left={100} eyebrow="DASHBOARD" title="CAMPAIGN" dir={-1}
        rows={[["CTR", "↑", "M4 50 L40 40 L70 28 L116 8"], ["LEADS", "↑", "M4 52 L40 44 L74 22 L116 10"], ["CPL", "↓", "M4 10 L40 22 L74 36 L116 50"]]} />
      <Panel t={t} at={C.business} left={550} eyebrow="REALITY" title="BUSINESS" dir={1}
        rows={[["QUALIFIED", "?", "M4 40 L40 36 L74 38 L116 34"], ["SALES", "?", "M4 42 L40 42 L74 38 L116 40"], ["REVENUE", "?", "M4 40 L40 38 L74 40 L116 37"]]} />
      <Center top={1230}>
        <RiseLine t={t} start={C.notTrue} style={{ ...H2, fontSize: 56 }}>GOOD CAMPAIGN <span style={{ color: COLORS.crimson }}>≠</span></RiseLine>
        <RiseLine t={t} start={C.notTrue + 0.3} style={{ ...H2, fontSize: 56 }}>AUTOMATIC <span style={MARK}>BUSINESS GROWTH</span></RiseLine>
      </Center>
    </>
  );
};

// ───────────────── 08 · DATA · AI · CONNECTED ───────────────── "আজকের Digital Marketing আরও অনেক বেশি Data-driven, AI-powered এবং connected।"
export const ModernScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const ttl = fadeUp(t, C.today);
  const t0 = C.today + 0.15;
  const xs = [140, 320, 500, 690, 880];
  const g = pop(t, t0 + 1.3, 0.45);
  const big = (label: React.ReactNode, icon: IconName, left: number, at: number) => {
    const k = pop(t, at - 0.08, 0.45);
    return (
      <div style={{ position: "absolute", top: 360, left, width: 280, height: 250, ...GLASS, borderRadius: 30, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center", opacity: k.opacity, transform: `scale(${k.scale})` }}>
        <Icon name={icon} size={80} />
        <b style={{ fontSize: 34, fontWeight: 800, letterSpacing: "0.04em", lineHeight: 1.1 }}>{label}</b>
      </div>
    );
  };
  return (
    <>
      <Center top={270} style={{ ...LAB, opacity: ttl.opacity, transform: `translateY(${ttl.ty}px)` }}>TODAY'S DIGITAL MARKETING</Center>
      <svg width={W} height={Hh} style={{ position: "absolute", left: 0, top: 0 }}>
        <Path d="M360 485 H 400" t={t} at={C.aiPowered + 0.1} dur={0.25} stroke={COLORS.crimson} w={4} />
        <Path d="M680 485 H 720" t={t} at={C.connected + 0.1} dur={0.25} stroke={COLORS.crimson} w={4} />
        {[760, 960].map((y, r) => [0, 1, 2, 3].map((k) => <Path key={`${r}${k}`} d={`M${xs[k] + 70} ${y} H ${xs[k + 1] - 75}`} t={t} at={t0 + r * 0.25 + k * 0.12 + 0.15} dur={0.2} stroke="rgba(114,0,19,0.4)" />))}
        <Path d="M880 800 C 880 1100, 700 1220, 640 1220" t={t} at={t0 + 0.9} dur={0.5} stroke={COLORS.crimson} w={4} />
        <Path d="M880 1000 C 870 1150, 720 1220, 640 1220" t={t} at={t0 + 1.0} dur={0.5} stroke={COLORS.crimson} w={4} />
        {/* data pulses travelling along both acquisition paths */}
        {[760, 960].map((y, r) => {
          const s0 = t0 + 0.9 + r * 0.3;
          if (t < s0) return null;
          const ph = ((t - s0) % 0.9) / 0.9;
          return <circle key={y} cx={140 + ph * 740} cy={y} r={7} fill={COLORS.crimson} opacity={Math.sin(ph * Math.PI)} />;
        })}
      </svg>
      {big("DATA", "db", 80, C.dataDriven)}
      {big("AI", "ai", 400, C.aiPowered)}
      {big(<>CONNECTED<br />SYSTEMS</>, "nodes", 720, C.connected)}
      {[["META", 760], ["GOOGLE", 960]].map(([src, y], r) =>
        [src as string, "WEBSITE", "CRM", "CUSTOMER", "REVENUE"].map((l, k) => {
          const e = fadeUp(t, t0 + r * 0.25 + k * 0.12, 0.3, 14);
          return <Node key={`${r}${l}`} label={l} x={xs[k]} y={y as number} small hot={k === 0} opacity={e.opacity} dy={e.ty} />;
        }),
      )}
      <Node label="GROWTH" icon="growth" x={540} y={1220} hot opacity={g.opacity} scale={g.scale} />
    </>
  );
};
