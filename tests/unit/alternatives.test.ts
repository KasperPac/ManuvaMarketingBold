import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { load } from 'cheerio';
import { expect, test } from 'vitest';
import { extractText, extractTables } from '../../scripts/parity/extract.js';

const OLD = 'C:/dev/ManuvaMarketing';
const oldPage = (p: string) =>
  execFileSync('git', ['-C', OLD, 'show', `origin/master:${p}`], { encoding: 'utf8', maxBuffer: 32e6 });

const pages = [
  ['katana', 'alternatives/katana.html', 'dist/alternatives/katana.html'],
  ['mrpeasy', 'alternatives/mrpeasy.html', 'dist/alternatives/mrpeasy.html'],
] as const;

test.each(pages)('%s keeps at least as much content as the source', (_n, oldPath, newPath) => {
  const before = extractText(oldPage(oldPath)).length;
  const after = extractText(readFileSync(newPath, 'utf8')).length;
  expect(after, `content shrank from ${before} to ${after} chars`).toBeGreaterThanOrEqual(before * 0.98);
});

test.each(pages)('%s has no stub FAQ answers', (_n, _o, newPath) => {
  const h = readFileSync(newPath, 'utf8');
  expect(h).not.toMatch(/lorem|TBD|placeholder|coming soon/i);
});

test('the two pages use different hero hues so they do not read as one page', () => {
  const k = readFileSync('dist/alternatives/katana.html', 'utf8');
  const m = readFileSync('dist/alternatives/mrpeasy.html', 'utf8');
  expect(k).toContain('var(--field-violet)');
  expect(m).toContain('var(--field-amber)');
});

test('mrpeasy makes the per-user cost argument', () => {
  // llms.txt: a 10-person team reaches $490/mo on MRPeasy before advanced features.
  const h = readFileSync('dist/alternatives/mrpeasy.html', 'utf8');
  expect(h).toMatch(/\$490/);
});

test('katana names the features Katana does not offer', () => {
  const h = readFileSync('dist/alternatives/katana.html', 'utf8');
  for (const feature of ['yield', 'versioning', 'variance', 'lead-time']) {
    expect(h.toLowerCase(), `missing: ${feature}`).toContain(feature);
  }
});

test('katana carries its own real title and description, not an invented one', () => {
  const h = readFileSync('dist/alternatives/katana.html', 'utf8');
  expect(h).toContain('<title>Katana Alternative for Shopify Manufacturers — Manuva</title>');
  expect(h).toContain(
    'Looking for a Katana alternative with BOM versioning, flat-rate pricing, and real Shopify sync? See how Manuva compares — 14-day free trial, no credit card.',
  );
});

test('mrpeasy carries its own real title and description, not an invented one', () => {
  const h = readFileSync('dist/alternatives/mrpeasy.html', 'utf8');
  expect(h).toContain('<title>MRPeasy Alternative — Flat-Rate MRP for Shopify Manufacturers | Manuva</title>');
  expect(h).toContain(
    'MRPeasy alternative built around flat-rate pricing, native Shopify webhook sync, and BOM versioning. See how Manuva compares — 14-day free trial.',
  );
});

test('both pages state the 14-day, full-Pro, no-credit-card trial', () => {
  for (const p of ['dist/alternatives/katana.html', 'dist/alternatives/mrpeasy.html']) {
    const h = readFileSync(p, 'utf8');
    expect(h).toMatch(/14[\s-]day/i);
    expect(h).toMatch(/no credit card/i);
  }
});

test('katana comparison table keeps all 12 rows with verdicts intact', () => {
  const h = readFileSync('dist/alternatives/katana.html', 'utf8');
  const rows = extractTables(h);
  const byName = new Map(rows.map((r) => [r.name.toLowerCase(), r.verdicts]));
  expect(byName.get('bom versioning with comparison')).toEqual(['Yes', 'No']);
  expect(byName.get('multi-level / nested boms')).toEqual(['Yes', 'Yes']);
  expect(byName.get('pricing model')).toEqual(['Flat per account', 'Per user']);
  // header row + 12 data rows
  expect(rows.length).toBe(13);
});

test('mrpeasy seat-math and comparison tables keep every row with verdicts intact', () => {
  const h = readFileSync('dist/alternatives/mrpeasy.html', 'utf8');
  const rows = extractTables(h);
  const byName = new Map(rows.map((r) => [r.name.toLowerCase(), r.verdicts]));
  // seat-math table: 10-user row is the one llms.txt anchors the $490 claim to.
  expect(byName.get('10 users')?.[0]).toMatch(/\$490/);
  expect(byName.get('native shopify webhook sync')).toEqual(['Yes', 'Batch connector']);
  // header (1) + 5 seat rows + header (1) + 11 feature rows = 18
  expect(rows.length).toBe(18);
});

// Fix round 1 shipped a verdict class derived from matching the verdict
// TEXT (e.g. `=== 'Yes' ? 'site-alt-yes' : 'site-alt-no'`), which silently
// recoloured katana's true "14 days" free-trial fact red (source class="yes")
// and, on mrpeasy, softened "Per user" from red to amber and sharpened
// "15 days" from green to amber — because none of those strings are the
// literal word "Yes"/"No". extractTables() only sees cell TEXT, not CSS
// classes, so that bug produced zero signal there; this asserts the class
// on every single row of both tables against the old page's own markup,
// read directly (not re-derived), so a future ternary-from-text regression
// fails here instead of shipping invisibly again.
function competitorVerdictClasses(html: string, tableAriaLabel: string) {
  const $ = load(html);
  const rows: Record<string, string | undefined> = {};
  $(`table[aria-label="${tableAriaLabel}"] tbody tr`).each((_, tr) => {
    const cells = $(tr).find('td');
    const name = $(cells[0]).text().trim().toLowerCase();
    const competitorClass = $(cells[2])
      .attr('class')
      ?.split(/\s+/)
      .find((c) => c.startsWith('site-alt-'))
      ?.replace('site-alt-', '');
    rows[name] = competitorClass;
  });
  return rows;
}

test('katana verdict colours match the old table exactly, not a text-matching guess', () => {
  const h = readFileSync('dist/alternatives/katana.html', 'utf8');
  const classes = competitorVerdictClasses(h, 'Manuva vs Katana feature comparison');
  // Verbatim from the old page's own class="yes|no|partial" on the Katana
  // column of every one of its 12 rows.
  expect(classes).toEqual({
    'bom versioning with comparison': 'no',
    'yield % per bom line': 'no',
    'multi-level / nested boms': 'yes',
    'capacity planning': 'no',
    'staff costing per production run': 'no',
    'shopify webhook sync (real-time)': 'yes',
    'multi-warehouse + bin locations': 'partial',
    'po variance reporting': 'no',
    'lead-time accuracy by supplier': 'no',
    'financial profitability dashboard': 'no',
    'pricing model': 'no',
    // The regression: Katana's own "14 days" free trial is a true, positive
    // fact about Katana — the old page colours it green, not red.
    'free trial': 'yes',
  });
});

test('mrpeasy verdict colours match the old table exactly, not a text-matching guess', () => {
  const h = readFileSync('dist/alternatives/mrpeasy.html', 'utf8');
  const classes = competitorVerdictClasses(h, 'Manuva vs MRPeasy feature comparison');
  // Verbatim from the old page's own class="yes|no|partial" on the MRPeasy
  // column of every one of its 11 rows.
  expect(classes).toEqual({
    // The regression: "Per user" is a real negative (old page colours it
    // red); "15 days" is a real positive (old page colours it green) — a
    // text-matching ternary got both backwards since neither string is the
    // literal word "Yes"/"No".
    'pricing model': 'no',
    'native shopify webhook sync': 'partial',
    'bom versioning with comparison': 'no',
    'yield % per bom line': 'partial',
    'capacity planning with staff costing': 'partial',
    'po variance reporting': 'no',
    'lead-time accuracy by supplier': 'partial',
    'multi-warehouse + bin locations': 'yes',
    'financial profitability dashboard': 'no',
    'free trial': 'yes',
    'setup time': 'partial',
  });
});

test('the Manuva column is coloured "yes" on every row of both tables', () => {
  for (const [file, label] of [
    ['dist/alternatives/katana.html', 'Manuva vs Katana feature comparison'],
    ['dist/alternatives/mrpeasy.html', 'Manuva vs MRPeasy feature comparison'],
  ] as const) {
    const $ = load(readFileSync(file, 'utf8'));
    const manuvaCells = $(`table[aria-label="${label}"] tbody tr td:nth-child(2)`);
    expect(manuvaCells.length).toBeGreaterThan(0);
    manuvaCells.each((_, td) => {
      expect($(td).attr('class')).toContain('site-alt-yes');
    });
  }
});

test('verdict colour lives on a non-text marker, not the word itself', () => {
  // Design-system ruling: verdict words stay --ink-strong (4.5:1 text AA);
  // the ok/danger/warning colour lives on a decorative ::before dot (WCAG's
  // looser 3:1 non-text bar) instead — --ok on --bg-card measures 3.37:1,
  // which fails 4.5:1 as text colour. CSS lives in a separate compiled
  // stylesheet, not the page HTML (dist/*.html has no <style> for this), so
  // this reads the real source file rather than grepping rendered markup —
  // same reasoning as feat-contrast-cascade.test.ts.
  const css = readFileSync('src/styles/site.css', 'utf8');
  const rule = css.match(/\.site-alt-yes,\s*\.site-alt-no,\s*\.site-alt-partial\s*\{([^}]*)\}/);
  expect(rule, 'verdict base rule not found').toBeTruthy();
  expect(rule![1]).not.toMatch(/color:\s*var\(--(ok|danger|warning)\)/);
  expect(rule![1]).toMatch(/color:\s*var\(--ink-strong\)/);
  for (const [cls, token] of [
    ['site-alt-yes', '--ok'],
    ['site-alt-no', '--danger'],
    ['site-alt-partial', '--warning'],
  ] as const) {
    // Anchored to start-of-line: `.site-alt-partial::before` also appears
    // mid-line inside the shared content/size rule above (the last name in
    // a comma-separated selector list), which has no `background` — an
    // unanchored match picks that block up first and fails on a false
    // negative rather than actually checking the per-colour rule below it.
    const marker = css.match(new RegExp(`^\\.${cls}::before\\s*\\{([^}]*)\\}`, 'm'));
    expect(marker, `${cls}::before own rule not found`).toBeTruthy();
    expect(marker![1]).toMatch(new RegExp(`background:\\s*var\\(${token}\\)`));
  }
});

// Fix round 2 Critical: the marker fix above shipped as `display: inline-flex`
// directly on .site-alt-yes/-no/-partial, which sit on <td> elements — that
// takes the cell out of table layout entirely. Per CSS table fixup, the run
// of now-non-cell siblings collapses into one anonymous cell, so both tables
// rendered two columns under a three-column header: the competitor column
// went visually blank and its verdict ran on under "Manuva" instead — a
// worse misreading than the colour bug this replaced, and invisible to every
// other test here since the DOM/text is unchanged, only layout broke.
// Node can't compute real browser layout, but it can assert the actual
// invariant that matters: no rule targeting these three classes touches
// `display` at all, so <td>'s UA-default `table-cell` is never overridden.
test('verdict classes never override <td> display (would break table column layout)', () => {
  const css = readFileSync('src/styles/site.css', 'utf8');
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  let checked = 0;
  while ((m = ruleRe.exec(noComments))) {
    const selectors = m[1].split(',').map((s) => s.trim());
    const body = m[2];
    // Only the bare .site-alt-yes/-no/-partial selector — the one that
    // targets the <td> itself. The ::before pseudo-element rules legitimately
    // set `display: inline-block` on the marker dot, which isn't the cell.
    if (selectors.some((s) => /^\.site-alt-(yes|no|partial)$/.test(s))) {
      checked++;
      expect(body, `rule "${m[1].trim()}" must not set display`).not.toMatch(/display\s*:/);
    }
  }
  // Sanity check on the scan itself: fails loudly if the selectors ever
  // change shape and this stops finding anything to check.
  expect(checked, 'no site-alt-yes/no/partial rules found to check').toBeGreaterThan(0);
});

test('flare CtaBand ink is overridden to near-black, not the token default white', () => {
  // --on-flare (#FFFFFF) on flare (#FF4D00) measures 3.33:1, below 4.5:1 AA
  // for CtaBand's 16px body text — katana's CTA is on flare. Design-system
  // ruling: override the custom property's cascaded value at
  // [data-fold="flare"] rather than edit the _ds/ token (near-black
  // measures 5.54:1). This also reaches /'s and /features' flare CTAs.
  const css = readFileSync('src/styles/site.css', 'utf8');
  expect(css).toMatch(/\[data-fold="flare"\]\s*\{\s*--on-flare:\s*#141413;?\s*\}/);
  const h = readFileSync('dist/alternatives/katana.html', 'utf8');
  expect(h).toContain('data-fold="flare"');
});

test('mrpeasy seat-table restores the source de-emphasised delta figure as its own element', () => {
  const h = readFileSync('dist/alternatives/mrpeasy.html', 'utf8');
  // Text survives either way (already covered by the table-row test above);
  // this pins that it survives as a SEPARATE, styleable element — a first
  // pass flattened it into one plain-text string, losing the source's own
  // 13px/--ink-faint de-emphasis against the bold full amount.
  expect(h).toMatch(/\$249\/mo\s*<span class="site-alt-delta">−\$241<\/span>/);
  expect(h).toMatch(/\$499\/mo\s*<span class="site-alt-delta">−\$236<\/span>/);
  const css = readFileSync('src/styles/site.css', 'utf8');
  expect(css).toMatch(/\.site-alt-delta\s*\{[^}]*color:\s*var\(--ink-faint\)/);
});

test('no colour field sits behind either comparison table', () => {
  for (const [file, table] of [
    ['dist/alternatives/katana.html', 'BOM versioning with comparison'],
    ['dist/alternatives/mrpeasy.html', 'Native Shopify webhook sync'],
  ]) {
    const h = readFileSync(file, 'utf8');
    const idx = h.indexOf(table);
    const section = h.slice(Math.max(0, idx - 3000), idx);
    expect(section).not.toMatch(/background:var\(--field-(cobalt|flare|amber|violet|mint|aqua|lime)\)/);
  }
});
