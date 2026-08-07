import { expect, test } from 'vitest';
import { extractText, toPhrases, toShortFragments, extractTables } from '../../scripts/parity/extract.js';

test('prefers main, since seven of eight old pages wrap content in it', () => {
  const html = `<body><header>nav junk</header><main>The real content of the page.</main><footer>footer junk</footer></body>`;
  expect(extractText(html)).toBe('The real content of the page.');
});

test('falls back to body when there is no main, as on the old index.html', () => {
  const html = `<body><header>nav junk</header><section>The real content of the page.</section><footer>footer junk</footer></body>`;
  expect(extractText(html)).toBe('The real content of the page.');
});

test('always strips chrome, scripts and styles from both sides', () => {
  const html = `<body><main>Keep this.<script>var x=1</script><style>.a{color:red}</style><nav>drop</nav></main></body>`;
  expect(extractText(html)).toBe('Keep this.');
});

test('normalises entities, smart quotes and whitespace so formatting is not a diff', () => {
  const html = `<body><main>Manuva’s   “flat” pricing.\n\nUnlimited users.</main></body>`;
  expect(extractText(html)).toBe(`Manuva's "flat" pricing. Unlimited users.`);
});

test('splits into phrases and drops fragments too short to be meaningful', () => {
  const text = 'Flat pricing that never charges per seat. OK. Unlimited users on Growth and above.';
  expect(toPhrases(text)).toEqual([
    'Flat pricing that never charges per seat.',
    'Unlimited users on Growth and above.',
  ]);
});

// --- Fix round: chrome leaked past header/nav/footer, and adjacent blocks glued together ---

test('strips dialog-role overlays like the mobile nav drawer, not just header/nav/footer tags', () => {
  // Mirrors the old index.html exactly: no <main> (falls back to body), and the drawer
  // is a <div class="nav-drawer"> sibling of <nav> — not nested inside it — wrapping an
  // <aside role="dialog" aria-modal="true">. Only the nested <nav> of links inside it
  // was being stripped; the close button and CTA links around it survived into the
  // comparison, gluing onto the start of the real hero copy.
  const html = `<body><header>nav junk</header><div class="nav-drawer"><aside role="dialog" aria-modal="true"><button>Close</button><nav><a href="#">Features</a></nav><a href="#">Start free trial</a></aside></div><section>Real content here that matters.</section><footer>footer junk</footer></body>`;
  expect(extractText(html)).toBe('Real content here that matters.');
});

test('inserts a boundary between adjacent block elements so they do not glue into one run-on string', () => {
  const html = `<body><main><h1>Heading</h1><p>Paragraph text.</p></main></body>`;
  expect(extractText(html)).toBe('Heading | Paragraph text.');
});

test('treats <br> as a boundary too, since headings split by it currently glue with no space at all', () => {
  const html = `<body><main><h1>Operations,<br/>finally simple.</h1></main></body>`;
  expect(extractText(html)).toBe('Operations, | finally simple.');
});

test('inserts a boundary between table cells so a row does not glue into one string', () => {
  const html = `<body><main><table><tr><td>Feature</td><td>Starter</td><td>Growth</td></tr></table></main></body>`;
  expect(extractText(html)).toBe('Feature | Starter | Growth');
});

test('does not leave a trailing boundary marker when a block element is last in its container', () => {
  const html = `<body><main><p>Only paragraph.</p></main></body>`;
  expect(extractText(html)).toBe('Only paragraph.');
});

test('toShortFragments collects the 2-24 character fragments toPhrases drops, for table-cell verdicts like Yes/No', () => {
  const text = 'Feature | Starter | Growth | Pro | Enterprise';
  expect(toShortFragments(text)).toEqual(['Feature', 'Starter', 'Growth', 'Pro', 'Enterprise']);
});

test('toShortFragments still excludes single-character noise like a lone dash', () => {
  const text = 'Custom integrations | - | Yes';
  expect(toShortFragments(text)).toEqual(['Custom integrations', 'Yes']);
});

// --- Fix round 2: icon-only verdict cells were invisible, and tables lost row identity ---

test('extractText tokenizes an old-site data-lucide icon instead of losing it as empty text', () => {
  // The old pricing matrix expresses 117 of its verdicts as an icon with no text at all
  // (<span class="ci"><i data-lucide="check"></i></span>) — previously this contributed
  // nothing to the comparison, so a checkmark that silently disappeared produced no signal.
  const html = `<body><main><p>Native sync <i data-lucide="check"></i> included.</p></main></body>`;
  expect(extractText(html)).toBe('Native sync [icon:check] included.');
});

test('extractText tokenizes the new site\'s data-icon the same way, so both sides compare identically', () => {
  const html = `<body><main><p><svg data-icon="check"></svg></p></main></body>`;
  expect(extractText(html)).toBe('[icon:check]');
});

test('a decorative svg with no data-lucide/data-icon is still stripped as chrome', () => {
  const html = `<body><main><p>Open menu <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/></svg></p></main></body>`;
  expect(extractText(html)).toBe('Open menu');
});

test('extractTables keys each row by its first cell and captures the rest as a verdict tuple', () => {
  const html = `<body><main><table><tr><th>Feature</th><th>Starter</th><th>Growth</th></tr><tr><td>BOM versioning</td><td>No</td><td>Yes</td></tr></table></main></body>`;
  expect(extractTables(html)).toEqual([
    { name: 'Feature', verdicts: ['Starter', 'Growth'] },
    { name: 'BOM versioning', verdicts: ['No', 'Yes'] },
  ]);
});

test('extractTables tokenizes an icon cell so a checkmark verdict is comparable text', () => {
  const html = `<body><main><table><tr><td>Sync</td><td><span class="ci"><i data-lucide="check"></i></span></td></tr></table></main></body>`;
  expect(extractTables(html)).toEqual([{ name: 'Sync', verdicts: ['[icon:check]'] }]);
});

test('extractTables collapses an empty or dash-only cell to [none] instead of dropping the verdict', () => {
  // The old pricing matrix expresses 42 more verdicts as a lone em-dash for "not on this
  // tier". normalise() turns the dash into a single hyphen, which the short-fragment floor
  // (>=2 chars) would otherwise discard, leaving the table one cell short with no trace.
  const html = `<body><main><table><tr><td>API access</td><td><span class="dm">—</span></td><td></td></tr></table></main></body>`;
  expect(extractTables(html)).toEqual([{ name: 'API access', verdicts: ['[none]', '[none]'] }]);
});
