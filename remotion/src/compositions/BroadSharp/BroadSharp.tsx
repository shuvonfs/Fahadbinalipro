/**
 * META ADS — BROAD DELIVERY, SHARP STRATEGY. 1920×1080 thought-leadership explainer.
 * Brief: videos/briefs/broad-delivery-sharp-strategy.md. The voiceover is the master timeline (cues.ts);
 * the AudienceField (field.ts) lives under every scene for the whole film and changes behaviour.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AudienceField, Backdrop, COLORS, SceneFader } from "../../brand";
import { FONT_STACK } from "../../theme/fonts";
import { C, SCENES, SceneId } from "./cues";
import { field } from "./field";
import { DialScene, DoctorScene, HookScene, OldWayScene, QuestionScene, RealEstateScene, StudyScene } from "./scenes/Act1";
import { CloseScene, MeaningScene, ShiftScene, SignalsScene, SpineScene, ThesisScene } from "./scenes/Act2";

export type BroadSharpProps = { voiceover: string };

export const BROAD_SHARP_FPS = 30;
export const BROAD_SHARP_FRAMES = Math.ceil(C.end * BROAD_SHARP_FPS);

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ start: number }>> = {
  hook: HookScene, oldWay: OldWayScene, question: QuestionScene, study: StudyScene, dial: DialScene, doctor: DoctorScene,
  realEstate: RealEstateScene, thesis: ThesisScene, spine: SpineScene, signals: SignalsScene, meaning: MeaningScene,
  shift: ShiftScene, close: CloseScene,
};

const OVERLAP = 0.3;

const Field: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return <AudienceField st={field(t)} t={t} />;
};

export const BroadSharp: React.FC<BroadSharpProps> = ({ voiceover }) => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK, color: COLORS.maroon }}>
      <Backdrop />
      <Field />
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
