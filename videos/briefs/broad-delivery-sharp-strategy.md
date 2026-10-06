# META ADS — BROAD DELIVERY, SHARP STRATEGY
## Premium 16:9 Thought-Leadership Video · Motion & Animation Direction
### Remotion × Hyperframe · Fahad Personal Brand Series

Create a premium **1920×1080 (16:9), 30fps** motion-graphics video using the uploaded ElevenLabs voiceover (`public/broad-delivery-sharp-strategy/voiceover.mp3`) and the script below.

**Voiceover duration: 191.71 s (3:11.7).** The video must end exactly when the voice ends.

**Topic:** Using Broad Targeting in Meta Ads does not mean your marketing strategy is broad.
**Final idea:** *Broad delivery. Sharp strategy.*

---

## 01 — AUDIO IS THE MASTER TIMELINE (already measured)

Every timestamp in this brief was measured from the actual voiceover with offline word-level speech recognition plus an energy-envelope pass for the list passages. Do **not** use equal-length scenes and do **not** guess. Trigger every visual event on the spoken word listed in the scene map (§08). The full word-timing file is in `public/broad-delivery-sharp-strategy/voiceover-timing.json`.

Sync rules:

- A visual event lands **0–120 ms after** its trigger word starts. It is never early.
- A concept stays on screen for as long as it is being spoken about. Transition when the thought changes, not when a timer runs out.
- Natural pauses in the voice are visual breathing room: hold the frame and add only a small motion (a slow camera drift or a soft pulse).
- Lists (Interest/Age/Location/Behaviour; Customer definition/Offer/Message/Conversion goal; the 7-step chain) reveal **one item per spoken word**, never all at once.
- The last frame aligns with 191.71 s.

> ⚠ **Script vs voiceover:** the written script ends with "এটাই difference।", but the voiceover is effectively missing it. "Sharp strategy." ends at 190.46 s and only a ~0.3 s fragment follows at 190.8–191.1 s. Treat **"Broad delivery. Sharp strategy."** as the final spoken line and use 190.5–191.7 s as the final hold. If the line is regenerated later, re-measure and retime only the last scene.

---

## 02 — CORE CREATIVE IDEA: THE LENS

This video needs a **new motion language** that is different from the previous videos in the series (Google Ads AI, AI Max Briefing, Creative Is a Signal).

The central metaphor comes from optics and cinematography:

```text
BROAD DELIVERY  =  a wide, open field of view (soft, expansive, many possibilities)
SHARP STRATEGY  =  a precise point of focus (crisp, intentional, defined)
```

A wide lens and a sharp focus are **not opposites**. A great photograph has both. That is the argument of the video.

So the visual system uses **camera and lens language**:

- **Depth of field:** the audience/delivery layer lives in soft focus. Strategy elements are always razor sharp.
- **Rack focus:** shifting focus between layers is the main transition for comparing "broad" vs "specific".
- **The Lens (recurring hero object):** a precise ring with tick marks. Whatever passes inside it snaps into sharp focus with a tiny "focus tick". It represents strategy.
- **Aperture iris:** aperture blades open (wide delivery) and close (sharp point), used for chapter changes and the "এটাই Strategy" moments.
- **Focus pull on words:** "broad" words are wide-tracked and softly blurred; "sharp" words have tight tracking, crisp edges and a needle-thin crimson underline.

Here, blur carries meaning (soft = broad, sharp = strategy). Never use blur as decoration, and never blur text the viewer must read.

---

## 03 — VISUAL IDENTITY (Fahad brand system)

- **Background:** `#FBFCEB` soft ivory. The video lives on ivory.
- **Accents:**
  - `#720013` burgundy (active / strategy)
  - `#2D0001` deep maroon (headlines)
  - `#3F1521` wine (body)
  - `#80011F` crimson (signal, focus, emphasis)
- **Typography:**
  - Inter (Latin) and Noto Sans Bengali (Bengali). Large type is reserved for thesis lines only; labels stay small and uppercase.
  - Key English phrases may be large: **BROAD TARGETING**, **BROAD STRATEGY**, **CUSTOMER DEFINITION**, **BROAD DELIVERY. SHARP STRATEGY.**
- **Safe margins:** about 9% (170 px horizontal, 100 px vertical).
- **Not allowed:**
  - neon, purple, cyberpunk, glowing brains or robots
  - fake Meta UI or logos
  - fake metrics: no CTR/CPM/CPC/ROAS, percentages or audience sizes
  - stock-footage-driven storytelling
- **Glass:** only for the hero Lens and the strategy brief panel.

---

## 04 — MOTION LANGUAGE (new for this video)

| Concept | Motion behaviour |
|---|---|
| Broad audience / delivery | **AudienceField**: a soft, slowly breathing population of thousands of small dots filling the 16:9 frame, softly defocused |
| Strategy element | **Focus snap**: blur → sharp in ~0.35 s with a crisp ring tick and a slight scale settle (1.03 → 1.00) |
| Old manual targeting | **Reticle and dials**: mechanical, stepwise motion (discrete clicks) |
| AI delivery | **Open aperture**: the field expands, dots self-organise in smooth, continuous, organic drift |
| Comparison | **Rack focus**: focus moves from the back layer to the front layer and back |
| Chapter / example change | **Aperture iris wipe**: blades close to a point, then reopen on the new scene |
| Specific message / problem | **Resonance line**: a thin waveform travels from the creative and "finds" matching dots, which turn crimson |
| Thesis lines | **Mask rise plus focus pull**: words rise and sharpen at the same time |
| Final lockup | Slow, cinematic, minimal |

Camera choreography: a slow dolly through depth layers (parallax between the soft field and the sharp foreground), plus controlled zoom-outs to reveal relationships. No random zooms, glitch, flashes, particle explosions or excessive bounce.

**Reuse from the existing brand system:**
- `src/brand`: tokens, `motion.ts`, `Pill`, `Card`, `SignalLine`/`Trail`/`Pulse`
- `CreativeSignalCanvas` for the ad creatives
- `SystemField` for the abstract AI delivery field
- `PersonNode` for anonymous people

**New reusable components** (add to `src/brand/components` for future videos):
- **`AudienceField`**: a deterministic dot population with `focus` (blur amount), `breath`, a `highlight(predicate)` that turns a matching subset crimson, and `organize` (drift toward clusters).
- **`FocusLens`**: the hero ring with tick marks and an optional glass interior. Children inside it render sharp, outside soft.
- **`SharpnessRow`**: a label that animates blur → sharp, with an underline draw.
- **`ApertureWipe`**: an SVG iris transition (6 blades).
- **`StrategySpine`**: a horizontal rail whose nodes snap into focus one by one.
- **`DepthLayers`**: a back/mid/front parallax wrapper with a rack-focus helper.

---

## 05 — THE SCRIPT (as spoken)

Meta Ads-এ Broad Targeting ব্যবহার করছেন? তার মানে কিন্তু আপনার Marketing Strategy Broad হয়ে যায়নি। বরং একটা সময় আমরা ভাবতাম— "আমি কাকে Target করব?" Interest কী হবে? Age কত? Location কোথায়? কোন Behaviour select করব? কিন্তু আজকের AI-driven Meta Ads environment-এ প্রশ্নটা ধীরে ধীরে বদলাচ্ছে। এখন শুধু "কাকে Target করব?" না। বরং— "আমি আসলে কেমন Customer চাই?" … (full script as provided; the spoken text matches it except for the final "এটাই difference।" noted above.)

---

## 06 — STRUCTURE AT A GLANCE

| # | Scene | Time (s) | Core visual |
|---|---|---|---|
| 01 | Hook | 0.00 – 5.40 | Wide soft field → the Lens cuts in: strategy is not broad |
| 02 | The old way | 5.40 – 13.55 | Manual reticle and four dials narrowing the field |
| 03 | The question changes | 13.55 – 23.05 | Dials release, aperture opens → "What kind of customer do I want?" |
| 04 | Example 1: Study Abroad | 23.05 – 42.05 | Broad delivery layer vs sharp strategy brief (rack focus) |
| 05 | Delivery broad, everything else sharp | 42.05 – 50.35 | Signature Sharpness Dial |
| 06 | Example 2: Doctor | 50.35 – 70.85 | Creative → problem resonance → need; broad audience, specific message |
| 07 | Example 3: Real Estate | 70.85 – 90.85 | One building, two lenses, two focal points → "এটাই Strategy" |
| 08 | Thesis: Targeting ≠ Strategy | 90.85 – 113.10 | Split screen: open aperture vs fog of unanswered questions; sky/ground separation |
| 09 | Things that must never be broad | 113.10 – 131.00 | The Strategy Spine: 7 nodes snap into focus → context into AI |
| 10 | Meta's signals | 131.00 – 147.15 | Illustrative ranking field; the marketer still supplies relevant signals |
| 11 | What I mean by Broad Targeting | 147.15 – 161.15 | Random spray struck out → elastic delivery vs rigid strategy ruler |
| 12 | The modern shift | 161.15 – 177.60 | Manual search → AI discovery → marketer defines "valuable customer" |
| 13 | Fahad close | 177.60 – 191.71 | Vanity metrics → the right customer, message and outcome → final lockup |

---

## 07 — DETAILED SCENE MAP (timestamps = spoken word onsets)

### SCENE 01 — HOOK · 0.00 – 5.40
**Voice:**
- 0.12 "Meta Ads-এ **Broad** (0.76) **Targeting** (1.04) ব্যবহার করছেন?"
- 2.59 "তার মানে কিন্তু আপনার Marketing **Strategy** (3.95) **Broad** (4.47) হয়ে যায়নি।" (ends 5.24)

**Visual:**
- 0.00: an empty ivory canvas. A single crimson dot breathes at the centre.
- 0.76 "Broad": the dot divides outward into the **AudienceField**, thousands of soft dots expanding to fill the full 16:9 frame (wide, generous, slightly defocused). A small label, `BROAD TARGETING`, sets in wide tracking.
- 1.04 "Targeting": a soft horizontal "delivery beam" sweeps across the field.
- 3.95 "Strategy": the **Lens** slides in from the right and stops at centre. Inside it, everything snaps razor sharp (the first focus tick). The word **STRATEGY** sits inside the ring.
- 4.47 "Broad": the word "BROAD" tries to attach to "STRATEGY" but stays blurred and falls away. A thin crimson ≠ draws between them.
- 5.24 → 5.40: hold, with the field breathing.

**The viewer learns:** broad delivery is visible everywhere, but strategy is the focused point.

---

### SCENE 02 — THE OLD WAY · 5.40 – 13.55
**Voice:**
- 5.77 "বরং একটা সময় আমরা ভাবতাম—"
- 7.66 "আমি কাকে **Target** করব?"
- 9.18 "**Interest** কী হবে?"
- 10.20 "**Age** কত?"
- 11.03 "**Location** কোথায়?"
- 12.11 "কোন **Behaviour** (12.27) select করব?" (ends 13.20)

**Visual:**
- 5.77: an iris wipe into a slightly warmer "archive" tone (still ivory). A mechanical **targeting reticle** (crosshair plus distance ticks) appears over the field. Motion turns stepwise and mechanical here, deliberately unlike the later AI motion.
- 7.66: the question `WHO DO I TARGET?` appears small at the top-left with a typewriter tick.
- Four dials mount along the bottom rail. Each one clicks into a setting on its word, and each click crops the field with a nested rectangle, so the visible audience shrinks step by step:
  - 9.18 **INTEREST**: a dial turns, the first crop.
  - 10.20 **AGE**: a dial turns, a second crop.
  - 11.03 **LOCATION**: a pin plus a dial, a third crop.
  - 12.27 **BEHAVIOUR**: a dial, a fourth crop. Only a small framed patch of dots remains.
- 13.20: hold. The narrowed frame should feel tight and manual.

**The viewer learns:** in the old way, marketers narrowed the audience by hand.

---

### SCENE 03 — THE QUESTION CHANGES · 13.55 – 23.05
**Voice:**
- 13.73 "কিন্তু আজকের **AI-driven** Meta Ads environment-এ প্রশ্নটা ধীরে ধীরে **বদলাচ্ছে**।" (ends 18.00)
- 18.30 "এখন শুধু '**কাকে Target করব?**' না।" (ends 20.16)
- 20.38 "বরং—"
- 21.15 "আমি আসলে **কেমন Customer** চাই?" (ends 22.78)

**Visual:**
- 14.3 "AI-driven": the crop rectangles release one by one in reverse order (Behaviour → Location → Age → Interest). The **aperture opens**, the field expands to full frame, and dots move into organic, continuous drift (the new motion). The abstract delivery field (rotating dotted orbits, `SystemField`) fades in softly behind.
- 16.5 "বদলাচ্ছে": the reticle dissolves.
- 18.30: a card reading `WHO DO I TARGET?` appears.
- 20.38 "বরং": the card slides left and drops out of focus (rack focus to the background).
- 21.15: the Lens returns to the centre foreground and a new question assembles inside it with a mask rise plus focus pull: **WHAT KIND OF CUSTOMER DO I ACTUALLY WANT?**
- 22.0: an anonymous customer silhouette (no face) sharpens inside the ring. The field behind stays soft.

**The viewer learns:** the question has moved from "who do I target?" to "what customer do I want?".

---

### SCENE 04 — EXAMPLE 1: STUDY ABROAD · 23.05 – 42.05
**Voice:**
- 23.19 "ধরুন আপনি একটা **Study Abroad** Consultancy-এর Marketing করছেন।" (ends 26.07)
- 26.30 "আপনি **Meta**-কে (26.58) একটা **broad audience** (27.30) দিলেন—"
- 28.40 "**Bangladesh-এর students** (29.06)।"
- 29.82 "Meta অনেক ধরনের মানুষের কাছে আপনার ad দেখাতে পারে।" (ends 32.60)
- 32.81 "কিন্তু আপনার **Business Strategy** যদি হয়—"
- 34.88 "**UK-তে Master's** (34.96 / 35.40) করতে আগ্রহী, নির্দিষ্ট **academic profile** (37.52) এবং **realistic budget** (38.56 / 39.12)-এর students-এর মধ্যে **qualified enquiry** (40.44 / 40.96) তৈরি করা।" (ends 41.80)

**Visual (two depth layers, rack focus):**
- 23.19: an aperture wipe opens to a chapter tag `EXAMPLE 01 · STUDY ABROAD` with small student, university and passport icons.
- 26.58 → 27.30: the **back layer** AudienceField fills the frame (soft) with the label `DELIVERY · BROAD`.
- 29.06: the label updates to `BANGLADESH · STUDENTS`.
- 29.82: three conceptual ad thumbnails (`CreativeSignalCanvas`, study-abroad variant) glide across the field and touch many dots, each touch a soft pulse. This shows wide reach.
- 32.81: **rack focus.** The back layer softens further, and a front glass panel, `STRATEGY BRIEF`, comes into sharp focus at the right third of the frame.
- Each criterion snaps into the brief on its word with a focus tick. At the same time, the matching subset of dots in the back layer turns crimson, showing that the system can find them inside the wide field:
  - 35.0 **UK MASTER'S**: a subset of dots lights up.
  - 37.52 **ACADEMIC PROFILE**: the subset narrows.
  - 38.56 **REALISTIC BUDGET**: it narrows further.
  - 40.44 **QUALIFIED ENQUIRY**: a burgundy pill locks at the bottom of the brief, and only a precise constellation of crimson dots remains glowing in the soft field.
- 41.80 → 42.05: hold.

**The viewer learns:** delivery can be broad while the definition of the customer is precise.

---

### SCENE 05 — DELIVERY BROAD, EVERYTHING ELSE SHARP (signature scene) · 42.05 – 50.35
**Voice:**
- 42.13 "তাহলে আপনার **strategy** (42.73) কিন্তু **broad না** (43.45)।"
- 44.46 "আপনার **delivery** (44.66) **broad** (45.10),"
- 45.67 "**Customer definition** (45.71) **sharp** (46.63),"
- 47.29 "**Offer** **sharp** (47.61),"
- 48.20 "**Message** sharp,"
- 49.00 "**Conversion goal** (49.56) sharp।" (ends 50.00)

**Visual: the Sharpness Dial.** This is a precise spec sheet that fills the left 60% of the frame. Each row has a label plus a "focus meter" (a horizontal ruler with ticks).
- 42.73 "strategy": the Lens shrinks to a small icon at the top-left.
- 43.45 "broad না": the word "BROAD" blurs out and drops.
- 44.66 **DELIVERY**: the top row renders deliberately **wide and soft**. Its bar is a wide soft gradient with the tag `BROAD` in wide tracking, and its ruler stays out of focus.
- Each following row snaps **blur → razor sharp** with a shutter tick, a needle-thin crimson underline and a tag `SHARP` in tight tracking:
  - 45.71 **CUSTOMER DEFINITION**
  - 47.29 **OFFER**
  - 48.20 **MESSAGE**
  - 49.00 **CONVERSION GOAL**, then the tag lands on "sharp" at 49.56.
- Right 40%: the Lens shows one soft row above four sharp rows as a vertical depth stack, mirroring the left side.
- 50.00 → 50.35: hold. This frame should be screenshot-worthy.

**The viewer learns:** only delivery is broad; everything else is sharp.

---

### SCENE 06 — EXAMPLE 2: DOCTOR · 50.35 – 70.85
**Voice:**
- 50.47 "ধরুন একজন **Doctor**-এর জন্য campaign চালাচ্ছেন।" (ends 52.72)
- 52.90 "**Audience broad** রাখলেন।" (ends 54.05)
- 54.24 "কিন্তু **Creative** বলছে—"
- 55.65 "'বারবার **chest discomfort** (56.01) হচ্ছে?"
- 57.39 "একজন **qualified cardiologist**-এর (58.23) পরামর্শ নিন।'" (ends 59.61)
- 59.87 "এখানে আপনি শুধু '**মানুষ**' target করছেন না।" (ends 61.92)
- 62.08 "আপনি একটা **specific problem** নিয়ে কথা বলছেন।" (ends 64.35)
- 64.50 "একটা **specific need**-এর সঙ্গে **connect** করছেন।" (ends 66.83)
- 67.74 "অর্থাৎ— **Audience** (67.78) **broad** (68.18) হতে পারে, কিন্তু **message** (69.46) **specific** (69.94)।" (ends 70.42)

**Visual:**
- 50.47: an iris wipe to `EXAMPLE 02 · HEALTHCARE` with doctor and appointment icons. The tone is calm and trustworthy, with no medical imagery, no hearts beating fast and nothing alarming.
- 52.90: the AudienceField (soft) fills the back with the label `AUDIENCE · BROAD`.
- 54.24: a conceptual mobile ad creative (generic frame, no Meta UI) rises in the foreground.
- 55.65 → 59.40: the headline types in sync with the voice: "বারবার chest discomfort হচ্ছে?" and then "একজন qualified cardiologist-এর পরামর্শ নিন।". A small `BOOK CONSULTATION` CTA settles.
- 59.87 "মানুষ": the generic "people" dots stay soft and unchanged, so targeting people alone does nothing.
- 62.08 "specific problem": a **resonance line** (a calm, thin waveform, not an ECG spike) travels out from the creative's headline. A small sharp tag appears: `PROBLEM · CHEST DISCOMFORT`.
- 64.50 "specific need": the line finds a few matching dots in the soft field, which turn crimson and ripple gently. A tag reads `NEED · QUALIFIED CARDIOLOGIST ADVICE`.
- 65.8 "connect": thin threads connect the creative to those dots.
- 67.74 → 70.42 (**rack focus formula**): two large labels sit side by side.
  - Left: **AUDIENCE: BROAD**, soft and wide (focus at 68.18).
  - Right: **MESSAGE: SPECIFIC**, which pulls razor sharp at 69.94 while the left goes soft.
- 70.42 → 70.85: hold.

**The viewer learns:** the audience can stay broad when the message is specific.

---

### SCENE 07 — EXAMPLE 3: REAL ESTATE · 70.85 – 90.85
**Voice:**
- 70.94 "আর **Real Estate**-এ ধরুন— **Dhaka**-এর একটা residential project-এর জন্য **broad audience** ব্যবহার করলেন।" (ends 75.49)
- 75.77 "কিন্তু Creative বলছে— 'নিজের **পরিবারের** (77.33) জন্য **Dhaka**-তে (78.05) **3-bedroom** (78.53) apartment খুঁজছেন?'" (ends 79.81)
- 80.18 "আরেকটা Creative—"
- 81.20 "'আপনার **next property** (81.52) কি **investment**-এর (82.48) জন্য?'" (ends 83.28)
- 83.62 "Audience delivery broad হতে পারে।" (ends 85.21)
- 85.42 "কিন্তু আপনি customer-এর **Need** (86.46), **Intent** (86.94) এবং **Context** (87.74) নিয়ে **specific** (88.46) কথা বলছেন।" (ends 89.54)
- 89.78 "**এটাই Strategy।**" (≈ 90.2)

**Visual: one building, two lenses.**
- 70.94: an iris wipe to `EXAMPLE 03 · REAL ESTATE`. An elegant editorial apartment building illustration sits centre (reuse the `ApartmentArt` style). The broad AudienceField is behind.
- 75.77: **Creative A** hinges out of the building to the left-front. Its headline types "নিজের পরিবারের জন্য Dhaka-তে 3-bedroom apartment খুঁজছেন?". **Lens A** projects a cone of focus onto a region of the field, where a cluster sharpens. Tags snap on the words: `FAMILY` (77.33), `DHAKA` (78.05), `3-BEDROOM` (78.53).
- 80.18: **Creative B** hinges out to the right-front. Its headline reads "আপনার next property কি investment-এর জন্য?". **Lens B** focuses a different cluster with the tags `INVESTOR` (81.52) and `RETURN / VALUE` (82.48).
- 83.62: a slow zoom-out shows the same building and the same broad field, with two different focal points. The label `SAME PROJECT · DIFFERENT FOCUS` appears.
- 85.42: three sharp tags lock under the frame on their words: **NEED** (86.46), **INTENT** (86.94), **CONTEXT** (87.74). They underline together at 88.46.
- 89.78 "এটাই Strategy": the **aperture iris closes** from the edges to a crisp point. **STRATEGY** appears inside the ring, in burgundy and razor sharp. Hold.

**The viewer learns:** the same product, aimed through different focal points, becomes strategy.

---

### SCENE 08 — THESIS: BROAD TARGETING ≠ BROAD STRATEGY · 90.85 – 113.10
**Voice:**
- 91.03 "তাই একটা জিনিস খুব **পরিষ্কারভাবে** বুঝতে হবে—" (ends 93.31)
- 93.43 "**Broad Targeting** (93.83) আর **Broad Strategy** (94.91) **এক জিনিস না** (95.43)।" (ends 96.07)
- 96.38 "Broad Targeting হলো— 'Meta-কে **বেশি জায়গা** (98.26 / 98.42) দেওয়া, যাতে তার **system** (99.54) সম্ভাব্য customer **খুঁজে নিতে পারে** (100.94)।'" (ends 101.54)
- 101.92 "কিন্তু Broad Strategy হলো— 'আমার **customer কে** (103.68), তার **problem কী** (104.72), আমি **কী offer করছি** (106.04) এবং business-এর জন্য **success দেখতে কেমন** (107.96)— এসব **পরিষ্কার না থাকা** (109.24)।'" (ends 110.62)
- 110.77 "দুটোর মধ্যে **আকাশ-পাতাল** difference।" (ends 112.85)

**Visual: a big 16:9 split.**
- 93.83: the frame splits vertically. The left half shows the title **BROAD TARGETING**.
- 94.91: the right half shows **BROAD STRATEGY**. A crimson ≠ lands on the divider at 95.43.
- **Left half (96.38 → 101.54): healthy, intentional openness.**
  - The aperture opens wide (98.42 "বেশি জায়গা").
  - The abstract delivery field rotates (99.54 "system").
  - Small crimson search arcs sweep through the dots and pick out potential customers (100.94).
  - Label: `SPACE FOR THE SYSTEM TO FIND CUSTOMERS`.
  - The motion is smooth and purposeful, and the colour stays burgundy-active.
- **Right half (101.92 → 110.62): fog.** Four question cards drift in, each **intentionally out of focus** and unanchored, with no lines connecting them:
  - `WHO IS THE CUSTOMER?` (103.68)
  - `WHAT IS THE PROBLEM?` (104.72)
  - `WHAT ARE WE OFFERING?` (106.04)
  - `WHAT DOES SUCCESS LOOK LIKE?` (107.96)
  - At 109.24 "পরিষ্কার না থাকা", the cards drift apart and fade to grey.
- 110.77 "**আকাশ-পাতাল**": a literal sky/ground separation. The divider stretches to full height; the left half rises (sky) and the right half sinks (ground). They separate slowly with a calm ease, leaving a crimson gap with the label `COMPLETELY DIFFERENT THINGS`.
- 112.85 → 113.10: hold.

**The viewer learns:** broad targeting is a delivery choice; broad strategy is a lack of clarity.

---

### SCENE 09 — THINGS THAT MUST NEVER BE BROAD · 113.10 – 131.00
**Voice:**
- 113.38 "আপনি **Broad Audience** (113.54) ব্যবহার করলেও এই জিনিসগুলো **কখনো broad হওয়া উচিত না** (116.18)—" (pause 116.9 – 117.2)
- 117.30 **Business Objective** → 118.40 **Ideal Customer** → 119.80 **Customer Problem** → 121.10 **Offer** → 121.90 **Creative Message** → 123.15 **Conversion Signal** → 124.50 **Business Outcome** (ends 125.15)
- 125.38 "এগুলো যত **clear** হবে, **AI-driven delivery system**-কে তত ভালোভাবে কাজ করার **context** দিতে পারবেন।" (ends 130.89)

**Visual: the Strategy Spine.**
- 113.38: the wide soft field fills the back with the label `AUDIENCE · BROAD (OK)`.
- 116.18: a precise horizontal rail draws across the full width at eye level. It is crisp and thin, with tick marks like a lens focus scale.
- 116.9 – 117.2: hold the breath (the pause in the voice).
- The **seven nodes** snap into focus one by one, exactly on their words, left → right. Each one gets a focus tick, a crimson dot and a small icon. Between nodes, a short signal pulse travels to the next node.
  1. 117.30 **BUSINESS OBJECTIVE**
  2. 118.40 **IDEAL CUSTOMER**
  3. 119.80 **CUSTOMER PROBLEM**
  4. 121.10 **OFFER**
  5. 121.90 **CREATIVE MESSAGE**
  6. 123.15 **CONVERSION SIGNAL**
  7. 124.50 **BUSINESS OUTCOME** (burgundy, slightly larger)
- 125.38: the camera dollies back. The spine becomes the "focus axis" of the composition, and soft crimson context streams flow from all seven nodes downward into the abstract AI delivery field.
- 126.3 "clear": the spine brightens.
- 129.8 "context": the field turns active (burgundy core) and the dots organise more coherently. A small label reads `CLEARER INPUTS → BETTER CONTEXT FOR AI DELIVERY`.

**The viewer learns:** seven things stay sharp even when the audience is broad, and they become the AI's context.

---

### SCENE 10 — META'S SIGNALS · 131.00 – 147.15
**Voice:**
- 131.20 "Meta তার **ad ranking systems**-এ (132.04) **user behaviour** (133.12 / 133.56) এবং **engagement**-এর (134.32) মতো **signals** (135.28) আরও গভীরভাবে ব্যবহার করছে বলে **জানিয়েছে** (137.56)।" (ends 137.96)
- 138.43 "কিন্তু এর মানে এই নয় যে **marketer**-এর (139.79) **strategy** (140.39) আর প্রয়োজন নেই।" (ends 141.61)
- 142.73 "বরং AI-এর জন্য **relevant signals** (143.61) তৈরি করার **দায়িত্ব** (145.09) আরও **গুরুত্বপূর্ণ** হয়ে যায়।" (ends 146.96)

**Visual:**
- 131.20: a small, honest label: `ILLUSTRATIVE · BASED ON META'S PUBLIC STATEMENTS · SIMPLIFIED`. This must not look like Meta's real architecture.
- 132.04: an abstract **ranking field** appears: candidate ad thumbnails line up in a soft column on the left and enter a calm processing field.
- 133.56: **behaviour trails** (thin flowing lines, view → pause → engage) stream in.
- 134.32: **engagement pulses** join them.
- 135.28: the trails converge as `SIGNALS`.
- 137.56: the field reorders the candidates into a relevance order (relative position only, no numbers).
- 138.43: a **marketer node** (an anonymous silhouette) stands outside the field. The camera holds on the node.
- 140.39 "strategy": a sharp `STRATEGY` card in the node's hand **refuses to fade** while background elements soften around it. This is the counter-assumption.
- 143.61 "relevant signals": crisp crimson signal lines (thin, precise) leave the strategy card and enter the field, and the field's ordering sharpens.
- 145.09 "দায়িত্ব": the card glows burgundy with the label `RESPONSIBILITY ↑`.

**The viewer learns:** Meta leans more on behavioural signals, but relevant signals still start with the marketer's strategy.

---

### SCENE 11 — WHAT I MEAN BY BROAD TARGETING · 147.15 – 161.15
**Voice:**
- 147.35 "তাই আমি যখন বলি '**Broad Targeting**' (148.35),"
- 149.35 "আমি কখনো বলি না— '**যাকে খুশি তাকে** (150.59) ad দেখান (151.75)।'" (ends 151.99)
- 152.45 "আমি বলি—"
- 153.27 "'**Delivery**-তে (153.27) **flexibility** (154.19) দিন,"
- 155.04 "কিন্তু **Strategy**-তে (155.32) **clarity** (156.00) রাখুন।'" (ends 156.56)
- 157.14 "কারণ—"
- 157.77 "**Audience** (157.77) **broad** (158.21) হতে পারে।" (ends 158.69)
- 159.60 "কিন্তু **Thinking** (159.60) **broad** (160.00) হওয়া উচিত না।" (ends 160.80)

**Visual:**
- 148.35: a minimal quote card, "BROAD TARGETING", with Fahad's quote marks.
- 150.59: a "**random spray**" shows what it is not. Ad thumbnails scatter chaotically and aimlessly across the field (the only deliberately messy motion in the video). At 151.75, one calm crimson line strikes through the spray, the chaos freezes and fades, and the label reads `✕ SHOW ADS TO ANYONE`.
- 153.27: two physical controls appear side by side.
  - **DELIVERY:** an **elastic band** that stretches wide and flexible at 154.19, labelled `FLEXIBILITY`.
  - **STRATEGY** (155.32): a **rigid steel ruler** that locks with a precise click at 156.00, labelled `CLARITY`. Its tick marks sharpen.
- 157.77 → 160.80: a two-line verdict with a rack focus between the lines:
  - `AUDIENCE: BROAD ✓` (soft, wide tracking; check at 158.21)
  - `THINKING: BROAD ✕` (sharp crimson ✕ at 160.00)
- 160.80 → 161.15: hold.

**The viewer learns:** be flexible in delivery but precise in thinking.

---

### SCENE 12 — THE MODERN SHIFT · 161.15 – 177.60
**Voice:**
- 161.33 "আর আমার কাছে এটাই **modern Meta Ads**-এর একটা গুরুত্বপূর্ণ **shift** (164.25)।" (ends 164.61)
- 164.84 "আগে আমরা অনেক সময় চেষ্টা করতাম— Customer-কে **manually খুঁজে বের করতে**।" (ends 168.72)
- 168.97 "এখন AI-কে সেই **discovery**-তে বেশি ভূমিকা দেওয়া যায়।" (ends 171.99)
- 172.36 "কিন্তু AI-কে **আপনাকেই বলতে হবে**— (173.64)"
- 174.56 "'আমার Business-এর জন্য **valuable customer** (175.68 / 176.20) কাকে বলে?'" (ends 176.92)

**Visual: a then/now timeline as one continuous camera move.**
- 161.33: a horizontal time-rail with the labels `THEN ——— NOW`. At 164.25 "shift", a crimson marker slides from THEN to NOW.
- 164.84 **THEN**: a single **hand-held magnifying reticle** searches the soft field manually, hopping dot to dot in slow, discrete, effortful steps. Label: `MANUAL SEARCH`.
- 168.97 **NOW**: the reticle lifts away. **AI discovery** takes over: smooth radar-like arcs (calm, burgundy) sweep the whole field, and dots self-organise into clusters (`SystemField` behind). Label: `AI-ASSISTED DISCOVERY`.
- 172.36: the marketer silhouette steps into the foreground.
- 173.64 "আপনাকেই": the marketer holds up a sharp glass card.
- 174.56: the card reads **"WHAT IS A VALUABLE CUSTOMER FOR MY BUSINESS?"**, with "VALUABLE CUSTOMER" sharpening at 175.68.
- 176.20: the card's definition streams into the field, and only the matching dots light crimson. The AI finds; the marketer defines.

**The viewer learns:** AI does more of the finding, but the marketer still defines who is valuable.

---

### SCENE 13 — FAHAD CLOSE · 177.60 – 191.71
**Voice:**
- 177.76 "আমি **Fahad**।"
- 178.75 "আর আমার কাছে ভালো advertising মানে শুধু— **more reach** (181.07), **more clicks** (181.83), বা **more leads** (182.67) না।" (ends 183.31)
- 183.74 "ভালো advertising মানে— **the right customer** (185.02 / 185.50), **the right message** (186.26 / 186.54), **and the right business outcome** (187.06 / 187.62)।" (ends 188.31)
- 188.72 "**Broad delivery.**" (ends 189.43)
- 189.78 "**Sharp strategy.**" (ends 190.46)
- 190.5 → 191.71: final hold (see the note in §01).

**Visual:**
- 177.76: everything simplifies to a clean ivory background. **FAHAD** sits at centre with a thin crimson line drawing under it and a small label: `Digital Marketing • Strategy • AI • Growth`. The animation is minimal.
- 178.75: Fahad's name glides to a small signature at the bottom-centre.
- 181.07 / 181.83 / 182.67: three "vanity" words rise one per word: `MORE REACH`, `MORE CLICKS`, `MORE LEADS`. They are wide, soft and slightly inflating (no numbers). At 183.31 "না", all three lose focus and drift down.
- 185.02 / 186.26 / 187.06: three sharp lines lock in on their words with the focus tick, each "RIGHT" in crimson:
  - **THE RIGHT CUSTOMER**
  - **THE RIGHT MESSAGE**
  - **THE RIGHT BUSINESS OUTCOME**
- 188.72: the three lines fade. **BROAD DELIVERY.** appears large, in wide tracking with a soft, open feel, as the AudienceField breathes behind it.
- 189.78: **SHARP STRATEGY.** appears directly below it, razor sharp in burgundy, with the Lens closing around the word "SHARP".
- 190.46 → 191.71: final cinematic hold, with Fahad's signature subtle at the bottom and very slow breathing in the field. The last frame equals the end of the voice.

**The viewer learns:** good advertising means the right customer, the right message and the right outcome.

---

## 08 — CONTINUITY SYSTEM (one story, not 13 slides)

1. **The AudienceField never disappears.** It is the soft "world" behind everything, from Scene 01 to the final frame. It changes behaviour:
   - expanding (Scene 01)
   - cropped (Scene 02)
   - released (Scene 03)
   - partially highlighted (Scenes 04, 06, 07, 12)
   - organised by AI (Scenes 09, 10, 12)
2. **The Lens** is the recurring symbol of strategy. It enters in Scene 01, frames the questions in Scene 03, holds the brief in Scene 04, closes as the aperture in Scene 07, and closes around "SHARP" in the final frame.
3. **Soft vs sharp** is the consistent visual grammar: the soft layer is the audience/delivery and the sharp layer is strategy.
4. Use **focus ticks** (a tiny crisp ring pulse) as the "beat" accent on emphasis words instead of bounce animations.

---

## 09 — ACCURACY & CLAIMS

- Meta's ranking: show it only as "illustrative, based on Meta's public statements". Never draw or imply Meta's internal architecture.
- No invented numbers anywhere: no CTR, CPM, CPC, ROAS, conversion %, audience size or budget figures. Relevance is shown only through focus, position and colour.
- No fake Meta UI, logos or screenshots. Ad creatives use a generic conceptual frame.
- Healthcare: keep it calm and non-sensational, with no fear imagery.
- Do not depict AI replacing marketers. The marketer defines; the AI delivers.

---

## 10 — QA BEFORE DELIVERY

- **Format:** 1920×1080, 30fps, H.264, yuv420p. The duration equals the audio (191.71 s).
- **Audio:** the original voiceover only, unaltered, with no clipping (compare volumedetect with the source) and no drift.
- **Sync check:** render stills at every trigger time in §07 and confirm the element is visible on its word. Then watch the full render with audio and fix anything early or late.
- **Brand:** an ivory base, the burgundy/maroon palette only, Inter + Noto Sans Bengali, and safe margins respected.
- **Muted test:** with sound off, a viewer should still understand three things:
  1. Broad delivery ≠ broad strategy.
  2. Each example keeps a broad audience but a specific message or customer.
  3. Seven things must always stay sharp.
- **Motion check:** the motion should be visibly different from previous videos (lens, focus, aperture), with no repetitive card slide-ins.

---

## 11 — SHORT VERSION FOR OPENMONTAGE (optional)

> Make a 3:12 (191.7 s) 16:9 1080p motion-graphics thought-leadership video in Bengali-English using my provided ElevenLabs voiceover as the master timeline (do not generate new narration). Topic: "Broad targeting in Meta Ads does not mean a broad marketing strategy — broad delivery, sharp strategy." Brand: ivory #FBFCEB background, burgundy #720013 / maroon #2D0001 / wine #3F1521 / crimson #80011F, Inter type, premium editorial, no neon, no fake metrics, no fake Meta UI. Visual metaphor: camera lens and depth of field — the broad audience is a soft, out-of-focus field of dots; strategy elements snap razor-sharp inside a precise lens ring; use rack focus, aperture iris transitions and focus-snap ticks synced to spoken words. Include three examples (study abroad consultancy, cardiologist, Dhaka real-estate project) where the audience stays broad but the message/customer definition becomes specific, a split-screen "Broad Targeting ≠ Broad Strategy", a seven-node "never broad" chain (Business Objective → Ideal Customer → Customer Problem → Offer → Creative Message → Conversion Signal → Business Outcome), a then/now shift from manual customer search to AI discovery, and a Fahad signature close ending on "BROAD DELIVERY. SHARP STRATEGY." Use Remotion, free tools only, no music unless very subtle. End exactly with the voiceover.
