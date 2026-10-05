/**
 * META ADS — CREATIVE IS A SIGNAL. 1920×1080 experimental explainer.
 * The voiceover is the master timeline (cues.ts). One protagonist creative (protagonist.ts)
 * lives above the scenes and morphs continuously; scenes add signal trails, reactions and fields.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, COLORS, CreativeSignalCanvas, SceneFader } from "../../brand";
import { FONT_STACK } from "../../theme/fonts";
import { C, SCENES, SceneId } from "./cues";
import { protagonist } from "./protagonist";
import { BreakOpenScene, CreativeAScene, CreativeBScene, EngagementScene, HookScene, RankingScene, TwoWorldsScene, UnderstandScene } from "./scenes/Act1";
import { ClonesScene, CloseScene, FrameworkScene, MaterialScene, RelevanceScene, StrategyScene, WorldsScene } from "./scenes/Act2";

export type MetaCreativeSignalProps = { voiceover: string };

export const META_CREATIVE_SIGNAL_FPS = 30;
export const META_CREATIVE_SIGNAL_FRAMES = Math.ceil(C.end * META_CREATIVE_SIGNAL_FPS);

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ start: number }>> = {
  hook: HookScene, breakOpen: BreakOpenScene, understand: UnderstandScene, creativeA: CreativeAScene, creativeB: CreativeBScene,
  twoWorlds: TwoWorldsScene, engagement: EngagementScene, ranking: RankingScene, relevance: RelevanceScene, clones: ClonesScene,
  worlds: WorldsScene, framework: FrameworkScene, strategy: StrategyScene, material: MaterialScene, close: CloseScene,
};

const OVERLAP = 0.3;

const Protagonist: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return <CreativeSignalCanvas st={protagonist(t)} t={t} />;
};

export const MetaCreativeSignal: React.FC<MetaCreativeSignalProps> = ({ voiceover }) => {
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
      <Protagonist />
      <Audio src={staticFile(voiceover)} />
    </AbsoluteFill>
  );
};
