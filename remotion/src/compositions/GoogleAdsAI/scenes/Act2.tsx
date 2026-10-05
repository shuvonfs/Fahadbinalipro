/** Act 2 — business context, conversion value and the real-estate example (36 – 84s). */
import { AbsoluteFill, interpolate } from "remotion";
import {
  AIEngine, At, Bar, BACK, Card, COLORS, curve, Eyebrow, Headline, Icon, IconName, INK, LeadCard, lerp, Lines, Node,
  p, Pill, SAFE, seg, SignalLine, TYPE, useT, ValueBar,
} from "../../../brand";
import { C } from "../cues";

type S = React.FC<{ start: number }>;

const ContextCard: React.FC<{ icon: IconName; kicker: string; title: string; hot?: number; children?: React.ReactNode }> = ({ icon, kicker, title, hot = 0, children }) => (
  <Card w={470} h={236} hot={hot} pad="26px 30px">
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
      <Icon name={icon} size={38} color={hot > 0.5 ? COLORS.ivory : COLORS.burgundy} />
      <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "0.2em", color: hot > 0.5 ? "rgba(251,252,235,0.8)" : COLORS.crimson }}>{kicker}</div>
    </div>
    <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>{title}</div>
    {children}
  </Card>
);

// 07–09 — business / most valuable customer / problem / message
export const ContextScene: S = ({ start }) => {
  const t = useT(start);
  const converge = p(t, C.relevant, 0.5);
  const toward = (x: number, y: number) => ({ transform: `translate(${(960 - x) * 0.06 * converge}px, ${(560 - y) * 0.06 * converge}px)` });
  const cust = [
    { id: "A", v: 0.25 }, { id: "B", v: 0.5 }, { id: "C", v: 0.95 },
  ];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y - 6 }}><Eyebrow t={t} at={C.business}>Business context</Eyebrow></div>
      <Lines>
        <SignalLine d={curve(665, 330, 830, 520)} t={t} at={C.business + 0.4} pulse={C.relevant} period={1} dots={1} hot={converge} />
        <SignalLine d={curve(1255, 330, 1090, 520)} t={t} at={C.customer + 0.4} pulse={C.relevant} period={1} dots={1} hot={converge} />
        <SignalLine d={curve(665, 800, 830, 600)} t={t} at={C.problem + 0.4} pulse={C.relevant} period={1} dots={1} hot={converge} />
        <SignalLine d={curve(1255, 800, 1090, 600)} t={t} at={C.message + 0.4} pulse={C.relevant} period={1} dots={1} hot={converge} />
        <SignalLine d={seg(680, 905, 1240, 905)} t={t} at={C.message - 0.1} dur={0.5} arrow hot={1} />
      </Lines>
      <At x={960} y={560} t={t} at={C.business + 0.1} dy={0}><AIEngine t={t} size={250} uncertain={1 - p(t, C.message, 0.8)} active={converge} /></At>
      <At x={430} y={330} t={t} at={C.business} dx={-40} dy={0}>
        <div style={toward(430, 330)}>
          <ContextCard icon="building" kicker="01 · BUSINESS" title="What is my business?">
            <div style={{ display: "flex", gap: 10 }}>{["Offer", "Market", "Model"].map((c) => <Pill key={c} size={16}>{c}</Pill>)}</div>
          </ContextCard>
        </div>
      </At>
      <At x={1490} y={330} t={t} at={C.customer} dx={40} dy={0}>
        <div style={toward(1490, 330)}>
          <ContextCard icon="users" kicker="02 · CUSTOMER" title="Who is my most valuable customer?">
            <div style={{ display: "flex", gap: 18 }}>
              {cust.map((c, i) => {
                const hi = c.id === "C" ? p(t, C.valuableCustomer, 0.4) : 0;
                return (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, opacity: lerp(1, c.id === "C" ? 1 : 0.5, p(t, C.valuableCustomer, 0.4)) }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 16, fontWeight: 800,
                      background: hi > 0.5 ? COLORS.crimson : "rgba(114,0,19,0.1)", color: hi > 0.5 ? COLORS.ivory : INK.strong }}>{c.id}</div>
                    <ValueBar value={c.v * p(t, C.customer + 0.3 + i * 0.1, 0.6)} w={70} h={9} />
                  </div>
                );
              })}
            </div>
          </ContextCard>
        </div>
      </At>
      <At x={430} y={790} t={t} at={C.problem} dx={-40} dy={0}>
        <div style={toward(430, 790)}>
          <ContextCard icon="bulb" kicker="03 · PROBLEM" title="What problem brings them to me?">
            <Pill size={16}>“We need a family home”</Pill>
          </ContextCard>
        </div>
      </At>
      <At x={1490} y={790} t={t} at={C.message} dx={40} dy={0}>
        <div style={toward(1490, 790)}>
          <ContextCard icon="message" kicker="04 · MESSAGE" title="Which message feels most relevant?" hot={p(t, C.relevant, 0.4)}>
            <Pill size={16} hot={0}>Ready homes near schools</Pill>
          </ContextCard>
        </div>
      </At>
    </AbsoluteFill>
  );
};

// 10 — "আর সবচেয়ে গুরুত্বপূর্ণ— কোন conversion আমার Business-এর জন্য সত্যিকার অর্থে valuable?"
const STEPS = ["Click", "Lead", "Qualified lead", "Site visit", "Booking", "Revenue"];
export const LadderScene: S = ({ start }) => {
  const t = useT(start);
  const xs = STEPS.map((_, i) => 300 + i * 264);
  const base = 900;
  const top = (i: number) => base - (150 + i * 68);
  const trace = `M ${xs[5]} ${top(5) - 24} ` + xs.slice(0, 5).reverse().map((x, j) => `L ${x} ${top(4 - j) - 24}`).join(" ");
  return (
    <AbsoluteFill>
      <At x={960} y={540} t={t} at={C.mostImportant} out={C.conversion - 0.5} dy={30}>
        <div style={{ ...TYPE.hero, color: COLORS.crimson, whiteSpace: "nowrap" }}>Most important —</div>
      </At>
      <div style={{ position: "absolute", left: SAFE.x, top: 100, width: SAFE.w }}>
        <Headline t={t} at={C.conversion - 0.3} text="Which conversion is truly valuable?" mark={["valuable"]} markAt={C.valuable} style={{ fontSize: 70 }} />
      </div>
      {STEPS.map((s, i) => {
        const k = p(t, C.conversion + 0.2 + i * 0.15, 0.55, BACK);
        const hot = p(t, C.valuable + (5 - i) * 0.12, 0.3) * (i >= 3 ? 1 : 0);
        const h = base - top(i);
        return (
          <div key={s} style={{ position: "absolute", left: xs[i] - 115, top: top(i), width: 230, height: h, opacity: Math.min(1, k * 1.4),
            transform: `scaleY(${lerp(0.2, 1, k)})`, transformOrigin: "bottom" }}>
            <Card w={230} h={h} hot={hot} pad="20px 16px" style={{ borderRadius: "22px 22px 8px 8px" }}>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center" }}>{s}</div>
            </Card>
          </div>
        );
      })}
      <Lines><SignalLine d={trace} t={t} at={C.valuable} dur={0.7} hot={1} width={4} /></Lines>
      <At x={960} y={952} t={t} at={C.conversion + 1.1}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, ...TYPE.label, fontSize: 19 }}>
          <span>Low value</span><span style={{ width: 900, height: 3, background: `linear-gradient(90deg, ${INK.line}, ${COLORS.crimson})` }} /><span style={{ color: COLORS.crimson }}>High value</span>
        </div>
      </At>
    </AbsoluteFill>
  );
};

// 11 — "Google যদি শুধু Lead দেখে optimize করে … বেশি Lead … কিন্তু সেই Lead যদি sales না করে … campaign ভালো দেখালেও business ভালো করছে না।"
export const LeadTrapScene: S = ({ start }) => {
  const t = useT(start);
  const leadsV = lerp(0.32, 0.95, p(t, C.moreLeads, 0.9));
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10 }}><Eyebrow t={t} at={C.leadOnly}>If Google only sees leads</Eyebrow></div>
      <At x={400} y={470} t={t} at={C.leadOnly + 0.2} dy={0}><AIEngine t={t} size={230} active={p(t, C.leadOptimize, 0.5)} /></At>
      <At x={400} y={680} t={t} at={C.leadOptimize - 0.4}><Pill size={18}><Icon name="eye" size={26} />Sees: leads only</Pill></At>
      <Lines>
        <SignalLine d={curve(530, 470, 760, 560)} t={t} at={C.leadOptimize} dur={0.5} pulse={C.leadOptimize + 0.3} period={0.8} dots={3} hot={1} />
      </Lines>
      <div style={{ position: "absolute", left: 790, top: 290, display: "flex", gap: 70, alignItems: "flex-end" }}>
        <Bar t={t} at={C.leadOptimize + 0.1} value={leadsV} label="LEADS" hot={1} maxH={430} tag="↑" />
        <Bar t={t} at={C.sales} value={0.12} label="SALES" maxH={430} tag="?" />
      </div>
      <div style={{ position: "absolute", left: 770, top: 290 + 430 + 70, width: 420, height: 3, background: INK.lineStrong, opacity: p(t, C.leadOptimize, 0.4) }} />
      <At x={1530} y={440} t={t} at={C.campaignGood} dx={40} dy={0}>
        <Card w={400} pad="26px 30px">
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}><Icon name="chart" size={36} /><span style={{ ...TYPE.label, fontSize: 17 }}>Campaign dashboard</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 36, fontWeight: 800 }}>Looks good <Icon name="check" size={44} color={COLORS.burgundy} stroke={2} /></div>
        </Card>
      </At>
      <At x={1530} y={680} t={t} at={C.businessNot} dx={40} dy={0}>
        <Card w={400} pad="26px 30px" hot={p(t, C.businessNot + 0.3, 0.4)}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}><Icon name="revenue" size={36} color={COLORS.ivory} /><span style={{ ...TYPE.label, fontSize: 17, color: "rgba(251,252,235,0.8)" }}>Business result</span></div>
          <div style={{ fontSize: 36, fontWeight: 800 }}>Not growing ✕</div>
        </Card>
      </At>
      <At x={980} y={940} t={t} at={C.businessNot + 0.4}>
        <div style={{ ...TYPE.title, fontSize: 52 }}>Volume <span style={{ color: COLORS.crimson }}>≠</span> value</div>
      </At>
    </AbsoluteFill>
  );
};

// 12 — "ধরুন … Real Estate company … ‘Apartment-এর জন্য Lead চাই।’ Google lead-এর জন্য optimize করবে।"
const TOWERS = [
  { x: 190, w: 120, h: 230 }, { x: 320, w: 150, h: 380 }, { x: 480, w: 110, h: 290 }, { x: 600, w: 170, h: 470 },
  { x: 780, w: 120, h: 330 }, { x: 910, w: 140, h: 250 },
];
export const RealEstateScene: S = ({ start }) => {
  const t = useT(start);
  const objective = "Get apartment leads";
  const n = Math.floor(interpolate(t, [C.apartmentLead, C.apartmentLead + 1.0], [0, objective.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const ground = 900;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: SAFE.y + 10 }}><Eyebrow t={t} at={C.realEstate}>Example · real estate</Eyebrow></div>
      {TOWERS.map((b, i) => {
        const k = p(t, C.realEstate + 0.2 + i * 0.1, 0.8);
        const rows = Math.floor(b.h / 46);
        return (
          <div key={i} style={{ position: "absolute", left: b.x, top: ground - b.h, width: b.w, height: b.h, transformOrigin: "bottom", transform: `scaleY(${k})`,
            background: i === 3 ? `linear-gradient(180deg, ${COLORS.burgundy}, ${COLORS.maroon})` : "linear-gradient(180deg, rgba(114,0,19,0.16), rgba(114,0,19,0.08))",
            borderRadius: "12px 12px 0 0", border: `2px solid ${i === 3 ? COLORS.burgundy : INK.line}`, boxSizing: "border-box", padding: "18px 16px",
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridAutoRows: 26, gap: 20, alignContent: "start" }}>
            {Array.from({ length: rows * 3 - 3 }, (_, j) => (
              <div key={j} style={{ background: i === 3 ? "rgba(251,252,235,0.35)" : "rgba(114,0,19,0.16)", borderRadius: 4,
                opacity: p(t, C.realEstate + 0.9 + ((j * 7 + i * 3) % 11) * 0.06, 0.3) }} />
            ))}
          </div>
        );
      })}
      <div style={{ position: "absolute", left: SAFE.x, top: ground, width: 920, height: 3, background: INK.lineStrong, opacity: p(t, C.realEstate, 0.5) }} />
      <At x={685} y={ground + 52} t={t} at={C.reWord}><Pill size={19} hot={1}><Icon name="building" size={26} color={COLORS.ivory} />Real estate company</Pill></At>
      <At x={1440} y={330} t={t} at={C.youSaid} dx={40} dy={0}>
        <Card w={600} pad="30px 36px" glass>
          <div style={{ ...TYPE.label, color: COLORS.crimson, marginBottom: 14 }}>Objective</div>
          <div style={{ fontSize: 46, fontWeight: 800, color: INK.strong, minHeight: 56, whiteSpace: "nowrap" }}>
            {objective.slice(0, n)}
            <span style={{ display: "inline-block", width: 3, height: 46, marginLeft: 4, verticalAlign: "-6px", background: COLORS.crimson, opacity: Math.floor(t * 2.4) % 2 }} />
          </div>
        </Card>
      </At>
      <Lines>
        <SignalLine d={seg(1270, 430, 1270, 590)} t={t} at={C.googleOptimizes - 0.3} dur={0.3} arrow />
        <SignalLine d={"M 1400 880 L 1470 840 L 1530 855 L 1600 790 L 1660 770 L 1730 690"} t={t} at={C.googleOptimizes + 0.3} dur={0.8} hot={1} width={4} arrow />
      </Lines>
      <At x={1270} y={720} t={t} at={C.googleOptimizes - 0.2} dy={0}><AIEngine t={t} size={200} active={p(t, C.googleOptimizes, 0.5)} /></At>
      <At x={1560} y={600} t={t} at={C.googleOptimizes + 0.5} scaleFrom={0.7}>
        <div style={{ fontSize: 76, fontWeight: 800, color: COLORS.crimson, letterSpacing: "-0.02em" }}>LEADS ↑</div>
      </At>
    </AbsoluteFill>
  );
};

// 13 — "কিন্তু আপনার Business-এর জন্য হয়তো সব Lead সমান valuable না।"
const SPECTRUM = [
  { title: "Price enquiry", icon: "chat", v: 0.14 },
  { title: "Form fill", icon: "form", v: 0.38 },
  { title: "Site visit", icon: "pin", v: 0.7 },
  { title: "Booking", icon: "check", v: 1 },
] as const;
export const SpectrumScene: S = ({ start }) => {
  const t = useT(start);
  const sep = p(t, C.notEqualValuable, 0.7);
  const xs = [380, 760, 1160, 1540];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: 110, width: SAFE.w }}>
        <Headline t={t} at={C.notEqual} text="Not every lead is equally valuable" mark={["valuable"]} markAt={C.notEqualValuable} style={{ fontSize: 70 }} />
      </div>
      {SPECTRUM.map((s, i) => (
        <At key={s.title} x={lerp(960, xs[i], p(t, C.allLeads, 0.7))} y={lerp(560, 560 - i * 40, sep)} t={t} at={C.allLeads - 0.3 + i * 0.06}>
          <LeadCard title={s.title} icon={s.icon} value={lerp(0.5, s.v, sep)} hot={i === 3 ? sep : 0} w={330} />
        </At>
      ))}
      <At x={960} y={830} t={t} at={C.allLeads + 0.5}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, ...TYPE.label, fontSize: 21 }}>
          <span>Low value</span>
          <span style={{ width: 1180, height: 6, borderRadius: 6, background: `linear-gradient(90deg, rgba(114,0,19,0.15), ${COLORS.crimson})` }} />
          <span style={{ color: COLORS.crimson }}>High value</span>
        </div>
      </At>
    </AbsoluteFill>
  );
};

// 14–15 — price vs buyer, then form → site visit → booking
export const JourneyScene: S = ({ start }) => {
  const t = useT(start);
  const journey = [
    { title: "Form filled", icon: "form", cue: C.form, x: 450, v: 0.35 },
    { title: "Site visit", icon: "pin", cue: C.siteVisit, x: 900, v: 0.65 },
  ] as const;
  const book = p(t, C.booking, 0.5, BACK);
  return (
    <AbsoluteFill>
      <At x={590} y={300} t={t} at={C.price} dx={-40} dy={0}>
        <LeadCard title="Just asking the price" caption="“How much is it?”" icon="chat" value={0.16 * p(t, C.price + 0.4, 0.6)} w={560} />
      </At>
      <At x={960} y={300} t={t} at={C.buyer - 0.2}><div style={{ ...TYPE.label, fontSize: 26, color: INK.faint }}>vs</div></At>
      <At x={1330} y={300} t={t} at={C.buyer} dx={40} dy={0}>
        <LeadCard title="Ready to buy" caption="Wants an apartment — now" icon="home" value={0.92 * p(t, C.buyer + 0.4, 0.8)} hot={p(t, C.buyer + 0.5, 0.4)} w={560} />
      </At>
      <At x={SAFE.x} y={560} anchor="left" t={t} at={C.form - 0.2} dx={-20} dy={0}><Eyebrow t={t} at={C.form - 0.2}>The real journey</Eyebrow></At>
      <Lines>
        <SignalLine d={seg(600, 760, 750, 760)} t={t} at={C.siteVisit - 0.3} dur={0.3} arrow pulse={C.siteVisit} period={1.1} dots={1} />
        <SignalLine d={seg(1050, 760, 1240, 760)} t={t} at={C.finally} dur={0.6} arrow hot={1} pulse={C.booking} period={1} dots={1} />
      </Lines>
      {journey.map((j) => (
        <At key={j.title} x={j.x} y={760} t={t} at={j.cue}>
          <Node title={j.title} icon={j.icon} w={290} h={190} size={24} dim={0.35 * p(t, C.booking, 0.5)} />
        </At>
      ))}
      <At x={1480} y={760} t={t} at={C.booking - 0.15} dur={0.6}>
        <div style={{ transform: `scale(${lerp(1, 1.08, book)})` }}>
          <Node title="Booking" icon="check" caption="real business value" w={400} h={250} size={34} hot={p(t, C.booking, 0.35)} />
        </div>
      </At>
      <At x={1480} y={930} t={t} at={C.booking + 0.4}><div style={{ ...TYPE.label, color: COLORS.crimson }}>Highest value conversion</div></At>
    </AbsoluteFill>
  );
};

// 16 — "এই difference-টাই Google-কে বুঝতে সাহায্য করতে হবে।"
export const DifferenceScene: S = ({ start }) => {
  const t = useT(start);
  const d = seg(640, 600, 1250, 600);
  const travel = p(t, C.helpGoogle, 1.1);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.x, top: 110, width: SAFE.w }}>
        <Headline t={t} at={C.difference} text="Help Google see the difference" mark={["difference"]} style={{ fontSize: 72 }} />
      </div>
      {[{ s: "Price enquiry", v: 0.15 }, { s: "Site visit", v: 0.65 }, { s: "Booking", v: 1 }].map((r, i) => (
        <At key={r.s} x={420} y={460 + i * 140} t={t} at={C.difference + 0.1 + i * 0.12} dx={-30} dy={0}>
          <Card w={440} pad="20px 26px" hot={i === 2 ? 1 : 0}>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>{r.s}</div>
            <ValueBar value={r.v} w={388} h={10} color={i === 2 ? COLORS.ivory : COLORS.crimson} />
          </Card>
        </At>
      ))}
      <Lines><SignalLine d={d} t={t} at={C.helpGoogle - 0.3} dur={0.5} hot={1} width={4} pulse={C.helpGoogle} period={0.9} dots={3} /></Lines>
      <At x={lerp(700, 1110, travel)} y={540} t={t} at={C.helpGoogle} dy={10}>
        <Pill hot={1} size={20}><Icon name="target" size={28} color={COLORS.ivory} />Business value signal</Pill>
      </At>
      <At x={1440} y={600} t={t} at={C.difference + 0.3} dy={0}><AIEngine t={t} size={280} label="AI" active={p(t, C.helpGoogle + 0.9, 0.5)} /></At>
      <At x={1440} y={810} t={t} at={C.helpGoogle + 1.1}><div style={{ ...TYPE.label, color: COLORS.crimson }}>Learns what matters</div></At>
    </AbsoluteFill>
  );
};
