/** Act 1 — the promise, the question, and how Google Ads is changing (0 – 36s). */
import { AbsoluteFill } from "remotion";
import {
  AdPreview, AIEngine, At, Card, COLORS, curve, Eyebrow, Headline, Icon, INK, lerp, Lines, MARK, Node,
  on, p, PageWire, Pill, SAFE, SearchBar, seg, SettingRow, SignalLine, TYPE, useT, vcurve, BACK,
} from "../../../brand";
import { C } from "../cues";

type S = React.FC<{ start: number }>;

/** The generic "AI OPTIMIZE" control (reused across the hook + question scenes). */
const OptimizeButton: React.FC<{ t: number; hot: number; press?: number; scale?: number }> = ({ t, hot, press = 0, scale = 1 }) => {
  const dip = press > 0 && press < 1 ? 1 - 0.06 * Math.sin(press * Math.PI) : 1;
  return (
    <div style={{ position: "relative", transform: `scale(${scale * dip})` }}>
      {[0, 1].map((i) => {
        const r = press > 0 ? ((t * 0.9 + i * 0.5) % 1) : 0;
        return <div key={i} style={{ position: "absolute", inset: -10, borderRadius: 999, border: `3px solid ${COLORS.crimson}`, opacity: hot * (1 - r) * 0.5, transform: `scale(${1 + r * 0.35})` }} />;
      })}
      <div style={{
        display: "flex", alignItems: "center", gap: 18, padding: "30px 52px", borderRadius: 999, whiteSpace: "nowrap",
        background: hot > 0 ? `linear-gradient(135deg, rgba(128,1,31,${hot}), rgba(114,0,19,${hot}))` : "#fff",
        border: `2px solid ${hot > 0.5 ? COLORS.burgundy : INK.line}`, color: hot > 0.5 ? COLORS.ivory : INK.strong,
        boxShadow: `0 24px 60px rgba(114,0,19,${0.08 + hot * 0.22})`, fontSize: 40, fontWeight: 800, letterSpacing: "0.08em",
      }}>
        <Icon name="ai" size={52} color={hot > 0.5 ? COLORS.ivory : COLORS.burgundy} />AI OPTIMIZE
      </div>
    </div>
  );
};

// 01 — "Google-কে campaign settings দাও, AI optimize করবে।"
export const HookScene: S = ({ start }) => {
  const t = useT(start);
  const push = lerp(1, 1.05, p(t, 0, 3.2));
  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10 }}><Eyebrow t={t} at={0.1}>Google Ads · the promise</Eyebrow></div>
      <At x={650} y={560} t={t} at={C.hook} dy={60}>
        <Card w={900} pad="34px 40px" glass>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
            <Icon name="sliders" size={40} />
            <div style={{ ...TYPE.ui, fontSize: 30, letterSpacing: "0.1em" }}>CAMPAIGN SETTINGS</div>
          </div>
          <SettingRow t={t} at={C.campaignSettings} icon="money" label="BUDGET" kind="slider" set={0.62} />
          <SettingRow t={t} at={C.campaignSettings + 0.18} icon="target" label="BIDDING" kind="toggle" />
          <SettingRow t={t} at={C.campaignSettings + 0.36} icon="pin" label="LOCATION" kind="chips" chips={["Dhaka", "Bashundhara"]} />
          <SettingRow t={t} at={C.campaignSettings + 0.54} icon="key" label="KEYWORDS" kind="chips" chips={["apartment", "2 bed", "flat"]} />
        </Card>
      </At>
      <Lines><SignalLine d={seg(1105, 560, 1250, 560)} t={t} at={C.ai - 0.2} dur={0.35} pulse={C.ai} period={0.7} hot={1} /></Lines>
      <At x={1520} y={560} t={t} at={C.ai - 0.15} dx={40} dy={0}>
        <OptimizeButton t={t} hot={p(t, C.ai, 0.3)} press={p(t, C.optimize, 0.35)} />
      </At>
    </AbsoluteFill>
  );
};

// 02 — "শুনতে খুব সহজ, তাই না?" / "কিন্তু এখানেই একটা বড় প্রশ্ন আছে—"
export const QuestionScene: S = ({ start }) => {
  const t = useT(start);
  const shift = p(t, C.bigQ, 0.7);
  return (
    <AbsoluteFill>
      <At x={960} y={lerp(430, 300, shift)} t={t} at={start} dur={0.5} dy={0}>
        <OptimizeButton t={t} hot={1} press={0.5} scale={lerp(1, 0.78, shift)} />
      </At>
      <At x={960} y={690} t={t} at={C.easy} out={C.bigQ - 0.1} dy={30}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, ...TYPE.title }}>
          <Icon name="check" size={84} color={COLORS.crimson} stroke={2} /> Sounds simple.
        </div>
      </At>
      <At x={960} y={620} t={t} at={C.bigQ + 0.25} dy={0} scaleFrom={1.35} dur={0.8}>
        <div style={{ ...TYPE.hero, fontSize: 168, whiteSpace: "nowrap" }}>
          OPTIMIZE <span style={{ ...MARK, padding: "0.02em 0.14em 0" }}>WHAT?</span>
        </div>
      </At>
      <At x={960} y={800} t={t} at={C.bigQ + 0.9}>
        <div style={{ ...TYPE.label, fontSize: 26 }}>Here lies the big question</div>
      </At>
    </AbsoluteFill>
  );
};

// 03 — "Google AI আসলে কী optimize করবে, যদি … Business সম্পর্কে যথেষ্ট context-ই না দেন?"
const UNKNOWNS = ["BUSINESS", "CUSTOMER", "PROBLEM", "MESSAGE", "CONVERSION"] as const;
export const EngineScene: S = ({ start }) => {
  const t = useT(start);
  const ys = UNKNOWNS.map((_, i) => 395 + i * 92);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: 92, width: SAFE.w }}>
        <Headline t={t} at={C.whatOptimize} text="What does AI actually know about your business?" mark={["business"]} markAt={C.businessWord} style={{ fontSize: 66 }} />
      </div>
      <Lines>
        {ys.map((y, i) => (
          <SignalLine key={i} d={curve(560, y, 830, 580)} t={t} at={C.ifYou + 0.2 + i * 0.2} dashed />
        ))}
        <SignalLine d={seg(1090, 580, 1290, 580)} t={t} at={C.businessWord} dashed />
      </Lines>
      {UNKNOWNS.map((u, i) => (
        <At key={u} x={SAFE.x} y={ys[i]} anchor="left" t={t} at={C.ifYou + i * 0.2} dx={-40} dy={0}>
          <div style={{ width: 380, height: 72, borderRadius: 18, border: `2px dashed ${INK.lineStrong}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", boxSizing: "border-box", background: "rgba(255,255,255,0.5)" }}>
            <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.1em", color: INK.body }}>{u}</span>
            <span style={{ fontSize: 36, fontWeight: 800, color: COLORS.crimson }}>?</span>
          </div>
        </At>
      ))}
      <At x={960} y={580} t={t} at={C.whatOptimize + 0.3} dy={0}><AIEngine t={t} size={260} uncertain={p(t, C.optimizeWord, 0.6)} /></At>
      <At x={1520} y={580} t={t} at={C.businessWord} dx={30} dy={0}>
        <Card w={400} pad="26px 30px">
          <div style={{ ...TYPE.label, fontSize: 18, marginBottom: 16 }}>Optimization output</div>
          <div style={{ filter: `blur(${5 + 2 * Math.sin(t * 3)}px)`, display: "flex", alignItems: "flex-end", gap: 14, height: 130 }}>
            {[0.5, 0.8, 0.35, 0.65, 0.45].map((v, i) => (
              <div key={i} style={{ flex: 1, height: `${(v + 0.15 * Math.sin(t * 2.4 + i)) * 100}%`, borderRadius: 8, background: "rgba(114,0,19,0.35)" }} />
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 22, fontWeight: 800, color: COLORS.crimson, letterSpacing: "0.06em" }}>UNCLEAR</div>
        </Card>
      </At>
      <At x={960} y={952} t={t} at={C.contextWord} dy={20}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {["Better context", "Better signal", "Better decision"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 22, opacity: p(t, C.contextWord + i * 0.3, 0.35) }}>
              {i > 0 ? <span style={{ fontSize: 34, fontWeight: 800, color: COLORS.crimson }}>→</span> : null}
              <Pill hot={i === 2 ? 1 : 0}>{s}</Pill>
            </div>
          ))}
        </div>
      </At>
    </AbsoluteFill>
  );
};

// 04 — "Google Ads ধীরে ধীরে এমন একটা জায়গায় যাচ্ছে … keyword, bid, audience বা campaign settings manage করাই যথেষ্ট না।"
const OLD = [
  { title: "Campaign", icon: "sliders", cue: C.settings },
  { title: "Keywords", icon: "key", cue: C.keyword },
  { title: "Bid", icon: "money", cue: C.bid },
  { title: "Audience", icon: "users", cue: C.audience },
  { title: "Lead", icon: "form", cue: -1 },
] as const;
const NEW = [
  { title: "Business context", icon: "building" },
  { title: "Customer value", icon: "star" },
  { title: "Conversion signals", icon: "target" },
  { title: "Creative + intent", icon: "image" },
  { title: "Google AI", icon: "ai" },
  { title: "Better optimization", icon: "gear" },
  { title: "Business outcome", icon: "growth" },
] as const;
export const EvolutionScene: S = ({ start }) => {
  const t = useT(start);
  const oldX = OLD.map((_, i) => 300 + i * 330);
  const newX = NEW.map((_, i) => 272 + i * 229);
  const dimOld = p(t, C.notEnough, 0.5);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10 }}><Eyebrow t={t} at={C.changing}>Google Ads is shifting</Eyebrow></div>
      <At x={SAFE.x} y={262} anchor="left" t={t} at={C.changing + 0.2} dx={-20} dy={0}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ ...TYPE.label, color: INK.strong, fontSize: 24 }}>Before</span>
          <span style={{ opacity: p(t, C.notEnough, 0.4) }}><Pill size={17} outline>Still useful · not enough on its own</Pill></span>
        </div>
      </At>
      <Lines>
        {oldX.slice(0, -1).map((x, i) => <SignalLine key={i} d={seg(x + 130, 380, oldX[i + 1] - 130, 380)} t={t} at={C.changing + 0.55 + i * 0.3} dur={0.3} arrow />)}
        <SignalLine d={vcurve(960, 470, 960, 640)} t={t} at={C.where} dur={0.5} arrow hot={1} pulse={C.where + 0.4} period={1.1} dots={1} />
        {newX.slice(0, -1).map((x, i) => <SignalLine key={`n${i}`} d={seg(x + 100, 790, newX[i + 1] - 100, 790)} t={t} at={C.settings + 0.85 + i * 0.1} dur={0.2} pulse={C.notEnough + 0.2} period={1.4} dots={1} hot={1} width={2} />)}
      </Lines>
      {OLD.map((o, i) => {
        const hot = o.cue < 0 ? 0 : on(t, o.cue, o.cue + 0.75, 0.2);
        return (
          <At key={o.title} x={oldX[i]} y={380} t={t} at={C.changing + 0.4 + i * 0.3}>
            <Node title={o.title} icon={o.icon} w={260} h={150} hot={hot} dim={dimOld * 0.5} size={24}
              style={{ transform: `scale(${1 + hot * 0.06})` }} />
          </At>
        );
      })}
      <At x={SAFE.x} y={672} anchor="left" t={t} at={C.where + 0.3} dx={-20} dy={0}>
        <span style={{ ...TYPE.label, color: COLORS.crimson, fontSize: 24 }}>Now</span>
      </At>
      {NEW.map((n, i) => {
        const fill = p(t, C.settings + 0.7 + i * 0.1, 0.4);
        return (
          <At key={n.title} x={newX[i]} y={790} t={t} at={C.where + 0.4 + i * 0.05} dy={10}>
            <div style={{ position: "relative" }}>
              <Node title={n.title} w={200} h={150} dashed size={18} style={{ opacity: 1 - fill }} />
              <div style={{ position: "absolute", inset: 0, opacity: fill, transform: `scale(${lerp(0.9, 1, p(t, C.settings + 0.7 + i * 0.1, 0.45, BACK))})` }}>
                <Node title={n.title} icon={n.icon} w={200} h={150} size={18} hot={i === 4 || i === 6 ? 1 : 0} />
              </div>
            </div>
          </At>
        );
      })}
    </AbsoluteFill>
  );
};

// 05 — "AI Max-এর মতো AI-powered Search features … search intent, creative, landing page … automation"
const QUERY = "2 bedroom apartment near Bashundhara";
const INTENTS = ["2 bedroom", "apartment", "Bashundhara", "ready to move?"];
export const AIMaxScene: S = ({ start }) => {
  const t = useT(start);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10 }}><Eyebrow t={t} at={C.aiMax}>AI Max · AI-powered search</Eyebrow></div>
      <At x={960} y={262} t={t} at={C.aiMax + 0.25}><SearchBar t={t} at={C.aiPowered - 0.1} query={QUERY} typeDur={1.4} w={1060} /></At>
      <At x={SAFE.x} y={398} anchor="left" t={t} at={C.searchIntent} dx={-20} dy={0}>
        <span style={{ ...TYPE.label, color: COLORS.crimson }}>Search intent</span>
      </At>
      <div style={{ position: "absolute", left: 0, right: 0, top: 368, display: "flex", justifyContent: "center", gap: 16 }}>
        {INTENTS.map((c, i) => {
          const k = p(t, C.searchIntent + 0.1 + i * 0.16, 0.45, BACK);
          return <div key={c} style={{ opacity: Math.min(1, k * 1.5), transform: `translateY(${(1 - k) * -40}px) scale(${lerp(0.7, 1, k)})` }}><Pill hot={i === 3 ? 1 : 0} size={21}>{c}</Pill></div>;
        })}
      </div>
      <Lines>
        <SignalLine d={vcurve(960, 440, 600, 600)} t={t} at={C.creative - 0.2} dur={0.5} pulse={C.creative + 0.3} period={1.5} dots={1} />
        <SignalLine d={seg(640, 720, 740, 720)} t={t} at={C.landingPage - 0.2} dur={0.3} arrow pulse={C.landingPage + 0.2} period={1.2} dots={1} hot={1} />
        <SignalLine d={seg(1180, 720, 1280, 720)} t={t} at={C.automation - 0.6} dur={0.3} arrow pulse={C.automation} period={1.2} dots={1} hot={1} />
      </Lines>
      {[
        { x: 420, at: C.creative, label: "Creative" },
        { x: 960, at: C.landingPage, label: "Landing page" },
        { x: 1500, at: C.automation - 0.45, label: "Relevant experience" },
      ].map((c) => (
        <At key={c.label} x={c.x} y={520} t={t} at={c.at}><span style={{ ...TYPE.label, fontSize: 19 }}>{c.label}</span></At>
      ))}
      <At x={420} y={700} t={t} at={C.creative + 0.1} dy={40}><AdPreview headline="2 Bed Apartments near Bashundhara" w={420} /></At>
      <At x={960} y={760} t={t} at={C.landingPage + 0.1} dy={40}><PageWire title="Ready 2-bed homes" w={400} /></At>
      <At x={1500} y={720} t={t} at={C.automation - 0.35} dy={40}>
        <Node title="Matched to intent" icon="check" caption="search → ad → page" w={420} h={250} hot={p(t, C.automation, 0.4)} size={26} />
      </At>
      <At x={1500} y={900} t={t} at={C.automation + 0.1}><Pill size={18} outline>Automation</Pill></At>
    </AbsoluteFill>
  );
};

// 06 — "মানে আপনি Google-কে শুধু বলতে পারেন না— ‘এই campaignটা চালাও।’ আপনাকে আরও পরিষ্কারভাবে বুঝতে হবে—"
export const RunCampaignScene: S = ({ start }) => {
  const t = useT(start);
  const press = p(t, C.runIt, 0.3);
  const cursorK = p(t, C.runIt - 0.7, 0.6);
  const dim = p(t, C.needContext + 0.5, 0.5);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10 }}><Eyebrow t={t} at={C.cantSay}>You can’t just say…</Eyebrow></div>
      <At x={620} y={540} t={t} at={C.cantSay + 0.5}>
        <div style={{ opacity: lerp(1, 0.45, dim), transform: `scale(${1 - 0.05 * Math.sin(press * Math.PI)})`,
          display: "flex", alignItems: "center", gap: 22, padding: "38px 64px", borderRadius: 999,
          background: COLORS.burgundy, color: COLORS.ivory, fontSize: 50, fontWeight: 800, letterSpacing: "0.08em", boxShadow: "0 30px 70px rgba(114,0,19,0.28)" }}>
          <Icon name="play" size={64} color={COLORS.ivory} /> RUN CAMPAIGN
        </div>
      </At>
      <div style={{ position: "absolute", left: lerp(980, 760, cursorK), top: lerp(820, 575, cursorK), opacity: cursorK * (1 - dim),
        transform: `scale(${1 - 0.15 * Math.sin(press * Math.PI)})` }}>
        <svg width={56} height={56} viewBox="0 0 24 24"><path d="M6 3.5l12 7-5.2 1.5L10 17.5z" fill={COLORS.maroon} stroke="#fff" strokeWidth={1.2} strokeLinejoin="round" /></svg>
      </div>
      <At x={620} y={710} t={t} at={C.runIt + 0.1}><div style={{ ...TYPE.sub, fontStyle: "italic", fontSize: 34 }}>“Just run this campaign.”</div></At>
      <Lines><SignalLine d={seg(1000, 540, 1220, 540)} t={t} at={C.runIt + 0.1} dur={0.4} dashed pulse={C.runIt + 0.3} period={0.9} dots={1} /></Lines>
      <At x={1400} y={560} t={t} at={C.cantSay + 0.8} dy={0}><AIEngine t={t} size={280} uncertain={p(t, C.runIt + 0.6, 0.5)} /></At>
      <At x={1400} y={300} t={t} at={C.needContext} dur={0.6} dy={30} scaleFrom={0.7}>
        <div style={{ position: "relative" }}>
          <Card pad="24px 36px" style={{ borderRadius: 24 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: INK.strong, whiteSpace: "nowrap" }}>I need more <span style={{ color: COLORS.crimson }}>context.</span></div>
          </Card>
          <div style={{ position: "absolute", left: "50%", bottom: -14, width: 28, height: 28, background: "#fff", transform: "translateX(-50%) rotate(45deg)", borderRight: `2px solid ${INK.line}`, borderBottom: `2px solid ${INK.line}` }} />
        </div>
      </At>
      <At x={1400} y={840} t={t} at={C.needContext + 0.6}>
        <div style={{ ...TYPE.label }}>Understand your business — clearly</div>
      </At>
    </AbsoluteFill>
  );
};
