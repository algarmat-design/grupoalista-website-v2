/**
 * capture-maps.mjs
 * Downloads static dark map tiles for the 6 port locations used in imports.html.
 * Outputs: assets/images/maps/{location}-map.png (600×200px each)
 * Run: node capture-maps.mjs
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OUT_DIR = path.join(__dirname, 'assets', 'images', 'maps');
fs.mkdirSync(OUT_DIR, { recursive: true });

const LOCATIONS = [
  { id: 'manzanillo',  lat: 19.0514, lng: -104.3154, zoom: 13 },
  { id: 'veracruz',    lat: 19.1738, lng:  -96.1342, zoom: 13 },
  { id: 'guadalajara', lat: 20.6597, lng: -103.3496, zoom: 13 },
  { id: 'cdmx',        lat: 19.4326, lng:  -99.1332, zoom: 12 },
  { id: 'laredo',      lat: 27.4780, lng:  -99.5174, zoom: 13 },
  { id: 'altamira',    lat: 22.4028, lng:  -97.9258, zoom: 13 },
];

const MAP_HTML = (lat, lng, zoom) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { width: 600px; height: 200px; overflow: hidden; }
    .leaflet-control-zoom, .leaflet-control-attribution { display: none !important; }
  </style>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const map = L.map('map', {
      center: [${lat}, ${lng}],
      zoom: ${zoom},
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    const svg = \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20C24 5.373 18.627 0 12 0z" fill="#c07940"/>
      <circle cx="12" cy="12" r="5" fill="#0c1e16"/>
    </svg>\`;
    const iconUrl = 'data:image/svg+xml;base64,' + btoa(svg);
    const icon = L.icon({ iconUrl, iconSize: [24, 32], iconAnchor: [12, 32] });
    L.marker([${lat}, ${lng}], { icon }).addTo(map);

    window._mapReady = false;
    map.on('load', function() { window._mapReady = true; });
    // Tiles load async — signal via tileload event
    let tilesLoaded = 0;
    map.on('tileload', function() {
      tilesLoaded++;
      if (tilesLoaded >= 6) window._mapReady = true;
    });
  </script>
</body>
</html>`;

async function captureMap(browser, loc) {
  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 200, deviceScaleFactor: 2 });
  await page.setContent(MAP_HTML(loc.lat, loc.lng, loc.zoom), { waitUntil: 'networkidle2' });

  // Extra wait for tile rendering
  await page.waitForFunction(() => window._mapReady === true, { timeout: 15000 })
    .catch(() => console.log(`  ⚠️  Tile timeout for ${loc.id} — capturing anyway`));
  await new Promise(r => setTimeout(r, 1500));

  const outPath = path.join(OUT_DIR, `${loc.id}-map.png`);
  await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 600, height: 200 } });
  await page.close();
  console.log(`  ✓  ${loc.id}-map.png`);
}

(async () => {
  console.log('Launching browser…');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Users/alvarogarcia/.cache/puppeteer/chrome/mac_arm-146.0.7680.76/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const loc of LOCATIONS) {
    console.log(`Capturing ${loc.id}…`);
    await captureMap(browser, loc);
  }

  await browser.close();
  console.log('\nDone! Maps saved to assets/images/maps/');
})();
