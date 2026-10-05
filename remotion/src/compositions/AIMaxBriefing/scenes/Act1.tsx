/** Act 1 — the thesis, the prompt myth, and how AI Max changes control (0 – 51s). */
import { AbsoluteFill } from "remotion";
import {
  AIEngine, At, BACK, Camera, Card, COLORS, curve, Eyebrow, Headline, Icon, IconName, INK, IN_OUT, lerp, Lines, MARK,
  p, Pill, PromptBox, SAFE, SearchBar, seg, SignalLine, TYPE, typed, useT, Wipe,
} from "../../../brand";
import { C } from "../cues";

type S = React.FC<{ start: number }>;

const CONTEXT6: { title: string; icon: IconName }[] = [
  { title: "Business", icon: "building" }, { title: "Customer", icon: "users" }, { title: "Problem", icon: "bulb" },
  { title: "Value", icon: "star" }, { title: "Message", icon: "message" }, { title: "Conversion", icon: "target" },
];

// 01 — "AI Max-এ marketer-এর নতুন skill Prompting না, Business Briefing." / "হ্যাঁ, আপনি ঠিকই শুনেছেন।"
const BRIEF6: { title: string; icon: IconName }[] = [
  { title: "Business", icon: "building" }, { title: "Customer", icon: "users" }, { title: "Intent", icon: "search" },
  { title: "Message", icon: "message" }, { title: "Conversion", icon: "target" }, { title: "Revenue", icon: "revenue" },
];
export const HookScene: S = ({ start }) => {
  const t = useT(start);
  const up = p(t, C.marketer, 0.9, IN_OUT);
  return (
    <AbsoluteFill>
      <Camera t={t} keys={[{ at: C.heard + 0.1, dur: 1.4, scale: 1.06, x: -95, y: 10 }]}>
        <At x={960} y={lerp(540, 170, up)} t={t} at={C.aiMax} dy={0} scaleFrom={1.15} dur={0.7}>
          <div style={{ ...TYPE.hero, fontSize: lerp(230, 64, up), letterSpacing: lerp(-0.02, 0.18, up) + "em", whiteSpace: "nowrap" }}>
            AI MAX
          </div>
        </At>
        <At x={960} y={232} t={t} at={C.skill - 0.2}><span style={{ ...TYPE.label, fontSize: 22 }}>The marketer’s new skill</span></At>
        <Lines>
          <SignalLine d={seg(960, 300, 960, 900)} t={t} at={C.skill} dur={0.7} />
        </Lines>
        {/* left: prompting — thin */}
        <At x={520} y={390} t={t} at={C.prompting} dx={-40} dy={0}>
          <div style={{ ...TYPE.title, fontSize: 84, color: INK.body }}>PROMPTING</div>
        </At>
        <At x={520} y={520} t={t} at={C.prompting + 0.3}>
          <Card pad="20px 32px" style={{ borderRadius: 999 }}><span style={{ fontSize: 36, fontWeight: 600, color: INK.body }}>“Generate ads.”</span></Card>
        </At>
        <At x={520} y={640} t={t} at={C.prompting + 0.6}><span style={{ ...TYPE.label, color: INK.faint }}>One instruction</span></At>
        {/* right: business briefing — rich */}
        <At x={1400} y={390} t={t} at={C.briefing} dx={40} dy={0}>
          <div style={{ ...TYPE.title, fontSize: 84, whiteSpace: "nowrap" }}><span style={MARK}>BUSINESS</span> BRIEFING</div>
        </At>
        <div style={{ position: "absolute", left: 1400 - 330, top: 480, width: 660, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {BRIEF6.map((b, i) => {
            const k = p(t, C.briefing + 0.3 + i * 0.13, 0.5, BACK);
            return (
              <div key={b.title} style={{ opacity: Math.min(1, k * 1.4), transform: `translateY(${(1 - k) * 26}px) scale(${lerp(0.9, 1, k)})` }}>
                <Card pad="16px 22px" hot={i === 5 ? p(t, C.heard + 0.4, 0.4) : 0}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <Icon name={b.icon} size={34} color={i === 5 && t > C.heard + 0.6 ? COLORS.ivory : COLORS.burgundy} />
                    <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>{b.title}</span>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
        <At x={960} y={560} t={t} at={C.heard} scaleFrom={0.4} dy={0}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", background: COLORS.crimson, color: COLORS.ivory, display: "grid", placeItems: "center",
            fontSize: 84, fontWeight: 800, boxShadow: "0 20px 50px rgba(128,1,31,0.35)", lineHeight: 1 }}>≠</div>
        </At>
      </Camera>
    </AbsoluteFill>
  );
};

// 02 — "অনেকে ভাবছেন— AI আসছে, তাই … important skill হবে AI-কে ভালো prompt দেওয়া।" / "আমি কিন্তু একটু অন্যভাবে দেখি।"
export const PromptMythScene: S = ({ start }) => {
  const t = useT(start);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10 }}><Eyebrow t={t} at={C.many}>The common belief</Eyebrow></div>
      <At x={760} y={250} t={t} at={C.importantSkill}>
        <Pill size={22}><Icon name="star" size={28} />Most important skill = prompting?</Pill>
      </At>
      <At x={760} y={480} t={t} at={C.aiComing} dy={40}>
        <PromptBox t={t} at={C.aiComing + 0.3} dur={1.5} w={900} size={46} text="Generate 5 Google Ads for my business."
          extra={[{ text: "Make them catchy.", at: C.importantSkill + 0.5 }, { text: "Add a strong call to action.", at: C.goodPrompt - 0.3 }, { text: "Use emotional hooks.", at: C.promptWord + 0.3 }]} />
      </At>
      <Lines>
        <SignalLine d={seg(1220, 470, 1390, 470)} t={t} at={C.goodPrompt} dur={0.4} dashed pulse={C.goodPrompt + 0.3} period={1} dots={1} />
      </Lines>
      <At x={1540} y={420} t={t} at={C.aiComing + 0.6} dy={0}><AIEngine t={t} size={240} uncertain={p(t, C.differently, 0.6)} /></At>
      <div style={{ position: "absolute", left: 1540 - 170, top: 590, width: 340, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {["Business", "Customer", "Value", "Goal"].map((c, i) => (
          <div key={c} style={{ opacity: p(t, C.goodPrompt + i * 0.12, 0.4), border: `2px dashed ${INK.lineStrong}`, borderRadius: 14, padding: "10px 12px",
            display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800, letterSpacing: "0.08em", color: INK.muted }}>
            {c.toUpperCase()}<span style={{ color: COLORS.crimson }}>?</span>
          </div>
        ))}
      </div>
      <At x={1540} y={725} t={t} at={C.goodPrompt + 0.6}><span style={{ ...TYPE.label, fontSize: 17 }}>Context: empty</span></At>
      <div style={{ position: "absolute", left: SAFE.x, top: 820, width: SAFE.w }}>
        <Headline t={t} at={C.differently + 0.1} text="But… what does AI know about the business?" mark={["business"]} style={{ fontSize: 64 }} />
      </div>
    </AbsoluteFill>
  );
};

// 03 — "কারণ Google Ads-এর AI যত বেশি intelligent হচ্ছে, তত বেশি important … Business সম্পর্কে কতটা ভালো context দিতে পারছেন।"
export const ContextAnchorScene: S = ({ start }) => {
  const t = useT(start);
  const ys = CONTEXT6.map((_, i) => 225 + i * 128);
  const smart = p(t, C.intelligent - 0.6, 1.4);
  const flow = p(t, C.context, 0.5);
  const columnIn = (i: number) => C.youGive + 0.35 + i * 0.3;
  return (
    <AbsoluteFill>
      <At x={1300} y={170} t={t} at={C.because + 0.2}><Pill size={20}><Icon name="ai" size={28} />AI gets more intelligent</Pill></At>
      <At x={1300} y={900} t={t} at={C.moreImportant}><Pill size={20} hot={flow}><Icon name="building" size={28} color={flow > 0.5 ? COLORS.ivory : COLORS.burgundy} />Business context matters more</Pill></At>
      {/* intelligence rings */}
      <Lines>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={1300} cy={540} r={190 + i * 55} fill="none" stroke={COLORS.burgundy} strokeWidth={2}
            strokeDasharray={i === 1 ? "4 12" : undefined} opacity={0.25 * p(t, C.because + 0.4 + i * 0.5, 0.8) * (1 - 0.5 * flow)} />
        ))}
        {CONTEXT6.map((c, i) => (
          <SignalLine key={c.title} d={curve(640, ys[i], 1150, 540)} t={t} at={columnIn(i) + 0.2} dur={0.5} hot={flow} pulse={C.context} period={1.3} dots={1} />
        ))}
        {CONTEXT6.slice(0, -1).map((c, i) => (
          <SignalLine key={`a${c.title}`} d={seg(450, ys[i] + 42, 450, ys[i + 1] - 42)} t={t} at={columnIn(i + 1) - 0.1} dur={0.2} />
        ))}
      </Lines>
      <At x={1300} y={540} t={t} at={C.because} dy={0}>
        <div style={{ transform: `scale(${lerp(0.85, 1.05, smart)})` }}><AIEngine t={t} size={300} active={flow} /></div>
      </At>
      {CONTEXT6.map((c, i) => {
        const hi = i === 0 ? p(t, C.business, 0.3) * (1 - p(t, C.business + 1.2, 0.4)) : 0;
        return (
          <At key={c.title} x={450} y={ys[i]} t={t} at={columnIn(i)} dx={-50} dy={0}>
            <Card w={380} h={84} hot={Math.max(hi, i === 5 ? flow : 0)} pad="0 26px">
              <div style={{ height: "100%", display: "flex", alignItems: "center", gap: 18 }}>
                <Icon name={c.icon} size={36} color={Math.max(hi, i === 5 ? flow : 0) > 0.5 ? COLORS.ivory : COLORS.burgundy} />
                <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.title}</span>
              </div>
            </Card>
          </At>
        );
      })}
    </AbsoluteFill>
  );
};

// 04 — manual control panel → morphs into dynamic signals (AI Max)
const CONTROLS = [
  { label: "Keyword", icon: "key", cue: C.keyword, signal: "Search intent", sigIcon: "search" },
  { label: "Match type", icon: "sliders", cue: C.matchType, signal: "Real-time signals", sigIcon: "nodes" },
  { label: "Bid", icon: "money", cue: C.bid, signal: "Smart bidding", sigIcon: "growth" },
  { label: "Ad copy", icon: "write", cue: C.adCopy, signal: "Ad assets", sigIcon: "image" },
  { label: "Landing page", icon: "page", cue: C.landingPage, signal: "Landing page", sigIcon: "route" },
] as const;
const ControlWidget: React.FC<{ i: number; t: number; cue: number }> = ({ i, t, cue }) => {
  const k = p(t, cue + 0.15, 0.6, IN_OUT);
  if (i === 0) return <div style={{ display: "flex", gap: 10 }}>{["2 bed flat", "apartment dhaka", "flat price"].map((c, j) => <Pill key={c} size={16} hot={j === 0 ? k : 0}>{c}</Pill>)}</div>;
  if (i === 1) return (
    <div style={{ display: "flex", borderRadius: 999, border: `2px solid ${INK.line}`, overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, width: "33.3%", left: `${lerp(0, 66.6, k)}%`, background: COLORS.burgundy }} />
      {["BROAD", "PHRASE", "EXACT"].map((m, j) => <div key={m} style={{ position: "relative", width: 130, textAlign: "center", padding: "10px 0", fontSize: 17, fontWeight: 800, letterSpacing: "0.1em",
        color: Math.abs(lerp(0, 2, k) - j) < 0.5 ? COLORS.ivory : INK.body }}>{m}</div>)}
    </div>
  );
  if (i === 2) return (
    <div style={{ width: 380, height: 10, borderRadius: 10, background: "rgba(114,0,19,0.12)", position: "relative" }}>
      <div style={{ width: `${lerp(30, 72, k)}%`, height: "100%", borderRadius: 10, background: COLORS.burgundy }} />
      <div style={{ position: "absolute", top: -10, left: `calc(${lerp(30, 72, k)}% - 15px)`, width: 30, height: 30, borderRadius: "50%", background: "#fff", border: `3px solid ${COLORS.burgundy}` }} />
    </div>
  );
  if (i === 3) return <div style={{ padding: "10px 18px", borderRadius: 12, border: `2px solid ${INK.line}`, background: "#fff", fontSize: 21, fontWeight: 600, minWidth: 380, color: INK.strong }}>{typed("Premium 2-bed apartments, Dhaka", t, cue + 0.1, 0.7)}</div>;
  return <div style={{ padding: "10px 18px", borderRadius: 12, border: `2px solid ${INK.line}`, background: "#fff", fontSize: 21, fontWeight: 600, minWidth: 380, color: INK.body }}>{typed("site.com/apartments", t, cue + 0.1, 0.5)}</div>;
};
export const ManualScene: S = ({ start }) => {
  const t = useT(start);
  const shrink = p(t, C.aiMaxSystem + 0.3, 1.1, IN_OUT);
  const pcx = lerp(1100, 470, shrink);
  const ps = lerp(1, 0.6, shrink);
  const rowY = (i: number) => 330 + i * 106;
  const rowYp = (i: number) => 560 + (rowY(i) - 560) * ps;
  const cursorIdx = CONTROLS.findIndex((c, i) => t < (CONTROLS[i + 1]?.cue ?? C.optimize) - 0.15 && t >= c.cue - 0.6);
  const cy = cursorIdx >= 0 ? rowY(cursorIdx) : rowY(4) + 120;
  const optPress = p(t, C.optimize, 0.3);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10, opacity: 1 - p(t, C.aiMaxSystem, 0.3) }}><Eyebrow t={t} at={C.before}>Before · manual control</Eyebrow></div>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10, opacity: p(t, C.aiMaxSystem, 0.4) }}><Eyebrow t={t} at={C.aiMaxSystem}>AI Max · real-time signals</Eyebrow></div>
      {/* marketer */}
      <At x={300} y={560} t={t} at={C.before} out={C.aiMaxSystem} dx={-40} dy={0}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ width: 150, height: 150, borderRadius: "50%", background: "#fff", border: `2px solid ${INK.line}`, display: "grid", placeItems: "center", boxShadow: "0 20px 50px rgba(45,0,1,0.08)" }}>
            <Icon name="user" size={80} />
          </div>
          <span style={{ ...TYPE.label, color: INK.strong }}>Marketer</span>
          <span style={{ opacity: p(t, C.manually, 0.4) }}><Pill size={16} hot={1}>Manual control</Pill></span>
        </div>
      </At>
      <Lines>
        <g opacity={1 - p(t, C.aiMaxSystem, 0.3)}>
          {CONTROLS.map((c, i) => <SignalLine key={c.label} d={curve(390, 560, 590, rowY(i))} t={t} at={c.cue} dur={0.35} hot={p(t, c.cue, 0.2) * (1 - p(t, c.cue + 0.7, 0.3))} />)}
        </g>
      </Lines>
      {/* panel */}
      <div style={{ position: "absolute", left: pcx - 500, top: 560 - 340, width: 1000, transform: `scale(${ps})`, transformOrigin: "50% 50%", opacity: lerp(1, 0.55, shrink) * p(t, C.before + 0.2, 0.5) }}>
        <Card w={1000} h={680} pad="30px 40px">
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <Icon name="sliders" size={38} /><span style={{ ...TYPE.ui, letterSpacing: "0.12em" }}>CAMPAIGN CONTROLS</span>
            <span style={{ marginLeft: "auto", opacity: shrink }}><Pill size={15} outline>Still available</Pill></span>
          </div>
          {CONTROLS.map((c, i) => {
            const k = p(t, c.cue - 0.1, 0.45);
            return (
              <div key={c.label} style={{ height: 106, display: "flex", alignItems: "center", gap: 20, borderTop: `2px solid ${INK.line}`, opacity: k, transform: `translateX(${(1 - k) * 30}px)` }}>
                <Icon name={c.icon} size={36} />
                <span style={{ width: 230, fontSize: 25, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.label}</span>
                <ControlWidget i={i} t={t} cue={c.cue} />
              </div>
            );
          })}
        </Card>
      </div>
      {/* optimize button + cursor (manual era) */}
      <At x={1100} y={960} t={t} at={C.optimize - 0.6} out={C.aiMaxSystem}>
        <div style={{ transform: `scale(${1 - 0.06 * Math.sin(optPress * Math.PI)})`, padding: "16px 40px", borderRadius: 999, background: COLORS.burgundy, color: COLORS.ivory, fontSize: 24, fontWeight: 800, letterSpacing: "0.12em" }}>OPTIMIZE CAMPAIGN</div>
      </At>
      <div style={{ position: "absolute", left: t < C.optimize - 0.2 ? 1420 : 1180, top: (t < C.optimize - 0.2 ? cy : 975) - 10, opacity: p(t, C.keyword - 0.5, 0.3) * (1 - p(t, C.aiMaxSystem, 0.3)) }}>
        <svg width={48} height={48} viewBox="0 0 24 24"><path d="M6 3.5l12 7-5.2 1.5L10 17.5z" fill={COLORS.maroon} stroke="#fff" strokeWidth={1.2} strokeLinejoin="round" /></svg>
      </div>
      {/* morph: controls → signals → AI */}
      <Lines>
        {CONTROLS.map((c, i) => (
          <SignalLine key={c.signal} d={curve(1340, 300 + i * 120, 1500, 560)} t={t} at={C.realTime + 0.4 + i * 0.12} dur={0.4} hot={1} pulse={C.realTime + 0.8} period={1.2} dots={1} />
        ))}
      </Lines>
      {CONTROLS.map((c, i) => {
        const m = p(t, C.realTime - 0.6 + i * 0.15, 0.9, IN_OUT);
        if (m <= 0) return null;
        const x = lerp(pcx - 120, 1150, m);
        const y = lerp(rowYp(i), 300 + i * 120, m);
        return (
          <div key={c.signal} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${lerp(0.7, 1, m)})`, opacity: Math.min(1, m * 2) }}>
            <Pill size={20} hot={m}><Icon name={c.sigIcon} size={26} color={m > 0.5 ? COLORS.ivory : COLORS.burgundy} />{c.signal}</Pill>
          </div>
        );
      })}
      <At x={1640} y={560} t={t} at={C.aiMaxSystem + 0.8} dy={0}><AIEngine t={t} size={260} active={p(t, C.realTime + 0.9, 0.5)} /></At>
      <At x={1640} y={780} t={t} at={C.realTime + 1.0}><Pill size={18}>Automation ↑</Pill></At>
    </AbsoluteFill>
  );
};

// 05 — "search-এর intent বুঝতে, relevant keywords খুঁজতে, ad assets customize করতে এবং relevant landing page বেছে নিতে পারে।"
const QUERY = "best UK university for computer science";
const BREAKDOWN = [["Location", "UK"], ["Course", "Computer science"], ["Level", "Undergraduate"], ["Intent", "Enquiry"]];
const VARIANTS = ["Undergraduate", "Postgraduate", "Career focus", "Affordability"];
export const AIMaxWorkScene: S = ({ start }) => {
  const t = useT(start);
  const pick = p(t, C.landing + 0.4, 0.5);
  return (
    <AbsoluteFill>
      {[{ x: 400, l: "Search intent", at: C.intent }, { x: 960, l: "Ad assets", at: C.assets }, { x: 1520, l: "Landing page", at: C.landing - 0.3 }].map((h, i) => (
        <At key={h.l} x={h.x} y={150} t={t} at={h.at}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 34, height: 34, borderRadius: "50%", background: COLORS.crimson, color: COLORS.ivory, fontSize: 17, fontWeight: 800, display: "grid", placeItems: "center" }}>{i + 1}</span>
            <span style={{ ...TYPE.label, color: INK.strong, fontSize: 24 }}>{h.l}</span>
          </div>
        </At>
      ))}
      <Lines>
        <SignalLine d={seg(640, 540, 720, 540)} t={t} at={C.assets - 0.2} dur={0.3} arrow hot={1} />
        <SignalLine d={seg(1200, 540, 1280, 540)} t={t} at={C.landing - 0.3} dur={0.3} arrow hot={1} />
      </Lines>
      {/* 1 — query breakdown */}
      <At x={400} y={260} t={t} at={C.intent - 0.1}>
        <SearchBar t={t} at={C.intent} query={QUERY} typeDur={0.9} w={480} size={19} />
      </At>
      {BREAKDOWN.map(([k, v], i) => (
        <At key={k} x={400} y={370 + i * 92} t={t} at={C.intent + 0.7 + i * 0.22} dx={-30} dy={0}>
          <Card w={440} pad="14px 22px">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ ...TYPE.label, fontSize: 16 }}>{k}</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: i === 3 ? COLORS.crimson : INK.strong }}>{v}</span>
            </div>
          </Card>
        </At>
      ))}
      <At x={400} y={760} t={t} at={C.keywords}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, width: 440, justifyContent: "center" }}>
          {["cs degree uk", "uk computing course", "study cs abroad"].map((k, i) => <span key={k} style={{ opacity: p(t, C.keywords + i * 0.15, 0.3) }}><Pill size={15}>{k}</Pill></span>)}
        </div>
      </At>
      <At x={400} y={850} t={t} at={C.keywords + 0.3}><span style={{ ...TYPE.label, fontSize: 15 }}>Relevant keywords found</span></At>
      {/* 2 — one message, adapted */}
      <At x={960} y={300} t={t} at={C.assets}>
        <Card w={420} pad="18px 24px" hot={1}>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.18em", opacity: 0.75, marginBottom: 6 }}>ORIGINAL MESSAGE</div>
          <div style={{ fontSize: 26, fontWeight: 800 }}>Study CS in the UK</div>
        </Card>
      </At>
      <Lines>
        {VARIANTS.map((v, i) => <SignalLine key={v} d={curve(960, 360, 960 + (i % 2 ? 110 : -110), 470 + Math.floor(i / 2) * 150)} t={t} at={C.customize + i * 0.15} dur={0.3} />)}
      </Lines>
      {VARIANTS.map((v, i) => (
        <At key={v} x={960 + (i % 2 ? 110 : -110)} y={510 + Math.floor(i / 2) * 150} t={t} at={C.customize + 0.15 + i * 0.15}>
          <Card w={210} pad="14px 16px">
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.16em", color: COLORS.crimson, marginBottom: 6 }}>{v.toUpperCase()}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{[90, 65].map((w, j) => <div key={j} style={{ width: `${w}%`, height: 8, borderRadius: 8, background: "rgba(114,0,19,0.15)" }} />)}</div>
          </Card>
        </At>
      ))}
      <At x={960} y={830} t={t} at={C.customize + 0.9}><span style={{ ...TYPE.label, fontSize: 15 }}>Same value · different intent</span></At>
      {/* 3 — landing page selection */}
      {["General admissions", "UK · Computer science", "Scholarships"].map((l, i) => {
        const chosen = i === 1;
        return (
          <At key={l} x={1520} y={330 + i * 170} t={t} at={C.landing - 0.2 + i * 0.12} dx={30} dy={0}>
            <div style={{ opacity: chosen ? 1 : lerp(1, 0.4, pick), transform: `scale(${chosen ? lerp(1, 1.06, pick) : 1})` }}>
              <Card w={400} pad="16px 20px" style={chosen ? { boxShadow: `0 0 0 ${4 * pick}px ${COLORS.crimson}, 0 20px 50px rgba(114,0,19,${0.2 * pick})` } : undefined}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 70, height: 56, borderRadius: 10, background: "linear-gradient(135deg, rgba(114,0,19,0.18), rgba(128,1,31,0.05))", display: "grid", placeItems: "center" }}>
                    <Icon name={i === 1 ? "uni" : i === 0 ? "page" : "money"} size={32} />
                  </div>
                  <span style={{ fontSize: 22, fontWeight: 800, color: INK.strong }}>{l}</span>
                  {chosen ? <span style={{ marginLeft: "auto", opacity: pick }}><Icon name="check" size={36} color={COLORS.crimson} stroke={2} /></span> : null}
                </div>
              </Card>
            </div>
          </At>
        );
      })}
      <At x={1520} y={850} t={t} at={C.landing + 0.6}><span style={{ ...TYPE.label, fontSize: 15, color: COLORS.crimson }}>Intent → relevant page</span></At>
    </AbsoluteFill>
  );
};

// 06 — "তাই এখন প্রশ্নটা শুধু— ‘Google-কে কী setting দেব?’ না। প্রশ্নটা হচ্ছে— ‘Google AI-কে আমার Business সম্পর্কে কী context দেব?’"
export const QuestionsScene: S = ({ start }) => {
  const t = useT(start);
  const aside = p(t, C.realQ, 0.9, IN_OUT);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10, opacity: 1 - aside }}><Eyebrow t={t} at={C.soNow}>So the question is not just</Eyebrow></div>
      <div style={{ position: "absolute", left: lerp(960, 330, aside), top: lerp(500, 190, aside), transform: `translate(-50%,-50%) scale(${lerp(1, 0.42, aside)})`, opacity: lerp(1, 0.5, aside) }}>
        <At x={0} y={0} t={t} at={C.soNow + 0.1}>
          <Card w={780} pad="26px 34px">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}><Icon name="sliders" size={34} /><span style={{ ...TYPE.ui, letterSpacing: "0.12em" }}>SETTINGS</span></div>
            {["Budget", "Bidding", "Keywords", "Locations"].map((r, i) => (
              <div key={r} style={{ display: "flex", alignItems: "center", gap: 16, height: 56, borderTop: `2px solid ${INK.line}`, opacity: p(t, C.soNow + 0.3 + i * 0.12, 0.3) }}>
                <span style={{ width: 160, fontSize: 20, fontWeight: 800, letterSpacing: "0.1em" }}>{r.toUpperCase()}</span>
                <div style={{ flex: 1, height: 8, borderRadius: 8, background: "rgba(114,0,19,0.12)" }}><div style={{ width: `${40 + i * 12}%`, height: "100%", borderRadius: 8, background: COLORS.burgundy }} /></div>
              </div>
            ))}
          </Card>
        </At>
        <At x={0} y={290} t={t} at={C.settingQ}>
          <div style={{ ...TYPE.title, fontSize: 60, whiteSpace: "nowrap" }}>“What settings should I give Google?”</div>
        </At>
      </div>
      <At x={SAFE.x} y={395} anchor="left" t={t} at={C.realQ + 0.2} dx={-20} dy={0}><span style={{ ...TYPE.label, color: COLORS.crimson, fontSize: 24 }}>The real question</span></At>
      <div style={{ position: "absolute", left: SAFE.x, top: 440, width: 1580 }}>
        <Headline t={t} at={C.contextQ} text="“What context should Google AI know about my business?”" mark={["context"]} markAt={C.contextQWord} align="left" style={{ fontSize: 88, lineHeight: 1.1 }} />
      </div>
      {CONTEXT6.map((c, i) => (
        <At key={c.title} x={SAFE.x + 125 + i * 266} y={820} t={t} at={C.contextQBiz + i * 0.2} dy={50}>
          <Card w={240} pad="18px 16px" hot={i === 0 ? p(t, C.contextQBiz, 0.3) : 0}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <Icon name={c.icon} size={42} color={i === 0 && t > C.contextQBiz + 0.2 ? COLORS.ivory : COLORS.burgundy} />
              <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.title}</span>
            </div>
          </Card>
        </At>
      ))}
      <Wipe t={t} at={C.contextQWord + 0.3} style={{ position: "absolute", left: SAFE.x, top: 930, width: SAFE.w, height: 4, background: `linear-gradient(90deg, ${COLORS.crimson}, rgba(128,1,31,0.1))` }}><div /></Wipe>
    </AbsoluteFill>
  );
};
