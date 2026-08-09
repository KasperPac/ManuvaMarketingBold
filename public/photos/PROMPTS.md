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

- **All outputs carry Google's invisible SynthID watermark.** That does not
  restrict commercial use, but it does mean the images are detectable as
  generated. Consumer free tiers have also carried a *visible* watermark at
  times, which would be fatal here — **check what your tier does before
  generating fifteen**, and prefer the API or a paid tier.
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

Near-monochrome texture. These sit at 16% opacity under a colour field.

**1. `platform-inventory.jpg`** — Inventory & Production
```
Steel shelving racked with labelled parts bins and stacked components, receding in perspective. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**2. `platform-boms.jpg`** — Bills of Materials & Costing
```
The component parts of a single product laid out flat on a workbench in an exploded arrangement, evenly spaced, shot from above. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, shallow depth of field. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**3. `platform-warehouse.jpg`** — Warehouse & Stock Movement
```
Cardboard cartons stacked on a pallet at a goods-in bay, a pair of hands steadying the top carton. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**4. `platform-team.jpg`** — Team & Integrations
```
Two people working side by side at a long assembly bench, seen from behind and to one side, faces not visible. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**5. `platform-orders.jpg`** — Orders & Fulfilment
```
Sealed cartons staged in rows for despatch beside a roller conveyor. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail. Shipping labels are blank and unprinted. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**6. `platform-production.jpg`** — Production Planning
```
A production bench mid-run, part-finished work and hand tools in use, movement blurred in the background. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**7. `platform-reports.jpg`** — Reports & Analytics
```
A laptop open on a desk at the edge of a workshop floor, stock shelving out of focus behind it, screen dark and unreadable. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail. No text, no signage, no logos, no brand marks, no recognisable faces, no user interface visible on the screen.
```

**8. `platform-shopify.jpg`** — Shopify & Platform
```
A finished product and its plain retail packaging on a clean bench, ready to ship. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Low saturation, near-monochrome, strong simple shapes, clear separation of light and shadow, generous negative space, minimal fine detail. Packaging is unbranded and unprinted. No text, no signage, no logos, no brand marks, no recognisable faces.
```

## Set B — sector cards (7)

Full colour, seen at full strength. Do these first and to a higher standard.
Subject high in the frame — the bottom of the card is covered by a label bar.

**1. `sector-furniture.jpg`** — Furniture
```
A timber chair frame part-assembled on a joinery bench, shavings and clamps around it, subject high in the frame. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Full colour, rich but natural saturation, tactile materials, crafted. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**2. `sector-food.jpg`** — Food
```
Small-batch food production, filled glass jars being sealed by hand on a stainless steel bench, subject high in the frame. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Full colour, rich but natural saturation, tactile materials, appetising and crafted. Jars are unlabelled. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**3. `sector-cosmetics.jpg`** — Cosmetics
```
Cosmetic jars and bottles being filled and capped in a small clean production room, subject high in the frame. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Full colour, rich but natural saturation, tactile materials, crafted. Containers are unlabelled. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**4. `sector-supplements.jpg`** — Supplements
```
Supplement powder being weighed on a bench scale beside plain tubs on a small production line, subject high in the frame. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Full colour, rich but natural saturation, tactile materials, crafted. Tubs are unlabelled and the scale display is blank. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**5. `sector-apparel.jpg`** — Apparel
```
Folded finished garments stacked beside an industrial sewing machine and rolls of fabric, subject high in the frame. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Full colour, rich but natural saturation, tactile materials, crafted. Garments carry no printed graphics or labels. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**6. `sector-hardware.jpg`** — Hardware
```
Machined metal fittings and fasteners sorted into compartment trays on a workshop bench, subject high in the frame. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Full colour, rich but natural saturation, tactile materials, crafted. No text, no signage, no logos, no brand marks, no recognisable faces.
```

**7. `sector-electronics.jpg`** — Electronics
```
Populated circuit boards in an anti-static tray on a bench with fine tools and tweezers, subject high in the frame. Documentary editorial photograph of a small manufacturing workshop, natural window light, soft directional daylight, slightly overcast quality, warm neutral palette, matte surfaces, real working environment with mild wear and use, unstyled and uncontrived, 35mm lens, eye level, shallow depth of field. Full colour, rich but natural saturation, tactile materials, crafted. Boards carry no printed markings. No text, no signage, no logos, no brand marks, no recognisable faces.
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
