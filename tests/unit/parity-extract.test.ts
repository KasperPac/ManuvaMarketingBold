import { expect, test } from 'vitest';
import { extractText, toPhrases } from '../../scripts/parity/extract.js';

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
