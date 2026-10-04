import { useCurrentFrame } from "remotion";
import { progress, stagger } from "../lib/animation";

type Props = {
  text: string;
  /** Animate per word (default) or per character. */
  by?: "word" | "char";
  /** Frame (relative to the parent Sequence) when the first unit starts. */
  start?: number;
  /** Frames between consecutive units. */
  every?: number;
  /** Frames each unit takes to arrive. */
  duration?: number;
  style?: React.CSSProperties;
  /** Words to colour with the accent colour. */
  highlight?: string[];
  accentColor?: string;
};

/** Kinetic typography: each word/char rises out of a mask, staggered. */
export const AnimatedText: React.FC<Props> = ({
  text,
  by = "word",
  start = 0,
  every = 4,
  duration = 20,
  style,
  highlight = [],
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const units = by === "word" ? text.split(" ") : Array.from(text);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", ...style }}>
      {units.map((u, i) => {
        const p = progress(frame, stagger(i, every, start), duration);
        const isHi = highlight.includes(u.replace(/[.,!?]/g, ""));
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.08em" }}>
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${(1 - p) * 110}%)`,
                color: isHi ? accentColor : undefined,
                whiteSpace: "pre",
              }}
            >
              {u}
              {by === "word" && i < units.length - 1 ? " " : ""}
            </span>
          </span>
        );
      })}
    </div>
  );
};
