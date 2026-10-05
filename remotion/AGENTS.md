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
  brand/                    FAHAD BRAND design system for the whole series (import from "../../brand")
    tokens.ts               COLORS, INK, SURFACE (card/glass/hot), TYPE, SAFE (16:9 safe area), MARK
    motion.ts               seconds-based motion language: useT, p, on, rise, fadeUp, pop, drawn, along
    components/             At (positioned pop-in), Headline/Rise/Eyebrow, Card, Pill, Lines + SignalLine,
                            AIEngine (uncertain/active), Node, Bar, ValueBar (LOW→HIGH, no numbers),
                            LeadCard, SearchBar, SettingRow, AdPreview, PageWire, Icon, Backdrop, SceneFader,
                            PromptBox, BriefSection, AssetTile, ChapterTitle, Camera, Wipe, OutputCard, typed,
                            CreativeSignalCanvas (+canvasTrack/canvasPoint), Trail, Pulse, Ripple, PersonNode,
                            ParticleField, SystemField
  components/               generic building blocks (import from "../../components")
    AnimatedText            kinetic type: per-word/char masked rise, stagger, highlight words
    Background              ivory backdrop + drifting grid + glow
    PopIn                   spring scale/rotate entrance for any child
    DrawLine                SVG path draw-on (@remotion/paths evolvePath)
    Label / Pill            eyebrow label, solid brand pill
    SyncedAudio             <Audio> from public/ with fade-in/out
  compositions/
    SampleShowcase/         3 scenes + TransitionSeries (slide, fade); timing.ts holds scene lengths
    FahadIntro/             1080×1920 personal-brand intro synced to public/fahad-intro/voiceover.mp3;
                            cues.ts = measured word times (s), scenes/* key every motion to a cue
    GoogleAdsAI/            1920×1080 explainer synced to public/google-ads-ai/voiceover.mp3 (128.44s);
                            cues.ts = measured word times + scene windows, scenes/Act1–3 (19 scenes)
    AIMaxBriefing/          1920×1080 thought-leadership piece (257.9s) synced to public/ai-max-briefing/voiceover.mp3;
                            cues.ts (word times + SCENES with concepts), scenes/Act1–3 (28 scenes)
    MetaCreativeSignal/     1920×1080 experimental piece (108.3s): one protagonist CreativeSignalCanvas keyframed across the whole
                            timeline (protagonist.ts) + signal trails, reaction nodes, particle fields (scenes/Act1–2)
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

## Voiceover-synced explainers (series workflow)
1. Put the MP3 in `public/<video>/`, run `python3 tools/measure_voiceover.py <mp3> <timing.json>` (offline ASR word times).
2. Write `cues.ts` (seconds) + `SCENES` windows; size the composition to `Math.ceil(C.end * fps)`.
3. Build scenes from `src/brand` — every beat keyed to a cue via `useT(start)`; scenes crossfade with `SceneFader`.
4. Brand rules: ivory dominant, burgundy/crimson for signal & value, Inter, no fake numbers/logos, glass sparingly.

## Changing format, fps, duration
- Globally: edit `VIDEO` in `src/config/video.ts`.
- Per composition: set `width`/`height`/`fps` in its `<Composition>` (e.g. `{...}` from `FORMATS.portrait`).
- Duration: edit the `TIMING` values / `sec(n)`; transitions subtract their length.

## Done checklist
`npm run lint` passes → preview in Studio → `npx remotion render <Id> out/<Id>.mp4` succeeds →
inspect a few frames (`npx remotion still … --frame=N`).
