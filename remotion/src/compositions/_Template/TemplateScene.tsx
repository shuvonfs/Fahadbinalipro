import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AnimatedText, Background, Label } from "../../components";
import { enter } from "../../lib/animation";
import { FONT_FAMILY } from "../../theme/fonts";
import { THEME, TYPE } from "../../theme/theme";

export type TemplateSceneProps = {
  headline: string;
};

/** Starter scene — copied by `npm run new -- <Name>` (registered in src/Root.tsx). */
export const TemplateScene: React.FC<TemplateSceneProps> = ({ headline }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: FONT_FAMILY, color: THEME.text }}>
      <Background />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <Label style={enter(frame, 4)}>New composition</Label>
        <AnimatedText text={headline} start={10} style={{ ...TYPE.title, marginTop: 24, maxWidth: 1400 }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
