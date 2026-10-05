/**
 * AI MAX — PROMPTING VS BUSINESS BRIEFING. 1920×1080 thought-leadership explainer.
 * The voiceover is the master timeline: scene windows and every beat come from cues.ts
 * (measured word times) and the composition length equals the audio length.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { Backdrop, COLORS, SceneFader } from "../../brand";
import { FONT_STACK } from "../../theme/fonts";
import { C, SCENES, SceneId } from "./cues";
import { AIMaxWorkScene, ContextAnchorScene, HookScene, ManualScene, PromptMythScene, QuestionsScene } from "./scenes/Act1";
import {
  BoundaryScene, DifferenceScene, HealthBriefScene, HealthChapterScene, HealthPromptScene, REBriefScene, REChapterScene,
  REPromptScene, StudyBriefScene, StudyChapterScene, StudyPromptScene, SynthesisScene,
} from "./scenes/Act2";
import {
  AIBriefScene, BestPromptScene, BigIdeaScene, ChainScene, FinaleScene, ReportingScene, ResponsibilityScene, SkillsetScene,
  SteerScene, UnderstandingScene,
} from "./scenes/Act3";

export type AIMaxBriefingProps = { voiceover: string };

export const AI_MAX_BRIEFING_FPS = 30;
export const AI_MAX_BRIEFING_FRAMES = Math.ceil(C.end * AI_MAX_BRIEFING_FPS);

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ start: number }>> = {
  hook: HookScene, promptMyth: PromptMythScene, contextAnchor: ContextAnchorScene, manual: ManualScene, aiMaxWork: AIMaxWorkScene,
  questions: QuestionsScene, studyChapter: StudyChapterScene, studyPrompt: StudyPromptScene, studyBrief: StudyBriefScene,
  difference: DifferenceScene, healthChapter: HealthChapterScene, healthPrompt: HealthPromptScene, healthBrief: HealthBriefScene,
  boundary: BoundaryScene, reChapter: REChapterScene, rePrompt: REPromptScene, reBrief: REBriefScene, synthesis: SynthesisScene,
  bigIdea: BigIdeaScene, skillset: SkillsetScene, chain: ChainScene, aiBrief: AIBriefScene, reporting: ReportingScene,
  steer: SteerScene, bestPrompt: BestPromptScene, understanding: UnderstandingScene, responsibility: ResponsibilityScene,
  finale: FinaleScene,
};

/** Crossfade (seconds): the outgoing scene fades out under the incoming one. */
const OVERLAP = 0.3;

export const AIMaxBriefing: React.FC<AIMaxBriefingProps> = ({ voiceover }) => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK, color: COLORS.maroon }}>
      <Backdrop />
      {SCENES.map((s, i) => {
        const from = Math.round(s.start * fps);
        const next = SCENES[i + 1];
        const until = next ? Math.round((next.start + OVERLAP) * fps) : durationInFrames;
        const Scene = SCENE_COMPONENTS[s.id];
        return (
          <Sequence key={s.id} name={s.id} from={from} durationInFrames={until - from}>
            <SceneFader fadeFrom={next ? Math.round(next.start * fps) - from : null} overlap={OVERLAP}>
              <Scene start={from / fps} />
            </SceneFader>
          </Sequence>
        );
      })}
      <Audio src={staticFile(voiceover)} />
    </AbsoluteFill>
  );
};
