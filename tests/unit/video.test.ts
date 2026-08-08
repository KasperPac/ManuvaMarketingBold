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
  // The id must be present as data for the click handler, but no request-bearing
  // attribute may reference youtube: no iframe src, no img src, no link href.
  expect(html).not.toMatch(/<iframe/);
  expect(html).not.toMatch(/(src|href)="[^"]*youtu/);
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
