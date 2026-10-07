/**
 * LEAD SIGNAL v2 — 9:16 scenes. Reference: black set + soft edge glow, typewriter text synced to the voice,
 * highlight boxes behind key words, one hero visual per beat (3D object / product UI). No captions; no shapes under text:
 * text lives in the top zone (y 200–640, grid masked out), visuals live below it.
 */
import { Img, random, staticFile } from "remotion";
import { AppTile, DISPLAY, Logo, Obj, Phone, Pop, shake } from "../../brand/kinetic/Kinetic";
import { drawn, IN_OUT, lerp, OUT, p, useT } from "../../brand";
import { L } from "./data";

type S = React.FC<{ start: number }>;
export const RED = "#E3122F";
const W = 1080;
const UI = `"Inter",sans-serif`;

// ───────────── set ─────────────
const BG: React.FC<{ t: number; children: React.ReactNode }> = ({ t, children }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#050405" }}>
    <div style={{ position: "absolute", left: -380 + Math.sin(t * 0.5) * 40, top: 980 + Math.cos(t * 0.4) * 60, width: 760, height: 900, background: `radial-gradient(closest-side, ${RED}55, transparent)` }} />
    <div style={{ position: "absolute", right: -380 + Math.cos(t * 0.45) * 40, top: -260 + Math.sin(t * 0.5) * 50, width: 760, height: 820, background: `radial-gradient(closest-side, ${RED}40, transparent)` }} />
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "90px 90px",
      maskImage: "linear-gradient(180deg, transparent 0%, transparent 36%, #000 58%, #000 100%)", WebkitMaskImage: "linear-gradient(180deg, transparent 0%, transparent 36%, #000 58%, #000 100%)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 54, textAlign: "center", fontFamily: DISPLAY, fontWeight: 900, fontSize: 26, letterSpacing: "0.32em", color: "rgba(255,255,255,0.85)" }}>FAHAD<span style={{ color: RED }}> •</span></div>
    {children}
  </div>
);

// ───────────── text (top zone) ─────────────
const Top: React.FC<{ children: React.ReactNode; top?: number }> = ({ children, top = 200 }) => (
  <div style={{ position: "absolute", left: 50, right: 50, top, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>{children}</div>
);
const typed = (t: number, at: number, text: string, cps: number) => Math.max(0, Math.min(text.length, Math.floor((t - at) * cps)));
const Caret: React.FC<{ show: boolean; h: number }> = ({ show, h }) => (
  <span style={{ display: "inline-block", width: Math.max(3, h * 0.05), height: h * 0.82, marginLeft: 4, marginRight: -4 - Math.max(3, h * 0.05), verticalAlign: "-0.08em", background: "#fff", opacity: show ? 1 : 0 }} />
);
/** Typewriter line. The untyped remainder is laid out invisibly so nothing reflows while typing. */
const TW: React.FC<{ t: number; at: number; text: string; size?: number; v?: "lite" | "bold" | "red" | "label"; cps?: number }> = ({ t, at, text, size = 58, v = "lite", cps = 28 }) => {
  const n = typed(t, at, text, cps);
  const typing = t >= at && n < text.length;
  const st: React.CSSProperties = {
    lite: { fontWeight: 500, fontStyle: "italic", color: "rgba(255,255,255,0.88)" },
    bold: { fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" },
    red: { fontWeight: 900, color: RED, letterSpacing: "-0.01em", textShadow: `0 0 30px ${RED}66` },
    label: { fontWeight: 800, color: RED, letterSpacing: "0.28em" },
  }[v];
  return (
    <div style={{ fontFamily: DISPLAY, fontSize: size, lineHeight: 1.08, whiteSpace: "nowrap", ...st }}>
      <span>{text.slice(0, n)}</span><Caret show={typing || (n === text.length && t < at + text.length / cps + 0.5 && Math.floor(t * 4) % 2 === 0)} h={size} /><span style={{ opacity: 0 }}>{text.slice(n)}</span>
    </div>
  );
};
/** Red highlight box wipes in from the left, then the word types in white on top of it. */
const HL: React.FC<{ t: number; at: number; text: string; size?: number }> = ({ t, at, text, size = 104 }) => {
  const k = p(t, at, 0.24, OUT);
  return (
    <div style={{ position: "relative", padding: `${size * 0.06}px ${size * 0.26}px`, fontFamily: DISPLAY }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: size * 0.14, background: RED, transform: `scaleX(${k})`, transformOrigin: "left", boxShadow: k > 0 ? `0 0 ${50 * k}px ${RED}88` : undefined }} />
      <div style={{ position: "relative" }}><TW t={t} at={at + 0.12} text={text} size={size} v="bold" cps={34} /></div>
    </div>
  );
};
/** Slam word: lands from big + blurred. */
const Punch: React.FC<{ t: number; at: number; text: string; size?: number; red?: boolean }> = ({ t, at, text, size = 150, red = true }) => {
  const k = p(t, at, 0.3, OUT);
  return (
    <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: size, lineHeight: 1, letterSpacing: "-0.02em", color: red ? RED : "#fff", whiteSpace: "nowrap", opacity: t < at ? 0 : Math.min(1, k * 2),
      transform: `scale(${lerp(1.5, 1, k)})`, filter: `blur(${(1 - k) * 14}px)`, textShadow: red ? `0 0 50px ${RED}77` : undefined }}>{text}</div>
  );
};

// ───────────── visuals ─────────────
const Card: React.FC<{ children: React.ReactNode; w?: number; style?: React.CSSProperties }> = ({ children, w = 940, style }) => (
  <div style={{ width: w, boxSizing: "border-box", padding: "30px 34px", borderRadius: 30, background: "linear-gradient(180deg,#171415,#0d0b0c)", border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 40px 90px rgba(0,0,0,0.6)", fontFamily: UI, color: "#fff", ...style }}>{children}</div>
);
const Icon3D: React.FC<{ name: string; size?: number; mono?: boolean }> = ({ name, size = 90, mono = false }) => (
  <Img src={staticFile(`broad-sharp-v2/3d/${name}.png`)} style={{ width: size, height: size, flex: "none", filter: name.startsWith("bust") ? "grayscale(1) invert(0.92) contrast(1.1)" : mono ? "grayscale(1) contrast(1.15) brightness(1.1)" : undefined }} />
);
const Tag: React.FC<{ children: React.ReactNode; red?: boolean; size?: number; ok?: boolean }> = ({ children, red, size = 24, ok }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: `${size * 0.32}px ${size * 0.7}px`, borderRadius: 999, whiteSpace: "nowrap", fontFamily: UI, fontWeight: 800, fontSize: size,
    background: red ? RED : ok ? "rgba(46,204,113,0.16)" : "rgba(255,255,255,0.1)", color: ok ? "#45e08a" : "#fff", border: ok ? "1px solid rgba(69,224,138,0.5)" : "1px solid rgba(255,255,255,0.14)" }}>{children}</span>
);
const Row: React.FC<{ t: number; at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ t, at, children, style }) => {
  const k = p(t, at, 0.35, OUT);
  return <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: k, transform: `translateX(${(1 - k) * 40}px)`, ...style }}>{children}</div>;
};
const Toggle: React.FC<{ on: number }> = ({ on }) => (
  <div style={{ width: 92, height: 50, borderRadius: 25, background: on > 0.5 ? "#2e7dff" : "#3a3a3a", position: "relative", flex: "none" }}>
    <div style={{ position: "absolute", top: 5, left: lerp(5, 47, on), width: 40, height: 40, borderRadius: 20, background: "#fff" }} />
  </div>
);
const Toast: React.FC<{ name: string }> = ({ name }) => (
  <div style={{ width: 640, display: "flex", alignItems: "center", gap: 18, padding: "20px 24px", borderRadius: 28, background: "rgba(38,34,36,0.96)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 24px 50px rgba(0,0,0,0.55)", fontFamily: UI, color: "#fff" }}>
    <div style={{ width: 64, height: 64, borderRadius: 16, background: "#fff", display: "grid", placeItems: "center", flex: "none" }}><Logo name="meta" size={40} /></div>
    <div><div style={{ fontSize: 26, fontWeight: 800 }}>New lead 🔔</div><div style={{ fontSize: 21, opacity: 0.7 }}>{name} submitted your form</div></div>
    <span style={{ marginLeft: "auto", fontSize: 18, opacity: 0.5 }}>now</span>
  </div>
);
const Wire: React.FC<{ t: number; at: number; d: string }> = ({ t, at, d }) => {
  const dd = drawn(d, t, at, 0.5);
  return (
    <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
      <path d={d} fill="none" stroke={RED} strokeWidth={5} strokeDasharray={dd.strokeDasharray} strokeDashoffset={dd.strokeDashoffset} />
      {t > at + 0.5 ? <path d={d} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="12 34" strokeDashoffset={-t * 140} /> : null}
    </svg>
  );
};

// ═════════════ scenes ═════════════

// 0.0 — "আপনার অ্যাড থেকে প্রতিদিন লিড আসছে।"
export const V01: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top>
        <TW t={t} at={0.1} text="Your ads bring in" />
        <HL t={t} at={L.leads - 0.05} text="LEADS" size={130} />
        <TW t={t} at={1.8} text="every single day" cps={34} />
      </Top>
      <Pop t={t} at={0.05} x={540} y={1260} from="bottom">
        <div style={{ transform: "perspective(1600px) rotateY(-14deg) rotateX(8deg) rotate(-3deg)" }}>
          <Phone w={400}><div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#2a0a10,#0b0809)" }} /></Phone>
        </div>
      </Pop>
      {["Rahim", "Nusrat", "Karim"].map((n, i) => (
        <Pop key={n} t={t} at={0.45 + i * 0.5} x={540} y={980 + i * 150} from="top" dur={0.4}><Toast name={n} /></Pop>
      ))}
    </BG>
  );
};

// 2.3 — "কিন্তু এর মধ্যে কে আসলে কিনল,"
export const V02: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={240}>
        <TW t={t} at={2.4} text="But who actually" />
        <HL t={t} at={L.bought - 0.1} text="BOUGHT?" size={140} />
      </Top>
      <Obj name="credit_card" t={t} at={2.45} x={540} y={1180} size={560} from="bottom" mono={false} />
      <Pop t={t} at={L.bought + 0.15} x={800} y={950} from="scale">
        <div style={{ width: 150, height: 150, borderRadius: "50%", background: RED, display: "grid", placeItems: "center", fontFamily: DISPLAY, fontWeight: 900, fontSize: 100, color: "#fff", boxShadow: `0 0 60px ${RED}` }}>?</div>
      </Pop>
    </BG>
  );
};

// 4.45 — "সেটা Meta বা Google কেউই জানে না।"
export const V03: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={220}>
        <div style={{ display: "flex", gap: 30 }}><TW t={t} at={L.meta - 0.05} text="Meta?" v="bold" size={84} /><TW t={t} at={L.google - 0.05} text="Google?" v="bold" size={84} /></div>
        <HL t={t} at={L.neither} text="NEITHER KNOWS." size={92} />
      </Top>
      {[{ n: "meta" as const, at: L.meta, x: 300 }, { n: "googleads" as const, at: L.google, x: 780 }].map((g) => (
        <Pop key={g.n} t={t} at={g.at} x={g.x} y={1150} from="scale">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
            <AppTile name={g.n} size={330} label={false} />
            <div style={{ opacity: p(t, L.neither + 0.3, 0.3) }}><Tag red size={30}>✕ Buyer unknown</Tag></div>
          </div>
        </Pop>
      ))}
    </BG>
  );
};

// 6.55 — "Meta আর Google দেখে কে ফর্ম পূরণ করল।"
export const V04: S = ({ start }) => {
  const t = useT(start);
  const done = p(t, L.form + 0.15, 0.25);
  const cx = lerp(900, 560, p(t, 7.3, 0.6, IN_OUT)), cy = lerp(1700, 1530, p(t, 7.3, 0.6, IN_OUT));
  return (
    <BG t={t}>
      <Top top={230}>
        <TW t={t} at={6.65} text="They only see who" />
        <HL t={t} at={7.45} text="FILLED THE FORM" size={86} />
      </Top>
      <Pop t={t} at={6.6} x={540} y={1180} from="bottom">
        <Card w={760}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}><Logo name="meta" size={44} /><span style={{ fontSize: 30, fontWeight: 800 }}>Instant Form</span><span style={{ marginLeft: "auto" }}><Tag>Lead ad</Tag></span></div>
          {[["Full name", "Rahim Uddin"], ["Phone number", "01X-XXXX-XXXX"], ["City", "Dhaka"]].map(([k, v], i) => (
            <div key={k} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 20, opacity: 0.6, fontWeight: 700, marginBottom: 8 }}>{k}</div>
              <div style={{ height: 62, borderRadius: 14, border: "2px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", padding: "0 18px", fontSize: 26 }}>{v.slice(0, typed(t, 6.75 + i * 0.25, v, 40))}</div>
            </div>
          ))}
          <div style={{ marginTop: 12, height: 78, borderRadius: 16, background: done > 0.5 ? "#1f9d55" : "#2e7dff", display: "grid", placeItems: "center", fontSize: 30, fontWeight: 800, transform: `scale(${1 - Math.sin(done * Math.PI) * 0.05})` }}>{done > 0.5 ? "✓ Submitted" : "Submit"}</div>
        </Card>
      </Pop>
      <svg width={60} height={60} viewBox="0 0 24 24" style={{ position: "absolute", left: cx, top: cy, opacity: p(t, 7.2, 0.2) * (1 - p(t, 8.5, 0.2)) }}><path d="M4 2 L4 20 L9 15 L12 22 L15 21 L12 14 L19 14 Z" fill="#fff" stroke="#000" strokeWidth={1.2} /></svg>
    </BG>
  );
};

// 9.0 — "কিন্তু তারপর?"
export const V05: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={260}>
        <TW t={t} at={L.thenWhat - 0.05} text="But" v="bold" size={80} />
        <HL t={t} at={L.thenWhat + 0.15} text="THEN WHAT?" size={120} />
      </Top>
      <Obj name="thinking_face" t={t} at={9.05} x={540} y={1180} size={620} from="scale" mono={false} />
    </BG>
  );
};

// 10.05 — "কে ফোন ধরল, কে মিটিংয়ে এল, কে টাকা দিল,"
const AFTER = [{ i: "mobile_phone", l: "Who picked up the call?", at: L.phone }, { i: "busts_in_silhouette", l: "Who came to the meeting?", at: L.meeting }, { i: "money_bag", l: "Who actually paid?", at: L.paid }];
export const V06: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <div style={{ position: "absolute", left: 60, right: 60, top: 330, display: "flex", flexDirection: "column", gap: 70 }}>
        {AFTER.map((a, i) => {
          const k = p(t, a.at - 0.1, 0.4, OUT);
          const hot = i === 2;
          return (
            <div key={a.l} style={{ display: "flex", alignItems: "center", gap: 34, opacity: Math.min(1, k * 1.5), transform: `translateX(${(1 - k) * 160}px)` }}>
              <div style={{ width: 260, height: 260, borderRadius: 44, flex: "none", display: "grid", placeItems: "center", background: hot ? RED : "#141112", border: `3px solid ${RED}`, boxShadow: hot ? `0 0 60px ${RED}99` : undefined }}>
                <Icon3D name={a.i} size={190} />
              </div>
              <div style={{ whiteSpace: "normal", width: 600 }}><TWWrap t={t} at={a.at} text={a.l} red={hot} /></div>
            </div>
          );
        })}
      </div>
    </BG>
  );
};
/** Wrapping typewriter (for two-line labels inside rows). */
const TWWrap: React.FC<{ t: number; at: number; text: string; red?: boolean; size?: number }> = ({ t, at, text, red, size = 62 }) => {
  const n = typed(t, at, text, 30);
  return (
    <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: size, lineHeight: 1.1, color: red ? RED : "#fff", textAlign: "left" }}>
      <span>{text.slice(0, n)}</span><span style={{ opacity: 0 }}>{text.slice(n)}</span>
    </div>
  );
};

// 13.05 — "এই আসল রেজাল্টটা হয় অফলাইনে।"
export const V07: S = ({ start }) => {
  const t = useT(start);
  const off = [{ i: "mobile_phone", l: "Phone call" }, { i: "busts_in_silhouette", l: "Meeting" }, { i: "money_bag", l: "Payment" }];
  return (
    <BG t={t}>
      <Top top={220}>
        <TW t={t} at={L.real - 0.2} text="The real result happens" size={56} />
        <Punch t={t} at={L.offline - 0.05} text="OFFLINE" size={170} />
      </Top>
      <Pop t={t} at={13.2} x={540} y={1230} from="bottom">
        <div style={{ display: "flex", gap: 24 }}>
          <Card w={380} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "0.2em", opacity: 0.7 }}>ONLINE</div>
            <Icon3D name="clipboard" size={170} />
            <div style={{ fontSize: 30, fontWeight: 800, margin: "10px 0 20px" }}>Form submit</div>
            <Tag ok>✓ Tracked</Tag>
          </Card>
          <Card w={520} style={{ border: `2px solid ${RED}`, background: "linear-gradient(180deg,#2a0b11,#120a0c)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "0.2em", color: RED, textAlign: "center", marginBottom: 14 }}>OFFLINE</div>
            {off.map((o, i) => (
              <Row key={o.l} t={t} at={13.5 + i * 0.3} style={{ margin: "10px 0" }}><Icon3D name={o.i} size={72} /><span style={{ fontSize: 32, fontWeight: 800 }}>{o.l}</span></Row>
            ))}
            <div style={{ textAlign: "center", marginTop: 16, opacity: p(t, L.offline + 0.3, 0.3) }}><Tag red>✕ Not tracked</Tag></div>
          </Card>
        </div>
      </Pop>
    </BG>
  );
};

// 15.2 — "আর সেটা দুই প্ল্যাটফর্মের কেউই দেখতে পায় না।"
export const V08: S = ({ start }) => {
  const t = useT(start);
  const slash = p(t, 16.6, 0.3, OUT);
  return (
    <BG t={t}>
      <Top top={230}>
        <TW t={t} at={15.35} text="Meta & Google" v="bold" size={80} />
        <HL t={t} at={16.2} text="CAN'T SEE IT" size={110} />
      </Top>
      <Pop t={t} at={15.4} x={330} y={900} from="left"><AppTile name="meta" size={220} label={false} /></Pop>
      <Pop t={t} at={15.55} x={750} y={900} from="right"><AppTile name="googleads" size={220} label={false} /></Pop>
      <Obj name="eyes" t={t} at={15.8} x={540} y={1360} size={440} from="scale" mono={false} />
      <div style={{ position: "absolute", left: 300, top: 1350, width: 480, height: 26, borderRadius: 13, background: RED, transform: `rotate(-24deg) scaleX(${slash})`, boxShadow: `0 0 40px ${RED}` }} />
    </BG>
  );
};

// 17.85 — "যেহেতু ওরা শুধু ফর্ম সাবমিটকেই সাফল্য ধরে,"
export const V09: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={210}>
        <TW t={t} at={18.0} text="They only count" />
        <HL t={t} at={L.formOnly} text="FORM SUBMIT" size={104} />
        <TW t={t} at={L.success - 0.05} text="as SUCCESS ✓" v="red" size={78} cps={30} />
      </Top>
      <Pop t={t} at={18.0} x={540} y={1240} from="bottom">
        <Card w={900}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}><Logo name="meta" size={40} /><span style={{ fontSize: 28, fontWeight: 800 }}>Ads Manager · Campaign</span></div>
          {[["Optimising for", "Leads (form)", 18.4], ["What counts as a result", "Form submitted", 18.9], ["Status", "✓ Success", L.success]].map(([k, v, at]) => (
            <Row key={k as string} t={t} at={at as number} style={{ justifyContent: "space-between", padding: "18px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: 26, opacity: 0.65, fontWeight: 600 }}>{k}</span>
              {v === "✓ Success" ? <Tag ok size={28}>✓ Success</Tag> : <span style={{ fontSize: 28, fontWeight: 800 }}>{v}</span>}
            </Row>
          ))}
        </Card>
      </Pop>
      <Obj name="check_mark_button" t={t} at={L.success + 0.1} x={900} y={1000} size={190} from="spin" mono={false} />
    </BG>
  );
};

// 20.25 — "তাই সবচেয়ে সহজে যে মানুষ ফর্ম পূরণ করে, তাদেরই খুঁজে আনে।"
export const V10: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={220}>
        <TW t={t} at={20.4} text="So they bring you the" />
        <HL t={t} at={L.easiest - 0.05} text="EASIEST" size={120} />
        <TW t={t} at={22.0} text="form-fillers" v="bold" size={70} />
      </Top>
      <Obj name="clipboard" t={t} at={20.4} x={540} y={1200} size={400} from="scale" mono={false} />
      {Array.from({ length: 14 }, (_, i) => {
        const at = L.easiest + i * 0.15;
        const k = p(t, at, 0.9, IN_OUT);
        const left = random(`ex${i}`) > 0.5;
        const sx = left ? -60 : 1140, sy = 820 + random(`ey${i}`) * 900;
        return <div key={i} style={{ position: "absolute", left: lerp(sx, 540, k), top: lerp(sy, 1200, k), transform: `translate(-50%,-50%) scale(${lerp(1, 0.25, k)})`, opacity: (t > at ? 1 : 0) * (1 - p(t, at + 0.8, 0.15)) }}><Icon3D name="bust_in_silhouette" size={130} mono /></div>;
      })}
      <Pop t={t} at={22.6} x={540} y={1520} from="scale"><Tag red size={34}>Easy click · low intent</Tag></Pop>
    </BG>
  );
};

// 23.85 — "লিড সংখ্যা বাড়ে, কিন্তু কোয়ালিটি কমতে থাকে।"
export const V11: S = ({ start }) => {
  const t = useT(start);
  const up = "M 0 360 C 160 340, 300 250, 420 190 S 700 40, 820 20";
  const dn = "M 0 60 C 180 80, 320 170, 460 230 S 700 340, 820 380";
  const du = drawn(up, t, 24.1, 1.1), dd = drawn(dn, t, L.qualityDown, 1.1);
  return (
    <BG t={t}>
      <Top top={230}>
        <TW t={t} at={23.98} text="Leads ↑" v="bold" size={110} cps={20} />
        <HL t={t} at={L.qualityDown - 0.05} text="QUALITY ↓" size={110} />
      </Top>
      <Pop t={t} at={23.9} x={540} y={1240} from="bottom">
        <Card w={940}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
            <span style={{ fontSize: 28, fontWeight: 800 }}>Campaign report</span><span style={{ fontSize: 20, opacity: 0.5 }}>Last 28 days</span>
            <span style={{ marginLeft: "auto", display: "flex", gap: 10 }}><Tag>● Leads</Tag><Tag red>● Lead quality</Tag></span>
          </div>
          <svg width={872} height={420} viewBox="-26 -10 872 420">
            {[0, 1, 2, 3, 4].map((g) => <line key={g} x1={0} x2={820} y1={g * 95} y2={g * 95} stroke="rgba(255,255,255,0.08)" />)}
            <path d={up} fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" strokeDasharray={du.strokeDasharray} strokeDashoffset={du.strokeDashoffset} />
            <path d={dn} fill="none" stroke={RED} strokeWidth={8} strokeLinecap="round" strokeDasharray={dd.strokeDasharray} strokeDashoffset={dd.strokeDashoffset} style={{ filter: `drop-shadow(0 0 10px ${RED})` }} />
          </svg>
        </Card>
      </Pop>
    </BG>
  );
};

// 26.35 — "আর আপনার সেলস টিম সারাদিন ভুল নাম্বারে ফোন করে।"
export const V12: S = ({ start }) => {
  const t = useT(start);
  const [sx, sy] = shake(t, L.wrong, 14);
  const wrong = t >= L.wrong + 0.1;
  return (
    <BG t={t}>
      <Top top={210}>
        <TW t={t} at={26.5} text="Your sales team spends" size={54} cps={32} />
        <TW t={t} at={27.3} text="all day calling" size={54} cps={30} />
        <HL t={t} at={L.wrong - 0.05} text="WRONG NUMBERS" size={92} />
      </Top>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sx}px,${sy}px)` }}>
        <Pop t={t} at={26.45} x={540} y={1270} from="bottom">
          <Phone w={360}>
            <div style={{ position: "absolute", inset: 0, background: wrong ? "linear-gradient(180deg,#3a0710,#120709)" : "linear-gradient(180deg,#1d2a22,#0a0f0c)", fontFamily: UI, color: "#fff", textAlign: "center", paddingTop: 110 }}>
              <div style={{ width: 120, height: 120, borderRadius: "50%", margin: "0 auto", background: "#333", display: "grid", placeItems: "center" }}><Icon3D name="bust_in_silhouette" size={90} mono /></div>
              <div style={{ fontSize: 30, fontWeight: 800, marginTop: 20 }}>New lead</div>
              <div style={{ fontSize: 22, opacity: 0.7, marginTop: 8 }}>{wrong ? "Wrong number" : `Calling${".".repeat(1 + (Math.floor(t * 3) % 3))}`}</div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 90, display: "flex", justifyContent: "center" }}>
                <div style={{ width: 96, height: 96, borderRadius: "50%", background: RED, display: "grid", placeItems: "center", fontSize: 46 }}>✕</div>
              </div>
            </div>
          </Phone>
        </Pop>
        {["Not interested", "Wrong number", "Just checking price"].map((c, i) => (
          <Pop key={c} t={t} at={L.wrong + 0.1 + i * 0.28} x={[200, 880, 210][i]} y={[1000, 1220, 1480][i]} from="scale"><Tag red size={26}>✕ {c}</Tag></Pop>
        ))}
      </div>
    </BG>
  );
};

// 29.35 — "আমি এর জন্য একটা সিস্টেম বানাই, তিন ধাপে।"
export const V13: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={230}>
        <TW t={t} at={29.5} text="So I build a" />
        <Punch t={t} at={L.system - 0.05} text="SYSTEM" size={160} />
      </Top>
      <Obj name="gear" t={t} at={29.6} x={540} y={980} size={380} from="spin" mono={false} rot={t * 40} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1300, display: "flex", justifyContent: "center", gap: 24 }}>
        {["Track", "Record", "Send back"].map((s, i) => {
          const k = p(t, L.threeSteps + i * 0.14, 0.4, OUT);
          return (
            <div key={s} style={{ width: 290, padding: "26px 0", borderRadius: 30, textAlign: "center", background: i === 2 ? RED : "#141112", border: `3px solid ${RED}`, opacity: k, transform: `translateY(${(1 - k) * 80}px)`, fontFamily: DISPLAY, color: "#fff" }}>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "0.2em", opacity: 0.75 }}>STEP</div>
              <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 1 }}>{i + 1}</div>
              <div style={{ fontSize: 32, fontWeight: 800, marginTop: 6 }}>{s}</div>
            </div>
          );
        })}
      </div>
    </BG>
  );
};

// 31.8 — "এক, ট্র্যাকিং ঠিক করা:"
export const V14: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={240}>
        <TW t={t} at={L.one} text="STEP 01" v="label" size={40} />
        <HL t={t} at={L.tracking - 0.05} text="FIX THE TRACKING" size={88} />
      </Top>
      {[0, 1, 2].map((r) => {
        const k = ((t - 32 + r * 0.5) % 1.5) / 1.5;
        return t > 32 ? <div key={r} style={{ position: "absolute", left: 540, top: 1200, width: 300 + k * 600, height: 300 + k * 600, borderRadius: "50%", border: `3px solid ${RED}`, opacity: 1 - k, transform: "translate(-50%,-50%)" }} /> : null;
      })}
      <Obj name="satellite_antenna" t={t} at={31.9} x={540} y={1200} size={500} from="scale" mono={false} />
    </BG>
  );
};

// 33.45 — "Meta-তে Pixel-এর সাথে Conversions API, আর Google-এ Enhanced Conversions,"
export const V15: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={190}>
        <TW t={t} at={33.55} text="META" v="label" size={34} />
        <TW t={t} at={L.pixel - 0.05} text="Pixel + Conversions API" v="bold" size={64} cps={30} />
        <TW t={t} at={L.googleEC - 0.1} text="GOOGLE" v="label" size={34} />
        <HL t={t} at={L.enhanced - 0.15} text="Enhanced Conversions" size={70} />
      </Top>
      <Pop t={t} at={33.6} x={540} y={980} from="bottom">
        <Card w={940}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}><Logo name="meta" size={44} /><span style={{ fontSize: 30, fontWeight: 800 }}>Events Manager</span><span style={{ marginLeft: "auto" }}><Tag>Lead dataset</Tag></span></div>
          <Row t={t} at={L.pixel} style={{ padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}><span style={{ fontSize: 34 }}>🌐</span><span style={{ fontSize: 28, fontWeight: 800 }}>Browser · Meta Pixel</span><span style={{ marginLeft: "auto" }}><Tag ok>✓ Active</Tag></span></Row>
          <Row t={t} at={L.capi} style={{ padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}><span style={{ fontSize: 34 }}>🖥️</span><span style={{ fontSize: 28, fontWeight: 800 }}>Server · Conversions API</span><span style={{ marginLeft: "auto" }}><Tag ok>✓ Active</Tag></span></Row>
          <Row t={t} at={35.6} style={{ padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}><span style={{ fontSize: 34 }}>🔗</span><span style={{ fontSize: 26, fontWeight: 700, opacity: 0.8 }}>Same event, both sources</span><span style={{ marginLeft: "auto" }}><Tag red>Deduplicated</Tag></span></Row>
        </Card>
      </Pop>
      <Pop t={t} at={L.googleEC} x={540} y={1470} from="bottom">
        <Card w={940}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Logo name="googleads" size={50} />
            <div><div style={{ fontSize: 28, fontWeight: 800 }}>Enhanced conversions for leads</div><div style={{ fontSize: 22, opacity: 0.6, marginTop: 4 }}>Hashed lead data · matched to clicks</div></div>
            <span style={{ marginLeft: "auto" }}><Toggle on={p(t, L.enhanced, 0.25)} /></span>
          </div>
        </Card>
      </Pop>
    </BG>
  );
};

// 38.0 — "যাতে কোনো লিডের ডেটা হারিয়ে না যায়।"
export const V16: S = ({ start }) => {
  const t = useT(start);
  const chips = [{ l: "Name ✓", x: 210, y: 960 }, { l: "Phone ✓", x: 870, y: 1010 }, { l: "Email ✓", x: 200, y: 1440 }, { l: "Lead ID ✓", x: 870, y: 1480 }];
  return (
    <BG t={t}>
      <Top top={240}>
        <TW t={t} at={38.15} text="So no lead data" />
        <HL t={t} at={38.85} text="EVER GETS LOST" size={96} />
      </Top>
      <Obj name="locked" t={t} at={38.1} x={540} y={1220} size={460} from="scale" mono={false} />
      {chips.map((c, i) => <Pop key={c.l} t={t} at={38.5 + i * 0.22} x={c.x} y={c.y} from="scale"><Tag ok size={32}>{c.l}</Tag></Pop>)}
    </BG>
  );
};

// 40.1 — "দুই, প্রতিটা লিডের যাত্রা ট্র্যাক করা:"
export const V17: S = ({ start }) => {
  const t = useT(start);
  const d = "M 120 1700 C 120 1450, 520 1560, 540 1320 S 960 1180, 940 900";
  const dd = drawn(d, t, 41.0, 1.3);
  const pins = [{ x: 120, y: 1660, at: 41.0 }, { x: 540, y: 1320, at: 41.5 }, { x: 940, y: 920, at: 42.1 }];
  return (
    <BG t={t}>
      <Top top={230}>
        <TW t={t} at={L.two} text="STEP 02" v="label" size={40} />
        <TW t={t} at={40.85} text="Track every lead's" v="bold" size={70} />
        <HL t={t} at={L.journey - 0.05} text="JOURNEY" size={120} />
      </Top>
      <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
        <path d={d} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={6} strokeDasharray="2 18" strokeLinecap="round" style={{ clipPath: "none" }} opacity={dd.strokeDasharray ? 1 : 0} />
        <path d={d} fill="none" stroke={RED} strokeWidth={8} strokeDasharray={dd.strokeDasharray} strokeDashoffset={dd.strokeDashoffset} />
      </svg>
      {pins.map((pp, i) => <Obj key={i} name={i === 2 ? "money_bag" : "round_pushpin"} t={t} at={pp.at} x={pp.x} y={pp.y - 60} size={i === 2 ? 220 : 150} from="top" mono={false} />)}
    </BG>
  );
};

// 42.55 — "কোন লিড ভালো, কে মিটিংয়ে এল, কে কিনল, সব রেকর্ড থাকে।"
const STAGES = [{ l: "New", at: 0 }, { l: "Qualified", at: L.good }, { l: "Meeting", at: L.meeting2 }, { l: "Purchased", at: L.bought2 }];
export const V18: S = ({ start }) => {
  const t = useT(start);
  const st = STAGES.filter((s) => t >= s.at).pop()!;
  const others = [["Nusrat", "Wrong number", true], ["Karim", "Qualified", false], ["Tania", "Meeting", false]] as const;
  return (
    <BG t={t}>
      <Top top={200}>
        <div style={{ display: "flex", gap: 18 }}>
          <TW t={t} at={L.good - 0.05} text="Qualified →" v="bold" size={50} />
          <TW t={t} at={L.meeting2 - 0.05} text="Meeting →" v="bold" size={50} />
          <TW t={t} at={L.bought2 - 0.05} text="Bought" v="red" size={50} />
        </div>
        <HL t={t} at={L.record - 0.05} text="ALL RECORDED" size={104} />
      </Top>
      <Pop t={t} at={42.6} x={540} y={1180} from="bottom">
        <Card w={960}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}><Icon3D name="clipboard" size={50} /><span style={{ fontSize: 30, fontWeight: 800 }}>CRM · Lead pipeline</span></div>
          <div style={{ display: "flex", fontSize: 20, fontWeight: 700, opacity: 0.5, padding: "10px 0" }}><span style={{ width: 260 }}>LEAD</span><span>STATUS</span></div>
          <div style={{ display: "flex", alignItems: "center", padding: "20px 18px", borderRadius: 18, margin: "0 -18px", border: `2px solid ${st.l === "Purchased" ? RED : "rgba(255,255,255,0.12)"}`, background: st.l === "Purchased" ? "rgba(227,18,47,0.16)" : "rgba(255,255,255,0.04)" }}>
            <span style={{ width: 260, fontSize: 30, fontWeight: 800 }}>Rahim</span>
            <span style={{ display: "flex", gap: 10 }}>{STAGES.slice(1).map((s) => <span key={s.l} style={{ opacity: t >= s.at ? 1 : 0.2 }}>{s.l === "Purchased" ? <Tag red size={22}>{s.l} ✓</Tag> : <Tag ok size={22}>{s.l} ✓</Tag>}</span>)}</span>
          </div>
          {others.map(([n, s, bad], i) => (
            <Row key={n} t={t} at={42.8 + i * 0.2} style={{ padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ width: 242, fontSize: 28, fontWeight: 700, opacity: 0.85 }}>{n}</span>{bad ? <Tag size={22}>✕ {s}</Tag> : <Tag ok size={22}>{s} ✓</Tag>}
            </Row>
          ))}
        </Card>
      </Pop>
    </BG>
  );
};

// 46.75 — "তিন, সেই আসল রেজাল্ট আবার প্ল্যাটফর্মে ফেরত পাঠানো:"
export const V19: S = ({ start }) => {
  const t = useT(start);
  const rise = p(t, L.sendBack, 0.9, IN_OUT);
  return (
    <BG t={t}>
      <Top top={200}>
        <TW t={t} at={L.three} text="STEP 03" v="label" size={40} />
        <TW t={t} at={47.7} text="Send the real result" v="bold" size={66} />
        <HL t={t} at={L.sendBack - 0.1} text="BACK" size={120} />
      </Top>
      <Pop t={t} at={L.platform - 0.1} x={300} y={900} from="top"><AppTile name="meta" size={220} label={false} /></Pop>
      <Pop t={t} at={L.platform + 0.1} x={780} y={900} from="top"><AppTile name="googleads" size={220} label={false} /></Pop>
      <Wire t={t} at={L.sendBack} d="M 470 1420 C 470 1200, 300 1180, 300 1030" />
      <Wire t={t} at={L.sendBack + 0.15} d="M 610 1420 C 610 1200, 780 1180, 780 1030" />
      <Pop t={t} at={L.result} x={540} y={lerp(1560, 1520, rise)} from="bottom">
        <Card w={600} style={{ border: `2px solid ${RED}`, padding: "24px 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}><Icon3D name="money_bag" size={90} /><div><div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.16em", color: RED }}>FROM YOUR CRM</div><div style={{ fontSize: 36, fontWeight: 900 }}>Purchase ✓</div></div></div>
        </Card>
      </Pop>
    </BG>
  );
};

// 50.0 — "Meta-তে Conversions API দিয়ে, Google-এ Data Manager দিয়ে।"
export const V20: S = ({ start }) => {
  const t = useT(start);
  const up = p(t, L.dataManager + 0.1, 0.7, IN_OUT);
  return (
    <BG t={t}>
      <Top top={190}>
        <TW t={t} at={50.1} text="META" v="label" size={34} />
        <TW t={t} at={L.capi2 - 0.05} text="Conversions API" v="bold" size={72} />
        <TW t={t} at={51.8} text="GOOGLE" v="label" size={34} />
        <HL t={t} at={L.dataManager - 0.1} text="Data Manager" size={80} />
      </Top>
      <Pop t={t} at={L.capi2 - 0.1} x={540} y={990} from="left">
        <Card w={940}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}><Logo name="meta" size={44} /><span style={{ fontSize: 28, fontWeight: 800 }}>Conversions API · CRM event</span></div>
          <div style={{ fontFamily: "monospace", fontSize: 26, lineHeight: 1.6, padding: "14px 20px", borderRadius: 14, background: "rgba(255,255,255,0.05)" }}>
            {[["event", "\"Purchase\""], ["lead_id", "\"84213…\""], ["source", "\"CRM\""]].map(([k, v], i) => (
              <div key={k} style={{ opacity: p(t, 50.7 + i * 0.2, 0.25) }}><span style={{ color: "#8ab4ff" }}>{k}</span>: <span style={{ color: "#ffb4bf" }}>{v}</span></div>
            ))}
          </div>
          <div style={{ marginTop: 16, opacity: p(t, 51.4, 0.3) }}><Tag ok>✓ Event received</Tag></div>
        </Card>
      </Pop>
      <Pop t={t} at={L.dataManager - 0.1} x={540} y={1470} from="right">
        <Card w={940}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}><Logo name="googleads" size={44} /><span style={{ fontSize: 28, fontWeight: 800 }}>Data Manager · Offline conversions</span></div>
          <div style={{ height: 22, borderRadius: 11, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}><div style={{ width: `${up * 100}%`, height: "100%", background: RED }} /></div>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 700 }}><span style={{ opacity: 0.7 }}>CRM results → Google Ads</span>{up >= 1 ? <Tag ok>✓ Imported</Tag> : <span style={{ opacity: 0.7 }}>Uploading…</span>}</div>
        </Card>
      </Pop>
    </BG>
  );
};

// 53.4 — "এখন Meta আর Google জানে একজন আসল কাস্টমার দেখতে কেমন।"
export const V21: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={210}>
        <TW t={t} at={53.6} text="Now they know what a" size={56} cps={30} />
        <HL t={t} at={L.customer - 0.1} text="REAL CUSTOMER" size={100} />
        <TW t={t} at={56.3} text="looks like" size={56} />
      </Top>
      <Obj name="brain" t={t} at={53.7} x={540} y={900} size={260} from="scale" mono={false} />
      <Pop t={t} at={54.2} x={540} y={1340} from="bottom">
        <Card w={760} style={{ border: `3px solid ${RED}`, boxShadow: `0 0 70px ${RED}44` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ width: 150, height: 150, borderRadius: "50%", background: "#222", display: "grid", placeItems: "center", border: `4px solid ${RED}` }}><Icon3D name="bust_in_silhouette" size={110} mono /></div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.16em", color: RED }}>REAL CUSTOMER</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
                {["Picked up ✓", "Came to meeting ✓", "Paid ✓"].map((x, i) => <div key={x} style={{ opacity: p(t, 54.6 + i * 0.35, 0.3) }}><Tag ok size={24}>{x}</Tag></div>)}
              </div>
            </div>
          </div>
        </Card>
      </Pop>
    </BG>
  );
};

// 57.05 — "তাই ওরা এরকম মানুষই আরও খুঁজে আনে।"
export const V22: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={240}>
        <TW t={t} at={57.2} text="So they find you" />
        <HL t={t} at={L.more - 0.1} text="MORE LIKE THEM" size={100} />
      </Top>
      <div style={{ position: "absolute", left: 90, top: 820, width: 900, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", rowGap: 34 }}>
        {Array.from({ length: 16 }, (_, i) => {
          const d = Math.hypot((i % 4) - 1.5, Math.floor(i / 4) - 1.5);
          const lit = p(t, L.more + d * 0.25, 0.3);
          return (
            <div key={i} style={{ display: "grid", placeItems: "center" }}>
              <div style={{ width: 170, height: 170, borderRadius: "50%", display: "grid", placeItems: "center", background: lit > 0.5 ? "rgba(227,18,47,0.18)" : "rgba(255,255,255,0.04)", border: `4px solid ${lit > 0.5 ? RED : "rgba(255,255,255,0.12)"}`, transform: `scale(${lerp(0.85, 1, lit)})`, boxShadow: lit > 0.5 ? `0 0 30px ${RED}77` : undefined }}>
                <Icon3D name="bust_in_silhouette" size={110} mono />
              </div>
            </div>
          );
        })}
      </div>
    </BG>
  );
};

// 59.35 — "যেসব কোম্পানি Lead Generate করে,"
export const V23: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={230}>
        <TW t={t} at={59.45} text="For" v="bold" size={60} />
        <HL t={t} at={L.companies - 0.05} text="COMPANIES" size={120} />
        <TW t={t} at={60.4} text="that generate leads" size={58} cps={32} />
      </Top>
      <Obj name="houses" t={t} at={59.9} x={210} y={1380} size={300} from="left" mono={false} />
      <Obj name="building_construction" t={t} at={60.0} x={880} y={1400} size={280} from="right" mono={false} />
      <Obj name="office_building" t={t} at={L.companies - 0.1} x={540} y={1180} size={560} from="bottom" mono={false} />
    </BG>
  );
};

// 61.2 — "তাদের জন্য এই সিস্টেম না থাকা মানে"
export const V24: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={260}>
        <TW t={t} at={61.35} text="Not having this system" size={60} />
        <Punch t={t} at={L.noSystem + 0.3} text="MEANS…" size={150} />
      </Top>
      <Obj name="gear" t={t} at={61.4} x={540} y={1200} size={460} from="scale" mono />
      <Obj name="cross_mark" t={t} at={62.2} x={700} y={1050} size={240} from="spin" mono={false} />
    </BG>
  );
};

// 63.35 — "অ্যাডের বাজেট দিয়ে প্ল্যাটফর্মকে ভুল জিনিস শেখানো।"
export const V25: S = ({ start }) => {
  const t = useT(start);
  const [sx, sy] = shake(t, L.wrongThing + 0.1, 16);
  return (
    <BG t={t}>
      <Top top={200}>
        <TW t={t} at={L.budget - 0.1} text="Your ad budget" v="bold" size={74} />
        <TW t={t} at={64.3} text="teaches the platform" size={56} cps={34} />
        <HL t={t} at={L.wrongThing - 0.05} text="THE WRONG THING" size={86} />
      </Top>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sx}px,${sy}px)` }}>
        <Obj name="money_bag" t={t} at={63.5} x={540} y={1180} size={480} from="top" mono={false} />
        <Obj name="fire" t={t} at={L.wrongThing} x={540} y={1400} size={340} from="scale" mono={false} />
      </div>
    </BG>
  );
};

// 66.15 — "আপনার বিজনেস এর জন্যে এই রকম একটা সিস্টেম বানাতে চাইলে"
export const V26: S = ({ start }) => {
  const t = useT(start);
  return (
    <BG t={t}>
      <Top top={220}>
        <TW t={t} at={L.cta} text="Want this system" v="bold" size={70} />
        <TW t={t} at={67.1} text="for your" size={60} />
        <HL t={t} at={67.5} text="BUSINESS?" size={120} />
      </Top>
      <Pop t={t} at={66.3} x={540} y={1230} from="bottom">
        <Card w={860}>
          <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "0.18em", color: RED, marginBottom: 12 }}>THE LEAD SIGNAL SYSTEM</div>
          {[["satellite_antenna", "Tracking fixed"], ["clipboard", "Every journey recorded"], ["money_bag", "Real results sent back"]].map(([ic, l], i) => (
            <Row key={l} t={t} at={66.5 + i * 0.4} style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <Icon3D name={ic} size={70} /><span style={{ fontSize: 32, fontWeight: 800 }}>{l}</span><span style={{ marginLeft: "auto" }}><Tag ok>✓</Tag></span>
            </Row>
          ))}
        </Card>
      </Pop>
    </BG>
  );
};

// 68.95 — "DM করুন “Lead”।"
export const V27: S = ({ start }) => {
  const t = useT(start);
  const k = p(t, L.dm - 0.05, 0.25, OUT);
  const msg = "Lead".slice(0, typed(t, L.dm + 0.25, "Lead", 6));
  const sent = t >= L.leadWord + 0.05;
  return (
    <BG t={t}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", padding: "22px 50px", display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 28, background: RED, transform: `scaleX(${k})`, transformOrigin: "left", boxShadow: `0 0 70px ${RED}aa` }} />
          <div style={{ position: "relative", opacity: p(t, L.dm + 0.05, 0.2) }}><Icon3D name="envelope" size={96} /></div>
          <div style={{ position: "relative" }}><TW t={t} at={L.dm + 0.1} text="DM “LEAD”" v="bold" size={104} cps={22} /></div>
        </div>
      </div>
      <Pop t={t} at={69.0} x={540} y={1180} from="bottom">
        <div style={{ transform: "perspective(1600px) rotateY(10deg) rotateX(6deg)" }}>
          <Phone w={370}>
            <div style={{ position: "absolute", inset: 0, background: "#000", fontFamily: UI, color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "56px 18px 16px", borderBottom: "1px solid #222" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${RED}, #5a0010)`, display: "grid", placeItems: "center", fontWeight: 900, fontSize: 22 }}>F</div>
                <div><div style={{ fontWeight: 800, fontSize: 20 }}>Fahad</div><div style={{ fontSize: 14, opacity: 0.6 }}>Lead generation systems</div></div>
                <span style={{ marginLeft: "auto" }}><Logo name="instagram" size={30} color="#fff" /></span>
              </div>
              {sent ? <div style={{ position: "absolute", right: 18, bottom: 140, padding: "14px 26px", borderRadius: 24, background: "linear-gradient(135deg,#7a2cff,#e3122f)", fontWeight: 800, fontSize: 30, transform: `scale(${lerp(0.6, 1, p(t, L.leadWord + 0.05, 0.25, OUT))})` }}>Lead</div> : null}
              <div style={{ position: "absolute", left: 16, right: 16, bottom: 56, height: 60, borderRadius: 30, border: "1px solid #333", display: "flex", alignItems: "center", padding: "0 20px", fontSize: 24 }}>
                {sent ? "" : msg}<span style={{ opacity: sent ? 0 : Math.floor(t * 3) % 2 }}>|</span><span style={{ marginLeft: "auto", color: "#3897f0", fontWeight: 800, fontSize: 20 }}>Send</span>
              </div>
            </div>
          </Phone>
        </div>
      </Pop>
    </BG>
  );
};
