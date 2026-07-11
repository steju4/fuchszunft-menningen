// Läuft automatisch nach `vite build` (npm-Postbuild-Hook).
//
// Warum: Diese Seite ist eine reine Client-Side-Rendered SPA. Ohne diesen
// Schritt bekommt jede Route (/, /termine, /news, ...) exakt dieselben
// <title>/<meta>-Tags aus index.html, weil React sie erst nach dem Laden
// per JS überschreibt (siehe src/components/SEO.jsx). Bots/Crawler, die
// kein JavaScript ausführen (u.a. WhatsApp-, Facebook-Linkvorschau),
// sehen dadurch für jede Unterseite den Titel/Text der Startseite.
//
// Lösung: Für jede Route wird eine eigene, statische HTML-Datei erzeugt
// (Kopie von dist/index.html mit ausgetauschten Meta-Tags). Das JS-Bundle
// ist für alle Routen identisch, es wird nur der <head> pro Datei ersetzt.
// In vercel.json sorgt "cleanUrls": true dafür, dass z.B. /termine
// automatisch termine.html ausliefert.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PAGE_TABS, getSeoData } from '../src/data/seoData.js';
import { buildTermineEventsJsonLd } from '../src/utils/eventSchema.js';
import { termine } from '../src/data/termineData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('❌ dist/index.html nicht gefunden. Bitte zuerst `vite build` laufen lassen.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

function escapeAttr(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

// Ersetzt ein bestehendes Tag im Template. Wirft einen Fehler, wenn das
// erwartete Muster nicht gefunden wird - lieber der Build schlägt fehl,
// als dass eine Seite unbemerkt mit falschen/fehlenden Meta-Tags deployt wird.
function replaceTag(html, regex, replacement, label) {
  if (!regex.test(html)) {
    throw new Error(`generate-static-pages: Muster "${label}" nicht in dist/index.html gefunden.`);
  }
  return html.replace(regex, replacement);
}

function buildHead(route, seo) {
  let html = template;

  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${escapeAttr(seo.title)}</title>`, 'title');
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeAttr(seo.desc)}" />`, 'description');
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeAttr(seo.title)}" />`, 'og:title');
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeAttr(seo.desc)}" />`, 'og:description');
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`, 'twitter:title');
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeAttr(seo.desc)}" />`, 'twitter:description');

  if (seo.url) {
    html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${escapeAttr(seo.url)}" />`, 'og:url');
    html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${escapeAttr(seo.url)}" />`, 'canonical');
  }

  if (seo.noindex) {
    html = html.replace('</head>', `  <meta name="robots" content="noindex, follow" />\n  </head>`);
  }

  if (route === 'termine') {
    const jsonLd = JSON.stringify(buildTermineEventsJsonLd(termine));
    html = html.replace('</head>', `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`);
  }

  return html;
}

let generated = 0;

for (const route of PAGE_TABS) {
  const seo = getSeoData(route);
  const html = buildHead(route, seo);
  fs.writeFileSync(path.join(distDir, `${route}.html`), html);
  generated++;
}

// Eigene 404-Seite (siehe vercel.json: routes-Fallback auf /404.html).
const notFoundSeo = getSeoData('notfound');
fs.writeFileSync(path.join(distDir, '404.html'), buildHead('notfound', notFoundSeo));
generated++;

console.log(`✅ ${generated} statische Seiten mit routenspezifischen Meta-Tags erzeugt (dist/*.html).`);
