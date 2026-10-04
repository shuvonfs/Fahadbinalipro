import { Circle, Rect, Star, Triangle } from "@remotion/shapes";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, DrawLine, Label, Pill, PopIn } from "../../components";
import { EASE, enter, mapRange, progress } from "../../lib/animation";
import { COLORS, THEME, TYPE } from "../../theme/theme";

const center: React.CSSProperties = { alignItems: "center", justifyContent: "center", flexDirection: "column" };

/** Scene 1 — kinetic headline with a drawn underline. */
export const IntroScene: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={center}>
      <Label style={enter(frame, 4)}>{subtitle}</Label>
      <AnimatedText
        text={title}
        start={10}
        every={5}
        style={{ ...TYPE.hero, color: THEME.text, marginTop: 28, maxWidth: 1750 }}
        highlight={["motion"]}
        accentColor={COLORS.crimson}
      />
      <DrawLine d="M 10 20 C 300 4, 600 36, 890 14" width={900} height={40} start={34} duration={26} style={{ marginTop: 18 }} />
    </AbsoluteFill>
  );
};

/** Scene 2 — shapes pop in on a stagger, then orbit gently. */
export const ShapesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const shapes = [
    <Circle key="c" radius={90} fill={COLORS.burgundy} />,
    <Rect key="r" width={170} height={170} cornerRadius={28} fill={COLORS.crimson} />,
    <Triangle key="t" length={200} direction="up" fill={COLORS.wine} cornerRadius={14} />,
    <Star key="s" points={5} innerRadius={50} outerRadius={105} fill={COLORS.maroon} cornerRadius={8} />,
  ];
  return (
    <AbsoluteFill style={center}>
      <Label style={enter(frame, 2)}>Shapes · springs · stagger</Label>
      <div style={{ ...TYPE.title, color: THEME.text, marginTop: 20, ...enter(frame, 6, 20, 50) }}>
        Built from code, frame by frame
      </div>
      <div style={{ display: "flex", gap: 110, marginTop: 110, alignItems: "center" }}>
        {shapes.map((s, i) => (
          <PopIn key={i} delay={18 + i * 7} rotateFrom={i % 2 ? -90 : 90}>
            <div style={{ transform: `translateY(${Math.sin(t * 2 + i) * 14}px) rotate(${Math.sin(t + i) * 6}deg)` }}>{s}</div>
          </PopIn>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/**
 * Scene 3 — outro card that reports the live format (proves config changes flow through).
 * Inside a (Transition)Series, useVideoConfig().durationInFrames is the *scene* length,
 * so the composition total is passed in as a prop.
 */
export const OutroScene: React.FC<{ cta: string; totalFrames: number }> = ({ cta, totalFrames }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const draw = mapRange(frame, [0, 45], [0, 1], EASE.inOut);
  const perimeter = 2 * (1300 + 560) - 8 * 60 + 2 * Math.PI * 60;
  return (
    <AbsoluteFill style={center}>
      <svg width={1310} height={570} viewBox="0 0 1310 570" style={{ position: "absolute" }}>
        <rect x={5} y={5} width={1300} height={560} rx={60} fill="rgba(255,255,255,0.45)" stroke={THEME.border} strokeWidth={3} />
        <rect x={5} y={5} width={1300} height={560} rx={60} fill="none" stroke={COLORS.crimson} strokeWidth={6}
          strokeLinecap="round" strokeDasharray={`${draw * perimeter} ${perimeter}`} />
      </svg>
      <AnimatedText text={cta} start={6} every={5} style={{ ...TYPE.title, color: THEME.text }} />
      <div style={{ marginTop: 40, ...enter(frame, 24) }}>
        <Pill>{`${width}×${height} · ${fps} FPS · ${(totalFrames / fps).toFixed(1)}s`}</Pill>
      </div>
      <Label style={{ marginTop: 36, opacity: progress(frame, 34, 20) }}>Rendered with Remotion</Label>
    </AbsoluteFill>
  );
};
