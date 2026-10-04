/** Scenes 1–4: growth system → profile → industries → brands & environments. */
import { Img, interpolateColors, staticFile } from "remotion";
import { COLORS } from "../../../theme/theme";
import { CUES as C } from "../cues";
import {
  BACK, Center, drawn, fadeUp, GLASS, H1, H3, HOT, Icon, IconName, IN, IN_OUT, LAB, lerp, Node, p, PillTag, pop, RiseLine, useT,
} from "../kit";

type SceneProps = { start: number };
const W = 1080, Hh = 1920;

// ───────────────── 01 · GROWTH SYSTEM ─────────────────
// "আমি বিশ্বাস করি, Digital Marketing শুধু Ads চালানোর নাম না।" → "…সঠিক Strategy, Audience, Creative, Data, Funnel … Decision Making"
const RING: [string, IconName, number, number, number, number, keyof typeof C | null][] = [
  ["ADS", "ads", 540, 630, 380, 520, null],
  ["STRATEGY", "strategy", 826, 795, 860, 640, "strategy"],
  ["AUDIENCE", "users", 826, 1125, 870, 1240, "audience"],
  ["CREATIVE", "image", 540, 1290, 600, 1380, "creative"],
  ["DATA", "db", 254, 1125, 150, 1200, "data"],
  ["FUNNEL", "funnel", 254, 795, 170, 700, "funnel"],
];
export const SystemScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const lineIn = p(t, 0.15, 0.9, IN_OUT), lineOut = p(t, C.growth - 0.2, 0.5);
  const stmt = fadeUp(t, C.notAds - 0.6, 0.6);
  const stmtDim = lerp(1, 0.35, p(t, C.decision - 0.4, 0.4));
  const core = pop(t, C.decision - 0.2, 0.55);
  const ring = pop(t, C.decision, 0.6);
  const breathe = 1 + 0.06 * Math.sin(Math.max(0, t - C.decision - 0.7) * 2.2) * p(t, C.decision + 0.7, 0.4);
  const eq = fadeUp(t, C.decision + 0.6);
  const dm = fadeUp(t, C.decision + 0.1);
  const loopD = "M540 630 L826 795 L826 1125 L540 1290 L254 1125 L254 795 Z";
  return (
    <>
      <div style={{ position: "absolute", left: 240, top: 958, width: 600, height: 4, borderRadius: 2, background: COLORS.burgundy,
        transform: `scaleX(${lineIn * lerp(1, 0.2, lineOut)})`, opacity: 1 - lineOut }} />
      <Center top={300} style={{ ...H3, padding: "0 100px", opacity: stmt.opacity * stmtDim, transform: `translateY(${stmt.ty}px)` }}>
        Digital Marketing শুধু <span style={{ color: COLORS.crimson }}>Ads</span> চালানোর নাম না।
      </Center>
      <svg width={W} height={Hh} style={{ position: "absolute", left: 0, top: 0 }}>
        {RING.map(([, , x, y], i) => {
          const d = `M540 960 L${x} ${y}`;
          const s = drawn(d, t, C.decision + i * 0.08, 0.45);
          return <path key={i} d={d} stroke="rgba(114,0,19,0.3)" strokeWidth={3} fill="none" strokeDasharray={s.strokeDasharray} strokeDashoffset={s.strokeDashoffset} />;
        })}
        {(() => { const s = drawn(loopD, t, C.decision + 0.5, 0.9); return <path d={loopD} stroke="rgba(114,0,19,0.18)" strokeWidth={2} fill="none" strokeDasharray={s.strokeDasharray} strokeDashoffset={s.strokeDashoffset} />; })()}
      </svg>
      <div style={{ position: "absolute", left: 330, top: 750, width: 420, height: 420, borderRadius: "50%", border: "2px solid rgba(114,0,19,0.22)",
        opacity: ring.opacity, transform: `scale(${ring.scale * breathe})` }} />
      <div style={{ position: "absolute", left: 400, top: 820, width: 280, height: 280, borderRadius: "50%", background: COLORS.burgundy, color: COLORS.ivory,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 30px 80px rgba(114,0,19,0.3)",
        opacity: core.opacity, transform: `scale(${core.scale})` }}>
        <Icon name="growth" size={70} color={COLORS.ivory} />
        <b style={{ fontSize: 40, fontWeight: 800, letterSpacing: "0.08em" }}>GROWTH</b>
      </div>
      {RING.map(([label, icon, x, y, sx, sy, cue], i) => {
        const appear = p(t, C.growth + i * 0.12, 0.6);
        const settleAt = cue ? C[cue] - 0.08 : C.strategy - 0.3;
        const settle = p(t, settleAt, 0.55);
        const lit = cue ? p(t, settleAt, 0.4) : 0;
        return (
          <Node key={label} label={label} icon={icon} x={x} y={y}
            opacity={appear * 0.55 + settle * 0.45 * appear}
            dx={(1 - settle) * (sx - x)} dy={(1 - settle) * (sy - y)} scale={lerp(0.9, 1, appear)}
            borderColor={`rgba(128,1,31,${0.14 + 0.46 * lit})`} />
        );
      })}
      <Center top={1385} style={{ ...LAB, fontSize: 22, letterSpacing: "0.16em", opacity: eq.opacity, transform: `translateY(${eq.ty}px)` }}>
        Strategy + Creative + Data + Funnel = Growth System
      </Center>
      <Center top={1450} style={{ opacity: dm.opacity, transform: `translateY(${dm.ty}px)` }}>
        <PillTag icon="target">সঠিক DECISION MAKING</PillTag>
      </Center>
    </>
  );
};

// ───────────────── 02 · PROFILE ───────────────── "আমি Fahad।" … holds through "গত 7+ বছর"
export const ProfileScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const halo = p(t, C.fahad - 0.3, 0.9);
  const reveal = p(t, C.fahad - 0.25, 0.8);
  const push = lerp(1.08, 1, p(t, C.fahad - 0.25, C.realEstate - C.fahad + 0.2, (x) => 1 - (1 - x) * (1 - x)));
  const role = fadeUp(t, C.fahad + 0.45);
  const desc = fadeUp(t, C.fahad + 0.8);
  const yrs = p(t, C.years, 0.35);
  const inset = (1 - reveal) * 12;
  return (
    <>
      <div style={{ position: "absolute", left: 90, top: 200, width: 900, height: 1100, opacity: halo, transform: `scale(${lerp(0.85, 1, halo)})`,
        background: "radial-gradient(ellipse at 50% 50%, rgba(128,1,31,0.22) 0%, rgba(128,1,31,0.07) 45%, rgba(128,1,31,0) 70%)" }} />
      <div style={{ position: "absolute", left: 230, top: 300, width: 620, height: 826, borderRadius: 44, overflow: "hidden", opacity: reveal,
        border: "3px solid rgba(114,0,19,0.25)", boxShadow: "0 40px 90px rgba(45,0,1,0.22)", clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}% round 44px)` }}>
        <Img src={staticFile("fahad-intro/fahad.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${push})`, transformOrigin: "50% 35%" }} />
      </div>
      <Center top={1190}><RiseLine t={t} start={C.fahad} dur={0.55} style={H1}>FAHAD</RiseLine></Center>
      <Center top={1350} style={{ ...H3, opacity: role.opacity, transform: `translateY(${role.ty}px)` }}>
        Digital Marketing <span style={{ color: COLORS.crimson }}>&amp;</span> Growth
      </Center>
      <Center top={1440} style={{ ...LAB, opacity: desc.opacity, transform: `translateY(${desc.ty}px) scale(${1 + 0.06 * yrs})`,
        color: interpolateColors(yrs, [0, 1], ["rgba(63,21,33,0.68)", COLORS.crimson]) }}>
        7+ YEARS  |  DIGITAL MARKETING  |  BUSINESS GROWTH
      </Center>
    </>
  );
};

// ───────────────── 03 · INDUSTRIES ─────────────────
// "…Real Estate, Study Abroad Consultancy এবং বিভিন্ন Local & International Service-based Business…"
const IND: [string, IconName, boolean][] = [
  ["REAL ESTATE", "building", true], ["STUDY ABROAD", "grad", true], ["TRAVEL", "plane", false],
  ["AUTOMOTIVE", "car", false], ["FINANCIAL", "chart", false], ["SERVICE BUSINESSES", "nodes", false],
];
export const IndustriesScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const yrs = fadeUp(t, C.realEstate - 0.55, 0.45, 30);
  const fill = p(t, C.realEstate - 0.4, 1.4, IN_OUT);
  const T = [C.realEstate, C.studyAbroad, C.localIntl, C.localIntl + 0.4, C.localIntl + 0.8, C.service];
  return (
    <>
      <div style={{ position: "absolute", left: 110, top: 290, display: "flex", alignItems: "baseline", gap: 22, opacity: yrs.opacity, transform: `translateY(${yrs.ty}px)` }}>
        <b style={{ fontSize: 170, fontWeight: 800, letterSpacing: "-0.04em", color: COLORS.burgundy, lineHeight: 1 }}>7+</b>
        <span style={LAB}>YEARS OF DIGITAL MARKETING</span>
      </div>
      <div style={{ position: "absolute", left: 110, top: 520, width: 860, height: 6, borderRadius: 3, background: "rgba(114,0,19,0.12)" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: COLORS.crimson, transform: `scaleX(${fill})`, transformOrigin: "left center" }} />
        {[0, 1, 2, 3, 4, 5, 6].map((k) => {
          const s = p(t, C.realEstate - 0.4 + k * 0.2, 0.25, BACK);
          return <div key={k} style={{ position: "absolute", left: k * 139 - 2, top: -9, width: 24, height: 24, borderRadius: "50%", background: COLORS.ivory, border: `4px solid ${COLORS.crimson}`, transform: `scale(${s})` }} />;
        })}
      </div>
      {IND.map(([label, icon, hot], k) => {
        const e = fadeUp(t, T[k] - 0.08, 0.45, 30);
        return (
          <div key={label} style={{ position: "absolute", left: k % 2 ? 550 : 110, top: 600 + Math.floor(k / 2) * 240, width: 420, height: 210, padding: 28,
            display: "flex", flexDirection: "column", justifyContent: "space-between", ...GLASS, borderRadius: 30, ...(hot ? HOT : {}),
            opacity: e.opacity, transform: `translateY(${e.ty}px) scale(${lerp(0.95, 1, e.opacity)})` }}>
            <Icon name={icon} size={64} color={hot ? COLORS.ivory : COLORS.burgundy} />
            <b style={{ fontSize: 34, fontWeight: 800, letterSpacing: "0.04em", lineHeight: 1.15, color: hot ? COLORS.ivory : COLORS.maroon }}>{label}</b>
          </div>
        );
      })}
    </>
  );
};

// ───────────────── 04 · 8 BRANDS → EXPERIENCE → IN-HOUSE ↔ AGENCY → GROWTH ─────────────────
export const BrandsScene: React.FC<SceneProps> = ({ start }) => {
  const t = useT(start);
  const hd = fadeUp(t, C.brands - 0.1);
  const cx = 540, cy = 760, R = 300;
  const exp = pop(t, C.brands + 1.95, 0.5);
  const g = pop(t, C.environment + 0.35, 0.5);
  const e1 = p(t, C.inhouse - 0.08, 0.45), e2 = p(t, C.agency - 0.08, 0.45);
  const swap = fadeUp(t, C.agency + 0.2, 0.3);
  const lines: [string, number, string, number][] = [
    ["M540 850 L290 1126", C.inhouse, "rgba(114,0,19,0.35)", 3], ["M540 850 L790 1126", C.agency, "rgba(114,0,19,0.35)", 3],
    ["M290 1302 C 290 1380, 420 1420, 452 1420", C.environment, COLORS.crimson, 4], ["M790 1302 C 790 1380, 660 1420, 628 1420", C.environment, COLORS.crimson, 4],
  ];
  const env = (label: string, icon: IconName, left: number, k: number, dir: number) => (
    <div style={{ position: "absolute", top: 1130, left, width: 400, height: 170, ...GLASS, borderRadius: 28, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 10, opacity: k, transform: `translateX(${(1 - k) * 40 * dir}px)` }}>
      <Icon name={icon} size={56} />
      <b style={{ fontSize: 32, fontWeight: 800, letterSpacing: "0.04em" }}>{label}</b>
    </div>
  );
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 280, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 20, opacity: hd.opacity, transform: `translateY(${hd.ty}px)` }}>
        <b style={{ fontSize: 140, fontWeight: 800, letterSpacing: "-0.04em", color: COLORS.burgundy, lineHeight: 1 }}>8+</b>
        <span style={LAB}>BRANDS</span>
      </div>
      <svg width={W} height={Hh} style={{ position: "absolute", left: 0, top: 0 }}>
        {lines.map(([d, at, stroke, w], i) => { const s = drawn(d, t, at, 0.45); return <path key={i} d={d} stroke={stroke} strokeWidth={w} fill="none" strokeLinecap="round" strokeDasharray={s.strokeDasharray} strokeDashoffset={s.strokeDashoffset} />; })}
      </svg>
      {[...Array(8)].map((_, k) => {
        const a = -Math.PI / 2 + k * Math.PI / 4;
        const x = cx + Math.cos(a) * R * 1.05, y = cy + Math.sin(a) * R * 0.95;
        const inn = pop(t, C.brands + 0.1 + k * 0.12, 0.35);
        const m = p(t, C.brands + 1.45 + k * 0.03, 0.7, IN);
        return (
          <div key={k} style={{ position: "absolute", left: x, top: y, width: 170, height: 104, ...GLASS, borderRadius: 20, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 22, fontWeight: 800, letterSpacing: "0.1em", color: COLORS.wine, opacity: inn.opacity * (1 - m),
            transform: `translate(-50%, -50%) translate(${(cx - x) * m}px, ${(cy - y) * m}px) scale(${inn.scale * lerp(1, 0.4, m)})` }}>
            BRAND 0{k + 1}
          </div>
        );
      })}
      <Node label="EXPERIENCE" icon="star" x={cx} y={cy} hot opacity={exp.opacity} scale={exp.scale} />
      {env("IN-HOUSE", "building", 90, e1, -1)}
      <div style={{ position: "absolute", left: 510, top: 1190, fontSize: 52, fontWeight: 800, color: COLORS.crimson, opacity: swap.opacity }}>↔</div>
      {env("AGENCY / FREELANCE", "laptop", 590, e2, 1)}
      <Node label="GROWTH" icon="growth" x={540} y={1420} hot opacity={g.opacity} scale={g.scale} />
    </>
  );
};
