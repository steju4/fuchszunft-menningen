import { describe, it, expect } from 'vitest';
import { getSeoData, PAGE_TABS, BASE_URL } from './seoData.js';

describe('getSeoData', () => {
  it('liefert Titel, Beschreibung und Canonical-URL für eine bekannte Route', () => {
    const seo = getSeoData('termine');
    expect(seo.title).toBe('Termine | Fuchszunft Menningen');
    expect(seo.desc.length).toBeGreaterThan(0);
    expect(seo.url).toBe(`${BASE_URL}/termine`);
  });

  it('fällt bei unbekannten Routen auf die Startseiten-Daten zurück', () => {
    const seo = getSeoData('irgendein-unbekannter-pfad');
    expect(seo).toEqual(getSeoData('home'));
  });

  it('liefert für die Startseite die Basis-URL mit abschließendem Slash', () => {
    expect(getSeoData('home').url).toBe(`${BASE_URL}/`);
  });

  it('markiert die 404-Seite als noindex und ohne Canonical-URL', () => {
    const seo = getSeoData('notfound');
    expect(seo.noindex).toBe(true);
    expect(seo.url).toBeNull();
  });

  it('hat für jede Route aus PAGE_TABS einen vollständigen SEO-Eintrag', () => {
    for (const tab of PAGE_TABS) {
      const seo = getSeoData(tab);
      expect(seo.title, `Titel fehlt für "${tab}"`).toBeTruthy();
      expect(seo.desc, `Beschreibung fehlt für "${tab}"`).toBeTruthy();
      expect(seo.url, `Canonical-URL fehlt für "${tab}"`).toBe(`${BASE_URL}/${tab}`);
    }
  });
});
