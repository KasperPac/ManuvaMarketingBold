import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
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
