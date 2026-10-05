/** FAHAD BRAND — lead / audience cards with a relative value indicator. */
import { COLORS, INK } from "../tokens";
import { Icon, IconName } from "./Icon";
import { Card, ValueBar } from "./Primitives";

export const LeadCard: React.FC<{
  title: string; caption?: string; icon?: IconName; value: number; hot?: number; w?: number; badge?: string;
}> = ({ title, caption, icon = "user", value, hot = 0, w = 300, badge }) => (
  <Card w={w} hot={hot} pad="24px 26px">
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
      <div style={{ width: 62, height: 62, borderRadius: "50%", display: "grid", placeItems: "center", flex: "none",
        background: hot > 0.5 ? "rgba(251,252,235,0.16)" : "rgba(114,0,19,0.07)" }}>
        <Icon name={icon} size={36} color={hot > 0.5 ? COLORS.ivory : COLORS.burgundy} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: 1.15 }}>{title}</div>
        {caption ? <div style={{ fontSize: 18, fontWeight: 600, opacity: 0.72, marginTop: 4 }}>{caption}</div> : null}
      </div>
      {badge ? <div style={{ marginLeft: "auto", fontSize: 30, fontWeight: 800, color: hot > 0.5 ? COLORS.ivory : COLORS.crimson }}>{badge}</div> : null}
    </div>
    <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.18em", marginBottom: 8, color: hot > 0.5 ? "rgba(251,252,235,0.75)" : INK.muted }}>BUSINESS VALUE</div>
    <ValueBar value={value} w={w - 52} color={hot > 0.5 ? COLORS.ivory : COLORS.crimson} />
  </Card>
);
