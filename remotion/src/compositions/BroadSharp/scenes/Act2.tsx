/** Act 2 — thesis, the never-broad spine, Meta's signals, what I mean, the shift, close (91 – 191.7s). */
import { AbsoluteFill, random } from "remotion";
import {
  At, BACK, Card, COLORS, curve, drawn, fieldDot, FocusTick, Icon, IconName, INK, IN_OUT, isHighlighted, lerp, Lines,
  OUT, p, PersonNode, Pill, Pulse, SAFE, seg, Sharp, Soft, SystemField, Trail, TYPE, useT,
} from "../../../brand";
import { C } from "../cues";
import { field } from "../field";

type S = React.FC<{ start: number }>;

// 08 — "Broad Targeting আর Broad Strategy এক জিনিস না। … দুটোর মধ্যে আকাশ-পাতাল difference।"
const FOG = [
  { q: "Who is the customer?", at: C.who, x: 1250, y: 400 },
  { q: "What is the problem?", at: C.problemQ, x: 1640, y: 480 },
  { q: "What are we offering?", at: C.offerQ, x: 1290, y: 640 },
  { q: "What does success look like?", at: C.success, x: 1610, y: 760 },
];
export const ThesisScene: S = ({ start }) => {
  const t = useT(start);
  const split = p(t, C.skyGround, 1.6, IN_OUT);
  const ap = p(t, C.space - 0.3, 1.0, OUT);
  const drift = p(t, C.unclear, 1.2, IN_OUT);
  return (
    <AbsoluteFill>
      <At x={960} y={130} t={t} at={C.clearly} out={C.bTargeting - 0.1}><span style={{ ...TYPE.label, fontSize: 22, color: INK.strong }}>Understand this clearly</span></At>
      {/* left — broad targeting (healthy openness) */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 958, height: 1080, transform: `translateY(${-70 * split}px)` }}>
        <At x={480} y={200} t={t} at={C.bTargeting} dy={0}><Sharp t={t} at={C.bTargeting} style={{ ...TYPE.title, fontSize: 56, whiteSpace: "nowrap" }}>Broad targeting</Sharp></At>
        <svg width={958} height={1080} style={{ position: "absolute", inset: 0 }}>
          <g opacity={p(t, C.defTargeting, 0.5)}>
            {Array.from({ length: 6 }, (_, i) => {
              const a = (i * 60 * Math.PI) / 180, r = lerp(40, 190, ap);
              return <line key={i} x1={480 + Math.cos(a) * r} y1={560 + Math.sin(a) * r} x2={480 + Math.cos(a + 1.3) * 260} y2={560 + Math.sin(a + 1.3) * 260} stroke={INK.lineStrong} strokeWidth={2} />;
            })}
            <circle cx={480} cy={560} r={lerp(40, 190, ap)} fill="none" stroke={COLORS.burgundy} strokeWidth={2.5} />
          </g>
          <SystemField x={480} y={560} t={t} k={p(t, C.system, 0.6)} r={120} active={p(t, C.find, 0.5)} />
          {Array.from({ length: 26 }, (_, i) => {
            const x = 140 + random(`tl${i}`) * 680, y = 330 + random(`tm${i}`) * 470;
            const lit = random(`tn${i}`) < 0.3 && t > C.find + random(`to${i}`) * 0.8;
            return <circle key={i} cx={x} cy={y} r={lit ? 6 : 4} fill={lit ? COLORS.crimson : COLORS.burgundy} opacity={p(t, C.defTargeting, 0.5) * (lit ? 1 : 0.35)} />;
          })}
          {t > C.find ? <path d={`M 480 560 L ${480 + Math.cos(t * 2) * 300} ${560 + Math.sin(t * 2) * 300}`} stroke={COLORS.crimson} strokeWidth={2} opacity={0.5} /> : null}
        </svg>
        <At x={480} y={880} t={t} at={C.find - 0.2}><span style={{ ...TYPE.label, fontSize: 16, color: COLORS.crimson, whiteSpace: "nowrap" }}>Space for the system to find customers</span></At>
      </div>
      {/* right — broad strategy (fog) */}
      <div style={{ position: "absolute", left: 962, top: 0, width: 958, height: 1080, transform: `translateY(${70 * split}px)` }}>
        <At x={480} y={200} t={t} at={C.bStrategy} dy={0}><Sharp t={t} at={C.bStrategy} style={{ ...TYPE.title, fontSize: 56, whiteSpace: "nowrap", color: INK.body }}>Broad strategy</Sharp></At>
      </div>
      {FOG.map((f, i) => {
        const k = p(t, f.at, 0.6);
        const dx = Math.sin(t * 0.7 + i * 2) * 14 + drift * (i % 2 ? 60 : -60);
        const dy = Math.cos(t * 0.6 + i) * 10 + drift * (i < 2 ? -40 : 40) + 70 * split;
        return (
          <div key={f.q} style={{ position: "absolute", left: f.x + dx, top: f.y + dy, transform: "translate(-50%,-50%)", opacity: k * lerp(1, 0.4, drift), filter: `blur(${1.4 + drift * 1.2}px)` }}>
            <div style={{ padding: "16px 24px", borderRadius: 16, border: `2px dashed ${INK.lineStrong}`, background: "rgba(255,255,255,0.45)", fontSize: 25, fontWeight: 800, color: INK.body, whiteSpace: "nowrap" }}>{f.q}</div>
          </div>
        );
      })}
      <At x={1440} y={940} t={t} at={C.unclear} dy={0}><span style={{ ...TYPE.label, fontSize: 16, color: INK.muted, display: "inline-block", transform: `translateY(${70 * split}px)` }}>Nothing is clear</span></At>
      {/* divider + ≠ */}
      <Lines>
        <Trail d={seg(960, 100, 960, 980)} t={t} at={C.bTargeting} dur={0.6} labelSide="none" width={3} hot={1} />
        <rect x={960 - 30 * split} y={0} width={60 * split} height={1080} fill={COLORS.crimson} opacity={0.08 * split} />
      </Lines>
      <At x={960} y={200} t={t} at={C.notSame} scaleFrom={0.4} dy={0}>
        <div style={{ width: 76, height: 76, borderRadius: "50%", background: COLORS.crimson, color: COLORS.ivory, display: "grid", placeItems: "center", fontSize: 52, fontWeight: 800, boxShadow: "0 16px 40px rgba(128,1,31,0.35)" }}>≠</div>
      </At>
      <At x={960} y={540} t={t} at={C.skyGround + 0.6} dy={0}>
        <div style={{ padding: "14px 28px", borderRadius: 999, background: COLORS.ivory, border: `2px solid ${COLORS.crimson}`, ...TYPE.label, fontSize: 18, color: COLORS.crimson, whiteSpace: "nowrap" }}>Completely different things</div>
      </At>
    </AbsoluteFill>
  );
};

// 09 — "এই জিনিসগুলো কখনো broad হওয়া উচিত না— Business Objective → … → Business Outcome। এগুলো যত clear হবে …"
const SPINE: { l: string; icon: IconName; at: number }[] = [
  { l: "Business objective", icon: "target", at: C.objective }, { l: "Ideal customer", icon: "user", at: C.ideal },
  { l: "Customer problem", icon: "bulb", at: C.custProblem }, { l: "Offer", icon: "tag", at: C.offerN },
  { l: "Creative message", icon: "message", at: C.creativeMsg }, { l: "Conversion signal", icon: "check", at: C.convSignal },
  { l: "Business outcome", icon: "growth", at: C.outcome },
];
export const SpineScene: S = ({ start }) => {
  const t = useT(start);
  const xs = SPINE.map((_, i) => 230 + i * 243);
  const y = 420;
  const flow = p(t, C.clearer, 1.0, IN_OUT);
  const bright = p(t, C.clear, 0.6);
  return (
    <AbsoluteFill>
      <At x={960} y={150} t={t} at={C.evenBroad} dy={0}><Soft><span style={{ ...TYPE.label, fontSize: 22, color: INK.strong }}>Audience · broad (that's OK)</span></Soft></At>
      <At x={960} y={235} t={t} at={C.neverBroad - 0.6}><Sharp t={t} at={C.neverBroad - 0.6} style={{ ...TYPE.title, fontSize: 44 }}>…but these must <span style={{ color: COLORS.crimson }}>never</span> be broad</Sharp></At>
      <Lines>
        <Trail d={seg(170, y, 1750, y)} t={t} at={C.neverBroad} dur={0.7} labelSide="none" width={2 + bright * 2} hot={1} />
        {Array.from({ length: 80 }, (_, i) => <line key={i} x1={170 + i * 20} y1={y - (i % 5 === 0 ? 12 : 6)} x2={170 + i * 20} y2={y} stroke={INK.lineStrong} strokeWidth={1.2} opacity={p(t, C.neverBroad + 0.3, 0.6)} />)}
        {SPINE.slice(1).map((s, i) => <Pulse key={s.l} d={seg(xs[i], y, xs[i + 1], y)} t={t} at={s.at - 0.35} dur={0.35} r={6} />)}
        {SPINE.map((s, i) => <FocusTick key={s.l} x={xs[i]} y={y} t={t} at={s.at} r={36} />)}
        {SPINE.map((s, i) => {
          const d = curve(xs[i], y + 150, 960, 830);
          return (
            <g key={`f${s.l}`}>
              <Trail d={d} t={t} at={C.clearer + i * 0.1} dur={0.7} labelSide="none" width={1.6} />
              {[0, 1, 2].map((j) => <Pulse key={j} d={d} t={t} at={C.clearer + 0.6 + i * 0.12 + j * 1.2} dur={1.0} r={4.5} />)}
            </g>
          );
        })}
        <SystemField x={960} y={850} t={t} k={p(t, C.clearer + 0.2, 0.7)} r={95} active={p(t, C.aiContext, 0.5)} label="AI" />
      </Lines>
      {SPINE.map((s, i) => {
        const k = p(t, s.at, 0.4, BACK);
        const last = i === SPINE.length - 1;
        return (
          <div key={s.l} style={{ position: "absolute", left: xs[i], top: y, transform: "translate(-50%,-50%)" }}>
            <div style={{ width: last ? 40 : 30, height: last ? 40 : 30, borderRadius: "50%", background: COLORS.crimson, border: `4px solid ${COLORS.ivory}`, boxShadow: `0 0 0 2px ${COLORS.crimson}`, transform: `scale(${k})` }} />
            <div style={{ position: "absolute", left: "50%", top: -78, transform: "translateX(-50%)", opacity: k }}><Icon name={s.icon} size={42} color={last ? COLORS.crimson : COLORS.burgundy} /></div>
            <div style={{ position: "absolute", left: "50%", top: 44, transform: "translateX(-50%)", width: 210, textAlign: "center" }}>
              <Sharp t={t} at={s.at} style={{ fontSize: last ? 23 : 20, fontWeight: 800, letterSpacing: "0.08em", color: last ? COLORS.burgundy : INK.strong, textTransform: "uppercase", lineHeight: 1.2 }}>{s.l}</Sharp>
            </div>
          </div>
        );
      })}
      <At x={960} y={620} t={t} at={C.clear} dy={0}><span style={{ ...TYPE.label, fontSize: 17, color: COLORS.crimson, opacity: flow }}>Clearer inputs → better context for AI delivery</span></At>
    </AbsoluteFill>
  );
};

// 10 — "Meta তার ad ranking systems-এ user behaviour এবং engagement-এর মতো signals … বরং AI-এর জন্য relevant signals তৈরি করার দায়িত্ব আরও গুরুত্বপূর্ণ হয়ে যায়।"
const CANDS = ["A", "B", "C", "D", "E"];
const ORDER1 = [3, 0, 4, 1, 2];
const ORDER2 = [0, 3, 1, 4, 2];
export const SignalsScene: S = ({ start }) => {
  const t = useT(start);
  const fieldC = { x: 940, y: 440 };
  const r1 = p(t, C.stated, 0.9, IN_OUT);
  const r2 = p(t, C.relevant + 0.6, 0.9, IN_OUT);
  const dim = p(t, C.marketer, 0.6) * (1 - p(t, C.relevant, 0.6));
  const rowY = (c: number) => lerp(lerp(250 + c * 100, 250 + ORDER1.indexOf(c) * 100, r1), 250 + ORDER2.indexOf(c) * 100, r2);
  const trails = [0, 1, 2].map((i) => `M ${160 + i * 40} 980 C ${300 + i * 60} ${760 - i * 20}, ${620} ${600 + i * 30}, ${fieldC.x - 120} ${fieldC.y + 60 + i * 20}`);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 30, ...TYPE.label, fontSize: 15, color: INK.muted, opacity: p(t, C.metaRanking, 0.4) }}>Illustrative · based on Meta's public statements · simplified</div>
      <div style={{ opacity: 1 - dim * 0.6 }}>
        {CANDS.map((c, i) => (
          <At key={c} x={260} y={250 + i * 100} t={t} at={C.ranking + i * 0.1} out={C.stated} dx={-30} dy={0}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 12, background: "#fff", border: `2px solid ${INK.line}` }}>
              <Icon name="image" size={24} /><span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.14em" }}>AD {c}</span>
            </div>
          </At>
        ))}
        <Lines>
          {CANDS.map((c, i) => <Pulse key={c} d={curve(330, 250 + i * 100, fieldC.x - 150, fieldC.y)} t={t} at={C.ranking + 0.3 + i * 0.15} dur={0.8} r={5} />)}
          {trails.map((d, i) => <Trail key={i} d={d} t={t} at={C.behaviourS + i * 0.15} dur={1.0} labelSide="none" width={2} />)}
          {trails.map((d, i) => [0, 1, 2].map((j) => <Pulse key={`${i}${j}`} d={d} t={t} at={C.engagement + i * 0.2 + j * 0.8} dur={0.9} r={5} />))}
          <SystemField x={fieldC.x} y={fieldC.y} t={t} k={p(t, C.ranking, 0.6)} r={150} active={p(t, C.signals, 0.5)} label="RANKING" />
          {CANDS.map((c, i) => <Pulse key={`o${c}`} d={curve(fieldC.x + 160, fieldC.y, 1420, rowY(i))} t={t} at={C.stated + i * 0.1} dur={0.6} r={5} />)}
        </Lines>
        <At x={420} y={790} t={t} at={C.behaviourS}><span style={{ ...TYPE.label, fontSize: 14 }}>view · pause · engage</span></At>
        <At x={fieldC.x} y={fieldC.y + 200} t={t} at={C.signals}><Pill size={16}>Signals</Pill></At>
        {CANDS.map((c, i) => {
          const top = (r2 > 0.5 ? ORDER2 : ORDER1).indexOf(i) === 0;
          return (
            <div key={c} style={{ position: "absolute", left: 1440, top: rowY(i) - 26, width: 300, opacity: p(t, C.stated + 0.2 + i * 0.08, 0.4) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 16px", borderRadius: 12, background: top ? COLORS.burgundy : "#fff", color: top ? COLORS.ivory : INK.strong, border: `2px solid ${INK.line}` }}>
                <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.14em", width: 60 }}>AD {c}</span>
                <div style={{ flex: 1, height: 7, borderRadius: 7, background: top ? "rgba(251,252,235,0.3)" : "rgba(114,0,19,0.1)" }}>
                  <div style={{ width: `${100 - (r2 > 0.5 ? ORDER2 : ORDER1).indexOf(i) * 17}%`, height: "100%", borderRadius: 7, background: top ? COLORS.ivory : COLORS.crimson }} />
                </div>
              </div>
            </div>
          );
        })}
        <At x={1590} y={190} t={t} at={C.stated}><span style={{ ...TYPE.label, fontSize: 14, color: INK.strong }}>Relevance order</span></At>
      </div>
      {/* the marketer — strategy refuses to fade */}
      <Lines>
        <PersonNode x={330} y={860} t={t} k={p(t, C.relevant, 0.4)} reaction={t > C.relevant ? 2 : 0} size={2.2 * p(t, C.butNot, 0.5)} />
        {[0, 1, 2].map((i) => {
          const d = curve(640, 860, fieldC.x - 60 + i * 40, fieldC.y + 140);
          return (
            <g key={i}>
              <Trail d={d} t={t} at={C.relevant + i * 0.12} dur={0.7} labelSide="none" width={2.5} />
              {[0, 1, 2].map((j) => <Pulse key={j} d={d} t={t} at={C.relevant + 0.6 + i * 0.15 + j * 0.9} dur={0.8} r={6} />)}
            </g>
          );
        })}
      </Lines>
      <At x={330} y={960} t={t} at={C.butNot + 0.3}><span style={{ ...TYPE.label, fontSize: 15, color: INK.strong }}>Marketer</span></At>
      <At x={560} y={860} t={t} at={C.stratNeeded - 0.3} dy={0}>
        <div style={{ padding: "16px 26px", borderRadius: 16, background: p(t, C.responsibility, 0.4) > 0.5 ? COLORS.burgundy : "#fff", color: p(t, C.responsibility, 0.4) > 0.5 ? COLORS.ivory : COLORS.burgundy,
          border: `2px solid ${COLORS.burgundy}`, fontSize: 24, fontWeight: 800, letterSpacing: "0.14em", boxShadow: "0 20px 50px rgba(114,0,19,0.2)" }}>STRATEGY</div>
      </At>
      <At x={560} y={950} t={t} at={C.responsibility}><span style={{ ...TYPE.label, fontSize: 15, color: COLORS.crimson }}>Responsibility ↑</span></At>
    </AbsoluteFill>
  );
};

// 11 — "আমি কখনো বলি না— যাকে খুশি তাকে ad দেখান। আমি বলি— Delivery-তে flexibility দিন, কিন্তু Strategy-তে clarity রাখুন। … Thinking broad হওয়া উচিত না।"
export const MeaningScene: S = ({ start }) => {
  const t = useT(start);
  const spray = p(t, C.anyone, 0.4) * (1 - p(t, C.showAds + 0.4, 0.5));
  const strike = drawn("M 300 560 L 1620 470", t, C.showAds, 0.5);
  const stretch = p(t, C.flexibility, 0.9, OUT);
  const lock = p(t, C.clarity, 0.25, IN_OUT);
  const wob = Math.sin(t * 5) * 14 * (1 - stretch * 0.6);
  const ctrlY = 520;
  return (
    <AbsoluteFill>
      <At x={960} y={180} t={t} at={C.broadTargetingQ - 0.2} dy={0}>
        <div style={{ ...TYPE.title, fontSize: 52 }}><span style={{ color: COLORS.crimson }}>“</span>Broad targeting<span style={{ color: COLORS.crimson }}>”</span></div>
      </At>
      {/* what it is NOT: random spray */}
      <div style={{ opacity: spray }}>
        {Array.from({ length: 18 }, (_, i) => {
          const sx = 260 + random(`sx${i}`) * 1400, sy = 330 + random(`sy${i}`) * 420;
          const frozen = t > C.showAds;
          const tt = frozen ? C.showAds : t;
          const x = sx + Math.sin(tt * (2 + random(`sv${i}`) * 3) + i) * 70, y = sy + Math.cos(tt * (1.5 + random(`sw${i}`) * 3) + i) * 50;
          return <div key={i} style={{ position: "absolute", left: x, top: y, width: 70, height: 50, borderRadius: 8, background: "#fff", border: `2px solid ${INK.lineStrong}`, transform: `rotate(${(random(`sr${i}`) - 0.5) * 50 + tt * 30 * (i % 2 ? 1 : -1)}deg)` }} />;
        })}
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}><path d="M 300 560 L 1620 470" stroke={COLORS.crimson} strokeWidth={5} strokeLinecap="round" strokeDasharray={strike.strokeDasharray} strokeDashoffset={strike.strokeDashoffset} /></svg>
      </div>
      <At x={960} y={830} t={t} at={C.showAds} out={C.iSay}><span style={{ ...TYPE.label, fontSize: 20, color: COLORS.crimson }}>✕ Show ads to anyone</span></At>
      {/* flexible delivery vs rigid strategy */}
      <div style={{ opacity: p(t, C.deliveryF - 0.2, 0.4) }}>
        <At x={560} y={ctrlY - 140} t={t} at={C.deliveryF}><span style={{ ...TYPE.label, fontSize: 24, color: INK.strong }}>Delivery</span></At>
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          {(() => {
            const half = lerp(110, 330, stretch);
            return (
              <g>
                <path d={`M ${560 - half} ${ctrlY} Q 560 ${ctrlY + wob} ${560 + half} ${ctrlY}`} fill="none" stroke={COLORS.crimson} strokeWidth={9} strokeLinecap="round" opacity={0.8} />
                <circle cx={560 - half} cy={ctrlY} r={14} fill={COLORS.burgundy} /><circle cx={560 + half} cy={ctrlY} r={14} fill={COLORS.burgundy} />
              </g>
            );
          })()}
          <g opacity={p(t, C.strategyC, 0.3)} transform={`translate(${1360 + (lock < 1 && lock > 0 ? Math.sin(lock * 30) * 4 : 0)} ${ctrlY})`}>
            <rect x={-280} y={-20} width={560} height={40} rx={6} fill="#fff" stroke={COLORS.burgundy} strokeWidth={3} />
            {Array.from({ length: 29 }, (_, i) => <line key={i} x1={-270 + i * 19.3} y1={-20} x2={-270 + i * 19.3} y2={i % 4 === 0 ? 4 : -6} stroke={COLORS.burgundy} strokeWidth={i % 4 === 0 ? 2.2 : 1.3} opacity={lerp(0.3, 1, lock)} />)}
            <rect x={-280} y={24} width={560 * lock} height={4} fill={COLORS.crimson} />
          </g>
        </svg>
        <At x={1360} y={ctrlY - 140} t={t} at={C.strategyC}><span style={{ ...TYPE.label, fontSize: 24, color: INK.strong }}>Strategy</span></At>
        <At x={560} y={ctrlY + 90} t={t} at={C.flexibility}><Soft><Pill size={18}>Flexibility</Pill></Soft></At>
        <At x={1360} y={ctrlY + 90} t={t} at={C.clarity}><Sharp t={t} at={C.clarity}><Pill size={18} hot={1}>Clarity</Pill></Sharp></At>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 770, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div style={{ opacity: p(t, C.audienceOk, 0.4) }}><Soft k={0.8}><span style={{ fontSize: 46, fontWeight: 800, color: INK.body }}>AUDIENCE: BROAD <span style={{ opacity: p(t, C.broadOk, 0.3) }}>✓</span></span></Soft></div>
        <div style={{ opacity: p(t, C.thinking, 0.3) }}><Sharp t={t} at={C.thinking}><span style={{ fontSize: 46, fontWeight: 800, color: INK.strong }}>THINKING: BROAD <span style={{ color: COLORS.crimson, opacity: p(t, C.thinkingBroad, 0.25) }}>✕</span></span></Sharp></div>
      </div>
    </AbsoluteFill>
  );
};

// 12 — "আগে … Customer-কে manually খুঁজে বের করতে। এখন AI-কে সেই discovery-তে বেশি ভূমিকা … 'আমার Business-এর জন্য valuable customer কাকে বলে?'"
const HOPS = [33, 121, 210, 48, 377, 290, 515, 88];
export const ShiftScene: S = ({ start }) => {
  const t = useT(start);
  const f = field(t);
  const marker = p(t, C.shift, 0.9, IN_OUT);
  const hopIdx = Math.min(HOPS.length - 1, Math.max(0, Math.floor((t - C.manual - 0.2) / 0.5)));
  const hopK = p(t, C.manual + 0.2 + hopIdx * 0.5, 0.25, IN_OUT);
  const prev = fieldDot(HOPS[Math.max(0, hopIdx - 1)], f, t), cur = fieldDot(HOPS[hopIdx], f, t);
  const mx = lerp(prev.x, cur.x, hopK), my = lerp(prev.y, cur.y, hopK);
  const lift = p(t, C.now, 0.6);
  const sweep = t * 1.4;
  const lit = Array.from({ length: 640 }, (_, i) => i).filter((i) => isHighlighted(i, f)).map((i) => fieldDot(i, f, t)).slice(0, 10);
  return (
    <AbsoluteFill>
      {/* then → now rail */}
      <div style={{ position: "absolute", left: 560, top: 140, width: 800, display: "flex", alignItems: "center", gap: 20, opacity: p(t, C.modern, 0.5) }}>
        <span style={{ ...TYPE.label, fontSize: 18, color: INK.muted }}>Then</span>
        <div style={{ flex: 1, height: 3, background: INK.line, position: "relative" }}>
          <div style={{ position: "absolute", left: `${marker * 100}%`, top: -9, width: 20, height: 20, borderRadius: "50%", background: COLORS.crimson, transform: "translateX(-50%)" }} />
        </div>
        <span style={{ ...TYPE.label, fontSize: 18, color: COLORS.crimson }}>Now</span>
      </div>
      <At x={960} y={215} t={t} at={C.shift}><span style={{ ...TYPE.label, fontSize: 15, color: INK.strong }}>Modern Meta Ads · an important shift</span></At>
      <Lines>
        {/* manual magnifier */}
        <g opacity={p(t, C.manual, 0.4) * (1 - lift)} transform={`translate(${mx} ${my}) scale(${1 + lift * 0.6})`}>
          <circle r={46} fill="rgba(255,255,255,0.4)" stroke={COLORS.crimson} strokeWidth={3} />
          <line x1={33} y1={33} x2={70} y2={70} stroke={COLORS.crimson} strokeWidth={7} strokeLinecap="round" />
        </g>
        {/* AI discovery sweep */}
        <g opacity={p(t, C.now, 0.8) * (1 - p(t, C.youMust, 0.8) * 0.6)}>
          <path d={`M 960 560 L ${960 + Math.cos(sweep) * 900} ${560 + Math.sin(sweep) * 900} A 900 900 0 0 0 ${960 + Math.cos(sweep - 0.35) * 900} ${560 + Math.sin(sweep - 0.35) * 900} Z`} fill={COLORS.crimson} opacity={0.06} />
          {[260, 480, 700].map((r) => <circle key={r} cx={960} cy={560} r={r} fill="none" stroke={COLORS.burgundy} strokeWidth={1.2} strokeDasharray="3 10" opacity={0.4} />)}
        </g>
        {lit.map((d, i) => <Trail key={i} d={curve(860, 520, d.x, d.y)} t={t} at={C.customerV + i * 0.06} dur={0.5} labelSide="none" width={1.4} />)}
      </Lines>
      <At x={420} y={300} t={t} at={C.manual + 0.3} out={C.now}><span style={{ ...TYPE.label, fontSize: 18, color: INK.strong }}>Manual search</span></At>
      <At x={960} y={300} t={t} at={C.now + 0.4} out={C.youMust}><span style={{ ...TYPE.label, fontSize: 18, color: COLORS.crimson }}>AI-assisted discovery</span></At>
      {/* the marketer defines the valuable customer */}
      <Lines><PersonNode x={300} y={760} t={t} k={p(t, C.youMust, 0.5)} reaction={2} size={3.2 * p(t, C.youMust, 0.5, BACK)} /></Lines>
      <At x={600} y={520} t={t} at={C.youYourself} dy={30}>
        <Card w={520} pad="26px 30px" glass>
          <div style={{ fontSize: 34, fontWeight: 800, color: INK.strong, lineHeight: 1.2 }}>
            What is a <Sharp t={t} at={C.valuable} dur={0.6} style={{ color: COLORS.crimson }}>valuable customer</Sharp> for my business?
          </div>
        </Card>
      </At>
      <At x={600} y={680} t={t} at={C.customerV + 0.3}><span style={{ ...TYPE.label, fontSize: 15, color: INK.strong }}>The AI finds · you define</span></At>
    </AbsoluteFill>
  );
};

// 13 — "আমি Fahad। … more reach, more clicks, more leads না। … the right customer, the right message, and the right business outcome। Broad delivery. Sharp strategy."
export const CloseScene: S = ({ start }) => {
  const t = useT(start);
  const sig = p(t, C.goodAd, 1.0, IN_OUT);
  const line = drawn("M 0 0 L 480 0", t, C.fahad + 0.3, 0.8);
  const vanityFall = p(t, C.na, 0.8, IN_OUT);
  const rightOut = p(t, C.broadDelivery - 0.3, 0.5);
  const ring = p(t, C.sharpStrategy + 0.05, 0.7, OUT);
  const vanity = [{ l: "More reach", at: C.reach }, { l: "More clicks", at: C.clicks }, { l: "More leads", at: C.leads }];
  const right = [{ l: "customer", at: C.rightCustomer }, { l: "message", at: C.rightMessage }, { l: "business outcome", at: C.rightOutcome }];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 960, top: lerp(470, 990, sig), transform: `translate(-50%,-50%) scale(${lerp(1, 0.3, sig)})` }}>
        <Sharp t={t} at={C.fahad} dur={0.6} style={{ ...TYPE.hero, fontSize: 170, letterSpacing: "0.06em", display: "block" }}>FAHAD</Sharp>
        <svg width={480} height={8} style={{ position: "absolute", left: "50%", marginLeft: -240, top: 196, overflow: "visible", opacity: 1 - sig }}>
          <path d="M 0 0 L 480 0" stroke={COLORS.crimson} strokeWidth={4} strokeLinecap="round" strokeDasharray={line.strokeDasharray} strokeDashoffset={line.strokeDashoffset} />
        </svg>
        <div style={{ position: "absolute", left: "50%", top: 230, transform: "translateX(-50%)", whiteSpace: "nowrap", ...TYPE.label, fontSize: 26, opacity: p(t, C.fahad + 0.4, 0.4) * (1 - sig) }}>Digital Marketing • Strategy • AI • Growth</div>
      </div>
      {vanity.map((v, i) => (
        <div key={v.l} style={{ position: "absolute", left: 960, top: 330 + i * 120 + vanityFall * 140, transform: `translate(-50%,-50%) scale(${lerp(0.9, 1.06, p(t, v.at, 1.2))})`,
          opacity: p(t, v.at, 0.3) * (1 - vanityFall) }}>
          <Soft><span style={{ fontSize: 66, fontWeight: 800, color: INK.muted, whiteSpace: "nowrap" }}>{v.l.toUpperCase()}</span></Soft>
        </div>
      ))}
      {right.map((r, i) => (
        <div key={r.l} style={{ position: "absolute", left: 960, top: 330 + i * 120, transform: "translate(-50%,-50%)", opacity: p(t, r.at, 0.2) * (1 - rightOut), whiteSpace: "nowrap" }}>
          <Sharp t={t} at={r.at} style={{ fontSize: 66, fontWeight: 800, color: INK.strong }}>THE <span style={{ color: COLORS.crimson }}>RIGHT</span> {r.l.toUpperCase()}</Sharp>
        </div>
      ))}
      <Lines>{right.map((r, i) => <FocusTick key={r.l} x={960} y={330 + i * 120} t={t} at={r.at} r={120} />)}</Lines>
      {/* final lockup */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", opacity: p(t, C.broadDelivery, 0.5) }}>
        <Soft k={0.9}><span style={{ fontSize: 120, fontWeight: 800, color: INK.body }}>BROAD DELIVERY.</span></Soft>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", alignItems: "center", gap: 34, opacity: p(t, C.sharpStrategy, 0.2) }}>
        <div style={{ position: "relative" }}>
          <Sharp t={t} at={C.sharpStrategy} style={{ fontSize: 132, fontWeight: 800, color: COLORS.burgundy, letterSpacing: "-0.01em" }}>SHARP</Sharp>
          <svg width={600} height={600} style={{ position: "absolute", left: "50%", top: "50%", marginLeft: -300, marginTop: -300, overflow: "visible", pointerEvents: "none" }}>
            <ellipse cx={300} cy={300} rx={lerp(420, 245, ring)} ry={lerp(420, 245, ring) * 0.4} fill="none" stroke={COLORS.crimson} strokeWidth={3} opacity={ring * 0.9} />
            {Array.from({ length: 48 }, (_, i) => {
              const a = (i / 48) * Math.PI * 2, r0 = lerp(420, 245, ring) + 10;
              return <line key={i} x1={300 + Math.cos(a) * r0} y1={300 + Math.sin(a) * r0 * 0.4} x2={300 + Math.cos(a) * (r0 + (i % 6 === 0 ? 18 : 10))} y2={300 + Math.sin(a) * (r0 + (i % 6 === 0 ? 18 : 10)) * 0.4} stroke={COLORS.burgundy} strokeWidth={1.5} opacity={ring * 0.7} />;
            })}
          </svg>
        </div>
        <Sharp t={t} at={C.sharpStrategy + 0.25} style={{ fontSize: 132, fontWeight: 800, color: COLORS.maroon, letterSpacing: "-0.01em" }}>STRATEGY.</Sharp>
      </div>
    </AbsoluteFill>
  );
};

