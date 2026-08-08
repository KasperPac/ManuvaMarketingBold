import { chromium } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { resolve, join } from 'node:path';
import { writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';

const [, , input, output, atSeconds = '2'] = process.argv;
if (!input || !output) {
  console.error('usage: node scripts/extract-poster.mjs <input.mp4> <output.jpg> [seconds]');
  process.exit(1);
}

// A page opened via page.setContent() has an about:blank origin, and Chromium
// refuses to load file:// resources into a non-file:// document ("Not allowed
// to load local resource"). Writing a real HTML file and navigating to it via
// page.goto() gives the document a file:// origin, which Chromium does allow
// to reference other file:// resources (verified: works even when the wrapper
// and the video live in different directories).
const wrapperPath = join(tmpdir(), `extract-poster-${Date.now()}.html`);
writeFileSync(
  wrapperPath,
  `<style>html,body{margin:0;background:#000}video{display:block;width:100vw}</style>
   <video id="v" src="${pathToFileURL(resolve(input)).href}" muted></video>`,
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
try {
  await page.goto(pathToFileURL(wrapperPath).href);
  await page.waitForFunction(() => {
    const v = document.querySelector('video');
    return v && v.readyState >= 2;
  }, null, { timeout: 60_000 });
  await page.evaluate((t) => {
    const v = document.querySelector('video');
    return new Promise((res) => { v.onseeked = res; v.currentTime = t; });
  }, Number(atSeconds));
  await page.locator('#v').screenshot({ path: output, type: 'jpeg', quality: 82 });
} finally {
  await browser.close();
  unlinkSync(wrapperPath);
}
console.log(`wrote ${output} from ${input} at ${atSeconds}s`);
