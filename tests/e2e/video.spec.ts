import { test, expect, type Locator, type Page } from '@playwright/test';

// Task 3 fix round: getComputedStyle proves a CSS property resolved to a
// value; it says nothing about whether a visitor's cursor — or eye — would
// actually land on that element. .site-video-poster is position:absolute;
// inset:0; height:100%, sized against .site-video's own content-box height.
// Once a <figcaption> sits in that same box as a normal-flow sibling, the
// figure's content height is video + caption, so the poster (out-of-flow,
// height:100%) stretches over the caption's area too — and paints on top of
// it regardless of DOM order, because CSS2.1's painting order puts
// non-positioned in-flow descendants (the caption) BEFORE positioned
// descendants with z-index:auto (the poster), full stop. DOM-order-decides
// (Task 1's own fix, pinned in video.test.ts) only holds *among* elements
// that are all positioned — it does not help a non-positioned sibling.
async function hitTests(locator: Locator, page: Page, matchClass: string) {
  const box = await locator.boundingBox();
  expect(box, 'target must be visible to hit-test it').not.toBeNull();
  const [x, y] = [box!.x + box!.width / 2, box!.y + box!.height / 2];
  return page.evaluate(
    ([px, py, cls]) => {
      const el = document.elementFromPoint(px as number, py as number);
      return !!el && el.closest(`.${cls}`) !== null;
    },
    [x, y, matchClass],
  );
}

test('the explainer caption and play button are both actually hit-testable in the default, unplayed state', async ({ page }) => {
  await page.goto('/');
  const figure = page.locator('.hero .site-video');
  await figure.scrollIntoViewIfNeeded();

  const captionHit = await hitTests(figure.locator('.site-video-caption'), page, 'site-video-caption');
  expect(captionHit, 'elementFromPoint at the caption\'s own centre should resolve to the caption').toBe(true);

  // Same class of defect Task 1 shipped (the poster swallowing the button's
  // clicks) — checked here too so a future overlay regression can't reopen
  // either half of it.
  const buttonHit = await hitTests(figure.locator('.site-video-play'), page, 'site-video-play');
  expect(buttonHit, 'elementFromPoint at the play button\'s own centre should resolve to the button').toBe(true);
});
