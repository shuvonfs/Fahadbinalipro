/**
 * META ADS — BROAD DELIVERY, SHARP STRATEGY (V2, "editorial kinetic" cut).
 * Same voiceover + cue map as BroadSharp; redesigned after reference reels: kinetic mixed-size type,
 * 3D objects, real platform logos, ad-interface mockups, infographics, whip transitions and captions.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { IN, lerp, OUT, p } from "../../brand";
import { DISPLAY, K } from "../../brand/kinetic/Kinetic";
import { C } from "../BroadSharp/cues";
import { PHRASES, phraseWords } from "./captions";
import { S01, S02, S03, S04, S05, S06, S07, S08, S09 } from "./scenes/A";
import { S10, S11, S12, S13, S14, S15, S16, S17, S18 } from "./scenes/B";
import { S19, S20, S21, S22, S23, S24, S25, S26 } from "./scenes/C";
import { isDarkAt, SCENES2, SceneId2 } from "./timeline";

export type BroadSharpV2Props = { voiceover: string };
export const BROAD_SHARP_V2_FPS = 30;
export const BROAD_SHARP_V2_FRAMES = Math.ceil(C.end * BROAD_SHARP_V2_FPS);

const MAP: Record<SceneId2, React.FC<{ start: number }>> = {
  s01: S01, s02: S02, s03: S03, s04: S04, s05: S05, s06: S06, s07: S07, s08: S08, s09: S09, s10: S10, s11: S11, s12: S12, s13: S13,
  s14: S14, s15: S15, s16: S16, s17: S17, s18: S18, s19: S19, s20: S20, s21: S21, s22: S22, s23: S23, s24: S24, s25: S25, s26: S26,
};
const OVERLAP = 0.3;

/** Whip-in from the side (alternating), zoom-punch when flipping light↔dark, slow push during the scene. */
const Shell: React.FC<{ i: number; len: number; flip: boolean; children: React.ReactNode }> = ({ i, len, flip, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const k = i === 0 ? 1 : p(s, 0, 0.34, OUT);
  const dir = i % 2 ? -1 : 1;
  const push = lerp(1, 1.035, Math.min(1, s / Math.max(1, len)));
  const tr = flip ? `scale(${lerp(1.18, 1, k) * push})` : `translateX(${(1 - k) * 340 * dir}px) scale(${push})`;
  return <AbsoluteFill style={{ transform: tr, filter: k < 1 ? `blur(${(1 - k) * 18}px)` : undefined, opacity: flip ? Math.min(1, k * 1.6) : 1 }}>{children}</AbsoluteFill>;
};

/** Karaoke captions (bottom). Accent keywords stay crimson; the active word is lifted. */
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const ph = PHRASES.find((x) => t >= x.a - 0.08 && t < x.b + 0.3);
  if (!ph) return null;
  const dark = isDarkAt(t);
  const inK = p(t, ph.a - 0.08, 0.18, OUT);
  const outK = 1 - p(t, ph.b + 0.12, 0.18, IN);
  const words = phraseWords(ph);
  return (
    <div style={{ position: "absolute", left: 160, right: 160, top: 948, display: "flex", justifyContent: "center", opacity: inK * outK, transform: `translateY(${(1 - inK) * 16}px)` }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: 12, rowGap: 2, padding: "10px 24px", borderRadius: 16,
        background: dark ? "rgba(0,0,0,0.45)" : "rgba(255,253,247,0.82)", boxShadow: dark ? "none" : "0 10px 30px rgba(0,0,0,0.08)",
        fontFamily: `"Montserrat","Noto Sans Bengali",sans-serif`, fontSize: 34, fontWeight: 700, lineHeight: 1.3 }}>
        {words.map((w, i) => {
          const active = t >= w.a && t < w.b + 0.05;
          const said = t >= w.a;
          const col = w.em ? K.accent : dark ? "#fff" : K.ink;
          return (
            <span key={i} style={{ display: "inline-block", color: col, opacity: said ? 1 : 0.38, transform: `translateY(${active ? -3 : 0}px) scale(${active ? 1.08 : 1})`,
              fontWeight: w.em || active ? 900 : 700, textShadow: active && dark ? `0 0 18px ${col}` : undefined }}>{w.w}</span>
          );
        })}
      </div>
    </div>
  );
};

export const BroadSharpV2: React.FC<BroadSharpV2Props> = ({ voiceover }) => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: DISPLAY, background: K.paper }}>
      {SCENES2.map((s, i) => {
        const from = Math.round(s.start * fps);
        const next = SCENES2[i + 1];
        const until = next ? Math.round((next.start + OVERLAP) * fps) : durationInFrames;
        const Scene = MAP[s.id];
        const flip = i > 0 && SCENES2[i - 1].dark !== s.dark;
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
