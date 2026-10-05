/** Act 2 — three industry examples: prompt vs business brief (51 – 178s). */
import { AbsoluteFill } from "remotion";
import {
  AIEngine, AssetTile, At, BriefItem, BriefSection, Card, ChapterTitle, COLORS, curve, Eyebrow, Icon, IconName, INK, IN_OUT,
  lerp, Lines, MARK, OutputCard, p, Pill, PromptBox, SAFE, seg, SignalLine, TYPE, useT, ValueBar, vcurve, Wipe, drawn,
} from "../../../brand";
import { C } from "../cues";

type S = React.FC<{ start: number }>;

// ───────────── shared layouts ─────────────
/** Chapter opener: "EXAMPLE 0X / TITLE" + the industry's asset tiles, with a faint watermark icon. */
const Chapter: React.FC<{ t: number; at: number; index: string; title: string; mark: IconName; tilesAt: number; tiles: { icon: IconName; label: string }[] }> = ({ t, at, index, title, mark, tilesAt, tiles }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", right: 60, top: 40, opacity: 0.06 * p(t, at, 1), transform: `scale(${lerp(0.9, 1, p(t, at, 2.5))})` }}><Icon name={mark} size={620} stroke={0.8} /></div>
    <At x={960} y={380} t={t} at={at} dy={0}><ChapterTitle t={t} at={at} index={index} title={title} /></At>
    <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", gap: 26 }}>
      {tiles.map((tile, i) => {
        const k = p(t, tilesAt + i * 0.12, 0.5);
        return <div key={tile.label} style={{ opacity: k, transform: `translateY(${(1 - k) * 40}px)` }}><AssetTile icon={tile.icon} label={tile.label} w={tiles.length > 4 ? 220 : 260} /></div>;
      })}
    </div>
  </AbsoluteFill>
);

/** Generic prompt → AI → generic outputs, then a verdict label. */
const PromptToOutput: React.FC<{
  t: number; boxAt: number; typeAt: number; typeDur: number; text: string; outputs: string[]; outAt: number; verdict: React.ReactNode; verdictAt: number; tone?: "generic" | "polished";
}> = ({ t, boxAt, typeAt, typeDur, text, outputs, outAt, verdict, verdictAt, tone = "generic" }) => (
  <AbsoluteFill>
    <At x={660} y={330} t={t} at={boxAt} dy={40}><PromptBox t={t} at={typeAt} dur={typeDur} text={text} w={940} size={50} /></At>
    <Lines>
      <SignalLine d={seg(1140, 330, 1340, 330)} t={t} at={typeAt + typeDur} dur={0.3} arrow pulse={typeAt + typeDur + 0.2} period={0.9} dots={1} />
      {outputs.map((_, i) => <SignalLine key={i} d={vcurve(1470, 440, outputs.length === 1 ? 960 : 480 + i * 480, 600)} t={t} at={outAt - 0.25 + i * 0.12} dur={0.3} dashed />)}
    </Lines>
    <At x={1470} y={330} t={t} at={boxAt + 0.3} dy={0}><AIEngine t={t} size={190} active={p(t, outAt - 0.3, 0.4)} /></At>
    {outputs.map((o, i) => (
      <div key={o} style={{ position: "absolute", left: (outputs.length === 1 ? 960 : 480 + i * 480) - (outputs.length === 1 ? 330 : 190), top: 620 }}>
        <OutputCard text={o} t={t} at={outAt + i * 0.2} w={outputs.length === 1 ? 660 : 380} tone={tone} />
      </div>
    ))}
    <At x={960} y={900} t={t} at={verdictAt} scaleFrom={1.2}>{verdict}</At>
  </AbsoluteFill>
);

const LowContext: React.FC<{ label?: string }> = ({ label = "Low context" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
    <Pill size={22} hot={1}>{label}</Pill>
    <ValueBar value={0.14} w={360} h={14} label />
  </div>
);

type Sec = { kicker: string; icon: IconName; at: number; items: BriefItem[] };
/** Business brief built section by section (2×2), with the original prompt + a context meter on the left. */
const BriefBoard: React.FC<{ t: number; at: number; title: string; prompt: string; sections: Sec[]; end: number; richAt: number }> = ({ t, at, title, prompt, sections, end, richAt }) => {
  const total = sections.reduce((n, s) => n + s.items.filter((i) => i.strike === undefined).length, 0);
  const filled = sections.reduce((n, s) => n + s.items.filter((i) => i.strike === undefined).reduce((m, i) => m + p(t, i.at, 0.4), 0), 0);
  const pos = [[860, 385], [1450, 385], [860, 725], [1450, 725]];
  return (
    <AbsoluteFill>
      <At x={335} y={250} t={t} at={at - 0.1} dx={-40} dy={0}>
        <div style={{ transform: "scale(0.82)" }}><PromptBox t={t} at={-10} dur={0.1} text={prompt} w={420} size={30} dim={0.35} /></div>
      </At>
      <At x={335} y={400} t={t} at={at + 0.2}><span style={{ ...TYPE.label, fontSize: 16 }}>Prompt · low context</span></At>
      <At x={335} y={665} t={t} at={at + 0.5}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <span style={{ ...TYPE.label, fontSize: 18, color: INK.strong }}>Context given to AI</span>
          <div style={{ width: 120, height: 300, borderRadius: 24, background: "rgba(114,0,19,0.07)", border: `2px solid ${INK.line}`, padding: 8, boxSizing: "border-box", display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: "100%", height: `${lerp(8, 100, filled / total)}%`, borderRadius: 18, background: `linear-gradient(180deg, ${COLORS.crimson}, ${COLORS.burgundy})` }} />
          </div>
          <span style={{ opacity: p(t, richAt, 0.4) }}><Pill size={18} hot={1}>Rich context</Pill></span>
        </div>
      </At>
      <At x={1155} y={150} t={t} at={at}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Icon name="form" size={50} color={COLORS.crimson} />
          <span style={{ ...TYPE.title, fontSize: 52, letterSpacing: "0.02em" }}>{title}</span>
        </div>
      </At>
      {sections.map((s, i) => {
        const next = sections[i + 1]?.at ?? end;
        const focus = p(t, s.at, 0.3) * (1 - p(t, next, 0.3));
        return (
          <At key={s.kicker} x={pos[i][0]} y={pos[i][1]} t={t} at={s.at - 0.15} dy={40}>
            <BriefSection t={t} at={s.at} kicker={s.kicker} icon={s.icon} items={s.items} w={560} size={25} focus={focus} />
          </At>
        );
      })}
    </AbsoluteFill>
  );
};

// ───────────── Example 01 — study abroad ─────────────
export const StudyChapterScene: S = ({ start }) => {
  const t = useT(start);
  return <Chapter t={t} at={C.study} index="01" title="Study Abroad" mark="student" tilesAt={C.studyWord + 0.3}
    tiles={[{ icon: "student", label: "Student" }, { icon: "uni", label: "University" }, { icon: "book", label: "Course" }, { icon: "form", label: "Application" }, { icon: "passport", label: "Visa" }, { icon: "wallet", label: "Budget" }]} />;
};

export const StudyPromptScene: S = ({ start }) => {
  const t = useT(start);
  return (
    <>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={C.youTellAI}>Study abroad · the prompt</Eyebrow></div>
      <PromptToOutput t={t} boxAt={C.youTellAI} typeAt={C.genUK} typeDur={1.5} text="Generate ads for UK study." outputs={["Study in UK", "Apply Now", "Explore UK Universities"]}
        outAt={C.thisPrompt} verdict={<LowContext />} verdictAt={C.notBrief + 0.2} />
    </>
  );
};

export const StudyBriefScene: S = ({ start }) => {
  const t = useT(start);
  return (
    <BriefBoard t={t} at={C.properBrief} title="BUSINESS BRIEF" prompt="Generate ads for UK study." end={C.difference} richAt={C.trusted + 0.6}
      sections={[
        { kicker: "Audience", icon: "users", at: C.audience, items: [{ text: "Bangladeshi students", at: C.bdStudents }, { text: "Undergraduate", at: C.undergrad }, { text: "Postgraduate", at: C.postgrad }] },
        { kicker: "Our strength", icon: "star", at: C.strength, items: [{ text: "University selection", at: C.uniSelection }, { text: "Application support", at: C.application }, { text: "Visa guidance", at: C.visa }] },
        { kicker: "Customer quality", icon: "target", at: C.notJustLeads, items: [{ text: "Just more leads", at: C.notJustLeads + 0.2, strike: C.notJustLeads + 0.9 }, { text: "Academic profile fit", at: C.academic }, { text: "Budget fit", at: C.budget }, { text: "Partner university fit", at: C.partnerUni }] },
        { kicker: "Message", icon: "message", at: C.message, items: [{ text: "Affordability", at: C.affordability }, { text: "Career outcome", at: C.career }, { text: "Course selection", at: C.course }, { text: "Trusted guidance", at: C.trusted }] },
      ]} />
  );
};

// "এখন difference-টা দেখুন। প্রথমটা … শুধু কী বানাতে হবে বলছে। দ্বিতীয়টা … কাদের জন্য, কেন, কী message, … valuable। এটাই business briefing."
const BRIEF_Q = [
  { q: "For whom?", at: C.forWhom, icon: "users" }, { q: "Why?", at: C.why, icon: "bulb" },
  { q: "What message?", at: C.whatMessage, icon: "message" }, { q: "Which customer is valuable?", at: C.whichCustomer, icon: "star" },
] as const;
export const DifferenceScene: S = ({ start }) => {
  const t = useT(start);
  const banner = p(t, C.thisIsBriefing, 0.6);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={C.difference}>See the difference</Eyebrow></div>
      <Lines><SignalLine d={seg(860, 200, 860, 960)} t={t} at={C.difference} dur={0.8} /></Lines>
      {/* left — prompt */}
      <At x={510} y={250} t={t} at={C.first}><span style={{ ...TYPE.label, fontSize: 26, color: INK.strong }}>Prompt</span></At>
      <At x={510} y={400} t={t} at={C.first + 0.2}>
        <Card w={520} pad="28px 32px"><span style={{ fontSize: 40, fontWeight: 800, color: INK.body }}>“What should AI make?”</span></Card>
      </At>
      <Lines><SignalLine d={seg(510, 490, 510, 600)} t={t} at={C.whatToMake} dur={0.3} arrow /></Lines>
      <At x={510} y={680} t={t} at={C.whatToMake + 0.2} scaleFrom={0.6}>
        <div style={{ padding: "20px 60px", borderRadius: 20, border: `3px solid ${INK.lineStrong}`, fontSize: 64, fontWeight: 800, letterSpacing: "0.12em", color: INK.body }}>TASK</div>
      </At>
      {/* right — brief */}
      <At x={1330} y={250} t={t} at={C.second}><span style={{ ...TYPE.label, fontSize: 26, color: COLORS.crimson }}>Business brief</span></At>
      {BRIEF_Q.map((b, i) => (
        <At key={b.q} x={1330} y={350 + i * 102} t={t} at={b.at} dx={50} dy={0}>
          <Card w={760} pad="16px 28px" hot={i === 3 ? p(t, C.valuable, 0.4) : 0}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <Icon name={b.icon} size={38} color={i === 3 && t > C.valuable + 0.2 ? COLORS.ivory : COLORS.burgundy} />
              <span style={{ fontSize: 34, fontWeight: 800 }}>{b.q}</span>
            </div>
          </Card>
        </At>
      ))}
      <Lines><SignalLine d={seg(1330, 760, 1330, 830)} t={t} at={C.valuable + 0.2} dur={0.3} arrow hot={1} /></Lines>
      <At x={1330} y={890} t={t} at={C.valuable + 0.4} scaleFrom={0.6}>
        <div style={{ padding: "18px 56px", borderRadius: 20, background: COLORS.burgundy, color: COLORS.ivory, fontSize: 60, fontWeight: 800, letterSpacing: "0.12em", boxShadow: "0 24px 60px rgba(114,0,19,0.3)" }}>CONTEXT</div>
      </At>
      <div style={{ position: "absolute", inset: 0, background: COLORS.ivory, opacity: 0.75 * banner }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 455, display: "flex", justifyContent: "center", opacity: banner, transform: `scale(${lerp(1.15, 1, banner)})` }}>
        <div style={{ ...TYPE.hero, fontSize: 110, padding: "20px 60px", background: "rgba(251,252,235,0.94)", borderRadius: 30, boxShadow: "0 30px 80px rgba(45,0,1,0.15)" }}>
          This is <span style={MARK}>business briefing.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ───────────── Example 02 — healthcare ─────────────
export const HealthChapterScene: S = ({ start }) => {
  const t = useT(start);
  return <Chapter t={t} at={C.doctor} index="02" title="Healthcare" mark="heart" tilesAt={C.doctorWord}
    tiles={[{ icon: "steth", label: "Doctor" }, { icon: "cal", label: "Appointment" }, { icon: "search", label: "Symptom search" }, { icon: "user", label: "Patient intent" }]} />;
};

export const HealthPromptScene: S = ({ start }) => {
  const t = useT(start);
  return (
    <>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={C.promptLabel}>Healthcare · the prompt</Eyebrow></div>
      <PromptToOutput t={t} boxAt={C.promptLabel} typeAt={C.cardioPrompt} typeDur={1.5} text="Write an ad for a cardiologist." outputs={["Expert heart care you can trust — book a consultation today."]}
        outAt={C.niceAd + 0.2} tone="polished" verdictAt={C.deeper}
        verdict={<div style={{ ...TYPE.title, fontSize: 60, display: "flex", alignItems: "center", gap: 26, whiteSpace: "nowrap" }}>Good copy <span style={{ color: COLORS.crimson, fontSize: 80 }}>≠</span> good business context</div>} />
    </>
  );
};

export const HealthBriefScene: S = ({ start }) => {
  const t = useT(start);
  const secs: (Sec & { x: number; y: number })[] = [
    { kicker: "Objective", icon: "cal", at: C.appointmentGoal, x: 450, y: 330, items: [{ text: "Appointment generation", at: C.appointment }] },
    { kicker: "Audience", icon: "users", at: C.targetAudience, x: 960, y: 330, items: [{ text: "Qualified medical intent", at: C.targetAudience + 0.5 }, { text: "Needs medical advice", at: C.qualified }] },
    { kicker: "Needs", icon: "heart", at: C.chest - 0.3, x: 1470, y: 380, items: [{ text: "Chest discomfort", at: C.chest }, { text: "Hypertension", at: C.hypertension }, { text: "Heart-related symptoms", at: C.heartSymptoms }, { text: "Preventive consultation", at: C.preventive }] },
    { kicker: "Priority", icon: "target", at: C.priority, x: 700, y: 760, items: [{ text: "Just more calls", at: C.priority + 0.3, strike: C.moreCalls + 0.3 }, { text: "Relevant appointment", at: C.relevantAppt }, { text: "Genuine patient intent", at: C.genuine }] },
    { kicker: "Communication", icon: "shield", at: C.adLanguage, x: 1260, y: 790, items: [{ text: "Trustworthy", at: C.trustworthy }, { text: "Medically responsible", at: C.responsible }, { text: "Non-sensational", at: C.nonSensational }] },
  ];
  const done = p(t, C.nonSensational + 0.6, 0.5);
  return (
    <AbsoluteFill>
      <At x={960} y={110} t={t} at={C.forExample}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Icon name="steth" size={46} color={COLORS.crimson} />
          <span style={{ ...TYPE.title, fontSize: 48, letterSpacing: "0.02em" }}>HEALTHCARE <span style={{ ...MARK, background: `rgba(128,1,31,${done})`, color: done > 0.5 ? COLORS.ivory : INK.strong }}>BUSINESS BRIEF</span></span>
        </div>
      </At>
      {secs.map((s, i) => {
        const next = secs[i + 1]?.at ?? C.notJustCopy;
        const focus = p(t, s.at, 0.3) * (1 - p(t, next, 0.3));
        return (
          <At key={s.kicker} x={s.x} y={s.y} t={t} at={s.at - 0.15} dy={40}>
            <BriefSection t={t} at={s.at} kicker={s.kicker} icon={s.icon} items={s.items} w={480} size={24} focus={Math.max(focus, i === 1 ? p(t, C.qualified, 0.3) * (1 - p(t, C.priority, 0.3)) : 0)} hot={i === 0 ? p(t, C.appointment + 0.4, 0.4) * (1 - p(t, C.targetAudience, 0.3)) : 0} />
          </At>
        );
      })}
    </AbsoluteFill>
  );
};

// "এখন AI শুধু ad copy generate করছে না। … business objective, audience এবং communication boundary বুঝিয়ে দিচ্ছেন। Healthcare-এর মতো sensitive category-তে এই clarity আরও গুরুত্বপূর্ণ।"
export const BoundaryScene: S = ({ start }) => {
  const t = useT(start);
  const lift = p(t, C.objective - 0.8, 1.2, IN_OUT);
  const frame = "M 280 400 L 1640 400 Q 1700 400 1700 460 L 1700 680 Q 1700 740 1640 740 L 280 740 Q 220 740 220 680 L 220 460 Q 220 400 280 400 Z";
  const fd = drawn(frame, t, C.boundary + 0.2, 1.6);
  const calm = p(t, C.sensitive, 1.5);
  return (
    <AbsoluteFill>
      <At x={960} y={lerp(540, 230, lift)} t={t} at={C.notJustCopy} dy={30}>
        <div style={{ transform: `scale(${lerp(1, 0.72, lift)})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span style={{ ...TYPE.label, fontSize: 20 }}>Ad copy</span>
          <Card w={640} pad="24px 30px"><span style={{ fontSize: 32, fontWeight: 800, color: INK.body }}>Expert heart care you can trust.</span></Card>
        </div>
      </At>
      <At x={960} y={330} t={t} at={C.objective - 0.3}><span style={{ ...TYPE.label, fontSize: 16, color: INK.faint }}>is only the output of</span></At>
      {[{ l: "Business objective", icon: "target", at: C.objective }, { l: "Audience", icon: "users", at: C.audienceB }, { l: "Responsible communication", icon: "shield", at: C.boundary }].map((b, i) => (
        <div key={b.l}>
          <At x={480 + i * 480} y={570} t={t} at={b.at} dy={30} dur={0.8}>
            <Card w={400} h={200} pad="24px 26px">
              <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center" }}>
                <Icon name={b.icon as IconName} size={52} />
                <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.2 }}>{b.l}</span>
              </div>
            </Card>
          </At>
          {i < 2 ? <At x={720 + i * 480} y={570} t={t} at={b.at + 0.4}><span style={{ fontSize: 60, fontWeight: 800, color: COLORS.crimson }}>+</span></At> : null}
        </div>
      ))}
      <Lines>
        <path d={frame} fill="none" stroke={COLORS.crimson} strokeWidth={3} strokeDasharray={fd.strokeDasharray} strokeDashoffset={fd.strokeDashoffset} opacity={0.8} />
        <path d={frame} fill="rgba(128,1,31,0.035)" stroke="none" opacity={calm} />
      </Lines>
      <At x={960} y={400} t={t} at={C.boundary + 1.4} dy={0}>
        <div style={{ background: COLORS.ivory, padding: "0 18px" }}><Pill size={18} hot={1}><Icon name="shield" size={26} color={COLORS.ivory} />Communication boundary</Pill></div>
      </At>
      <At x={960} y={815} t={t} at={C.sensitive} dur={1}><span style={{ ...TYPE.label, fontSize: 20 }}>Sensitive category</span></At>
      <At x={960} y={900} t={t} at={C.clarity} dur={1.1} dy={20}>
        <Wipe t={t} at={C.clarity} dur={1.1}><div style={{ ...TYPE.title, fontSize: 70, whiteSpace: "nowrap" }}>Clarity <span style={{ color: COLORS.crimson }}>+</span> responsibility</div></Wipe>
      </At>
    </AbsoluteFill>
  );
};

// ───────────── Example 03 — real estate ─────────────
export const REChapterScene: S = ({ start }) => {
  const t = useT(start);
  return <Chapter t={t} at={C.another + 0.1} index="03" title="Real Estate" mark="building" tilesAt={C.realEstate + 0.2}
    tiles={[{ icon: "building", label: "Apartment" }, { icon: "pin", label: "Location" }, { icon: "plan", label: "Floor plan" }, { icon: "pool", label: "Amenities" }, { icon: "wallet", label: "Payment plan" }, { icon: "family", label: "Buyer profile" }]} />;
};

export const REPromptScene: S = ({ start }) => {
  const t = useT(start);
  return (
    <>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={C.rePrompt}>Real estate · the prompt</Eyebrow></div>
      <PromptToOutput t={t} boxAt={C.rePrompt - 0.1} typeAt={C.rePrompt + 0.1} typeDur={1.5} text="Write Google ads for apartments in Dhaka." outputs={["Apartments in Dhaka", "Book Your Apartment", "Prime Location"]}
        outAt={C.generic - 0.4} verdict={<LowContext label="Generic context" />} verdictAt={C.generic + 0.2} />
    </>
  );
};

export const REBriefScene: S = ({ start }) => {
  const t = useT(start);
  return (
    <BriefBoard t={t} at={C.residential} title="BUSINESS BRIEF" prompt="Write Google ads for apartments in Dhaka." end={C.clearPicture} richAt={C.realisticMatch + 0.4}
      sections={[
        { kicker: "Objective", icon: "home", at: C.residential, items: [{ text: "Residential project · Dhaka", at: C.residential + 0.7 }, { text: "Serious home buyers", at: C.seriousBuyers }] },
        { kicker: "Audience", icon: "family", at: C.reAudience, items: [{ text: "Family buyers", at: C.family }, { text: "Location-specific buyers", at: C.locationBuyers }] },
        { kicker: "Differentiators", icon: "star", at: C.differentiators, items: [{ text: "Location", at: C.location }, { text: "Apartment size", at: C.aptSize }, { text: "Amenities", at: C.amenities }, { text: "Payment flexibility", at: C.payment }] },
        { kicker: "Quality signal", icon: "target", at: C.cheapLeads, items: [{ text: "Cheap leads", at: C.cheapLeads + 0.2, strike: C.cheapLeads + 0.8 }, { text: "Purchase intent", at: C.purchaseIntent }, { text: "Budget fit", at: C.reBudget }, { text: "Realistic project match", at: C.realisticMatch }] },
      ]} />
  );
};

// "এখন AI-এর কাছে business-এর picture অনেক পরিষ্কার।" — three industries → one method
export const SynthesisScene: S = ({ start }) => {
  const t = useT(start);
  const ind: { l: string; icon: IconName; lines: string[] }[] = [
    { l: "Study abroad", icon: "student", lines: ["Students · UK", "Profile + budget fit"] },
    { l: "Healthcare", icon: "steth", lines: ["Appointments", "Responsible tone"] },
    { l: "Real estate", icon: "building", lines: ["Serious buyers", "Budget + intent"] },
  ];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={C.clearPicture}>Any industry · same method</Eyebrow></div>
      <Lines>
        {ind.map((_, i) => <SignalLine key={i} d={curve(480 + i * 480, 410, 960, 600)} t={t} at={C.clearPicture + 0.5 + i * 0.1} dur={0.5} hot={1} pulse={C.clearPicture + 1} period={1} dots={1} />)}
        <SignalLine d={seg(960, 690, 960, 800)} t={t} at={C.clearPicture + 1.5} dur={0.3} arrow hot={1} />
      </Lines>
      {ind.map((d, i) => (
        <At key={d.l} x={480 + i * 480} y={300} t={t} at={C.clearPicture + i * 0.15}>
          <Card w={400} pad="22px 26px">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}><Icon name={d.icon} size={40} /><span style={{ ...TYPE.label, color: INK.strong, fontSize: 20 }}>{d.l}</span></div>
            {d.lines.map((l) => <div key={l} style={{ fontSize: 21, fontWeight: 600, color: INK.body, marginTop: 6 }}>• {l}</div>)}
          </Card>
        </At>
      ))}
      <At x={960} y={640} t={t} at={C.clearPicture + 0.9}><Pill size={30} hot={1}><Icon name="form" size={40} color={COLORS.ivory} />Business briefing</Pill></At>
      <At x={960} y={870} t={t} at={C.clearPicture + 1.7} dy={20}><div style={{ ...TYPE.title, fontSize: 60, whiteSpace: "nowrap" }}>Clearer picture → <span style={{ color: COLORS.crimson }}>better AI direction</span></div></At>
    </AbsoluteFill>
  );
};
