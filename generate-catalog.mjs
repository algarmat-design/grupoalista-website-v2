/**
 * generate-catalog.mjs
 *
 * Reads all xlsx files from ../alista marketing/[category]/ and matches
 * each data row to its corresponding row_N_Product-image-photo_Image.jpg.
 *
 * Outputs: assets/js/marketing-catalog.js
 *
 * Usage: node generate-catalog.mjs
 */

import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_BASE = path.resolve(__dirname, '../alista marketing');
const OUT_FILE = path.join(__dirname, 'assets/js/marketing-catalog.js');

// Category manifest: folder name → { slug, label, icon }
const CATEGORY_MAP = [
  { folder: 'antiestress',    slug: 'antiestress',    label: 'Anti-Estrés',        icon: '🧸' },
  { folder: 'articulos viaje',slug: 'articulos-viaje',label: 'Artículos de Viaje', icon: '✈️' },
  { folder: 'bar',            slug: 'bar',            label: 'Bar',                icon: '🍸' },
  { folder: 'bebidas',        slug: 'bebidas',        label: 'Bebidas',            icon: '🥤' },
  { folder: 'bolsas',         slug: 'bolsas',         label: 'Bolsas',             icon: '👜' },
  { folder: 'escritura',      slug: 'escritura',      label: 'Escritura',          icon: '✏️' },
  { folder: 'hieleras',       slug: 'hieleras',       label: 'Hieleras',           icon: '🧊' },
  { folder: 'libretas',       slug: 'libretas',       label: 'Libretas & Carpetas',icon: '📓' },
  { folder: 'llaveros',       slug: 'llaveros',       label: 'Llaveros',           icon: '🔑' },
  { folder: 'maletas',        slug: 'maletas',        label: 'Maletas',            icon: '🧳' },
  { folder: 'mochilas',       slug: 'mochilas',       label: 'Mochilas',           icon: '🎒' },
  { folder: 'niños',          slug: 'ninos',          label: 'Niños',              icon: '🧒' },
  { folder: 'oficina',        slug: 'oficina',        label: 'Oficina',            icon: '📎' },
  { folder: 'paraguas',       slug: 'paraguas',       label: 'Paraguas',           icon: '☂️' },
  { folder: 'portafolios',    slug: 'portafolios',    label: 'Portafolios',        icon: '💼' },
  { folder: 'sets regalo',    slug: 'sets-regalo',    label: 'Sets de Regalo',     icon: '🎁' },
  { folder: 'tecnology',      slug: 'tecnology',      label: 'Tecnología',         icon: '💻' },
  { folder: 'textiles',       slug: 'textiles',       label: 'Textiles',           icon: '👕' },
];

// Find the xlsx file in a folder (skip premium/ subfolders)
function findXlsx(folderPath) {
  const files = fs.readdirSync(folderPath)
    .filter(f => f.endsWith('.xlsx'));
  return files.length ? path.join(folderPath, files[0]) : null;
}

// Find image files for a category folder, sorted by row number
function findImages(folderPath) {
  return fs.readdirSync(folderPath)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f) && f.startsWith('row_'))
    .sort((a, b) => {
      const na = parseInt(a.match(/row_(\d+)/)?.[1] ?? '0');
      const nb = parseInt(b.match(/row_(\d+)/)?.[1] ?? '0');
      return na - nb;
    });
}

const allProducts = [];
const categories = [];

for (const cat of CATEGORY_MAP) {
  const folderPath = path.join(SRC_BASE, cat.folder);
  if (!fs.existsSync(folderPath)) {
    console.warn(`⚠️  Folder not found: ${cat.folder}`);
    continue;
  }

  const xlsxPath = findXlsx(folderPath);
  const imageFiles = findImages(folderPath);

  if (!xlsxPath) {
    console.warn(`⚠️  No xlsx found in: ${cat.folder}`);
    continue;
  }

  // Parse xlsx — rows[0] = headers, rows[1..N] = data
  const wb = xlsx.readFile(xlsxPath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(ws, { header: 1 });
  const headers = rows[0] ?? [];

  // Find column indices
  const nameCol = headers.findIndex(h => String(h).toLowerCase().includes('description'));
  const skuCol  = headers.findIndex(h => String(h).toLowerCase().includes('sku'));

  if (nameCol === -1) {
    console.warn(`⚠️  No description column in ${cat.folder}. Headers: ${JSON.stringify(headers)}`);
  }

  // Build a rowIndex → name map from xlsx (1-based row numbers)
  const xData = {};
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.every(v => !v)) continue;
    xData[i] = {
      name: nameCol >= 0 ? String(row[nameCol] ?? '').trim() : '',
      sku:  skuCol  >= 0 ? String(row[skuCol]  ?? '').trim() : '',
    };
  }

  let catCount = 0;

  for (const imgFile of imageFiles) {
    const rowNum = parseInt(imgFile.match(/row_(\d+)/)?.[1] ?? '0');
    const xRow = xData[rowNum] ?? { name: '', sku: '' };

    // Fallback name: "Producto [CAT-ROWNUM]"
    const name = xRow.name || `${cat.label} ${rowNum}`;
    const sku  = xRow.sku  || `${cat.slug.toUpperCase().slice(0, 3)}-${String(rowNum).padStart(3, '0')}`;
    const id   = `${cat.slug.toUpperCase().slice(0, 3)}-${String(rowNum).padStart(3, '0')}`;

    allProducts.push({
      id,
      category: cat.slug,
      name,
      sku,
      img: imgFile,
    });
    catCount++;
  }

  categories.push({ slug: cat.slug, label: cat.label, icon: cat.icon, count: catCount });
  console.log(`✓ ${cat.label}: ${catCount} products`);
}

// ── PREMIUM: collect from all premium/ subfolders ──────────────────────────
{
  const premiumSlug  = 'premium';
  const premiumLabel = 'Premium';
  const premiumIcon  = '⭐';
  const premiumProducts = [];

  for (const cat of CATEGORY_MAP) {
    const premDir = path.join(SRC_BASE, cat.folder, 'premium');
    if (!fs.existsSync(premDir)) continue;

    const xlsxPath  = findXlsx(premDir);
    const imageFiles = findImages(premDir);
    if (imageFiles.length === 0) continue;

    // Parse xlsx if available
    const xData = {};
    if (xlsxPath) {
      const wb = xlsx.readFile(xlsxPath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = xlsx.utils.sheet_to_json(ws, { header: 1 });
      const headers = rows[0] ?? [];
      const nameCol = headers.findIndex(h => String(h).toLowerCase().includes('description'));
      const skuCol  = headers.findIndex(h => String(h).toLowerCase().includes('sku'));
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.every(v => !v)) continue;
        xData[i] = {
          name: nameCol >= 0 ? String(row[nameCol] ?? '').trim() : '',
          sku:  skuCol  >= 0 ? String(row[skuCol]  ?? '').trim() : '',
        };
      }
    }

    for (const imgFile of imageFiles) {
      const rowNum = parseInt(imgFile.match(/row_(\d+)/)?.[1] ?? '0');
      const xRow = xData[rowNum] ?? { name: '', sku: '' };
      const name = xRow.name || `${cat.label} Premium ${rowNum}`;
      const sku  = xRow.sku  || `PRE-${cat.slug.toUpperCase().slice(0, 3)}-${String(rowNum).padStart(3, '0')}`;
      const id   = `PRE-${cat.slug.toUpperCase().slice(0, 3)}-${String(rowNum).padStart(3, '0')}`;

      premiumProducts.push({
        id,
        category: premiumSlug,
        name,
        sku,
        // img path includes origin subcategory to avoid naming conflicts
        img: `${cat.slug}/${imgFile}`,
      });
    }
    console.log(`  ↳ Premium ${cat.label}: ${imageFiles.length} products`);
  }

  if (premiumProducts.length > 0) {
    allProducts.push(...premiumProducts);
    categories.push({ slug: premiumSlug, label: premiumLabel, icon: premiumIcon, count: premiumProducts.length });
    console.log(`✓ Premium (total): ${premiumProducts.length} products`);
  }
}

// Write output JS file
const outDir = path.dirname(OUT_FILE);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const output = `// AUTO-GENERATED by generate-catalog.mjs — do not edit manually
// Generated: ${new Date().toISOString()}
// Total products: ${allProducts.length}

const CATEGORIES = ${JSON.stringify(categories, null, 2)};

const CATALOG = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(OUT_FILE, output, 'utf8');
console.log(`\n✅ Wrote ${allProducts.length} products to ${OUT_FILE}`);
console.log(`   File size: ${(fs.statSync(OUT_FILE).size / 1024).toFixed(1)} KB`);
