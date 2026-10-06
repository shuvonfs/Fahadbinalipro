/** V2 scenes 01–09 (0 – 42s): hook, old targeting, AI shift, study-abroad example. */
import { random } from "remotion";
import { AdsPanel, AppTile, Chip, DISPLAY, FeedPost, K, KLine, Obj, Phone, PinNote, Pop, SelectBox, Stage, Toggle } from "../../../brand/kinetic/Kinetic";
import { BACK, IN_OUT, lerp, OUT, p, useT } from "../../../brand";
import { C } from "../../BroadSharp/cues";

type S = React.FC<{ start: number }>;
const Row: React.FC<{ label: string; children: React.ReactNode; k?: number }> = ({ label, children, k = 1 }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "14px 0", borderBottom: "1px solid #e4e6eb", opacity: k, transform: `translateY(${(1 - k) * 14}px)` }}>
    <span style={{ fontSize: 17, fontWeight: 700, color: "#1c1e21" }}>{label}</span>
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>{children}</div>
  </div>
);

// 01 — "Meta Ads-এ Broad Targeting ব্যবহার করছেন?"
export const S01: S = ({ start }) => {
  const t = useT(start);
  const tilt = p(t, 0.05, 1.1, OUT);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 200, top: 300 }}>
        <KLine t={t} size={70} align="flex-start" words={[{ w: "Using", at: 0.12, s: 0.6, wt: 600 }]} />
        <KLine t={t} size={70} align="flex-start" style={{ marginTop: 6 }} words={[{ w: "BROAD", at: 0.76, s: 2.4, wt: 900, c: K.accent, glow: true, ls: "-0.03em" }]} />
        <KLine t={t} size={70} align="flex-start" words={[{ w: "targeting", at: 1.04, s: 1.05, wt: 800 }, { w: "?", at: 1.5, s: 1.05, c: K.accent }]} />
      </div>
      <div style={{ position: "absolute", left: 1330, top: 560, transform: `translate(-50%,-50%) perspective(1600px) rotateX(${(1 - tilt) * 28}deg) rotateY(${-14 + tilt * 8}deg) translateY(${(1 - tilt) * 420}px)`, opacity: Math.min(1, tilt * 2) }}>
        <AdsPanel t={t} w={620} title="Audience">
          <Row label="Advantage+ audience"><Toggle on={p(t, C.targeting, 0.3)} /></Row>
          <Row label="Locations"><Chip>Bangladesh</Chip></Row>
          <Row label="Age"><span style={{ fontSize: 16, fontWeight: 700 }}>18 – 65+</span></Row>
          <Row label="Detailed targeting"><span style={{ fontSize: 15, fontWeight: 700, color: "#65676b" }}>Broad · let Meta find people</span></Row>
        </AdsPanel>
      </div>
      <Pop t={t} at={0.3} x={1050} y={250} from="scale"><AppTile name="meta" size={150} /></Pop>
    </Stage>
  );
};

// 02 — "তার মানে কিন্তু আপনার Marketing Strategy Broad হয়ে যায়নি।"
export const S02: S = ({ start }) => {
  const t = useT(start);
  return (
    <Stage t={t} dark>
      <div style={{ position: "absolute", left: 170, right: 640, top: 330 }}>
        <KLine t={t} dark size={62} align="flex-start" words={[{ w: "That", at: 2.6, s: 0.62, wt: 600, c: "rgba(255,255,255,0.7)" }, { w: "doesn't", at: 2.75, s: 0.62, wt: 600, c: "rgba(255,255,255,0.7)" }, { w: "mean", at: 2.9, s: 0.62, wt: 600, c: "rgba(255,255,255,0.7)" }]} />
        <KLine t={t} dark size={62} align="flex-start" style={{ marginTop: 10 }} words={[{ w: "your", at: 3.27, s: 1, wt: 700 }, { w: "MARKETING", at: 3.47, s: 1.45, wt: 900 }]} />
        <KLine t={t} dark size={62} align="flex-start" words={[{ w: "STRATEGY", at: 3.95, s: 1.9, wt: 900, glow: true }]} />
        <KLine t={t} dark size={62} align="flex-start" style={{ marginTop: 6 }} words={[{ w: "is", at: 4.3, s: 1, wt: 700 }, { w: "broad.", at: 4.47, s: 1.3, wt: 900, c: K.accent, glow: true, strike: 4.95 }]} />
      </div>
      <Obj name="bullseye" t={t} at={2.75} x={1480} y={560} size={460} from="right" mono rot={-8} />
    </Stage>
  );
};

// 03 — "বরং একটা সময় আমরা ভাবতাম— ‘আমি কাকে Target করব?’"
const BUSTS = [0, 1, 2, 3, 4, 5];
export const S03: S = ({ start }) => {
  const t = useT(start);
  const sweep = p(t, 5.9, 3.0, IN_OUT);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 200, top: 300 }}>
        <KLine t={t} size={54} align="flex-start" words={[{ w: "We", at: 5.77, s: 0.8, wt: 600 }, { w: "used", at: 5.9, s: 0.8, wt: 600 }, { w: "to", at: 6.0, s: 0.8, wt: 600 }, { w: "ask", at: 6.1, s: 0.8, wt: 600 }]} />
        <KLine t={t} size={54} align="flex-start" style={{ marginTop: 26 }} words={[{ w: "Who", at: 7.66, s: 1.6, wt: 800 }, { w: "do", at: 7.8, s: 1.6, wt: 800 }, { w: "I", at: 7.9, s: 1.6, wt: 800 }]} />
        <div style={{ marginTop: 28, marginLeft: 16 }}>
          <SelectBox t={t} at={8.25}><KLine t={t} size={54} align="flex-start" words={[{ w: "TARGET?", at: 8.05, s: 2.4, wt: 900, c: K.accent }]} /></SelectBox>
        </div>
      </div>
      {BUSTS.map((i) => (
        <Obj key={i} name="bust_in_silhouette" t={t} at={5.6 + i * 0.07} x={1080 + i * 125} y={620 + (i % 2) * 40} size={170} from="bottom" mono float={0.4} shadow={false} />
      ))}
      <Obj name="magnifying_glass_tilted_left" t={t} at={5.7} x={lerp(1000, 1680, sweep)} y={560 - Math.sin(sweep * Math.PI * 3) * 40} size={300} from="right" mono rot={-10} float={0.2} />
    </Stage>
  );
};

// 04 — "Interest কী হবে? Age কত? Location কোথায়? কোন Behaviour select করব?"
const Q4 = [
  { w: "Interest?", at: C.interest, chip: "Interest: Higher education" },
  { w: "Age?", at: C.age, chip: "Age: 21 – 30" },
  { w: "Location?", at: C.location, chip: "Location: Dhaka" },
  { w: "Behaviour?", at: C.behaviour, chip: "Behaviour: Engaged shoppers" },
];
export const S04: S = ({ start }) => {
  const t = useT(start);
  const narrowed = Q4.filter((q) => t > q.at + 0.2).length;
  const needle = lerp(0.82, 0.12, p(t, C.interest + 0.2, C.behaviour - C.interest + 0.4, OUT));
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 200, top: 250, display: "flex", flexDirection: "column", gap: 20 }}>
        {Q4.map((q, i) => (
          <KLine key={q.w} t={t} size={86} align="flex-start" words={[{ w: q.w, at: q.at, wt: i % 2 ? 600 : 900, c: i === 3 ? K.accent : undefined }]} />
        ))}
      </div>
      <Pop t={t} at={9.0} x={1310} y={560} from="right">
        <div style={{ transform: "scale(1.18)" }}><AdsPanel t={t} w={640} title="Detailed targeting">
          <div style={{ fontSize: 14, fontWeight: 700, color: "#65676b", marginBottom: 10 }}>Include people who match</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, minHeight: 92 }}>
            {Q4.map((q) => <Chip key={q.chip} k={p(t, q.at + 0.15, 0.35, BACK)}>{q.chip}</Chip>)}
          </div>
          <div style={{ marginTop: 22, fontSize: 15, fontWeight: 800 }}>Audience definition</div>
          <div style={{ position: "relative", height: 70, marginTop: 8 }}>
            <svg width={596} height={70}>
              <path d="M 40 62 Q 298 -10 556 62" fill="none" stroke="#e4e6eb" strokeWidth={14} strokeLinecap="round" />
              <circle cx={40 + needle * 516} cy={62 - 2 * needle * (1 - needle) * 72} r={12} fill="#1c1e21" stroke="#fff" strokeWidth={3} />
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700, color: "#65676b" }}><span>Specific</span><span>Broad</span></div>
          </div>
          <div style={{ marginTop: 22, fontSize: 14, color: narrowed >= 3 ? "#f02849" : "#65676b", fontWeight: 700 }}>{narrowed >= 3 ? "Your audience is very narrow." : "Narrowing manually…"}</div>
        </AdsPanel></div>
      </Pop>
    </Stage>
  );
};

// 05 — "কিন্তু আজকের AI-driven Meta Ads environment-এ প্রশ্নটা ধীরে ধীরে বদলাচ্ছে।"
const ORBIT = ["facebook", "instagram", "messenger", "whatsapp", "threads"] as const;
export const S05: S = ({ start }) => {
  const t = useT(start);
  return (
    <Stage t={t} dark>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150 }}>
        <KLine t={t} dark size={60} words={[{ w: "Today's", at: 13.75, s: 0.7, wt: 600, c: "rgba(255,255,255,0.7)" }, { w: "AI-DRIVEN", at: 14.3, s: 1.5, wt: 900, c: K.accent, glow: true }, { w: "Meta Ads", at: 14.9, s: 1.1, wt: 800 }]} />
      </div>
      {ORBIT.map((n, i) => {
        const a = (i / ORBIT.length) * Math.PI * 2 + t * 0.45;
        return (
          <Pop key={n} t={t} at={14.5 + i * 0.12} x={960 + Math.cos(a) * 470} y={560 + Math.sin(a) * 170}>
            <div style={{ transform: `scale(${0.75 + 0.25 * (Math.sin(a) + 1) / 2})`, opacity: 0.55 + 0.45 * (Math.sin(a) + 1) / 2 }}><AppTile name={n} size={130} /></div>
          </Pop>
        );
      })}
      <Pop t={t} at={13.75} x={960} y={560} from="scale">
        <div style={{ filter: `drop-shadow(0 0 ${40 + 20 * Math.sin(t * 3)}px rgba(176,16,44,0.55))` }}><AppTile name="meta" size={250} /></div>
      </Pop>
      <div style={{ position: "absolute", left: 0, right: 0, top: 790 }}>
        <KLine t={t} dark size={56} words={[{ w: "the", at: 16.5, s: 0.75, wt: 600 }, { w: "question", at: 16.65, s: 0.75, wt: 600 }, { w: "is", at: 16.8, s: 0.75, wt: 600 }, { w: "changing.", at: 17.1, s: 1.15, wt: 900, glow: true }]} />
      </div>
    </Stage>
  );
};

// 06 — "এখন শুধু ‘কাকে Target করব?’ না। বরং— ‘আমি আসলে কেমন Customer চাই?’"
export const S06: S = ({ start }) => {
  const t = useT(start);
  const aside = p(t, C.rather, 0.6, IN_OUT);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: lerp(200, 150, aside), top: lerp(380, 250, aside), transform: `scale(${lerp(1, 0.62, aside)})`, transformOrigin: "left top", filter: `blur(${aside * 2}px)`, opacity: lerp(1, 0.55, aside) }}>
        <KLine t={t} size={96} align="flex-start" words={[{ w: "“Who", at: 18.3, wt: 800 }, { w: "do", at: 18.45 }, { w: "I", at: 18.55 }, { w: "target?”", at: 18.7, wt: 900, strike: C.rather }]} />
      </div>
      <Pop t={t} at={C.whatCustomer - 0.1} x={1150} y={590} from="top" dur={0.7}>
        <PinNote t={t} at={C.whatCustomer} w={760} title="“What kind of customer do I actually want?”" rows={[]} />
      </Pop>
      <Obj name="light_bulb" t={t} at={C.silhouette} x={1640} y={360} size={280} from="spin" mono />
    </Stage>
  );
};

// 07 — Study abroad: "ধরুন … Study Abroad Consultancy … Meta-কে একটা broad audience দিলেন— Bangladesh-এর students।"
export const S07: S = ({ start }) => {
  const t = useT(start);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 200, top: 220 }}>
        <Pop t={t} at={23.1} x={110} y={0} from="left"><span style={{ padding: "8px 18px", borderRadius: 999, background: K.ink, color: "#fff", fontFamily: DISPLAY, fontWeight: 800, fontSize: 20, letterSpacing: "0.2em" }}>EXAMPLE 01</span></Pop>
        <KLine t={t} size={110} align="flex-start" style={{ marginTop: 50 }} words={[{ w: "Study", at: 23.6, wt: 900 }, { w: "Abroad", at: 23.9, wt: 900, c: K.accent }]} />
        <KLine t={t} size={110} align="flex-start" words={[{ w: "consultancy", at: 24.4, s: 0.5, wt: 600 }]} />
      </div>
      <Obj name="graduation_cap" t={t} at={23.3} x={470} y={740} size={300} from="spin" mono rot={-10} />
      <Obj name="airplane" t={t} at={24.3} x={820} y={680} size={220} from="left" mono rot={-14} />
      <Pop t={t} at={26.3} x={1380} y={560} from="right">
        <AdsPanel t={t} w={600} title="Audience">
          <Row label="Locations" k={p(t, C.metaGiven, 0.4)}>
            {t > C.students - 0.1 ? <SelectBox t={t} at={C.students} pad={8}><Chip x={false}>Bangladesh</Chip></SelectBox> : <Chip x={false}>Bangladesh</Chip>}
          </Row>
          <Row label="Advantage+ audience" k={p(t, C.broadAud, 0.4)}><Toggle on={p(t, C.broadAud + 0.2, 0.3)} /></Row>
          <Row label="Audience suggestion" k={p(t, C.students - 0.2, 0.4)}><span style={{ fontSize: 15, fontWeight: 700 }}>Students</span></Row>
        </AdsPanel>
      </Pop>
    </Stage>
  );
};

// 08 — "Meta অনেক ধরনের মানুষের কাছে আপনার ad দেখাতে পারে।"
export const S08: S = ({ start }) => {
  const t = useT(start);
  const dots = Array.from({ length: 110 }, (_, i) => {
    const col = i % 22, row = Math.floor(i / 22);
    const x = 140 + col * 78 + (row % 2) * 39, y = 330 + row * 120;
    return { x, y, d: Math.hypot(x - 960, y - 560) };
  }).filter((d) => Math.abs(d.x - 960) > 230);
  return (
    <Stage t={t} dark>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150 }}>
        <KLine t={t} dark size={58} words={[{ w: "Meta can show it to", at: 29.9, s: 0.75, wt: 600 }, { w: "MANY", at: 30.6, s: 1.3, wt: 900, c: K.accent, glow: true }, { w: "kinds of people", at: 30.9, s: 0.75, wt: 600 }]} />
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {dots.map((d, i) => {
          const lit = p(t, 30.0 + d.d / 900, 0.4);
          return (
            <g key={i} transform={`translate(${d.x} ${d.y})`} opacity={0.25 + lit * 0.75}>
              <circle cy={-10} r={9} fill={lit > 0.5 ? "#fff" : "#555"} />
              <path d="M -15 16 Q -15 0 0 0 Q 15 0 15 16 Z" fill={lit > 0.5 ? "#fff" : "#555"} />
              {lit > 0.05 && random(`r${i}`) > 0.6 ? <circle r={26 + lit * 10} fill="none" stroke={K.accent} strokeWidth={2} opacity={1 - lit} /> : null}
            </g>
          );
        })}
      </svg>
      <Pop t={t} at={29.75} x={960} y={590} from="bottom">
        <div style={{ transform: "scale(0.72)" }}>
          <Phone w={380}>
            <FeedPost t={t} platform="facebook" page="Global Study BD" text="Study in the UK 🇬🇧 Master's intake open — free consultation." w={356} cta="Learn more" headline="UK Master's 2026 intake"
              image={<div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "linear-gradient(135deg,#e9e3d6,#cfc6b4)" }}><Obj name="graduation_cap" t={t} at={-5} x={178} y={150} size={220} from="scale" mono float={0.5} /></div>} />
          </Phone>
        </div>
      </Pop>
    </Stage>
  );
};

// 09 — "কিন্তু আপনার Business Strategy যদি হয়— UK-তে Master's … academic profile … realistic budget … qualified enquiry তৈরি করা।"
export const S09: S = ({ start }) => {
  const t = useT(start);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 200, top: 250 }}>
        <KLine t={t} size={60} align="flex-start" words={[{ w: "But", at: 32.85, s: 0.75, wt: 600 }, { w: "if", at: 32.95, s: 0.75, wt: 600 }, { w: "your", at: 33.05, s: 0.75, wt: 600 }]} />
        <KLine t={t} size={60} align="flex-start" style={{ marginTop: 8 }} words={[{ w: "STRATEGY", at: 33.3, s: 1.9, wt: 900 }]} />
        <KLine t={t} size={60} align="flex-start" words={[{ w: "is", at: 33.9, s: 0.75, wt: 600 }, { w: "sharp —", at: 34.1, s: 1.1, wt: 900, c: K.accent }]} />
      </div>
      <div style={{ position: "absolute", left: 220, top: 760 }}>
        <SelectBox t={t} at={C.qualified + 0.4} pad={16}>
          <KLine t={t} size={64} align="flex-start" words={[{ w: "→", at: C.qualified, c: K.accent }, { w: "Qualified", at: C.qualified, wt: 900 }, { w: "enquiry", at: C.qualified + 0.2, wt: 900, c: K.accent }]} />
        </SelectBox>
      </div>
      <Pop t={t} at={34.6} x={1340} y={560} from="top" dur={0.7}>
        <PinNote t={t} at={34.6} w={640} title="Business strategy" rows={[
          { text: "UK Master's aspirants", at: C.ukMasters, icon: "graduation_cap" },
          { text: "Specific academic profile", at: C.academic, icon: "books" },
          { text: "Realistic budget", at: C.budget, icon: "credit_card" },
          { text: "Qualified enquiry", at: C.qualified, icon: "bullseye" },
        ]} />
      </Pop>
    </Stage>
  );
};

