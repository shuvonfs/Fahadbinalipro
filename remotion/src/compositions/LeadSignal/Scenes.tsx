/** LEAD SIGNAL — 9:16 scenes (reference style: dark grid, thin white curves, vivid red accent, phone UIs). */
import { Img, random, staticFile } from "remotion";
import { AppTile, DISPLAY, K, KLine, Logo, Obj, Phone, Pop, SelectBox, shake, Stage } from "../../brand/kinetic/Kinetic";
import { drawn, IN_OUT, lerp, OUT, p, useT } from "../../brand";
import { L } from "./data";

type S = React.FC<{ start: number }>;
export const RED = "#E3122F";
const W = 1080;

/** Reference look: dark set with a fine grid and one sweeping hairline curve (or paper with a red curve). */
const LS: React.FC<{ t: number; dark?: boolean; children: React.ReactNode; curve?: number }> = ({ t, dark = true, children, curve = 0 }) => {
  const d = ["M -40 520 C 300 420, 700 900, 1120 700", "M -40 1500 C 380 1300, 640 1750, 1120 1420", "M 1120 300 C 700 520, 420 120, -40 360"][curve % 3];
  const dd = drawn(d, t, t - 100, 0.1);
  return (
    <Stage t={t} dark={dark} stars={false} tint="rgba(227,18,47,0.18)">
      {dark ? <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "120px 120px" }} /> : null}
      <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
        <path d={d} fill="none" stroke={dark ? "rgba(255,255,255,0.55)" : RED} strokeWidth={dark ? 2 : 3} strokeDasharray={dd.strokeDasharray} />
      </svg>
      {children}
    </Stage>
  );
};
const Pill: React.FC<{ children: React.ReactNode; size?: number; dark?: boolean; red?: boolean }> = ({ children, size = 28, dark, red = true }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: `${size * 0.35}px ${size * 0.8}px`, borderRadius: 999, background: red ? RED : dark ? "#fff" : K.ink, color: red ? "#fff" : dark ? K.ink : "#fff",
    fontFamily: DISPLAY, fontWeight: 800, fontSize: size, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{children}</span>
);
const Icon3D: React.FC<{ name: string; size?: number; mono?: boolean }> = ({ name, size = 90, mono = true }) => (
  <Img src={staticFile(`broad-sharp-v2/3d/${name}.png`)} style={{ width: size, height: size, filter: mono ? "grayscale(1) contrast(1.15) brightness(1.1)" : undefined }} />
);
/** Notification toast (phone UI). */
const Toast: React.FC<{ title: string; sub: string; logo?: "meta" | "googleads" }> = ({ title, sub, logo = "meta" }) => (
  <div style={{ width: 560, display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", borderRadius: 26, background: "rgba(40,36,38,0.92)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", fontFamily: `"Inter",sans-serif` }}>
    <div style={{ width: 56, height: 56, borderRadius: 14, background: "#fff", display: "grid", placeItems: "center" }}><Logo name={logo} size={34} /></div>
    <div style={{ color: "#fff" }}><div style={{ fontSize: 22, fontWeight: 800 }}>{title}</div><div style={{ fontSize: 18, opacity: 0.7 }}>{sub}</div></div>
    <span style={{ marginLeft: "auto", fontSize: 16, color: "rgba(255,255,255,0.5)" }}>now</span>
  </div>
);
/** Vertical flow node (reference: Results → Testimonial chain). */
const FNode: React.FC<{ icon: string; label: string; hot?: boolean; dark?: boolean; w?: number }> = ({ icon, label, hot, dark = true, w = 520 }) => (
  <div style={{ width: w, display: "flex", alignItems: "center", gap: 20, padding: "16px 24px", borderRadius: 22, background: hot ? RED : dark ? "rgba(255,255,255,0.06)" : "#fff",
    border: `2px solid ${hot ? RED : dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.1)"}`, boxShadow: hot ? `0 0 40px ${RED}88` : "0 20px 40px rgba(0,0,0,0.25)" }}>
    <Icon3D name={icon} size={76} mono={!hot} />
    <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 38, color: dark || hot ? "#fff" : K.ink }}>{label}</span>
  </div>
);
const VLink: React.FC<{ t: number; at: number; x: number; y1: number; y2: number; dark?: boolean }> = ({ t, at, x, y1, y2, dark = true }) => {
  const d = `M ${x} ${y1} L ${x} ${y2}`;
  const dd = drawn(d, t, at, 0.3);
  return <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}><path d={d} stroke={dark ? "#fff" : K.ink} strokeWidth={3} strokeDasharray={dd.strokeDasharray} strokeDashoffset={dd.strokeDashoffset} /></svg>;
};

// 01 — "আপনার অ্যাড থেকে প্রতিদিন লিড আসছে।"
export const L01: S = ({ start }) => {
  const t = useT(start);
  return (
    <LS t={t}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 230 }}>
        <KLine t={t} dark size={64} words={[{ w: "Your ads", at: 0.2, s: 0.8, wt: 600 }]} />
        <KLine t={t} dark size={64} style={{ marginTop: 10 }} words={[{ w: "bring", at: 0.6, s: 0.8, wt: 600 }, { w: "LEADS", at: L.leads, s: 2.2, wt: 900, c: RED, glow: true }]} />
        <KLine t={t} dark size={64} words={[{ w: "every day.", at: 1.2, s: 0.9, wt: 800 }]} />
      </div>
      <Pop t={t} at={0.1} x={540} y={1090} from="bottom"><div style={{ transform: "scale(0.82) rotate(-4deg)" }}><Phone w={380}><div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1d1a1b,#0b0809)" }} /></Phone></div></Pop>
      {[0.7, 1.25, 1.75].map((a, i) => (
        <Pop key={i} t={t} at={a} x={540} y={830 + i * 135} from="top" dur={0.4}><Toast title="New lead 🔔" sub={["Rahim · Lead form submitted", "Nusrat · Lead form submitted", "Karim · Lead form submitted"][i]} /></Pop>
      ))}
    </LS>
  );
};

// 02 — "কিন্তু এর মধ্যে কে আসলে কিনল, সেটা Meta বা Google কেউই জানে না।"
export const L02: S = ({ start }) => {
  const t = useT(start);
  return (
    <LS t={t} curve={1}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 300 }}>
        <KLine t={t} dark size={64} words={[{ w: "But who", at: 2.45, s: 0.8, wt: 600 }, { w: "actually", at: 2.9, s: 0.8, wt: 600 }]} />
        <KLine t={t} dark size={64} style={{ marginTop: 10 }} words={[{ w: "BOUGHT?", at: L.bought, s: 2.2, wt: 900, c: RED, glow: true }]} />
      </div>
      {[{ n: "meta" as const, at: L.meta, x: 330 }, { n: "googleads" as const, at: L.google, x: 750 }].map((g) => (
        <Pop key={g.n} t={t} at={g.at} x={g.x} y={1000} from="scale">
          <div style={{ position: "relative" }}>
            <AppTile name={g.n} size={240} />
            <div style={{ position: "absolute", right: -18, top: -18, width: 80, height: 80, borderRadius: "50%", background: RED, color: "#fff", display: "grid", placeItems: "center", fontFamily: DISPLAY, fontWeight: 900, fontSize: 52, boxShadow: `0 0 30px ${RED}` }}>?</div>
          </div>
        </Pop>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1250 }}>
        <KLine t={t} dark size={60} words={[{ w: "Neither", at: L.neither + 0.1, wt: 900 }, { w: "knows.", at: L.neither + 0.35, wt: 900, c: RED }]} />
      </div>
    </LS>
  );
};

// 03 — "Meta আর Google দেখে কে ফর্ম পূরণ করল।"
export const L03: S = ({ start }) => {
  const t = useT(start);
  const tick = p(t, L.form + 0.2, 0.35, OUT);
  return (
    <LS t={t} dark={false} curve={2}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 250 }}>
        <KLine t={t} size={62} words={[{ w: "They only see", at: 6.75, s: 0.8, wt: 600 }]} />
        <KLine t={t} size={62} style={{ marginTop: 10 }} words={[{ w: "the", at: 7.2, s: 0.8, wt: 600 }, { w: "FORM.", at: L.form - 0.3, s: 2, wt: 900, c: RED }]} />
      </div>
      <Pop t={t} at={6.7} x={540} y={1080} from="bottom">
        <div style={{ width: 640, padding: "34px 36px", borderRadius: 28, background: "#fff", boxShadow: "0 40px 90px rgba(0,0,0,0.2)", fontFamily: `"Inter",sans-serif` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><Logo name="meta" size={34} /><span style={{ fontSize: 24, fontWeight: 800 }}>Instant form</span></div>
          {["Full name", "Phone number", "City"].map((f, i) => (
            <div key={f} style={{ marginBottom: 14, opacity: p(t, 7.0 + i * 0.25, 0.3) }}>
              <div style={{ fontSize: 16, color: "#65676b", fontWeight: 700, marginBottom: 6 }}>{f}</div>
              <div style={{ height: 52, borderRadius: 10, border: "2px solid #dddfe2", padding: "0 14px", display: "flex", alignItems: "center", fontSize: 20 }}>{["Rahim Uddin", "01X-XXXX-XXXX", "Dhaka"][i]}</div>
            </div>
          ))}
          <div style={{ marginTop: 10, height: 64, borderRadius: 12, background: tick > 0.5 ? "#2e7d32" : K.blue, color: "#fff", display: "grid", placeItems: "center", fontSize: 24, fontWeight: 800 }}>{tick > 0.5 ? "✓ Submitted" : "Submit"}</div>
        </div>
      </Pop>
      <Pop t={t} at={7.3} x={210} y={720} from="left"><AppTile name="meta" size={130} label={false} /></Pop>
      <Pop t={t} at={7.5} x={870} y={720} from="right"><AppTile name="googleads" size={130} label={false} /></Pop>
    </LS>
  );
};

// 04 — "কিন্তু তারপর? কে ফোন ধরল, কে মিটিংয়ে এল, কে টাকা দিল,"
const AFTER = [{ i: "mobile_phone", l: "Picked up the call", at: L.phone }, { i: "busts_in_silhouette", l: "Came to the meeting", at: L.meeting }, { i: "money_bag", l: "Paid", at: L.paid }];
export const L04: S = ({ start }) => {
  const t = useT(start);
  return (
    <LS t={t} curve={0}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 260 }}>
        <KLine t={t} dark size={70} words={[{ w: "And", at: L.thenWhat, s: 0.9, wt: 600 }, { w: "THEN?", at: L.thenWhat + 0.2, s: 1.8, wt: 900, c: RED, glow: true }]} />
      </div>
      {AFTER.map((a, i) => (
        <div key={a.l}>
          {i > 0 ? <VLink t={t} at={a.at - 0.3} x={540} y1={600 + i * 260 - 150} y2={600 + i * 260 - 60} /> : null}
          <Pop t={t} at={a.at} x={540} y={600 + i * 260} from="right"><FNode icon={a.i} label={a.l} hot={i === 2} /></Pop>
        </div>
      ))}
    </LS>
  );
};

// 05 — "এই আসল রেজাল্টটা হয় অফলাইনে। আর সেটা দুই প্ল্যাটফর্মের কেউই দেখতে পায় না।"
export const L05: S = ({ start }) => {
  const t = useT(start);
  const wall = p(t, L.offline - 0.2, 0.5, OUT);
  return (
    <LS t={t} curve={1}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 230 }}>
        <KLine t={t} dark size={62} words={[{ w: "The REAL result", at: L.real, s: 0.85, wt: 800 }, { w: "happens", at: 14.2, s: 0.85, wt: 600 }]} />
        <KLine t={t} dark size={62} style={{ marginTop: 10 }} words={[{ w: "OFFLINE.", at: L.offline, s: 2.1, wt: 900, c: RED, glow: true }]} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", gap: 70 }}>
        {(["meta", "googleads"] as const).map((n, i) => (
          <div key={n} style={{ position: "relative", opacity: p(t, 15.4 + i * 0.15, 0.3) }}>
            <AppTile name={n} size={170} label={false} />
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: p(t, L.cantSee + 0.4, 0.3) }}><Icon3D name="cross_mark" size={140} mono={false} /></div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, top: 920, height: 4, background: `repeating-linear-gradient(90deg, #fff 0 18px, transparent 18px 32px)`, transform: `scaleX(${wall})` }} />
      <div style={{ position: "absolute", left: 80, top: 880, fontFamily: DISPLAY, fontWeight: 800, fontSize: 24, letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)", opacity: wall }}>ONLINE ↑</div>
      <div style={{ position: "absolute", right: 80, top: 945, fontFamily: DISPLAY, fontWeight: 800, fontSize: 24, letterSpacing: "0.2em", color: RED, opacity: wall }}>↓ OFFLINE</div>
      {AFTER.map((a, i) => (
        <Pop key={a.l} t={t} at={13.2 + i * 0.12} x={540} y={1080 + i * 150} from="bottom"><div style={{ transform: "scale(0.82)", opacity: 0.9 }}><FNode icon={a.i} label={a.l} hot={i === 2} /></div></Pop>
      ))}
    </LS>
  );
};

// 06 — "যেহেতু ওরা শুধু ফর্ম সাবমিটকেই সাফল্য ধরে, তাই সবচেয়ে সহজে যে মানুষ ফর্ম পূরণ করে, তাদেরই খুঁজে আনে।"
export const L06: S = ({ start }) => {
  const t = useT(start);
  return (
    <LS t={t} dark={false} curve={0}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 230 }}>
        <KLine t={t} size={60} words={[{ w: "Form submit", at: L.formOnly, s: 1, wt: 900 }, { w: "=", at: 19.2, s: 1, wt: 900, c: RED }]} />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
          <SelectBox t={t} at={L.success + 0.2}><KLine t={t} size={60} words={[{ w: "“SUCCESS”", at: L.success, s: 1.6, wt: 900, c: RED }]} /></SelectBox>
        </div>
      </div>
      <Pop t={t} at={18.0} x={540} y={1010} from="scale"><Icon3D name="clipboard" size={300} /></Pop>
      {Array.from({ length: 12 }, (_, i) => {
        const k = p(t, L.easiest + i * 0.14, 0.9, IN_OUT);
        const sx = random(`fx${i}`) * 1000 + 40, sy = 1500 + random(`fy${i}`) * 300;
        return <div key={i} style={{ position: "absolute", left: lerp(sx, 540, k), top: lerp(sy, 1010, k), transform: `translate(-50%,-50%) scale(${lerp(1, 0.3, k)})`, opacity: (t > L.easiest + i * 0.14 - 0.1 ? 1 : 0) * (1 - p(t, L.easiest + i * 0.14 + 0.8, 0.15)) }}><Icon3D name="bust_in_silhouette" size={110} /></div>;
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1300 }}>
        <KLine t={t} size={52} words={[{ w: "So they find", at: 21.0, s: 0.85, wt: 600 }, { w: "the EASIEST", at: L.easiest + 0.3, wt: 900, c: RED }, { w: "form-fillers.", at: L.findThem, s: 0.85, wt: 800 }]} />
      </div>
    </LS>
  );
};

// 07 — "লিড সংখ্যা বাড়ে, কিন্তু কোয়ালিটি কমতে থাকে। আর আপনার সেলস টিম সারাদিন ভুল নাম্বারে ফোন করে।"
export const L07: S = ({ start }) => {
  const t = useT(start);
  const up = "M 120 1080 C 300 1040, 520 900, 960 560";
  const down = "M 120 640 C 360 680, 600 860, 960 1060";
  const du = drawn(up, t, L.leadsUp - 0.2, 1.0), dd = drawn(down, t, L.qualityDown, 1.0);
  const [sx, sy] = shake(t, L.wrong, 12);
  const phase2 = p(t, L.salesTeam - 0.1, 0.4);
  return (
    <LS t={t} curve={2}>
      <div style={{ opacity: 1 - phase2 }}>
        <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
          <line x1={120} y1={1120} x2={960} y2={1120} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
          <path d={up} fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" strokeDasharray={du.strokeDasharray} strokeDashoffset={du.strokeDashoffset} />
          <path d={down} fill="none" stroke={RED} strokeWidth={8} strokeLinecap="round" strokeDasharray={dd.strokeDasharray} strokeDashoffset={dd.strokeDashoffset} style={{ filter: `drop-shadow(0 0 12px ${RED})` }} />
        </svg>
        <Pop t={t} at={L.leadsUp + 0.5} x={860} y={480} from="scale"><Pill red={false} dark>Leads ↑</Pill></Pop>
        <Pop t={t} at={L.qualityDown + 0.6} x={860} y={1180} from="scale"><Pill>Quality ↓</Pill></Pop>
        <div style={{ position: "absolute", left: 0, right: 0, top: 260 }}><KLine t={t} dark size={58} words={[{ w: "More leads.", at: L.leadsUp, wt: 900 }, { w: "Worse leads.", at: L.qualityDown + 0.2, wt: 900, c: RED }]} /></div>
      </div>
      <div style={{ opacity: phase2, transform: `translate(${sx}px, ${sy}px)` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 280 }}>
          <KLine t={t} dark size={58} words={[{ w: "Your sales team", at: L.salesTeam, s: 0.9, wt: 700 }]} />
          <KLine t={t} dark size={58} style={{ marginTop: 10 }} words={[{ w: "calls", at: 27.6, s: 0.9, wt: 700 }, { w: "WRONG", at: L.wrong, s: 1.6, wt: 900, c: RED, glow: true }, { w: "numbers.", at: 28.4, s: 0.9, wt: 700 }]} />
        </div>
        <Obj name="mobile_phone" t={t} at={L.salesTeam} x={540} y={1000} size={360} from="bottom" mono rot={Math.sin(t * 30) * (t > L.wrong ? 4 : 0)} />
        {["Not interested", "Wrong number", "Just checking price"].map((c, i) => (
          <Pop key={c} t={t} at={L.wrong + i * 0.25} x={[260, 820, 300][i]} y={[840, 1000, 1220][i]} from="scale"><Pill size={26}>✕ {c}</Pill></Pop>
        ))}
      </div>
    </LS>
  );
};

// 08 — "আমি এর জন্য একটা সিস্টেম বানাই, তিন ধাপে।"
export const L08: S = ({ start }) => {
  const t = useT(start);
  return (
    <LS t={t} dark={false} curve={1}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 420 }}>
        <KLine t={t} size={66} words={[{ w: "I build a", at: 29.5, s: 0.9, wt: 700 }]} />
        <KLine t={t} size={66} style={{ marginTop: 8 }} words={[{ w: "SYSTEM.", at: L.system, s: 2, wt: 900, c: RED }]} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center", gap: 30 }}>
        {["Track", "Record", "Send back"].map((s, i) => (
          <div key={s} style={{ opacity: p(t, L.threeSteps + i * 0.12, 0.3), transform: `translateY(${(1 - p(t, L.threeSteps + i * 0.12, 0.4, OUT)) * 40}px)`, textAlign: "center" }}>
            <div style={{ width: 210, height: 210, borderRadius: 30, background: i === 2 ? RED : K.ink, color: "#fff", display: "grid", placeItems: "center", fontFamily: DISPLAY, fontWeight: 900, fontSize: 110, boxShadow: "0 30px 60px rgba(0,0,0,0.25)" }}>{i + 1}</div>
            <div style={{ marginTop: 16, fontFamily: DISPLAY, fontWeight: 800, fontSize: 32, color: K.ink }}>{s}</div>
          </div>
        ))}
      </div>
    </LS>
  );
};

/** Step header used by steps 1–3. */
const StepHead: React.FC<{ t: number; at: number; n: string; title: string }> = ({ t, at, n, title }) => (
  <div style={{ position: "absolute", left: 80, top: 220, display: "flex", alignItems: "center", gap: 24 }}>
    <Pop t={t} at={at} x={70} y={70} from="scale"><div style={{ width: 140, height: 140, borderRadius: 26, background: RED, color: "#fff", display: "grid", placeItems: "center", fontFamily: DISPLAY, fontWeight: 900, fontSize: 80, boxShadow: `0 0 40px ${RED}88` }}>{n}</div></Pop>
    <div style={{ marginLeft: 150 }}><KLine t={t} dark size={58} align="flex-start" words={[{ w: title, at: at + 0.3, wt: 900 }]} /></div>
  </div>
);
const Wire: React.FC<{ t: number; at: number; d: string; red?: boolean }> = ({ t, at, d, red }) => {
  const dd = drawn(d, t, at, 0.5);
  return (
    <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
      <path d={d} fill="none" stroke={red ? RED : "#fff"} strokeWidth={4} strokeDasharray={dd.strokeDasharray} strokeDashoffset={dd.strokeDashoffset} />
      {t > at + 0.5 ? <path d={d} fill="none" stroke={red ? "#fff" : RED} strokeWidth={4} strokeDasharray="10 30" strokeDashoffset={-t * 120} /> : null}
    </svg>
  );
};
const Box: React.FC<{ children: React.ReactNode; hot?: boolean; w?: number }> = ({ children, hot, w = 420 }) => (
  <div style={{ width: w, padding: "20px 24px", borderRadius: 22, background: hot ? RED : "rgba(255,255,255,0.07)", border: `2px solid ${hot ? RED : "rgba(255,255,255,0.28)"}`, fontFamily: DISPLAY, color: "#fff", boxShadow: hot ? `0 0 40px ${RED}77` : undefined }}>{children}</div>
);

// 09 — "এক, ট্র্যাকিং ঠিক করা: Meta-তে Pixel-এর সাথে Conversions API, আর Google-এ Enhanced Conversions, যাতে কোনো লিডের ডেটা হারিয়ে না যায়।"
export const L09: S = ({ start }) => {
  const t = useT(start);
  return (
    <LS t={t} curve={0}>
      <StepHead t={t} at={L.one} n="1" title="Fix the tracking" />
      <Pop t={t} at={33.6} x={540} y={560} from="top"><Box w={560}><div style={{ display: "flex", alignItems: "center", gap: 14 }}><Icon3D name="mobile_phone" size={60} /><span style={{ fontSize: 34, fontWeight: 900 }}>Lead form / website</span></div></Box></Pop>
      <Wire t={t} at={L.pixel - 0.2} d="M 400 640 C 400 760, 290 760, 290 860" />
      <Wire t={t} at={L.googleEC - 0.2} d="M 680 640 C 680 760, 790 760, 790 860" />
      <Pop t={t} at={L.pixel} x={290} y={1010} from="left">
        <Box w={420}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Logo name="meta" size={44} color="#fff" /><span style={{ fontSize: 30, fontWeight: 900 }}>Meta</span></div>
          <div style={{ marginTop: 14, fontSize: 28, fontWeight: 800 }}>✓ Pixel</div>
          <div style={{ marginTop: 6, fontSize: 28, fontWeight: 800, color: p(t, L.capi, 0.3) > 0.5 ? RED : "rgba(255,255,255,0.3)" }}>✓ Conversions API</div>
        </Box>
      </Pop>
      <Pop t={t} at={L.googleEC} x={790} y={1010} from="right">
        <Box w={420}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Logo name="googleads" size={44} color="#fff" /><span style={{ fontSize: 30, fontWeight: 900 }}>Google</span></div>
          <div style={{ marginTop: 14, fontSize: 28, fontWeight: 800, color: p(t, L.enhanced, 0.3) > 0.5 ? RED : "rgba(255,255,255,0.3)" }}>✓ Enhanced Conversions</div>
        </Box>
      </Pop>
      <Pop t={t} at={L.noLoss} x={540} y={1330} from="scale">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}><Icon3D name="locked" size={110} mono={false} /><span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 44, color: "#fff" }}>No lead data <span style={{ color: RED }}>lost.</span></span></div>
      </Pop>
    </LS>
  );
};

// 10 — "দুই, প্রতিটা লিডের যাত্রা ট্র্যাক করা: কোন লিড ভালো, কে মিটিংয়ে এল, কে কিনল, সব রেকর্ড থাকে।"
const JOURNEY = [{ i: "inbox_tray", l: "New lead", at: 41.0 }, { i: "check_mark_button", l: "Qualified lead", at: L.good }, { i: "busts_in_silhouette", l: "Meeting", at: L.meeting2 }, { i: "money_bag", l: "Purchase", at: L.bought2 }];
export const L10: S = ({ start }) => {
  const t = useT(start);
  return (
    <LS t={t} curve={1}>
      <StepHead t={t} at={L.two} n="2" title="Track every journey" />
      {JOURNEY.map((j, i) => (
        <div key={j.l}>
          {i > 0 ? <VLink t={t} at={j.at - 0.3} x={540} y1={560 + i * 210 - 120} y2={560 + i * 210 - 70} /> : null}
          <Pop t={t} at={j.at} x={540} y={560 + i * 210} from="right"><div style={{ transform: "scale(0.9)" }}><FNode icon={j.i} label={j.l} hot={i === 3} /></div></Pop>
        </div>
      ))}
      <Pop t={t} at={L.record} x={540} y={1420} from="scale"><Pill size={34}>📋 Everything recorded (CRM)</Pill></Pop>
    </LS>
  );
};

// 11 — "তিন, সেই আসল রেজাল্ট আবার প্ল্যাটফর্মে ফেরত পাঠানো: Meta-তে Conversions API দিয়ে, Google-এ Data Manager দিয়ে।"
export const L11: S = ({ start }) => {
  const t = useT(start);
  return (
    <LS t={t} curve={2}>
      <StepHead t={t} at={L.three} n="3" title="Send results back" />
      <Pop t={t} at={L.result} x={540} y={1260} from="bottom"><Box hot w={560}><div style={{ display: "flex", alignItems: "center", gap: 16 }}><Icon3D name="money_bag" size={80} mono={false} /><div><div style={{ fontSize: 22, fontWeight: 800, opacity: 0.8 }}>OFFLINE RESULT</div><div style={{ fontSize: 36, fontWeight: 900 }}>Real purchase ✓</div></div></div></Box></Pop>
      <Wire t={t} at={L.sendBack} red d="M 420 1180 C 420 1000, 290 960, 290 820" />
      <Wire t={t} at={L.sendBack + 0.2} red d="M 660 1180 C 660 1000, 790 960, 790 820" />
      <Pop t={t} at={L.platform} x={290} y={680} from="top">
        <div style={{ textAlign: "center" }}><AppTile name="meta" size={190} /><div style={{ marginTop: 14, opacity: p(t, L.capi2, 0.3) }}><Pill size={24}>Conversions API</Pill></div></div>
      </Pop>
      <Pop t={t} at={L.platform + 0.2} x={790} y={680} from="top">
        <div style={{ textAlign: "center" }}><AppTile name="googleads" size={190} /><div style={{ marginTop: 14, opacity: p(t, L.dataManager, 0.3) }}><Pill size={24}>Data Manager</Pill></div></div>
      </Pop>
    </LS>
  );
};

// 12 — "এখন Meta আর Google জানে একজন আসল কাস্টমার দেখতে কেমন। তাই ওরা এরকম মানুষই আরও খুঁজে আনে।"
export const L12: S = ({ start }) => {
  const t = useT(start);
  return (
    <LS t={t} dark={false} curve={0}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 230 }}>
        <KLine t={t} size={56} words={[{ w: "Now they know what a", at: L.learn, s: 0.85, wt: 700 }]} />
        <KLine t={t} size={56} style={{ marginTop: 10 }} words={[{ w: "REAL CUSTOMER", at: L.customer - 0.3, s: 1.4, wt: 900, c: RED }]} />
        <KLine t={t} size={56} words={[{ w: "looks like.", at: 56.3, s: 0.85, wt: 700 }]} />
      </div>
      <Pop t={t} at={L.customer} x={540} y={820} from="scale">
        <div style={{ padding: "26px 34px", borderRadius: 26, background: "#fff", border: `4px solid ${RED}`, boxShadow: `0 30px 70px rgba(227,18,47,0.25)`, display: "flex", alignItems: "center", gap: 18, fontFamily: DISPLAY }}>
          <Icon3D name="bust_in_silhouette" size={100} /><div><div style={{ fontSize: 22, fontWeight: 800, color: RED }}>REAL CUSTOMER ✓</div><div style={{ fontSize: 30, fontWeight: 900, color: K.ink }}>Called · Met · Bought</div></div>
        </div>
      </Pop>
      <div style={{ position: "absolute", left: 120, top: 1040, width: 840, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", rowGap: 26 }}>
        {Array.from({ length: 15 }, (_, i) => {
          const lit = p(t, L.more + (i % 5) * 0.1 + Math.floor(i / 5) * 0.15, 0.3);
          return <div key={i} style={{ display: "grid", placeItems: "center", opacity: 0.25 + lit * 0.75, transform: `scale(${lerp(0.8, 1, lit)})` }}><div style={{ borderRadius: "50%", padding: 8, boxShadow: lit > 0.5 ? `0 0 0 4px ${RED}` : undefined }}><Icon3D name="bust_in_silhouette" size={110} /></div></div>;
        })}
      </div>
    </LS>
  );
};

// 13 — "যেসব কোম্পানি Lead Generate করে, তাদের জন্য এই সিস্টেম না থাকা মানে অ্যাডের বাজেট দিয়ে প্ল্যাটফর্মকে ভুল জিনিস শেখানো।"
export const L13: S = ({ start }) => {
  const t = useT(start);
  const [sx, sy] = shake(t, L.wrongThing + 0.3, 16);
  return (
    <LS t={t} curve={1}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sx}px, ${sy}px)` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 230 }}>
          <KLine t={t} dark size={56} words={[{ w: "No system =", at: L.noSystem, s: 0.9, wt: 800 }]} />
          <KLine t={t} dark size={56} style={{ marginTop: 10 }} words={[{ w: "your ad budget", at: L.budget, s: 1.1, wt: 900 }]} />
          <KLine t={t} dark size={56} words={[{ w: "teaching the platform", at: 64.4, s: 0.85, wt: 600 }]} />
        </div>
        <Obj name="money_bag" t={t} at={L.budget} x={540} y={980} size={380} from="top" mono={false} />
        <Obj name="fire" t={t} at={L.wrongThing - 0.2} x={540} y={1120} size={260} from="scale" mono={false} />
        {t >= L.wrongThing + 0.3 ? (
          <div style={{ position: "absolute", left: 540, top: 1400, transform: `translate(-50%,-50%) rotate(-7deg) scale(${lerp(2.2, 1, p(t, L.wrongThing + 0.3, 0.28, OUT))})`, padding: "10px 30px", border: `7px solid ${RED}`, borderRadius: 14,
            fontFamily: DISPLAY, fontWeight: 900, fontSize: 72, letterSpacing: "0.04em", color: "#fff", background: RED, whiteSpace: "nowrap", boxShadow: `0 0 50px ${RED}` }}>THE WRONG THING</div>
        ) : null}
      </div>
    </LS>
  );
};

// 14 — "আপনার বিজনেস এর জন্যে এই রকম একটা সিস্টেম বানাতে চাইলে DM করুন “Lead”।"
export const L14: S = ({ start }) => {
  const t = useT(start);
  const typedLead = "Lead".slice(0, Math.round(4 * p(t, L.dm + 0.2, 0.7, (x) => x)));
  return (
    <LS t={t} curve={2}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 230 }}>
        <KLine t={t} dark size={54} words={[{ w: "Want this system", at: L.cta, s: 0.9, wt: 800 }]} />
        <KLine t={t} dark size={54} style={{ marginTop: 8 }} words={[{ w: "for your business?", at: 67.4, s: 0.9, wt: 600 }]} />
      </div>
      <Pop t={t} at={67.0} x={540} y={960} from="bottom">
        <div style={{ transform: "scale(0.78)" }}>
          <Phone w={380}>
            <div style={{ position: "absolute", inset: 0, background: "#000", fontFamily: `"Inter",sans-serif`, color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "50px 16px 14px", borderBottom: "1px solid #222" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${RED}, #6d0014)`, display: "grid", placeItems: "center", fontWeight: 800 }}>F</div>
                <div><div style={{ fontWeight: 800, fontSize: 17 }}>Fahad</div><div style={{ fontSize: 13, opacity: 0.6 }}>Digital Marketing · Strategy</div></div>
              </div>
              <div style={{ position: "absolute", right: 16, bottom: 130, padding: "12px 22px", borderRadius: 22, background: "linear-gradient(135deg,#7a2cff,#e3122f)", fontWeight: 800, fontSize: 26, opacity: p(t, L.leadWord, 0.2) }}>Lead</div>
              <div style={{ position: "absolute", left: 14, right: 14, bottom: 50, height: 52, borderRadius: 26, border: "1px solid #333", display: "flex", alignItems: "center", padding: "0 18px", fontSize: 20 }}>
                {t < L.leadWord ? typedLead : ""}<span style={{ opacity: t < L.leadWord ? (Math.floor(t * 3) % 2) : 0 }}>|</span><span style={{ marginLeft: "auto", color: "#3897f0", fontWeight: 800, fontSize: 18 }}>Send</span>
              </div>
            </div>
          </Phone>
        </div>
      </Pop>
      <Pop t={t} at={L.dm} x={540} y={1430} from="scale"><div style={{ display: "flex", alignItems: "center", gap: 16 }}><Logo name="instagram" size={56} color="#fff" /><Pill size={44}>DM “LEAD”</Pill></div></Pop>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1540, textAlign: "center", fontFamily: DISPLAY, fontWeight: 900, fontSize: 30, letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)", opacity: p(t, 69.8, 0.3) }}>FAHAD · DIGITAL MARKETING</div>
    </LS>
  );
};
