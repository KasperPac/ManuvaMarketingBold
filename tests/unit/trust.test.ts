import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

// Trust and speed (MVBOLD-31, from the MANUVA-49 critique: UX-6, UX-10).

const page = (p: string) => readFileSync(`dist/${p}.html`, 'utf8');
const text = (html: string) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

describe('currency is stated where prices are', () => {
  test('the pricing cards say AUD, not only the fine print', () => {
    const cards = page('pricing').match(/<div class="plans[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/)?.[0] ?? page('pricing');
    expect(text(cards)).toMatch(/\$99\s*AUD\/mo/);
  });

  for (const p of ['index', 'pricing']) {
    test(`${p}: the 10-person comparison labels Manuva's AUD and the rival's USD`, () => {
      const t = text(page(p));
      expect(t).toMatch(/\$249\/mo AUD/);
      expect(t).toMatch(/\$490\/mo USD list/);
    });
  }
});

describe('llms.txt says what the site says', () => {
  // It came across unchanged from the old site (MVBOLD-4) and still read 14
  // days, USD, five Starter seats and ~20% off annual. The site's pricing is
  // the repo's latest: 30 days, AUD, three Starter users, about 17%.
  const llms = readFileSync('public/llms.txt', 'utf8');
  test('trial', () => {
    expect(llms).toMatch(/30-day free trial/);
    expect(llms).not.toMatch(/14-day/);
  });
  test('currency and limits', () => {
    expect(llms).toMatch(/Pricing \(AUD, annual billing\)/);
    expect(llms).not.toMatch(/\(USD, annual billing\)/);
    expect(llms).toMatch(/1 location, up to 3 users/);
    expect(llms).not.toMatch(/5 office seats/);
    expect(llms).toMatch(/around 17%/);
  });
  test('the trial link is the sign-up', () => {
    expect(llms).toContain('https://app.manuva.app/signup');
  });
});

test('the font stylesheet is requested from the page head, not discovered inside tokens.css', () => {
  // tokens.css @imports it, so the browser could not ask for it until
  // tokens.css had arrived: one more render-blocking round trip.
  const url = readFileSync('_ds/tokens/fonts.css', 'utf8').match(/@import url\("([^"]+)"\)/)![1];
  const head = page('index').match(/<head>[\s\S]*?<\/head>/)![0];
  expect(head).toMatch(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin/);
  expect(head).toContain(`<link rel="stylesheet" href="${url}"`);
  expect(head.indexOf('fonts.googleapis.com/css2'), 'before tokens.css').toBeLessThan(head.indexOf('/_ds/tokens.css'));
});
