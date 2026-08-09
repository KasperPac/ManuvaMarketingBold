import { test, expect } from '@playwright/test';
import { ALL_ROUTES } from '../../src/site';

for (const route of ALL_ROUTES) {
  test(`${route} responds 200`, async ({ request }) => {
    const res = await request.get(route);
    expect(res.status()).toBe(200);
  });
}

test('no internal link 301s — every href is already canonical', async ({ page, request }) => {
  const seen = new Set<string>();
  for (const route of ALL_ROUTES) {
    await page.goto(route);
    const hrefs = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')!));
    for (const href of hrefs) seen.add(href.split('#')[0]);
  }
  for (const href of [...seen].filter(Boolean)) {
    const res = await request.get(href, { maxRedirects: 0 });
    expect(res.status(), `${href} should not redirect`).toBe(200);
  }
});

test('legacy .html paths still 301 to clean URLs', async ({ request }) => {
  // Netlify applies _redirects; astro preview does not, so this asserts the
  // rule file is present and well-formed rather than the live behaviour.
  const res = await request.get('/_redirects');
  const body = await res.text();
  expect(body).toContain('/features.html');
  expect(body).toContain('301');
});

// Task 14 addition: the parity gate and unit suite both operate on markup and
// text — neither one can tell a live `href="#id"` from a dead one, because
// both sides render the same string either way. Two of ten in-page anchors on
// /features pointed at ids that never existed until a prior round caught it
// by hand; this is the automated net for that whole class of defect, run
// against every route rather than the one page it happened to be found on.
for (const route of ALL_ROUTES) {
  test(`${route} — every in-page "#" anchor resolves to a real id`, async ({ page }) => {
    await page.goto(route);
    const fragments = await page.$$eval('a[href^="#"]', (as) =>
      as.map((a) => a.getAttribute('href')!.slice(1)).filter(Boolean),
    );
    const missing = await page.evaluate(
      (ids) => ids.filter((id) => !document.getElementById(id)),
      fragments,
    );
    expect(missing, `dead in-page anchor(s) on ${route}: ${missing.join(', ')}`).toEqual([]);
  });
}

// Team-lead correction: the in-page check above only ever covers same-page
// `href="#id"`. It missed `/#compare` — both /alternatives/ pages' "Explore
// further" link to a section that carries id="compare" on the *old* home
// page (origin/master:index.html: <section class="compare" id="compare">)
// but never got the id in the reskin, so the anchor landed on / with no
// target. That's the exact same class of defect the in-page check exists
// for, just crossing a page boundary — so it needs the same net. Collects
// every `href="/path#id"` across all 8 routes, then actually navigates to
// each distinct target path once and checks the id is really there, rather
// than assuming a route that 200s also contains every fragment linked at it.
test('every cross-page "/path#id" anchor resolves to a real id on its target route', async ({ page }) => {
  const targets = new Map<string, Set<string>>(); // path -> set of ids
  for (const route of ALL_ROUTES) {
    await page.goto(route);
    const hrefs = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')!));
    for (const href of hrefs) {
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) continue;
      const path = href.slice(0, hashIndex) || '/';
      const id = href.slice(hashIndex + 1);
      if (!id) continue;
      if (!targets.has(path)) targets.set(path, new Set());
      targets.get(path)!.add(id);
    }
  }
  const failures: string[] = [];
  for (const [path, ids] of targets) {
    await page.goto(path);
    const missing = await page.evaluate(
      (wantedIds) => wantedIds.filter((id) => !document.getElementById(id)),
      [...ids],
    );
    for (const id of missing) failures.push(`${path}#${id}`);
  }
  expect(failures, `dead cross-page anchor(s): ${failures.join(', ')}`).toEqual([]);
});

// --- third-party isolation on load ------------------------------------------
//
// Nothing on this site should phone home to a third party before a visitor
// has interacted with it. fonts.googleapis.com/fonts.gstatic.com is the one
// known, currently-live exception — Base.astro still loads Google Fonts
// because _ds/tokens/fonts-selfhost.css (MVBOLD-3) hasn't landed yet — and
// it's reported as a blocking item in task-6-report.md, not silently waved
// through here. Any other cross-origin request on load is a regression this
// suite should catch (e.g. a YouTube facade firing its iframe eagerly
// instead of on click, or an analytics/CDN script sneaking back in).
test.describe('no third-party contact before interaction', () => {
  for (const route of ALL_ROUTES) {
    test(`${route} makes no cross-origin request on load`, async ({ page }) => {
      const external: string[] = [];
      page.on('request', (r) => {
        const url = new URL(r.url());
        if (!['localhost', '127.0.0.1'].includes(url.hostname)) external.push(r.url());
      });
      await page.goto(route, { waitUntil: 'networkidle' });
      // fonts.googleapis.com is the known, accepted gap until fonts-selfhost.css
      // lands (MVBOLD-3). Everything else is a regression.
      const unexpected = external.filter((u) => !/fonts\.(googleapis|gstatic)\.com/.test(u));
      expect(unexpected, `unexpected third-party requests: ${unexpected.join(', ')}`).toEqual([]);
    });
  }
});

// The explainer is a YouTube facade: a static poster and button, with the embed
// created only on click. The property worth protecting is that no request
// reaches YouTube before someone asks for the video — a bare <iframe> in the
// markup would fetch on page load and set cookies for every visitor who never
// pressed play.
//
// This replaces a check on same-origin .mp4 bytes that the self-hosted version
// needed. It could not simply be deleted when the video moved to YouTube: its
// first assertion still passed, trivially, because there is no longer an mp4 to
// fetch. It would have sat there green while asserting nothing.
test('the explainer reaches YouTube only after a click', async ({ page }) => {
  const yt: string[] = [];
  page.on('request', (r) => {
    if (/youtube|ytimg|googlevideo|ggpht/.test(r.url())) yt.push(r.url());
  });

  await page.goto('/', { waitUntil: 'networkidle' });
  expect(yt, 'YouTube was contacted before any interaction').toEqual([]);
  expect(await page.locator('iframe').count(), 'an embed shipped in the static markup').toBe(0);

  await page.locator('.site-video-play').first().click();
  await expect.poll(() => yt.length, { timeout: 10_000 }).toBeGreaterThan(0);
  await expect(page.locator('iframe')).toHaveAttribute(
    'src',
    /youtube-nocookie\.com\/embed\/Vr4rkatHggA/,
  );

  // The player has to fill the frame it replaced. Checking the src alone said
  // nothing about that, and the first version shipped a 900x154 iframe inside a
  // 900x506 frame: `.site-video-el` sets height:auto, which resolves fine for
  // the <video> self mode uses and falls back to the HTML default 150px for an
  // iframe, which has no intrinsic size. Correct URL, correct markup, unusable
  // player.
  const box = await page.locator('iframe').boundingBox();
  const frame = await page.locator('.site-video-frame').boundingBox();
  expect(box, 'iframe has no box').not.toBeNull();
  expect(Math.round(box!.height), 'player does not fill its frame').toBe(Math.round(frame!.height));
  expect(Math.round(box!.width)).toBe(Math.round(frame!.width));
});
