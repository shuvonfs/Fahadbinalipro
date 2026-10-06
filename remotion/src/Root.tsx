import { Composition } from "remotion";
import { FORMATS, VIDEO } from "./config/video";
import { AI_MAX_BRIEFING_FPS, AI_MAX_BRIEFING_FRAMES, AIMaxBriefing } from "./compositions/AIMaxBriefing/AIMaxBriefing";
import { BROAD_SHARP_FPS, BROAD_SHARP_FRAMES, BroadSharp } from "./compositions/BroadSharp/BroadSharp";
import { FAHAD_INTRO_FPS, FAHAD_INTRO_FRAMES, FahadIntro } from "./compositions/FahadIntro/FahadIntro";
import { GOOGLE_ADS_AI_FPS, GOOGLE_ADS_AI_FRAMES, GoogleAdsAI } from "./compositions/GoogleAdsAI/GoogleAdsAI";
import { META_CREATIVE_SIGNAL_FPS, META_CREATIVE_SIGNAL_FRAMES, MetaCreativeSignal } from "./compositions/MetaCreativeSignal/MetaCreativeSignal";
import { SampleShowcase } from "./compositions/SampleShowcase/SampleShowcase";
import { TOTAL_FRAMES } from "./compositions/SampleShowcase/timing";
import "./theme/fonts";

/**
 * Every video is registered here. Keep defaultProps as literals so Remotion
 * Studio can edit and save them. `npm run new -- <Name>` appends entries
 * above the marker comment.
 *
 * Change format per composition: width/height/fps (see FORMATS in config/video.ts).
 * Change length: durationInFrames (use sec(n) or a TIMING total).
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SampleShowcase"
        component={SampleShowcase}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          title: "Programmatic motion graphics, made in React.",
          subtitle: "Remotion · Motion Studio",
          cta: "Your next video starts here.",
        }}
      />
      <Composition
        id="FahadIntro"
        component={FahadIntro}
        durationInFrames={FAHAD_INTRO_FRAMES}
        fps={FAHAD_INTRO_FPS}
        width={FORMATS.portrait.width}
        height={FORMATS.portrait.height}
        defaultProps={{ voiceover: "fahad-intro/voiceover.mp3" }}
      />
      <Composition
        id="GoogleAdsAI"
        component={GoogleAdsAI}
        durationInFrames={GOOGLE_ADS_AI_FRAMES}
        fps={GOOGLE_ADS_AI_FPS}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{ voiceover: "google-ads-ai/voiceover.mp3" }}
      />
      <Composition
        id="AIMaxBriefing"
        component={AIMaxBriefing}
        durationInFrames={AI_MAX_BRIEFING_FRAMES}
        fps={AI_MAX_BRIEFING_FPS}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{ voiceover: "ai-max-briefing/voiceover.mp3" }}
      />
      <Composition
        id="MetaCreativeSignal"
        component={MetaCreativeSignal}
        durationInFrames={META_CREATIVE_SIGNAL_FRAMES}
        fps={META_CREATIVE_SIGNAL_FPS}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{ voiceover: "meta-creative-signal/voiceover.mp3" }}
      />
      <Composition
        id="BroadSharp"
        component={BroadSharp}
        durationInFrames={BROAD_SHARP_FRAMES}
        fps={BROAD_SHARP_FPS}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{ voiceover: "broad-delivery-sharp-strategy/voiceover.mp3" }}
      />
      {/* <new-compositions> */}
    </>
  );
};

