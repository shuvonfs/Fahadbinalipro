/** Act 3 — the big shift, the marketer's new role, the real question, and the close (84 – 128.4s). */
import { AbsoluteFill, Img, staticFile } from "remotion";
import {
  AIEngine, At, BACK, Card, COLORS, curve, drawn, Eyebrow, Headline, Icon, IconName, INK, lerp, Lines, MARK, Node,
  p, Pill, SAFE, seg, SignalLine, TYPE, useT,
} from "../../../brand";
import { C } from "../cues";

type S = React.FC<{ start: number }>;

// 17 — "future Google Ads-এর সবচেয়ে interesting বিষয় হলো— campaign settings → business context → better signals → AI optimization"
const SHIFT = [
  { title: "Campaign settings", icon: "sliders", cue: C.shiftSettings },
  { title: "Business context", icon: "building", cue: C.shiftContext },
  { title: "Better signals", icon: "target", cue: C.shiftSignals },
  { title: "AI optimization", icon: "ai", cue: C.shiftAI },
] as const;
export const BigShiftScene: S = ({ start }) => {
  const t = useT(start);
  const up = p(t, C.shiftSettings - 0.6, 0.8);
  const xs = [330, 750, 1170, 1590];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10 }}><Eyebrow t={t} at={C.interesting}>The future of Google Ads</Eyebrow></div>
      <At x={960} y={lerp(540, 280, up)} t={t} at={C.interesting + 0.3} dy={40}>
        <div style={{ ...TYPE.hero, fontSize: lerp(150, 92, up), whiteSpace: "nowrap" }}>The big <span style={MARK}>shift</span></div>
      </At>
      <Lines>
        {xs.slice(0, -1).map((x, i) => (
          <SignalLine key={i} d={seg(x + 170, 640, xs[i + 1] - 170, 640)} t={t} at={SHIFT[i + 1].cue - 0.25} dur={0.25} arrow hot={1} pulse={SHIFT[i + 1].cue} period={1.2} dots={1} />
        ))}
      </Lines>
      {SHIFT.map((s, i) => {
        const hot = i === 3 ? p(t, s.cue, 0.3) : p(t, s.cue, 0.25) * (1 - p(t, SHIFT[i + 1].cue, 0.3));
        return (
          <At key={s.title} x={xs[i]} y={640} t={t} at={s.cue - 0.1}>
            <div style={{ transform: `scale(${i === 3 ? lerp(1, 1.08, p(t, s.cue, 0.5, BACK)) : 1})` }}>
              <Node title={s.title} icon={s.icon} w={320} h={220} size={28} hot={hot} dim={i === 0 ? 0.45 * p(t, C.shiftContext, 0.5) : 0} />
            </div>
          </At>
        );
      })}
      <At x={330} y={790} t={t} at={C.shiftSettings + 0.3}><span style={{ ...TYPE.label, fontSize: 18 }}>From</span></At>
      <At x={1380} y={790} t={t} at={C.shiftSignals}><span style={{ ...TYPE.label, fontSize: 18, color: COLORS.crimson }}>To</span></At>
    </AbsoluteFill>
  );
};

/** Vertical meter (relative, no numbers). */
const Meter: React.FC<{ value: number; hot?: number; label: string; arrow?: string; dashed?: boolean }> = ({ value, hot = 0, label, arrow, dashed }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
    <div style={{ height: 70, fontSize: 64, fontWeight: 800, color: COLORS.crimson }}>{arrow}</div>
    <div style={{ width: 150, height: 420, borderRadius: 28, background: "rgba(114,0,19,0.07)", border: `2px ${dashed ? "dashed" : "solid"} ${INK.line}`, display: "flex", alignItems: "flex-end", padding: 10, boxSizing: "border-box" }}>
      <div style={{ width: "100%", height: `${value * 100}%`, borderRadius: 20,
        background: hot > 0.5 ? `linear-gradient(180deg, ${COLORS.crimson}, ${COLORS.burgundy})` : "rgba(114,0,19,0.3)" }} />
    </div>
    <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "0.12em", color: INK.strong, whiteSpace: "nowrap" }}>{label}</div>
  </div>
);

// 18 — "AI যত বেশি কাজ করবে, marketer-এর কাজ তত কমবে— এটা পুরোপুরি সত্যি না। বরং marketer-এর কাজ বদলাবে।"
export const ScalesScene: S = ({ start }) => {
  const t = useT(start);
  const fall = p(t, C.less, 0.8);
  const flip = p(t, C.roleChange, 0.9);
  const strike = p(t, C.notTrue, 0.4);
  const right = flip > 0 ? lerp(0.22, 0.9, flip) : lerp(0.62, 0.22, fall);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10 }}><Eyebrow t={t} at={C.aiMore}>A common assumption</Eyebrow></div>
      <At x={620} y={560} t={t} at={C.aiMore}>
        <Meter value={0.88 * p(t, C.aiMore + 0.3, 1.2)} hot={1} label="AUTOMATION" arrow="↑" />
      </At>
      <At x={620} y={225} t={t} at={C.aiMore + 0.2}><Pill size={18}><Icon name="ai" size={26} />AI does more work</Pill></At>
      <At x={1300} y={560} t={t} at={C.marketer}>
        <div style={{ position: "relative" }}>
          <Meter value={right} hot={flip} label={flip > 0.5 ? "STRATEGIC VALUE" : "MARKETER’S WORK"} arrow={flip > 0.3 ? "↑" : fall > 0.3 ? "↓" : ""} dashed={flip < 0.5} />
        </div>
      </At>
      <At x={1300} y={500} t={t} at={C.notTrue} out={C.roleChange - 0.1} scaleFrom={1.4} dur={0.4}>
        <div style={{ transform: "rotate(-8deg)", padding: "14px 30px", border: `5px solid ${COLORS.crimson}`, borderRadius: 16, color: COLORS.crimson,
          fontSize: 44, fontWeight: 800, letterSpacing: "0.08em", background: "rgba(251,252,235,0.92)", opacity: strike, whiteSpace: "nowrap" }}>NOT QUITE TRUE</div>
      </At>
      <At x={960} y={940} t={t} at={C.roleChange + 0.2}>
        <div style={{ ...TYPE.title, fontSize: 60 }}>The marketer’s work <span style={{ color: COLORS.crimson }}>changes.</span></div>
      </At>
    </AbsoluteFill>
  );
};

// 19 — "Campaign operator → strategist → data interpreter → AI supervisor"
const ROLES: { title: string; icon: IconName; cue: number; note: string }[] = [
  { title: "Campaign operator", icon: "sliders", cue: C.operator, note: "runs the settings" },
  { title: "Strategist", icon: "strategy", cue: C.strategist, note: "sets direction" },
  { title: "Data interpreter", icon: "chart", cue: C.dataInterpreter, note: "reads the signals" },
  { title: "AI supervisor", icon: "shield", cue: C.aiSupervisor, note: "guides the machine" },
];
export const RolesScene: S = ({ start }) => {
  const t = useT(start);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: 110, width: SAFE.w }}>
        <Headline t={t} at={C.operator - 0.15} text="The marketer’s role evolves" style={{ fontSize: 66 }} />
      </div>
      <Lines>
        <SignalLine d={seg(560, 330, 560, 870)} t={t} at={C.operator} dur={(C.aiSupervisor - C.operator) + 0.4} hot={1} width={4} />
      </Lines>
      {ROLES.map((r, i) => {
        const next = ROLES[i + 1];
        const hot = p(t, r.cue, 0.3) * (next ? 1 - p(t, next.cue, 0.3) : 1);
        const y = 330 + i * 180;
        return (
          <div key={r.title}>
            <At x={560} y={y} t={t} at={r.cue} dy={0} scaleFrom={0.4}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: hot > 0.5 || i === 3 ? COLORS.crimson : COLORS.ivory, border: `4px solid ${COLORS.crimson}` }} />
            </At>
            <At x={640} y={y} anchor="left" t={t} at={r.cue} dx={60} dy={0}>
              <Card w={780} h={140} hot={hot} pad="0 34px" style={{ display: "flex", opacity: lerp(1, 0.6, (1 - hot) * (next ? p(t, next.cue, 0.4) : 0)) }}>
                <div style={{ height: "100%", display: "flex", alignItems: "center", gap: 26 }}>
                  <Icon name={r.icon} size={58} color={hot > 0.5 ? COLORS.ivory : COLORS.burgundy} />
                  <div>
                    <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "0.02em", textTransform: "uppercase" }}>{r.title}</div>
                    <div style={{ fontSize: 22, fontWeight: 600, opacity: 0.7, marginTop: 2 }}>{r.note}</div>
                  </div>
                </div>
              </Card>
            </At>
          </div>
        );
      })}
      <At x={SAFE.x + 60} y={330} t={t} at={C.operator + 0.2}><span style={{ ...TYPE.label, fontSize: 18 }}>Then</span></At>
      <At x={SAFE.x + 60} y={870} t={t} at={C.aiSupervisor + 0.2}><span style={{ ...TYPE.label, fontSize: 18, color: COLORS.crimson }}>Now</span></At>
    </AbsoluteFill>
  );
};

// 20 — "প্রশ্নটা এখন শুধু— ‘Google Ads কীভাবে setup করব?’ প্রশ্নটা হওয়া উচিত— ‘Google AI-কে আমি আমার Business সম্পর্কে কতটা ভালো signal দিতে পারছি?’"
export const SignalQuestionScene: S = ({ start }) => {
  const t = useT(start);
  const aside = p(t, C.shouldBe, 0.8);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10 }}><Eyebrow t={t} at={C.soQuestion}>The question is no longer just</Eyebrow></div>
      <At x={lerp(960, 560, aside)} y={lerp(520, 290, aside)} t={t} at={C.setupQ} dy={40}>
        <div style={{ transform: `scale(${lerp(1, 0.62, aside)})`, opacity: lerp(1, 0.45, aside) }}>
          <Card pad="36px 54px">
            <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 64, fontWeight: 800, color: INK.strong, whiteSpace: "nowrap" }}>
              <Icon name="gear" size={70} />“How do I set up Google Ads?”
            </div>
          </Card>
        </div>
      </At>
      <At x={SAFE.x} y={470} anchor="left" t={t} at={C.shouldBe + 0.2} dx={-20} dy={0}>
        <span style={{ ...TYPE.label, color: COLORS.crimson, fontSize: 24 }}>It should be</span>
      </At>
      <div style={{ position: "absolute", left: SAFE.x, top: 540, width: SAFE.w }}>
        <Headline t={t} at={C.signalQ} text="“How well can I signal my business to Google AI?”" mark={["signal"]} markAt={C.signalWord} align="left" style={{ fontSize: 92, lineHeight: 1.12 }} />
      </div>
      <Lines>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={1660} cy={360} r={40 + (((t - C.signalWord) * 0.8 + i / 3) % 1) * 120} fill="none" stroke={COLORS.crimson} strokeWidth={3}
            opacity={t > C.signalWord ? (1 - (((t - C.signalWord) * 0.8 + i / 3) % 1)) * 0.6 * p(t, C.signalWord, 0.3) : 0} />
        ))}
      </Lines>
      <At x={1660} y={360} t={t} at={C.signalWord - 0.1} dy={0}><AIEngine t={t} size={150} active={1} /></At>
    </AbsoluteFill>
  );
};

// 21 — "কারণ— AI যত intelligent হবে, আপনার Business Data আর Context-এর value তত বাড়বে।"
export const DataValueScene: S = ({ start }) => {
  const t = useT(start);
  const grow = p(t, C.grows, 0.5, BACK);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10 }}><Eyebrow t={t} at={C.because}>Because</Eyebrow></div>
      <div style={{ position: "absolute", left: SAFE.x, top: 180, width: SAFE.w }}>
        <Headline t={t} at={C.because + 0.2} text="Smarter AI makes your data worth more" mark={["data"]} markAt={C.bizData} style={{ fontSize: 60 }} />
      </div>
      <Lines>
        <SignalLine d={curve(470, 610, 600, 480)} t={t} at={C.bizData - 0.2} dur={0.4} arrow />
        <SignalLine d={curve(470, 610, 600, 740)} t={t} at={C.bizContext - 0.2} dur={0.4} arrow />
        <SignalLine d={curve(900, 480, 1020, 610)} t={t} at={C.valueGrows - 0.15} dur={0.35} hot={1} pulse={C.valueGrows} period={1} dots={1} />
        <SignalLine d={curve(900, 740, 1020, 610)} t={t} at={C.valueGrows - 0.15} dur={0.35} hot={1} pulse={C.valueGrows + 0.5} period={1} dots={1} />
        <SignalLine d={seg(1280, 610, 1410, 610)} t={t} at={C.grows - 0.25} dur={0.25} arrow hot={1} pulse={C.grows} period={0.9} dots={2} />
      </Lines>
      <At x={320} y={610} t={t} at={C.intelligent}>
        <Node title="AI gets more intelligent" icon="ai" w={300} h={200} size={24} />
      </At>
      <At x={750} y={480} t={t} at={C.bizData}><Node title="Your business data" icon="db" w={300} h={170} size={23} /></At>
      <At x={750} y={740} t={t} at={C.bizContext}><Node title="Your context" icon="building" w={300} h={170} size={23} /></At>
      <At x={1150} y={610} t={t} at={C.valueGrows}><Node title="Value ↑" icon="star" w={260} h={200} size={28} hot={1} /></At>
      <At x={1585} y={610} t={t} at={C.grows - 0.1} dur={0.6}>
        <div style={{ transform: `scale(${lerp(1, 1.08, grow)})` }}>
          <Node title="Business growth" icon="growth" w={330} h={250} size={32} hot={1} style={{ boxShadow: "0 30px 80px rgba(114,0,19,0.4)" }} />
        </div>
      </At>
    </AbsoluteFill>
  );
};

// 22–23 — "আমি Fahad। আর আমি শুধু Ads চালানো নিয়ে কথা বলতে চাই না— … Marketing কীভাবে … Business Growth তৈরি করে।"
const ECO: { title: string; icon: IconName }[] = [
  { title: "Strategy", icon: "strategy" }, { title: "Funnel", icon: "funnel" }, { title: "CRM", icon: "crm" },
  { title: "Data", icon: "db" }, { title: "Content", icon: "image" }, { title: "Sales", icon: "revenue" },
];
export const ClosingScene: S = ({ start }) => {
  const t = useT(start);
  const side = p(t, C.notJustAds, 0.9);
  const eco = p(t, C.wantToTalk, 0.6);
  const growth = p(t, C.businessGrowth, 0.5);
  const cx = 1340;
  const cy = 500;
  const sig = "M 0 30 C 40 -10 60 50 100 18 S 160 -6 190 26 S 260 40 300 8";
  const sigDraw = drawn(sig, t, C.businessGrowth + 0.4, 0.8);
  const push = lerp(1, 1.03, p(t, C.businessGrowth, 1.4));
  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      {/* identity */}
      <At x={lerp(960, 430, side)} y={lerp(390, 390, side)} t={t} at={C.fahad - 0.1} dy={0} scaleFrom={0.8}>
        <div style={{ width: lerp(260, 230, side), height: lerp(260, 230, side), borderRadius: "50%", overflow: "hidden", border: `6px solid ${COLORS.ivory}`, boxShadow: `0 0 0 3px ${COLORS.burgundy}, 0 30px 70px rgba(45,0,1,0.18)` }}>
          <Img src={staticFile("fahad-intro/fahad.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </At>
      <At x={lerp(960, 430, side)} y={lerp(640, 600, side)} t={t} at={C.fahad} dy={30}>
        <div style={{ ...TYPE.hero, fontSize: lerp(150, 110, side), letterSpacing: "0.02em" }}>FAHAD</div>
      </At>
      <At x={lerp(960, 430, side)} y={lerp(745, 690, side)} t={t} at={C.fahad + 0.3}>
        <div style={{ ...TYPE.label, fontSize: lerp(26, 20, side), color: INK.body, whiteSpace: "nowrap" }}>Digital Marketing • Strategy • Growth</div>
      </At>
      <svg viewBox="-10 -20 320 80" width={320} height={80} style={{ position: "absolute", left: 270, top: 730, overflow: "visible", opacity: side }}>
        <path d={sig} fill="none" stroke={COLORS.crimson} strokeWidth={4} strokeLinecap="round" strokeDasharray={sigDraw.strokeDasharray} strokeDashoffset={sigDraw.strokeDashoffset} />
      </svg>
      {/* ecosystem */}
      <Lines>
        {ECO.map((e, i) => {
          const a = (-90 + i * 60) * (Math.PI / 180);
          const x = cx + Math.cos(a) * 290;
          const y = cy + Math.sin(a) * 290;
          return <SignalLine key={e.title} d={seg(cx + Math.cos(a) * 120, cy + Math.sin(a) * 120, x - Math.cos(a) * 70, y - Math.sin(a) * 70)} t={t} at={C.wantToTalk + 0.15 + i * 0.12} dur={0.35} hot={growth} pulse={C.marketing + i * 0.1} period={1.3} dots={1} />;
        })}
      </Lines>
      <At x={cx} y={cy - 250} t={t} at={C.notJustAds + 0.3} out={C.wantToTalk} dy={10}>
        <Pill size={20} outline>Not just running ads</Pill>
      </At>
      <At x={cx} y={cy} t={t} at={C.notJustAds + 0.2}>
        <div style={{ position: "relative", width: 240, height: 240 }}>
          <div style={{ position: "absolute", inset: 0, opacity: 1 - growth }}>
            <Node title="Ads" icon="ads" w={240} h={240} size={30} />
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: growth, transform: `scale(${lerp(0.9, 1.06, p(t, C.businessGrowth, 0.6, BACK))})` }}>
            <Node title="Business growth" icon="growth" w={240} h={240} size={26} hot={1} style={{ borderRadius: "50%", boxShadow: "0 30px 80px rgba(114,0,19,0.4)" }} />
          </div>
        </div>
      </At>
      {ECO.map((e, i) => {
        const a = (-90 + i * 60) * (Math.PI / 180);
        return (
          <At key={e.title} x={cx + Math.cos(a) * 290} y={cy + Math.sin(a) * 290} t={t} at={C.wantToTalk + 0.1 + i * 0.12} dy={0} scaleFrom={0.5}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: eco }}>
              <div style={{ width: 120, height: 120, borderRadius: "50%", background: "#fff", border: `2px solid ${INK.line}`, display: "grid", placeItems: "center", boxShadow: "0 16px 40px rgba(45,0,1,0.08)" }}>
                <Icon name={e.icon} size={52} />
              </div>
              <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "0.14em", color: INK.strong }}>{e.title.toUpperCase()}</div>
            </div>
          </At>
        );
      })}
      <At x={960} y={960} t={t} at={C.marketing}>
        <div style={{ ...TYPE.title, fontSize: 64, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 28 }}>
          MARKETING <span style={{ color: COLORS.crimson }}>→</span>
          <span style={{ ...MARK, background: `rgba(128,1,31,${growth})`, color: growth > 0.5 ? COLORS.ivory : INK.strong, padding: "0.06em 0.2em 0" }}>BUSINESS GROWTH</span>
        </div>
      </At>
    </AbsoluteFill>
  );
};
