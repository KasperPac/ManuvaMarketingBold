# Copy-parity handoff — UI audit fixes, 2026-09-23

## Why this file exists

`npm run parity` could not be run on the machine these fixes were made on.
The gate reads the old site with `git -C C:/dev/ManuvaMarketing show
origin/master:<path>`, and that checkout is not present here:

```
fatal: cannot change to 'C:/dev/ManuvaMarketing': No such file or directory
```

The same absence makes `tests/unit/alternatives.test.ts` fail two tests
(`katana/mrpeasy keeps at least as much content as the source`). Those two
failures predate this work and are environmental, not regressions — the rest
of the suite is green (220/222 unit, 153/153 e2e).

Six copy corrections in this pass change text that came from the old pages.
Each one needs an `ignore.json` entry, and `scripts/parity/ignore.json` is
explicit that an entry must be **the exact missing phrase copied verbatim out
of the gate's own FAIL output** — matching is exact string equality after
`normalise()` + lowercase, not a substring. Guessing at the entries here would
have produced stale entries, which the gate reports as failures in their own
right. So they are deliberately **not** added. Run the gate on a machine that
has the old repo, then paste what it prints.

## What to do

1. `npm run build`
2. `npm run parity`
3. For each phrase the gate reports as missing on `/pricing`,
   `/alternatives/katana` or `/alternatives/mrpeasy`, add it verbatim to that
   route's array in `scripts/parity/ignore.json`, and extend that route's
   `_reason` key using the reasons below.
4. Re-run `npm run parity` — it should be green with no stale entries.

Nothing else in this pass touches extracted text. The reasoning for that is at
the bottom.

---

## The six changes, with reasons for `ignore.json`

### `/pricing`

**1. Pro plan tagline — dropped an API claim the product does not have**

| | |
|---|---|
| was | `Professional manufacturers needing capacity, costing & API` |
| now | `Professional manufacturers needing capacity, costing & advanced reporting` |

No API appears anywhere else on the site — not in the 43-row comparison
matrix, not in any of the nine feature sections, not in `llms.txt`'s feature
list. API claims were removed deliberately in `86c5578` ("drop API, multi-store
and bin/aisle claims"); this one survived in a tagline. Selling a tier on a
capability that does not ship is the reason to diverge from the source here.
"Advanced reporting" is what that tier actually adds over Growth, per the
matrix's own `PDF + CSV export` and `Financial profitability dashboard` rows.

**2. The annual saving is 16.8%, not 20%**

| | |
|---|---|
| was | `Monthly pricing: Starter $119, Growth $299, Pro $599. Annual saves approximately 20%.` |
| now | `Monthly pricing: Starter $119, Growth $299, Pro $599. Annual saves approximately 17%. Prices are in Australian Dollars (AUD); GST is included for Australian customers.` |

Also `Save ~20%` → `Save ~17%` on the hero toggle badge, and FAQ 5:

| | |
|---|---|
| was | `Annual billing saves you around 20% compared to paying month-to-month. The toggle above shows you both options.` |
| now | `Annual billing saves you around 17% compared to paying month-to-month — put another way, paying monthly costs about 20% more. The toggle above shows you both options.` |

The page's own figures are $119→$99, $299→$249, $599→$499. That is a **16.8%
saving**, which rounds to 17, not 20. The 20% figure is what you get measuring
the other direction — monthly costs 20.2% *more* than annual — which is why
`/alternatives/katana` states the same relationship correctly as "Monthly add
~20%". The FAQ answer now gives both framings so the number a reader may
remember from `llms.txt` still appears and is attached to the direction that
makes it true.

> **`llms.txt` needs the same correction.** It lives in the old repo and
> carries the 20% saving claim that this page was sourced from. It could not
> be edited from here.

The AUD sentence is an addition, not a replacement — see the currency note
below. Additions never trip the gate.

### `/alternatives/katana`

**3. Currency — the page claimed USD, the terms say AUD**

| | |
|---|---|
| was | `Unlimited users from Growth — no seat charges, ever. Pricing in USD, billed annually. Monthly add ~20%.` |
| now | `Unlimited users from Growth — no seat charges, ever. Manuva pricing in AUD, billed annually. Monthly add ~20%. Katana figures are their published USD list price.` |

`/terms` §4 has always read "Prices are stated in Australian Dollars (AUD).
GST is included for Australian customers." This page asserted USD for the same
prices, so the site contradicted itself on the one fact a price is meaningless
without. Resolved in favour of AUD on the author's instruction.

The added sentence about Katana's figures is not decoration: once Manuva's
prices are stated as AUD, the side-by-side cost argument is comparing two
currencies unless the competitor column says so. The same sentence was added
to the MRPeasy seat table (change 5).

**4. "four gaps" above a list of five**

| | |
|---|---|
| was | `As your operation matures, four gaps tend to drive teams to evaluate alternatives.` |
| now | `As your operation matures, five gaps tend to drive teams to evaluate alternatives.` |

The `GAPS` array has five entries and always did. Straight counting error in
the source.

**5. Internal sales instruction published as public copy**

| | |
|---|---|
| was | `Each item below is based on Katana's publicly documented feature set as of May 2026. Verify against Katana's current site before sharing externally.` |
| now | `Each item below is based on Katana's publicly documented feature set as of May 2026. Check Katana's current site before you decide.` |

"Before sharing externally" addresses the sales team, on a page whose only
readers are prospects. Three sentences in this class shipped across the two
comparison pages and `/alternatives`; all three now address the reader. The
date stamp is untouched — see "not changed" below.

### `/alternatives/mrpeasy`

**6. Starter seat count contradicted every other page**

| | |
|---|---|
| was | `No. Manuva uses flat per-account pricing across every tier. The Starter plan covers up to 5 office seats; Growth and Pro include unlimited users …` |
| now | `No. Manuva uses flat per-account pricing across every tier. The Starter plan covers up to 3 users; Growth and Pro include unlimited users …` |

Starter is **3 users** on the pricing cards, in the comparison matrix's "Team
members" row, and in this page's sibling katana page's own Manuva pricing
column. This FAQ was the only place on the site saying 5.

**7. Internal sales instruction (same class as 5)**

| | |
|---|---|
| was | `MRPeasy Professional list pricing as of May 2026 (~$49/user/month, billed annually). Verify on MRPeasy's site before sharing externally.` |
| now | `MRPeasy Professional list pricing as of May 2026 (~$49/user/month billed annually, their published USD list price). Check MRPeasy's current site before you decide.` |

---

## Also changed, but outside the gate's reach

**`/alternatives/mrpeasy` `<title>`** — `MRPeasy Alternative — Flat-Rate MRP
for Shopify Manufacturers | Manuva` → `MRPeasy Alternative for Shopify
Manufacturers — Manuva`. 70 characters down to 57 (search results truncate
around 60, and the clause being cut was the differentiating one), and the only
one of the nine titles that used a pipe instead of the site's em dash.
`extractText()` reads `<main>`/`<body>`, never `<head>`, so titles are not in
the parity comparison at all — but it is a real divergence from that page's own
source `<head>`, so it is recorded here and pinned in
`tests/unit/alternatives.test.ts`.

**`/alternatives`** is not a parity route — there is no old `alternatives/index.html`.
Its caption was corrected in the same class as changes 5 and 7
(`Verify before sharing with prospects.` → `last checked May 2026. Check each
vendor's current site before you decide.`) and `MRPEasy` → `MRPeasy`, with no
gate implications.

---

## What was deliberately NOT changed

**The May 2026 competitor date stamps.** `/about` promises "we date-stamp it
and re-verify every quarter", and as of 2026-09-23 the stamp is four months and
one missed quarter old. The honest fix is to re-verify Katana's and MRPeasy's
current published pricing and feature sets and then move the date — moving the
date without doing that would make the page less true, not more. **This is
still open and needs a human.**

**Any old-page copy not listed above.** Every other change in this pass is
markup, CSS or attributes.

## Why the rest of the pass is parity-neutral

The accessibility work looks like it should have moved a lot of text. It did
not, by construction:

- **Verdict cells gained accessible names via `role="img"` + `aria-label`, not
  visually-hidden text.** `extract.js` replaces every `[data-icon]` element
  with an `[icon:name]` token and `extractTables()` reduces a cell that is only
  a dash to `[none]`. Any text added inside a verdict cell — hidden or not —
  changes that cell's extracted value and trips `changedRows`. Attributes are
  not extracted, so naming the element leaves the comparison byte-identical.
  This is why `Icon.astro` grew a `label` prop instead of the obvious
  `<span class="sr-only">` sibling.
- **`<td>` → `<th scope="row">` on three tables.** `BOUNDARY_SELECTORS`
  contains both, and `extractTables()` collects `find('td, th')`. Identical
  output.
- **The `—` cells** are wrapped in `<span role="img" aria-label="Not
  included">`. `span` is not a boundary selector and the text content is
  unchanged, so the cell still extracts as `-` → `[none]`.
- **`h3` → `h2`** on the home page's highlight panel: both are boundary
  selectors.
- **The footer's `<span>` headings became `<h2>` inside `<nav>`.** `footer` and
  `nav` are both in `CHROME_SELECTORS` and stripped from both sides.
- **`.site-plan-monthly` is now always rendered**, empty on Enterprise.
  `splitFragments()` drops empty strings, so an empty `<p>` contributes
  nothing.
- **The features index tiles** now read their labels from `FEATURE_LINKS`
  (`Orders` → `Orders & Fulfilment`, and four others). These labels were never
  part of the old page's measured copy — the old page's equivalent was a
  `<nav class="jump-nav">`, which is stripped as chrome — so the longer strings
  are additions. The short fragments being dropped (`Orders`, `Purchasing`,
  `Production`, `Costing`, `Reports`) are compared as a multiset by count, and
  each of those words still occurs at least as often elsewhere on the page as
  it did on the old one.
