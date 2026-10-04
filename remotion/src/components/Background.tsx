import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme/theme";

/** Warm ivory backdrop with a slowly drifting grid and a soft brand glow. */
export const Background: React.FC<{ grid?: boolean }> = ({ grid = true }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const drift = (frame / durationInFrames) * 90;
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.background }}>
      {grid ? (
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(114,0,19,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(114,0,19,0.05) 2px, transparent 2px)",
            backgroundSize: "90px 90px",
            backgroundPosition: `${-drift}px ${-drift}px`,
          }}
        />
      ) : null}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 30% 35%, rgba(128,1,31,0.08) 0%, rgba(128,1,31,0) 55%), radial-gradient(ellipse at 50% 50%, rgba(251,252,235,0) 50%, rgba(240,232,214,0.6) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
