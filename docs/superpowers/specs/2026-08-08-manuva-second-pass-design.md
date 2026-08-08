# Manuva marketing site — second pass

**Date:** 2026-08-08
**Status:** Approved design, ready for planning
**Follows:** `2026-08-07-manuva-marketing-reskin-design.md` (shipped, merged at `e0a9c91`)

The first pass was a faithful re-skin: eight routes, copy moved verbatim, rankings
protected. It succeeded at that and in doing so under-used the design system's own
voice. This pass leans back into it, adds the product tour the site never had, and
brings the explainer video in.

---

## 1. What prompted this

Three observations from the design-system author, in their words:

1. *"I don't like the lime with green underneath. It feels off."*
2. *"There needs to be division between the sections. All having it white background makes it hard to track where you're up to."*
3. *"We went a bit too heavy on copying the current site. The dashboard looks a bit out of place. I prefer the punchline in the design system."*

The first two are defects. The third is a direction.

### The measured basis

- **Lime on mint.** `index.astro` renders `<Marquee>` (`--field-lime` `#C8FF2E`) immediately followed by `<Field field="mint">` (`#00C271`), gap **0px**. Two saturated greens touching. `handoff.md` forbids this twice: *"never two fields touching — put ink or paper between them"* and *"no two adjacent panels share a hue."* The hue-adjacency test missed it because `Marquee` carries the `.mv-field-lime` class rather than emitting `data-fold`.
- **Undifferentiated paper.** The home page has a **3,380px** unbroken run across four consecutive sections (integrations, pillars, showcase, pricing), plus a further 1,250px run. `/pricing`, `/alternatives/katana` and `/alternatives/mrpeasy` each run **five consecutive** paper sections. `/features` is 11 paper sections of 13, longest run 5.

---

## 2. Decisions

| Decision | Choice |
|---|---|
| Home H1 | Punchline as H1, keyword line as the lede beneath |
| Explainer video | Featured full-bleed **ink** band, directly under the hero |
| Explainer hosting | **Self-hosted** MP4, `preload="none"` + poster — zero bytes until play |
| Category videos | **YouTube click-to-load facade**, when uploaded |
| Product tour | New route **`/product`** |
| Section division | Alternate `--field-paper` / `--bg-card` + `--stroke` hairline |
| Copy discipline | **Unchanged** on `/pricing`, both `/alternatives/`, `/privacy`, `/terms` |

---

## 3. The home page

### 3.1 Hero

The H1 becomes the design system's own punchline, with the lime highlight on the
middle clause:

> Make it. **Track it.** Ship it.

`Manufacturing operations, finally simple.` moves directly beneath it as the lede,
in display type one step down.

**This is an addition, not a replacement.** The keyword phrase stays high on the
page, and `<title>`, `<meta name="description">` and all `og:`/`twitter:` values
are untouched — they remain byte-identical to the old page's own head.

Lime appears only as a background behind the highlighted clause, never as text.

The reference layout's invented `1,240` watermark does **not** ship.

### 3.2 Explainer band — the second beat

A full-bleed **ink** section directly under the hero, taking the slot the dashboard
screenshot currently occupies.

Ink because a dark field makes a video poster read as a moment rather than an image
on a page, and because it gives the home page an early, strong division. The
comparison section is also ink but sits five sections away, so nothing adjacent
repeats.

Contents: poster frame, play affordance, one line of framing copy.

**Why the dashboard leaves this slot:** a static screenshot of a UI the reader has
no context for is weak work in the most valuable position after the headline. A
32-second "what is Manuva" is the strongest top-of-funnel asset available. The
screenshot is not being demoted — it moves to `/product`, where someone who has
chosen to look at the product will find it with company and context.

`screen-variant.png` and `screen-components.png` stay where they are, in the
showcase sections lower down the page.

### 3.3 Field rhythm

The marquee moves up to sit directly under the hero panel, where `Landing.jsx`
places it. The beta strip moves off mint to **aqua**, with paper either side.

Resulting fold sequence:

```
cobalt hero → lime marquee → ink video → paper (integrations)
→ paper tiles → amber/violet split → aqua beta → paper pricing
→ ink comparison → paper contact → flare CTA
```

Lime is flanked by cobalt above and ink below. No two adjacent folds share a hue,
and no two fields touch.

**Aqua, not violet.** The split panels immediately above the beta strip are amber
and violet, so a violet strip would repeat the hue of the panel directly above it —
the same defect this pass exists to fix, one position along. Of the eight fields,
cobalt, lime, ink, flare, amber and violet are all spoken for on this page, and mint
is the green being moved away from. Aqua is the one left, and it is distinct from
lime by six positions.

### 3.4 Unchanged on this page

The pricing summary, the four pillars with their chip tags, the eight-row
comparison table, the beta strip's copy, the integrations strip and the contact
section all keep their content exactly as shipped.

---

## 4. `/product` — the new route

A new page with no old counterpart. The copy-parity gate has nothing to compare it
against and will report it as having no source; that is correct, not a failure.

### 4.1 The product shots

All three — dashboard, variant with BOM versioning, component selection — each with
its own framing line, at a size where the interface is legible. This is where the
dashboard belongs.

### 4.2 Domain cards

Six cards: Inventory, Products & BOMs, Production, Purchasing, Logistics, Audit.

Each shows its video where one exists and a still where one does not. Today that is
zero videos; when Inventory is uploaded it becomes one; the set grows to six without
a layout change.

**These are the six domains from `Landing.jsx` returning — with real content this
time.** The domain names are genuine product modules, present in the design system
and matching the author's own video titles. Descriptions come from:

- `llms.txt` — Inventory, Products & BOMs, Production, Purchasing
- `features.html` — Logistics, Audit

**None of the invented blurbs stripped in the first pass return.** Every line traces
to a source, as before.

### 4.3 Route registration

`/product` is added to `ALL_ROUTES`, the sitemap (making nine entries), and the
navigation.

**Nav position: first**, before Features — `Product · Features · Pricing · Compare ·
About`. It is the broadest of the five and the natural first stop for someone who
has just watched the explainer and wants to see more. The footer gains it under
Product, above Features.

This is the second nav change in the project. The first — dropping Contact in favour
of About — was ratified after the fact when a review surfaced it. This one is
deliberate and recorded here rather than discovered later.

Its `<title>`, description and `og:`/`twitter:` values are authored, since there is
no old page to take them from. **They are the only authored head values on the site**
and must be reviewed before ship.

---

## 5. The video component

One component, two modes, chosen by which props are supplied.

**Self-hosted mode** — an MP4 path. Renders `<video preload="none" poster=…>` with a
play affordance. `preload="none"` means the browser fetches nothing but the poster
until the user presses play, so a 9.1MB file costs zero bytes on load.

**Facade mode** — a YouTube ID. Renders the poster and a play button as static
markup. No request reaches YouTube, and no cookie is set, until a click. On click it
swaps in the iframe.

**Neither** — renders the still with no play affordance. This is what the five
category cards do until their videos exist.

This preserves the position the rest of the site takes: no third-party runtime
requests, the same reason icons are inlined and fonts are gated on self-hosting.

### Posters

Poster frames are **self-hosted stills**, extracted from the source MP4s. Pulling
them from YouTube's thumbnail URLs would put a third-party request back on page
load, defeating the facade.

---

## 6. Section division — site-wide

Consecutive paper sections alternate `--field-paper` `#FAFAF9` and `--bg-card`
`#FFFFFF`, with a `--stroke` hairline at each boundary.

**The alternation restarts at each field band, and the first paper section after one
takes `--field-paper`.** So a run reads paper, card, paper, card. Stated explicitly
because "alternate" alone does not say which end it starts from, and two pages
starting on opposite feet would look like a bug.

The hairline sits on the **top** edge of each paper section except the first in a
run — a rule on every boundary including the one against a field band would draw a
line nobody asked for across a colour edge.

Both are existing tokens. The step is subtle enough not to compete with the field
bands and sufficient to mark where a section ends.

Implemented as one positional rule in `site.css` rather than page by page, so it
fixes the home page's 3,380px run, `/pricing`'s five-in-a-row and both
`/alternatives/` pages at once, and any section added later inherits it.

Field sections are unaffected — they already have their own backgrounds.

---

## 7. Prerequisites

1. **The explainer MP4 must be materialised locally.** `Manuva 01 Explainer.mp4`
   (9.1MB, 32s) is a Dropbox online-only placeholder. It must be pulled down before
   it can be copied into `public/` and before a poster frame can be extracted.
2. **YouTube IDs** for the category videos, when uploaded. Not blocking — the
   component falls back to a still without them.
3. **`_ds/tokens/fonts-selfhost.css`** remains outstanding from the first pass
   (MVBOLD-3) and still gates production.

---

## 8. Out of scope

- Any copy change on `/pricing`, `/alternatives/katana`, `/alternatives/mrpeasy`,
  `/privacy` or `/terms`. Those pages rank on their words; the parity gate still
  guards them and this pass does not touch their content.
- The `Stories/` videos — nine 10-second vertical social cuts. Wrong shape for the
  site; they are advertising assets.
- Re-litigating the first pass's design-system findings or the five source bugs
  found in the old site. Both are recorded and remain the author's editorial calls.

---

## 9. Verification

- [ ] No two adjacent `data-fold` sections share a hue, and no two fields touch —
      including the marquee, which must now be visible to that check.
- [ ] Home `<title>`, description and `og:`/`twitter:` values byte-identical to
      the old page.
- [ ] `Manufacturing operations, finally simple.` still present on the home page.
- [ ] Copy parity green on all eight original routes.
- [ ] No third-party request on load, on any route, before interaction.
- [ ] Explainer band transfers zero video bytes until play.
- [ ] `/product` in `ALL_ROUTES`, the sitemap and the nav; canonical matches its
      sitemap entry.
- [ ] Every domain card's description traces to `llms.txt` or `features.html`.
- [ ] No consecutive paper sections share a background.
- [ ] axe clean on `/product` at WCAG A and AA, including the video controls.
- [ ] Video is keyboard-operable and its poster has meaningful alt text.
