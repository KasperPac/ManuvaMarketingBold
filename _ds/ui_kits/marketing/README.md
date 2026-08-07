# UI kit — marketing & communication

The **loud layer**. Tokens live in `tokens/marketing.css`; the rules live in
`guidelines/marketing-fields.card.html`. The app never reads these tokens.

| File | Surface | Colour |
|---|---|---|
| `index.html` + `Landing.jsx` | manuva.app landing — cobalt hero panel with lime highlight, lime marquee, live product shot on tint, six field tiles, amber/violet split, ink comparison, flare CTA | Full fields |
| `og-card.html` | 1200×630 OG / paid-social card | Full field, rotate per campaign |
| `email.html` | Transactional email (PO confirmed) — 600px, table-based, literal hex | Header band only |

## Why the fields are the domain accents

Six of the seven marketing fields *are* the product's domain accents, promoted from
6px rules to full-bleed backgrounds. The site and the app share one palette; the
site just turns it up. Lime `#C8FF2E` is the seventh — marketing-only, backgrounds
only, never text.

In-app, colour keeps its domain meaning (cobalt = Inventory, flare = Production).
On the site it rotates for rhythm, so no two adjacent panels share a hue.

## Motion

Scroll reveals (`.mv-reveal`, driven by an `IntersectionObserver` in `Landing.jsx`),
hover lift on tiles (`.mv-lift`), press feedback on pills (`.mv-press`), and one
marquee. All of it is decoration: every element is fully legible with
`prefers-reduced-motion` on.

## Email is not the web

Email clients do not resolve CSS custom properties and Outlook drops background
images. `email.html` therefore uses literal hex lifted from the tokens, `bgcolor`
on cells, and a table-cell button — not a styled `<a>`. Keep it that way.

The landing page reuses the app's fixture data so the product shot is the *real*
`DataTable`, not a picture of one. That is deliberate: the marketing screenshot and
the product are the same components.
