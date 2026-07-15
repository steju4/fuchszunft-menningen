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
import { buildHead } from './build-static-page.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('❌ dist/index.html nicht gefunden. Bitte zuerst `vite build` laufen lassen.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

let generated = 0;

for (const route of PAGE_TABS) {
  const seo = getSeoData(route);
  const html = buildHead(template, route, seo);
  fs.writeFileSync(path.join(distDir, `${route}.html`), html);
  generated++;
}

// Eigene 404-Seite (siehe vercel.json: routes-Fallback auf /404.html).
const notFoundSeo = getSeoData('notfound');
fs.writeFileSync(path.join(distDir, '404.html'), buildHead(template, 'notfound', notFoundSeo));
generated++;

console.log(`✅ ${generated} statische Seiten mit routenspezifischen Meta-Tags erzeugt (dist/*.html).`);
