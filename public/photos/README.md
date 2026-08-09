# Platform tile photography

Eight decorative watermark photos, one per tile in the home page's "The platform"
grid. The photo owns a band down the right of each tile (the bottom on narrow
screens) at **full natural colour**, masked so it fades into the field colour,
with the text held clear of it. Nothing here is load-bearing: with the directory
empty the tiles render exactly as they did before, and `Tile.astro` only emits
the layer when a `photo` path is passed.

**These images do not exist yet.** The paths below are wired up in
`src/pages/index.astro`; drop the files in and they appear.

## The eight

| File | Tile | Field | What it should show |
|---|---|---|---|
| `platform-inventory.jpg` | Inventory & Production | cobalt | Racked stock / bins of components in a working store area |
| `platform-boms.jpg` | Bills of Materials & Costing | violet | Component parts laid out as an exploded assembly |
| `platform-warehouse.jpg` | Warehouse & Stock Movement | flare | Goods-in: cartons on a pallet, someone receiving |
| `platform-team.jpg` | Team & Integrations | amber | Two or three people at a bench, working, not posing |
| `platform-orders.jpg` | Orders & Fulfilment | aqua | Packed cartons labelled and staged for despatch |
| `platform-production.jpg` | Production Planning | flare | A production area mid-run, work in progress on benches |
| `platform-reports.jpg` | Reports & Analytics | cobalt | An office-side desk in a workshop — laptop among stock |
| `platform-shopify.jpg` | Shopify & Platform | violet | Finished retail-ready product, packaging visible |

**Prompts for all fifteen are written up in `PROMPTS.md`** — a shared style
anchor plus per-image subject lines, split into the two sets because they need
different treatments (the platform tiles are near-monochrome texture; the sector
cards are full-colour and actually seen).

## Requirements

- **Self-hosted only.** No CDN or remote URL. An e2e test asserts every route
  makes zero cross-origin requests on load, and it will fail.
- **Landscape, ~1600×1000, JPEG, under ~200KB each.** They render at tile size
  at band width, so file size matters more than resolution.
- **No text, no logos, no readable UI.** These are seen at full strength, so
  any lettering is legible, and a real brand mark is a licensing problem.
- **No recognisable faces.** Hands and figures at working distance are fine.
- **Consistent treatment across all eight** — same rough lighting and warmth, or
  the grid reads as eight unrelated stock photos.

## Before shipping any of these

Two checks, both of which have bitten this project already:

1. **Look at each tile with the photo in place, at desktop and mobile width.**
   No automated test in this repo can catch a contrast problem here — axe reads
   computed colours and cannot see a background image, which is exactly the
   blind spot that let four mismatched screenshots ship earlier in this build.
   If the title or body gets hard to read over any photo, that photo is too
   busy or too light.

2. **Check the photo actually depicts its own tile.** A generic warehouse shot
   behind "Reports & Analytics" is the same defect class as a sales-orders
   screenshot captioned as production — it was caught three times during this
   build and never by a test.

Generated imagery is fine for this. It is decorative, carries no alt text, and
makes no factual claim — but it still has to look like the thing its heading
names.

## The seven sector cards

Added with the use-cases section. These render at **full strength** as the whole
card background with an opaque label bar across the bottom — unlike the platform
tiles above, they are seen properly, so they carry more weight and want more
care. Same guard: no file, no markup, no 404.

| File | Label |
|---|---|
| `sector-furniture.jpg` | Furniture |
| `sector-food.jpg` | Food |
| `sector-cosmetics.jpg` | Cosmetics |
| `sector-supplements.jpg` | Supplements |
| `sector-apparel.jpg` | Apparel |
| `sector-hardware.jpg` | Hardware |
| `sector-electronics.jpg` | Electronics |

The seven labels are fixed: they are the sectors `about.html` names, in its own
words, and they are the only sector copy that exists anywhere in the sources.
A photo has to match the label it sits under — swapping in something adjacent
because it generated better is the mismatch defect this project has already paid
for three times.
