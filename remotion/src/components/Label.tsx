import { THEME, TYPE } from "../theme/theme";

/** Small uppercase label / eyebrow text. */
export const Label: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ ...TYPE.label, color: THEME.textMuted, ...style }}>{children}</div>
);

/** Solid brand pill. */
export const Pill: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      display: "inline-flex", alignItems: "center", gap: 14, height: 76, padding: "0 34px", borderRadius: 38,
      background: "#720013", color: "#FBFCEB", fontSize: 30, fontWeight: 800, letterSpacing: "0.1em", ...style,
    }}
  >
    {children}
  </div>
);
