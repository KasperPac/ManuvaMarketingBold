# Image prompt spec — 15 photos

Companion to `README.md`, which says what each file is and where it goes. This
one says how to generate them so they hold together as a set.

**The two sets need different treatments.** They are not fifteen variations of
one thing:

- **Set A — platform tiles (8).** Rendered at **16% opacity under a
  `soft-light` blend** on top of a saturated field colour. They are texture, not
  pictures. Detail is thrown away; only large-scale light and shade survives.
- **Set B — sector cards (7).** Rendered at **full strength** as the entire card
  background, with an opaque label bar across the bottom. These are seen
  properly and carry the weight.

Generate Set B first and to a higher standard. If budget or patience runs out,
Set A can be re-rolled cheaply or dropped entirely — the tiles look correct
without photos.

---

## The style anchor

Paste this block into **every** prompt, both sets, unchanged. It is what makes
fifteen separate generations read as one shoot.

```
documentary editorial photograph of a small manufacturing workshop,
natural window light, soft directional daylight, slightly overcast quality,
warm neutral palette, matte surfaces, real working environment with mild
wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth
of field, no text, no signage, no logos, no brand marks, no recognisable
faces
```

Three things in there are doing specific work and should not be edited out:

- **"warm neutral palette"** — the design system's neutrals are a warm graphite
  ramp anchored on `#141413`, deliberately not blue-grey. Cool-toned photos will
  fight every surface they sit on.
- **"no text, no signage, no logos"** — generators love adding lettering to
  workshop scenes. Garbled text is obvious even at 16%, and a real brand mark is
  a licensing problem.
- **"no recognisable faces"** — hands and figures at working distance look more
  authentic anyway, and avoid a release question.

---

## Set A — platform tiles (8)

**Treatment note.** Append this to the style anchor for all eight:

```
low saturation, near-monochrome, strong simple shapes, clear separation of
light and shadow, generous negative space, minimal fine detail
```

**Why low saturation.** At 16% under `soft-light` the blend preserves the
field's hue and modulates its lightness. A colour-saturated photo drags the
brand colour off-hue — cobalt starts to look muddy. A near-monochrome photo only
modulates lightness, so the field stays exactly the colour it is meant to be.
This is the single highest-leverage instruction in Set A.

**Composition.** These crop to `cover` at roughly 3:2 and get overlaid with a
title and two lines of body copy. Keep the interesting part central; assume the
outer 15% on every edge is lost.

| # | File | Subject line to append |
|---|---|---|
| 1 | `platform-inventory.jpg` | `steel shelving racked with labelled parts bins and stacked components, receding in perspective` |
| 2 | `platform-boms.jpg` | `component parts of a single product laid out flat on a workbench in an exploded arrangement, evenly spaced` |
| 3 | `platform-warehouse.jpg` | `cardboard cartons stacked on a pallet at a goods-in bay, hands steadying the top carton` |
| 4 | `platform-team.jpg` | `two people working side by side at a long assembly bench, seen from behind and to one side` |
| 5 | `platform-orders.jpg` | `sealed and labelled cartons staged in rows for despatch beside a roller conveyor` |
| 6 | `platform-production.jpg` | `a production bench mid-run, part-finished work and hand tools in use, motion in the background` |
| 7 | `platform-reports.jpg` | `a laptop open on a desk at the edge of a workshop floor, stock shelving out of focus behind` |
| 8 | `platform-shopify.jpg` | `a finished product and its retail packaging on a clean bench, ready to ship` |

---

## Set B — sector cards (7)

**Treatment note.** Append this to the style anchor for all seven:

```
full colour, rich but natural saturation, tactile materials, appetising and
crafted, subject in the upper two thirds of the frame
```

**Composition.** The bottom ~60px of each card is an opaque label bar. Anything
in the lower third is hidden, so keep the subject high in the frame.

**These are the seven sectors `about.html` actually names** — the labels are
fixed and the photo has to match its label, no substitutions.

| # | File | Label | Subject line to append |
|---|---|---|---|
| 1 | `sector-furniture.jpg` | Furniture | `a timber chair frame part-assembled on a joinery bench, shavings and clamps around it` |
| 2 | `sector-food.jpg` | Food | `small-batch food production, filled jars being sealed and labelled by hand on a stainless bench` |
| 3 | `sector-cosmetics.jpg` | Cosmetics | `cosmetic jars and bottles being filled and capped in a small clean production room` |
| 4 | `sector-supplements.jpg` | Supplements | `supplement powder being weighed and tubs filled on a small production line` |
| 5 | `sector-apparel.jpg` | Apparel | `folded finished garments stacked beside an industrial sewing machine and fabric rolls` |
| 6 | `sector-hardware.jpg` | Hardware | `machined metal fittings and fasteners sorted in trays on a workshop bench` |
| 7 | `sector-electronics.jpg` | Electronics | `populated circuit boards in an anti-static tray at a bench with fine tools` |

---

## Tool parameters

**Midjourney** — best route for set cohesion.

1. Generate #1 of a set until you have one you genuinely like.
2. Take its job URL and use it as the style reference for the rest:
   `--sref <url>` on all remaining prompts in that set.
3. Fixed on every prompt: `--ar 16:10 --style raw --v 7`
4. Keep `--sref` constant *within* a set. The two sets may differ — Set A is
   near-monochrome and Set B is full colour, so forcing one reference across
   both fights the treatment notes.

**Flux (fal / Replicate)** — best route if you want to script it.

- Model: Flux 1.1 Pro. `aspect_ratio: "16:10"`, `output_format: "jpg"`.
- Build each prompt as `style anchor + treatment note + subject line`.
- Fix the seed per set and vary only the subject line — that alone gets you most
  of the way to a coherent look.
- Fifteen images is one small script; re-rolling a single bad one costs nothing.

**Adobe Firefly** — pick this if commercial licensing comfort outranks
aesthetics. Trained on licensed Adobe Stock with commercial indemnification
available, and it lands straight in Photoshop for the crop and compress step.
Output tends to look safer and more generic. **Verify the current licensing
terms yourself before relying on them** — they change, and my knowledge of them
has a cutoff.

---

## After generating

1. **Crop to 16:10**, subject centred (Set A) or high (Set B).
2. **Resize to 1600×1000.** Anything larger is wasted — Set A renders at tile
   size and 16% opacity.
3. **Compress to JPEG, target under 200KB each.** Models output multi-megabyte
   PNGs. Fifteen uncompressed files would be the heaviest thing on the site by
   an order of magnitude, on a site that currently makes zero third-party
   requests and ships a 9MB video that transfers nothing until played.
4. **Name exactly as the tables above.** The paths are already wired; the build
   resolves each against the filesystem and silently skips missing ones, so a
   typo means that one tile quietly has no photo rather than a 404.
5. Drop them in `public/photos/`. No code change needed.

---

## Acceptance checks

Do both. Neither is automatable, and both have already caught real defects in
this build.

**1. Does each photo depict its own label?** A generic workshop shot behind
"Electronics" is the same defect class as a sales-orders screenshot captioned as
production — caught three times during this build, never once by a test. Set B
is where this matters most, because the label is right there under the image
making a claim.

**2. Is the text still readable over every image?** Open the home page with the
files in place and look at all fifteen at desktop and mobile width. **No test in
this repo can check this** — axe reads computed colours and cannot see a
background image, which is precisely the blind spot that let those mismatched
screenshots ship. Set A is protected by structure (16% opacity, `soft-light`,
plus a scrim) and Set B by an opaque label bar, so problems are unlikely rather
than impossible. If a title gets hard to read over any photo, that photo is too
busy or too light — re-roll it rather than adjusting the CSS, which would weaken
the treatment for all eight.
