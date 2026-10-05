/**
 * GOOGLE ADS AI OPTIMIZATION — 1920×1080 explainer. The voiceover is the master timeline:
 * every scene window and beat comes from cues.ts (measured word times), and the
 * composition length equals the audio length.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { Backdrop, COLORS, SceneFader } from "../../brand";
import { FONT_STACK } from "../../theme/fonts";
import { C, SCENES, SceneId } from "./cues";
import { AIMaxScene, EngineScene, EvolutionScene, HookScene, QuestionScene, RunCampaignScene } from "./scenes/Act1";
import { ContextScene, DifferenceScene, JourneyScene, LadderScene, LeadTrapScene, RealEstateScene, SpectrumScene } from "./scenes/Act2";
import { BigShiftScene, ClosingScene, DataValueScene, RolesScene, ScalesScene, SignalQuestionScene } from "./scenes/Act3";

export type GoogleAdsAIProps = { voiceover: string };

export const GOOGLE_ADS_AI_FPS = 30;
export const GOOGLE_ADS_AI_FRAMES = Math.ceil(C.end * GOOGLE_ADS_AI_FPS);

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ start: number }>> = {
  hook: HookScene, question: QuestionScene, engine: EngineScene, evolution: EvolutionScene, aiMax: AIMaxScene,
  runCampaign: RunCampaignScene, context: ContextScene, ladder: LadderScene, leadTrap: LeadTrapScene,
  realEstate: RealEstateScene, spectrum: SpectrumScene, journey: JourneyScene, difference: DifferenceScene,
  bigShift: BigShiftScene, scales: ScalesScene, roles: RolesScene, signalQuestion: SignalQuestionScene,
  dataValue: DataValueScene, closing: ClosingScene,
};

/** Crossfade (seconds): the outgoing scene fades out under the incoming one. */
const OVERLAP = 0.3;

export const GoogleAdsAI: React.FC<GoogleAdsAIProps> = ({ voiceover }) => {
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
