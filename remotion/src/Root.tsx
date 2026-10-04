import { Composition } from "remotion";
import { FORMATS, VIDEO } from "./config/video";
import { FAHAD_INTRO_FPS, FAHAD_INTRO_FRAMES, FahadIntro } from "./compositions/FahadIntro/FahadIntro";
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
      {/* <new-compositions> */}
    </>
  );
};

