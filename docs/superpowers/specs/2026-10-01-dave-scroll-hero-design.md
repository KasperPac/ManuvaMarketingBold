# Dave scroll-scrub hero — design

- **Task:** MANUVA-35 on the Manuva board (commits: `MVBOLD-29`)
- **Follow-ups:** MANUVA-36 — swap the explainer video for the Dave cut once it is
  edited. VIDEO-01 (Marketing Build board) — the ad's printer paper path; not a
  dependency of this work.
- **Status:** design approved in chat 2026-10-01. Revised the same day: the hero
  is one before→after transformation clip, not the ad's story shots (§2), and the
  scrim is neutral ink, not navy (§3.2).

## 1. What and why

The home page hero becomes Dave's office. Dave is the claymation character from
the Manuva stop-motion ad (`C:\dev\MarketingAndPromotion\video\manuva-stopmotion`).
As the visitor scrolls, the same room, from the same locked-off camera, tidies
itself from chaos to calm: the pinned spreadsheets and sticky notes go, the
printer and beige monitor give way to a laptop, the grey walls turn lime, and
Dave ends with his feet up and a mug of tea. Scroll position reads directly as
"how calm is the office". The headline says the same thing the room does.

The goal is a memorable first screen that tells the before/after in one gesture,
without moving a single CTA out of reach.

## 2. Decisions taken

| Question | Decision |
|---|---|
| Placement | Full-bleed hero backdrop over the cobalt field. |
| Interaction | Scroll-scrubbed stop-motion, pinned. |
| Footage | **One transformation clip, T1**: `before.png` → `after.png` (`frames/keys/v3/`), Veo 3.1 Fast frames-to-video in Google Flow, 8 s. The ad's story shots (A1–E1) are not used by the hero. |
| Hero copy | **Only the tagline**, bottom-left over a fade along the bottom edge, at every size. Revised after the first preview: copy and scrim over the scene hid it. (Was layout A on desktop and a poster layout on phones.) |
| Logo | The exact Manuva logo is **wiped onto the lime wall as the room turns calm**: right of the corner on landscape, across the top of the wall on phones. A clay picture frame for it was tried and rejected (the clean logo in a clay frame looked off). |
| Eyebrow, sub-copy, buttons | Word for word, in a band directly under the hero, before the marquee. |
| Headline | **Less chaos. More making.** (the ad's own end line). Was "Make it. Track it. Ship it." |
| Explainer video | Moves to the stage lead-in now; swapped for the Dave cut later (MANUVA-36). |

`before.png` and `after.png` are the same 2752×1536 set from the same camera;
their edge maps align at zero offset (checked 2026-10-01), which is what makes a
single-camera transformation possible.

## 3. Page structure

### 3.1 Hero

```
<section class="hero dave mv-field-cobalt" data-frames="N" data-calm="K">
  <div class="dave-pin">                      ← sticky, 100dvh, paints --ink-strong
    <div class="dave-scene">                  ← the frame's own aspect, sized to cover
      <picture>…frame 0…</picture>            ← the LCP image
      <div class="dave-logo"><Logo/></div>    ← placed in the room's coordinates
    </div>
    <div class="dave-copy"><h1>…</h1></div>   ← the tagline; its ::before is the fade
    <span class="dave-hint"></span>           ← "Scroll", from CSS; fades out by 5%
  </div>
</section>
<section class="sec hero-intro">              ← eyebrow, sub-copy, both buttons
```

- The section keeps `mv-field-cobalt`, which keeps the hero inside the shared
  hero contract (`tests/e2e/hero-contract.spec.ts`: the home hero carries a field
  that paints) and the header's light ink with no special case (`headInk="light"`
  stays). The cobalt is never seen: the pin paints `--ink-strong` behind the
  frame, which is the placeholder while frame 0 loads and what the docked header
  takes as its bar colour over the scene. The pin is `100dvh` (falling back to
  `100svh`), so no band of the field shows beneath it when a phone's URL bar
  collapses.
- The ghost numeral "06" comes off the hero, and so does the eyebrow: the home
  hero is the hero contract's documented exception.
- H1: `Less chaos. <span class="hl keep">More making.</span>`
  - With JS and motion on, the hero carries `data-scrub="pre"` until frame K, and
    the `.hl` chip on "More making." is hidden until then. It lands as the walls
    turn lime, together with the logo.
  - With no JS or with reduced motion the chip is simply shown. Progressive
    enhancement: the markup is the finished state. The logo stays hidden there:
    the static scene is the chaos frame, and the grey wall is not its moment.
- `.dave-scene` does `object-fit: cover` by hand (a box with the frame's aspect,
  `max(100%, 100dvh × aspect)` wide, its 31% point on the pin's 31% point), so
  the logo is positioned in the room's coordinates and stays on the same patch
  of wall at any viewport.

### 3.2 Tagline, fade and logo

- **The fade is `--ink-strong` (#141413) at alpha, never navy.**
  `tests/unit/field-separation.test.ts` forbids a navy hero ("ink is structure,
  never a rotation hue"; a navy hero is the third blue), and inline navy outside a
  declared ink band fails it.
- **The fade belongs to the copy**, not the viewport: it starts 60% of the copy
  box's height above it and is still two-thirds ink at the headline's first
  line, so it is only as tall as the tagline needs and the white first line keeps
  3:1 (large text) over the lime room at any headline size (measured on pixels in
  `dave-hero.spec.ts`).
- **Headline size:** `min(15.5vw, (100vw − 40px) / 7.9)` on phones,
  `min(11vw, 112px, (100vw − 64px) / 7.9)` from 721px, and
  `min(clamp(76px, 6.4vw, 112px), (100vw − 96px) / 7.9)` from 1100px.
  "More making." is one unbreakable highlight (`.hl.keep`), 7.68em wide
  (measured; 7.9 adds a margin), and the h1 must stay larger than the section
  h2s, which run at `clamp(64px, 6vw, 104px)` from 1100px. Screens no taller than
  500px cap it at 11svh.
- **Logo:** the lockup, `--on-lime` ink, revealed by a 700ms left-to-right
  `clip-path` wipe when `data-scrub` becomes `calm`. Clip-path, not opacity: the
  cobalt field's full-strength override pins descendants at opacity 1.
  Landscape: 59% across, 21% down, 27% of the scene's width. Portrait: 12%
  across, 11% down, 76% wide, clear of the header bar.
- **Frame set** follows the viewport's shape: the portrait set at
  `(max-aspect-ratio: 4/5)`, the landscape set otherwise.
- **Known gap:** on phones the h1 (about 42px at 375px wide) is smaller than the
  section h2s (12vw, 45px): the unbreakable highlight cannot be larger in that
  width. Logged as MANUVA-38 for a design decision.

### 3.3 Scrub behaviour

- The hero is `100svh` plus a scrub length of `150svh`; the inner stage is sticky.
- Progress `p` is the hero's scroll offset over its scroll length, damped by the
  existing `TAU = 90 ms` follower in `Motion.astro`.
- Target frame = `round(p_damped / 0.9 × (N − 1))` (the last 10% holds the final
  frame).
- The scrub **plays through the in-between frames** to reach it: each swap steps
  a sixth of the remaining gap (at least one frame), at **at most 24 swaps a
  second**. A small scroll plays frame by frame; a flick runs fast and eases out
  (0 → 47 in about 16 swaps). Revised after the first preview: jumping straight
  to the target at 12 swaps a second skipped up to seven poses at once and read
  as rigid.
- No blending between frames. Each step is a hard swap.
- K, the frame where the room first reads as calm (walls lime), is picked by eye
  from the clip and recorded in the manifest (§4.1). It drives the highlight only.
- The last frame holds for the final ~10% of the scroll, then the pin releases
  into the marquee.

### 3.4 Moves

- **Explainer video** leaves the hero for `.stage-lead`, which becomes a two-column
  `.split`: heading/sub/CTA left, the video with its "See it in 32 seconds" caption
  right. Stacked below 1100px. `Video.astro` is unchanged, so MANUVA-36 is a
  two-prop change (`youtubeId`, `poster`).
- **Marquee** is unchanged. Both hero layouts put the scrim or the desk on the
  hero's bottom edge, so the lime room never touches the lime marquee.

### 3.5 Fallbacks

- **Reduced motion** (`:root[data-motion="off"]`): no pin, hero is `100svh`, static
  frame 0, highlight chip shown. Same image as first paint, so nothing swaps.
- **No JS:** identical to reduced motion; the `<picture>` and copy are plain markup.
- **Frames fail to load:** the scrub holds the last decoded frame; the copy and CTAs
  never depend on frames.

## 4. Frames

### 4.1 Pipeline

`scripts/hero-frames.mjs`, in the style of `scripts/prep-photos.mjs`:

1. Reads T1 from a path given on the command line (default
   `../MarketingAndPromotion/video/manuva-stopmotion/flow-kit/downloads/T1.mp4`).
2. Reads a committed manifest, `scripts/hero-frames.json`: `in`/`out` trim seconds,
   frame count, portrait focal x, and `calm` (K).
3. Extracts evenly spaced frames with ffmpeg, crops (landscape: full frame;
   portrait: 390:844 window centred on the focal x), resizes and encodes WebP q65
   with sharp.
4. Writes `public/hero/dave/l/NNN.webp` and `public/hero/dave/p/NNN.webp`.
5. Fails if the clip is missing, if total weight exceeds the budget, or if a
   frame is not the expected size.

The clip lives untracked in another repo, so the script runs by hand and its
output is committed. Vercel never sees the clip.

### 4.2 Sets and budget

| Set | Size | Per frame (measured on T1, WebP q60) | Budget at 48 frames |
|---|---|---|---|
| Landscape | 1280×720 | 43 KB | ≤ 2.1 MB |
| Portrait | crop of the 1080p download, 500×1080 | 25 KB | ≤ 1.3 MB |

The landscape budget was 1.6 MB, estimated from the ad's A1 clip. T1 carries more
clay grain and came in at 2.07 MB. Lower quality barely moves it, and a denoise
that does (a 3px median) strips the fingerprint texture the hero is for. All of
it loads after `load`, so it does not touch LCP.

- 1280×720 because that is the clip's native generation size; the 1080p download
  is an upscale. Phone sharpness depends on the 1080p download.
- WebP, not AVIF: AVIF was 13% smaller on these frames and decodes slower, which
  costs frames mid-scroll.
- Astro reads the frame count at build time and writes `data-frames` / `data-calm`
  into the markup. No manifest fetch at runtime.

### 4.3 Loading

- Frame 0 of each set is the `<picture>` in the markup with `fetchpriority="high"`.
  It is the LCP element and the only hero bytes before `load`.
- After `load`, frames fetch coarse to fine: every 8th first (6 frames, ~0.2 MB),
  then the gaps. The scrub works off the coarse set immediately.
- `navigator.connection.saveData` or an effective type of `2g`/`3g` stops after the
  coarse pass.
- Rendering swaps the one `<img>`'s `src`. The next frame is decoded off-screen
  with `img.decode()` before the swap. No canvas and no bitmap cache, so memory
  stays flat on phones.

## 5. Code touch-points

| File | Change |
|---|---|
| `src/pages/index.astro` | Hero markup, H1, stage-lead split with the video |
| `src/components/site/Motion.astro` | New step `5 · scrub` in the existing loop; frame loader |
| `src/lib/scrub.ts` (new) | Pure maths: progress → frame index, rate cap, coarse-to-fine order |
| `src/styles/site.css` | `.hero.dave` layouts, scrims, hint, reduced-motion rules |
| `scripts/hero-frames.mjs` (new) | Frame pipeline |
| `scripts/hero-frames.json` (new) | Trim, count, focal x, calm frame |
| `public/hero/dave/{l,p}/` (new) | Committed frames |
| `tests/unit/home.test.ts` | H1 and explainer-position assertions move with the design |

No token is redeclared. The scrim uses `--ink-strong`; the highlight uses the
existing `.hl` (lime field, `--on-lime` ink).

## 6. Testing

- **Unit (vitest)** on `src/lib/scrub.ts`: frame index at 0, 1 and mid-progress;
  the 12 fps cap; coarse-to-fine order covers every frame exactly once.
- **Unit (vitest)** on the built `dist/index.html`: H1 reads "Less chaos. More
  making." with the `.hl` on "More making."; the explainer facade sits in the
  stage lead-in, not the hero; frame 0 is a `<picture>` with
  `fetchpriority="high"`; no navy anywhere in the hero.
- **E2E (Playwright)**, home page:
  - Both CTAs visible on load at 1280×900 and 390×844.
  - Scrolling 50% through the hero changes the frame `src`.
  - Reduced motion: the hero is not pinned, `src` does not change on scroll,
    highlight visible.
  - JS disabled: image and copy visible.
  - The existing hero-contract, heading-scale, motion-toggle and axe suites pass.
- **Parity gate** (`npm run parity`). The old H1 came from the design handoff, not
  the old site, so the swap is not expected to trip it. If it does, the entry goes
  into `scripts/parity/ignore.json` with its reason.
- **Performance:** Lighthouse on the Vercel preview before and after. LCP and CLS
  must not regress against the current home page.
- **Manual:** scrub feel at 1440, 1024 and 390; header ink over the hero; the
  highlight lands as the walls turn lime.

## 7. Out of scope

- The ad itself: its story shots, the printer fix (VIDEO-01) and the feature scenes.
- MANUVA-36, the video swap.
- Pointer or click interactions on Dave.
- Any change below the stage lead-in.
