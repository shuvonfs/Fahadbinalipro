import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/**
 * Fonts are shipped locally in public/fonts (no network needed at render time).
 * Remotion waits for loadFont() promises before rendering each frame.
 */
export const FONT_FAMILY = "Inter";

const weights = ["400", "600", "800"] as const;

for (const weight of weights) {
  loadFont({
    family: FONT_FAMILY,
    url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`),
    weight,
  });
}
