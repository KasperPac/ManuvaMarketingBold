# Brief for Claude Code — Manuva marketing site

Paste this as your opening prompt, with the `design_handoff_marketing_site/`
folder copied into the `KasperPac/ManuvaMarketing` repo.

---

Rebuild the Manuva marketing site in this repo from the design in
`design_handoff_marketing_site/`. **Read its `README.md` first — it is the
full spec.** Open the HTML pages in `ui_kits/marketing/` in a browser and scroll
them at 375, 768 and 1440 before writing code.

This is a **re-skin, not a rewrite**: keep every URL (or 301 it), carry
`sitemap.xml`, `robots.txt` and `llms.txt` across, and move copy close to
verbatim. Where the design and this repo disagree on visuals, the design wins;
on facts or copy, this repo wins. Never invent numbers, claims or customers.

## Plan
1. Propose a stack (default: Astro, static output) and a file layout. Wait for
   my OK.
2. Copy `tokens/*.css`, `site.css` and the motion engine in `site.js` in
   almost unchanged.
3. Build the shared layout (header, drawer with the old `mobile.js` focus trap,
   footer) as real server-rendered markup — not JS-injected.
4. Build the patterns as components: Hero, ShapeIntro, Stage, NumberedList,
   CompareTable, FAQ, Outro, DomainChips, Marquee, Pill.
5. Move page data (features domains, plans, matrix, compare data) into content
   files rendered at build time.
6. Build pages in this order: `/features`, `/`, `/pricing`,
   `/alternatives/katana`, `/alternatives/mrpeasy`, `/about`, `/privacy`,
   `/terms`. Hold `/customers` until I give you real content.
7. Keep the motion rationing: full on home + features, one moment on
   customers + compare, none on pricing and documents.

## Before you finish
Run through "Done means" in the handoff README and list every remaining TODO
for me.
