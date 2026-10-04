import { linearTiming, springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { Background } from "../../components";
import { FONT_FAMILY } from "../../theme/fonts";
import { THEME } from "../../theme/theme";
import { IntroScene, OutroScene, ShapesScene } from "./scenes";
import { TIMING } from "./timing";

export type SampleShowcaseProps = {
  title: string;
  subtitle: string;
  cta: string;
};

export const SampleShowcase: React.FC<SampleShowcaseProps> = ({ title, subtitle, cta }) => {
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: FONT_FAMILY, color: THEME.text }}>
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={TIMING.intro}>
          <IntroScene title={title} subtitle={subtitle} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TIMING.crossfade })}
        />
        <TransitionSeries.Sequence durationInFrames={TIMING.shapes}>
          <ShapesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TIMING.crossfade })} />
        <TransitionSeries.Sequence durationInFrames={TIMING.outro}>
          <OutroScene cta={cta} totalFrames={durationInFrames} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
