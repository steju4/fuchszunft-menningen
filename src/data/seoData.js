// Zentrale SEO-Daten pro Route.
// Wird sowohl clientseitig (App.jsx/SEO.jsx) als auch im Build-Skript
// (scripts/generate-static-pages.js) importiert, damit beide Seiten
// garantiert dieselben Titel/Beschreibungen ausliefern.

export const BASE_URL = 'https://fuchszunft-menningen.de';

// Alle Routen außer der Startseite (== validTabs im Router von App.jsx)
export const PAGE_TABS = [
  'news',
  'termine',
  'galerie',
  'figuren',
  'geschichte',
  'zunftstube',
  'kontakt',
  'impressum',
  'datenschutz',
];

const seoData = {
  home: {
    title: 'Fuchszunft Menningen e.V.',
    desc: 'Offizielle Website der Fuchszunft Menningen e.V. - Alle Infos zur Fasnet, unseren Figuren und aktuellen Terminen.',
    url: `${BASE_URL}/`,
  },
  news: {
    title: 'News | Fuchszunft Menningen',
    desc: 'Aktuelle Neuigkeiten und Berichte der Fuchszunft Menningen. Bleib auf dem Laufenden über unser Vereinsleben.',
    url: `${BASE_URL}/news`,
  },
  termine: {
    title: 'Termine | Fuchszunft Menningen',
    desc: 'Aktuelle Termine: Alle Umzüge, Veranstaltungen und Termine der Fuchszunft im Überblick.',
    url: `${BASE_URL}/termine`,
  },
  galerie: {
    title: 'Galerie & Videos | Fuchszunft Menningen',
    desc: 'Bilder und Videos der Fuchszunft Menningen. Rückblicke auf Fasnachtsumzüge und Veranstaltungen.',
    url: `${BASE_URL}/galerie`,
  },
  figuren: {
    title: 'Figuren | Fuchszunft Menningen',
    desc: 'Unsere Figuren vorgestellt: Der Fuchs, die Gausmates und alle weiteren Figuren. Alles zu Häs und Geschichte.',
    url: `${BASE_URL}/figuren`,
  },
  geschichte: {
    title: 'Geschichte | Fuchszunft Menningen',
    desc: 'Die Chronik der Fuchszunft Menningen: Von der Gründung bis heute. Erfahre mehr über unsere Wurzeln.',
    url: `${BASE_URL}/geschichte`,
  },
  zunftstube: {
    title: 'Zunftstube | Fuchszunft Menningen',
    desc: 'Die Zunftstube Menningen: Unser Treffpunkt. Infos zu Veranstaltungen und Vermietung.',
    url: `${BASE_URL}/zunftstube`,
  },
  kontakt: {
    title: 'Kontakt | Fuchszunft Menningen',
    desc: 'Kontakt zur Fuchszunft Menningen e.V. - Wir freuen uns auf deine Nachricht.',
    url: `${BASE_URL}/kontakt`,
  },
  impressum: {
    title: 'Impressum | Fuchszunft Menningen',
    desc: 'Impressum und rechtliche Angaben der Fuchszunft Menningen e.V.',
    url: `${BASE_URL}/impressum`,
  },
  datenschutz: {
    title: 'Datenschutz | Fuchszunft Menningen',
    desc: 'Datenschutzerklärung der Fuchszunft Menningen e.V.',
    url: `${BASE_URL}/datenschutz`,
  },
  notfound: {
    title: 'Seite nicht gefunden | Fuchszunft Menningen',
    desc: 'Die aufgerufene Seite existiert nicht oder wurde verschoben.',
    url: null,
    noindex: true,
  },
};

export function getSeoData(tab) {
  return seoData[tab] || seoData.home;
}
