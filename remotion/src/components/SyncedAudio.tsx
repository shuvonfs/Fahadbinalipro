import { Audio } from "@remotion/media";
import { interpolate, staticFile, useVideoConfig } from "remotion";

/**
 * Audio track with fade in/out. Put files in public/audio and pass e.g. "audio/voice.mp3".
 * Place it inside a <Sequence from={...}> to start it later; frames inside the
 * volume callback are relative to where the audio starts.
 */
export const SyncedAudio: React.FC<{
  src: string;
  volume?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
}> = ({ src, volume = 1, fadeInFrames = 0, fadeOutFrames = 0 }) => {
  const { durationInFrames } = useVideoConfig();
  return (
    <Audio
      src={src.startsWith("http") ? src : staticFile(src)}
      volume={(f) => {
        const fadeIn = fadeInFrames ? interpolate(f, [0, fadeInFrames], [0, 1], { extrapolateRight: "clamp" }) : 1;
        const fadeOut = fadeOutFrames
          ? interpolate(f, [durationInFrames - fadeOutFrames, durationInFrames], [1, 0], { extrapolateLeft: "clamp" })
          : 1;
        return volume * Math.min(fadeIn, fadeOut);
      }}
    />
  );
};
