import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Video from '../../src/components/site/Video.astro';

const render = (props: Record<string, unknown>) =>
  AstroContainer.create().then((c) => c.renderToString(Video, { props }));

const BASE = { poster: '/video/explainer-poster.jpg', alt: 'Manuva explainer' };

test('self-hosted mode never preloads the file', async () => {
  const html = await render({ ...BASE, src: '/video/explainer.mp4' });
  expect(html).toContain('preload="none"');
  expect(html).toContain('/video/explainer.mp4');
  expect(html).toContain('poster="/video/explainer-poster.jpg"');
});

test('facade mode contacts YouTube nowhere in the markup', async () => {
  const html = await render({ ...BASE, youtubeId: 'abc123XYZ_-' });
  // The id must be present as data for the click handler, but no attribute value
  // anywhere may reference a youtube host — checking only src/href would miss e.g.
  // a poster="https://img.youtube.com/..." slipping in on some other attribute.
  expect(html).not.toMatch(/<iframe/);
  expect(html).not.toMatch(/="[^"]*youtu[^"]*"/);
  expect(html).toContain('data-youtube-id="abc123XYZ_-"');
});

test('facade mode uses the self-hosted poster, not a YouTube thumbnail', async () => {
  const html = await render({ ...BASE, youtubeId: 'abc123XYZ_-' });
  expect(html).toContain('/video/explainer-poster.jpg');
  expect(html).not.toContain('ytimg');
});

test('still mode renders the poster with no play affordance', async () => {
  const html = await render(BASE);
  expect(html).toContain('/video/explainer-poster.jpg');
  expect(html).not.toMatch(/<video/);
  expect(html).not.toMatch(/data-youtube-id/);
  expect(html).not.toMatch(/aria-label="Play/);
});

test('the play control is a real button with an accessible name', async () => {
  const html = await render({ ...BASE, src: '/video/explainer.mp4', title: 'What is Manuva' });
  expect(html).toMatch(/<button[^>]*aria-label="Play[^"]*What is Manuva/);
});

test('the play button paints last, so nothing covers it', async () => {
  // .site-video-poster, .site-video-el and .site-video-play are all
  // position: absolute; inset: 0 with no z-index or pointer-events anywhere
  // in site.css, so DOM order alone decides both paint order and which
  // element receives clicks — later wins. The button must be last in every
  // mode that has one, or the poster silently swallows every click while
  // keyboard activation (which ignores paint order) keeps working, hiding
  // the bug from anyone testing by tab+enter alone.
  for (const extra of [{ src: '/video/explainer.mp4' }, { youtubeId: 'abc123XYZ_-' }]) {
    const html = await render({ ...BASE, ...extra });
    const btnIndex = html.indexOf('class="site-video-play"');
    const posterIndex = html.indexOf('class="site-video-poster"');
    expect(btnIndex, JSON.stringify(extra)).toBeGreaterThan(-1);
    expect(btnIndex, JSON.stringify(extra)).toBeGreaterThan(posterIndex);
    if ('src' in extra) {
      const videoIndex = html.indexOf('class="site-video-el"');
      expect(btnIndex, JSON.stringify(extra)).toBeGreaterThan(videoIndex);
    }
  }
});

test('the poster carries the caller alt text in every mode', async () => {
  for (const extra of [{}, { src: '/v.mp4' }, { youtubeId: 'abc' }]) {
    const html = await render({ ...BASE, ...extra });
    expect(html, JSON.stringify(extra)).toContain('alt="Manuva explainer"');
  }
});

test('supplying both src and youtubeId fails loudly rather than picking one', async () => {
  await expect(render({ ...BASE, src: '/v.mp4', youtubeId: 'abc' }))
    .rejects.toThrow(/both/i);
});
