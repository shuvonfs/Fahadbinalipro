/** Act 1 — hook, old way, the question changes, three examples (0 – 91s). */
import { AbsoluteFill } from "remotion";
import {
  ApartmentArt, ApertureWipe, At, BACK, Card, COLORS, curve, FocusLens, FocusTick, fieldDot, Icon, IconName, INK, IN_OUT,
  isHighlighted, lerp, Lines, OUT, p, Pill, Ripple, SAFE, seg, Sharp, Soft, Trail, TYPE, typed, useT,
} from "../../../brand";
import { C } from "../cues";
import { field } from "../field";

type S = React.FC<{ start: number }>;

/** Chapter tag "EXAMPLE 0X · TITLE" with icons. */
const ChapterTag: React.FC<{ t: number; at: number; index: string; title: string; icons: IconName[] }> = ({ t, at, index, title, icons }) => (
  <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10, display: "flex", alignItems: "center", gap: 16 }}>
    <Sharp t={t} at={at} style={{ ...TYPE.label, fontSize: 20, color: COLORS.crimson }}>Example {index}</Sharp>
    <span style={{ width: 40 * p(t, at, 0.5), height: 2, background: COLORS.crimson }} />
    <Sharp t={t} at={at + 0.12} style={{ ...TYPE.label, fontSize: 20, color: INK.strong }}>{title}</Sharp>
    {icons.map((ic, i) => <span key={ic} style={{ opacity: p(t, at + 0.3 + i * 0.1, 0.3) }}><Icon name={ic} size={28} /></span>)}
  </div>
);

/** Generic conceptual ad thumbnail (no platform UI). */
const AdThumb: React.FC<{ head: string; icon: IconName; w?: number }> = ({ head, icon, w = 230 }) => (
  <div style={{ width: w, borderRadius: 16, background: "#fff", border: `2px solid ${INK.line}`, boxShadow: "0 14px 34px rgba(45,0,1,0.1)", overflow: "hidden" }}>
    <div style={{ height: w * 0.42, background: "linear-gradient(135deg, rgba(114,0,19,0.16), rgba(128,1,31,0.05))", display: "grid", placeItems: "center" }}><Icon name={icon} size={w * 0.2} /></div>
    <div style={{ padding: "10px 14px", fontSize: w * 0.075, fontWeight: 800, color: INK.strong, lineHeight: 1.2 }}>{head}</div>
  </div>
);

// 01 — "Meta Ads-এ Broad Targeting ব্যবহার করছেন? তার মানে কিন্তু আপনার Marketing Strategy Broad হয়ে যায়নি।"
export const HookScene: S = ({ start }) => {
  const t = useT(start);
  const lensIn = p(t, C.strategy - 0.35, 0.8, OUT);
  const fall = p(t, C.broadNo + 0.15, 0.8, IN_OUT);
  const beam = p(t, C.targeting, 1.6, IN_OUT);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: lerp(-600, 1920, beam), top: 300, width: 600, height: 480, opacity: Math.sin(beam * Math.PI) * 0.5,
        background: "linear-gradient(90deg, rgba(128,1,31,0), rgba(128,1,31,0.10), rgba(128,1,31,0))", filter: "blur(12px)" }} />
      <At x={960} y={140} t={t} at={C.targeting - 0.1} dy={0}>
        <Soft k={1 - p(t, C.strategy, 0.6) * 0.4}><span style={{ ...TYPE.label, fontSize: 26, color: INK.strong }}>Broad targeting</span></Soft>
      </At>
      <div style={{ position: "absolute", left: lerp(2250, 960, lensIn), top: 540, transform: "translate(-50%,-50%)" }}>
        <FocusLens t={t} r={190} k={lensIn}>
          <Sharp t={t} at={C.strategy + 0.05} style={{ fontSize: 52, fontWeight: 800, color: COLORS.maroon, letterSpacing: "0.04em" }}>STRATEGY</Sharp>
        </FocusLens>
      </div>
      <div style={{ position: "absolute", left: 1330, top: 540 + fall * 90, transform: "translate(-50%,-50%)", opacity: p(t, C.broadNo - 0.25, 0.3) * (1 - fall) }}>
        <Soft><span style={{ fontSize: 52, fontWeight: 800, color: INK.muted }}>BROAD</span></Soft>
      </div>
      <At x={1205} y={540} t={t} at={C.broadNo + 0.1} scaleFrom={0.4} dy={0}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS.crimson, color: COLORS.ivory, display: "grid", placeItems: "center", fontSize: 44, fontWeight: 800 }}>≠</div>
      </At>
      <Lines><FocusTick x={960} y={540} t={t} at={C.strategy + 0.05} r={60} /></Lines>
    </AbsoluteFill>
  );
};

// 02 — "বরং একটা সময় আমরা ভাবতাম— 'আমি কাকে Target করব?' Interest কী হবে? Age কত? Location কোথায়? কোন Behaviour select করব?"
const DIALS: { l: string; v: string; at: number; icon: IconName }[] = [
  { l: "Interest", v: "Education", at: C.interest, icon: "star" }, { l: "Age", v: "Young adults", at: C.age, icon: "user" },
  { l: "Location", v: "Dhaka", at: C.location, icon: "pin" }, { l: "Behaviour", v: "Engaged", at: C.behaviour, icon: "cursor" },
];
export const Dial: React.FC<{ t: number; at: number; l: string; v: string; icon: IconName; out?: number }> = ({ t, at, l, v, icon, out }) => {
  const k = p(t, at, 0.18, IN_OUT); // mechanical click
  const o = out === undefined ? 1 : 1 - p(t, out, 0.4);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: o, transform: `translateY(${(1 - o) * 30}px)` }}>
      <div style={{ opacity: k }}><Pill size={15} hot={k}>{v}</Pill></div>
      <svg width={96} height={96} viewBox="-48 -48 96 96">
        <circle r={42} fill="#fff" stroke={INK.lineStrong} strokeWidth={2} />
        {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-36} x2={0} y2={-30} stroke={INK.lineStrong} strokeWidth={2} transform={`rotate(${i * 30})`} />)}
        <line x1={0} y1={0} x2={0} y2={-28} stroke={k > 0.5 ? COLORS.crimson : INK.body} strokeWidth={4} strokeLinecap="round" transform={`rotate(${-90 + k * 120})`} />
        <circle r={6} fill={COLORS.burgundy} />
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name={icon} size={22} /><span style={{ ...TYPE.label, fontSize: 15, color: INK.strong }}>{l}</span></div>
    </div>
  );
};
export const OldWayScene: S = ({ start }) => {
  const t = useT(start);
  const f = field(t);
  const rx = f.cx * 1920, ry = f.cy * 1080, rw = Math.min(1920, f.cw * 1920), rh = Math.min(1080, f.ch * 1080);
  const cropOn = p(t, C.interest - 0.05, 0.2);
  return (
    <AbsoluteFill>
      <Lines>
        <rect x={rx - rw / 2} y={ry - rh / 2} width={rw} height={rh} fill="none" stroke={COLORS.burgundy} strokeWidth={2.5} strokeDasharray="10 8" opacity={cropOn} />
        {/* mechanical reticle */}
        <g opacity={p(t, C.used + 0.4, 0.4)} transform={`translate(${rx} ${ry})`}>
          <circle r={58} fill="none" stroke={COLORS.crimson} strokeWidth={2.5} />
          <circle r={4} fill={COLORS.crimson} />
          {[0, 90, 180, 270].map((a) => <line key={a} x1={0} y1={-80} x2={0} y2={-64} stroke={COLORS.crimson} strokeWidth={3} transform={`rotate(${a})`} />)}
        </g>
      </Lines>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}>
        <span style={{ ...TYPE.label, fontSize: 18, color: INK.muted, opacity: p(t, C.used, 0.4) }}>How we used to think</span>
        <div style={{ marginTop: 10, fontSize: 52, fontWeight: 800, color: INK.strong, opacity: p(t, C.whoTarget, 0.1) }}>{typed("“Who do I target?”", t, C.whoTarget, 0.8)}</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 790, display: "flex", justifyContent: "center", gap: 120 }}>
        {DIALS.map((d) => <div key={d.l} style={{ opacity: p(t, C.whoTarget + 0.5, 0.5) }}><Dial t={t} at={d.at} l={d.l} v={d.v} icon={d.icon} /></div>)}
      </div>
      <ApertureWipe t={t} at={start} dur={0.8} from={0} to={1300} />
    </AbsoluteFill>
  );
};

// 03 — "কিন্তু আজকের AI-driven Meta Ads environment-এ প্রশ্নটা ধীরে ধীরে বদলাচ্ছে। এখন শুধু 'কাকে Target করব?' না। বরং— 'আমি আসলে কেমন Customer চাই?'"
export const QuestionScene: S = ({ start }) => {
  const t = useT(start);
  const aside = p(t, C.rather, 0.8, IN_OUT);
  const lensK = p(t, C.whatCustomer - 0.2, 0.7, OUT);
  return (
    <AbsoluteFill>
      {/* dials release */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 790, display: "flex", justifyContent: "center", gap: 120 }}>
        {DIALS.map((d, i) => <Dial key={d.l} t={t} at={-10} l={d.l} v={d.v} icon={d.icon} out={C.aiDriven + (3 - i) * 0.25} />)}
      </div>
      <At x={960} y={150} t={t} at={C.aiDriven + 0.2}><span style={{ ...TYPE.label, fontSize: 20, color: COLORS.crimson }}>AI-driven delivery · the aperture opens</span></At>
      <div style={{ position: "absolute", left: lerp(640, 430, aside), top: 470, transform: "translate(-50%,-50%)", opacity: p(t, C.notJustWho, 0.4) * lerp(1, 0.55, aside), filter: `blur(${aside * 3}px)` }}>
        <Card pad="26px 36px"><span style={{ fontSize: 44, fontWeight: 800, color: INK.body, whiteSpace: "nowrap" }}>“Who do I target?”</span></Card>
      </div>
      <div style={{ position: "absolute", left: 1170, top: 540, transform: "translate(-50%,-50%)" }}>
        <FocusLens t={t} r={250} k={lensK}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "0 30px" }}>
            <svg width={70} height={78} viewBox="-35 -42 70 78" style={{ filter: `blur(${(1 - p(t, C.silhouette, 0.6)) * 8}px)`, opacity: p(t, C.silhouette - 0.4, 0.5) }}>
              <circle cy={-22} r={16} fill={COLORS.burgundy} /><path d="M -30 34 Q -30 0 0 0 Q 30 0 30 34 Z" fill={COLORS.burgundy} />
            </svg>
            <Sharp t={t} at={C.whatCustomer} dur={0.6} style={{ fontSize: 36, fontWeight: 800, color: COLORS.maroon, lineHeight: 1.15 }}>What kind of customer do I actually want?</Sharp>
          </div>
        </FocusLens>
      </div>
      <Lines><FocusTick x={1170} y={540} t={t} at={C.whatCustomer + 0.1} r={90} /></Lines>
    </AbsoluteFill>
  );
};

// 04 — Study abroad: broad delivery vs sharp strategy brief
const BRIEF4 = [
  { l: "UK Master's", at: C.ukMasters, icon: "uni" as IconName },
  { l: "Academic profile", at: C.academic, icon: "student" as IconName },
  { l: "Realistic budget", at: C.budget, icon: "wallet" as IconName },
];
export const StudyScene: S = ({ start }) => {
  const t = useT(start);
  const rack = p(t, C.bizStrategy, 0.8, IN_OUT);
  return (
    <AbsoluteFill>
      <ChapterTag t={t} at={C.study} index="01" title="Study abroad" icons={["student", "uni", "passport"]} />
      <At x={560} y={185} t={t} at={C.broadAud} out={C.students - 0.1} dy={0}><Soft><span style={{ ...TYPE.label, fontSize: 24, color: INK.strong }}>Delivery · broad</span></Soft></At>
      <At x={560} y={185} t={t} at={C.students} dy={0}><Soft k={lerp(1, 0.6, rack)}><span style={{ ...TYPE.label, fontSize: 24, color: INK.strong }}>Bangladesh · students</span></Soft></At>
      {/* ads touching many people */}
      {[0, 1, 2].map((i) => {
        const k = p(t, C.manyPeople + i * 0.35, 3.0, (x) => x);
        const x = lerp(160, 1300, k), y = 360 + i * 200;
        const o = Math.min(1, k * 6) * (1 - p(t, C.bizStrategy, 0.5));
        return (
          <div key={i}>
            <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: o }}><Ripple x={x + 80} y={y + 55} t={t} k={1} level={1.3} base={70} speed={0.9} /></svg>
            <div style={{ position: "absolute", left: x, top: y, opacity: o, transform: `scale(0.75)` }}>
              <AdThumb head={["Study in the UK", "Master's intake open", "Apply this term"][i]} icon="uni" w={220} />
            </div>
          </div>
        );
      })}
      {/* sharp strategy brief (front layer) */}
      <div style={{ position: "absolute", left: 1480, top: 560, transform: `translate(-50%,-50%) scale(${lerp(0.94, 1, rack)})`, opacity: rack, filter: `blur(${(1 - rack) * 8}px)` }}>
        <Card w={560} pad="30px 34px" glass>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <svg width={30} height={30} viewBox="-15 -15 30 30"><circle r={12} fill="none" stroke={COLORS.crimson} strokeWidth={2.5} /><circle r={3} fill={COLORS.crimson} /></svg>
            <span style={{ ...TYPE.label, fontSize: 19, color: COLORS.crimson }}>Strategy brief</span>
          </div>
          {BRIEF4.map((b) => (
            <div key={b.l} style={{ display: "flex", alignItems: "center", gap: 16, height: 64, borderTop: `2px solid ${INK.line}` }}>
              <Icon name={b.icon} size={32} />
              <Sharp t={t} at={b.at} style={{ fontSize: 30, fontWeight: 800, color: INK.strong }}>{b.l}</Sharp>
            </div>
          ))}
          <div style={{ marginTop: 16, opacity: p(t, C.qualified, 0.3) }}>
            <Sharp t={t} at={C.qualified} style={{ display: "block" }}><Pill size={22} hot={1}><Icon name="target" size={28} color={COLORS.ivory} />Qualified enquiry</Pill></Sharp>
          </div>
        </Card>
      </div>
      <At x={760} y={960} t={t} at={C.qualified + 0.4}><span style={{ ...TYPE.label, fontSize: 17, color: COLORS.crimson }}>The system can find them inside the broad field</span></At>
      <ApertureWipe t={t} at={start} dur={0.8} from={0} to={1300} />
    </AbsoluteFill>
  );
};

// 05 — "তাহলে আপনার strategy কিন্তু broad না। আপনার delivery broad, Customer definition sharp, Offer sharp, Message sharp, Conversion goal sharp।"
const ROWS = [
  { l: "Customer definition", at: C.customerDef, tag: C.sharp1 },
  { l: "Offer", at: C.offer, tag: C.offer + 0.32 },
  { l: "Message", at: C.message, tag: C.message + 0.35 },
  { l: "Conversion goal", at: C.conversion, tag: C.goalSharp },
];
const Ruler: React.FC<{ w: number; sharpK: number }> = ({ w, sharpK }) => (
  <svg width={w} height={30} style={{ filter: `blur(${(1 - sharpK) * 3}px)` }}>
    <line x1={0} y1={22} x2={w} y2={22} stroke={INK.lineStrong} strokeWidth={1.5} />
    {Array.from({ length: 25 }, (_, i) => <line key={i} x1={(i / 24) * w} y1={i % 4 === 0 ? 6 : 13} x2={(i / 24) * w} y2={22} stroke={INK.lineStrong} strokeWidth={i % 4 === 0 ? 2 : 1.2} />)}
    <line x1={0} y1={27} x2={w * sharpK} y2={27} stroke={COLORS.crimson} strokeWidth={2.5} />
  </svg>
);
export const DialScene: S = ({ start }) => {
  const t = useT(start);
  const top = 300;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: 150, display: "flex", alignItems: "center", gap: 20 }}>
        <Sharp t={t} at={C.stratNotBroad} style={{ ...TYPE.title, fontSize: 54 }}>Strategy</Sharp>
        <span style={{ position: "relative", opacity: p(t, C.stratNotBroad + 0.3, 0.3) * (1 - p(t, C.broadNa + 0.4, 0.5)) }}>
          <Soft><span style={{ fontSize: 54, fontWeight: 800, color: INK.muted }}>≠ broad</span></Soft>
        </span>
      </div>
      {/* delivery row — deliberately soft */}
      <div style={{ position: "absolute", left: SAFE.x, top, width: 1000, height: 110, display: "flex", alignItems: "center", gap: 30, borderBottom: `2px solid ${INK.line}`, opacity: p(t, C.delivery - 0.1, 0.5) }}>
        <Soft><span style={{ width: 330, display: "inline-block", fontSize: 30, fontWeight: 800, color: INK.body }}>DELIVERY</span></Soft>
        <div style={{ width: 400, height: 28, borderRadius: 28, background: `linear-gradient(90deg, rgba(128,1,31,0), rgba(128,1,31,0.35), rgba(128,1,31,0))`, filter: "blur(6px)", transform: `scaleX(${lerp(0.4, 1.15, p(t, C.delivery, 1.0, OUT))})` }} />
        <Soft><span style={{ ...TYPE.label, fontSize: 20, color: INK.muted, opacity: p(t, C.delivery + 0.44, 0.3) }}>Broad</span></Soft>
      </div>
      {ROWS.map((r, i) => {
        const k = p(t, r.at, 0.4, OUT);
        const tag = p(t, r.tag, 0.3, BACK);
        return (
          <div key={r.l} style={{ position: "absolute", left: SAFE.x, top: top + 125 + i * 118, width: 1000, height: 104, display: "flex", alignItems: "center", gap: 30, borderBottom: `2px solid ${INK.line}`, opacity: Math.min(1, k * 2) }}>
            <Sharp t={t} at={r.at} style={{ width: 330, fontSize: 30, fontWeight: 800, color: INK.strong }}>{r.l.toUpperCase()}</Sharp>
            <Ruler w={400} sharpK={k} />
            <span style={{ opacity: tag, transform: `scale(${lerp(0.7, 1, tag)})` }}><Pill size={17} hot={1}>Sharp</Pill></span>
          </div>
        );
      })}
      {/* right: lens depth stack */}
      <div style={{ position: "absolute", left: 1530, top: 600, transform: "translate(-50%,-50%)" }}>
        <FocusLens t={t} r={220} k={p(t, C.delivery - 0.2, 0.7)}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <div style={{ width: 300, height: 22, borderRadius: 22, background: "rgba(114,0,19,0.25)", filter: "blur(5px)", opacity: p(t, C.delivery, 0.4) }} />
            {ROWS.map((r) => <div key={r.l} style={{ width: 170 * p(t, r.at, 0.4, OUT), height: 12, borderRadius: 3, background: COLORS.burgundy }} />)}
          </div>
        </FocusLens>
      </div>
      <Lines>{ROWS.map((r, i) => <FocusTick key={r.l} x={SAFE.x + 1000} y={top + 125 + i * 118 + 52} t={t} at={r.tag} r={26} />)}</Lines>
    </AbsoluteFill>
  );
};

// 06 — Doctor: broad audience, specific problem → need → "Audience broad হতে পারে, কিন্তু message specific।"
export const DoctorScene: S = ({ start }) => {
  const t = useT(start);
  const f = field(t);
  const right = p(t, C.fSpecific, 0.5);
  const softL = p(t, C.fBroad, 0.5);
  const wave = Array.from({ length: 60 }, (_, i) => `${i === 0 ? "M" : "L"} ${860 + i * 15} ${520 + Math.sin(i * 0.55) * 18 * (1 - i / 80)}`).join(" ");
  const threads = Array.from({ length: 640 }, (_, i) => i).filter((i) => isHighlighted(i, f)).map((i) => fieldDot(i, f, t)).filter((d) => d.x > 900).slice(0, 7);
  return (
    <AbsoluteFill>
      <ChapterTag t={t} at={C.doctor} index="02" title="Healthcare" icons={["steth", "cal"]} />
      <At x={1300} y={185} t={t} at={C.audBroad} dy={0}><Soft><span style={{ ...TYPE.label, fontSize: 24, color: INK.strong }}>Audience · broad</span></Soft></At>
      {/* conceptual ad creative */}
      <At x={620} y={530} t={t} at={C.creativeSays} dy={50}>
        <div style={{ width: 420, borderRadius: 32, background: "#fff", border: `2px solid ${INK.line}`, boxShadow: "0 40px 90px rgba(45,0,1,0.14)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.burgundy }} />
            <div><div style={{ fontSize: 15, fontWeight: 800, color: INK.strong }}>Heart Care Clinic</div><div style={{ fontSize: 11, fontWeight: 600, color: INK.muted }}>Sponsored</div></div>
          </div>
          <div style={{ height: 190, background: "linear-gradient(135deg, #F3E7DA, #FBFCEB)", display: "grid", placeItems: "center" }}><Icon name="steth" size={92} color={COLORS.burgundy} stroke={1.3} /></div>
          <div style={{ padding: "18px 22px 8px", minHeight: 150 }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: INK.strong, lineHeight: 1.22 }}>{typed("বারবার chest discomfort হচ্ছে?", t, C.chest, 1.4)}</div>
            <div style={{ fontSize: 21, fontWeight: 600, color: INK.body, marginTop: 10, lineHeight: 1.3 }}>{typed("একজন qualified cardiologist-এর পরামর্শ নিন।", t, C.cardio, 1.8)}</div>
          </div>
          <div style={{ padding: "8px 22px 22px", opacity: p(t, C.cardio + 1.6, 0.4) }}><Pill size={15} hot={1}>Book consultation</Pill></div>
        </div>
      </At>
      <At x={1350} y={300} t={t} at={C.people} out={C.problem} dy={0}><Soft><Pill size={16} outline>Targeting “people” alone</Pill></Soft></At>
      <Lines>
        <Trail d={wave} t={t} at={C.problem} dur={1.4} labelSide="none" width={2.5} />
        {threads.map((d, i) => <Trail key={i} d={curve(830, 600, d.x, d.y)} t={t} at={C.connect + i * 0.08} dur={0.5} labelSide="none" width={1.6} />)}
      </Lines>
      <At x={1330} y={410} t={t} at={C.problem + 0.4} dy={0}><Sharp t={t} at={C.problem + 0.4}><Pill size={18} hot={1}>Problem · chest discomfort</Pill></Sharp></At>
      <At x={1330} y={650} t={t} at={C.need} dy={0}><Sharp t={t} at={C.need}><Pill size={18}>Need · qualified cardiologist advice</Pill></Sharp></At>
      {/* rack-focus formula */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 905, display: "flex", justifyContent: "center", alignItems: "center", gap: 70, opacity: p(t, C.formula, 0.4) }}>
        <div style={{ filter: `blur(${softL * 2.2}px)`, letterSpacing: `${softL * 0.12}em`, fontSize: 46, fontWeight: 800, color: INK.body }}>AUDIENCE: BROAD</div>
        <div style={{ width: 3, height: 60, background: COLORS.crimson }} />
        <div style={{ filter: `blur(${(1 - right) * 6}px)`, opacity: lerp(0.35, 1, right), fontSize: 46, fontWeight: 800, color: COLORS.burgundy }}>MESSAGE: SPECIFIC</div>
      </div>
      <ApertureWipe t={t} at={start} dur={0.8} from={0} to={1300} />
    </AbsoluteFill>
  );
};

// 07 — Real estate: one building, two lenses → "এটাই Strategy।"
const MiniCluster: React.FC<{ x: number; y: number; t: number; k: number; seed: string }> = ({ x, y, t, k, seed }) => (
  <g opacity={k}>
    {Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2 + t * 0.2 + seed.length, rr = 14 + ((i * 7) % 5) * 9;
      return <circle key={i} cx={x + Math.cos(a) * rr} cy={y + Math.sin(a) * rr * 0.8} r={4} fill={COLORS.crimson} />;
    })}
  </g>
);
export const RealEstateScene: S = ({ start }) => {
  const t = useT(start);
  const zoom = p(t, C.deliveryBroad, 2.0, IN_OUT);
  const lensA = p(t, C.family - 0.3, 0.7, OUT);
  const lensB = p(t, C.nextProperty - 0.3, 0.7, OUT);
  const close = C.thisStrategy;
  const tags = [{ l: "Need", at: C.needW }, { l: "Intent", at: C.intent }, { l: "Context", at: C.contextW }];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${lerp(1, 0.94, zoom)})` }}>
        <ChapterTag t={t} at={C.realEstate} index="03" title="Real estate · Dhaka" icons={["building", "pin"]} />
        <At x={960} y={560} t={t} at={C.realEstate + 0.4} dy={40}>
          <div style={{ width: 460, borderRadius: 24, overflow: "hidden", border: `2px solid ${INK.line}`, boxShadow: "0 30px 70px rgba(45,0,1,0.12)" }}><ApartmentArt family={0} t={t} /></div>
        </At>
        <At x={960} y={760} t={t} at={C.realEstate + 1.2}><span style={{ ...TYPE.label, fontSize: 16 }}>Residential project · broad audience</span></At>
        {/* lens cones */}
        <Lines>
          <path d="M 520 470 L 300 760 L 420 830 Z" fill={COLORS.crimson} opacity={0.06 * lensA} />
          <path d="M 1400 470 L 1500 830 L 1620 760 Z" fill={COLORS.crimson} opacity={0.06 * lensB} />
          <Trail d={seg(520, 470, 370, 760)} t={t} at={C.family - 0.3} dur={0.5} labelSide="none" width={1.6} />
          <Trail d={seg(1400, 470, 1550, 760)} t={t} at={C.nextProperty - 0.3} dur={0.5} labelSide="none" width={1.6} />
          <circle cx={360} cy={800} r={78} fill="rgba(255,255,255,0.55)" stroke={COLORS.burgundy} strokeWidth={2.5} opacity={lensA} />
          <circle cx={1560} cy={800} r={78} fill="rgba(255,255,255,0.55)" stroke={COLORS.burgundy} strokeWidth={2.5} opacity={lensB} />
          <MiniCluster x={360} y={800} t={t} k={lensA} seed="a" />
          <MiniCluster x={1560} y={800} t={t} k={lensB} seed="bb" />
          <FocusTick x={360} y={800} t={t} at={C.family} r={70} />
          <FocusTick x={1560} y={800} t={t} at={C.nextProperty} r={70} />
        </Lines>
        <At x={480} y={330} t={t} at={C.creativeA} dx={-40} dy={0}>
          <div style={{ transform: `perspective(900px) rotateY(${(1 - p(t, C.creativeA, 0.7)) * 35}deg)` }}>
            <Card w={420} pad="20px 24px">
              <div style={{ ...TYPE.label, fontSize: 14, color: COLORS.crimson, marginBottom: 8 }}>Creative A</div>
              <div style={{ fontSize: 25, fontWeight: 800, color: INK.strong, lineHeight: 1.3, minHeight: 66 }}>{typed("নিজের পরিবারের জন্য Dhaka-তে 3-bedroom apartment খুঁজছেন?", t, C.creativeA + 0.9, 3.0)}</div>
            </Card>
          </div>
        </At>
        <At x={1440} y={330} t={t} at={C.creativeB} dx={40} dy={0}>
          <div style={{ transform: `perspective(900px) rotateY(${(1 - p(t, C.creativeB, 0.7)) * -35}deg)` }}>
            <Card w={420} pad="20px 24px">
              <div style={{ ...TYPE.label, fontSize: 14, color: COLORS.crimson, marginBottom: 8 }}>Creative B</div>
              <div style={{ fontSize: 25, fontWeight: 800, color: INK.strong, lineHeight: 1.3, minHeight: 66 }}>{typed("আপনার next property কি investment-এর জন্য?", t, C.creativeB + 1.0, 2.0)}</div>
            </Card>
          </div>
        </At>
        {[{ l: "Family", at: C.family }, { l: "Dhaka", at: C.dhaka }, { l: "3-bedroom", at: C.bedroom }].map((g, i) => (
          <At key={g.l} x={470} y={735 + i * 50} anchor="left" t={t} at={g.at} dy={0} dx={-20}><Sharp t={t} at={g.at}><Pill size={15} hot={1}>{g.l}</Pill></Sharp></At>
        ))}
        {[{ l: "Investor", at: C.nextProperty }, { l: "Return / value", at: C.investment }].map((g, i) => (
          <At key={g.l} x={1450} y={760 + i * 50} anchor="right" t={t} at={g.at} dy={0} dx={20}><Sharp t={t} at={g.at}><Pill size={15} hot={1}>{g.l}</Pill></Sharp></At>
        ))}
        <At x={960} y={170} t={t} at={C.deliveryBroad + 0.3}><span style={{ ...TYPE.label, fontSize: 18, color: INK.strong }}>Same project · different focus</span></At>
        <div style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center", gap: 22 }}>
          {tags.map((g) => (
            <span key={g.l} style={{ opacity: p(t, g.at, 0.2) }}>
              <Sharp t={t} at={g.at}><span style={{ display: "inline-block", padding: "10px 24px", borderRadius: 12, border: `2px solid ${COLORS.burgundy}`, fontSize: 22, fontWeight: 800, letterSpacing: "0.14em", color: COLORS.burgundy,
                boxShadow: `inset 0 -${4 * p(t, C.specific, 0.4)}px 0 ${COLORS.crimson}` }}>{g.l.toUpperCase()}</span></Sharp>
            </span>
          ))}
        </div>
      </div>
      <ApertureWipe t={t} at={close} dur={0.8} from={1400} to={240} />
      <At x={960} y={540} t={t} at={close + 0.45} dy={0} scaleFrom={1.2}>
        <div style={{ padding: "18px 44px", borderRadius: 999, background: COLORS.burgundy, color: COLORS.ivory, fontSize: 52, fontWeight: 800, letterSpacing: "0.12em", boxShadow: "0 30px 70px rgba(114,0,19,0.35)" }}>STRATEGY</div>
      </At>
      <ApertureWipe t={t} at={start} dur={0.8} from={0} to={1300} />
    </AbsoluteFill>
  );
};

