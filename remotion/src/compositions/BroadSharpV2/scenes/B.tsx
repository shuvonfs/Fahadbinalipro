/** V2 scenes 10–18 (42 – 131s): staircase, doctor, flowchart, real estate, comparison, never-broad chain. */
import { Img, staticFile } from "remotion";
import { AppTile, DISPLAY, FeedPost, K, KLine, Obj, Phone, Pop, SelectBox, shake, Stage, Stamp } from "../../../brand/kinetic/Kinetic";
import { drawn, IN_OUT, lerp, OUT, p, useT } from "../../../brand";
import { C } from "../../BroadSharp/cues";

type S = React.FC<{ start: number }>;
const Tag: React.FC<{ children: React.ReactNode; hot?: boolean; size?: number }> = ({ children, hot, size = 22 }) => (
  <span style={{ display: "inline-block", padding: `${size * 0.4}px ${size * 0.9}px`, borderRadius: 999, background: hot ? K.accent : K.ink, color: "#fff", fontFamily: DISPLAY, fontWeight: 800, fontSize: size, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{children}</span>
);
const Icon3D: React.FC<{ name: string; size?: number; mono?: boolean }> = ({ name, size = 70, mono = true }) => (
  <Img src={staticFile(`broad-sharp-v2/3d/${name}.png`)} style={{ width: size, height: size, filter: mono ? "grayscale(1) contrast(1.15)" : undefined }} />
);

// 10 — "তাহলে আপনার strategy কিন্তু broad না। delivery broad, Customer definition sharp, Offer sharp, Message sharp, Conversion goal sharp।"
const STEPS = [
  { l: "Customer definition", at: C.customerDef, h: 170 },
  { l: "Offer", at: C.offer, h: 270 },
  { l: "Message", at: C.message, h: 370 },
  { l: "Conversion goal", at: C.conversion, h: 470 },
];
export const S10: S = ({ start }) => {
  const t = useT(start);
  const base = 830;
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 200, top: 170 }}>
        <KLine t={t} size={64} align="flex-start" words={[{ w: "Strategy?", at: 42.73, wt: 900 }, { w: "Not broad.", at: C.broadNa, wt: 900, c: K.accent }]} />
      </div>
      {/* wide soft delivery base */}
      <div style={{ position: "absolute", left: 200, top: base, width: lerp(0, 1520, p(t, C.delivery, 0.8, OUT)), height: 70, borderRadius: 10, overflow: "hidden",
        background: "linear-gradient(90deg, rgba(20,16,18,0.08), rgba(20,16,18,0.28), rgba(20,16,18,0.08))" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 18, padding: "0 26px", fontFamily: DISPLAY, fontWeight: 800, fontSize: 26, letterSpacing: "0.3em", color: K.soft, filter: "blur(0.6px)" }}>
          DELIVERY <span style={{ letterSpacing: "0.4em", fontWeight: 600 }}>· BROAD ·</span>
        </div>
      </div>
      {STEPS.map((s, i) => {
        const k = p(t, s.at, 0.55, OUT);
        const x = 260 + i * 380;
        return (
          <div key={s.l}>
            <div style={{ position: "absolute", left: x, top: base - s.h * k, width: 330, height: s.h * k, background: `linear-gradient(180deg, ${i === 3 ? K.accent : "#2a2426"}, ${i === 3 ? "#6d0014" : K.ink})`,
              borderRadius: "8px 8px 0 0", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.18), 0 20px 40px rgba(0,0,0,0.2)" }} />
            <div style={{ position: "absolute", left: x, width: 330, top: base - s.h - 92, textAlign: "center", opacity: k, filter: `blur(${(1 - k) * 8}px)` }}>
              <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 30, color: K.ink, lineHeight: 1.05, letterSpacing: "-0.01em" }}>{s.l}</div>
              <div style={{ marginTop: 10, opacity: p(t, s.at + 0.35, 0.3) }}><Tag hot size={17}>SHARP</Tag></div>
            </div>
          </div>
        );
      })}
    </Stage>
  );
};

// 11 — Doctor: "ধরুন একজন Doctor-এর জন্য campaign … Audience broad রাখলেন। কিন্তু Creative বলছে— …"
export const S11: S = ({ start }) => {
  const t = useT(start);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 200, top: 220 }}>
        <Pop t={t} at={50.4} x={110} y={0} from="left"><Tag size={20}>EXAMPLE 02</Tag></Pop>
        <KLine t={t} size={110} align="flex-start" style={{ marginTop: 50 }} words={[{ w: "Doctor", at: 51.1, wt: 900, c: K.accent }]} />
        <KLine t={t} size={110} align="flex-start" words={[{ w: "campaign", at: 51.6, s: 0.5, wt: 600 }]} />
      </div>
      <Obj name="stethoscope" t={t} at={50.6} x={430} y={720} size={330} from="spin" mono rot={-10} />
      <Pop t={t} at={C.audBroad} x={760} y={800} from="left">
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderRadius: 14, background: "#fff", boxShadow: "0 16px 40px rgba(0,0,0,0.14)", fontFamily: DISPLAY, fontWeight: 800, fontSize: 22 }}>
          Audience: <span style={{ color: K.soft, letterSpacing: "0.2em", filter: "blur(0.8px)" }}>BROAD</span>
        </div>
      </Pop>
      <Pop t={t} at={C.creativeSays - 0.1} x={1300} y={545} from="bottom" dur={0.7}>
        <div style={{ transform: "scale(0.8) rotate(2deg)" }}>
          <Phone w={380}>
            <FeedPost t={t} platform="instagram" page="Heart Care Clinic" text="বারবার chest discomfort হচ্ছে? একজন qualified cardiologist-এর পরামর্শ নিন।" textAt={C.chest} typeDur={3.6} w={356} cta="Book now" headline="Cardiology consultation"
              image={<div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#efe9df,#d8cfc0)" }}><Obj name="stethoscope" t={t} at={-5} x={178} y={150} size={230} from="scale" mono float={0.5} /></div>} />
          </Phone>
        </div>
      </Pop>
      {/* selection on the problem the creative names */}
      <Pop t={t} at={C.chest + 0.5} x={1620} y={330} from="right">
        <SelectBox t={t} at={C.chest + 0.6}><Tag hot size={20}>chest discomfort</Tag></SelectBox>
      </Pop>
    </Stage>
  );
};

// 12 — "এখানে আপনি শুধু ‘মানুষ’ target করছেন না। … specific problem … specific need-এর সঙ্গে connect করছেন।"
const FLOW = [
  { k: "Creative", v: "Heart-care ad", icon: "mobile_phone", at: C.people },
  { k: "Problem", v: "Chest discomfort", icon: "red_heart", at: C.problem },
  { k: "Need", v: "Cardiologist advice", icon: "stethoscope", at: C.need },
  { k: "Connection", v: "The right patient", icon: "check_mark_button", at: C.connect },
];
export const S12: S = ({ start }) => {
  const t = useT(start);
  const xs = [330, 750, 1170, 1590];
  const y = 560;
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 190 }}>
        <KLine t={t} size={58} words={[{ w: "Not just", at: 59.9, s: 0.8, wt: 600 }, { w: "“people”", at: 60.2, wt: 900, strike: 61.3 }, { w: "→", at: 62.0, c: K.accent }, { w: "a specific", at: 62.1, s: 0.8, wt: 600 }, { w: "NEED", at: 64.6, wt: 900, c: K.accent, glow: true }]} />
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill={K.ink} /></marker></defs>
        {xs.slice(0, -1).map((x, i) => {
          const d = `M ${x + 165} ${y} L ${xs[i + 1] - 175} ${y}`;
          const dd = drawn(d, t, FLOW[i + 1].at - 0.25, 0.35);
          return (
            <g key={i}>
              <path d={d} stroke={K.ink} strokeWidth={4} fill="none" strokeDasharray={dd.strokeDasharray} strokeDashoffset={dd.strokeDashoffset} markerEnd={t > FLOW[i + 1].at ? "url(#ah)" : undefined} />
              {t > FLOW[i + 1].at ? <path d={d} stroke={K.accent} strokeWidth={4} fill="none" strokeDasharray="10 16" strokeDashoffset={-t * 60} opacity={0.9} /> : null}
            </g>
          );
        })}
      </svg>
      {FLOW.map((f, i) => (
        <Pop key={f.k} t={t} at={f.at} x={xs[i]} y={y} from="bottom">
          <div style={{ width: 320, padding: "26px 22px", borderRadius: 22, background: i === 3 ? K.ink : "#fff", color: i === 3 ? "#fff" : K.ink, boxShadow: "0 30px 60px rgba(0,0,0,0.16)", textAlign: "center", fontFamily: DISPLAY }}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: -70 }}><Icon3D name={f.icon} size={96} mono={i !== 1} /></div>
            <div style={{ marginTop: 8, fontSize: 16, fontWeight: 800, letterSpacing: "0.22em", color: i === 3 ? "rgba(255,255,255,0.65)" : K.soft }}>{f.k.toUpperCase()}</div>
            <div style={{ marginTop: 8, fontSize: 30, fontWeight: 900, letterSpacing: "-0.01em" }}>{f.v}</div>
          </div>
        </Pop>
      ))}
    </Stage>
  );
};

// 13 — "অর্থাৎ— Audience broad হতে পারে, কিন্তু message specific।"
export const S13: S = ({ start }) => {
  const t = useT(start);
  return (
    <Stage t={t} dark>
      <div style={{ position: "absolute", left: 0, right: 0, top: 300 }}>
        <KLine t={t} dark size={92} words={[{ w: "Audience", at: 67.78, wt: 900 }, { w: "can be broad,", at: 68.18, s: 0.7, wt: 600, c: "rgba(255,255,255,0.45)", ls: "0.08em" }]} />
        <KLine t={t} dark size={92} style={{ marginTop: 40 }} words={[{ w: "Message", at: 69.46, wt: 900 }, { w: "must be", at: 69.7, s: 0.7, wt: 600 }, { w: "SPECIFIC.", at: 69.94, wt: 900, c: K.accent, glow: true }]} />
      </div>
    </Stage>
  );
};

// 14 — Real estate: "আর Real Estate-এ ধরুন— … Creative বলছে— ‘নিজের পরিবারের জন্য Dhaka-তে 3-bedroom apartment খুঁজছেন?’"
const AdImage: React.FC<{ t: number; obj: string; obj2?: string; label: string }> = ({ t, obj, obj2, label }) => (
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#ece6da,#cdbfa9)" }}>
    <Obj name={obj} t={t} at={-5} x={obj2 ? 130 : 178} y={150} size={200} from="scale" mono float={0.4} />
    {obj2 ? <Obj name={obj2} t={t} at={-5} x={250} y={185} size={150} from="scale" mono float={0.6} /> : null}
    <div style={{ position: "absolute", left: 14, bottom: 14, padding: "6px 12px", borderRadius: 6, background: K.ink, color: "#fff", fontFamily: DISPLAY, fontWeight: 800, fontSize: 15 }}>{label}</div>
  </div>
);
export const S14: S = ({ start }) => {
  const t = useT(start);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 200, top: 220 }}>
        <Pop t={t} at={70.9} x={110} y={0} from="left"><Tag size={20}>EXAMPLE 03</Tag></Pop>
        <KLine t={t} size={110} align="flex-start" style={{ marginTop: 50 }} words={[{ w: "Real", at: 71.3, wt: 900 }, { w: "Estate", at: 71.6, wt: 900, c: K.accent }]} />
        <KLine t={t} size={110} align="flex-start" words={[{ w: "Dhaka · residential project", at: 73.2, s: 0.42, wt: 600 }]} />
      </div>
      <Obj name="office_building" t={t} at={71.0} x={380} y={720} size={300} from="bottom" mono />
      <Obj name="houses" t={t} at={71.4} x={700} y={770} size={230} from="bottom" mono />
      <Pop t={t} at={C.creativeA - 0.15} x={1340} y={545} from="right" dur={0.7}>
        <div style={{ transform: "scale(0.8) rotate(-2deg)" }}>
          <Phone w={380}>
            <FeedPost t={t} platform="facebook" page="Skyline Residences" text="নিজের পরিবারের জন্য Dhaka-তে 3-bedroom apartment খুঁজছেন?" textAt={76.93} typeDur={2.6} w={356} cta="Book a visit" headline="3-bed family homes"
              image={<AdImage t={t} obj="houses" obj2="busts_in_silhouette" label="FAMILY HOMES" />} />
          </Phone>
        </div>
      </Pop>
      {[{ l: "Family", at: C.family }, { l: "Dhaka", at: C.dhaka }, { l: "3-bedroom", at: C.bedroom }].map((g, i) => (
        <Pop key={g.l} t={t} at={g.at} x={1650 + (i % 2) * 40} y={330 + i * 110} from="right"><Tag hot size={22}>{g.l}</Tag></Pop>
      ))}
    </Stage>
  );
};

// 15 — "আরেকটা Creative— ‘আপনার next property কি investment-এর জন্য?’ … Need, Intent এবং Context … এটাই Strategy।"
export const S15: S = ({ start }) => {
  const t = useT(start);
  const [sx, sy] = shake(t, C.thisStrategy + 0.28, 16);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sx}px, ${sy}px)` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 150 }}>
          <KLine t={t} size={60} words={[{ w: "Same project.", at: C.deliveryBroad, wt: 900 }, { w: "Different message.", at: C.deliveryBroad + 0.5, wt: 900, c: K.accent }]} />
        </div>
        {[{ x: 660, page: "Skyline Residences", text: "নিজের পরিবারের জন্য Dhaka-তে 3-bedroom apartment খুঁজছেন?", img: <AdImage t={t} obj="houses" obj2="busts_in_silhouette" label="FAMILY HOMES" />, cta: "Book a visit", at: 80.0, tag: "Family · need", typeAt: undefined as number | undefined },
          { x: 1260, page: "Skyline Residences", text: "আপনার next property কি investment-এর জন্য?", img: <AdImage t={t} obj="money_bag" obj2="chart_increasing" label="INVESTMENT" />, cta: "Get details", at: C.creativeB - 0.1, tag: "Investor · intent", typeAt: 81.2 }].map((ph, i) => (
          <Pop key={i} t={t} at={ph.at} x={ph.x} y={535} from={i ? "right" : "scale"} dur={0.6}>
            <div style={{ transform: `scale(0.62) rotate(${i ? 2 : -2}deg)` }}>
              <Phone w={380}><FeedPost t={t} platform="facebook" page={ph.page} text={ph.text} textAt={ph.typeAt} typeDur={1.9} w={356} cta={ph.cta} image={ph.img} /></Phone>
            </div>
            <div style={{ position: "absolute", left: "50%", bottom: -16, transform: "translateX(-50%)" }}><Tag size={18} hot={i === 1}>{ph.tag}</Tag></div>
          </Pop>
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 855, display: "flex", justifyContent: "center", gap: 26 }}>
          {[{ l: "NEED", at: C.needW }, { l: "INTENT", at: C.intent }, { l: "CONTEXT", at: C.contextW }].map((c) => (
            <span key={c.l} style={{ opacity: p(t, c.at, 0.25), transform: `translateY(${(1 - p(t, c.at, 0.35, OUT)) * 30}px)`, filter: `blur(${(1 - p(t, c.at, 0.35)) * 8}px)` }}><Tag size={24} hot={p(t, C.specific, 0.3) > 0.5}>{c.l}</Tag></span>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 960, top: 520, transform: "translate(-50%,-50%)" }}><Stamp t={t} at={C.thisStrategy + 0.05} text="STRATEGY" size={110} /></div>
    </Stage>
  );
};

// 16 — "Broad Targeting আর Broad Strategy এক জিনিস না। … হলো … কিন্তু Broad Strategy হলো— …"
const LEFT = [{ l: "Gives Meta more room", at: C.space }, { l: "The system finds customers", at: C.find }];
const RIGHT = [{ l: "Who is the customer?", at: C.who }, { l: "What's the problem?", at: C.problemQ }, { l: "What are we offering?", at: C.offerQ }, { l: "What does success look like?", at: C.success }];
export const S16: S = ({ start }) => {
  const t = useT(start);
  const card = p(t, C.bTargeting - 0.2, 0.6, OUT);
  const fog = p(t, C.unclear, 0.8);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150 }}>
        <KLine t={t} size={56} words={[{ w: "Understand", at: 91.1, s: 0.75, wt: 600 }, { w: "this", at: 91.4, s: 0.75, wt: 600 }, { w: "clearly.", at: 91.7, wt: 900, c: K.accent }]} />
      </div>
      <div style={{ position: "absolute", left: 210, top: 270, width: 1500, height: 600, borderRadius: 28, background: "#fff", boxShadow: "0 40px 90px rgba(0,0,0,0.16)", opacity: card, transform: `translateY(${(1 - card) * 60}px)`, display: "flex", fontFamily: DISPLAY, overflow: "hidden" }}>
        <div style={{ flex: 1, padding: "44px 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: p(t, C.bTargeting, 0.3) }}><AppTile name="meta" size={64} label={false} /><span style={{ fontSize: 48, fontWeight: 900 }}>Broad Targeting</span></div>
          <div style={{ marginTop: 14, fontSize: 24, fontWeight: 600, color: K.soft, opacity: p(t, C.defTargeting, 0.4) }}>a delivery choice</div>
          {LEFT.map((r) => (
            <div key={r.l} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 40, opacity: p(t, r.at, 0.3), transform: `translateX(${(1 - p(t, r.at, 0.4, OUT)) * 30}px)` }}>
              <Icon3D name="check_mark_button" size={58} /><span style={{ fontSize: 36, fontWeight: 800 }}>{r.l}</span>
            </div>
          ))}
        </div>
        <div style={{ width: 4, background: K.ink, opacity: 0.08 }} />
        <div style={{ flex: 1, padding: "44px 48px", background: `rgba(176,16,44,${0.04 * fog})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: p(t, C.bStrategy, 0.3) }}><Icon3D name="thinking_face" size={64} /><span style={{ fontSize: 48, fontWeight: 900, color: K.accent }}>Broad Strategy</span></div>
          <div style={{ marginTop: 14, fontSize: 24, fontWeight: 600, color: K.soft, opacity: p(t, C.defStrategy, 0.4) }}>a lack of clarity</div>
          {RIGHT.map((r, i) => (
            <div key={r.l} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 22, opacity: p(t, r.at, 0.3) * lerp(1, 0.45, fog), transform: `translateX(${(1 - p(t, r.at, 0.4, OUT)) * 30 + fog * (i % 2 ? 18 : -18)}px)`, filter: `blur(${fog * 2.2}px)` }}>
              <Icon3D name="cross_mark" size={50} mono={false} /><span style={{ fontSize: 34, fontWeight: 800 }}>{r.l}</span>
            </div>
          ))}
        </div>
      </div>
      <Pop t={t} at={C.notSame} x={960} y={300} from="scale">
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: K.accent, color: "#fff", display: "grid", placeItems: "center", fontSize: 64, fontWeight: 900, boxShadow: "0 18px 40px rgba(176,16,44,0.4)" }}>≠</div>
      </Pop>
    </Stage>
  );
};

// 17 — "দুটোর মধ্যে আকাশ-পাতাল difference।"
export const S17: S = ({ start }) => {
  const t = useT(start);
  return (
    <Stage t={t} dark>
      <div style={{ position: "absolute", left: 0, right: 0, top: 290 }}>
        <KLine t={t} dark size={64} words={[{ w: "Sky-and-earth", at: 110.8, s: 0.8, wt: 600, c: "rgba(255,255,255,0.7)" }]} />
        <KLine t={t} dark size={64} style={{ marginTop: 14 }} words={[{ w: "DIFFERENT.", at: 111.5, s: 2.6, wt: 900, c: K.accent, glow: true }]} />
      </div>
      <Obj name="balance_scale" t={t} at={110.7} x={1600} y={760} size={260} from="right" mono rot={lerp(0, -14, p(t, 111.6, 0.8, IN_OUT))} />
    </Stage>
  );
};

// 18 — "এই জিনিসগুলো কখনো broad হওয়া উচিত না— Business Objective → … → Business Outcome। … AI-driven delivery system-কে … context"
const CHAIN = [
  { l: "Business objective", icon: "bullseye", at: C.objective },
  { l: "Ideal customer", icon: "bust_in_silhouette", at: C.ideal },
  { l: "Customer problem", icon: "puzzle_piece", at: C.custProblem },
  { l: "Offer", icon: "gem_stone", at: C.offerN },
  { l: "Creative message", icon: "speech_balloon", at: C.creativeMsg },
  { l: "Conversion signal", icon: "bell", at: C.convSignal },
  { l: "Business outcome", icon: "chart_increasing", at: C.outcome },
];
const POS = [[330, 430], [730, 430], [1130, 430], [1530, 430], [1530, 730], [1130, 730], [730, 730]];
export const S18: S = ({ start }) => {
  const t = useT(start);
  const path = "M 330 430 L 1530 430 L 1530 730 L 330 730";
  const flow = p(t, C.clearer, 0.6);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150 }}>
        <KLine t={t} size={52} words={[{ w: "Broad audience?", at: 113.5, s: 0.8, wt: 600 }, { w: "Fine.", at: 114.6, s: 0.8, wt: 800 }, { w: "These must", at: 116.0, s: 0.8, wt: 600 }, { w: "NEVER", at: C.neverBroad, wt: 900, c: K.accent, glow: true }, { w: "be broad:", at: 116.5, s: 0.8, wt: 600 }]} />
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <path d={path} stroke={K.line} strokeWidth={6} fill="none" opacity={p(t, C.objective - 0.2, 0.4)} />
        {CHAIN.slice(1).map((c, i) => {
          const [x1, y1] = POS[i], [x2, y2] = POS[i + 1];
          const d = `M ${x1} ${y1} L ${x2} ${y2}`;
          const dd = drawn(d, t, c.at - 0.35, 0.35);
          return <path key={c.l} d={d} stroke={K.ink} strokeWidth={6} fill="none" strokeDasharray={dd.strokeDasharray} strokeDashoffset={dd.strokeDashoffset} />;
        })}
        {(() => { const d = "M 730 730 L 330 730"; const dd = drawn(d, t, C.clearer, 0.5); return <path d={d} stroke={K.accent} strokeWidth={6} fill="none" strokeDasharray={dd.strokeDasharray} strokeDashoffset={dd.strokeDashoffset} />; })()}
        {flow > 0 ? <path d={path} stroke={K.accent} strokeWidth={6} fill="none" strokeDasharray="14 26" strokeDashoffset={-t * 90} opacity={0.85} /> : null}
      </svg>
      {CHAIN.map((c, i) => (
        <Pop key={c.l} t={t} at={c.at} x={POS[i][0]} y={POS[i][1]} from="scale" dur={0.45}>
          <div style={{ width: 290, padding: "16px 18px 18px", borderRadius: 20, background: i === 6 ? K.ink : "#fff", color: i === 6 ? "#fff" : K.ink, boxShadow: "0 24px 50px rgba(0,0,0,0.16)", display: "flex", alignItems: "center", gap: 14, fontFamily: DISPLAY }}>
            <Icon3D name={c.icon} size={64} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.2em", color: i === 6 ? "rgba(255,255,255,0.6)" : K.soft }}>0{i + 1}</div>
              <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.1 }}>{c.l}</div>
            </div>
          </div>
        </Pop>
      ))}
      <Pop t={t} at={C.clearer + 0.3} x={330} y={730} from="scale">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, filter: `drop-shadow(0 0 ${p(t, C.aiContext, 0.5) * 36}px rgba(176,16,44,0.6))` }}>
          <AppTile name="meta" size={150} />
          <Tag hot size={18}>AI delivery · context</Tag>
        </div>
      </Pop>
      <Pop t={t} at={C.clear} x={960} y={585} from="scale"><SelectBox t={t} at={C.clear + 0.2}><span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 34 }}>The clearer these are, the better AI works.</span></SelectBox></Pop>
    </Stage>
  );
};
