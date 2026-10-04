#!/usr/bin/env node
/** Render every registered composition to out/<id>.mp4. */
import { execSync } from "node:child_process";
const list = execSync("npx remotion compositions --quiet", { encoding: "utf8" }).trim().split(/\s+/).filter(Boolean);
for (const id of list) {
  console.log(`\n▶ Rendering ${id}`);
  execSync(`npx remotion render ${id} out/${id}.mp4`, { stdio: "inherit" });
}
