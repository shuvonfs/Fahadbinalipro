/** Scenes 9–13: nested circles → growth-system hero → focus markets → content ecosystem → final positioning. */
import { getLength, getPointAtLength } from "@remotion/paths";
import { Img, staticFile } from "remotion";
import { COLORS } from "../../../theme/theme";
import { CUES as C } from "../cues";
import { BACK, Center, drawn, fadeUp, GLASS, H1, H2, H3, Icon, IconName, IN_OUT, LAB, lerp, MARK, Node, p, PillTag, pop, RiseLine, useT } from "../kit";

type SceneProps = { start: number };
const W = 1080, Hh = 1920;

// ───────────────── 09 · ADVERTISING ⊂ MARKETING ⊂ GROWTH ───────────────── "তাই আমি Marketing-কে শুধু Advertising হিসেবে দেখি না।"
export const NestedScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const s = 1.9 - 0.6 * p(t, C.marketing - 0.3, 1.0, IN_OUT) - 0.3 * p(t, C.marketing + 0.6, 0.8, IN_OUT);
  const ad = pop(t, C.advertising - 0.1, 0.5);
  const mk = p(t, C.marketing - 0.3, 0.4), gr = p(t, C.marketing + 0.6, 0.4);
  const f = fadeUp(t, C.marketing + 1.0);
  const ring = (label: string, left: number, top: number, size: number, o: number) => (
    <div style={{ position: "absolute", left, top, width: size, height: size, ...GLASS, borderRadius: "50%", display: "flex", justifyContent: "center", opacity: o }}>
      <span style={{ marginTop: 36, fontSize: 28, fontWeight: 800, letterSpacing: "0.16em", color: COLORS.burgundy }}>{label}</span>
    </div>
  );
  return (
    <>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${s})`, transformOrigin: "540px 900px" }}>
        {ring("BUSINESS GROWTH", 90, 450, 900, gr)}
        {ring("MARKETING", 240, 600, 600, mk)}
        <div style={{ position: "absolute", left: 400, top: 760, width: 280, height: 280, borderRadius: "50%", background: COLORS.burgundy, display: "flex",
          alignItems: "center", justifyContent: "center", boxShadow: "0 30px 70px rgba(114,0,19,0.3)", opacity: ad.opacity, transform: `scale(${ad.scale})` }}>
          <span style={{ color: COLORS.ivory, fontSize: 30, fontWeight: 800, letterSpacing: "0.08em" }}>ADVERTISING</span>
        </div>
      </div>
      <Center top={1430} style={{ ...LAB, opacity: f.opacity, transform: `translateY(${f.ty}px)` }}>ADVERTISING ⊂ MARKETING ⊂ GROWTH</Center>
    </>
  );
};

// ───────────────── 10 · GROWTH SYSTEM (hero) ───────────────── "আমি দেখি একটা পুরো Growth System হিসেবে।"
const ORBIT = "M540 395 C 900 395, 960 700, 960 880 C 960 1100, 900 1385, 540 1385 C 180 1385, 120 1100, 120 880 C 120 700, 180 395, 540 395 Z";
const FLOW: [string, IconName][] = [["STRATEGY", "strategy"], ["ACQUISITION", "users"], ["CONVERSION", "target"], ["CRM", "crm"], ["RETENTION", "star"], ["REVENUE", "revenue"]];
export const GrowthSystemScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const orbitLen = getLength(ORBIT);
  const o = drawn(ORBIT, t, C.growthSystem + 0.4, 1.2);
  return (
    <>
      <Center top={250}><RiseLine t={t} start={C.growthSystem - 0.1} style={{ ...H2, color: COLORS.burgundy }}>GROWTH SYSTEM</RiseLine></Center>
      <svg width={W} height={Hh} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d={ORBIT} fill="none" stroke="rgba(114,0,19,0.18)" strokeWidth={2} strokeDasharray={o.strokeDasharray} strokeDashoffset={o.strokeDashoffset} />
        {FLOW.slice(0, 5).map((_, k) => {
          const d = `M540 ${514 + k * 165} V ${591 + k * 165}`;
          const s = drawn(d, t, C.growthSystem + 0.25 + k * 0.22, 0.2);
          return <path key={k} d={d} stroke="rgba(114,0,19,0.45)" strokeWidth={3} fill="none" strokeDasharray={s.strokeDasharray} strokeDashoffset={s.strokeDashoffset} />;
        })}
        {/* data signals circulating around the system */}
        {[0, 1, 2].map((k) => {
          const s0 = C.growthSystem + 1.4 + (k * 3.2) / 3;
          if (t < s0) return null;
          const pt = getPointAtLength(ORBIT, (((t - s0) / 3.2) % 1) * orbitLen);
          return pt ? <circle key={k} cx={pt.x} cy={pt.y} r={8} fill={COLORS.crimson} opacity={p(t, s0, 0.3)} /> : null;
        })}
      </svg>
      {FLOW.map(([l, ic], k) => {
        const e = fadeUp(t, C.growthSystem + 0.1 + k * 0.22, 0.35, 20);
        return <Node key={l} label={l} icon={ic} x={540} y={470 + k * 165} hot={k === 5} opacity={e.opacity} dy={e.ty} />;
      })}
    </>
  );
};

// ───────────────── 11 · FOCUS MARKETS ─────────────────
// "Real Estate এবং Study Abroad আমার প্রধান focus area হলেও, বিভিন্ন Service-based Business-এর Growth Problem নিয়েও কাজ করতে চাই।"
export const MarketScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const ttl = fadeUp(t, C.reStudy - 0.1);
  const wide = p(t, C.service2 - 0.1, 0.9);
  const svc = fadeUp(t, C.service2 + 0.4);
  const card = (label: React.ReactNode, icon: IconName, left: number, at: number) => {
    const k = pop(t, at, 0.5);
    return (
      <div style={{ position: "absolute", top: 700, left, width: 380, height: 330, borderRadius: 34, background: COLORS.burgundy, color: COLORS.ivory,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, textAlign: "center",
        boxShadow: "0 30px 80px rgba(114,0,19,0.28)", opacity: k.opacity, transform: `scale(${k.scale})` }}>
        <Icon name={icon} size={96} color={COLORS.ivory} />
        <b style={{ fontSize: 38, fontWeight: 800, letterSpacing: "0.04em", lineHeight: 1.1 }}>{label}</b>
      </div>
    );
  };
  const dots = [[120, 640], [960, 640], [120, 1100], [960, 1100], [540, 470]];
  return (
    <>
      <Center top={330} style={{ ...LAB, opacity: ttl.opacity, transform: `translateY(${ttl.ty}px)` }}>PRIMARY FOCUS</Center>
      <div style={{ position: "absolute", left: 70, top: 470, width: 940, height: 790, borderRadius: "46%", border: "3px dashed rgba(128,1,31,0.45)",
        opacity: wide, transform: `scale(${lerp(0.6, 1, wide)})` }} />
      {card(<>REAL<br />ESTATE</>, "building", 130, C.reStudy)}
      {card(<>STUDY<br />ABROAD</>, "grad", 570, C.reStudy + 0.9)}
      <Center top={1225} style={{ opacity: svc.opacity, transform: `translateY(${svc.ty}px)` }}><PillTag icon="nodes">SERVICE BUSINESSES</PillTag></Center>
      {dots.map(([x, y], k) => {
        const s = p(t, C.service2 + 0.6 + k * 0.1, 0.3, BACK);
        return <div key={k} style={{ position: "absolute", left: x - 15, top: y - 15, width: 30, height: 30, borderRadius: "50%", background: COLORS.ivory, border: `5px solid ${COLORS.crimson}`, transform: `scale(${s})` }} />;
      })}
    </>
  );
};

// ───────────────── 12 · CONTENT ECOSYSTEM ─────────────────
// "এই প্ল্যাটফর্মে আমি Share করব Digital Marketing, Meta Ads, Google Ads, AI, Automation, Funnel, Data এবং Business Growth …"
const TOPICS: [string, IconName, keyof typeof C][] = [["META ADS", "ads", "metaAds"], ["GOOGLE ADS", "search", "googleAds"], ["AI", "ai", "ai"], ["AUTOMATION", "gear", "automation"], ["FUNNEL", "funnel", "funnel2"], ["DATA", "db", "data2"], ["BUSINESS GROWTH", "growth", "bizGrowth"]];
export const ContentScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const ttl = fadeUp(t, C.platform), me = pop(t, C.platform + 0.2, 0.55), mel = fadeUp(t, C.platform + 0.4), sub = fadeUp(t, C.experience);
  const ringD = "M540 440 A 360 500 0 1 1 539.9 440 Z";
  const r = drawn(ringD, t, C.platform + 0.5, 1.2);
  const rot = 0.55 * p(t, C.bizGrowth, Math.max(1, C.ifYou - 0.4 - C.bizGrowth), IN_OUT);
  const cx = 540, cy = 940, rx = 330, ry = 480;
  return (
    <>
      <Center top={270} style={{ ...LAB, opacity: ttl.opacity, transform: `translateY(${ttl.ty}px)` }}>ON THIS PLATFORM</Center>
      <svg width={W} height={Hh} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d={ringD} fill="none" stroke="rgba(114,0,19,0.18)" strokeWidth={2} strokeDasharray={r.strokeDasharray} strokeDashoffset={r.strokeDashoffset} />
      </svg>
      <div style={{ position: "absolute", left: 420, top: 820, width: 240, height: 240, borderRadius: "50%", overflow: "hidden", border: `6px solid ${COLORS.burgundy}`,
        boxShadow: "0 30px 70px rgba(114,0,19,0.25)", opacity: me.opacity, transform: `scale(${me.scale})` }}>
        <Img src={staticFile("fahad-intro/fahad.jpg")} style={{ width: "100%", height: "133%", objectFit: "cover", objectPosition: "50% 12%" }} />
      </div>
      <Center top={1075} style={{ fontSize: 34, fontWeight: 800, letterSpacing: "0.14em", color: COLORS.burgundy, opacity: mel.opacity }}>FAHAD</Center>
      {TOPICS.map(([l, ic, cue], k) => {
        const a = -Math.PI / 2 + k * ((2 * Math.PI) / TOPICS.length) + rot;
        const e = pop(t, C[cue] - 0.08, 0.35);
        return <Node key={l} label={l} icon={ic} x={cx + Math.cos(a) * rx} y={cy + Math.sin(a) * ry} small hot={k === 6} opacity={e.opacity} scale={e.scale} />;
      })}
      <Center top={1500} style={{ ...LAB, opacity: sub.opacity, transform: `translateY(${sub.ty}px)` }}>EXPERIENCE · ANALYSIS · PRACTICAL THINKING</Center>
    </>
  );
};

// ───────────────── 13 · FINAL POSITIONING ─────────────────
// "আপনি যদি শুধু Ads চালানোর মানুষ না, বরং Business Growth নিয়ে চিন্তা করেন— তাহলে এই journey-তে আমার সঙ্গে থাকুন। আমি Fahad। And I'm here to talk about what actually drives business growth."
export const FinalScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const out = p(t, C.fahad2 - 0.55, 0.45);
  const jr = fadeUp(t, C.journey);
  const halo = p(t, C.fahad2 - 0.2, 0.8);
  const reveal = p(t, C.fahad2 - 0.2, 0.8);
  const push = lerp(1.06, 1, p(t, C.fahad2 - 0.2, C.end - C.fahad2, (x) => 1 - (1 - x) * (1 - x)));
  const rl = fadeUp(t, C.fahad2 + 0.4), fl = fadeUp(t, C.final, 0.6);
  const inset = (1 - reveal) * 10;
  const big: React.CSSProperties = { ...H1, fontSize: 132 };
  return (
    <>
      <div style={{ opacity: 1 - out, transform: `translateY(${-40 * out}px)`, position: "absolute", inset: 0 }}>
        <Center top={640}>
          <RiseLine t={t} start={C.ifYou} style={big}>DON'T JUST</RiseLine>
          <RiseLine t={t} start={C.ifYou + 0.3} style={big}>RUN ADS.</RiseLine>
        </Center>
        <Center top={960}>
          <RiseLine t={t} start={C.thinkGrowth} style={big}>THINK</RiseLine>
          <RiseLine t={t} start={C.thinkGrowth + 0.3} style={big}><span style={MARK}>GROWTH.</span></RiseLine>
        </Center>
        <Center top={1330} style={{ ...LAB, opacity: jr.opacity, transform: `translateY(${jr.ty}px)` }}>JOIN THE JOURNEY</Center>
      </div>
      <div style={{ position: "absolute", left: 140, top: 200, width: 800, height: 900, opacity: halo, background: "radial-gradient(ellipse, rgba(128,1,31,0.2) 0%, rgba(128,1,31,0) 65%)" }} />
      <div style={{ position: "absolute", left: 300, top: 300, width: 480, height: 640, borderRadius: 40, overflow: "hidden", border: "3px solid rgba(114,0,19,0.25)",
        boxShadow: "0 36px 80px rgba(45,0,1,0.2)", opacity: reveal, clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}% round 40px)` }}>
        <Img src={staticFile("fahad-intro/fahad.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${push})` }} />
      </div>
      <Center top={990}><RiseLine t={t} start={C.fahad2} style={H1}>FAHAD</RiseLine></Center>
      <Center top={1150} style={{ ...H3, opacity: rl.opacity, transform: `translateY(${rl.ty}px)` }}>
        Digital Marketing <span style={{ color: COLORS.crimson }}>&amp;</span> Growth
      </Center>
      <Center top={1250} style={{ padding: "0 120px", opacity: fl.opacity, transform: `translateY(${fl.ty}px)` }}>
        <div style={{ ...H3, fontSize: 50, color: COLORS.maroon }}>I'm here to talk about what actually drives <span style={{ color: COLORS.crimson }}>business growth.</span></div>
      </Center>
    </>
  );
};
