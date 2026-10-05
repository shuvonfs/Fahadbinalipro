/** Act 3 — the big idea, the new skillset, steering AI, and the close (178 – 257.9s). */
import { AbsoluteFill } from "remotion";
import {
  AIEngine, At, BACK, Card, COLORS, curve, Eyebrow, Headline, Icon, IconName, INK, IN_OUT, lerp, Lines, MARK, Node,
  p, Pill, SAFE, seg, SignalLine, TYPE, typed, useT, Wipe, drawn,
} from "../../../brand";
import { C } from "../cues";

type S = React.FC<{ start: number }>;

// "Prompting মানে AI-কে একটা কাজ বলা। আর Business Briefing মানে … business আসলে কী achieve করতে চায়। এই দুইটা এক জিনিস না।"
const BRIEF_PARTS: { l: string; icon: IconName }[] = [
  { l: "Objective", icon: "target" }, { l: "Customer", icon: "users" }, { l: "Intent", icon: "search" },
  { l: "Message", icon: "message" }, { l: "Value", icon: "star" }, { l: "Conversion", icon: "check" },
];
export const BigIdeaScene: S = ({ start }) => {
  const t = useT(start);
  const grow = p(t, C.briefingIs + 0.2, 1.0, IN_OUT);
  const neq = p(t, C.notSame, 0.6);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={C.soForMe}>The big idea</Eyebrow></div>
      <At x={470} y={480} t={t} at={C.promptingIs} dx={-40} dy={0}>
        <Card w={480} pad="34px 36px" style={{ opacity: lerp(1, 0.7, grow) }}>
          <div style={{ ...TYPE.label, fontSize: 22, color: INK.strong, marginBottom: 20 }}>Prompting</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: p(t, C.aTask, 0.4) }}>
            <span style={{ fontSize: 50, fontWeight: 800, color: COLORS.crimson }}>=</span>
            <span style={{ padding: "12px 34px", borderRadius: 16, border: `3px solid ${INK.lineStrong}`, fontSize: 46, fontWeight: 800, letterSpacing: "0.1em" }}>TASK</span>
          </div>
          <div style={{ marginTop: 18, fontSize: 22, fontWeight: 600, color: INK.muted, opacity: p(t, C.aTask + 0.3, 0.4) }}>Tell AI one job.</div>
        </Card>
      </At>
      <At x={1250} y={480} t={t} at={C.briefingIs} dx={40} dy={0}>
        <Card w={lerp(480, 900, grow)} pad="34px 40px" hot={0} style={{ boxShadow: `0 30px 80px rgba(114,0,19,${0.08 + 0.12 * grow})`, border: `2px solid rgba(128,1,31,${0.15 + 0.5 * grow})` }}>
          <div style={{ ...TYPE.label, fontSize: 22, color: COLORS.crimson, marginBottom: 20 }}>Business briefing</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {BRIEF_PARTS.map((b, i) => {
              const k = p(t, C.explain + i * 0.17, 0.45, BACK);
              return (
                <div key={b.l} style={{ opacity: Math.min(1, k * 1.5), transform: `scale(${lerp(0.8, 1, k)})`, display: "flex", alignItems: "center", gap: 10, padding: "14px 14px",
                  borderRadius: 14, background: "rgba(114,0,19,0.06)", whiteSpace: "nowrap" }}>
                  <Icon name={b.icon} size={28} /><span style={{ fontSize: 21, fontWeight: 800, letterSpacing: "0.06em" }}>{b.l.toUpperCase()}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 22, fontSize: 26, fontWeight: 800, color: INK.strong, opacity: p(t, C.achieve, 0.5) }}>
            = what the business wants to <span style={{ color: COLORS.crimson }}>achieve.</span>
          </div>
        </Card>
      </At>
      <At x={960} y={890} t={t} at={C.notSame} scaleFrom={1.25} dy={0}>
        <div style={{ ...TYPE.hero, fontSize: 104, display: "flex", alignItems: "center", gap: 34 }}>
          PROMPT <span style={{ width: 110, height: 110, borderRadius: "50%", background: `rgba(128,1,31,${neq})`, color: COLORS.ivory, display: "grid", placeItems: "center", fontSize: 80 }}>≠</span> BRIEF
        </div>
      </At>
    </AbsoluteFill>
  );
};

// "Future marketer-এর skillset বদলাচ্ছে। শুধু keyword research / ad copywriting / AI prompting জানলেই হবে না।"
const SkillColumn: React.FC<{ t: number; x: number; at: number; title: string; icon: IconName; body: React.ReactNode; frame: string; around: string[] }> = ({ t, x, at, title, icon, body, frame, around }) => {
  const zoom = p(t, at + 0.7, 0.9, IN_OUT);
  return (
    <>
      <div style={{ position: "absolute", left: x - 260, top: 260, width: 520, height: 640, borderRadius: 34, border: `2px dashed rgba(128,1,31,${0.5 * zoom})`, background: `rgba(128,1,31,${0.03 * zoom})` }} />
      <At x={x} y={300} t={t} at={at + 0.8}><Pill size={16} hot={1}>{frame}</Pill></At>
      <At x={x} y={lerp(560, 500, zoom)} t={t} at={at} dy={40}>
        <div style={{ transform: `scale(${lerp(1.08, 0.78, zoom)})` }}>
          <Card w={400} pad="24px 28px">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}><Icon name={icon} size={34} /><span style={{ ...TYPE.label, fontSize: 18, color: INK.strong }}>{title}</span></div>
            {body}
          </Card>
        </div>
      </At>
      {around.map((a, i) => (
        <At key={a} x={x + (i % 2 ? 120 : -120)} y={720 + Math.floor(i / 2) * 64} t={t} at={at + 0.9 + i * 0.1}><Pill size={15}>{a}</Pill></At>
      ))}
      <At x={x} y={940} t={t} at={at + 0.3}><span style={{ ...TYPE.label, fontSize: 15, color: INK.faint }}>Alone · not enough</span></At>
    </>
  );
};
export const SkillsetScene: S = ({ start }) => {
  const t = useT(start);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: 92, width: SAFE.w }}>
        <Headline t={t} at={C.skillset} text="The future marketer’s skillset is changing" mark={["skillset"]} style={{ fontSize: 58 }} />
      </div>
      <SkillColumn t={t} x={410} at={C.keywordResearch} title="Keyword research" icon="key" frame="Customer intent → objective" around={["Intent", "Objective"]}
        body={<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{["2 bed apartment", "cs degree uk", "cardiologist near me"].map((k) => <div key={k} style={{ fontSize: 20, fontWeight: 600, color: INK.body, padding: "6px 12px", borderRadius: 10, background: "rgba(114,0,19,0.05)" }}>{k}</div>)}</div>} />
      <SkillColumn t={t} x={960} at={C.copywriting} title="Ad copywriting" icon="write" frame="Copy is one layer" around={["Audience", "Offer", "Value", "Conversion"]}
        body={<div><div style={{ fontSize: 24, fontWeight: 800, color: INK.strong, marginBottom: 8 }}>Your dream home awaits.</div><div style={{ height: 8, width: "80%", borderRadius: 8, background: "rgba(114,0,19,0.13)" }} /></div>} />
      <SkillColumn t={t} x={1510} at={C.aiPrompting} title="AI prompting" icon="ai" frame="Inside the business brief" around={["Business", "Customer"]}
        body={<div style={{ fontSize: 21, fontWeight: 600, color: INK.body, lineHeight: 1.35 }}>“Act as an expert marketer. Write 5 high-converting ads…”</div>} />
    </AbsoluteFill>
  );
};

// "আপনাকে বুঝতে হবে— Business থেকে Customer, Intent, Message, Conversion, Revenue। তারপর সেই context AI-কে দিতে হবে।"
const CHAIN: { l: string; icon: IconName; at: number }[] = [
  { l: "Business", icon: "building", at: C.chBusiness }, { l: "Customer", icon: "users", at: C.chCustomer }, { l: "Intent", icon: "search", at: C.chIntent },
  { l: "Message", icon: "message", at: C.chMessage }, { l: "Conversion", icon: "check", at: C.chConversion }, { l: "Revenue", icon: "revenue", at: C.chRevenue },
];
export const ChainScene: S = ({ start }) => {
  const t = useT(start);
  const cx = 960, cy = 565, R = 315;
  const ang = (i: number) => ((-90 + i * 60) * Math.PI) / 180;
  const pt = (a: number, r = R) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  const arc = (i: number) => {
    const a1 = ang(i) + 0.33, a2 = ang(i + 1) - 0.33;
    const [x1, y1] = pt(a1), [x2, y2] = pt(a2), [qx, qy] = pt((a1 + a2) / 2, R * 1.12);
    return `M ${x1} ${y1} Q ${qx} ${qy} ${x2} ${y2}`;
  };
  const loop = p(t, C.then, 0.6);
  const ai = p(t, C.giveContext, 0.6);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={C.understand}>You need to understand</Eyebrow></div>
      <Lines>
        {CHAIN.map((c, i) => {
          const last = i === CHAIN.length - 1;
          return <SignalLine key={c.l} d={arc(i)} t={t} at={last ? C.then : CHAIN[i + 1].at - 0.25} dur={last ? 0.6 : 0.3} arrow hot={last ? 1 : loop} width={3}
            pulse={C.then + 0.4} period={1.6} dots={1} />;
        })}
        {CHAIN.map((c, i) => {
          const [x, y] = pt(ang(i), R - 95);
          return <SignalLine key={`in${c.l}`} d={seg(x, y, ...(pt(ang(i), 125) as [number, number]))} t={t} at={C.giveContext + 0.3 + i * 0.08} dur={0.3} hot={1} pulse={C.giveAI} period={1} dots={1} />;
        })}
      </Lines>
      {CHAIN.map((c, i) => {
        const [x, y] = pt(ang(i));
        return (
          <At key={c.l} x={x} y={y} t={t} at={c.at} scaleFrom={0.6} dy={0}>
            <Node title={c.l} icon={c.icon} w={210} h={130} size={22} hot={i === 5 ? p(t, C.chRevenue, 0.4) : i === 0 ? loop : 0} />
          </At>
        );
      })}
      <At x={cx} y={cy} t={t} at={C.then - 0.1} out={C.giveContext - 0.2}>
        <div style={{ textAlign: "center" }}><div style={{ ...TYPE.label, color: COLORS.crimson, fontSize: 22 }}>Growth loop</div><div style={{ fontSize: 60, color: COLORS.crimson }}>↻</div></div>
      </At>
      <At x={cx} y={cy} t={t} at={C.giveContext} dy={0}><AIEngine t={t} size={200} active={p(t, C.giveAI, 0.4)} /></At>
      <At x={1640} y={565} t={t} at={C.giveAI} dx={30} dy={0}><Pill size={18} hot={ai}>Context → AI</Pill></At>
    </AbsoluteFill>
  );
};

// "Google-এর AI Max-এ AI brief-এর direction-টাও interesting। Advertiser নিজের ভাষায় business, audience এবং key messaging-এর context দিতে পারে।"
export const AIBriefScene: S = ({ start }) => {
  const t = useT(start);
  const fields = [
    { l: "Business", at: C.bBusiness, v: "We help Bangladeshi students get into the right UK university." },
    { l: "Audience", at: C.bAudience, v: "Undergrad & postgrad students whose profile and budget fit." },
    { l: "Key messaging", at: C.bMessaging, v: "Affordability · career outcomes · trusted guidance." },
  ];
  const flow = p(t, C.bMessaging + 0.9, 0.5);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={C.aiBriefDir}>AI Max · the direction of AI briefs</Eyebrow></div>
      <At x={720} y={560} t={t} at={C.aiBrief} dy={50}>
        <Card w={1000} pad="34px 40px" glass>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
            <Icon name="form" size={40} color={COLORS.crimson} />
            <span style={{ ...TYPE.ui, fontSize: 30, letterSpacing: "0.1em" }}>AI BRIEF</span>
            <span style={{ marginLeft: "auto" }}><Pill size={14} outline>Concept</Pill></span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: INK.muted, marginBottom: 22, opacity: p(t, C.ownWords, 0.4) }}>Context in the advertiser’s own words</div>
          {fields.map((f) => (
            <div key={f.l} style={{ marginBottom: 18, opacity: p(t, C.aiBrief + 0.4, 0.4) }}>
              <div style={{ ...TYPE.label, fontSize: 16, marginBottom: 8, color: t > f.at ? COLORS.crimson : INK.muted }}>{f.l}</div>
              <div style={{ minHeight: 64, padding: "16px 20px", borderRadius: 16, background: "#fff", border: `2px solid ${t > f.at && t < f.at + 1.4 ? COLORS.crimson : INK.line}`, fontSize: 25, fontWeight: 600, color: INK.strong, boxSizing: "border-box" }}>
                {typed(f.v, t, f.at, 0.75)}
              </div>
            </div>
          ))}
        </Card>
      </At>
      <Lines>
        {[0, 1, 2].map((i) => <SignalLine key={i} d={curve(1230, 440 + i * 130, 1470, 560)} t={t} at={fields[i].at + 0.6} dur={0.4} hot={flow} pulse={C.bMessaging + 0.9} period={1.1} dots={1} />)}
      </Lines>
      <At x={1620} y={560} t={t} at={C.ownWords} dy={0}><AIEngine t={t} size={240} active={flow} /></At>
      <At x={1620} y={760} t={t} at={C.bMessaging + 1}><span style={{ ...TYPE.label, fontSize: 18, color: COLORS.crimson }}>AI optimization</span></At>
    </AbsoluteFill>
  );
};

// "Google আরও AI-driven performance বোঝার জন্য search term, creative, এবং landing page journey একসাথে দেখানো reporting দিচ্ছে।"
const COLS = [
  { h: "Search term", icon: "search", at: C.searchTerm, rows: ["cs degree uk", "uk masters computing", "study abroad cost"] },
  { h: "Creative asset", icon: "image", at: C.creative, rows: ["Career outcomes", "Affordable options", "Trusted guidance"] },
  { h: "Landing page", icon: "page", at: C.landingJ, rows: ["/uk-computer-science", "/postgraduate", "/scholarships"] },
] as const;
export const ReportingScene: S = ({ start }) => {
  const t = useT(start);
  const xs = [400, 960, 1520];
  const ry = (r: number) => 400 + r * 120;
  const links = [[0, 0], [1, 1], [2, 1], [0, 2]] as const; // col0→col1 rows & col1→col2 rows
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={C.reporting}>Reporting · AI-driven performance</Eyebrow></div>
      {COLS.map((c, ci) => (
        <div key={c.h}>
          <At x={xs[ci]} y={290} t={t} at={c.at - 0.1}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Icon name={c.icon} size={34} color={COLORS.crimson} /><span style={{ ...TYPE.label, color: INK.strong, fontSize: 22 }}>{c.h}</span></div>
          </At>
          {c.rows.map((r, ri) => {
            const hot = (ci === 0 && ri === 0) || (ci === 1 && ri === 0) || (ci === 2 && ri === 0);
            return (
              <At key={r} x={xs[ci]} y={ry(ri)} t={t} at={c.at + ri * 0.1} dy={20}>
                <Card w={380} pad="16px 22px" hot={hot ? p(t, C.journey + 0.4, 0.4) : 0}>
                  <span style={{ fontSize: 23, fontWeight: 800 }}>{r}</span>
                </Card>
              </At>
            );
          })}
        </div>
      ))}
      <Lines>
        {links.map(([a, b], i) => <SignalLine key={`l${i}`} d={curve(xs[0] + 190, ry(a), xs[1] - 190, ry(b))} t={t} at={C.creative + 0.3 + i * 0.05} dur={0.4} />)}
        {links.map(([a, b], i) => <SignalLine key={`r${i}`} d={curve(xs[1] + 190, ry(b), xs[2] - 190, ry(a === 0 ? 0 : b))} t={t} at={C.landingJ + 0.3 + i * 0.05} dur={0.4} />)}
        <SignalLine d={`M ${xs[0] + 190} ${ry(0)} L ${xs[1] - 190} ${ry(0)}`} t={t} at={C.journey} dur={0.4} hot={1} width={4} pulse={C.journey + 0.3} period={1.2} dots={1} />
        <SignalLine d={`M ${xs[1] + 190} ${ry(0)} L ${xs[2] - 190} ${ry(0)}`} t={t} at={C.journey + 0.3} dur={0.4} hot={1} width={4} pulse={C.journey + 0.6} period={1.2} dots={1} />
        <SignalLine d={`M 400 760 L 400 830 L 1520 830 L 1520 760`} t={t} at={C.journey + 0.4} dur={0.7} hot={1} />
      </Lines>
      <At x={960} y={830} t={t} at={C.journey + 0.8}><Pill size={26} hot={1}><Icon name="route" size={34} color={COLORS.ivory} />User journey</Pill></At>
      <At x={960} y={940} t={t} at={C.report}><span style={{ ...TYPE.label, fontSize: 18 }}>Relationships, not just numbers</span></At>
    </AbsoluteFill>
  );
};

// "মানে ভবিষ্যতে marketer-এর কাজ শুধু AI-কে চালানো না— বরং AI-কে সঠিকভাবে steer করা।"
const FLOW: { l: string; icon: IconName }[] = [
  { l: "Marketer", icon: "user" }, { l: "Direction", icon: "compass" }, { l: "Context", icon: "building" },
  { l: "Signals", icon: "target" }, { l: "AI", icon: "ai" }, { l: "Execution", icon: "growth" },
];
export const SteerScene: S = ({ start }) => {
  const t = useT(start);
  const fade = p(t, C.rather, 0.5);
  const steerK = p(t, C.steer - 0.1, 0.6, BACK);
  const levers = [0.3, 0.7, 0.5, 0.4];
  return (
    <AbsoluteFill>
      <At x={960} y={170} t={t} at={C.future} dy={0}>
        <div style={{ position: "relative", height: 110, width: 900, display: "grid", placeItems: "center" }}>
          <div style={{ position: "absolute", ...TYPE.hero, fontSize: 96, letterSpacing: "0.12em", color: INK.body, opacity: 1 - steerK }}>
            CONTROL
            <div style={{ position: "absolute", left: 0, top: "52%", height: 6, width: `${p(t, C.rather, 0.5) * 100}%`, background: COLORS.crimson, borderRadius: 3 }} />
          </div>
          <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 26, opacity: steerK, transform: `scale(${lerp(0.8, 1, steerK)})` }}>
            <div style={{ transform: `rotate(${lerp(-90, 0, steerK)}deg)` }}><Icon name="compass" size={96} color={COLORS.crimson} stroke={1.8} /></div>
            <span style={{ ...TYPE.hero, fontSize: 110, letterSpacing: "0.12em" }}><span style={MARK}>STEER</span></span>
          </div>
        </div>
      </At>
      {/* manual levers */}
      <At x={960} y={560} t={t} at={C.future + 0.3} out={C.rather}>
        <Card w={820} pad="30px 40px">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {["Keyword", "Bid", "Match", "Copy"].map((l, i) => {
              const v = levers[i] + 0.25 * Math.sin((t - C.future) * 2.2 + i * 1.3) * p(t, C.future + 0.6, 0.4);
              return (
                <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 16, height: 240, borderRadius: 16, background: "rgba(114,0,19,0.1)", position: "relative" }}>
                    <div style={{ position: "absolute", left: -17, width: 50, height: 30, borderRadius: 10, background: COLORS.burgundy, bottom: `calc(${v * 100}% - 15px)` }} />
                  </div>
                  <span style={{ ...TYPE.label, fontSize: 16, color: INK.strong }}>{l}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </At>
      <At x={960} y={860} t={t} at={C.operate - 0.4} out={C.rather}><span style={{ ...TYPE.label, fontSize: 18 }}>Operating every lever</span></At>
      {/* steering flow */}
      <Lines>
        {FLOW.slice(0, -1).map((f, i) => <SignalLine key={f.l} d={seg(285 + i * 270 + 112, 600, 285 + (i + 1) * 270 - 112, 600)} t={t} at={C.rather + 0.35 + (i + 1) * 0.27} dur={0.2} arrow hot={1} pulse={C.steer} period={1.2} dots={1} />)}
      </Lines>
      {FLOW.map((f, i) => (
        <At key={f.l} x={285 + i * 270} y={600} t={t} at={C.rather + 0.3 + i * 0.27} dy={30}>
          <div style={{ opacity: fade }}><Node title={f.l} icon={f.icon} w={220} h={150} size={22} hot={i === 0 || i === 4 ? 1 : 0} /></div>
        </At>
      ))}
      <At x={960} y={800} t={t} at={C.steer}><span style={{ ...TYPE.label, fontSize: 18, color: COLORS.crimson }}>Marketer sets direction · AI executes</span></At>
    </AbsoluteFill>
  );
};

// "Future-এর best marketer সে না, যে সবচেয়ে ভালো prompt লিখতে পারে। বরং সে—"
export const BestPromptScene: S = ({ start }) => {
  const t = useT(start);
  const shrink = p(t, C.notHe, 1.0, IN_OUT);
  const gone = p(t, C.ratherHe, 0.5);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10, opacity: 1 - gone }}><Eyebrow t={t} at={C.inMyView}>The best marketer of the future</Eyebrow></div>
      <At x={960} y={lerp(500, 640, shrink)} t={t} at={C.bestMarketer - 0.3} dy={40}>
        <div style={{ transform: `scale(${lerp(1.15, 0.6, shrink)})`, opacity: lerp(1, 0.35, shrink) * (1 - gone) }}>
          <Card w={760} pad="34px 44px" glass>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
              <Icon name="star" size={46} color={COLORS.crimson} />
              <span style={{ ...TYPE.title, fontSize: 64 }}>Best prompt</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, color: INK.body, lineHeight: 1.4 }}>“You are a world-class marketer. Write ten perfect, high-converting ads…”</div>
          </Card>
        </div>
      </At>
      <At x={960} y={250} t={t} at={C.notHe} out={C.ratherHe}><div style={{ ...TYPE.title, fontSize: 56, color: INK.body }}>…is <span style={{ color: COLORS.crimson }}>not</span> the one who writes this.</div></At>
      <div style={{ position: "absolute", left: 260, top: 230, width: 1400, height: 640, borderRadius: 40, border: `3px dashed rgba(128,1,31,${0.45 * gone})` }} />
      <At x={960} y={550} t={t} at={C.ratherHe + 0.1} dur={0.8}><div style={{ ...TYPE.label, fontSize: 30, color: COLORS.crimson, letterSpacing: "0.3em" }}>Rather, the one who…</div></At>
    </AbsoluteFill>
  );
};

// "যে সবচেয়ে ভালোভাবে Business বুঝতে পারে, Customer …, Data …, এবং সেই understanding AI-কে দিতে পারে।"
const CLUSTERS: { l: string; icon: IconName; at: number; sat: string[] }[] = [
  { l: "Business", icon: "building", at: C.uBusiness, sat: ["Objective", "Value", "Revenue"] },
  { l: "Customer", icon: "users", at: C.uCustomer, sat: ["Problem", "Intent", "Need", "Decision"] },
  { l: "Data", icon: "db", at: C.uData, sat: ["Signal", "Conversion", "Journey", "Outcome"] },
];
export const UnderstandingScene: S = ({ start }) => {
  const t = useT(start);
  const xs = [330, 800, 1270];
  const cy = 520;
  const flow = p(t, C.toAI, 0.5);
  const offs = (n: number) => (n === 3 ? [[-110, -175], [110, -175], [0, 180]] : [[-110, -175], [110, -175], [-110, 180], [110, 180]]);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 260, top: 230, width: 1400, height: 640, borderRadius: 40, border: `3px dashed rgba(128,1,31,${0.45 * (1 - p(t, C.uBusiness, 0.6))})` }} />
      <Lines>
        {CLUSTERS.map((c, i) => <SignalLine key={c.l} d={curve(xs[i] + 90, cy, 1560, cy)} t={t} at={C.understanding + i * 0.12} dur={0.5} hot={1} pulse={C.toAI} period={1.1} dots={1} />)}
        <SignalLine d={seg(1640, 650, 1640, 740)} t={t} at={C.toAI + 0.3} dur={0.25} arrow hot={1} />
      </Lines>
      {CLUSTERS.map((c, i) => (
        <div key={c.l}>
          {offs(c.sat.length).map(([dx, dy], j) => (
            <At key={c.sat[j]} x={xs[i] + dx} y={cy + dy} t={t} at={c.at + 0.25 + j * 0.1} dy={dy > 0 ? -20 : 20} scaleFrom={0.7}>
              <Pill size={16}>{c.sat[j]}</Pill>
            </At>
          ))}
          <At x={xs[i]} y={cy} t={t} at={c.at} scaleFrom={0.6} dy={0}>
            <div style={{ width: 180, height: 180, borderRadius: "50%", background: i === 0 || t < c.at + 0.6 || flow > 0 ? COLORS.burgundy : COLORS.burgundy, color: COLORS.ivory,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 24px 60px rgba(114,0,19,0.3)" }}>
              <Icon name={c.icon} size={50} color={COLORS.ivory} />
              <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.1em" }}>{c.l.toUpperCase()}</span>
            </div>
          </At>
        </div>
      ))}
      <At x={1640} y={cy} t={t} at={C.understanding} dy={0}><AIEngine t={t} size={220} active={flow} /></At>
      <At x={1640} y={850} t={t} at={C.toAI + 0.5} dy={30}>
        <Card w={330} pad="18px 22px">
          <div style={{ ...TYPE.label, fontSize: 14, color: COLORS.crimson, marginBottom: 10 }}>Structured output</div>
          {["Search", "Creative", "Landing page"].map((r, i) => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 19, fontWeight: 800, marginTop: 6, opacity: p(t, C.toAI + 0.6 + i * 0.12, 0.3) }}>
              <Icon name="check" size={22} color={COLORS.crimson} />{r}
            </div>
          ))}
        </Card>
      </At>
      <At x={800} y={900} t={t} at={C.understanding} dy={10}><span style={{ ...TYPE.label, fontSize: 20, color: INK.strong }}>…and gives that understanding to AI</span></At>
    </AbsoluteFill>
  );
};

// "কারণ AI আপনার হয়ে marketing করতে পারে। কিন্তু আপনার business কী চায়, সেটা AI-কে বোঝানোর দায়িত্ব এখনও আপনার।"
const EXEC: { l: string; icon: IconName }[] = [{ l: "Search", icon: "search" }, { l: "Creative", icon: "image" }, { l: "Landing page", icon: "page" }, { l: "Optimization", icon: "gear" }];
export const ResponsibilityScene: S = ({ start }) => {
  const t = useT(start);
  const ctx = p(t, C.explainAI + 0.2, 1.1, IN_OUT);
  const resp = p(t, C.yours, 0.5);
  const sys = { x: 1260, y: 560 };
  const ex = (i: number) => [sys.x + (i % 2 ? 210 : -210), sys.y + (i < 2 ? -170 : 170)];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 10 }}><Eyebrow t={t} at={C.aiMarkets}>AI can do the marketing</Eyebrow></div>
      <div style={{ position: "absolute", left: sys.x - 430, top: sys.y - 330, width: 860, height: 660, borderRadius: 40, border: `2px solid ${INK.line}`, background: "rgba(255,255,255,0.35)", opacity: p(t, C.becauseAI, 0.6) }} />
      <At x={sys.x} y={sys.y - 300} t={t} at={C.becauseAI + 0.2}><span style={{ ...TYPE.label, fontSize: 16, background: COLORS.ivory, padding: "0 14px" }}>AI system</span></At>
      <Lines>
        {EXEC.map((e, i) => { const [x, y] = ex(i); return <SignalLine key={e.l} d={seg(sys.x, sys.y, x, y)} t={t} at={C.aiMarkets + i * 0.25} dur={0.3} hot={ctx} pulse={C.aiMarkets + 0.5} period={1.4} dots={1} />; })}
        <SignalLine d={curve(470, 560, 1120, 560)} t={t} at={C.explainAI} dur={0.6} hot={1} width={4} pulse={C.explainAI + 0.4} period={1} dots={2} />
      </Lines>
      {EXEC.map((e, i) => { const [x, y] = ex(i); return (
        <At key={e.l} x={x} y={y} t={t} at={C.aiMarkets + 0.2 + i * 0.25}><Node title={e.l} icon={e.icon} w={220} h={130} size={20} hot={ctx} /></At>
      ); })}
      <At x={sys.x} y={sys.y} t={t} at={C.becauseAI + 0.3} dy={0}><AIEngine t={t} size={210} uncertain={p(t, C.but, 0.4) * (1 - ctx)} active={ctx} /></At>
      {/* marketer — outside the system */}
      <At x={330} y={560} t={t} at={C.aiMarkets + 0.4} dx={-40} dy={0}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ width: 170, height: 170, borderRadius: "50%", background: resp > 0.5 ? COLORS.burgundy : "#fff", border: `3px solid ${COLORS.burgundy}`, display: "grid", placeItems: "center", boxShadow: "0 20px 50px rgba(45,0,1,0.1)" }}>
            <Icon name="user" size={90} color={resp > 0.5 ? COLORS.ivory : COLORS.burgundy} />
          </div>
          <span style={{ ...TYPE.label, color: INK.strong }}>Marketer</span>
        </div>
      </At>
      <At x={560} y={240} t={t} at={C.whatWants} dy={30} dur={0.8}>
        <Card w={620} pad="24px 30px" glass>
          <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, color: INK.strong }}>What does the business <span style={{ color: COLORS.crimson }}>actually want?</span></div>
        </Card>
      </At>
      {ctx > 0 && ctx < 1 ? (
        <div style={{ position: "absolute", left: lerp(470, 1050, ctx), top: 500, transform: "translate(-50%,-50%)" }}><Pill size={18} hot={1}>Business context</Pill></div>
      ) : null}
      <At x={330} y={800} t={t} at={C.yours}><Pill size={20} hot={1}>Still your responsibility</Pill></At>
    </AbsoluteFill>
  );
};

// "আমি Fahad।" / "The future of marketing is not AI replacing marketers. It's marketers who know how to work with AI."
export const FinaleScene: S = ({ start }) => {
  const t = useT(start);
  const sig = p(t, C.futureOf, 0.8, IN_OUT);
  const flip = p(t, C.marketers - 0.1, 0.5, IN_OUT);
  const swash = "M 0 30 C 40 -10 60 50 100 18 S 160 -6 190 26 S 260 40 300 8";
  const sd = drawn(swash, t, C.fahad + 0.4, 0.8);
  const chain = [
    { l: "Marketer", icon: "user", at: C.marketers, x: 330 }, { l: "AI", icon: "ai", at: C.marketers + 0.3, x: 760 },
    { l: "Better marketing", icon: "target", at: C.workWithAI - 0.6, x: 1190 }, { l: "Business growth", icon: "growth", at: C.workWithAI - 0.2, x: 1610 },
  ] as const;
  return (
    <AbsoluteFill>
      {/* signature: centre → bottom-left */}
      <div style={{ position: "absolute", left: lerp(960, 320, sig), top: lerp(480, 975, sig), transform: `translate(-50%,-50%) scale(${lerp(1, 0.36, sig)})`, transformOrigin: "50% 50%" }}>
        <At x={0} y={0} t={t} at={C.fahad} dy={30}><div style={{ ...TYPE.hero, fontSize: 190, letterSpacing: "0.04em" }}>FAHAD</div></At>
        <At x={0} y={150} t={t} at={C.fahad + 0.25} out={C.futureOf}><div style={{ ...TYPE.label, fontSize: 30, whiteSpace: "nowrap" }}>Digital Marketing • Strategy • AI • Growth</div></At>
        <svg viewBox="-10 -20 320 80" width={420} height={100} style={{ position: "absolute", left: -210, top: 105, overflow: "visible" }}>
          <path d={swash} fill="none" stroke={COLORS.crimson} strokeWidth={5} strokeLinecap="round" strokeDasharray={sd.strokeDasharray} strokeDashoffset={sd.strokeDashoffset} opacity={sig} />
        </svg>
      </div>
      {/* AI ≠ marketer replacement */}
      <At x={960} y={lerp(470, 200, flip)} t={t} at={C.notAI} dy={0} scaleFrom={1.2}>
        <div style={{ transform: `scale(${lerp(1, 0.55, flip)})`, opacity: lerp(1, 0.55, flip), display: "flex", alignItems: "center", gap: 36, whiteSpace: "nowrap" }}>
          <span style={{ ...TYPE.hero, fontSize: 120 }}>AI</span>
          <span style={{ width: 120, height: 120, borderRadius: "50%", background: COLORS.crimson, color: COLORS.ivory, display: "grid", placeItems: "center", fontSize: 86, fontWeight: 800 }}>≠</span>
          <span style={{ ...TYPE.hero, fontSize: 100, opacity: p(t, C.replacing, 0.3) }}>Marketer replacement</span>
        </div>
      </At>
      {/* marketer + AI → better marketing → business growth */}
      <Lines>
        <SignalLine d={seg(1000 - 110 + 20, 520, 1080, 520)} t={t} at={C.workWithAI - 0.75} dur={0.2} arrow hot={1} />
        <SignalLine d={seg(1300 + 20, 520, 1500, 520)} t={t} at={C.workWithAI - 0.35} dur={0.2} arrow hot={1} pulse={C.workWithAI} period={1} dots={1} />
      </Lines>
      {chain.map((c, i) => (
        <At key={c.l} x={c.x} y={520} t={t} at={c.at} dy={30}>
          <Node title={c.l} icon={c.icon} w={i > 1 ? 260 : 220} h={170} size={22} hot={i === 3 ? 1 : i === 1 ? 0.0 : 0} />
        </At>
      ))}
      <At x={545} y={520} t={t} at={C.marketers + 0.2}><span style={{ fontSize: 70, fontWeight: 800, color: COLORS.crimson }}>+</span></At>
      <At x={960} y={760} t={t} at={C.workWithAI + 0.05} dy={20}>
        <Wipe t={t} at={C.workWithAI + 0.05} dur={0.5}>
          <div style={{ ...TYPE.title, fontSize: 68, whiteSpace: "nowrap" }}>Work with AI. <span style={{ color: COLORS.crimson }}>Think like a marketer.</span></div>
        </Wipe>
      </At>
    </AbsoluteFill>
  );
};
