/** Act 2 — relevance, fake vs real diversification, the framework, strategy, material, close (48 – 108.3s). */
import { AbsoluteFill } from "remotion";
import {
  At, BACK, CANVAS0, canvasPoint, COLORS, CreativeSignalCanvas, curve, drawn, Icon, IconName, INK, IN_OUT, lerp, Lines,
  MARK, p, PersonNode, Pill, Pulse, Ripple, SAFE, seg, SystemField, Trail, TYPE, useT, Wipe,
} from "../../../brand";
import { C } from "../cues";
import { protagonist } from "../protagonist";

type S = React.FC<{ start: number }>;

// 09 — "তাই Creative এখন শুধু ‘দেখতে সুন্দর কি না’ … প্রশ্ন হলো— এই Creative কোন customer-এর সঙ্গে কোন problem-এর মাধ্যমে connect করছে?"
const MSGS = [
  { m: "3-bed family home", via: "problem", y: 330, to: 0 },
  { m: "Strong rental value", via: "value", y: 560, to: 1 },
  { m: "Flexible payment plan", via: "objection", y: 790, to: 2 },
];
const CUSTS = ["Family", "Investor", "First-time buyer", "Location-driven"];
export const RelevanceScene: S = ({ start }) => {
  const t = useT(start);
  const st = protagonist(t);
  const q = p(t, C.question, 0.8, IN_OUT);
  const [ox, oy] = canvasPoint(st, 460, 300);
  return (
    <AbsoluteFill>
      <At x={960} y={lerp(170, 120, q)} t={t} at={C.beautiful} out={C.question} dy={0}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 22px", borderRadius: 999, border: `2px solid ${INK.line}`, background: "#fff", fontSize: 20, fontWeight: 800, letterSpacing: "0.18em", color: INK.strong }}>
          GOOD LOOKING? <span style={{ opacity: p(t, C.beautiful + 0.5, 0.3) }}><Icon name="check" size={30} color={COLORS.crimson} stroke={2} /></span>
        </div>
      </At>
      <At x={960} y={130} t={t} at={C.question + 0.15} scaleFrom={1.25} dy={0}>
        <div style={{ ...TYPE.hero, fontSize: 92, whiteSpace: "nowrap" }}>Relevant <span style={MARK}>to whom?</span></div>
      </At>
      <Lines>
        {MSGS.map((m, i) => <Trail key={m.m} d={curve(ox, oy, 930, m.y)} t={t} at={C.whichCustomer + i * 0.25} dur={0.6} labelSide="none" />)}
        {MSGS.map((m, i) => {
          const cy = 290 + m.to * 175;
          const d = curve(1250, m.y, 1490, cy);
          return (
            <g key={`c${i}`}>
              <Trail d={d} t={t} at={C.viaProblem + i * 0.35} dur={0.6} labelSide="none" />
              {[0, 1, 2].map((j) => <Pulse key={j} d={d} t={t} at={C.connect + i * 0.2 + j * 0.9} dur={0.7} r={5} />)}
            </g>
          );
        })}
        {CUSTS.map((c, i) => {
          const lit = i < 3 ? p(t, C.viaProblem + 0.5 + i * 0.35, 0.4) : 0;
          return <g key={c} opacity={p(t, C.customer + i * 0.1, 0.4)}><PersonNode x={1560} y={300 + i * 175} t={t} k={lit} reaction={i < 3 && lit > 0 ? 2 : 0} size={1.2} /></g>;
        })}
      </Lines>
      {MSGS.map((m, i) => (
        <At key={m.m} x={1090} y={m.y} t={t} at={C.whichCustomer + 0.3 + i * 0.25}>
          <div style={{ padding: "12px 20px", borderRadius: 14, background: "#fff", border: `2px solid ${INK.line}`, boxShadow: "0 12px 30px rgba(45,0,1,0.06)" }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.2em", color: COLORS.crimson }}>VIA {m.via.toUpperCase()}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK.strong, whiteSpace: "nowrap" }}>{m.m}</div>
          </div>
        </At>
      ))}
      {CUSTS.map((c, i) => (
        <At key={c} x={1640} y={300 + i * 175} anchor="left" t={t} at={C.customer + i * 0.1} dx={20} dy={0}>
          <span style={{ ...TYPE.label, fontSize: 16, color: i < 3 && t > C.viaProblem + 0.5 + i * 0.35 ? COLORS.crimson : INK.muted }}>{c}</span>
        </At>
      ))}
      <At x={960} y={985} t={t} at={C.connect + 0.4}><span style={{ ...TYPE.label, fontSize: 16, color: INK.strong }}>Not every message connects with every customer</span></At>
    </AbsoluteFill>
  );
};

// 10 — "আর এখানেই একটা বড় ভুল হয়। অনেকে দশটা creative বানায়— একই ছবি, একই headline, শুধু background বদলেছে। এটা Creative Diversification না।"
export const ClonesScene: S = ({ start }) => {
  const t = useT(start);
  const collapse = p(t, C.notDiversification + 0.15, 0.9, IN_OUT);
  const scan = p(t, C.background + 0.35, 1.1, IN_OUT);
  const cycle = t > C.background ? Math.floor((t - C.background) * 4) : 0;
  const results = ["Same message", "Same context", "Low diversification"];
  return (
    <AbsoluteFill>
      {Array.from({ length: 10 }, (_, i) => {
        const k = p(t, C.tenCreatives + 0.25 + i * 0.12, 0.6, IN_OUT);
        const x = lerp(960, 330 + i * 140, k);
        const y = 520 + Math.sin(i * 1.7) * 18 * k;
        const st = { ...CANVAS0, build: i === 0 ? p(t, C.tenCreatives - 0.2, 0.6) : 1, typeA: 1, x: lerp(x, 960, collapse), y: lerp(y, 520, collapse), s: 0.5, rot: (i - 4.5) * 1.2 * k * (1 - collapse),
          o: i === 0 ? 1 : Math.min(1, k * 1.5) * (1 - collapse), bg: t > C.background ? (i + cycle) % 4 + 1 : 0 };
        return (
          <div key={i}>
            <CreativeSignalCanvas st={st} t={t} labels={false} />
            {/* identical-part markers */}
            {[{ cue: C.sameImage, ly: 214, h: 300 }, { cue: C.sameHeadline, ly: 420, h: 100 }].map((m, j) => {
              const [mx, my] = canvasPoint(st, 230, m.ly);
              const on = p(t, m.cue, 0.3) * (1 - p(t, C.notDiversification, 0.3));
              return <div key={j} style={{ position: "absolute", left: mx - 115, top: my - (m.h * 0.5) / 2, width: 230, height: m.h * 0.5, border: `3px solid ${COLORS.crimson}`, borderRadius: 10, opacity: on * st.o * 0.8 }} />;
            })}
          </div>
        );
      })}
      {[{ l: "Same image", cue: C.sameImage, x: 560 }, { l: "Same headline", cue: C.sameHeadline, x: 960 }, { l: "Only the background changes", cue: C.background, x: 1360 }].map((m) => (
        <At key={m.l} x={m.x} y={175} t={t} at={m.cue} out={C.notDiversification}><Pill size={17} hot={m.cue === C.background ? 0 : 1}>{m.l}</Pill></At>
      ))}
      {/* diagnostic scanner */}
      <div style={{ position: "absolute", left: lerp(220, 1700, scan), top: 230, width: 4, height: 620, background: COLORS.crimson, opacity: scan > 0 && scan < 1 ? 0.8 : 0, boxShadow: "0 0 30px rgba(128,1,31,0.4)" }} />
      <div style={{ position: "absolute", left: 220, top: 230, width: lerp(0, 1480, scan), height: 620, background: "rgba(128,1,31,0.04)", opacity: 1 - collapse }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 880, display: "flex", justifyContent: "center", gap: 22, opacity: 1 - p(t, C.notDiversification, 0.3) }}>
        {results.map((r, i) => (
          <span key={r} style={{ opacity: p(t, C.background + 0.6 + i * 0.25, 0.25) }}><Pill size={20} outline>{r}</Pill></span>
        ))}
      </div>
      <At x={960} y={900} t={t} at={C.notDiversification + 0.7} scaleFrom={1.2} dy={0}>
        <div style={{ ...TYPE.hero, fontSize: 92, whiteSpace: "nowrap" }}>Not <span style={MARK}>diversification.</span></div>
      </At>
    </AbsoluteFill>
  );
};

// 11–12 — "Creative diversification মানে হতে পারে— different problem / desire / objection / value proposition / customer context" → constellation
type WorldKind = "problem" | "desire" | "objection" | "value" | "context";
const WORLDS: { kind: WorldKind; label: string; head: string; at: number }[] = [
  { kind: "problem", label: "Different problem", head: "Too cramped for your growing family?", at: C.dProblem },
  { kind: "desire", label: "Different desire", head: "Wake up in the home you imagined.", at: C.dDesire },
  { kind: "objection", label: "Different objection", head: "Clear pricing. Easy installments.", at: C.dObjection },
  { kind: "value", label: "Different value proposition", head: "Schools, park & market — minutes away.", at: C.dValue },
  { kind: "context", label: "Different customer context", head: "First home? Built for new families.", at: C.dContext },
];
const WorldArt: React.FC<{ kind: WorldKind; t: number; k: number }> = ({ kind, t, k }) => {
  const W = 300, H = 190;
  if (kind === "problem") {
    const sq = (0.5 + 0.5 * Math.sin(t * 2.6)) * k;
    const w = lerp(240, 170, sq);
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#F4E8E3" />
        <rect x={(W - w) / 2} y={30} width={w} height={130} rx={8} fill="#fff" stroke={COLORS.burgundy} strokeWidth={3} />
        {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${W / 2 + (i - 1.5) * w * 0.2} 150)`}><circle cy={-44} r={9} fill={COLORS.maroon} /><path d="M -12 0 Q -12 -32 0 -32 Q 12 -32 12 0 Z" fill={COLORS.maroon} /></g>)}
      </svg>
    );
  }
  if (kind === "desire") {
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#F7EFE0" />
        {[0, 1, 2].map((i) => { const r = (t * 0.4 + i / 3) % 1; return <circle key={i} cx={W / 2} cy={110} r={30 + r * 120} fill="none" stroke={COLORS.crimson} strokeWidth={2} opacity={(1 - r) * 0.5} />; })}
        <circle cx={W / 2} cy={lerp(150, 80, k)} r={30} fill={COLORS.crimson} opacity={0.25} />
        <path d={`M ${W / 2 - 50} 150 L ${W / 2} ${lerp(140, 100, k)} L ${W / 2 + 50} 150 Z`} fill={COLORS.burgundy} />
        <rect x={W / 2 - 40} y={148} width={80} height={30} fill={COLORS.burgundy} />
        <rect width={W} height={14} y={H - 14} fill={COLORS.maroon} opacity={0.15} />
      </svg>
    );
  }
  if (kind === "objection") {
    const split = p(t % 3, 0.6, 1.2, IN_OUT) * k;
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#F2ECDD" />
        <g transform={`translate(${W / 2} 70) rotate(${Math.sin(t * 2) * 6 * (1 - split)})`}>
          <path d="M -60 -22 L 40 -22 L 62 0 L 40 22 L -60 22 Z" fill="#fff" stroke={COLORS.burgundy} strokeWidth={3} />
          <circle cx={42} cy={0} r={5} fill={COLORS.burgundy} />
          <text x={-10} y={8} textAnchor="middle" fontSize={22} fontWeight={800} fill={COLORS.burgundy}>PRICE?</text>
        </g>
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={40 + i * 46 + split * i * 4} y={130} width={40} height={30} rx={6} fill={i <= Math.floor(split * 5) ? COLORS.burgundy : "rgba(114,0,19,0.15)"} />)}
      </svg>
    );
  }
  if (kind === "value") {
    const icons: IconName[] = ["grad", "pool", "tag", "car"];
    return (
      <div style={{ width: W, height: H, background: "#F5EBE7", position: "relative", overflow: "hidden" }}>
        <svg width={W} height={H} style={{ position: "absolute" }}>
          {[1, 2].map((m) => <circle key={m} cx={W / 2} cy={H / 2} r={42 * m} fill="none" stroke={COLORS.burgundy} strokeWidth={1.5} strokeDasharray="3 7" opacity={0.5} />)}
        </svg>
        <div style={{ position: "absolute", left: W / 2 - 22, top: H / 2 - 26 }}><Icon name="pin" size={44} color={COLORS.crimson} stroke={2} /></div>
        {icons.map((ic, i) => {
          const a = t * 0.6 + (i / 4) * Math.PI * 2;
          return <div key={ic} style={{ position: "absolute", left: W / 2 + Math.cos(a) * 84 * k - 18, top: H / 2 + Math.sin(a) * 66 * k - 18, width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", border: `2px solid ${INK.line}` }}><Icon name={ic} size={22} /></div>;
        })}
      </div>
    );
  }
  const who = ["Family", "Investor", "First-time"];
  const active = Math.floor(t / 0.9) % 3;
  return (
    <div style={{ width: W, height: H, background: "#F2E7EA", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
      {who.map((w, i) => (
        <div key={w} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transform: `scale(${i === active ? 1.15 : 0.9})`, opacity: i === active ? 1 : 0.45 }}>
          <svg width={50} height={56} viewBox="-25 -32 50 56"><circle cy={-16} r={11} fill={i === active ? COLORS.burgundy : COLORS.wine} /><path d="M -20 22 Q -20 -2 0 -2 Q 20 -2 20 22 Z" fill={i === active ? COLORS.burgundy : COLORS.wine} /></svg>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", color: INK.strong }}>{w.toUpperCase()}</span>
        </div>
      ))}
    </div>
  );
};
/** Each world enters with its own behaviour (squeeze / rise / tilt / iris / assemble). */
const entrance = (kind: WorldKind, k: number): React.CSSProperties => {
  if (kind === "problem") return { transform: `scaleX(${lerp(1.35, 1, k)})`, opacity: k };
  if (kind === "desire") return { transform: `translateY(${(1 - k) * 120}px)`, opacity: k };
  if (kind === "objection") return { transform: `rotate(${(1 - k) * -9}deg) translateX(${(1 - k) * -60}px)`, opacity: k };
  if (kind === "value") return { clipPath: `circle(${k * 75}% at 50% 40%)` };
  return { transform: `scale(${lerp(0.3, 1, k)})`, opacity: k, filter: `blur(${(1 - k) * 4}px)` };
};
export const WorldsScene: S = ({ start }) => {
  const t = useT(start);
  const z = p(t, C.fiveFrames, 1.6, IN_OUT);
  const rot = t > C.fiveFrames ? (t - C.fiveFrames) * 2.2 : 0;
  const center = { x: 960, y: 560 };
  const pos = (i: number) => {
    const row = { x: 230 + i * 365, y: 560 };
    const a = ((-90 + i * 72 + rot) * Math.PI) / 180;
    const ring = { x: center.x + Math.cos(a) * 380, y: center.y + Math.sin(a) * 300 };
    return { x: lerp(row.x, ring.x, z), y: lerp(row.y, ring.y, z), s: lerp(1, 0.48, z) };
  };
  return (
    <AbsoluteFill>
      <At x={960} y={lerp(130, 70, z)} t={t} at={C.realDiv} dy={0}>
        <div style={{ ...TYPE.hero, fontSize: lerp(84, 44, z), whiteSpace: "nowrap", opacity: lerp(1, 0.9, z) }}>Creative <span style={MARK}>diversification</span></div>
      </At>
      <Lines>
        {WORLDS.map((w, i) => {
          const q = pos(i);
          const d = seg(q.x, q.y, center.x, center.y);
          return (
            <g key={w.kind}>
              <Trail d={d} t={t} at={C.fiveFrames + 0.9 + i * 0.15} dur={0.6} labelSide="none" />
              {[0, 1, 2, 3].map((j) => <Pulse key={j} d={d} t={t} at={C.fiveFrames + 1.6 + i * 0.25 + j * 1.1} dur={0.9} r={5} />)}
              <PersonNode x={q.x + (q.x < center.x ? -150 : 150) * z} y={q.y + 10} t={t} k={p(t, C.fiveFrames + 1.4 + i * 0.2, 0.4)} reaction={z > 0.9 ? 2 : 0} size={0.9 * z} />
            </g>
          );
        })}
        <Ripple x={center.x} y={center.y} t={t} k={p(t, C.fiveFrames + 1.2, 0.5)} level={1.2} base={95} speed={0.5} />
      </Lines>
      <At x={center.x} y={center.y} t={t} at={C.fiveFrames + 1.0} scaleFrom={0.5} dy={0}>
        <div style={{ width: 190, height: 190, borderRadius: "50%", background: COLORS.burgundy, color: COLORS.ivory, display: "grid", placeItems: "center", textAlign: "center",
          fontSize: 21, fontWeight: 800, letterSpacing: "0.12em", lineHeight: 1.25, boxShadow: "0 30px 70px rgba(114,0,19,0.35)" }}>CUSTOMER<br />RELEVANCE</div>
      </At>
      {WORLDS.map((w, i) => {
        const k = p(t, w.at - 0.1, 0.8, w.kind === "desire" ? BACK : IN_OUT);
        const q = pos(i);
        if (k <= 0) return null;
        return (
          <div key={w.kind} style={{ position: "absolute", left: q.x, top: q.y, transform: `translate(-50%,-50%) scale(${q.s})` }}>
            <div style={{ width: 320, ...entrance(w.kind, k) }}>
              <div style={{ borderRadius: 22, overflow: "hidden", background: "#fff", border: `2px solid ${INK.line}`, boxShadow: "0 24px 60px rgba(45,0,1,0.1)" }}>
                <div style={{ padding: "0", display: "flex", justifyContent: "center", background: "#fff" }}><WorldArt kind={w.kind} t={t} k={k} /></div>
                <div style={{ padding: "14px 18px 18px", fontSize: 22, fontWeight: 800, lineHeight: 1.2, color: INK.strong, minHeight: 58 }}>{w.head}</div>
              </div>
              <div style={{ marginTop: 14, textAlign: "center", ...TYPE.label, fontSize: 17, color: COLORS.crimson, opacity: 1 - z * 0.2 }}>{w.label}</div>
            </div>
          </div>
        );
      })}
      <At x={960} y={990} t={t} at={C.notRobotic} dy={10}><span style={{ ...TYPE.label, fontSize: 16, color: INK.strong }}>Meaningful variations in customer–message relationships</span></At>
    </AbsoluteFill>
  );
};

// 13 — "তাই আমি Creative-কে শুধু design হিসেবে দেখি না। আমি দেখি— Creative = message + context + customer relevance."
const TERMS = [
  { l: "MESSAGE", at: C.eqMessage, ex: 760 }, { l: "CONTEXT", at: C.eqContext, ex: 1110 }, { l: "CUSTOMER RELEVANCE", at: C.eqRelevance, ex: 1575 },
];
export const FrameworkScene: S = ({ start }) => {
  const t = useT(start);
  const merge = p(t, C.equation, 1.1, IN_OUT);
  const center = { x: lerp(960, 330, merge), y: 540 };
  const orbitK = p(t, C.iSee, 0.8);
  return (
    <AbsoluteFill>
      <At x={960} y={540} t={t} at={C.notDesign} out={C.iSee - 0.1} dy={0}>
        <div style={{ position: "relative", ...TYPE.hero, fontSize: 150, color: INK.body, letterSpacing: "0.06em" }}>
          DESIGN
          <div style={{ position: "absolute", left: "-3%", top: "50%", height: 8, width: `${p(t, C.notDesign + 1.2, 0.5) * 106}%`, background: COLORS.crimson, borderRadius: 4 }} />
        </div>
      </At>
      <At x={960} y={720} t={t} at={C.notDesign + 0.4} out={C.iSee - 0.1}><span style={{ ...TYPE.label, fontSize: 20 }}>not just</span></At>
      <Lines>
        {TERMS.map((term, i) => {
          const a = t * 0.8 + (i / 3) * Math.PI * 2;
          const ox = 960 + Math.cos(a) * 360, oy = 540 + Math.sin(a) * 210;
          return merge < 0.5 ? <line key={term.l} x1={960} y1={540} x2={ox} y2={oy} stroke={COLORS.crimson} strokeWidth={1.5} strokeDasharray="3 8" opacity={orbitK * (1 - merge * 2) * 0.7} /> : null;
        })}
        <ellipse cx={960} cy={540} rx={360} ry={210} fill="none" stroke={INK.line} strokeWidth={2} strokeDasharray="4 10" opacity={orbitK * (1 - merge)} />
      </Lines>
      <div style={{ position: "absolute", left: center.x, top: center.y, transform: `translate(-50%,-50%) scale(${lerp(lerp(0.6, 1, orbitK), 0.85, merge)})`, opacity: orbitK }}>
        <div style={{ width: 250, height: 250, borderRadius: "50%", background: COLORS.burgundy, color: COLORS.ivory, display: "grid", placeItems: "center", fontSize: 34, fontWeight: 800, letterSpacing: "0.1em", boxShadow: "0 30px 80px rgba(114,0,19,0.35)" }}>CREATIVE</div>
      </div>
      <div style={{ position: "absolute", left: 560, top: 540, transform: "translate(-50%,-50%)", fontSize: 90, fontWeight: 800, color: COLORS.crimson, opacity: p(t, C.equation + 0.6, 0.4) }}>=</div>
      {[935, 1285].map((x, i) => <div key={x} style={{ position: "absolute", left: x, top: 540, transform: "translate(-50%,-50%)", fontSize: 70, fontWeight: 800, color: COLORS.crimson, opacity: p(t, TERMS[i + 1].at - 0.2, 0.3) }}>+</div>)}
      {TERMS.map((term, i) => {
        const a = t * 0.8 + (i / 3) * Math.PI * 2;
        const ox = 960 + Math.cos(a) * 360, oy = 540 + Math.sin(a) * 210;
        const hot = p(t, term.at, 0.35);
        return (
          <div key={term.l} style={{ position: "absolute", left: lerp(ox, term.ex, merge), top: lerp(oy, 540, merge), transform: "translate(-50%,-50%)", opacity: orbitK }}>
            <div style={{ padding: "18px 26px", borderRadius: 20, whiteSpace: "nowrap", fontSize: lerp(22, 28, merge), fontWeight: 800, letterSpacing: "0.1em",
              background: hot > 0.5 ? COLORS.crimson : "#fff", color: hot > 0.5 ? COLORS.ivory : INK.strong, border: `2px solid ${hot > 0.5 ? COLORS.crimson : INK.line}`, boxShadow: "0 18px 40px rgba(45,0,1,0.08)" }}>{term.l}</div>
          </div>
        );
      })}
      <At x={960} y={800} t={t} at={C.eqRelevance + 0.4}><span style={{ ...TYPE.label, fontSize: 18, color: INK.strong }}>A creative is a strategic message — not only a design</span></At>
    </AbsoluteFill>
  );
};

// 14 — "AI যত বেশি delivery এবং ranking handle করবে, creative strategy তত বেশি গুরুত্বপূর্ণ হবে।"
export const StrategyScene: S = ({ start }) => {
  const t = useT(start);
  const flip = p(t, C.strategy, 0.9, IN_OUT);
  const laneY = lerp(560, 800, flip);
  const ranked = p(t, C.rankingB + 0.2, 0.8, IN_OUT);
  return (
    <AbsoluteFill>
      {/* old hierarchy */}
      <At x={SAFE.x} y={150} anchor="left" t={t} at={C.aiMore} dy={0}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, opacity: lerp(1, 0.4, flip), fontSize: 20, fontWeight: 800, letterSpacing: "0.14em", color: INK.body }}>
          MANUAL CONTROL <span style={{ color: COLORS.crimson }}>→</span> DELIVERY
          <div style={{ position: "absolute", left: 0, top: "50%", height: 3, width: `${flip * 100}%`, background: COLORS.crimson }} />
        </div>
      </At>
      {/* automatic lane */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${lerp(1, 0.78, flip)})`, transformOrigin: "50% 100%" }}>
        <Lines>
          <path d={`M 160 ${laneY} L 1760 ${laneY}`} stroke={INK.line} strokeWidth={3} strokeDasharray="6 10" />
          {[{ x: 760, l: "DELIVERY", at: C.delivery }, { x: 1200, l: "RANKING", at: C.rankingB }].map((g) => (
            <g key={g.l} opacity={p(t, g.at - 0.2, 0.4)}>
              <rect x={g.x - 8} y={laneY - 160} width={16} height={320} rx={8} fill={COLORS.burgundy} opacity={0.85} />
              <text x={g.x} y={laneY - 180} textAnchor="middle" fontSize={18} fontWeight={800} letterSpacing={3} fill={COLORS.burgundy}>{g.l}</text>
            </g>
          ))}
        </Lines>
        {Array.from({ length: 7 }, (_, i) => {
          const prog = ((t - C.aiMore) * 0.16 + i / 7) % 1;
          const x = 160 + prog * 1600;
          const after = x > 1200 ? ranked : 0;
          const y = laneY + (x > 1200 ? lerp((i % 3 - 1) * 60, (i % 2 ? -1 : 1) * 110 * ((i % 3) / 2), after) : (i % 3 - 1) * 60);
          return <CreativeSignalCanvas key={i} t={t} labels={false} st={{ ...CANVAS0, build: 1, typeA: 1, typeB: 1, showB: i % 2, family: i % 2, bg: i % 5, x, y, s: 0.15, o: p(t, C.aiMore, 0.5) * Math.min(1, (1 - prog) * 6, prog * 8) }} />;
        })}
        <At x={500} y={laneY + 190} t={t} at={C.rankingB + 0.4}><span style={{ ...TYPE.label, fontSize: 15 }}>The system arranges creatives automatically</span></At>
      </div>
      {/* new hierarchy — creative strategy dominant */}
      <At x={560} y={380} t={t} at={C.strategy + 0.1} scaleFrom={0.8} dy={0}>
        <div style={{ padding: "34px 48px", borderRadius: 30, background: COLORS.burgundy, color: COLORS.ivory, boxShadow: "0 40px 90px rgba(114,0,19,0.35)", textAlign: "center" }}>
          <div style={{ fontSize: 66, fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.05 }}>CREATIVE<br />STRATEGY</div>
        </div>
      </At>
      <Lines>
        <Trail d={seg(840, 380, 1040, 380)} t={t} at={C.strategy + 0.5} dur={0.3} labelSide="none" width={4} />
        <Trail d={seg(1300, 380, 1460, 380)} t={t} at={C.strategy + 0.8} dur={0.3} labelSide="none" width={3} />
        {[0, 1, 2].map((j) => <Pulse key={j} d="M 840 380 L 1700 380" t={t} at={C.moreImportant + j * 0.7} dur={0.9} r={6} />)}
      </Lines>
      <At x={1170} y={380} t={t} at={C.strategy + 0.6}><Pill size={22}>Signals</Pill></At>
      <At x={1600} y={380} t={t} at={C.strategy + 0.9}><Pill size={18} outline>AI delivery</Pill></At>
    </AbsoluteFill>
  );
};

// 15 — "AI-কে ভালো creative দেওয়া মানে শুধু সুন্দর ad দেওয়া না— AI-কে customer বোঝার জন্য better material দেওয়া।"
const FRAGS = ["Problem", "Desire", "Value", "Context", "Message"];
export const MaterialScene: S = ({ start }) => {
  const t = useT(start);
  const st = protagonist(t);
  return (
    <AbsoluteFill>
      <At x={520} y={180} t={t} at={C.goodCreative + 0.1} out={C.prettyAd - 0.6}><Pill size={18}>Beautiful creative</Pill></At>
      {FRAGS.map((f, i) => {
        const k = p(t, C.prettyAd - 0.9 + i * 0.12, 1.0, IN_OUT);
        const [sx, sy] = canvasPoint(st, 230, 120 + i * 95);
        const x = lerp(sx, 1000, k), y = lerp(sy, 300 + i * 115, k);
        return (
          <div key={f} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${(1 - k) * (i - 2) * 6}deg)`, opacity: Math.min(1, k * 3) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, width: 260, padding: "12px 18px", borderRadius: 14, background: "#fff", border: `2px solid ${INK.line}`, boxShadow: "0 12px 30px rgba(45,0,1,0.07)" }}>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.16em", color: INK.strong, width: 110 }}>{f.toUpperCase()}</span>
              <div style={{ flex: 1, display: "flex", gap: 4 }}>{[0, 1, 2, 3].map((j) => <div key={j} style={{ flex: 1, height: 10, borderRadius: 3, background: j <= i % 4 ? COLORS.crimson : "rgba(114,0,19,0.12)" }} />)}</div>
            </div>
          </div>
        );
      })}
      <At x={1000} y={210} t={t} at={C.prettyAd + 0.2}><span style={{ ...TYPE.label, fontSize: 15, color: COLORS.crimson }}>Structured signal fragments</span></At>
      <Lines>
        {FRAGS.map((f, i) => {
          const d = curve(1135, 300 + i * 115, 1510, 300 + (i % 4) * 150);
          return (
            <g key={f}>
              <Trail d={d} t={t} at={C.aiCustomer + i * 0.12} dur={0.6} labelSide="none" width={2} />
              {[0, 1].map((j) => <Pulse key={j} d={d} t={t} at={C.aiCustomer + 0.5 + i * 0.12 + j * 0.9} dur={0.7} r={5} />)}
            </g>
          );
        })}
        {[0, 1, 2, 3].map((i) => <g key={i} opacity={p(t, C.aiCustomer + 0.2, 0.4)}><PersonNode x={1580} y={300 + i * 150} t={t} k={p(t, C.aiCustomer + 0.6 + i * 0.15, 0.4)} reaction={t > C.aiCustomer + 0.6 + i * 0.15 ? 2 : 0} size={1.1} /></g>)}
        <SystemField x={1760} y={530} t={t} k={p(t, C.aiCustomer + 0.4, 0.5) * 0.6} r={70} active={1} />
      </Lines>
      <At x={1600} y={180} t={t} at={C.aiCustomer + 0.3}><span style={{ ...TYPE.label, fontSize: 15, color: INK.strong }}>Customer relevance map</span></At>
      <div style={{ position: "absolute", left: 0, right: 0, top: 930, display: "flex", justifyContent: "center", alignItems: "center", gap: 22 }}>
        {[["Beautiful creative", C.aiCustomer + 0.2], ["Meaningful creative", C.aiCustomer + 0.8], ["Better signal material", C.betterMaterial]].map(([l, a], i) => (
          <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 22, opacity: p(t, a as number, 0.4) }}>
            {i > 0 ? <span style={{ fontSize: 30, fontWeight: 800, color: COLORS.crimson }}>→</span> : null}
            <Pill size={20} hot={i === 2 ? 1 : 0}>{l as string}</Pill>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// 16–17 — "আমি Fahad।" / "… creative মানে শুধু ‘ভালো দেখতে’ না।" / "Creative should have a business reason."
export const CloseScene: S = ({ start }) => {
  const t = useT(start);
  const sig = p(t, C.inMarketing, 1.0, IN_OUT);
  const line = drawn("M 0 0 L 520 0", t, C.fahad + 0.3, 0.8);
  const strike = p(t, C.goodLooking + 0.15, 0.5, IN_OUT);
  const reason = p(t, C.goodLooking + 0.55, 0.5);
  const fin = p(t, C.finalLine - 0.25, 0.4);
  const brMark = p(t, C.businessReason, 0.5);
  return (
    <AbsoluteFill>
      {/* signature: centre → bottom */}
      <div style={{ position: "absolute", left: 960, top: lerp(470, 985, sig), transform: `translate(-50%,-50%) scale(${lerp(1, 0.3, sig)})` }}>
        <At x={0} y={0} t={t} at={C.fahad} dy={20}><div style={{ ...TYPE.hero, fontSize: 180, letterSpacing: "0.05em" }}>FAHAD</div></At>
        <svg width={520} height={8} style={{ position: "absolute", left: -260, top: 100, overflow: "visible", opacity: 1 - sig }}>
          <path d="M 0 0 L 520 0" stroke={COLORS.crimson} strokeWidth={4} strokeLinecap="round" strokeDasharray={line.strokeDasharray} strokeDashoffset={line.strokeDashoffset} />
        </svg>
        <At x={0} y={150} t={t} at={C.fahad + 0.3} out={C.inMarketing}><div style={{ ...TYPE.label, fontSize: 28, whiteSpace: "nowrap" }}>Digital Marketing • Strategy • AI • Growth</div></At>
      </div>
      {/* good looking → good reason */}
      <div style={{ opacity: 1 - fin }}>
        <At x={960} y={lerp(470, 380, reason)} t={t} at={C.goodLooking - 0.9} dy={20}>
          <div style={{ position: "relative", ...TYPE.hero, fontSize: 120, color: lerp(1, 0, reason) > 0.5 ? INK.strong : INK.faint, whiteSpace: "nowrap", transform: `scale(${lerp(1, 0.6, reason)})` }}>
            GOOD LOOKING
            <div style={{ position: "absolute", left: "-2%", top: "52%", height: 7, width: `${strike * 104}%`, background: COLORS.crimson, borderRadius: 4 }} />
          </div>
        </At>
        <At x={960} y={580} t={t} at={C.goodLooking + 0.55} scaleFrom={1.2} dy={0}>
          <div style={{ ...TYPE.hero, fontSize: 130, whiteSpace: "nowrap" }}>GOOD <span style={MARK}>REASON</span></div>
        </At>
      </div>
      {/* final thesis */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "flex", flexDirection: "column", alignItems: "center", opacity: fin }}>
        <Wipe t={t} at={C.finalLine - 0.2} dur={0.5}><div style={{ ...TYPE.hero, fontSize: 132, letterSpacing: "0.02em" }}>CREATIVE</div></Wipe>
        <div style={{ ...TYPE.label, fontSize: 30, color: INK.body, margin: "14px 0 18px", opacity: p(t, C.finalLine + 0.35, 0.4), letterSpacing: "0.4em" }}>should have</div>
        <Wipe t={t} at={C.finalLine + 0.7} dur={0.6}>
          <div style={{ ...TYPE.hero, fontSize: 120, whiteSpace: "nowrap" }}>A <span style={{ ...MARK, background: `rgba(128,1,31,${brMark})`, color: brMark > 0.5 ? COLORS.ivory : INK.strong, padding: "0.04em 0.18em 0" }}>BUSINESS REASON.</span></div>
        </Wipe>
        <div style={{ marginTop: 34, ...TYPE.label, fontSize: 22, color: INK.muted, opacity: p(t, C.reason - 0.2, 0.4) }}>Message × Context × Customer Relevance</div>
      </div>
    </AbsoluteFill>
  );
};

