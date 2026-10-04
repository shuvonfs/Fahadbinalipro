import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/**
 * Fonts are shipped locally in public/fonts (no network needed at render time).
 * Remotion waits for loadFont() promises before rendering each frame.
 */
export const FONT_FAMILY = "Inter";
/** Inter for Latin, Noto Sans Bengali picks up Bengali glyphs automatically. */
export const FONT_STACK = `"Inter", "Noto Sans Bengali", sans-serif`;

const weights = ["400", "600", "800"] as const;

for (const weight of weights) {
  loadFont({ family: FONT_FAMILY, url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`), weight });
  loadFont({ family: "Noto Sans Bengali", url: staticFile(`fonts/noto-sans-bengali-bengali-${weight}-normal.woff2`), weight });
}
