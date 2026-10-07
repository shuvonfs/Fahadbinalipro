/**
 * LEAD SIGNAL — 9:16 reel (1080×1920): why lead-gen ads attract bad leads, and the 3-step offline-conversion system.
 * Reference style: dark grid sets, thin white curves, vivid red accent, phone UIs, vertical flow chains.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { IN, lerp, OUT, p } from "../../brand";
import { DISPLAY, K } from "../../brand/kinetic/Kinetic";
import { phraseWords } from "../BroadSharpV2/captions";
import { darkAtL, L, LId, PHRASES_L, SCENES_L } from "./data";
import { L01, L02, L03, L04, L05, L06, L07, L08, L09, L10, L11, L12, L13, L14, RED } from "./Scenes";

export type LeadSignalProps = { voiceover: string };
export const LEAD_SIGNAL_FPS = 30;
export const LEAD_SIGNAL_FRAMES = Math.ceil(L.end * LEAD_SIGNAL_FPS);

const MAP: Record<LId, React.FC<{ start: number }>> = { l01: L01, l02: L02, l03: L03, l04: L04, l05: L05, l06: L06, l07: L07, l08: L08, l09: L09, l10: L10, l11: L11, l12: L12, l13: L13, l14: L14 };
const OVERLAP = 0.3;

/** Vertical whip-in (alternating up/down), zoom-punch on light↔dark flips, slow push. */
const Shell: React.FC<{ i: number; len: number; flip: boolean; children: React.ReactNode }> = ({ i, len, flip, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const k = i === 0 ? 1 : p(s, 0, 0.34, OUT);
  const dir = i % 2 ? -1 : 1;
  const push = lerp(1, 1.04, Math.min(1, s / Math.max(1, len)));
  const tr = flip ? `scale(${lerp(1.18, 1, k) * push})` : `translateY(${(1 - k) * 420 * dir}px) scale(${push})`;
  return <AbsoluteFill style={{ transform: tr, filter: k < 1 ? `blur(${(1 - k) * 18}px)` : undefined, opacity: flip ? Math.min(1, k * 1.6) : 1 }}>{children}</AbsoluteFill>;
};

/** Karaoke captions in the lower third (portrait). */
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const ph = PHRASES_L.find((x) => t >= x.a - 0.08 && t < x.b + 0.3);
  if (!ph) return null;
  const dark = darkAtL(t);
  const inK = p(t, ph.a - 0.08, 0.18, OUT);
  const outK = 1 - p(t, ph.b + 0.12, 0.18, IN);
  const words = phraseWords(ph);
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: 1610, display: "flex", justifyContent: "center", opacity: inK * outK, transform: `translateY(${(1 - inK) * 16}px)` }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: 12, rowGap: 4, padding: "14px 26px", borderRadius: 20,
        background: dark ? "rgba(0,0,0,0.55)" : "rgba(255,253,247,0.88)", boxShadow: dark ? "none" : "0 10px 30px rgba(0,0,0,0.08)",
        fontFamily: `"Montserrat","Noto Sans Bengali",sans-serif`, fontSize: 42, fontWeight: 700, lineHeight: 1.3 }}>
        {words.map((w, i) => {
          const active = t >= w.a && t < w.b + 0.05;
          const col = w.em ? RED : dark ? "#fff" : K.ink;
          return (
            <span key={i} style={{ display: "inline-block", color: col, opacity: t >= w.a ? 1 : 0.38, transform: `translateY(${active ? -3 : 0}px) scale(${active ? 1.08 : 1})`,
              fontWeight: w.em || active ? 900 : 700, textShadow: active && dark ? `0 0 18px ${col}` : undefined }}>{w.w}</span>
          );
        })}
      </div>
    </div>
  );
};

export const LeadSignal: React.FC<LeadSignalProps> = ({ voiceover }) => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: DISPLAY, background: K.dark }}>
      {SCENES_L.map((s, i) => {
        const from = Math.round(s.start * fps);
        const next = SCENES_L[i + 1];
        const until = next ? Math.round((next.start + OVERLAP) * fps) : durationInFrames;
        const Scene = MAP[s.id];
        const flip = i > 0 && SCENES_L[i - 1].dark !== s.dark;
        return (
          <Sequence key={s.id} name={s.id} from={from} durationInFrames={until - from}>
            <Shell i={i} len={(until - from) / fps} flip={flip}><Scene start={from / fps} /></Shell>
          </Sequence>
        );
      })}
      <Captions />
      <Audio src={staticFile(voiceover)} />
    </AbsoluteFill>
  );
};
