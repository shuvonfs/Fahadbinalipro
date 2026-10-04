import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_STACK } from "../../theme/fonts";
import { COLORS } from "../../theme/theme";
import { CUES, SCENES } from "./cues";
import { BrandsScene, IndustriesScene, ProfileScene, SystemScene } from "./scenes/Opening";
import { CampaignScene, FunnelScene, LeadScene, ModernScene } from "./scenes/Middle";
import { ContentScene, FinalScene, GrowthSystemScene, MarketScene, NestedScene } from "./scenes/Closing";

export type FahadIntroProps = { voiceover: string };

const SCENE_COMPONENTS: Record<(typeof SCENES)[number]["id"], React.FC<{ start: number }>> = {
  system: SystemScene, profile: ProfileScene, industries: IndustriesScene, brands: BrandsScene,
  lead: LeadScene, funnel: FunnelScene, campaign: CampaignScene, modern: ModernScene,
  nested: NestedScene, growthSystem: GrowthSystemScene, market: MarketScene, content: ContentScene, final: FinalScene,
};

/** Crossfade length between scenes (seconds): the outgoing scene fades under the incoming one. */
const OVERLAP = 0.3;

/** Duration of the composition = the voiceover length. */
export const FAHAD_INTRO_FPS = 30;
export const FAHAD_INTRO_FRAMES = Math.ceil(CUES.end * FAHAD_INTRO_FPS);

const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const k = frame / durationInFrames;
  return (
    <AbsoluteFill style={{ background: COLORS.ivory }}>
      <AbsoluteFill style={{ inset: -120,
        backgroundImage: "linear-gradient(rgba(114,0,19,0.045) 2px, transparent 2px), linear-gradient(90deg, rgba(114,0,19,0.045) 2px, transparent 2px)",
        backgroundSize: "90px 90px", transform: `translate(${-90 * k}px, ${-90 * k}px)` }} />
      <div style={{ position: "absolute", width: 1400, height: 1400, left: -160, top: 300, transform: `translate(${220 * Math.sin(k * Math.PI)}px, ${-260 * k}px)`,
        background: "radial-gradient(circle, rgba(128,1,31,0.07) 0%, rgba(128,1,31,0) 62%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(251,252,235,0) 40%, rgba(240,232,214,0.55) 100%)" }} />
    </AbsoluteFill>
  );
};

/** Wraps a scene so it fades out over its final OVERLAP seconds. */
const Fader: React.FC<{ children: React.ReactNode; fadeFrom: number | null }> = ({ children, fadeFrom }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeFrom === null ? 1 : interpolate(frame, [fadeFrom, fadeFrom + OVERLAP * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const FahadIntro: React.FC<FahadIntroProps> = ({ voiceover }) => {
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
            <Fader fadeFrom={next ? Math.round(next.start * fps) - from : null}>
              <Scene start={from / fps} />
            </Fader>
          </Sequence>
        );
      })}
      <Audio src={staticFile(voiceover)} />
    </AbsoluteFill>
  );
};
