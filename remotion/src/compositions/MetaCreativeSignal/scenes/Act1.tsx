/** Act 1 — the creative is born, breaks open, emits signals; real estate A → B; reactions; ranking (0 – 48s). */
import { AbsoluteFill, random } from "remotion";
import {
  ANCHOR, At, canvasPoint, COLORS, CreativeSignalCanvas, curve, Eyebrow, Icon, INK, IN_OUT, lerp, Lines, MARK, ParticleField,
  p, PersonNode, Pill, Pulse, Ripple, SAFE, seg, SystemField, Trail, TYPE, useT, vcurve, CANVAS0,
} from "../../../brand";
import { C } from "../cues";
import { protagonist } from "../protagonist";

type S = React.FC<{ start: number }>;
const at = (st: ReturnType<typeof protagonist>, a: readonly number[]) => canvasPoint(st, a[0], a[1]);

// 01 — "আপনি হয়তো ভাবছেন, Creative-এর কাজ শুধু মানুষকে থামানো।"
export const HookScene: S = ({ start }) => {
  const t = useT(start);
  return (
    <AbsoluteFill>
      <Lines><Trail d={seg(1195, 255, 1330, 190)} t={t} at={C.stop - 0.1} dur={0.35} width={2} labelSide="none" /></Lines>
      <At x={1400} y={180} t={t} at={C.stop} scaleFrom={0.6} dy={0}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999, border: `2px solid ${COLORS.crimson}`, background: COLORS.ivory }}>
          <span style={{ width: 4, height: 14, background: COLORS.crimson, borderRadius: 2 }} /><span style={{ width: 4, height: 14, background: COLORS.crimson, borderRadius: 2 }} />
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.24em", color: COLORS.crimson }}>STOP</span>
        </div>
      </At>
      <At x={1400} y={232} t={t} at={C.stop + 0.45}><span style={{ ...TYPE.label, fontSize: 14, color: INK.faint }}>layer 1 of many</span></At>
    </AbsoluteFill>
  );
};

// 02 — "কিন্তু Meta Ads-এর AI-driven world-এ Creative-এর কাজ তার চেয়ে অনেক বড়।"
const LAYERS = [
  { l: "PROBLEM", x: 560, y: 230, ex: -1, ey: -0.6 }, { l: "DESIRE", x: 1380, y: 210, ex: 1, ey: -0.7 },
  { l: "CONTEXT", x: 470, y: 800, ex: -1, ey: 0.5 }, { l: "VALUE", x: 1450, y: 830, ex: 1, ey: 0.6 },
];
export const BreakOpenScene: S = ({ start }) => {
  const t = useT(start);
  return (
    <AbsoluteFill>
      <Lines>
        {LAYERS.map((L, i) => {
          const d = seg(L.x + L.ex * 90, L.y + L.ey * 30, L.x + L.ex * 520, L.y + L.ey * 260);
          return (
            <g key={L.l}>
              <Trail d={d} t={t} at={C.bigger + i * 0.12} dur={0.9} labelSide="none" />
              {[0, 1, 2, 3].map((j) => <Pulse key={j} d={d} t={t} at={C.bigger + 0.5 + i * 0.12 + j * 0.45} dur={0.9} r={5} />)}
            </g>
          );
        })}
        {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => {
          const d = curve(960 + sx * 120, 540 + sy * 150, 960 + sx * 420, 540 + sy * 380);
          return <Pulse key={i} d={d} t={t} at={C.bigger + 0.2 + i * 0.2} dur={1.1} r={5} />;
        })}
      </Lines>
      {LAYERS.map((L, i) => {
        const k = p(t, C.aiDriven + 0.8 + i * 0.15, 0.8, IN_OUT);
        return (
          <div key={L.l} style={{ position: "absolute", left: lerp(960, L.x, k), top: lerp(540, L.y, k), transform: `translate(-50%,-50%) rotate(${L.ex * 4 * (1 - k)}deg)`, opacity: k }}>
            <div style={{ padding: "14px 26px", borderRadius: 16, background: "rgba(255,255,255,0.7)", border: `2px solid rgba(128,1,31,0.35)`, boxShadow: "0 18px 40px rgba(45,0,1,0.08)",
              fontSize: 20, fontWeight: 800, letterSpacing: "0.24em", color: COLORS.burgundy }}>{L.l}</div>
          </div>
        );
      })}
      <At x={960} y={985} t={t} at={C.muchBigger} dy={10}>
        <div style={{ ...TYPE.label, fontSize: 22, color: INK.strong }}>Creative <span style={{ color: COLORS.crimson }}>→</span> Signal</div>
      </At>
    </AbsoluteFill>
  );
};

// 03 — "Creative শুধু আপনার offer দেখায় না— এটা Meta-কে বুঝতেও সাহায্য করে, এই ad-টা কোন ধরনের মানুষের কাছে relevant হতে পারে।"
export const CLUSTERS = [
  { x: 1180, y: 360, l: "FAMILY" }, { x: 1600, y: 330, l: "INVESTOR" }, { x: 1200, y: 760, l: "FIRST-TIME BUYER" }, { x: 1610, y: 740, l: "LOCATION-DRIVEN" },
];
export const UnderstandScene: S = ({ start }) => {
  const t = useT(start);
  const st = protagonist(t);
  const gather = p(t, C.whichPeople + 0.2, 1.6, IN_OUT);
  const srcs = [ANCHOR.image, ANCHOR.headR, ANCHOR.cta].map((a) => at(st, a));
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 1040, top: 140 }}><Eyebrow t={t} at={C.metaUnderstands}>Conceptual signal field</Eyebrow></div>
      <Lines>
        {srcs.map(([x, y], i) => {
          const d = curve(x + 20, y, 1060, 400 + i * 140);
          return (
            <g key={i}>
              <Trail d={d} t={t} at={C.metaUnderstands + i * 0.15} dur={0.7} labelSide="none" width={2} />
              {[0, 1, 2, 3, 4, 5].map((j) => <Pulse key={j} d={d} t={t} at={C.metaUnderstands + 0.4 + i * 0.2 + j * 0.7} dur={0.8} r={4.5} />)}
            </g>
          );
        })}
        <ParticleField t={t} n={90} box={[1040, 230, 720, 640]} seed="field" appear={C.metaUnderstands} source={{ x: 1060, y: 540, at: C.metaUnderstands + 0.3 }} clusters={CLUSTERS} gather={gather} />
        {CLUSTERS.map((c, i) => <Ripple key={c.l} x={c.x} y={c.y} t={t} k={p(t, C.relevant + i * 0.1, 0.5)} level={0.9} base={70} speed={0.5} />)}
      </Lines>
      {CLUSTERS.map((c, i) => (
        <At key={c.l} x={c.x} y={c.y + 105} t={t} at={C.people - 0.2 + i * 0.12}><span style={{ ...TYPE.label, fontSize: 16, color: INK.strong }}>{c.l}</span></At>
      ))}
      <At x={1400} y={960} t={t} at={C.relevant + 0.3}><span style={{ ...TYPE.label, fontSize: 15, color: COLORS.crimson }}>relevance patterns — not one chosen person</span></At>
    </AbsoluteFill>
  );
};

// 04 — "ধরুন … Real Estate ad বানালেন। একটা Creative-এ শুধু লিখলেন— ‘Premium Apartment for Sale in Dhaka.’"
const signalPos = (i: number) => [1420, 270 + i * 135] as const;
export const CreativeAScene: S = ({ start }) => {
  const t = useT(start);
  const st = protagonist(t);
  const collapse = p(t, C.realEstate, 0.9, IN_OUT);
  const A = [
    { l: "PREMIUM", from: [70, 418] as const, at: C.headlineA + 0.4 },
    { l: "PROPERTY", from: ANCHOR.image, at: C.headlineA + 0.9 },
    { l: "LOCATION", from: [140, 455] as const, at: C.dhakaA + 0.05 },
  ];
  return (
    <AbsoluteFill>
      <Lines>
        <ParticleField t={t} n={90} box={[1040, 230, 720, 640]} seed="field" appear={-10} clusters={CLUSTERS} gather={1} collapse={{ x: st.x, y: st.y, k: collapse }} />
      </Lines>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={C.reWord}>Example · real estate</Eyebrow></div>
      <At x={SAFE.x} y={250} anchor="left" t={t} at={C.creativeA}><Pill size={17}>Creative A</Pill></At>
      <Lines>
        {A.map((a, i) => {
          const [x, y] = at(st, a.from);
          const [ex, ey] = signalPos(i);
          return <Trail key={a.l} d={curve(x, y, ex, ey)} t={t} at={a.at} dur={0.7} label={a.l} />;
        })}
      </Lines>
      <At x={1420} y={700} t={t} at={C.dhakaA + 0.4}><span style={{ ...TYPE.label, fontSize: 15, color: INK.faint }}>product-only signals</span></At>
    </AbsoluteFill>
  );
};

// 05 — "আরেকটা Creative-এ বললেন— ‘নিজের পরিবারের জন্য ঢাকাতে ৩ Bedroom Apartment খুঁজছেন?’"
export const CreativeBScene: S = ({ start }) => {
  const t = useT(start);
  const st = protagonist(t);
  const B = [
    { l: "FAMILY", from: [120, 320] as const, at: C.family + 0.2 },
    { l: "DHAKA", from: [240, 420] as const, at: C.dhakaB },
    { l: "3 BEDROOM", from: [70, 98] as const, at: C.bedroom + 0.1 },
    { l: "HOME", from: ANCHOR.image, at: C.home },
  ];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={-10}>Example · real estate</Eyebrow></div>
      <At x={SAFE.x} y={250} anchor="left" t={t} at={C.creativeB}><Pill size={17} hot={1}>Creative B · same canvas</Pill></At>
      {/* creative A's signals fade out as the canvas morphs */}
      <div style={{ opacity: 1 - p(t, C.creativeB + 0.2, 0.6) }}>
        {["PREMIUM", "PROPERTY", "LOCATION"].map((l, i) => (
          <div key={l} style={{ position: "absolute", left: signalPos(i)[0], top: signalPos(i)[1], transform: "translate(-50%,-50%)" }}><Pill size={15} hot={1}>{l}</Pill></div>
        ))}
      </div>
      <Lines>
        {B.map((b, i) => {
          const [x, y] = at(st, b.from);
          return <Trail key={b.l} d={curve(x, y, 1450, 250 + i * 140)} t={t} at={b.at} dur={0.7} label={b.l} />;
        })}
      </Lines>
      <At x={1450} y={830} t={t} at={C.home + 0.3}><span style={{ ...TYPE.label, fontSize: 15, color: COLORS.crimson }}>product + customer context</span></At>
    </AbsoluteFill>
  );
};

// 06 — "দুটোতেই একই apartment। কিন্তু problem, desire আর context আলাদা। আর এটাই গুরুত্বপূর্ণ।"
const Behavior: React.FC<{ kind: "problem" | "desire" | "context"; t: number; k: number }> = ({ kind, t, k }) => {
  if (kind === "problem") {
    const sq = 0.5 + 0.5 * Math.sin(t * 2.4);
    const w = lerp(170, 120, sq * k);
    return (
      <svg width={220} height={130} viewBox="-110 -65 220 130">
        <rect x={-w / 2} y={-45} width={w} height={90} rx={10} fill="rgba(114,0,19,0.06)" stroke={COLORS.burgundy} strokeWidth={3} />
        <path d={`M ${-w / 2 - 34} 0 L ${-w / 2 - 8} 0 M ${-w / 2 - 16} -8 L ${-w / 2 - 8} 0 L ${-w / 2 - 16} 8`} stroke={COLORS.crimson} strokeWidth={3} fill="none" strokeLinecap="round" />
        <path d={`M ${w / 2 + 34} 0 L ${w / 2 + 8} 0 M ${w / 2 + 16} -8 L ${w / 2 + 8} 0 L ${w / 2 + 16} 8`} stroke={COLORS.crimson} strokeWidth={3} fill="none" strokeLinecap="round" />
        {[-1, 0, 1].map((i) => <g key={i} transform={`translate(${i * w * 0.22} 18)`}><circle cy={-26} r={7} fill={COLORS.maroon} /><path d="M -9 6 Q -9 -16 0 -16 Q 9 -16 9 6 Z" fill={COLORS.maroon} /></g>)}
      </svg>
    );
  }
  if (kind === "desire") {
    return (
      <svg width={220} height={130} viewBox="-110 -65 220 130">
        {[0, 1, 2].map((i) => { const r = (t * 0.5 + i / 3) % 1; return <circle key={i} r={18 + r * 60} fill="none" stroke={COLORS.crimson} strokeWidth={2} opacity={(1 - r) * 0.6 * k} />; })}
        <g transform={`scale(${lerp(0.7, 1.1, k)})`}>
          <path d="M -26 8 L 0 -18 L 26 8 L 26 30 L -26 30 Z" fill={COLORS.burgundy} />
          <rect x={-7} y={14} width={14} height={16} fill={COLORS.ivory} />
        </g>
      </svg>
    );
  }
  const items = ["pin", "family", "home"] as const;
  return (
    <div style={{ width: 220, height: 130, position: "relative" }}>
      {items.map((ic, i) => {
        const a = t * 0.9 + (i / 3) * Math.PI * 2;
        return <div key={ic} style={{ position: "absolute", left: 110 + Math.cos(a) * 70 * k - 22, top: 65 + Math.sin(a) * 34 * k - 22, width: 44, height: 44, borderRadius: "50%", background: "#fff", border: `2px solid ${INK.line}`, display: "grid", placeItems: "center" }}><Icon name={ic} size={26} /></div>;
      })}
      <div style={{ position: "absolute", left: 96, top: 51, width: 28, height: 28, borderRadius: "50%", background: COLORS.crimson }} />
    </div>
  );
};
export const TwoWorldsScene: S = ({ start }) => {
  const t = useT(start);
  const st = protagonist(t);
  const split = p(t, C.sameApartment, 1.1, IN_OUT);
  const ghost = { ...CANVAS0, build: 1, typeA: 1, x: lerp(1300, 620, split), y: 430, s: 0.62, o: split };
  const beh = [
    { kind: "problem" as const, l: "Problem", cap: "Need more family space", at: C.problem, x: 1010 },
    { kind: "desire" as const, l: "Desire", cap: "A better home", at: C.desire, x: 1300 },
    { kind: "context" as const, l: "Context", cap: "3-bed family home · Dhaka", at: C.context, x: 1600 },
  ];
  const [bx, by] = canvasPoint(st, 230, 600);
  const imp = p(t, C.important, 0.5);
  return (
    <AbsoluteFill>
      <CreativeSignalCanvas st={ghost} t={t} />
      <At x={960} y={110} t={t} at={C.sameApartment + 0.2} dy={0}>
        <div style={{ ...TYPE.title, fontSize: 58, whiteSpace: "nowrap" }}>Same apartment. <span style={{ ...MARK, background: `rgba(128,1,31,${imp})`, color: imp > 0.5 ? COLORS.ivory : COLORS.crimson }}>Different meaning.</span></div>
      </At>
      <Lines>
        <Trail d={seg(800, 330, 1120, 330)} t={t} at={C.sameApartment + 0.7} dur={0.5} hot={0} labelSide="none" width={2} />
        {beh.map((b) => <Trail key={b.l} d={vcurve(bx, by + 4, b.x, 760)} t={t} at={b.at - 0.25} dur={0.45} labelSide="none" width={2} />)}
      </Lines>
      <At x={960} y={330} t={t} at={C.sameApartment + 0.9}><span style={{ fontSize: 34, fontWeight: 800, color: INK.muted }}>=</span></At>
      <At x={620} y={665} t={t} at={C.sameApartment + 0.8}><span style={{ ...TYPE.label, fontSize: 20, color: INK.body }}>Product</span></At>
      <At x={1300} y={665} t={t} at={C.sameApartment + 0.9}><span style={{ ...TYPE.label, fontSize: 20, color: COLORS.crimson }}>Product + context</span></At>
      {beh.map((b) => {
        const k = p(t, b.at, 0.7, IN_OUT);
        return (
          <div key={b.l} style={{ position: "absolute", left: b.x, top: 850, transform: "translate(-50%,-50%)", opacity: k, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ ...TYPE.label, fontSize: 17, color: COLORS.crimson }}>{b.l}</span>
            <Behavior kind={b.kind} t={t} k={k} />
            <span style={{ fontSize: 19, fontWeight: 700, color: INK.strong, whiteSpace: "nowrap" }}>{b.cap}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// 07 — "কারণ একজন মানুষ কী ধরনের message-এ engage করছে, সেটা advertising system-এর জন্য একটা signal তৈরি করতে পারে।"
const PEOPLE = Array.from({ length: 15 }, (_, i) => ({
  x: 790 + (i % 5) * 130 + (Math.floor(i / 5) % 2) * 60 + (random(`px${i}`) - 0.5) * 30,
  y: 300 + Math.floor(i / 5) * 210 + (random(`py${i}`) - 0.5) * 40,
  r: [2, 0, 1, 0, 1, 0, 1, 2, 0, 0, 1, 0, 2, 1, 0][i],
}));
export const EngagementScene: S = ({ start }) => {
  const t = useT(start);
  const st = protagonist(t);
  const [cx, cy] = canvasPoint(st, 460, 300);
  const sys = { x: 1690, y: 540 };
  const strong = PEOPLE.filter((q) => q.r === 2);
  const toSys = `M ${cx - 140} ${cy - 210} C ${cx} ${70}, ${sys.x - 300} ${80}, ${sys.x} ${sys.y - 150}`;
  return (
    <AbsoluteFill>
      <Lines>
        {/* message waves */}
        {[0, 1, 2, 3].map((i) => {
          const r = ((t - C.because) * 0.45 + i / 4) % 1;
          return t > C.because + 0.2 ? <path key={i} d={`M ${cx + 10 + r * 900} ${cy - 260} Q ${cx + 70 + r * 900} ${cy} ${cx + 10 + r * 900} ${cy + 260}`} fill="none" stroke={COLORS.crimson} strokeWidth={2} opacity={(1 - r) * 0.35 * p(t, C.because + 0.2, 0.5)} /> : null;
        })}
        {PEOPLE.map((q, i) => (
          <PersonNode key={i} x={q.x} y={q.y} t={t} k={p(t, C.engage + (q.x - 790) / 1400, 0.5)} reaction={t > C.engage + (q.x - 790) / 1400 ? q.r : 0} size={1.15} />
        ))}
        {/* signal loop: response → back to creative → into the system */}
        {strong.map((q, i) => <Pulse key={`b${i}`} d={curve(q.x, q.y - 20, cx + 10, cy - 40 + i * 40)} t={t} at={C.advertising + i * 0.12} dur={0.8} />)}
        <Trail d={toSys} t={t} at={C.advertising + 0.9} dur={1.0} label="SIGNAL" />
        {[0, 1, 2].map((j) => strong.map((q, i) => <Pulse key={`l${j}${i}`} d={curve(q.x, q.y - 20, cx + 10, cy - 40 + i * 40)} t={t} at={C.signal + 0.6 + j * 1.0 + i * 0.12} dur={0.7} r={6} />))}
        {[0, 1, 2].map((j) => <Pulse key={`s${j}`} d={toSys} t={t} at={C.signal + 1.2 + j * 1.0} dur={0.8} r={7} />)}
        <SystemField x={sys.x} y={sys.y} t={t} k={p(t, C.advertising, 0.6)} r={120} active={p(t, C.signal, 0.5)} label="SYSTEM" />
      </Lines>
      <At x={cx - 140} y={cy + 230} t={t} at={C.because + 0.2}><span style={{ ...TYPE.label, fontSize: 15, color: INK.strong }}>Creative · message</span></At>
      <At x={1100} y={160} t={t} at={C.message}><span style={{ ...TYPE.label, fontSize: 15, color: INK.strong }}>People react differently</span></At>
      <At x={1100} y={985} t={t} at={C.engage + 0.6}>
        <div style={{ display: "flex", gap: 34, alignItems: "center", ...TYPE.label, fontSize: 14 }}>
          {[["rgba(114,0,19,0.18)", "Low reaction"], ["rgba(114,0,19,0.45)", "Interest"], [COLORS.burgundy, "Stronger engagement"]].map(([c, l]) => (
            <span key={l} style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 16, height: 16, borderRadius: "50%", background: c }} />{l}</span>
          ))}
        </div>
      </At>
      <At x={sys.x} y={sys.y + 175} t={t} at={C.signal}><span style={{ ...TYPE.label, fontSize: 14, color: COLORS.crimson }}>Response → signal → system</span></At>
    </AbsoluteFill>
  );
};

// 08 — "Meta নিজেই বলছে তাদের newer ranking models … longer user-behavior sequences … organic engagement data…"
const CANDS = ["A", "B", "C", "D", "E"];
const RANK1 = [2, 0, 4, 1, 3]; // candidate index per rank, after the first pass
const RANK2 = [1, 2, 0, 4, 3]; // after richer behavioural context
const STEPS = ["View", "Pause", "Engage", "Explore", "Return"];
export const RankingScene: S = ({ start }) => {
  const t = useT(start);
  const field = { x: 900, y: 430 };
  const r1 = p(t, C.ranking + 0.3, 1.0, IN_OUT);
  const r2 = p(t, C.data + 0.5, 1.1, IN_OUT);
  const seqPath = "M 180 860 C 380 800, 520 920, 720 860 S 1060 800, 1260 860 S 1480 900, 1560 860";
  const stepX = [240, 520, 820, 1110, 1400];
  const rowY = (cand: number) => {
    const a = 210 + cand * 112;
    const b = 210 + RANK1.indexOf(cand) * 112;
    const c = 210 + RANK2.indexOf(cand) * 112;
    return lerp(lerp(a, b, r1), c, r2);
  };
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 30 }}><Eyebrow t={t} at={C.metaSays}>Illustrative ranking model · simplified</Eyebrow></div>
      {CANDS.map((c, i) => (
        <div key={c} style={{ position: "absolute", left: 0, top: 0 }}>
          <CreativeSignalCanvas t={t} labels={false} st={{ ...CANVAS0, build: p(t, C.metaSays + 0.2 + i * 0.12, 0.6), typeA: 1, showB: i % 2, typeB: 1, family: i % 2, bg: i, x: 260, y: 230 + i * 128, s: 0.19 }} />
        </div>
      ))}
      <Lines>
        {CANDS.map((c, i) => {
          const d = curve(310, 230 + i * 128, field.x - 150, field.y);
          return [0, 1, 2, 3].map((j) => <Pulse key={`${c}${j}`} d={d} t={t} at={C.metaSays + 0.6 + i * 0.15 + j * 0.9} dur={0.8} r={4.5} />);
        })}
        <SystemField x={field.x} y={field.y} t={t} k={p(t, C.metaSays + 0.3, 0.6)} r={140} active={r2} label="RANKING" />
        {CANDS.map((c, i) => <Pulse key={`o${c}`} d={curve(field.x + 150, field.y, 1340, rowY(i))} t={t} at={C.ranking + 0.1 + i * 0.1} dur={0.6} r={5} />)}
        {/* behaviour sequence */}
        <Trail d={seqPath} t={t} at={C.sequences} dur={1.8} labelSide="none" width={3} />
        {STEPS.map((s, i) => <circle key={s} cx={stepX[i]} cy={860 + [0, 18, 6, -10, 8][i]} r={9} fill={COLORS.burgundy} opacity={p(t, C.sequences + 0.15 + i * 0.32, 0.3)} />)}
        {Array.from({ length: 12 }, (_, i) => {
          const x = 260 + i * 105;
          return <Pulse key={`g${i}`} d={`M ${x} ${700 + random(`og${i}`) * 40} L ${x + 20} 862`} t={t} at={C.organic + i * 0.12} dur={0.6} r={4} />;
        })}
        <Trail d={`M 1560 860 C 1680 860, 1700 640, ${field.x + 120} ${field.y + 100}`} t={t} at={C.data} dur={0.9} labelSide="none" width={3} />
        {[0, 1, 2].map((j) => <Pulse key={`d${j}`} d={`M 1560 860 C 1680 860, 1700 640, ${field.x + 120} ${field.y + 100}`} t={t} at={C.data + 0.4 + j * 0.5} dur={0.9} r={6} />)}
      </Lines>
      {STEPS.map((s, i) => (
        <At key={s} x={stepX[i]} y={905 + [0, 18, 6, -10, 8][i]} t={t} at={C.sequences + 0.15 + i * 0.32}><span style={{ ...TYPE.label, fontSize: 14, color: INK.strong }}>{s}</span></At>
      ))}
      <At x={SAFE.x} y={790} anchor="left" t={t} at={C.sequences}><span style={{ ...TYPE.label, fontSize: 15, color: COLORS.crimson }}>Longer behaviour sequence</span></At>
      <At x={760} y={735} t={t} at={C.organic}><span style={{ ...TYPE.label, fontSize: 14 }}>+ organic engagement signals</span></At>
      {/* ranked relevance field */}
      <At x={1550} y={150} t={t} at={C.ranking}><span style={{ ...TYPE.label, fontSize: 15, color: INK.strong }}>Relevance order</span></At>
      {CANDS.map((c, i) => {
        const rank = r2 > 0.5 ? RANK2.indexOf(i) : RANK1.indexOf(i);
        return (
          <div key={c} style={{ position: "absolute", left: 1360, top: rowY(i) - 34, width: 380, opacity: p(t, C.ranking + 0.2 + i * 0.08, 0.4) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 18px", borderRadius: 16, background: rank === 0 ? COLORS.burgundy : "#fff", border: `2px solid ${INK.line}`, color: rank === 0 ? COLORS.ivory : INK.strong }}>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.12em", width: 150, whiteSpace: "nowrap" }}>CREATIVE {c}</span>
              <div style={{ flex: 1, height: 8, borderRadius: 8, background: rank === 0 ? "rgba(251,252,235,0.25)" : "rgba(114,0,19,0.1)" }}>
                <div style={{ width: `${100 - rank * 17}%`, height: "100%", borderRadius: 8, background: rank === 0 ? COLORS.ivory : COLORS.crimson, opacity: 0.85 }} />
              </div>
            </div>
          </div>
        );
      })}
      <At x={1550} y={790} t={t} at={C.using}><span style={{ ...TYPE.label, fontSize: 13, color: COLORS.crimson, whiteSpace: "nowrap" }}>More behavioural context → more informed estimate</span></At>
    </AbsoluteFill>
  );
};
