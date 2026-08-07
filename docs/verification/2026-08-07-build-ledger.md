# SDD ledger — plan: docs/superpowers/plans/2026-08-07-manuva-marketing-reskin.md

Branch: feat/marketing-reskin
Merge base: 5217f79 (master)
Setup commit: 4c03166 (gitignore for SDD scratch, dist, public/_ds)

Repo: C:\dev\ManuvaMarketingBold
Old site (read-only, copy source): C:\dev\ManuvaMarketing @ origin/master
monday: board 5101754034, item MVBOLD-4 (3144754039)

14 tasks. Setup complete; pre-flight scan below.

---
Pre-flight scan: 3 conflicts found, all resolved before Task 1 (commit 1be6890).
  - Adjacency test contradicted the plan's own home skeleton (cobalt hero Panel
    then cobalt Tile). Resolved: data-fold marks fold-level colour only; tile
    grids exempt as one composed unit. User chose "mark folds explicitly".
  - No-hardcoding constraint read stricter than intended; scoped to values a
    token actually names.
  - netlify.toml "/*/" redirect looped the home page; removed.

Task 1: complete (commits 1be6890..d4dcc6d, review clean — spec OK, quality approved)
  Deviations accepted, all three independently reproduced by the reviewer:
    - create-astro 5.2.3 cannot scaffold into a non-empty dir; files hand-authored.
      Plan Step 1 corrected (d4dcc6d).
    - new URL(ogImage, Astro.site) throws under the container API; guarded.
    - <link href="/styles/site.css"> never resolves (file is under src/); ESM import.
  Controller action: task code MVBOLD-2 -> MVBOLD-4 across all 14 plan commit
    messages; Task 1 commit amended 1fdc7b6 -> 19427d9.
Task 1: minor (deferred): skip-link test asserts the anchor exists but not that it
  is first in tag order, despite its name. Brief-authored; carry to final review.
Task 1: minor (resolved): task-1-report.md cites amended-away hash 1fdc7b6.
  Ledger carries the correct range.

Task 2: review — spec FAIL, quality not approved. 1 Critical, 3 Minor.
  Critical: package.json "lucide-static": "^0.544.0" is a range, not the exact
    pin the brief required. npm adds a caret without --save-exact. Lockfile is
    correct today; package.json permits 0.544.x drift, which defeats matching
    the design system's hardcoded CDN version.
Task 2: minor (deferred): Icon.astro SVG rewrite is a regex over lucide-static's
  undocumented internal template. Reviewer verified all 1865 glyphs share the
  identical attribute order and none self-close, so it is safe at this version —
  but its safety net is the pin. The two findings are linked.
Task 2: minor (deferred): the source's "@license lucide-static v0.544.0 - ISC"
  comment is preserved and duplicated into the DOM once per icon instance.
Task 2: minor (deferred): icon.test.ts:31-37 asserts absence of specific known
  strings; would not catch a network dependency reintroduced by another
  mechanism. No such mechanism exists today.
Task 2: fix round 1/5 dispatched (resumed impl-task2) — exact pin only.

Task 2: fix round 1/5 (1 addressed, 0 open — exact pin; commits 8621766..bfe0e0f)
  Re-review confirmed all three copies agree: manifest, lockfile root spec,
  lockfile resolution. No new breakage.
Task 2: complete (commits d4dcc6d..bfe0e0f, review clean after 1 fix round)

Task 3: review — spec OK, quality approved with 1 Important + 1 Important(plan-
  mandated) + 2 Minor. Both Importants conflicted with plan text; put to the
  design-system author, who ruled:
  - accent ink: use var(--accent-on, #fff). --accent-on is defined ONLY under
    [data-domain] (colors.css:69-75); its three siblings have root fallbacks in
    every theme block (themes.css:60,116,172,228). Site sets no data-domain, so
    the bare token yields near-black on brand-blue. Button.jsx hardcodes #fff for
    this reason; the brief's "correction" broke it. Fix round 1 dispatched.
  - danger-hover rule dropped rather than moved: leave dropped, log it. No
    danger buttons exist on any of the eight routes.
Task 3: minor (deferred): four literals in Button.astro duplicate named tokens
  (12px/20px = --space-3/--space-5, 1px = --border-xs, 0 = --ls-normal). Copied
  verbatim from Button.jsx and the brief; a design-system-side observation.
Task 3: minor (deferred): button.test.ts:48 "hardcodes no colour" renders only
  variant=primary; vacuous for the other five variants.

DS FEEDBACK for Kasper (alongside MVBOLD-3 fonts):
  1. --accent-on has no root-level fallback, unlike --accent-loud/-text/-dim.
     Any component using it outside a [data-domain] subtree renders unreadable.
  2. No --danger-on token exists, so Button.jsx's danger-hover ink is a literal.

Task 3: fix round 1/5 (1 addressed, 0 open — accent ink; commits 7b99e81..35b9ff7)
  Re-review confirmed var() fallback semantics hold in both branches: no @property
  registration exists for --accent-on, so it is genuinely unset outside a domain
  scope (fallback fires), and explicitly set inside one (token wins, including
  #141413 on purchasing/logistics/audit). Structurally guaranteed, not incidental.
  Note: the new #fff literal is a real instance behind the deferred
  "button.test.ts only exercises variant=primary" minor. Raises its value.
Task 3: complete (commits bfe0e0f..35b9ff7, review clean after 1 fix round)

Task 4: review — spec OK, quality not clean. 0 Critical, 2 Important, several
  assessed non-issues.
  Important 1: no scrollbar-width compensation when locking body scroll
    (Drawer.astro:26). Reviewer contradicted the implementer's "sub-pixel,
    one-frame" claim: it is the full ~15-17px scrollbar width, persists while
    open, and is reachable on any classic-scrollbar desktop narrowed below the
    drawer's own 960px breakpoint. Original mobile.js measured and compensated
    precisely for this. Fix round 1 dispatched: restore the original's approach.
  Important 2: chrome.test.ts:13-18 and :20-25 loop over a filtered array with
    no non-empty assertion — pass with zero assertions if the components render
    no links at all. Brief-authored; this file is the template later tasks copy.
  Upheld deviations (correctly judged by the implementer): animated close is
    cosmetic; isClosing guard would now be dead code, since close() is
    synchronous and idempotent.
  Undeclared diff the implementer's own mobile.js comparison missed: original
    burger toggles, port only calls open(). Traced harmless — drawer z-index 60
    covers nav z-index 40 and the focus trap blocks tabbing back, so the
    toggle-closed branch is unreachable. No fix.
Task 4: minor (deferred): scrim rgb(20 20 19 / .5) and footer inks
  rgb(255 255 255 / .62|.42) are hardcoded derivations of --ink-strong and
  --on-ink at alpha. No token exists to reference; CSS cannot extract channels
  from a hex custom property without color-mix(), unused elsewhere in _ds.
Task 4: minor (deferred): focus trap returns early when the drawer contains no
  focusable elements, letting focus leak behind the overlay. Unreachable with
  current markup (always a close button plus six links).

Task 4: fix round 1/5 (2 addressed, 0 open; commits 381c26e..d7abcb7)
  Scrollbar: measure before lock, body paddingRight applied/cleared. Reviewer
    confirmed no competing padding-right on body in _ds/tokens/base.css or
    site.css, so clearing falls back to the cascade cleanly. Reviewer also
    narrowed its own original claim: the dominant real bug was background
    content reflow (fixed); the fixed-position drawer panel itself is outside
    normal flow and unaffected by body padding either way.
  Vacuous tests: guards added to both. Implementer's RED verification showed the
    nav test was never vacuous for the emptied-NAV_LINKS case (the logo's "/"
    link is unconditional); footer genuinely was. Guard still correct for both —
    it closes the fully-general "renders no links at all" case.
Task 4: complete (commits 35b9ff7..d7abcb7, review clean after 1 fix round)

Task 5: implementer reported DONE_WITH_CONCERNS — Pill passing style=undefined
  blanked Button's style. Controller investigated before review and found the
  root cause is deeper and worse: Button.astro never destructures `style`, so
  ANY caller style lands in ...rest and replaces Button's computed style whole.
  Reproduced: <Pill field="lime"> rendered with field colours and NO radius,
  height, padding, font-size — the home hero's primary CTA as a bare link.
  Contract broken is in handoff.md: "Every component takes style and className
  and merges them." Button.jsx does {...v, ...style}; the port dropped it.
  Fix dispatched: merge in Button (Task 3 file), revert Pill's workaround, add
  regression tests to button.test.ts and primitives.test.ts. Plan corrected.
Task 5: pre-review correctness fix (commit 04042e9) — Button merges callerStyle
  after its own computed style; Pill reverted to plain style={style}. Controller
  re-ran the exact diagnostic that failed pre-fix; now passes.
Task 5: review — spec OK, quality approved. 0 Critical, 2 Important, 1 Minor.
  Important 1: the new merge regression tests use toContain only, so they pin
    presence not ORDER. Reviewer reversed the concatenation in a scratch build
    and both tests still passed — an inverted merge would ship silently.
  Important 2: Panel.astro repeats the un-destructured style + {...rest} pattern.
    Worse failure mode than Button's: for a STATIC host element Astro emits two
    literal style attributes rather than deduping, and per the HTML parsing spec
    the FIRST wins, so a caller's style is silently dropped. Latent — nothing
    passes style to Panel today — but Panel exists to accept caller attributes.
Task 5: minor (deferred): CtaBand hand-rolls a panel div instead of composing
  Panel, which was purpose-built this task for the hand-attached data-fold case.
  Brief-authored, identical output, not a bug.
Task 5: fix round 1/5 dispatched (resumed impl-task5) — order-sensitive tests
  plus the Panel merge.

Task 5: fix round 1/5 (2 addressed, 0 open; commits 04042e9..5a465f5)
  Re-reviewer reproduced the discriminating check itself rather than trusting
  the report: reversed both concatenations in the real source, got identical
  failure numbers (277<38, 348<40, 110<29), restored byte-identical. Also
  confirmed --radius-pill is a single-occurrence anchor, so the index
  comparisons are unambiguous.
Task 5: complete (commits d7abcb7..5a465f5, review clean after 1 fix round)

Task 6: review — spec OK, quality NOT approved. 3 Critical, 2 Important, 2 Minor.
  All are defects in the BRIEF's design, not the implementation, and all were
  reproduced by the reviewer against the real old pages.
  Critical 1: extract.js strips chrome by tag only; old index.html's drawer is
    an untagged div/aside, so its close button and CTAs leak into the comparison.
    The implementer's self-review missed it (checked for js tokens, not chrome).
  Critical 2: the 25-char floor discards the alternatives pages' comparison-table
    verdicts ("No.", "Yes.", "Katana charges per user."). Those pages ARE tables;
    a flipped cell or deleted row produced zero signal on the two pages the brief
    most protects.
  Critical 3: .text() glues adjacent <td> content, so /pricing yields one
    1438-char phrase and each alternatives page one ~538-char phrase containing
    its whole table. Reformatting forces an ignore entry — and ignore matching is
    substring-of-whole-phrase, so one short entry swallows unrelated real losses.
  Important 4: a never-built page reports "skipped" and the run still exits 0.
  Important 5: check.js — the masking-prone logic — has zero test coverage.
  Minor: OLD_REPO hardcoded absolute path; fixtures do not model real markup.
Task 6: fix round 1/5 dispatched — chrome-by-role stripping, short-fragment
  multiset tier, element-boundary separation, exact-match ignores with
  fired/stale reporting, --require-all, check.js tests, env-var repo path.

NOTE for Tasks 7-12: running a single-route parity check from Git Bash mangles a
  leading-slash argument (MSYS2 rewrites /pricing into a Windows path before Node
  sees it). Use PowerShell for per-route runs, or run the whole gate. Not a bug
  in the script. Also: `node check.js | tail` masks the exit code — check $? on
  the node process directly, not through a pipe.

Task 6: fix round 1/5 (4 addressed, 1 partial + 2 new; commits 2a71797..6f286b1)
  Addressed: chrome leak, glued phrases + substring ignores, never-built exit,
  check.js coverage (logic extracted to pure compare.js, 11 tests).
  Partial/new, dispatched as fix round 2:
  - CRITICAL: /pricing verdicts are 117 icon cells (no text) + 42 em-dash cells
    (single char, excluded). 159 verdicts / 44 rows with zero coverage at any
    threshold. Asymmetric too: our Icon.astro strips all identifying attributes
    while the DS original emits data-icon={name}.
  - IMPORTANT: multiset tier is blind to a verdict SWAP that preserves counts —
    a table becoming factually wrong produces no signal.
  - IMPORTANT: --require-all summary never increments on the missing branch, so
    "Checked 1, skipped 0" prints above "8 pages lost content".
  Root cause of the first two: no tier understands a table as a table. Fix is a
  table tier keyed by first-cell text (robust to reformatting and reordering),
  plus icon/dash tokenisation to [icon:NAME] and [none].

Task 6: fix round 2/5 (3 addressed, 2 new; commits 6f286b1..ca63e05)
  Addressed: icon/dash tokenisation ([icon:NAME], [none]) recovering all 159
  pricing verdicts; row-keyed table tier catching swaps; --require-all tally.
  Reviewer independently reproduced 117+42=159, confirmed tokenizeIcons cannot
  resurrect stripped content, [none] uses exact equality so "10-15 days"
  survives, and the Icon change was purely additive.
  New, dispatched as round 3:
  - IMPORTANT D: compare.js:92 newByKey is last-write-wins on duplicate row
    names, so a survivor masks a deleted twin. Latent (no duplicates on the
    three real pages today) but Tasks 8/10 add tables.
  - IMPORTANT E: pricing.html has 9 colspan="5" divider rows. Reviewer built the
    realistic Task 8 shape (divider as <h3> outside the table) and ran it: 9
    false failures with zero content lost. Fix: exclude zero-verdict rows from
    missing/changed reporting — a label is not comparable content.
  RULING: no general ignore.json hatch for the table tier. E's targeted fix
    removes non-content from the comparison rather than adding a silencing lever.

Task 6: fix round 3/5 (2 addressed, 0 open; commits ca63e05..cfbfc2e)
  Reviewer rebuilt the negative case from scratch: deleted one divider, converted
  8 to <p>, confirmed the deleted one still caught by tier 2 while the 8 stay
  silent. Also confirmed unique-name precision is preserved and columnCountChanges
  is correctly left unguarded.
Task 6: fix round 4/5 (1 addressed, 0 open; commit a09c62f) — raw NUL byte at
  compare.js offset 2977 made git classify the file as binary permanently,
  blinding every future review of the gate's comparison logic. Intent (NUL as a
  non-colliding join separator) was right; written as a raw byte instead of an
  escape. Now \x00. Controller verified: file reports UTF-8 JavaScript source,
  and no tracked text file carries a stray NUL (only the 5 _ds/*.thumbnail
  binaries, which are legitimately binary).
Task 6: complete (commits 5a465f5..a09c62f, review clean after 4 fix rounds)
  The gate now compares three tiers: prose phrases >=25 chars, short fragments
  2-24 chars as a multiset, and tables row-by-row keyed by feature name.

Task 7: implementer held the commit and escalated a real scope conflict rather
  than guessing or self-serving an ignore.json entry. Three buckets, all traced
  to errors in the BRIEF:
  A) Pricing summary (17 phrases) had no slot in the field sequence. RULING
     (design-system author): keep on the home page, verbatim, on paper. Dropping
     a ranking section from the highest-authority page is a content decision;
     the old repo wins on copy, and Landing.jsx is a visual reference only.
  B) Contact section (2 phrases, 8 fragments). RULING (author): keep the section
     copy verbatim, drop the 5-field form. Its action is mailto: with
     method=POST — effectively non-functional; shipping a form that silently
     swallows messages is worse than none. The five field labels + submit text
     are the ONLY sanctioned ignore.json entries in the project so far.
  C) CONTROLLER ERROR: my skeleton's six-domain DOMAINS array came from
     Landing.jsx and its blurbs are INVENTED — they appear in neither the old
     page nor llms.txt. The skeleton then told the implementer to fill each tile
     with "the matching blurb from the old page" for tiles with no match, which
     forced chip tags to be prose-ified. The old page has FOUR real pillars
     (Inventory & Production / BOMs & Costing / Warehouse & Stock Movement /
     Team & Integrations) with real copy and literal chip tags. Rebuilt as four
     tiles, six-domain array discarded.
  Integrations strip: keep verbatim as a paper strip (7 named integrations, also
     in llms.txt).
  Comparison table: implementer correctly shipped the old page's real 8 rows
     rather than the reference's 4 fabricated ones, and flagged the brief line
     that required inventing. Confirmed — invent-nothing always wins.
  Two implementer bug finds kept: <span> cells broke the parity extractor's
     boundary logic; Astro drops whitespace-only text nodes between block
     siblings on separate lines (needs explicit {' '}). The second will bite
     Tasks 8-12.

Task 7: review — spec OK on all 4 rulings (pricing, contact, four pillars, 8-row
  table + "Start free trial" all verified cell-by-cell). Quality: 2 Important.
  Important 1: product-shot eyebrow "Live, not nightly" (Landing.jsx:116) and
    heading "Real-time inventory" are invented. My skeleton hardcoded the eyebrow
    as literal text instead of a {/* verbatim */} marker, so it read as content.
  Important 2: <title>/og:title shipped "Manuva — MRP for Shopify manufacturers"
    (Landing.jsx:74's hero eyebrow) instead of the old page's real title. The
    parity gate does not scan <head>, and no test checks title text. On a re-skin
    for ranking preservation this is the highest-value line on the page.
  Minor (deferred): .site-compare-row uses a literal repeat(4,1fr) — no mv-cols-*
    expresses "one wide column plus N equal", single use. Literal → glyph where
    the old page used an SVG arrow. Both accepted.
  Process note: the report's narrated data-fold order did not match dist/. Rule
    still held. Reporting should re-read the artifact, not reconstruct from memory.

REAL <title> VALUES FOR TASKS 8-12 — carry verbatim, never invent:
  /            Manuva — Manufacturing operations, finally simple
  /features    Features — Manuva
  /pricing     Pricing — Manuva
  /about       About Manuva — Manufacturing Operations Software
  /alternatives/katana   Katana Alternative for Shopify Manufacturers — Manuva
  /alternatives/mrpeasy  MRPeasy Alternative — Flat-Rate MRP for Shopify Manufacturers | Manuva
  /privacy     Privacy Policy — Manuva
  /terms       Terms of Service — Manuva
  Each page's meta description and og:* must likewise come from the old page's
  own <head>, not from Landing.jsx or invention. The gate cannot see any of it.

Task 7: fix round 1/5 (3 addressed, 0 open; commits 4625300..a7637fb)
  Re-reviewer verified from the built artifact: title/og:title byte-match the old
  page, meta description character-for-character identical, Tile's headingLevel
  defaults to div so all other usages are byte-identical, six h3s are the four
  pillars plus two showcase headings, no skipped levels.
Task 7: complete (commits a09c62f..a7637fb, review clean after 1 fix round)
  / is at 64/64 phrases, 60/60 fragments, 0 rows. ignore.json holds only the six
  authorised contact-form entries.

Task 8: implemented, 98/98 tests, /pricing parity clean first time — 68/68
  phrases, 218/218 fragments, 53/53 TABLE ROWS. The table tier built in Task 6
  fix rounds 2-3 did its job on the artifact it was designed for.
  Three concerns escalated rather than decided. Rulings:
  1) Old Enterprise CTA href="/contact" is a BROKEN LINK on the live site (no
     contact.html, absent from sitemap), while the same page's nav uses
     index.html#contact. Ruled: point at /#contact, matching the working
     convention and landing on the home page's real contact section. Fixes a
     pre-existing 404 rather than porting it.
  2) The old page's entire mobile matrix treatment was a note saying "Open this
     page on desktop". The new .mv-matrix-cards fallback solves that problem, so
     the sentence is obsolete, not lost. SECOND sanctioned ignore.json entry.
  3) CtaBand heading was assembled from real facts rather than quoted. RULE SET
     for all remaining pages: CtaBand is a structural element the old pages
     mostly lack, so something must fill it — but it must be a sentence that
     already exists on that page, quoted exactly. Never assembled. If no
     suitable sentence exists, escalate. Task 7's home CtaBand to be checked
     against the same rule.

Task 8: review — spec OK on all 3 rulings, quality OK. 0 Critical, 0 Important,
  3 Minor. Reviewer audited ALL 43 matrix rows x 9 categories x 4 columns cell by
  cell (not a sample): every verdict exact, no swapped columns, no drift. Card
  fallback cross-checked against source independently of the KEEP-IN-SYNC comment.
  Reviewer raised then RETRACTED a CtaBand overflow finding after re-testing with
  getBoundingClientRect — the first screenshots were a font-load timing artifact.
  Minors, being fixed now rather than deferred because two live in files that
  govern the six remaining content tasks:
  1) ignore.json:2 _comment still claims substring matching; false since Task 6
     made it exact-match. A trap in the project's only escape hatch.
  2) site.css:631 literal repeat(2,1fr) is CORRECT (mv-cols-2 collapses at the
     same <=720px where .mv-matrix-cards is visible, so the utility would force
     permanent single-column) but undocumented, against local convention.
  3) pricing.test.ts test 8 is misnamed — claims to check 43 rows, only asserts
     9 category labels. Would pass against a half-empty matrix.
  Inherited gap noted, not in scope: icon-only verdict cells are aria-hidden with
  no text alternative — byte-identical to the old page's own markup.

Task 8: minors round (commit 78a1018) — ignore.json _comment corrected to exact-
  match semantics with a stale-entry warning; repeat(2,1fr) deviation documented
  in place; test 8 renamed and strengthened to use extractTables() and assert the
  exact 53-row count plus two specific verdict tuples.
Task 8: complete (commits a7637fb..78a1018, review clean, 3 minors fixed)
  /pricing: 68 phrases, 218 fragments, 53 table rows. 2 authorised ignore entries.

CARRY INTO TASK 9: the plan's /features field sequence calls for a "six-tile
  domain grid". That grid's content in the plan came from Landing.jsx's DOMAINS
  array, which Task 7 established is INVENTED — the blurbs appear in neither the
  old site nor llms.txt. Do not rebuild it from those blurbs. Either source tiles
  from the features page's own 10 section headings, or drop the grid.

Task 9: implemented, held for rulings rather than committing. 102/102 tests.
  /features clean except one synthetic icon token. Rulings:
  1) SOURCE BUG CONFIRMED: old features.html uses data-lucide="layout-kanban",
     which exists in NO version of Lucide — verified against all 1865 icons in
     lucide-static 0.544.0. Of 71 distinct icon names on that page it is the only
     broken one; it renders invisible on the live site. Substituted the real
     kanban-square. THIRD authorised ignore.json entry: "[icon:layout-kanban]"
     under /features. Nothing a reader can see is lost.
  2) Six-tile grid replaced with TEN tiles sourced from the old page's own
     jump-nav labels — chrome-stripped on both sides, so zero parity risk, and no
     invention. Approved; good repair of a bad brief.
  3) LIVE DEFECT on the shipped home page: .site-pill-ghost (Task 7) is inert
     because Button writes its style inline and an external class cannot win.
     The hero's "Book a demo" renders identically to "Start free trial". Fix
     dispatched: give Pill a `ghost` prop composing into the inline style string,
     same channel as `field`; drop the dead class; no !important. Test to pin it,
     same class of regression as the Task 5 style-merge bug.
  Implementer also found two content-loss bugs: Astro whitespace-drop between
     hero eyebrow and h1, and "Book a demo" having nowhere to land since
     CtaBand's second action is fixed to "Talk to us".

Task 9: review — spec OK, quality FAIL. 2 Critical, 1 Minor. Copy work verified
  excellent: reviewer diffed all 10 sections line by line (74 feature items, 44
  tier badges, 6 differentiators, hero, CTA, head) — all verbatim, counts exact.
  CRITICAL C1: Field.astro:4 destructures only {field, class} with no ...rest, so
    the id prop is silently dropped. Confirmed in dist: lot-tracking and costing
    ids absent while the grid's href="#lot-tracking"/"#costing" tiles exist. Two
    of ten nav links dead. Panel.astro already had the spread; Field never did.
    Nothing checks anchor targets — not the tests, not the gate.
  CRITICAL C2: site.css:354-355 set absolute paper inks (--ink-strong /
    --ink-muted) inside <Field>-wrapped sections whose --on-* is #FFFFFF. All 12
    features across the violet and cobalt sections render near-black on saturated
    colour: ~1.4:1 for descriptions at 12px, 3.7-4.0:1 for titles. Breaks the
    design system's central rule (marketing.css:9-10). Third symptom, same cause:
    .site-feat-icon uses --brand-1 = #3A5EFF, byte-identical to --field-cobalt,
    so icons are invisible on the Costing section.
    Fix: inherit from the Field's own ink rather than setting absolute ink.
  Minor M1: site.css:344 literal 1fr 1.1fr undocumented despite the report saying
    otherwise.
  PROCESS: the report asserted two things that the artifact contradicts (the
    comment, and all ten tiles being live links). Flagged to the implementer.

Task 9: fix round 1/5 (C1 + M1 addressed, C2 partial; commits 7a3e85c..a507e80)
  C1 closed: Field.astro now mirrors Panel's ...rest + style merge. New GENERAL
    anchor-integrity test collects every href="#..." and every id and asserts
    coverage, so it catches future regressions, not just these two.
  C2 partial. Reviewer computed sRGB contrast rather than eyeballing:
    feat-title  paper 16.89 | violet 4.60 | cobalt 4.97  (passes 4.5)
    feat-desc   paper  7.06 | violet 2.99 | cobalt 3.34  (FAILS)
    Growth+ badge paper 12.60 | violet 3.89 | cobalt 3.92 (FAILS)
    icon chip   paper 13.17 | violet 4.00 | cobalt 4.06  (passes 3.0 non-text)
    Paper NOT degraded — feat-desc at .72 measures 7.06, slightly better than the
    old --ink-muted. Icon-invisibility fully fixed.
  KEY FINDING: feat-title at FULL-STRENGTH white clears AA by a hair (4.60/4.97),
    so the fields have almost no headroom at 12px. ANY opacity muting on a field
    section fails 4.5:1 at any value. Fix round 2 dispatched: field-aware rules —
    no muting inside [data-fold], darkening (not lightening) badge chip, and
    restore --brand-1 icons on paper (the currentColor switch changed the eight
    paper sections from brand-blue to dark ink, a visual regression vs the old
    page).
  Reviewer confirmed tier-pro/-ent/differentiator correctly left alone:
    --bg-card-2 is #DEDEDA, fully opaque, so field-independent by construction.

DS FEEDBACK for Kasper (add to the MVBOLD-3 list):
  3. --field-violet and --field-cobalt paired with #FFFFFF clear AA at 12px only
     by a hair (4.60 and 4.97 against a 4.5 threshold). The pairings are valid as
     documented, but there is no headroom for secondary/muted text on those
     fields — any opacity step drops below AA. Worth knowing before designing a
     muted text role for field surfaces.

Task 9: fix round 2/5 (C2 addressed; commits a507e80..6a1f832)
  All nine contrast ratios now clear threshold. Controller independently computed
  the two anchors: white on --field-violet #B026FF = 4.60, on --field-cobalt
  #3A5EFF = 4.97 — exact match to implementer and reviewer.
  Growth+ badge fixed by DARKENING the chip (color-mix black 20%) rather than
  lightening: currentColor on a field is already white, so a lightening chip only
  closes the gap with the text. Reviewer re-ran the rejected 14/10/8% lightening
  alternatives and reproduced the failing numbers — "nothing lighter works" holds.
  Implementer self-caught a CSS specificity collision: its [data-fold]
  .site-feat-tier override (0,2,0) clobbered .site-feat-tier-pro (0,1,0), since a
  Pro+ badge carries both classes. Noticed because tier-pro reported the IDENTICAL
  ratio to the base badge instead of its own. Fixed by :not() exclusion, which
  removes the elements from the match rather than fighting specificity.
  Asymmetry confirmed correct: --brand-1 icons restored on paper (4.0-4.15 clears
  the 3:1 non-text bar) but NOT the Growth+ badge, which would fail its 4.5:1
  text bar with the same treatment.
  Caveat recorded: no Enterprise badge exists inside a field section, so the
  :not(.site-feat-tier-ent) half is validated by specificity math and the -pro
  case, not by a live rendered instance.
  Final item dispatched: two regression tests. The CSS-vs-inline / specificity
  seam has now produced THREE defects (inert ghost class, absolute inks in a
  Field, badge specificity collision), none caught by a test, and Tasks 10-12
  will edit the same stylesheet.

Task 9: complete (commits 78a1018..8949634, review clean after 2 fix rounds +
  a test round). 109 tests, 12 files. /features 212 phrases + 130 fragments.
  Final round added a small CSS selector/specificity resolver so cascade outcomes
  can be tested in plain node (no jsdom). Implementer verified both tests have
  teeth by reverting each round-2 fix in the real stylesheet and confirming the
  exact original discrepancy, then restoring byte-clean.

TASK 10 IS THE HIGHEST-RISK IN THE PROJECT. 32KB + 28KB of competitor-intercept
  content that ranks. The brief is explicit: do not thin these pages. If the gate
  reports missing content, MOVE IT — an ignore entry is the wrong answer here and
  is mine to authorise regardless.
REAL head values, carry verbatim:
  /alternatives/katana
    title: Katana Alternative for Shopify Manufacturers — Manuva
    desc:  Looking for a Katana alternative with BOM versioning, flat-rate
           pricing, and real Shopify sync? See how Manuva compares — 14-day free
           trial, no credit card.
  /alternatives/mrpeasy
    title: MRPeasy Alternative — Flat-Rate MRP for Shopify Manufacturers | Manuva
    desc:  MRPeasy alternative built around flat-rate pricing, native Shopify
           webhook sync, and BOM versioning. See how Manuva compares — 14-day
           free trial.

Task 10: review (opus) — spec OK, quality FAIL. 2 Critical, 3 Important, 3 Minor.
  COPY IS FAITHFUL — the headline. Reviewer re-extracted both source and built
  pages independently of the gate AND its ignore list: 0 phrases, 0 short
  fragments missing on either page. Every competitor pricing figure exact, every
  qualifier verbatim ("as of May 2026", "Verify against Katana's current site",
  "We re-check competitor claims quarterly", "at any tier"). All 8 FAQ answers
  real, not reference stubs. Both tables cell-for-cell in source order.
  CRITICAL: verdict CLASS derived by string ternary instead of carried from
    source. katana:194 renders Katana's true "14 days" free trial as .site-alt-no
    (red/--danger) where the source had .yes — a misrepresentation of a
    competitor's true positive on a legally sensitive page. mrpeasy:179 same
    cause: "15 days" .yes->.partial (sharpened), "Per user" .no->.partial
    (softened), and katana's identical Per-user row stays red, so the two pages
    now contradict each other. Gate compares verdict TEXT, so it is structurally
    blind to this. No test asserts classes.
  Contrast rulings from the author:
    - --on-flare white on #FF4D00 = 3.33:1, fails 4.5 at 16px. Near-black
      #141413 on flare = 5.54:1 (controller-verified). RULED: near-black ink on
      flare CTAs site-side; --on-flare goes on the DS list.
    - --ok #12A150 on white = 3.37:1 at 12px, used for every affirmative verdict.
      RULED: verdict text takes --ink-strong; green survives as a non-text cue
      where the 3:1 bar applies. Meaning lives in the words, not the colour.
  IMPORTANT: Base.astro:53-54 emits twitter:title/description unconditionally, so
    / /features /pricing each gained two tags; / and /pricing now carry the long
    meta description where their sources have a shorter Twitter variant. The
    report's "byte-identical" claim was false — second such instance.
  Minors: [data-fold] .site-cta-body opacity override reaches every CtaBand, not
    just this page; mrpeasy delta de-emphasis lost (text intact); price callout
    4.34:1 at 11px is a direct port of the old pattern, accepted.

DS FEEDBACK for Kasper (item 4):
  --on-flare is #FFFFFF on --field-flare #FF4D00 = 3.33:1. Clears the 3:1
  large-text bar but NOT 4.5:1, so flare cannot carry body copy in white.
  #141413 on flare measures 5.54:1 and would pass at every size — the same
  near-black already paired with amber, mint and aqua. handoff.md currently
  groups orange with the blues and violet as taking white ink.

Task 10: fix round 1/5 (6 addressed, 1 NEW Critical; commits 35bf838..d11bcb8)
  All 23 verdict rows verified across BOTH columns programmatically against the
  source markup — no fourth cell silently altered. New test confirmed non-
  circular: reads class attributes off the built HTML via cheerio and asserts
  against a hardcoded map, not against COMPARE_ROWS.
  Flare token override verified in-browser: katana's CTA computes 5.54:1, the
  violet hero on the same page still resolves --on-flare to #FFFFFF, mrpeasy's
  cobalt CTA untouched.
  NEW CRITICAL, introduced by the contrast fix: site.css:559-562 sets
    display:inline-flex on classes that sit directly on <td>. CSS table fixup
    then wraps the two consecutive non-cell siblings in ONE anonymous cell, so
    both comparison tables render 2 columns under a 3-column header. Measured in
    Chrome: katana header at x=21/276/542 but body verdicts at 276 and 345, with
    NOTHING under the "Katana" heading. A reader scanning for the competitor's
    verdict finds a blank column and reads both values as Manuva's — worse than
    the colour bug it replaced. Nothing caught it: all 131 tests assert markup
    and CSS text, none assert layout, and the gate compares extracted text which
    was unchanged. Fix dispatched with a layout assertion.
  Minor fixed now because Tasks 11-12 will trip it: twitter:card is emitted
    unconditionally while title/description are conditional, so a page omitting
    twitterDescription ships a lone card.
  Recorded: the flare override is keyed on data-fold, not on flare itself, so a
    future flare surface that omits data-fold silently keeps white ink at 3.33:1.
    Also --ink-faint computes 4.71:1 where the DS comment claims 4.9:1.

Task 10: fix round 2/5 (2 addressed, 0 open; commits d11bcb8..8aaaac8)
  Re-verified in-browser: katana header 21/314/496 and all 12 body rows at
  21/314/496 with column 3 collapsing to a single x value; mrpeasy 21/299/462
  invariant across all 11 rows (round 1's tell — verdict x varying with the
  Manuva text width — is gone). Competitor columns populated. Marker dot present,
  8x8 + 8px margin, optically centred. mrpeasy seat table 4 cols intact,
  /pricing 229 cells 0 broken and contains zero .site-alt-* at all.
  New display test verified to have teeth by replaying it against d11bcb8 —
  fails exactly where it should. Does not over-reach: only bare class selectors,
  ::before and descendants exempt.
Task 10: complete (commits 8949634..8aaaac8, review clean after 2 fix rounds)
  Both alternatives pages: 96+13 rows and 65+18 rows, ZERO ignore entries.
  Copy verified faithful by independent re-extraction — 0 phrases, 0 fragments
  missing, every competitor figure and qualifier exact.

CARRY INTO TASKS 11-12:
  - twitter:card is now all-or-nothing. The old /about, /privacy and /terms each
    carry one in their source, so those pages MUST pass twitterDescription or
    they ship no card at all — a parity gap against their own sources.
CARRY INTO TASK 14:
  - The CSS display test pins the rule SHAPE that shipped the bug, not the
    invariant. A different route to the same breakage (.site-alt-table td
    {display:block}, an attribute selector, a wrapper that breaks the cell)
    would still pass. Node cannot compute layout. Task 14's browser pass is the
    place for a real rendered-layout assertion — assert every comparison table
    renders as many body columns as its header.

Task 11: complete (commits 8aaaac8..4925621, review CLEAN FIRST PASS — no
  defects at any severity, the first task in the project to do so).
  /about: 35 phrases, 14 fragments, 0 rows, ignore.json untouched.
  Reviewer diffed hero, both prose paragraphs, all 6 principles, all 8 company
  rows and the CTA character-by-character. --field-ink #15314D with --on-ink
  #FFFFFF = ~13.3:1, no contrast concern. data-fold sequence extracted from the
  build: mint -> ink -> flare.
  Judgment call adjudicated: ~160-230 char principle cards on an ink field are
  NOT "long-form copy on a colour field" — the rule targets extended prose and
  tables, and the two genuinely long-form elements on the page (the two-paragraph
  prose and the 8-row company card) correctly stay on paper. features.astro sets
  the precedent.
  Implementer self-caught a real bug pre-commit: omitted mv-cols-2 on the company
  card container so its own gap override never fired and 8 rows would have
  stacked. Invisible to the gate (text-only); caught by re-reading built output.
  Minor observation, not a defect: about.test.ts asserts the "what we build"
  heading but not its two body paragraphs — backstopped by the parity gate.

Task 12: implemented (commit 0c374c2). /privacy 212 phrases/107 fragments/9 rows,
  /terms 218/86/2. Both clean, 0 ignore entries. 158 tests.
  ALL EIGHT ROUTES NOW BUILT — gate reports "Checked 8, skipped 0, missing 0".
  Clause numbering verified: privacy 1-10, terms 1-19, no gaps or repeats, every
  "Section N"/"§N" cross-reference resolves, §15 carve-out confirmed at 6 items.
  No source defects found.
  Implementer caught that the BRIEF's own <header> sketch would be silently
  stripped by CHROME_SELECTORS — used <div class="site-doc-head"> instead.
  RULING: port the old pages' <nav class="toc" aria-label="On this page">. It is
  CONTENT, not chrome — an in-document navigation aid on a 38KB policy and a
  48KB contract, categorically different from site nav. The extractor strips
  every <nav> on both sides, so the gate is structurally blind to its loss; this
  needed a human ruling rather than a green gate.
  GATE LIMITATION worth carrying to Task 14: any legitimate in-page navigation
  inside a <nav> is invisible to parity. The gate can confirm anchors resolve but
  not that expected anchors EXIST.

Task 12: review (opus) — spec OK, quality approved with fixes. 0 Critical,
  2 Important, 4 Minor.
  LEGAL TEXT VERIFIED FAITHFUL, not spot-checked. Three independent extractions:
    block sequence 253/253 privacy + 206/206 terms, zero diff; structural
    (headings/ids/links/rows/cells/list counts/strong-em runs) 187/187 + 158/158;
    and a CASE-SENSITIVE cmp on whitespace-stripped <main> that came back
    BYTE-IDENTICAL on both pages. Clause numbering unshifted (privacy 1-10,
    terms 1-19), every Section N/§N cross-reference resolving, §15 carve-out at
    exactly 6, every list and table count matching. #share label inconsistency
    confirmed as the source's own.
  IMPORTANT 1: scroll-margin-top:88px exists in BOTH source pages and is absent
    everywhere in our build (controller-confirmed). .site-nav is sticky with an
    88px inner, which is what the source compensated for. Measured in-browser:
    after navigating to #aup the h2 sits at viewport top 0 and elementFromPoint
    returns the nav's inner div. All 31 in-page anchors affected. The TOC I ruled
    in as content is worse than absent without it — it appears to work and
    silently scrolls past the target.
  IMPORTANT 2: legal.test.ts does not protect body copy. DEMONSTRATED: reviewer
    stripped every p/li/table/div of clause prose from both built pages and
    re-ran — 17 of 18 tests PASSED. "constrains the measure" only checks the
    string site-doc appears; "names the operating entity" is satisfied by the
    global footer on any page; "keeps its clause numbering" is toMatch(/\b15\b/).
  Minors: carve-out test asserts substrings not length; body copy one step
    smaller than source at both breakpoints (14 vs 15px, and 13 vs 14.5px below
    720 — the mobile step-down was the implementer's addition, and 13px is too
    small for legal prose); .site-doc-toc ol wins only by source order at equal
    specificity; report describes link handling that does not match what shipped.

Task 12: fix round 1/5 (all addressed, 0 open; commits 7692e6d..9c374b9)
  scroll-margin fixed via a shared --nav-h (88px / 64px at <=960), driving both
  the nav height and the offset — better than the literal I asked for, since a
  literal would have missed the 64px mobile nav. Reviewer could not re-measure
  in-browser (Chrome lost loopback permission) but established the result
  deductively from round 1's measured baseline: scroll-margin-top places the
  border-box top exactly N px below the scrollport edge, and the nav has no
  padding or border so its rendered height IS --nav-h. Heading lands FLUSH with
  the nav bottom — zero gap, exactly as the source behaved (88px against an 88px
  nav). CARRY TO TASK 14: re-measure one anchor above and one below 960px.
  Test suite genuinely fixed, verified granularly rather than by the wholesale
  number: removing ONLY terms clause 7's body fails a specific test; removing
  ONLY privacy clause 3's fails two; appending a 7th <li> to §15 fails the count
  assertion. The 12 surviving passes are all legitimately scoped to head,
  headings, ids and TOC — none claims to guard body copy.
  Specificity fixed in BOTH places — the 620px override needed identical
  requalification because a media query adds no specificity on its own.
  --nav-h verified site-only (absent from _ds/), two consumers, .site-doc reaches
  no other route. All 8 routes byte-identical across rebuild.
  Copy fidelity re-verified post-fix: whitespace-stripped <main> still
  BYTE-IDENTICAL to source on both pages.
Task 12: complete (commits 4925621..9c374b9, review clean after 1 fix round)

Task 13: complete (commits 9c374b9..3d62ead, review CLEAN — no findings at any
  severity). 175 tests, gate green 8/8.
  MAJOR SAVE: the brief's schema example was materially incomplete vs the old
  site's own JSON-LD. Implementer read all 8 old pages' actual ld+json and
  implemented that instead per "old repo wins" — recovering BreadcrumbList on 6
  routes, WebSite + fuller Organization on home, and AboutPage on /about, none of
  which my brief mentioned. Controller confirmed @type sets match route for
  route; reviewer then confirmed the VALUES match too (@id, url, name, breadcrumb
  positions, Offer price/currency, ContactPoint, PostalAddress, ImageObject
  dimensions) by diffing source vs schema consts vs dist three ways.
  All 6 binary assets sha256-match source. robots/_redirects/llms.txt diff empty.
  sitemap differs only in lastmod, 8 entries. netlify.toml has no /*/ rule.
  FAQ nodes built from the same FAQS array feeding <FaqList>, so markup and
  visible content cannot drift.

SOURCE BUGS FOUND, carried verbatim, for Kasper's editorial decision:
  1. /contact is a broken link — the Enterprise CTA on the old pricing page
     points at a route that does not exist (repointed to /#contact here).
  2. features.html uses data-lucide="layout-kanban", a glyph in no version of
     Lucide; renders invisible on the live site.
  3. alternatives/*.html BreadcrumbList middle crumb points at /alternatives,
     which is not a page. Live in structured data today.
  4. katana.html says "four gaps" then lists five.
  5. privacy.html's #share TOC label omits "your" vs its own h2.

Task 14: implemented (commit 9b18938). 175 unit + parity --require-all 8/8 + 88
  e2e, all green together.
  FOUR REAL DEFECTS the e2e suite caught that 13 tasks of unit tests and reviews
  did not:
   - a nav breakpoint rule that NEVER hid the desktop links below 960px. Shipped
     in Task 4, passed its review, survived nine tasks — because every test
     asserted the classes were PRESENT, not that they WORKED.
   - a hero-heading horizontal-overflow bug.
   - a missing mobile treatment for the nav CTA.
   - ~20 real axe contrast violations across 7 of 8 routes.
  BLOCKING 1 — FONT GATE: controller confirmed _ds/tokens/fonts.css still
    imports https://fonts.googleapis.com and fonts-selfhost.css does not exist.
    4 requests/page leave the origin. Site must not ship.
  BLOCKING 2 — reclassified by controller: /#compare is OUR REGRESSION, not a
    content decision. The old index.html carries id="compare" on its
    "Why Manuva / Built for the floor, not for the demo" section; the old
    alternatives pages link to /#compare and it resolved. Our home page has the
    same section but never got the id, so the faithfully-carried hrefs broke.
    One-line fix dispatched, plus extending the anchor test to CROSS-PAGE
    anchors (href="/route#id"), which the current test does not cover — which is
    why this landed in a report instead of failing a suite.

FINAL WHOLE-BRANCH REVIEW (opus) — not shippable yet. 1 Critical, 2 Important,
  7 Minor. All deferred minors from 14 tasks triaged: EVERY ONE SHIPS AS-IS,
  none blocks merge. Two were found already closed (T1 skip-link now covered by
  a11y.spec.ts:67; T10 delta de-emphasis fixed at site.css:776).
  Reassurance verified independently of the gate, its ignore list and the
  reports: both competitor tables exact cell for cell INCLUDING verdict classes;
  MRPeasy seat table byte-identical with every delta; a REVERSE comparison
  (new->old, which the gate never does) found no body-copy loss on any route;
  /privacy and /terms 0/212 and 0/218 unmatched.
  CRITICAL: CtaBand.astro:15 hardcodes "Talk to us" — a phrase appearing ZERO
    times in any source page (controller-confirmed across all six). It displaced
    "Book a demo" -> /#contact, which every old page's closing CTA carried.
    Ships on 6 routes; content lost on 4.
    WHY THE GATE WAS BLIND, and it generalises: the extractor renders the old CTA
    band as one phrase, "Start free trial Book a demo". The phrase tier asks only
    newText.includes(phrase) across the WHOLE document — presence, never count,
    never position. Each new page carries that same two-word run in its HERO, so
    the check passed while the CTA band's second action was replaced by invented
    copy. ANY SOURCE PHRASE OCCURRING TWICE CAN LOSE ONE OCCURRENCE WITH NO
    SIGNAL. The short-fragment tier is count-based; the phrase tier is not.
  IMPORTANT: --space-14 is UNDEFINED (DS scale is 1,2,3,4,5,6,8,10,12,16,20,24,
    32) yet referenced at site.css:552, :692, :807. Each declaration is invalid
    at computed-value time. Measured 0px gaps: the /features BOMs image butts
    against its text; every .site-alt-group divider on BOTH alternatives pages
    sits flush against the preceding paragraph.
  IMPORTANT: five head tags dropped on all 8 routes — og:site_name,
    og:image:width/height/alt, twitter:image — plus favicon-16 never linked
    though it ships and a test asserts its presence. Written in Task 1, never
    revisited; the gate never reads <head>.
  RATIFIED by the author: nav drops Contact in favour of About. Contact remains
    reachable via footer mailto on every page and the CTA band on six.
  One fix wave dispatched with all of the above.

FINAL FIX WAVE re-review: all 9 findings ADDRESSED. SHIPPABLE, blocked only by
  the accepted font gate. Reviewer verified the CTA structure against each
  source independently: per-route "Book a demo" counts 1/1/0/1/1/1/0/0 match
  source exactly. Removing four heroes' buttons lost nothing — those source
  heroes contain zero <a>/<button>; the buttons moved FROM a place the source
  never had them TO the place the source does. --space-14 replacements measured
  in Chrome: 48px, 64/64, 48/48, all previously 0. Head tags byte-match source
  on all 8 routes. .site-pricing-* properly scoped (both blocks survive, proven
  by the two instances now resolving to different computed values). Competitor
  tables re-verified exact after the edits. Reverse-parity 34 -> 28 unmatched,
  the six removed being exactly the "Start free trialTalk to us" strings.
PARKED (non-load-bearing, no second fix wave per process):
  - three dead CSS rules left by the hero-button removal: site.css:513, :687,
    :847 (.site-features-hero-actions, .site-alt-hero-actions,
    .site-about-hero-actions). Zero runtime effect.
  - responsive.spec.ts:112 counts total <table> elements (7) and asserts >=5,
    not the number of routes. Has teeth for the case that matters (losing both
    alternatives tables fails it) but the name overstates it.
