# Dave scroll-scrub hero — design

- **Task:** MANUVA-35 on the Manuva board (commits: `MVBOLD-29`)
- **Follow-ups:** MANUVA-36 — swap the explainer video for the Dave cut once it is
  edited. VIDEO-01 (Marketing Build board) — the ad's printer paper path; not a
  dependency of this work.
- **Status:** design approved in chat 2026-10-01. Revised the same day: the hero
  is one before→after transformation clip, not the ad's story shots (§2), and the
  scrim is neutral ink, not navy (§3.2). Revised again after an A/B the same
  day: the scrub plays the clip itself, not a set of stills (§3.3, §4).
  Revised 2026-10-02 (MANUVA-52, `MVBOLD-33`): the room no longer turns lime.
  An A/B of the calm frame picked natural walls; T1 was regenerated as T2, in
  which the room only tidies and the light comes up (§2, §3.3).

## 1. What and why

The home page hero becomes Dave's office. Dave is the claymation character from
the Manuva stop-motion ad (`C:\dev\MarketingAndPromotion\video\manuva-stopmotion`).
As the visitor scrolls, the same room, from the same locked-off camera, tidies
itself from chaos to calm: the pinned spreadsheets and sticky notes go, the
printer and beige monitor give way to a laptop, the light comes up on walls that
keep their own colour, and Dave ends with his feet up and a mug of tea. Scroll
position reads directly as "how calm is the office". The headline says the same thing the room does.

The goal is a memorable first screen that tells the before/after in one gesture,
without moving a single CTA out of reach.

## 2. Decisions taken

| Question | Decision |
|---|---|
| Placement | Full-bleed hero backdrop over the cobalt field. |
| Interaction | Scroll-scrubbed stop-motion, pinned. |
| Footage | **One transformation clip, T2**: `before.png` → a natural-walls end frame, Veo 3.1 Fast frames-to-video in Google Flow, 8 s. The end frame is `after.png` (`frames/keys/v3/`) with its lime walls recoloured to a warm neutral (212, 203, 188), the clay's shading kept. T1 (`before.png` → `after.png`) repainted the walls lime in sweeping strokes; feedback was that it was too much going on ("we're not really painting the office"), and an A/B of the calm frame (lime, natural, a lime feature wall, a lime sign) picked natural. The ad's story shots (A1–E1) are not used by the hero. |
| Hero copy | **Only the tagline**, bottom-left over a fade along the bottom edge, at every size. Revised after the first preview: copy and scrim over the scene hid it. (Was layout A on desktop and a poster layout on phones.) |
| Logo | The exact Manuva logo is **wiped onto the back wall as the room turns calm**: right of the corner on landscape, across the top of the wall on phones. A clay picture frame for it was tried and rejected (the clean logo in a clay frame looked off). |
| Eyebrow, sub-copy, buttons | Word for word, in a band directly under the hero, beside the video. |
| Marquee | **Removed** from the home page (preview feedback: its drift under the scrubbing hero was too distracting). Every fact it carried is still stated on /features or /pricing; the parity report is unchanged by its removal. |
| Headline | **Less chaos. More making.** (the ad's own end line). Was "Make it. Track it. Ship it." |
| Scrub | **The clip itself, seeked by scroll**: all 192 frames, eased. Picked in an A/B against 24 stills, 96 stills and a cross-fade of the 24 (§3.3). |
| Video | **The Dave ad** (YouTube `JXB4FgHRm_Y`, 60 s, "Manuva - Less Chaos, More Making"), in the band straight under the hero with the caption "See it in 60 seconds". Poster: the ad's end card, self-hosted. Replaces the old explainer (MANUVA-36). |

`before.png` and `after.png` are the same 2752×1536 set from the same camera;
their edge maps align at zero offset (checked 2026-10-01), which is what makes a
single-camera transformation possible.

## 3. Page structure

### 3.1 Hero

```
<section class="hero dave mv-field-cobalt" data-calm="T">
  <div class="dave-pin">                      ← sticky, 100dvh, paints --ink-strong
    <div class="dave-scene">                  ← the frame's own aspect, sized to cover
      <picture>…first frame…</picture>        ← the LCP image, and the still
      <video>                                 ← added after load; the scrub (§4.3)
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
  frame, which is the placeholder while the first frame loads and what the docked header
  takes as its bar colour over the scene. The pin is `100dvh` (falling back to
  `100svh`), so no band of the field shows beneath it when a phone's URL bar
  collapses.
- The ghost numeral "06" comes off the hero, and so does the eyebrow: the home
  hero is the hero contract's documented exception.
- H1: `Less chaos. <span class="hl keep">More making.</span>`
  - With JS and motion on, the hero carries `data-scrub="pre"` until the clip reaches T, and
    the `.hl` chip on "More making." is hidden until then. It lands as the room
    is complete, together with the logo. With the walls natural, the chip is
    the only lime in the calm frame.
  - With no JS or with reduced motion the chip is simply shown. Progressive
    enhancement: the markup is the finished state. The logo stays hidden there:
    the still scene is the chaos frame, and the grey wall is not its moment.
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
  3:1 (large text) over the calm room at any headline size (measured on pixels in
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
- **Shape** follows the viewport's shape: the portrait clip and still at
  `(max-aspect-ratio: 4/5)`, the landscape ones otherwise.
- **Known gap:** on phones the h1 (about 42px at 375px wide) is smaller than the
  section h2s (12vw, 45px): the unbreakable highlight cannot be larger in that
  width. Logged as MANUVA-38 for a design decision.

### 3.3 Scrub behaviour

- The hero is `100svh` plus a scrub length of `150svh`; the inner stage is sticky.
- **The scrub plays the clip itself**: all 192 frames of T2, positioned by
  scroll, over the still. Progress `p` is the hero's scroll offset over its
  scroll length, damped by `Motion.astro`'s follower with the scrub's own time
  constant, **160 ms** (`SCRUB_TAU`; the rest of the page uses 90 ms).
- Target time = `min(p_damped / 0.9, 1) × (duration − 0.02 s)` (the last 10%
  holds the final frame; 0.02 s short of the end, which is past the last frame).
- One seek at a time: a seek in flight finishes, and the next goes to wherever
  the follow has reached. Times within 1/60 s of the target are left alone so
  the loop can settle.
- Why the clip, after three rounds on the preview:
  - 24 poses jumping straight to the target at 12 a second skipped up to seven
    poses at once and read as rigid.
  - 48 poses played through at 24 a second let Dave's mouth flicker on a fast
    scroll and read as hectic.
  - 24 poses played through at 12 a second still moved two poses at once on a
    single wheel notch, with no ease in or out.
  - An A/B (2026-10-01) of 24 stills, 96 stills, a cross-fade of the 24 and
    the clip picked the clip. One notch is now a short eased run of frames.
    The cross-fade cost nothing extra, but anything moving fast showed twice
    mid-fade.
- The calm moment, `T = 5.5 s` (the room first complete: clutter gone, bins
  stacked, Dave's feet up; picked by eye on a contact sheet of T2. In T1 it was
  the walls first fully lime, at the same time), is recorded in the manifest (§4.1) and written as
  `data-calm`. It drives the highlight and the logo, and is compared with the
  time actually on screen, not the target.
- The last frame holds for the final ~10% of the scroll, then the pin releases
  into the band.

### 3.4 Under the hero

- **The band** (`.sec.hero-intro`, paper) comes straight after the hero: the
  eyebrow, sub-copy and both buttons on the left, the video on the right
  (stacked on phones). The buttons are the first thing after the scrub.
- **The video** is the Dave ad, a facade as before: nothing reaches
  youtube-nocookie.com until someone clicks. Its caption keeps "What Manuva
  actually does", old-site copy the parity gate tracks.
- **The stage lead-in** is back to a single column, and with the marquee gone it
  takes the site's hairline so the two paper sections stay distinguishable.

### 3.5 Fallbacks

- **Reduced motion** (`:root[data-motion="off"]`): no pin, hero is `100svh`, the
  still first frame, highlight chip shown. No clip is created or fetched.
- **Save-Data, or an effective connection type of `2g`/`3g`:** the same still
  hero. The clip is 2–3 MB, and a still costs nothing extra.
- **No JS:** identical to reduced motion; the `<picture>` and copy are plain markup.
- **The clip fails to load or decode:** the hero flattens to the same still
  state: pin released, clip removed, highlight shown. The copy and CTAs never
  depend on the clip.
- **A rotation whose new clip fails:** the clip already on screen stays, cropped
  by `object-fit`, and keeps scrubbing.

## 4. Media

### 4.1 Pipeline

`scripts/hero-frames.mjs` (`npm run hero:frames`):

1. Reads the clip from a path given on the command line (default: `clip` in
   the manifest, `../MarketingAndPromotion/video/manuva-stopmotion/flow-kit/downloads/T2.mp4`).
2. Reads a committed manifest, `scripts/hero-frames.json`: `calm` (T, in
   seconds), portrait focal x, still quality, video CRF and keyframe spacing,
   and the budgets.
3. Writes, per shape (landscape: the full frame; portrait: a 500×1080 window
   centred on the focal x):
   - `public/hero/dave/<set>.webp`, the first frame, WebP q60 (sharp);
   - `public/hero/dave/<set>.mp4`, every frame, H.264 CRF 25, a keyframe at
     least every 4 frames, yuv420p, no audio, `+faststart` (ffmpeg).
4. Reads each MP4 back (`mp4Info` in `scripts/hero-frames-lib.mjs`) and fails if
   it is not the expected size or exceeds its budget.

The clip lives untracked in another repo, so the script runs by hand and its
output is committed. Vercel never sees the clip.

### 4.2 Shapes and budget

| Shape | Size | Still | Clip (T1 → T2) | Budget |
|---|---|---|---|---|
| Landscape | 1280×720 | 48 KB | 3,317 → 2,516 KB | ≤ 3,500 KB |
| Portrait | crop of the 1080p download, 500×1080 | 28 KB | 1,917 → 1,807 KB | ≤ 2,100 KB |

- 1280×720 because that is the clip's native generation size; the 1080p
  download is an upscale. Phone sharpness depends on the 1080p download.
- The keyframe spacing is what makes scrubbing backwards as smooth as forwards:
  a seek decodes from the keyframe before it, so no seek decodes more than
  four frames.
- H.264, the one codec every browser decodes. The clip loads after `load`, so
  its weight does not touch LCP. It does cost about 2.2 MB more on desktop
  (1.3 MB more on phones) than the 24 stills did; that was the trade accepted
  in the A/B.

### 4.3 Loading

- The first frame of each shape is the `<picture>` in the markup with
  `fetchpriority="high"`. It is the LCP element and the only hero bytes before
  `load`.
- After `load`, `Motion.astro` adds a muted, inline, `aria-hidden` `<video>` over
  the still and fetches the shape's clip **whole**, then plays it from a blob
  URL. Every seek is a local decode: no range requests mid-scroll, and no
  dependence on a browser's preload policy.
- The video stays hidden (`visibility`, which the cobalt field's full-strength
  opacity override does not touch) until its first seek lands
  (`data-video="ready"`). Until then the still is the picture.
- iOS Safari paints nothing for a video that has never played, so the clip is
  played and paused once when its metadata arrives. Muted inline playback is
  always allowed.
- A rotation across `(max-aspect-ratio: 4/5)` fetches the other shape's clip.
  The current one stays up until the new one is ready, and turning back before
  it arrives keeps the current one.

## 5. Code touch-points

| File | Change |
|---|---|
| `src/pages/index.astro` | Hero markup, H1, the band under the hero with the video |
| `src/components/site/Motion.astro` | Step `5 · scrub` in the existing loop; clip loader |
| `src/lib/scrub.ts` (new) | Pure maths: progress → clip time, seek tolerance, the scrub's follow |
| `src/styles/site.css` | `.hero.dave` layouts, scrims, hint, clip visibility, reduced-motion rules |
| `scripts/hero-frames.mjs` (new) | Media pipeline |
| `scripts/hero-frames-lib.mjs` (new) | Portrait window, MP4 box reader |
| `scripts/hero-frames.json` (new) | Calm time, focal x, encoding settings, budgets |
| `public/hero/dave/` (new) | Committed stills and clips |
| `tests/unit/home.test.ts` | H1 and explainer-position assertions move with the design |

No token is redeclared. The scrim uses `--ink-strong`; the highlight uses the
existing `.hl` (lime field, `--on-lime` ink).

## 6. Testing

- **Unit (vitest)** on `src/lib/scrub.ts`: clip time at 0, 1 and mid-progress,
  the end hold and end pad, the seek tolerance, the 160 ms follow.
- **Unit (vitest)** on the committed media: each still is its shape's size, as
  WebP; each clip is H.264 at its shape's size, 192 frames, no audio, keyframes
  at most 4 apart, `moov` before `mdat`, within budget.
- **Unit (vitest)** on the built `dist/index.html`: H1 reads "Less chaos. More
  making." with the `.hl` on "More making."; `data-calm="5.5"`; the first frame
  is a `<picture>` with `fetchpriority="high"`; no `<video>` in the markup; the
  video facade sits in the band, not the hero; no navy anywhere in the hero.
- **E2E (Playwright)**, home page (`tests/e2e/dave-hero.spec.ts`):
  - Scrolling 50% through the hero seeks the clip to 0.5 / 0.9 of its length,
    with the stage pinned.
  - One 100px wheel notch lands as at least six seeks, none more than 40% of the
    move. This was checked to fail with the follow set to 1 ms, where it lands
    in one step.
  - Highlight and logo land at calm and leave on the way back. The tagline
    keeps 3:1 over the calm room, measured on pixels.
  - Only the first frame is fetched before `load`.
  - Portrait gets the portrait clip; rotation swaps it; a failed portrait clip
    keeps the landscape one.
  - A reload mid-scrub seeks to that position.
  - A failed clip flattens the hero, and the loop goes idle past the hero.
  - Save-Data and reduced motion fetch no clip and show the highlight. With no
    JS, the still and copy render.
  - The existing hero-contract, heading-scale, motion-toggle and axe suites pass.
- **Parity gate** (`npm run parity`). The old H1 came from the design handoff, not
  the old site, so the swap is not expected to trip it. If it does, the entry goes
  into `scripts/parity/ignore.json` with its reason.
- **Performance:** Lighthouse on the Vercel preview before and after. LCP and CLS
  must not regress against the current home page.
- **Manual:** scrub feel at 1440, 1024 and 390, and on a real iPhone (the
  play-then-pause priming is the part no headless browser exercises); header
  ink over the hero; the highlight lands as the room is complete.

## 7. Out of scope

- The ad itself: its story shots, the printer fix (VIDEO-01) and the feature scenes.
- MANUVA-36, the video swap.
- Pointer or click interactions on Dave.
- Any change below the stage lead-in.
