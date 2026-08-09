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

**"Style anchor" is this document's own term, not a feature of any tool.** It is
a paragraph of prompt text you repeat verbatim. Nothing here depends on a
product capability — it works in any generator because it is only words.

Locking a look across a set is a separate question, and the tools do it
differently:

- **Midjourney** has `--sref`, a dedicated flag that separates *style* from
  *subject* so you can carry one without the other.
- **Gemini / Nano Banana has no `--sref` equivalent.** It takes reference
  images instead: either continue in the same conversation so the previous
  image is the reference, or start fresh, attach an approved image, and say
  `Match the lighting, colour grade and level of wear in the attached image.
  Now show: <subject>.` Because it does not decompose style from content, an
  attached reference influences everything — say explicitly what should change,
  or subject matter bleeds across too.
- **Flux** does it with a separate image-conditioning path rather than a prompt
  flag.

Paste this block into **every** prompt, both sets, unchanged. It is what makes
fifteen separate generations read as one shoot when no reference image is in
play — and the baseline the first image of each set is generated from.

```
Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces.
```

Four things in there are doing specific work and should not be edited out:

- **"not a factory" / "not industrial" / "no grime, rust or dirt"** — the first
  version of this anchor asked for "a small manufacturing workshop… real working
  environment with mild wear and use", and duly produced a dirty factory. That
  contradicts positioning the site already states: about.html says "tools
  designed for large industrial manufacturers tend to be priced and structured
  for an audience Manuva isn't". The audience is Shopify-first consumer brands —
  furniture, food, cosmetics, supplements, apparel, hardware, electronics — so
  the register is a bright, tidy small-batch studio, and much of what the product
  does (stock, picking, packing, despatch) is not machining at all.
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
Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail.
```

**Why low saturation — corrected, with measurements.** An earlier version of
this file claimed a saturated photo would drag the field off-hue and make cobalt
"look muddy", and called it the highest-leverage instruction in Set A. That was
overstated. Running the actual CSS `soft-light` formula at 16% alpha across a
15–85% luminance range gives:

| Field | greyscale source | saturated source |
|---|---|---|
| cobalt | 0.76° hue, 2.4% sat | 2.39° hue, 4.0% sat |
| violet | 1.30° hue, 2.2% sat | 1.50° hue, 1.6% sat |
| aqua | 0.67° hue, 0.0% sat | 0.80° hue, 0.0% sat |
| amber | 1.41° hue, 0.0% sat | 1.54° hue, 0.0% sat |

Greyscale is genuinely better — about three times less hue shift on cobalt — but
**both are far below what anyone can see.** A 2.4° hue shift is not a visible
defect, and "muddy" was wrong.

The real reason to keep Set A near-monochrome is **consistency across the eight,
not fidelity within one.** Eight photos each carrying a different colour cast
would push each tile's field a slightly different direction. Every tile would
still look approximately right on its own, and the grid would not look like a
set. Neutral sources make all eight land in the same place.

So: if a Set A image comes back in colour and you like it, it is not a defect —
ship it. Just do not mix. Eight colour or eight neutral, not five and three.

**Composition.** These crop to `cover` at roughly 3:2 and get overlaid with a
title and two lines of body copy. Keep the interesting part central; assume the
outer 15% on every edge is lost.

| # | File | Subject line to append |
|---|---|---|
| 1 | `platform-inventory.jpg` | `Open storage shelving neatly racked with labelled bins and stacked stock, receding in perspective.` |
| 2 | `platform-boms.jpg` | `The component parts of a single consumer product laid out flat on a clean workbench in an exploded arrangement, evenly spaced, shot from above.` |
| 3 | `platform-warehouse.jpg` | `Cartons being checked in on a clean receiving bench, a pair of hands lifting one clear of the stack.` |
| 4 | `platform-team.jpg` | `Two people working side by side at a long uncluttered bench, seen from behind and to one side, faces not visible.` |
| 5 | `platform-orders.jpg` | `Sealed cartons staged in neat rows for despatch beside a packing bench. Shipping labels are blank and unprinted.` |
| 6 | `platform-production.jpg` | `A small-batch assembly bench part way through a run, part-finished items arranged in sequence along it.` |
| 7 | `platform-reports.jpg` | `A laptop open on a clean desk at the edge of the workspace, storage shelving softly out of focus behind it, screen dark and unreadable, no user interface visible.` |
| 8 | `platform-shopify.jpg` | `A finished consumer product and its plain unbranded packaging on a clean bench, ready to ship.` |

---

## Set B — sector cards (7)

**Treatment note.** Append this to the style anchor for all seven:

```
Full colour, rich but natural saturation, tactile materials, crafted. Subject in the upper two thirds of the frame.
```

**Composition.** The bottom ~60px of each card is an opaque label bar. Anything
in the lower third is hidden, so keep the subject high in the frame.

**These are the seven sectors `about.html` actually names** — the labels are
fixed and the photo has to match its label, no substitutions.

| # | File | Label | Subject line to append |
|---|---|---|---|
| 1 | `sector-furniture.jpg` | Furniture | `A part-assembled timber chair frame on a light, tidy joinery bench, hand tools and clamps arranged around it.` |
| 2 | `sector-food.jpg` | Food | `Small-batch food production, filled glass jars being sealed by hand on a clean stainless bench. Jars are unlabelled.` |
| 3 | `sector-cosmetics.jpg` | Cosmetics | `Cosmetic jars and bottles being filled and capped in a small, bright production room. Containers are unlabelled.` |
| 4 | `sector-supplements.jpg` | Supplements | `Supplement powder being weighed on a bench scale beside plain tubs on a small production line. Tubs are unlabelled and the scale display is blank.` |
| 5 | `sector-apparel.jpg` | Apparel | `Folded finished garments stacked beside a single sewing machine and neat rolls of fabric. Garments carry no printed graphics or labels.` |
| 6 | `sector-hardware.jpg` | Hardware | `Small metal fittings and fasteners sorted into compartment trays on a clean bench.` |
| 7 | `sector-electronics.jpg` | Electronics | `Populated circuit boards in an anti-static tray on a clean bench with fine tools and tweezers. Boards carry no printed markings.` |

---

## Tool parameters

**Nano Banana (Google's Gemini image model) — try this first.**

The dominant requirement here is not realism, it is that fifteen separate
generations look like one shoot. Consistency is the exact axis this model was
built on: it holds a subject, environment and lighting steady across successive
edits, which turns the set into a conversation rather than fifteen independent
rolls of the dice.

That maps unusually well onto Set B. Rather than prompting seven sectors
independently and hoping they match, establish the room once and move through it:

1. Generate `sector-furniture.jpg` from the full prompt (anchor + treatment +
   subject) until the light and feel are right.
2. Then, in the same conversation, for each remaining sector:
   `Same workshop, same lighting, same camera and lens, same grade. Now show
   <next subject line>.`
3. Only restate the negatives — no text, no signage, no logos, no faces — if one
   creeps back in.

Use the Pro tier if it is available to you; it holds detail and resolution
better, which matters for Set B where the photo is seen at full strength. Set A
does not need it.

Two things to know before committing:

- **CONFIRMED: the visible watermark is real, and it is baked into the pixels.**
  The first generated image came back with a four-pointed sparkle glyph in the
  bottom-right corner — verified at 6x zoom, not guessed at. It is part of the
  image data, not metadata, so it cannot be stripped. It also survives the tile
  crop: the mark sits about 83% down the frame and a platform tile only trims
  8.6% off top and bottom.

  At 16% opacity under soft-light it is effectively invisible, so Set A can
  tolerate it. **Set B cannot** — those render at full strength, and a sparkle in
  the corner of a sector card is plainly visible. Generate through the API or a
  paid tier that does not stamp it. Cropping it out is possible but fragile
  across fifteen images and costs composition.

- **Set the output size explicitly.** The first image came back 1024x559. That is
  fine for Set A, which is texture at 16%, but too small for Set B: those fill a
  card at full strength and will upscale visibly on a wide viewport. Ask for
  1600x1000 or larger.

- **It leans clean.** Its natural register is bright and tidy, and the style
  anchor above deliberately asks for the opposite: mild wear, real working
  environments, unstyled. Push harder on those words here than you would with
  Midjourney, and reject the first results if they look like a brochure.

Cheap and fast enough that finding out costs almost nothing, which is the main
argument for starting here.

**Midjourney** — the strongest *aesthetic*, if Nano Banana comes out too glossy.

1. Generate #1 of a set until you have one you genuinely like.
2. Take its job URL and use it as the style reference for the rest:
   `--sref <url>` on all remaining prompts in that set.
3. Fixed on every prompt: `--ar 16:10 --style raw --v 7`
4. Keep `--sref` constant *within* a set. The two sets may differ — Set A is
   near-monochrome and Set B is full colour, so forcing one reference across
   both fights the treatment notes.

`--style raw` matters: the default aesthetic pulls toward stylised, and this
brief wants documentary.

**Flux (fal / Replicate)** — best route if you want to script it.

- Model: Flux 1.1 Pro. `aspect_ratio: "16:10"`, `output_format: "jpg"`.
- Build each prompt as `style anchor + treatment note + subject line`.
- Fix the seed per set and vary only the subject line — that alone gets you most
  of the way to a coherent look.
- Fifteen images is one small script; re-rolling a single bad one costs nothing.

**Adobe Firefly** — the fallback if commercial licensing comfort outranks
everything else. Trained on licensed Adobe Stock with commercial indemnification
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

---

# Ready to paste

Every prompt below is already assembled — subject, style anchor and treatment
note in one block. Nothing to concatenate. Subject leads, because most models
weight earlier tokens more heavily and the subject is the part that must not
drift.

Filenames are the ones the build looks for. A typo means that tile quietly has
no photo rather than a broken image.

## Set A — platform tiles (8)

Near-monochrome texture. These sit at 16% opacity under a colour field, so what
survives is light and shade, not detail or colour.

**These prompts ask for near-monochrome and that is still the recommendation —
but a colour result is not a defect.** Measured, a saturated source shifts the
field by about 2.4° of hue at most, which nobody can see (numbers under "Why low
saturation" above). Neutral is preferred only so the eight land in the same
place as a set. If colour output looks good to you, keep it — just do not mix
neutral and colour across the eight.

**1. `platform-inventory.jpg`** — Inventory & Production
```
Open storage shelving neatly racked with labelled bins and stacked stock, receding in perspective. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail.
```

**2. `platform-boms.jpg`** — Bills of Materials & Costing
```
The component parts of a single consumer product laid out flat on a clean workbench in an exploded arrangement, evenly spaced, shot from above. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail.
```

**3. `platform-warehouse.jpg`** — Warehouse & Stock Movement
```
Cartons being checked in on a clean receiving bench, a pair of hands lifting one clear of the stack. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail.
```

**4. `platform-team.jpg`** — Team & Integrations
```
Two people working side by side at a long uncluttered bench, seen from behind and to one side, faces not visible. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail.
```

**5. `platform-orders.jpg`** — Orders & Fulfilment
```
Sealed cartons staged in neat rows for despatch beside a packing bench. Shipping labels are blank and unprinted. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail.
```

**6. `platform-production.jpg`** — Production Planning
```
A small-batch assembly bench part way through a run, part-finished items arranged in sequence along it. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail.
```

**7. `platform-reports.jpg`** — Reports & Analytics
```
A laptop open on a clean desk at the edge of the workspace, storage shelving softly out of focus behind it, screen dark and unreadable, no user interface visible. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail.
```

**8. `platform-shopify.jpg`** — Shopify & Platform
```
A finished consumer product and its plain unbranded packaging on a clean bench, ready to ship. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail.
```

## Set B — sector cards (7)

Full colour, seen at full strength. Do these first and to a higher standard.
Subject high in the frame — the bottom of the card is covered by a label bar.

**1. `sector-furniture.jpg`** — Furniture
```
A part-assembled timber chair frame on a light, tidy joinery bench, hand tools and clamps arranged around it. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Full colour, rich but natural saturation, tactile materials, crafted. Subject in the upper two thirds of the frame.
```

**2. `sector-food.jpg`** — Food
```
Small-batch food production, filled glass jars being sealed by hand on a clean stainless bench. Jars are unlabelled. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Full colour, rich but natural saturation, tactile materials, crafted. Subject in the upper two thirds of the frame.
```

**3. `sector-cosmetics.jpg`** — Cosmetics
```
Cosmetic jars and bottles being filled and capped in a small, bright production room. Containers are unlabelled. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Full colour, rich but natural saturation, tactile materials, crafted. Subject in the upper two thirds of the frame.
```

**4. `sector-supplements.jpg`** — Supplements
```
Supplement powder being weighed on a bench scale beside plain tubs on a small production line. Tubs are unlabelled and the scale display is blank. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Full colour, rich but natural saturation, tactile materials, crafted. Subject in the upper two thirds of the frame.
```

**5. `sector-apparel.jpg`** — Apparel
```
Folded finished garments stacked beside a single sewing machine and neat rolls of fabric. Garments carry no printed graphics or labels. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Full colour, rich but natural saturation, tactile materials, crafted. Subject in the upper two thirds of the frame.
```

**6. `sector-hardware.jpg`** — Hardware
```
Small metal fittings and fasteners sorted into compartment trays on a clean bench. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Full colour, rich but natural saturation, tactile materials, crafted. Subject in the upper two thirds of the frame.
```

**7. `sector-electronics.jpg`** — Electronics
```
Populated circuit boards in an anti-static tray on a clean bench with fine tools and tweezers. Boards carry no printed markings. Documentary editorial photograph inside a small, bright product studio — the tidy small-batch workspace of an independent consumer brand, not a factory. Natural window light, soft directional daylight, warm neutral palette, matte surfaces, clean, orderly and well-kept, calm and uncluttered, small-team scale, 35mm lens, eye level, shallow depth of field. Not industrial, no heavy machinery, no grime, rust or dirt, no dark factory interior. No text, no signage, no logos, no brand marks, no recognisable faces. Full colour, rich but natural saturation, tactile materials, crafted. Subject in the upper two thirds of the frame.
```

## Nano Banana continuation form

On the recommended route only the first prompt of a set is used in full.
Generate `sector-furniture.jpg` from Set B #1 above, then for each of the
remaining six stay in the same conversation and send:

```
Same workshop, same lighting, same camera and lens, same colour grade, same
level of wear. Now show: <first sentence of the next prompt>
```

The first sentence is the subject — everything before "Documentary editorial
photograph". The rest is already established by the image you are continuing
from, and restating it invites drift rather than preventing it.

If a negative slips — lettering appears on a jar, a face turns toward camera —
add back only the one that broke:

```
Keep everything the same, but the jars are unlabelled.
```

## Why some prompts carry extra negatives

Six of the fifteen have a negative beyond the shared set: blank shipping labels,
unprinted packaging, a dark laptop screen, unlabelled jars and tubs, unmarked
boards, garments with no printed graphics.

Those are the shots where a generator is most likely to invent lettering or an
interface, and both are real problems here. Garbled text is visible even at 16%
opacity. A rendered UI on that laptop would be a screenshot of a product that
does not exist — the mismatch defect this build has already paid for three
times, and the one thing no test in this repo can catch.
