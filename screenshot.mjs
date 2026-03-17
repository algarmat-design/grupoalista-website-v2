/**
 * screenshot.mjs — take a full-page screenshot of localhost
 *
 * Usage:
 *   node screenshot.mjs                          → http://localhost:3000, no label
 *   node screenshot.mjs http://localhost:3000    → explicit URL, no label
 *   node screenshot.mjs http://localhost:3000 hero → saves as screenshot-N-hero.png
 *
 * Screenshots are saved to ./screenshots/ (auto-incremented, never overwritten).
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), 'screenshots');
fs.mkdirSync(outDir, { recursive: true });

// Auto-increment: find next available screenshot-N[-label].png
let n = 1;
while (fs.existsSync(path.join(outDir, filename(n)))) n++;

function filename(n) {
  return label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
}

const outPath = path.join(outDir, filename(n));

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

// Wait a beat for animations to settle
await new Promise(r => setTimeout(r, 800));

await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved → ${outPath}`);
