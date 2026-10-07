/**
 * LEAD AUTOMATION — 9:16 explainer (98.2s): speed-to-lead research + the 3-step automation system
 * (instant WhatsApp reply, lead scoring & routing, results back to Meta). One beat per spoken sentence.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { lerp, OUT, p } from "../../brand";
import { A, AId, SCENES_A } from "./data";
import * as V from "./Scenes";

export type LeadAutomationProps = { voiceover: string };
export const LEAD_AUTOMATION_FPS = 30;
export const LEAD_AUTOMATION_FRAMES = Math.ceil(A.end * LEAD_AUTOMATION_FPS);

const MAP: Record<AId, React.FC<{ start: number }>> = {
  a01: V.S01, a02: V.S02, a03: V.S03, a04: V.S04, a05: V.S05, a06: V.S06, a07: V.S07, a08: V.S08, a09: V.S09, a10: V.S10, a11: V.S11, a12: V.S12, a13: V.S13,
  a14: V.S14, a15: V.S15, a16: V.S16, a17: V.S17, a18: V.S18, a19: V.S19, a20: V.S20, a21: V.S21, a22: V.S22, a23: V.S23, a24: V.S24, a25: V.S25, a26: V.S26,
};
const OVERLAP = 0.3;

/** Calm cut: short cross-dissolve with a gentle settle (no whips, nothing that distracts from the content). */
const Shell: React.FC<{ i: number; len: number; children: React.ReactNode }> = ({ i, len, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const k = i === 0 ? 1 : p(s, 0, OVERLAP, OUT);
  const push = lerp(1, 1.025, Math.min(1, s / Math.max(1, len)));
  return <AbsoluteFill style={{ opacity: k, transform: `scale(${lerp(1.03, 1, k) * push})` }}>{children}</AbsoluteFill>;
};

export const LeadAutomation: React.FC<LeadAutomationProps> = ({ voiceover }) => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#070102" }}>
      {SCENES_A.map((s, i) => {
        const from = Math.round(s.start * fps);
        const next = SCENES_A[i + 1];
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
