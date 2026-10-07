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

/** Montserrat (geometric display) for the kinetic editorial style; Bengali falls back to Noto Sans Bengali. */
export const DISPLAY_STACK = `"Montserrat", "Noto Sans Bengali", sans-serif`;
for (const weight of ["500", "700", "800", "900"] as const) {
  loadFont({ family: "Montserrat", url: staticFile(`fonts/montserrat-latin-${weight}-normal.woff2`), weight });
}

/** Playfair Display italic (editorial serif lead-ins, LeadAutomation reel). */
export const SERIF_STACK = `"Playfair Display", "Noto Sans Bengali", serif`;
for (const weight of ["700", "800"] as const) {
  loadFont({ family: "Playfair Display", url: staticFile(`fonts/playfair-display-latin-${weight}-italic.woff2`), weight, style: "italic" });
}
