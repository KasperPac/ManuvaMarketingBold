# Dave scroll-scrub hero — design

- **Task:** MANUVA-35 on the Manuva board (commits: `MVBOLD-29`)
- **Follow-up:** MANUVA-36 — swap the explainer video for the Dave cut once it is edited
- **Status:** design approved in chat 2026-10-01; this file pins it down

## 1. What and why

The home page hero becomes Dave's story. Dave is the claymation character from
the Manuva stop-motion ad (`C:\dev\MarketingAndPromotion\video\manuva-stopmotion`).
As the visitor scrolls, his office steps from chaos — spreadsheets, a printer
spewing order slips, an empty parts bin, head in hands — to calm: the lime room,
feet up, a toast to the camera. The headline says the same thing the room does.

The goal is a memorable first screen that tells the before/after in one gesture,
without moving a single CTA out of reach.

## 2. Decisions taken

| Question | Decision |
|---|---|
| Placement | Full-bleed hero backdrop. Cobalt leaves the hero. |
| Interaction | Scroll-scrubbed stop-motion, pinned. |
| Story | Chaos to calm: A1 → A2 → B1 → B2 → B3 → C1, hard cut, E1. |
| Desktop copy | Layout A — copy right, navy scrim from the right. |
| Phone copy | Layout 1 "poster" — eyebrow + H1 over the wall at top, sub + CTAs at the foot. |
| Headline | **Less chaos. More making.** (the ad's own end line). Was "Make it. Track it. Ship it." |
| Explainer video | Moves to the stage lead-in now; swapped for the Dave cut later (MANUVA-36). |
| Footage source | Google Flow, Veo 3.1 Fast, frames-to-video from `flow-kit/frames`. |

## 3. Page structure

### 3.1 Hero

```
<section class="hero dave" data-frames="N" data-cut="K">
  <picture class="dave-scene">          ← frame 0 is the LCP image
  <div class="dave-scrim">              ← navy (--field-ink), direction per layout
  <div class="dave-copy">               ← eyebrow, H1, sub, CTAs — unchanged except H1
  <span class="dave-hint">Scroll</span> ← fades out after 5% progress
</section>
```

- The section's background is `--field-ink`, so the header's hit-test reads light ink
  with no special case (`headInk="light"` stays).
- The ghost numeral "06" comes off the hero.
- H1: `Less chaos. <span class="hl keep">More making.</span>`
  - With JS and motion on, the hero carries `data-scrub="pre"` until the cut frame,
    and the `.hl` chip on "More making." is hidden until then. It lands the moment
    the room turns lime.
  - With no JS or with reduced motion the chip is simply shown. Progressive
    enhancement: the markup is the finished state.
- Eyebrow, sub-copy and both CTAs are word for word what ships today.

### 3.2 Layouts

- **Desktop / landscape:** copy block right-aligned at roughly 40% width, vertically
  centred, over a scrim that runs from transparent at ~30% to `--field-ink` at ~0.9
  alpha on the right edge. Dave keeps the left 55%.
- **Phone / portrait** (`(max-aspect-ratio: 4/5)`): the frame is a portrait crop
  centred on Dave. Eyebrow + H1 sit in the plain-wall band at the top over a
  top-down scrim; sub + CTAs sit at the foot over a short bottom-up scrim. Dave's
  face and hands stay clear in the middle.
- The same media query picks the frame set (§4.2) and the copy layout, so a
  viewport never gets a portrait crop with landscape copy or the reverse.

### 3.3 Scrub behaviour

- The hero is `100svh` plus a scrub length of `200svh`; the inner stage is sticky.
- Progress `p` is the hero's scroll offset over its scroll length, damped by the
  existing `TAU = 90 ms` follower in `Motion.astro`.
- Frame index = `floor(p_damped × (N − 1))`, held to **at most 12 changes per second**
  so it reads as stop-motion, never as smeared video.
- No blending between frames. Each step is a hard swap.
- The cut to E1 sits where E1's frames begin, roughly 80% through. E1 plays over
  the final stretch, then the pin releases into the marquee.

### 3.4 Moves

- **Explainer video** leaves the hero for `.stage-lead`, which becomes a two-column
  `.split`: heading/sub/CTA left, the video with its "See it in 32 seconds" caption
  right. Stacked below 1100px. `Video.astro` is unchanged, so MANUVA-36 is a
  two-prop change (`youtubeId`, `poster`).
- **Marquee** is unchanged. Both hero layouts put navy scrim or the desk on the
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

1. Reads the 7 clips from a path given on the command line (default
   `../MarketingAndPromotion/video/manuva-stopmotion/flow-kit/downloads`).
2. Reads a committed manifest, `scripts/hero-frames.json`: per clip, `in`/`out`
   trim seconds and a frame count. The cut index falls out of the counts.
3. Extracts frames with ffmpeg at the chosen times, crops (landscape: full frame;
   portrait: 390:844 window centred on a per-clip focal x), resizes and encodes
   WebP q65 with sharp.
4. Writes `public/hero/dave/l/NNN.webp` and `public/hero/dave/p/NNN.webp`.
5. Fails if any clip is missing, if total weight exceeds the budget, or if a
   frame is not the expected size.

The clips live untracked in another repo, so the script runs by hand and its
output is committed. Vercel never sees the clips.

### 4.2 Sets and budget

| Set | Size | Per frame (measured on A1) | Budget at ~96 frames |
|---|---|---|---|
| Landscape | 1280×720 | 31 KB | ≤ 3.2 MB |
| Portrait | crop of 1080p, ~500×1080 | ~25 KB (estimated) | ≤ 2.6 MB |

- 1280×720 because that is the clips' native generation size; upscaling adds
  bytes, not detail. Phone sharpness depends on the 1080p downloads.
- WebP, not AVIF: AVIF was 13% smaller on these frames and decodes slower, which
  costs frames mid-scroll.
- Astro reads the frame count at build time and writes `data-frames` / `data-cut`
  into the markup. No manifest fetch at runtime.

### 4.3 Loading

- Frame 0 of each set is the `<picture>` in the markup with `fetchpriority="high"`.
  It is the LCP element and the only hero bytes before `load`.
- After `load`, frames fetch coarse to fine: every 8th first (~12 frames, ~0.4 MB),
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
| `src/lib/scrub.ts` (new) | Pure maths: progress → frame index, rate cap, cut index, coarse-to-fine order |
| `src/styles/site.css` | `.hero.dave` layouts, scrims, hint, reduced-motion rules |
| `scripts/hero-frames.mjs` (new) | Frame pipeline |
| `scripts/hero-frames.json` (new) | Per-clip trims, counts, focal x |
| `public/hero/dave/{l,p}/` (new) | Committed frames |

No token is redeclared. The scrim uses `--field-ink`; the highlight uses the
existing `.hl` (lime field, `--on-lime` ink).

## 6. Testing

- **Unit (vitest)** on `src/lib/scrub.ts`: frame index at 0, 1 and mid-progress;
  the 12 fps cap; the cut index from counts; coarse-to-fine order covers every
  frame exactly once.
- **E2E (Playwright)**, home page:
  - H1 reads "Less chaos. More making."; both CTAs present and visible on load at
    1440×900 and 390×844.
  - Frame 0 `<img>` has `fetchpriority="high"`; scrolling 50% through the hero
    changes its `src`.
  - Reduced motion: hero height equals the viewport, `src` does not change on scroll,
    highlight visible.
  - JS disabled: image and copy visible.
  - The explainer video facade renders in the stage lead-in.
  - axe passes on `/`.
- **Parity gate** (`npm run parity`). The old H1 came from the design handoff, not
  the old site, so the swap is not expected to trip it. If it does, the entry goes
  into `scripts/parity/ignore.json` with its reason.
- **Performance:** Lighthouse on the Vercel preview before and after. LCP and CLS
  must not regress against the current home page.
- **Manual:** scrub feel at 1440, 1024 and 390; header ink over the hero; the cut
  lands with the highlight.

## 7. Out of scope

- Generating the ad itself and the D-shot feature scenes.
- MANUVA-36, the video swap.
- Pointer or click interactions on Dave.
- Any change below the stage lead-in.
