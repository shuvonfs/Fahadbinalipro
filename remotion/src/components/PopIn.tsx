import { useCurrentFrame, useVideoConfig } from "remotion";
import { springIn } from "../lib/animation";

/** Spring scale + fade entrance for any child (shapes, cards, icons). */
export const PopIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  rotateFrom?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, rotateFrom = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = springIn(frame, fps, delay, { damping: 14, stiffness: 120 });
  return (
    <div
      style={{
        ...style,
        opacity: Math.min(1, s * 1.4),
        transform: `scale(${s}) rotate(${(1 - s) * rotateFrom}deg)`,
      }}
    >
      {children}
    </div>
  );
};
