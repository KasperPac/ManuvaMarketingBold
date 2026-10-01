import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

// The sign-up path (MVBOLD-31, from the MANUVA-49 critique, UX-3 and UI-12).
// "Start free" and "Sign in" both went to app.manuva.app, which redirects a
// stranger to /login: the site's main CTA asked a new prospect for a password
// they did not have. app.manuva.app/signup is the trial sign-up.

const PAGES = ['index', 'features', 'pricing', 'about', 'alternatives', 'alternatives/katana', 'alternatives/mrpeasy', 'privacy', 'terms'];
const page = (p: string) => readFileSync(`dist/${p}.html`, 'utf8');
const links = (html: string) =>
  [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((m) => ({
    href: (m[1].match(/href="([^"]*)"/) || [])[1] ?? '',
    text: m[2].replace(/<[^>]+>/g, '').replace(/&rarr;|→/g, '').replace(/\s+/g, ' ').trim(),
    attrs: m[1],
  }));

describe('every page', () => {
  for (const p of PAGES) {
    test(`${p}: Start free goes to sign-up, Sign in to the app`, () => {
      const all = links(page(p));
      const start = all.filter((l) => /^Start free/.test(l.text));
      expect(start.length, 'no Start free link at all').toBeGreaterThan(0);
      for (const l of start) expect(l.href, `"${l.text}"`).toBe('https://app.manuva.app/signup');
      for (const l of all.filter((x) => x.text === 'Sign in')) expect(l.href).toBe('https://app.manuva.app');
    });

    test(`${p}: the header offers Start free beside Sign in`, () => {
      const head = page(p).match(/<header class="site-head"[\s\S]*?<\/header>/)?.[0] ?? '';
      expect(links(head).map((l) => l.text)).toEqual(expect.arrayContaining(['Sign in', 'Start free']));
    });
  }
});

test('the phone drawer offers Start free as a button, not a muted link', () => {
  const drawer = page('index').match(/<div id="drawer"[\s\S]*?<\/div>/)?.[0] ?? '';
  const start = links(drawer).find((l) => /^Start free/.test(l.text));
  expect(start, 'no Start free in the drawer').toBeTruthy();
  expect(start!.attrs).toMatch(/class="[^"]*\bpill\b/);
});

test('/features offers Start free in its hero, not only twenty screens down', () => {
  const html = page('features');
  const hero = html.slice(html.indexOf('<section class="hero'), html.indexOf('</section>', html.indexOf('<section class="hero')));
  expect(links(hero).map((l) => l.text)).toContain('Start free');
});

test('a closing band leads with Start free', () => {
  // Home led with Start free and ghosted the secondary; /features did the
  // reverse. One rule: Start free first, filled.
  for (const p of PAGES) {
    const html = page(p);
    for (const m of html.matchAll(/<section class="outro[\s\S]*?<\/section>/g)) {
      const first = links(m[0])[0];
      expect(first?.text, `${p} closing band`).toMatch(/^Start free/);
      expect(first?.attrs, `${p} closing band`).not.toMatch(/\bghost\b/);
    }
  }
});

test('"Book a demo" lands on a way to book one', () => {
  // The old site's Book a demo opened its contact form pre-filled with this
  // message. The contact card now has the same request ready to send, so
  // the label the CTAs promise is the action the card offers.
  const card = page('about').match(/<article class="pcard[^"]*contact-card[\s\S]*?<\/article>/)?.[0] ?? '';
  const demo = links(card).find((l) => l.text === 'Book a demo');
  expect(demo, 'no Book a demo action on the contact card').toBeTruthy();
  expect(demo!.href).toMatch(/^mailto:hello@manuva\.app\?subject=/);
  expect(decodeURIComponent(demo!.href)).toContain("Hi, I'd like to book a demo of Manuva.");
});
