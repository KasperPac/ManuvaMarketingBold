import { readFileSync, readdirSync } from 'node:fs';
import { expect, test } from 'vitest';
import { ALL_ROUTES } from '../../src/site';

// Replacing src/styles/site.css wholesale with the new design's export
// dropped every rule for a set of classes the markup still used. Nothing
// failed — the pages built, the tests passed, the HTML was correct — they
// simply rendered with browser defaults, and each one was found only when
// somebody happened to look at that page:
//
//   .site-video*      the explainer: no 16/9 frame, a player 150px tall
//   .site-*-hero-*    /about and /alternatives: h1 at 28px against 115px
//   .site-doc*        /privacy and /terms: no measure, no gutter, title on the edge
//   .site-matrix*     /pricing: a 43-row table with browser defaults, and its
//                     mobile card fallback rendering unstyled underneath it
//
// A class in the markup with no rule anywhere is the signature. This finds
// them all at once instead of one complaint at a time.

const css = [
  readFileSync('src/styles/site.css', 'utf8'),
  ...readdirSync('_ds/tokens')
    .filter((f) => f.endsWith('.css'))
    .map((f) => readFileSync(`_ds/tokens/${f}`, 'utf8')),
].join('\n');

// Classes that are deliberately styleless: hooks for script or for tests, and
// state attributes' companions. Each needs a reason, not just a name.
const STYLELESS = new Set([
  'mv-wrap',        // layout wrapper from the old build, still on /privacy and
                    // /terms; the gutter lives on .site-doc, which is styled.
]);

const used = new Set<string>();
for (const route of ALL_ROUTES) {
  const file = route === '/' ? 'dist/index.html' : `dist${route}.html`;
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/class="([^"]+)"/g)) {
    for (const c of m[1].split(/\s+/)) {
      if (c.startsWith('site-') || c.startsWith('mv-')) used.add(c);
    }
  }
}

test('every site- and mv- class in the markup has a rule somewhere', () => {
  expect(used.size, 'no classes collected — the pages are not built').toBeGreaterThan(20);
  const orphans = [...used]
    .filter((c) => !STYLELESS.has(c))
    // A class is styled if it appears as a class selector anywhere in the
    // site stylesheet or the design system's tokens.
    .filter((c) => !new RegExp(`\.${c}(?![\w-])`).test(css))
    .sort();
  expect(orphans, `classes used in the markup with no rule anywhere:\n  ${orphans.join('\n  ')}`)
    .toEqual([]);
});
