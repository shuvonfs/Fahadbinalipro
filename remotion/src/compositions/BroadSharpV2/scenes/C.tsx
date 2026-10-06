/** V2 scenes 19–26 (131 – 191.7s): Meta signals, what I mean, balance, the shift, close. */
import { Img, random, staticFile } from "remotion";
import { AppTile, DISPLAY, K, KLine, Logo, Obj, PinNote, Pop, SelectBox, shake, Stage } from "../../../brand/kinetic/Kinetic";
import { drawn, IN_OUT, lerp, OUT, p, useT } from "../../../brand";
import { C } from "../../BroadSharp/cues";

type S = React.FC<{ start: number }>;

// 19 — "Meta তার ad ranking systems-এ user behaviour এবং engagement-এর মতো signals … জানিয়েছে। কিন্তু … strategy আর প্রয়োজন নেই। বরং AI-এর জন্য relevant signals …"
const SIG = [{ n: "eyes", l: "User behaviour", at: C.behaviourS }, { n: "red_heart", l: "Engagement", at: C.engagement }, { n: "speech_balloon", l: "Interactions", at: C.engagement + 0.5 }];
export const S19: S = ({ start }) => {
  const t = useT(start);
  const phase2 = p(t, C.butNot - 0.1, 0.5, IN_OUT);
  return (
    <Stage t={t} dark>
      <div style={{ opacity: 1 - phase2, filter: `blur(${phase2 * 10}px)` }}>
        <Pop t={t} at={131.15} x={960} y={300} from="top">
          <div style={{ width: 1180, padding: "30px 40px", borderRadius: 22, background: "linear-gradient(160deg,#211a1c,#141011)", border: "1px solid rgba(255,255,255,0.12)", fontFamily: DISPLAY, color: "#fff", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}><Logo name="meta" size={40} color="#fff" /><span style={{ fontWeight: 800, fontSize: 22, letterSpacing: "0.16em", color: "rgba(255,255,255,0.7)" }}>META SAYS</span></div>
            <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.3 }}>Its ad ranking systems use signals like <span style={{ color: K.accent }}>user behaviour</span> and <span style={{ color: K.accent }}>engagement</span> more deeply.</div>
            <div style={{ marginTop: 14, fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>Paraphrased from Meta's public statements · simplified</div>
          </div>
        </Pop>
        {SIG.map((s, i) => {
          const k = p(t, s.at, 1.1, IN_OUT);
          return (
            <div key={s.n} style={{ position: "absolute", left: lerp(320 + i * 640, 960, k), top: lerp(690, 760, k), transform: `translate(-50%,-50%) scale(${lerp(1, 0.35, k)})`, opacity: p(t, s.at - 0.3, 0.3) * (1 - p(t, s.at + 1.0, 0.2)), textAlign: "center" }}>
              <Img src={staticFile(`broad-sharp-v2/3d/${s.n}.png`)} style={{ width: 150, height: 150, filter: i === 1 ? undefined : "grayscale(1) brightness(1.2)" }} />
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 24, color: "#fff" }}>{s.l}</div>
            </div>
          );
        })}
        <Pop t={t} at={C.ranking} x={960} y={760} from="bottom">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 380 - i * 40, height: 46, borderRadius: 10, background: i === 0 ? K.accent : "#2b2426", display: "flex", alignItems: "center", gap: 10, padding: "0 14px", fontFamily: DISPLAY, fontWeight: 800, color: "#fff", fontSize: 16,
                opacity: 1 - i * 0.25, transform: `translateY(${i === 0 ? -6 * p(t, C.signals, 0.4) : 0}px)` }}>#{i + 1} <span style={{ opacity: 0.7 }}>{["Most relevant ad", "Relevant ad", "Less relevant ad"][i]}</span></div>
            ))}
            <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 16, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", marginTop: 6 }}>RANKING · ILLUSTRATIVE</span>
          </div>
        </Pop>
      </div>
      <div style={{ opacity: phase2 }}>
        <div style={{ position: "absolute", left: 200, top: 280 }}>
          <KLine t={t} dark size={60} align="flex-start" words={[{ w: "So strategy is", at: C.butNot + 0.1, s: 0.8, wt: 600, c: "rgba(255,255,255,0.7)" }, { w: "not needed?", at: C.marketer, s: 0.8, wt: 800, strike: C.stratNeeded + 0.6 }]} />
          <KLine t={t} dark size={60} align="flex-start" style={{ marginTop: 30 }} words={[{ w: "RELEVANT", at: C.relevant, s: 1.6, wt: 900, c: K.accent, glow: true }]} />
          <KLine t={t} dark size={60} align="flex-start" words={[{ w: "SIGNALS", at: C.relevant + 0.3, s: 1.6, wt: 900 }]} />
          <KLine t={t} dark size={60} align="flex-start" style={{ marginTop: 20 }} words={[{ w: "→ your", at: C.responsibility, s: 0.8, wt: 600 }, { w: "responsibility.", at: C.responsibility + 0.2, s: 0.8, wt: 900, c: K.accent }]} />
        </div>
        <Obj name="key" t={t} at={C.relevant + 0.1} x={1450} y={540} size={380} from="spin" mono rot={-20} />
      </div>
    </Stage>
  );
};

// 20 — "তাই আমি যখন বলি ‘Broad Targeting’, আমি কখনো বলি না— ‘যাকে খুশি তাকে ad দেখান।’"
export const S20: S = ({ start }) => {
  const t = useT(start);
  const [sx, sy] = shake(t, C.showAds, 18);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sx}px, ${sy}px)` }}>
        <div style={{ position: "absolute", left: 200, top: 270 }}>
          <KLine t={t} size={56} align="flex-start" words={[{ w: "When I say", at: 147.4, s: 0.8, wt: 600 }]} />
          <KLine t={t} size={56} align="flex-start" style={{ marginTop: 10 }} words={[{ w: "“BROAD TARGETING”", at: C.broadTargetingQ, s: 1.25, wt: 900 }]} />
          <KLine t={t} size={56} align="flex-start" style={{ marginTop: 34 }} words={[{ w: "I never mean", at: C.never, s: 0.8, wt: 600 }]} />
          <KLine t={t} size={56} align="flex-start" style={{ marginTop: 10 }} words={[{ w: "show ads to", at: C.anyone, s: 1.1, wt: 800 }, { w: "ANYONE.", at: C.anyone + 0.3, s: 1.3, wt: 900, c: K.accent, strike: C.showAds }]} />
        </div>
        {Array.from({ length: 14 }, (_, i) => {
          const k = p(t, C.anyone + i * 0.05, 1.4, OUT);
          const a = (i / 14) * Math.PI * 2 + random(`sp${i}`);
          return <div key={i} style={{ position: "absolute", left: 1450 + Math.cos(a) * 380 * k, top: 540 + Math.sin(a) * 300 * k, width: 70, height: 50, borderRadius: 8, background: "#fff", border: "2px solid rgba(0,0,0,0.25)",
            transform: `translate(-50%,-50%) rotate(${(random(`sr${i}`) - 0.5) * 80 * k}deg)`, opacity: (t > C.anyone ? 1 : 0) * (1 - p(t, C.showAds + 0.3, 0.4)) }} />;
        })}
        <Obj name="clown_face" t={t} at={C.anyone - 0.1} x={1450} y={540} size={340} from="scale" mono={false} />
        <Obj name="cross_mark" t={t} at={C.showAds} x={1450} y={540} size={460} from="scale" mono={false} float={0} />
      </div>
    </Stage>
  );
};

// 21 — "আমি বলি— ‘Delivery-তে flexibility দিন, কিন্তু Strategy-তে clarity রাখুন।’ কারণ— Audience broad হতে পারে। কিন্তু Thinking broad হওয়া উচিত না।"
export const S21: S = ({ start }) => {
  const t = useT(start);
  const tilt = lerp(-12, 0, p(t, C.clarity, 0.9, IN_OUT)) + Math.sin(t * 2) * 1.2 * (1 - p(t, C.clarity, 0.6));
  const beamY = 520;
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150 }}>
        <KLine t={t} size={54} words={[{ w: "I say:", at: 152.45, s: 0.8, wt: 600 }]} />
      </div>
      {/* see-saw: black glossy fulcrum + beam + spheres (reference: balance visual) */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: p(t, 152.5, 0.5) }}>
        <defs>
          <radialGradient id="ball" cx="35%" cy="30%" r="70%"><stop offset="0" stopColor="#6b6466" /><stop offset="0.45" stopColor="#1a1517" /><stop offset="1" stopColor="#000" /></radialGradient>
          <radialGradient id="ball2" cx="35%" cy="30%" r="70%"><stop offset="0" stopColor="#fff" /><stop offset="0.5" stopColor="#bdb8b2" /><stop offset="1" stopColor="#6b6662" /></radialGradient>
          <linearGradient id="cone" x1="0" x2="1"><stop offset="0" stopColor="#3a3436" /><stop offset="0.5" stopColor="#0b0809" /><stop offset="1" stopColor="#2a2426" /></linearGradient>
        </defs>
        <ellipse cx={960} cy={780} rx={190} ry={18} fill="rgba(0,0,0,0.18)" />
        <path d={`M 960 ${beamY + 10} L 1080 770 L 840 770 Z`} fill="url(#cone)" />
        <g transform={`rotate(${tilt} 960 ${beamY})`}>
          <rect x={460} y={beamY - 8} width={1000} height={16} rx={8} fill="#141012" />
          <circle cx={560} cy={beamY - 70} r={62} fill="url(#ball)" />
          <circle cx={1360} cy={beamY - 70} r={62} fill="url(#ball)" opacity={p(t, C.strategyC, 0.4)} />
          <circle cx={700} cy={beamY - 26} r={18} fill="url(#ball2)" />
        </g>
      </svg>
      {[{ x: 560, h: "Delivery", s: "flexibility", at: C.deliveryF, at2: C.flexibility, hot: false }, { x: 1360, h: "Strategy", s: "clarity", at: C.strategyC, at2: C.clarity, hot: true }].map((g) => (
        <div key={g.h} style={{ position: "absolute", left: g.x, top: 280, transform: `translateX(-50%) translateY(${(g.x < 960 ? -1 : 1) * Math.sin((tilt * Math.PI) / 180) * 400}px)`, textAlign: "center" }}>
          <KLine t={t} size={58} words={[{ w: g.h, at: g.at, wt: 900 }]} />
          <div style={{ marginTop: 10, opacity: p(t, g.at2, 0.3), transform: `scale(${lerp(0.7, 1, p(t, g.at2, 0.4, OUT))})` }}>
            <span style={{ padding: "8px 18px", borderRadius: 999, background: g.hot ? K.accent : K.ink, color: "#fff", fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, letterSpacing: "0.08em" }}>{g.s}</span>
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center", gap: 70 }}>
        <KLine t={t} size={46} words={[{ w: "Audience: broad", at: C.audienceOk, wt: 800 }, { w: "✓", at: C.broadOk, wt: 900, c: "#2e7d32" }]} />
        <KLine t={t} size={46} words={[{ w: "Thinking: broad", at: C.thinking, wt: 800 }, { w: "✕", at: C.thinkingBroad, wt: 900, c: K.accent }]} />
      </div>
    </Stage>
  );
};

// 22 — "এটাই modern Meta Ads-এর একটা গুরুত্বপূর্ণ shift। আগে … manually খুঁজে বের করতে। এখন AI-কে সেই discovery-তে বেশি ভূমিকা …"
export const S22: S = ({ start }) => {
  const t = useT(start);
  const nowK = p(t, C.now, 0.6, OUT);
  const hop = Math.floor(Math.max(0, t - C.manual) / 0.55) % 6;
  const hx = 260 + (hop % 3) * 200, hy = 520 + Math.floor(hop / 3) * 200;
  return (
    <Stage t={t} dark>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150 }}>
        <KLine t={t} dark size={54} words={[{ w: "Modern Meta Ads:", at: 161.4, s: 0.8, wt: 600, c: "rgba(255,255,255,0.7)" }, { w: "THE SHIFT", at: C.shift, wt: 900, c: K.accent, glow: true }]} />
      </div>
      <div style={{ position: "absolute", left: 958, top: 260, width: 4, height: 600, background: "rgba(255,255,255,0.15)" }} />
      {/* THEN — manual */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 958, height: 1080, opacity: lerp(1, 0.4, nowK) }}>
        <div style={{ position: "absolute", left: 480, top: 300, transform: "translateX(-50%)", fontFamily: DISPLAY, fontWeight: 900, fontSize: 40, letterSpacing: "0.2em", color: "#fff", opacity: p(t, C.manual, 0.3) }}>THEN</div>
        {Array.from({ length: 6 }, (_, i) => (
          <Img key={i} src={staticFile("broad-sharp-v2/3d/bust_in_silhouette.png")} style={{ position: "absolute", left: 260 + (i % 3) * 200 - 60, top: 520 + Math.floor(i / 3) * 200 - 60, width: 120, height: 120, filter: `grayscale(1) invert(1) brightness(${i === hop && t > C.manual ? 1.0 : 0.55})`, opacity: p(t, C.manual, 0.4) }} />
        ))}
        <Obj name="magnifying_glass_tilted_left" t={t} at={C.manual} x={hx + 40} y={hy + 20} size={200} from="left" mono float={0} />
        <div style={{ position: "absolute", left: 480, top: 900, transform: "translateX(-50%)", fontFamily: DISPLAY, fontWeight: 700, fontSize: 22, color: "rgba(255,255,255,0.6)", opacity: p(t, C.manual + 0.5, 0.3), whiteSpace: "nowrap" }}>Finding customers manually</div>
      </div>
      {/* NOW — AI discovery */}
      <div style={{ position: "absolute", left: 962, top: 0, width: 958, height: 1080, opacity: nowK }}>
        <div style={{ position: "absolute", left: 480, top: 300, transform: "translateX(-50%)", fontFamily: DISPLAY, fontWeight: 900, fontSize: 40, letterSpacing: "0.2em", color: K.accent, textShadow: `0 0 30px ${K.accent}` }}>NOW</div>
        <svg width={958} height={1080} style={{ position: "absolute", inset: 0 }}>
          {[0, 1, 2].map((i) => { const r = ((t * 0.5 + i / 3) % 1); return <circle key={i} cx={480} cy={640} r={80 + r * 300} fill="none" stroke={K.accent} strokeWidth={2} opacity={(1 - r) * 0.6} />; })}
          {Array.from({ length: 22 }, (_, i) => {
            const a = random(`na${i}`) * Math.PI * 2, r = 140 + random(`nr${i}`) * 230;
            const lit = t > C.discovery + random(`nl${i}`) * 1.5;
            return <circle key={i} cx={480 + Math.cos(a) * r} cy={640 + Math.sin(a) * r * 0.7} r={lit ? 9 : 6} fill={lit ? "#fff" : "#555"} />;
          })}
        </svg>
        <div style={{ position: "absolute", left: 480, top: 640, transform: "translate(-50%,-50%)" }}><AppTile name="meta" size={150} label={false} /></div>
        <div style={{ position: "absolute", left: 480, top: 900, transform: "translateX(-50%)", fontFamily: DISPLAY, fontWeight: 700, fontSize: 22, color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>AI-assisted discovery</div>
      </div>
    </Stage>
  );
};

// 23 — "কিন্তু AI-কে আপনাকেই বলতে হবে— ‘আমার Business-এর জন্য valuable customer কাকে বলে?’"
export const S23: S = ({ start }) => {
  const t = useT(start);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 200, top: 260 }}>
        <KLine t={t} size={58} align="flex-start" words={[{ w: "But", at: C.youMust, s: 0.8, wt: 600 }, { w: "YOU", at: C.youYourself, s: 1.6, wt: 900, c: K.accent, glow: true }]} />
        <KLine t={t} size={58} align="flex-start" style={{ marginTop: 6 }} words={[{ w: "must tell the AI:", at: C.youYourself + 0.3, s: 0.9, wt: 800 }]} />
      </div>
      <Pop t={t} at={C.valuableQ - 0.1} x={1150} y={600} from="top" dur={0.7}>
        <PinNote t={t} at={C.valuableQ} w={760} title="“What is a valuable customer for my business?”" rows={[]} />
      </Pop>
      <Pop t={t} at={C.valuable} x={1150} y={800} from="scale"><SelectBox t={t} at={C.valuable + 0.1}><span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 40, color: K.accent }}>valuable customer</span></SelectBox></Pop>
      <Obj name="gem_stone" t={t} at={C.valuable} x={1690} y={330} size={260} from="spin" mono={false} />
    </Stage>
  );
};

// 24 — "আমি Fahad। … ভালো advertising মানে শুধু— more reach, more clicks, বা more leads না।"
const VANITY = [{ n: "megaphone", l: "More reach", at: C.reach }, { n: "computer_mouse", l: "More clicks", at: C.clicks }, { n: "inbox_tray", l: "More leads", at: C.leads }];
export const S24: S = ({ start }) => {
  const t = useT(start);
  const up = p(t, C.goodAd, 0.8, IN_OUT);
  const kill = p(t, C.na, 0.4);
  return (
    <Stage t={t} dark header={false}>
      <div style={{ position: "absolute", left: 960, top: lerp(500, 190, up), transform: `translate(-50%,-50%) scale(${lerp(1, 0.55, up)})`, textAlign: "center" }}>
        <KLine t={t} dark size={170} words={[{ w: "FAHAD", at: C.fahad, wt: 900, glow: true, ls: "0.06em" }]} />
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 26, letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)", opacity: p(t, C.fahad + 0.3, 0.4) * (1 - up) }}>DIGITAL MARKETING · STRATEGY · AI · GROWTH</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, opacity: p(t, C.goodAd + 0.4, 0.4) }}>
        <KLine t={t} dark size={46} words={[{ w: "Good advertising isn't just", at: C.goodAd + 0.4, wt: 700, c: "rgba(255,255,255,0.75)" }]} />
      </div>
      {VANITY.map((v, i) => (
        <div key={v.n}>
          <Obj name={v.n} t={t} at={v.at} x={560 + i * 400} y={600} size={210} from="bottom" mono float={0.6} />
          <div style={{ position: "absolute", left: 560 + i * 400, top: 760, transform: "translateX(-50%)", fontFamily: DISPLAY, fontWeight: 900, fontSize: 38, color: "#fff", opacity: p(t, v.at, 0.3) * lerp(1, 0.45, kill), whiteSpace: "nowrap" }}>
            {v.l}
            <div style={{ position: "absolute", left: "-6%", top: "52%", height: 6, width: `${kill * 112}%`, background: K.accent, borderRadius: 3 }} />
          </div>
        </div>
      ))}
    </Stage>
  );
};

// 25 — "ভালো advertising মানে— the right customer, the right message, and the right business outcome।"
const RIGHT = [{ w: "CUSTOMER", n: "bullseye", at: C.rightCustomer }, { w: "MESSAGE", n: "speech_balloon", at: C.rightMessage }, { w: "BUSINESS OUTCOME", n: "chart_increasing", at: C.rightOutcome }];
export const S25: S = ({ start }) => {
  const t = useT(start);
  return (
    <Stage t={t}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 170 }}>
        <KLine t={t} size={46} words={[{ w: "Good advertising =", at: 183.7, wt: 700, c: K.soft }]} />
      </div>
      {RIGHT.map((r, i) => (
        <div key={r.w} style={{ position: "absolute", left: 470, top: 300 + i * 190, display: "flex", alignItems: "center", gap: 34 }}>
          <div style={{ position: "relative", width: 150, height: 150 }}><Obj name={r.n} t={t} at={r.at} x={75} y={75} size={150} from="left" mono float={0.4} /></div>
          <KLine t={t} size={84} align="flex-start" words={[{ w: "the right", at: r.at, s: 0.5, wt: 600, dy: -0.2 }, { w: r.w, at: r.at + 0.12, wt: 900, c: i === 2 ? K.accent : undefined }]} />
        </div>
      ))}
    </Stage>
  );
};

// 26 — "Broad delivery. Sharp strategy."
export const S26: S = ({ start }) => {
  const t = useT(start);
  const line = drawn("M 0 0 L 520 0", t, 190.4, 0.6);
  return (
    <Stage t={t} dark header={false}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 290 }}>
        <KLine t={t} dark size={120} words={[{ w: "Broad", at: 188.72, wt: 800, c: "rgba(255,255,255,0.5)", ls: "0.06em" }, { w: "delivery.", at: 188.95, wt: 800, c: "rgba(255,255,255,0.5)", ls: "0.06em" }]} />
        <KLine t={t} dark size={120} style={{ marginTop: 18 }} words={[{ w: "Sharp", at: 189.78, wt: 900, c: K.accent, glow: true }, { w: "strategy.", at: 190.0, wt: 900 }]} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 720, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: p(t, 190.3, 0.4) }}>
        <svg width={520} height={6}><path d="M 0 3 L 520 3" stroke={K.accent} strokeWidth={4} strokeDasharray={line.strokeDasharray} strokeDashoffset={line.strokeDashoffset} /></svg>
        <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 46, letterSpacing: "0.12em", color: "#fff" }}>FAHAD</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 20, letterSpacing: "0.3em", color: "rgba(255,255,255,0.55)" }}>DIGITAL MARKETING · STRATEGY · AI · GROWTH</div>
      </div>
    </Stage>
  );
};
