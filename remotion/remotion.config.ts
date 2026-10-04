/**
 * Remotion CLI / Studio configuration.
 * Note: when using the Node.js APIs (@remotion/renderer), this file does not
 * apply — pass options directly to those APIs instead.
 * All options: https://www.remotion.dev/docs/config
 */
import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setCodec("h264");
Config.setPixelFormat("yuv420p");
Config.setCrf(18);

// Remotion downloads its own Chrome Headless Shell by default. On machines where
// that download is not possible (locked-down CI, sandboxes), point it at a local
// Chromium / Headless Shell binary instead:
//   REMOTION_BROWSER_EXECUTABLE=/path/to/headless_shell npm run render
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
