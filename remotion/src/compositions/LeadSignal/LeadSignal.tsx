/**
 * LEAD SIGNAL — 9:16 reel (1080×1920): why lead-gen ads attract bad leads, and the 3-step offline-conversion system.
 * v2: one beat per spoken sentence, typewriter on-screen text synced to the voice (no captions), hero visual per beat.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { lerp, OUT, p } from "../../brand";
import { DISPLAY } from "../../brand/kinetic/Kinetic";
import { L, LId, SCENES_L } from "./data";
import * as V from "./Scenes";

export type LeadSignalProps = { voiceover: string };
export const LEAD_SIGNAL_FPS = 30;
export const LEAD_SIGNAL_FRAMES = Math.ceil(L.end * LEAD_SIGNAL_FPS);

const MAP: Record<LId, React.FC<{ start: number }>> = {
  v01: V.V01, v02: V.V02, v03: V.V03, v04: V.V04, v05: V.V05, v06: V.V06, v07: V.V07, v08: V.V08, v09: V.V09, v10: V.V10, v11: V.V11, v12: V.V12, v13: V.V13, v14: V.V14,
  v15: V.V15, v16: V.V16, v17: V.V17, v18: V.V18, v19: V.V19, v20: V.V20, v21: V.V21, v22: V.V22, v23: V.V23, v24: V.V24, v25: V.V25, v26: V.V26, v27: V.V27,
};
const OVERLAP = 0.2;

/** Fast punch-in cut (alternating with a short vertical whip) + slow push during the beat. */
const Shell: React.FC<{ i: number; len: number; children: React.ReactNode }> = ({ i, len, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const k = i === 0 ? 1 : p(s, 0, 0.26, OUT);
  const push = lerp(1, 1.035, Math.min(1, s / Math.max(1, len)));
  const tr = i % 3 === 2 ? `translateY(${(1 - k) * 260}px) scale(${push})` : `scale(${lerp(1.12, 1, k) * push})`;
  return <AbsoluteFill style={{ transform: tr, filter: k < 1 ? `blur(${(1 - k) * 14}px)` : undefined, opacity: Math.min(1, k * 2.2) }}>{children}</AbsoluteFill>;
};

export const LeadSignal: React.FC<LeadSignalProps> = ({ voiceover }) => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: DISPLAY, background: "#050405" }}>
      {SCENES_L.map((s, i) => {
        const from = Math.round(s.start * fps);
        const next = SCENES_L[i + 1];
        const until = next ? Math.round((next.start + OVERLAP) * fps) : durationInFrames;
        const Scene = MAP[s.id];
        return (
          <Sequence key={s.id} name={s.id} from={from} durationInFrames={until - from}>
            <Shell i={i} len={(until - from) / fps}><Scene start={from / fps} /></Shell>
          </Sequence>
        );
      })}
      <Audio src={staticFile(voiceover)} />
    </AbsoluteFill>
  );
};
