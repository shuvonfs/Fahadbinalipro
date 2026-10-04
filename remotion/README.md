# Remotion Motion Studio

Programmatic motion graphics with [Remotion](https://www.remotion.dev/) **4.0.532** · React 19 · TypeScript.
Default format **1920×1080 @ 30 fps** (change in `src/config/video.ts`).

```bash
cd remotion
npm install                     # first time only
npm run dev                     # Remotion Studio → http://localhost:3000
npm run new -- MyVideo          # scaffold + register a new composition
npm run render                  # out/SampleShowcase.mp4
npx remotion render MyVideo out/MyVideo.mp4
```

See **[AGENTS.md](AGENTS.md)** for the project map, animation rules, audio sync and render options.

Docs: https://www.remotion.dev/docs · Licence: Remotion is free for individuals and teams of up to 3 —
see https://www.remotion.dev/license.
