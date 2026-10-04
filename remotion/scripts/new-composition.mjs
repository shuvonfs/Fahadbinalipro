#!/usr/bin/env node
/**
 * Scaffold a new composition from src/compositions/_Template and register it in src/Root.tsx.
 *   npm run new -- ProductLaunch
 *   npm run new -- ReelTeaser --portrait --seconds=8
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const [name, ...flags] = process.argv.slice(2);
if (!name || !/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error("Usage: npm run new -- <PascalCaseName> [--portrait|--square] [--seconds=N]");
  process.exit(1);
}
const seconds = Number((flags.find((f) => f.startsWith("--seconds=")) || "--seconds=5").split("=")[1]);
const format = flags.includes("--portrait") ? "portrait" : flags.includes("--square") ? "square" : null;
const compDir = path.join(root, "src", "compositions");
const dest = path.join(compDir, name);
if (fs.existsSync(dest)) {
  console.error(`src/compositions/${name} already exists.`);
  process.exit(1);
}
fs.mkdirSync(dest);
const rename = (s) => s.replaceAll("TemplateSceneProps", `${name}Props`).replaceAll("TemplateScene", name);
for (const file of fs.readdirSync(path.join(compDir, "_Template"))) {
  fs.writeFileSync(path.join(dest, rename(file)), rename(fs.readFileSync(path.join(compDir, "_Template", file), "utf8")));
}
const rootFile = path.join(root, "src", "Root.tsx");
let src = fs.readFileSync(rootFile, "utf8");
// merge the helpers we need into the existing config/video import
src = src.replace(/import \{([^}]*)\} from "\.\/config\/video";/, (_, names) => {
  const set = new Set(names.split(",").map((n) => n.trim()).filter(Boolean));
  ["sec", "VIDEO", ...(format ? ["FORMATS"] : [])].forEach((n) => set.add(n));
  return `import { ${[...set].sort((a, b) => a.localeCompare(b)).join(", ")} } from "./config/video";`;
});
src = src.replace(/(import "\.\/theme\/fonts";)/, `import { ${name} } from "./compositions/${name}/${name}";\n$1`);
const size = format ? `width={FORMATS.${format}.width}\n        height={FORMATS.${format}.height}` : "width={VIDEO.width}\n        height={VIDEO.height}";
const block = `<Composition
        id="${name}"
        component={${name}}
        durationInFrames={sec(${seconds})}
        fps={VIDEO.fps}
        ${size}
        defaultProps={{ headline: "${name}" }}
      />
      {/* <new-compositions> */}`;
src = src.replace("{/* <new-compositions> */}", block);
fs.writeFileSync(rootFile, src);
console.log(`Created src/compositions/${name}/${name}.tsx and registered "${name}" in src/Root.tsx.`);
console.log(`Preview: npm run dev    Render: npx remotion render ${name} out/${name}.mp4`);
