import { evolvePath } from "@remotion/paths";
import { useCurrentFrame } from "remotion";
import { progress } from "../lib/animation";

/** Draws an SVG path on over `duration` frames (uses @remotion/paths). */
export const DrawLine: React.FC<{
  d: string;
  width: number;
  height: number;
  start?: number;
  duration?: number;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}> = ({ d, width, height, start = 0, duration = 30, stroke = "#80011F", strokeWidth = 6, style }) => {
  const frame = useCurrentFrame();
  const { strokeDasharray, strokeDashoffset } = evolvePath(progress(frame, start, duration), d);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style}>
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
    </svg>
  );
};
