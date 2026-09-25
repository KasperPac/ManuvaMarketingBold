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

// These two read the old repo directly. It is not checked out on every
// machine, and a hard failure there says "content shrank" when the truth is
// "the source is not here" — which is how a real regression gets ignored.
const OLD_PRESENT = (() => {
  try { execFileSync('git', ['-C', OLD, 'rev-parse', '--git-dir'], { stdio: 'ignore' }); return true; }
  catch { return false; }
})();

test.skipIf(!OLD_PRESENT).each(pages)('%s keeps at least as much content as the source', (_n, oldPath, newPath) => {
  const before = extractText(oldPage(oldPath)).length;
  const after = extractText(readFileSync(newPath, 'utf8')).length;
  expect(after, `content shrank from ${before} to ${after} chars`).toBeGreaterThanOrEqual(before * 0.98);
});

test.each(pages)('%s has no stub FAQ answers', (_n, _o, newPath) => {
  const h = readFileSync(newPath, 'utf8');
  expect(h).not.toMatch(/lorem|TBD|placeholder|coming soon/i);
});

test('the two pages use different hero hues so they do not read as one page', () => {
  const hero = (f: string) =>
    (readFileSync(f, 'utf8').match(/<section class="hero mv-field-([a-z]+)"/) ?? [])[1];
  const k = hero('dist/alternatives/katana.html');
  const m = hero('dist/alternatives/mrpeasy.html');
  expect(k, 'katana hero has no field class').toBeTruthy();
  expect(m, 'mrpeasy hero has no field class').toBeTruthy();
  expect(k).not.toEqual(m);
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
    'Looking for a Katana alternative with BOM versioning, flat-rate pricing, and real Shopify sync? See how Manuva compares — 30-day free trial, no credit card.',
  );
});

// The title is the one deliberate divergence from this page's own source
// <head>. The old value was "MRPeasy Alternative — Flat-Rate MRP for Shopify
// Manufacturers | Manuva": 70 characters, and the only title of the nine that
// ended in a pipe instead of the em dash every other page uses. Past roughly
// 60 characters a title is truncated in search results, so the clause being
// cut was the one doing the work. Shortened to 57 and brought onto the site's
// own separator. The description below is untouched.
test('mrpeasy carries its own real title and description, not an invented one', () => {
  const h = readFileSync('dist/alternatives/mrpeasy.html', 'utf8');
  expect(h).toContain('<title>MRPeasy Alternative for Shopify Manufacturers — Manuva</title>');
  expect(h).toContain(
    'MRPeasy alternative built around flat-rate pricing, native Shopify webhook sync, and BOM versioning. See how Manuva compares — 30-day free trial.',
  );
});

test('both pages state the 30-day, full-Pro, no-credit-card trial', () => {
  for (const p of ['dist/alternatives/katana.html', 'dist/alternatives/mrpeasy.html']) {
    const h = readFileSync(p, 'utf8');
    expect(h).toMatch(/30[\s-]day/i);
    expect(h).toMatch(/no credit card/i);
  }
});

function matrixRows(html: string) {
  const $ = load(html);
  return $('.ctable .r').not('.h').toArray().map((r) => ({
    name: $(r).find('.k').text().trim(),
    verdicts: [$(r).find('.us').text().trim(), $(r).find('.them').text().trim()],
  }));
}

test('katana comparison table keeps all 11 rows with verdicts intact', () => {
  const rows = matrixRows(readFileSync('dist/alternatives/katana.html', 'utf8'));
  const byName = new Map(rows.map((r) => [r.name.toLowerCase(), r.verdicts]));
  expect(byName.get('bom versioning with comparison')).toEqual(['Yes', 'No']);
  // The multi-level / nested BOMs row came out 2026-09-22: product_bom_component
  // references components only, so Manuva has no nested BOMs to claim.
  expect(byName.get('multi-level / nested boms')).toBeUndefined();
  expect(byName.get('pricing model')).toEqual(['Flat per account', 'Per user']);
  expect(rows.length).toBe(11);
});


test('mrpeasy seat-math and comparison tables keep every row with verdicts intact', () => {
  const html = readFileSync('dist/alternatives/mrpeasy.html', 'utf8');
  const $ = load(html);
  const rows = matrixRows(html);
  const byName = new Map(rows.map((r) => [r.name.toLowerCase(), r.verdicts]));
  expect(byName.get('native shopify webhook sync')).toEqual(['Yes', 'Batch connector']);
  expect(rows.length).toBe(11);
  // The seat table is its own block now (.stable), not a second <table>.
  const seat = $('.stable .r').not('.h');
  expect(seat.length, 'seat table rows missing').toBe(5);
  // llms.txt anchors the $490 claim to the 10-user row.
  const ten = seat.toArray().find((r) => $(r).find('.k').text().trim() === '10 users');
  expect(ten, '10-user seat row missing').toBeTruthy();
  expect($(ten!).find('.them').text()).toMatch(/\$490/);
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
function competitorVerdicts(html: string) {
  const $ = load(html);
  const rows: Record<string, string | undefined> = {};
  // The new design renders the matrix as a .ctable grid, not a <table>, and
  // carries the sourced verdict on the competitor cell as data-verdict. The
  // markup changed; what this test is for did not.
  $('.ctable .r').not('.h').each((_, r) => {
    const name = $(r).find('.k').text().trim().toLowerCase();
    if (!name) return;
    rows[name] = $(r).find('.them').attr('data-verdict');
  });
  return rows;
}

test('katana verdict colours match the old table exactly, not a text-matching guess', () => {
  const h = readFileSync('dist/alternatives/katana.html', 'utf8');
  const classes = competitorVerdicts(h);
  // Verbatim from the old page's own class="yes|no|partial" on the Katana
  // column of its rows, less the multi-level / nested BOMs row removed
  // 2026-09-22 (Manuva has no nested BOMs).
  expect(classes).toEqual({
    'bom versioning with comparison': 'no',
    'yield % per bom line': 'no',
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
  const classes = competitorVerdicts(h);
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

test('the Manuva column carries a value on every row of both tables', () => {
  // Was: every Manuva <td> carries class="site-alt-yes". The new design does
  // not colour that column at all — .us is uniform, and the verdict for the
  // competitor is the only thing that varies. What still matters is that no
  // row is missing its Manuva value, which is how a matrix quietly starts
  // claiming less than it should.
  for (const file of ['dist/alternatives/katana.html', 'dist/alternatives/mrpeasy.html']) {
    const $ = load(readFileSync(file, 'utf8'));
    const rows = $('.ctable .r').not('.h');
    expect(rows.length, `${file}: no matrix rows`).toBeGreaterThan(0);
    rows.each((_, r) => {
      const label = $(r).find('.k').text().trim();
      expect($(r).find('.us').text().trim(), `${file}: "${label}" has no Manuva value`).not.toEqual('');
    });
  }
});


test('the verdict is carried by the word, not by colour alone', () => {
  // The old build coloured the verdict and had to move that colour onto a
  // decorative ::before dot to stay off WCAG 1.4.1 and off the 4.5:1 text
  // bar. The new matrix states the verdict in the text itself ("No",
  // "Limited", "Batch connector", "15 days"), and data-verdict only varies
  // the competitor column's emphasis. That is strictly stronger, so this now
  // asserts the text really is the carrier: every verdict cell has words in
  // it, and no rule turns a verdict into a colour-only signal.
  for (const file of ['dist/alternatives/katana.html', 'dist/alternatives/mrpeasy.html']) {
    const $ = load(readFileSync(file, 'utf8'));
    $('.ctable .them[data-verdict]').each((_, el) => {
      expect($(el).text().trim(), `${file}: a verdict cell is empty`).toMatch(/[A-Za-z0-9]/);
    });
  }
  const css = readFileSync('src/styles/site.css', 'utf8');
  for (const v of ['yes', 'no', 'partial']) {
    const needle = `.ctable .them[data-verdict="${v}"]{`;
    const at = css.indexOf(needle);
    expect(at, `no rule for data-verdict="${v}"`).toBeGreaterThan(-1);
    const body = css.slice(at + needle.length, css.indexOf('}', at));
    expect(body, `data-verdict="${v}" sets a colour, making it a colour-only signal`)
      .not.toMatch(/(^|;)\s*color:/);
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
test('verdict styling never sets display on a matrix cell (would break the grid)', () => {
  // Was: .site-alt-yes/-no/-partial sat on <td>, and setting display on them
  // took the cell out of table layout, collapsing three columns into two.
  // .ctable .r is a three-column grid and its cells are grid children, so the
  // same class of defect is still one property away — setting display on a
  // grid child changes how it lays out inside its track.
  const css = readFileSync('src/styles/site.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  let checked = 0;
  while ((m = ruleRe.exec(css))) {
    const selectors = m[1].split(',').map((x) => x.trim());
    if (selectors.some((x) => /^\.ctable \.(k|us|them)(\[[^\]]*\])?$/.test(x))) {
      checked++;
      expect(m[2], `rule "${m[1].trim()}" must not set display`).not.toMatch(/display\s*:/);
    }
  }
  expect(checked, 'no .ctable cell rules found to check').toBeGreaterThan(0);
});


test('flare ink is overridden to near-black, not the token default white', () => {
  // --on-flare (#FFFFFF) on flare (#FF4D00) measures 3.33:1, below 4.5:1 AA.
  // The override used to be scoped to [data-fold="flare"], then to
  // .mv-field-flare — but CtaBand sets its ink inline as var(--on-flare)
  // without either, so neither scope reached it and /about and /alternatives
  // still shipped white on flare. It lives on :root now: the value is wrong
  // wherever it is read. Still to be raised against the design system.
  const css = readFileSync('src/styles/site.css', 'utf8');
  expect(css).toMatch(/:root\s*\{\s*--on-flare:\s*#141413\s*\}/);
});


test('mrpeasy seat-table keeps the source de-emphasised delta figure as its own element', () => {
  // The old markup put the saving in <span class="site-alt-delta">; the new
  // seat table uses <i class="delta">. Either way it has to be a separate
  // element, or "−$241" reads as part of the price rather than the saving.
  const $ = load(readFileSync('dist/alternatives/mrpeasy.html', 'utf8'));
  const deltas = $('.stable .delta').toArray().map((d) => $(d).text().trim());
  expect(deltas).toContain('−$241');
  expect(deltas).toContain('−$976');
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
