import { test, expect } from '@playwright/test';

// The unit tests assert the toggle is built from real buttons. They cannot
// assert that it DOES anything — and that distinction is the whole reason this
// file exists. The toggle originally shipped as two <span>s with no script
// anywhere on the page: every static check passed, the control looked finished,
// and it did nothing at all until the author clicked it. Only driving it catches
// that class of defect.

const PLANS = { annual: ['$99', '$249', '$499', 'Custom'], monthly: ['$119', '$299', '$599', 'Custom'] };

const prices = (page: import('@playwright/test').Page) =>
  page.locator('.plan .price .num').allTextContents();

test('the billing toggle actually swaps the prices', async ({ page }) => {
  await page.goto('/pricing');

  expect(await prices(page), 'annual is the default render').toEqual(PLANS.annual);

  await page.click('[data-billing="monthly"]');
  expect(await prices(page), 'monthly prices did not appear').toEqual(PLANS.monthly);

  await page.click('[data-billing="annual"]');
  expect(await prices(page), 'annual did not come back').toEqual(PLANS.annual);
});

test('the notes follow the price, so no card contradicts itself', async ({ page }) => {
  await page.goto('/pricing');

  const notes = () => page.locator('.plan .note:not(.monthly)').allTextContents();
  expect((await notes())[0]).toBe('Billed $1,188/yr');

  await page.click('[data-billing="monthly"]');
  expect((await notes())[0], 'note still claims the annual total').toBe('Billed $119/mo');

  // "or $119/mo billed monthly" is the alternative to what is showing. Left up
  // while monthly is selected it would sit directly under $119 offering $119.
  const alt = page.locator('.plan .note.monthly').first();
  await expect(alt, 'the alternative line is still offering the price already shown').toBeHidden();

  // The saving used to be a badge beside the price, which had to come down
  // under monthly or it read as a claim about the monthly price. The design's
  // toggle carries it on the Annual control itself, where it is a reason to
  // pick that option and is never adjacent to a monthly figure — so it stays
  // up in both states, and what is worth asserting is that it labels annual.
  const save = page.locator('.toggle [data-billing="annual"] small');
  await expect(save).toBeVisible();
  await expect(save).toHaveText(/Save 17%/);

  await page.click('[data-billing="annual"]');
  await expect(alt).toBeVisible();
});

test('the toggle is operable by keyboard and reports its state', async ({ page }) => {
  await page.goto('/pricing');

  const annual = page.locator('[data-billing="annual"]');
  const monthly = page.locator('[data-billing="monthly"]');

  await expect(annual).toHaveAttribute('aria-pressed', 'true');
  await expect(monthly).toHaveAttribute('aria-pressed', 'false');

  await monthly.focus();
  await page.keyboard.press('Enter');

  expect(await prices(page), 'Enter did not activate the button').toEqual(PLANS.monthly);
  await expect(monthly).toHaveAttribute('aria-pressed', 'true');
  await expect(annual).toHaveAttribute('aria-pressed', 'false');
});
