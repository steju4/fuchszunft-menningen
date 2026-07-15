import { describe, it, expect } from 'vitest';
import { escapeAttr, replaceTag, buildHead } from './build-static-page.js';
import { termine } from '../src/data/termineData.js';

// Vereinfachtes, aber strukturell identisches Abbild von dist/index.html -
// genau die Tags, die buildHead per Regex ersetzt.
const FIXTURE_TEMPLATE = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <title>Fuchszunft Menningen e.V.</title>
    <meta name="description" content="Offizielle Website der Fuchszunft Menningen e.V." />
    <meta property="og:title" content="Fuchszunft Menningen e.V." />
    <meta property="og:description" content="Willkommen bei der Fuchszunft Menningen!" />
    <meta property="og:url" content="https://fuchszunft-menningen.de/" />
    <link rel="canonical" href="https://fuchszunft-menningen.de/" />
    <meta name="twitter:title" content="Fuchszunft Menningen e.V." />
    <meta name="twitter:description" content="Offizielle Website der Fuchszunft Menningen e.V." />
  </head>
  <body></body>
</html>`;

describe('escapeAttr', () => {
  it('escaped Sonderzeichen für die Verwendung in HTML-Attributen', () => {
    expect(escapeAttr(`Fuchs & "Narro" <test>`)).toBe('Fuchs &amp; &quot;Narro&quot; &lt;test&gt;');
  });
});

describe('replaceTag', () => {
  it('wirft einen Fehler, wenn das Muster nicht gefunden wird', () => {
    expect(() => replaceTag('<div></div>', /<title>[^<]*<\/title>/, '<title>X</title>', 'title'))
      .toThrow(/title/);
  });
});

describe('buildHead', () => {
  const seo = {
    title: 'Termine | Fuchszunft Menningen',
    desc: 'Aktuelle Termine der Fuchszunft.',
    url: 'https://fuchszunft-menningen.de/termine',
  };

  it('ersetzt Titel, Description sowie OG- und Twitter-Tags mit den routenspezifischen Werten', () => {
    const html = buildHead(FIXTURE_TEMPLATE, 'termine', seo);
    expect(html).toContain('<title>Termine | Fuchszunft Menningen</title>');
    expect(html).toContain('<meta name="description" content="Aktuelle Termine der Fuchszunft." />');
    expect(html).toContain('<meta property="og:title" content="Termine | Fuchszunft Menningen" />');
    expect(html).toContain('<meta name="twitter:title" content="Termine | Fuchszunft Menningen" />');
  });

  it('setzt og:url und Canonical, wenn seo.url gesetzt ist', () => {
    const html = buildHead(FIXTURE_TEMPLATE, 'termine', seo);
    expect(html).toContain('<meta property="og:url" content="https://fuchszunft-menningen.de/termine" />');
    expect(html).toContain('<link rel="canonical" href="https://fuchszunft-menningen.de/termine" />');
  });

  it('lässt og:url und Canonical unverändert, wenn seo.url fehlt (z.B. 404-Seite)', () => {
    const html = buildHead(FIXTURE_TEMPLATE, 'notfound', { ...seo, url: null });
    expect(html).toContain('<meta property="og:url" content="https://fuchszunft-menningen.de/" />');
    expect(html).toContain('<link rel="canonical" href="https://fuchszunft-menningen.de/" />');
  });

  it('fügt bei noindex ein robots-Meta-Tag vor </head> ein', () => {
    const html = buildHead(FIXTURE_TEMPLATE, 'notfound', { ...seo, noindex: true });
    expect(html).toContain('<meta name="robots" content="noindex, follow" />');
  });

  it('fügt kein robots-Meta-Tag ein, wenn noindex nicht gesetzt ist', () => {
    const html = buildHead(FIXTURE_TEMPLATE, 'termine', seo);
    expect(html).not.toContain('name="robots"');
  });

  it('bettet auf der Termine-Seite Event-JSON-LD für alle Termine ein', () => {
    const html = buildHead(FIXTURE_TEMPLATE, 'termine', seo);
    const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
    expect(match).not.toBeNull();
    const events = JSON.parse(match[1]);
    expect(events).toHaveLength(termine.length);
    expect(events[0]['@type']).toBe('Event');
  });

  it('bettet auf anderen Seiten kein Termine-JSON-LD ein', () => {
    const html = buildHead(FIXTURE_TEMPLATE, 'kontakt', seo);
    expect(html).not.toContain('application/ld+json');
  });
});
