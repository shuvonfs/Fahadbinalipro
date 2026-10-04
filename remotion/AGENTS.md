# Remotion Motion Studio — instructions for AI agents

Programmatic motion-graphics videos built with **Remotion 4.0.532** (React 19, TypeScript).
Everything you render is a pure function of the current frame.

## Use the Remotion skills first
Official Remotion Agent Skills are installed in `.agents/skills/` (linked into `.claude/skills/`):
`remotion-best-practices` (start here), `remotion-create`, `remotion-markup`, `remotion-studio`,
`remotion-render`, `remotion-captions`, `remotion-maps`, `remotion-docs` (look up current API docs),
`remotion-upgrade`. Load the relevant skill before writing Remotion code.

## Project map
```
src/
  index.ts                  registerRoot() — entry point (don't rename)
  Root.tsx                  every <Composition> is registered here (literal defaultProps → editable in Studio)
  config/video.ts           VIDEO (1920×1080 @ 30fps), FORMATS presets, sec(seconds) → frames
  theme/theme.ts            COLORS / THEME / TYPE design tokens — use these, don't hard-code colours
  theme/fonts.ts            Inter loaded locally from public/fonts via @remotion/fonts
  lib/animation.ts          EASE, progress, mapRange, springIn, stagger, enter, exit
  components/               reusable building blocks (import from "../../components")
    AnimatedText            kinetic type: per-word/char masked rise, stagger, highlight words
    Background              ivory backdrop + drifting grid + glow
    PopIn                   spring scale/rotate entrance for any child
    DrawLine                SVG path draw-on (@remotion/paths evolvePath)
    Label / Pill            eyebrow label, solid brand pill
    SyncedAudio             <Audio> from public/ with fade-in/out
  compositions/
    SampleShowcase/         3 scenes + TransitionSeries (slide, fade); timing.ts holds scene lengths
    _Template/              starter copied by `npm run new`
public/                     static assets → reference with staticFile("fonts/…", "audio/…", "images/…")
scripts/                    new-composition.mjs, render-all.mjs
out/                        renders (git-ignored)
```

## Commands
| Task | Command |
|---|---|
| Preview in Remotion Studio | `npm run dev` (opens http://localhost:3000) |
| New composition | `npm run new -- ProductLaunch` (flags: `--portrait`, `--square`, `--seconds=8`) |
| List compositions | `npx remotion compositions` |
| Render the sample | `npm run render` → `out/SampleShowcase.mp4` |
| Render any composition | `npx remotion render <Id> out/<Id>.mp4` |
| Render all | `npm run render:all` |
| Single frame | `npx remotion still <Id> out/<Id>.png --frame=45` |
| Override props | `npx remotion render <Id> out/x.mp4 --props='{"title":"Hello"}'` |
| Type-check + lint | `npm run lint` — run after every change |

If the Chrome Headless Shell download is blocked (CI/sandbox), set
`REMOTION_BROWSER_EXECUTABLE=/path/to/chrome-headless-shell` (read by `remotion.config.ts`).

## How to build a scene
1. `npm run new -- MyVideo` (or copy `_Template/`), then edit `src/compositions/MyVideo/MyVideo.tsx`.
2. Compose scenes with `<Sequence from={…} durationInFrames={…}>`, `<Series>`, or
   `<TransitionSeries>` (`@remotion/transitions`: `fade()`, `slide()`, `wipe()`; timing via
   `linearTiming` / `springTiming`). Transitions overlap scenes and **shorten** the total —
   compute the total like `SampleShowcase/timing.ts`.
3. Inside a Sequence, `useCurrentFrame()` is relative to that sequence's start, and
   `useVideoConfig().durationInFrames` is the **sequence** length — pass the composition total as a prop if needed.
4. Keep durations in one place (a `TIMING` object using `sec()`); set `durationInFrames` in Root from it.

## Animation rules (non-negotiable)
- Drive every animation from `useCurrentFrame()` with `interpolate`, `spring`, or the helpers in `lib/animation.ts`.
- **Never** use CSS `transition`/`animation`, `setTimeout`, `requestAnimationFrame`, `Date.now()` or `Math.random()`
  (use `random(seed)` from `remotion`). These break rendering (flicker / non-determinism).
- Always clamp interpolations (helpers already do).
- Typography: use `TYPE` tokens and `AnimatedText`; keep text inside safe margins (~90 px).
- Images/video: `<Img>` from `remotion` / `<Video>` from `@remotion/media` with `staticFile()` — not plain `<img>`.
- Fonts: add woff2 files to `public/fonts` and register them in `theme/fonts.ts` (no network fonts at render time).

## Audio & sync
- Put files in `public/audio/` and use `<SyncedAudio src="audio/voice.mp3" fadeOutFrames={15} />`
  (or `<Audio>` from `@remotion/media`). Wrap in `<Sequence from={sec(2)}>` to start later.
- Sync to narration by converting timestamps to frames: `sec(12.4)`; keep a cue table
  (`const CUES = { title: sec(1.2), reveal: sec(4.8) }`) and reference it from scenes.
- Size a composition to its audio: `calculateMetadata` + `getAudioDurationInSeconds()`
  from `@remotion/media-utils` (see the `remotion-docs` skill).
- Audio visualisation: `useAudioData` / `visualizeAudio` from `@remotion/media-utils`.

## Changing format, fps, duration
- Globally: edit `VIDEO` in `src/config/video.ts`.
- Per composition: set `width`/`height`/`fps` in its `<Composition>` (e.g. `{...}` from `FORMATS.portrait`).
- Duration: edit the `TIMING` values / `sec(n)`; transitions subtract their length.

## Done checklist
`npm run lint` passes → preview in Studio → `npx remotion render <Id> out/<Id>.mp4` succeeds →
inspect a few frames (`npx remotion still … --frame=N`).
