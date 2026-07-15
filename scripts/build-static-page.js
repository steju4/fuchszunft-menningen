// Reine Funktionen zum Bauen einer statischen HTML-Seite mit
// routenspezifischen Meta-Tags. Ausgelagert aus generate-static-pages.js,
// damit sie isoliert (ohne Dateisystemzugriff) testbar sind.
import { buildTermineEventsJsonLd } from '../src/utils/eventSchema.js';
import { termine } from '../src/data/termineData.js';

export function escapeAttr(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

// Ersetzt ein bestehendes Tag im Template. Wirft einen Fehler, wenn das
// erwartete Muster nicht gefunden wird - lieber der Build schlägt fehl,
// als dass eine Seite unbemerkt mit falschen/fehlenden Meta-Tags deployt wird.
export function replaceTag(html, regex, replacement, label) {
  if (!regex.test(html)) {
    throw new Error(`generate-static-pages: Muster "${label}" nicht im Template gefunden.`);
  }
  return html.replace(regex, replacement);
}

export function buildHead(template, route, seo) {
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
