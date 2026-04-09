import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!existsSync(path.join(__dirname, 'screenshots'))) {
  await mkdir(path.join(__dirname, 'screenshots'));
}

const browser = await puppeteer.launch({
  executablePath: '/Users/alvarogarcia/.cache/puppeteer/chrome/mac_arm-146.0.7680.76/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

// Set exact YouTube banner dimensions
await page.setViewport({ width: 2048, height: 1152, deviceScaleFactor: 1 });

await page.goto('http://localhost:3000/banner.html', { waitUntil: 'networkidle0' });

// Wait for fonts to load
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 500));

const outPath = path.join(__dirname, 'screenshots', 'youtube-banner.png');
await page.screenshot({ path: outPath, fullPage: false, type: 'png' });

console.log(`✓ Banner saved: ${outPath}`);
await browser.close();
