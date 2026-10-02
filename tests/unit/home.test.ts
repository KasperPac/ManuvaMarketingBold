import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';
import { DOMAINS } from '../../src/site';

const html = () => readFileSync('dist/index.html', 'utf8');

test('states the trial correctly', () => {
  const h = html();
  expect(h).toMatch(/30[\s-]day/i);
  expect(h).not.toMatch(/14[\s-]day free trial/i);
  expect(h).not.toMatch(/free forever/i);
});

test('the beta-tester offer moved to /pricing rather than being dropped', () => {
  // It was a full aqua band on the home page in a tail that read as crowded.
  // An offer belongs on the pricing page; what must not happen is it leaving
  // the site, which is the mistake this rebuild already made once.
  expect(html(), 'the home page no longer carries it').not.toMatch(/a free month of Pro/i);
  const pricing = readFileSync('dist/pricing.html', 'utf8');
  expect(pricing).toMatch(/a free month of Pro/i);
  expect(pricing).toContain('Shape the roadmap with us');
});


test('ships none of the invented reference figures', () => {
  const h = html();
  for (const invented of ['1,240', '830 factories', '$339,410']) {
    expect(h, `${invented} was invented in the reference layout`).not.toContain(invented);
  }
});

// Superseded by Task 3: this test used to assert the dashboard screenshot's
// presence in the page's second beat. That screenshot moved to /product —
// the section it lived in is now the explainer video band (see the
// ink-band tests below) — so asserting its presence here would directly
// contradict 'the dashboard screenshot has left the home page for /product'.
// The `mv-cell` invariant (never a mocked data table standing in for a real
// screenshot) still holds project-wide, so it's kept rather than dropped.
test('the home page never falls back to a mocked data table', () => {
  expect(html()).not.toContain('mv-cell');
});

test('CTAs point at the app', () => {
  expect(html()).toContain('https://app.manuva.app');
});

test('lime is never used as a text colour', () => {
  const h = html();
  expect(h).not.toMatch(/color:\s*var\(--field-lime\)/);
  expect(h).not.toMatch(/color:\s*#C8FF2E/i);
});

test('the page rotates fields rather than repeating one', () => {
  // Was 'no two adjacent folds share a hue', reading data-fold — which the
  // new build does not emit, so it asserted nothing. Adjacency itself is now
  // field-separation.test.ts's job, and it asserts separation rather than
  // mere difference. What is left for this file is the rotation: a page that
  // reaches for the same field over and over has stopped rotating.
  const fields = [...html().matchAll(/class="[^"]*mv-field-([a-z]+)/g)].map((m) => m[1]);
  expect(fields.length, 'page should declare its fields').toBeGreaterThan(4);
  expect(new Set(fields).size, 'too few distinct fields to read as a rotation').toBeGreaterThan(3);
});


test('the hero says what the room does', () => {
  // "Make it. Track it. Ship it." came from the design handoff. The hero is
  // now Dave's office going from chaos to calm, and the headline is the ad's
  // own end line (MVBOLD-29).
  const h1 = (html().match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  expect(h1).toContain('Less chaos.');
  // The verb rotates (MVBOLD-36, rotate.test.ts); the markup carries "making".
  expect(h1).toMatch(/<span class="hl keep">More <span[^>]*data-rotate="[^"]*"[^>]*>making<\/span>\.<\/span>/);
  expect(h1).not.toContain('Make it.');
});

const daveHero = () => {
  const h = html();
  const start = h.indexOf('class="hero dave mv-field-cobalt"');
  return start < 0 ? '' : h.slice(start, h.indexOf('</section>', start));
};

test('the hero opens on the first frame as a plain, high-priority picture', () => {
  const hero = daveHero();
  expect(hero, 'hero not found').not.toBe('');
  // The calm moment, in seconds of the clip: the highlight and the logo land there.
  expect(hero).toMatch(/data-calm="5\.5"/);
  expect(hero).not.toContain('data-frames');
  expect(hero).toContain('<div class="dave-scene"><picture>');
  expect(hero).toContain('srcset="/hero/dave/p.webp"');
  expect(hero).toMatch(/<img[^>]+src="\/hero\/dave\/l\.webp"[^>]+fetchpriority="high"/);
  expect(hero, 'the LCP image must not be lazy').not.toContain('loading="lazy"');
  // The scrub clip is the script's to add, after `load`: the markup is the
  // still that reduced-motion and no-JS visitors keep.
  expect(hero).not.toContain('<video');
});

test('the hero carries the descriptor, the tagline, Start free and the logo', () => {
  // Preview feedback: the copy and its scrim hid the scene, so the sub-copy
  // and Book a demo live in the band below. The critique (MANUVA-49) then
  // found the first screen never said what Manuva is: the descriptor and
  // Start free are back on the first frame, and fold away as the scrub starts.
  const hero = daveHero();
  // The trade rotates (MVBOLD-36, rotate.test.ts); the markup carries it as written.
  expect(hero.replace(/<[^>]+>/g, '')).toContain('MRP for Shopify manufacturers');
  expect(hero).toMatch(/href="https:\/\/app\.manuva\.app\/signup"[^>]*>Start free</);
  for (const gone of ['Manuva replaces the spreadsheets', 'Book a demo']) {
    expect(hero, `"${gone}" is still in the hero`).not.toContain(gone);
  }
  expect(hero).toMatch(/<div class="dave-logo"><span aria-hidden="true"[^>]*><\/span><\/div>/);
});

test('the band straight after the hero carries its copy and the video', () => {
  // Preview feedback, in two steps: the copy left the scene, then the marquee
  // went ("too distracting") so the page goes straight from the hero to the
  // video. The band holds the hero's own copy, word for word, and the video.
  const h = html();
  const heroEnd = h.indexOf('</section>', h.indexOf('class="hero dave'));
  const band = h.indexOf('<section class="sec hero-intro"');
  const bandEnd = h.indexOf('</section>', band);
  expect(band, 'band not found').toBeGreaterThan(-1);
  expect(h.slice(heroEnd, band).replace(/<!--[\s\S]*?-->/g, '').trim(), 'something sits between the hero and the band')
    .toBe('</section>');
  const body = h.slice(band, bandEnd);
  // The descriptor moved up into the hero's first frame (MVBOLD-31).
  expect(body).toContain('What it does');
  expect(body).toContain('Manuva replaces the spreadsheets and legacy MRP your team is fighting with.');
  expect(body).toMatch(/href="https:\/\/app\.manuva\.app\/signup"[^>]*>Start free</);
  expect(body).toMatch(/href="\/about#contact"[^>]*>Book a demo</);
  expect(body).toContain('data-youtube-id="JXB4FgHRm_Y"');
  expect(body).toContain('See it in 60 seconds');
});

test('the scroll hint is decoration in CSS, not a text node', () => {
  // It is exempt from the full-strength opacity override because its opacity
  // is its fade. feat-contrast-cascade.test.ts allows that only for elements
  // that carry no text, so the word comes from CSS, as the ghost numerals do.
  const hero = daveHero();
  expect(hero).toContain('<span class="dave-hint" aria-hidden="true"></span>');
  const css = readFileSync('src/styles/site.css', 'utf8');
  expect(css).toMatch(/\.dave-hint::before\s*\{\s*content:\s*"Scroll"\s*\}/);
});

test('the pinned stage follows the dynamic viewport, so no field shows under it on phones', () => {
  // Final review, finding 5. At 100svh the pin is the small viewport; once a
  // phone's URL bar collapses the viewport is taller, and the band beneath
  // the pin painted the section's cobalt field across the bottom of the scene.
  const css = readFileSync('src/styles/site.css', 'utf8');
  const pin = css.match(/\.hero\.dave>\.dave-pin\{([^}]*)\}/);
  expect(pin, '.dave-pin rule not found').toBeTruthy();
  expect(pin![1]).toMatch(/height:100dvh/);
});

test('the hero carries no navy', () => {
  // field-separation.test.ts: ink is structure, never a hero. The scrim is
  // --ink-strong, not --field-ink.
  const hero = daveHero();
  expect(hero, 'hero not found').not.toBe('');
  expect(hero).not.toMatch(/--field-ink|--bg-ink|#15314d/i);
  const css = readFileSync('src/styles/site.css', 'utf8');
  const start = css.indexOf('/* The Dave hero');
  const daveCss = start < 0 ? '' : css.slice(start, css.indexOf('/* end Dave hero */'));
  expect(daveCss, 'Dave hero CSS block not found').not.toBe('');
  expect(daveCss).not.toMatch(/--field-ink|--bg-ink|#15314d/i);
  expect(daveCss).toContain('--ink-strong');
});

test('the keyword line survives as the lede, not the h1', () => {
  const h = html();
  expect(h).toContain('Manufacturing operations,');
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  expect(h1).not.toContain('Manufacturing operations');
});

test('title and description are still byte-identical to the old page', () => {
  const h = html();
  expect(h).toContain('<title>Manuva — Manufacturing operations, finally simple</title>');
  expect(h).toContain(
    'Inventory, BOMs, work orders, and stock control — connected, live, and built for the floor. The simpler alternative to legacy MRP for Shopify manufacturers.',
  );
});

test('lime highlights the middle clause as a background, never as text colour', () => {
  const h = html();
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  // The highlight is the .hl class now instead of an inline background. The
  // rule is the same one: lime carries the clause as a background, and never
  // as the text colour.
  expect(h1).toMatch(/<span class="hl[^"]*">/);
  expect(h1).not.toMatch(/color:\s*var\(--field-lime\)/);
  const css = readFileSync('src/styles/site.css', 'utf8');
  const hl = css.match(/^\.hl\{([^}]*)\}/m);
  expect(hl, '.hl rule not found').toBeTruthy();
  expect(hl![1]).toMatch(/background:\s*var\(--field-lime\)/);
  expect(hl![1]).not.toMatch(/(^|;)\s*color:\s*var\(--field-lime\)/);
});

test('the marquee is gone from the home page', () => {
  // Preview feedback (MVBOLD-29): its constant drift under the scrubbing hero
  // was too distracting, so the page goes straight to the video instead.
  expect(html()).not.toMatch(/<div class="marquee"/);
});


test('lime never touches mint again', () => {
  const fields = [...html().matchAll(/class="[^"]*mv-field-([a-z]+)/g)].map((m) => m[1]);
  expect(fields.length, 'page should declare its fields').toBeGreaterThan(4);
  for (let i = 1; i < fields.length; i++) {
    const pair = [fields[i - 1], fields[i]].sort().join('+');
    expect(pair, `greens touching at position ${i}`).not.toBe('lime+mint');
  }
});


// The band was ink until navy came off the marketing site. What the test is
// actually protecting is the position — hero, then marquee, then the explainer
// as the page's second beat — so that survives the hue change; the hue itself
// is now guarded by the no-navy test in field-separation.test.ts, which covers
// every route rather than this one line.
test('the video is the first thing under the hero, ahead of the platform section', () => {
  const h = html();
  const band = h.indexOf('<section class="sec hero-intro"');
  const bandEnd = h.indexOf('</section>', band);
  const video = h.indexOf('data-youtube-id=');
  const lead = h.indexOf('class="sec platform"');
  expect(video, 'the video sits in the band under the hero').toBeGreaterThan(band);
  expect(video, 'the video sits in the band under the hero').toBeLessThan(bandEnd);
  expect(h, 'the line the old section was headed by survives as the caption').toContain('What Manuva actually does');
  expect(lead).toBeGreaterThan(bandEnd);
  expect(h.slice(lead, h.indexOf('</section>', lead)), 'the lead-in no longer carries a video').not.toContain('site-video');
});



// Was "self-hosted and preloads nothing". The explainer moved to YouTube, so
// the property being protected changed shape: there is no longer a file to
// avoid preloading, and what matters instead is that the facade ships as static
// markup and reaches no third party until someone clicks. The load-time half of
// that is asserted per route in tests/e2e/routes.spec.ts, which watches real
// requests; this covers the markup.
test('the explainer is a click-to-load facade, not an embedded player', () => {
  const h = html();
  expect(h).toContain('data-youtube-id="JXB4FgHRm_Y"');
  expect(h, 'an iframe in the static markup would load YouTube on page load').not.toContain('<iframe');
  expect(h, 'the self-hosted asset is gone').not.toContain('/video/explainer.mp4');
  // A scene from the ad (D2), not its end card: the end card is the hero's
  // own calm frame, shown again straight after the scrub (MVBOLD-31).
  expect(h, 'the poster still has to render before any click').toContain('/video/dave-ad-scene.jpg');
});

test('the dashboard screenshot has left the home page for /product', () => {
  expect(html()).not.toContain('screen-dashboard.png');
});

// Was "the other two product shots stay where they are" — they no longer do.
// The amber/violet showcase split that carried them was replaced by the
// highlighted-feature panel (author's call), so all three product shots now
// live on /product and none is on the home page. Asserting absence rather than
// deleting the test: the shots leaving home was a deliberate decision, and a
// silent reappearance here would mean someone restored the old split.
test('no product screenshot remains on the home page', () => {
  const h = html();
  for (const shot of ['screen-dashboard.png', 'screen-variant.png', 'screen-components.png']) {
    expect(h, `${shot} is back on the home page`).not.toContain(shot);
  }
});

// MVBOLD-35 (author's call): the home page is the hero, the intro and video,
// the platform, pricing and the closing band, and nothing else. Getting
// started is not needed until onboarding; the reports highlight (which had
// replaced the showcase split) is /features' to carry; the integrations strip
// waits for an integrations page. Pricing sits on paper: on ink it would
// touch the flare closing band now the strip that separated them is gone.
test('the home page runs hero, intro, platform, pricing, closing band', () => {
  const sections = [...html().matchAll(/<section class="([^"]*)"/g)].map((m) => m[1]);
  expect(sections).toEqual(['hero dave mv-field-cobalt', 'sec hero-intro', 'sec platform', 'sec versus', 'outro mv-field-flare']);
});

test('getting started, the reports highlight and the integrations strip are off the home page', () => {
  const h = html();
  for (const gone of ['Four steps and your floor is live.', 'Operational intelligence', 'Integrates with the tools you already use', 'class="logorow"']) {
    expect(h, gone).not.toContain(gone);
  }
  // #reports was one of the nine areas; the reporting tile still links to
  // the domain that absorbed it.
  expect(h).toContain('/features#reporting');
});

// MVBOLD-34: the six domains were a pinned stage, six full-screen panels
// wiping in over each other for five screens of scroll, a short band after
// the scrubbing hero. Two pinned sequences on one page was too much; the hero
// keeps the motion, and the domains are a static grid in the platform section.
test('the six domains are a static grid of field tiles in the platform section', () => {
  const h = html();
  expect(h, 'no pinned stage').not.toContain('<section class="stage"');
  const start = h.indexOf('<section class="sec platform"');
  expect(start, 'the platform section').toBeGreaterThan(-1);
  const sec = h.slice(start, h.indexOf('</section>', start));
  const tiles = [...sec.matchAll(/<a class="tile mv-field-([a-z]+)" href="\/features#([a-z]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  expect(tiles.map((t) => [t[1], t[2]]), 'one tile per domain, in order, on its own field').toEqual(
    DOMAINS.map((d) => [d.field, d.id]),
  );
  tiles.forEach((t, i) => {
    const d = DOMAINS[i];
    expect(t[3], `${d.name}: its name is a heading under the section's h2`).toMatch(new RegExp(`<h3[^>]*>${d.name}</h3>`));
    expect(t[3], `${d.name}: its line, verbatim`).toContain(d.line);
    expect(t[3]).toContain(`See ${d.name.toLowerCase()}`);
  });
});
