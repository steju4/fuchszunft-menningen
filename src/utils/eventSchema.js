// Erzeugt schema.org/Event JSON-LD aus den Terminen (termineData.js).
// Wird sowohl clientseitig (AktuellesSection) als auch im Build-Skript
// (scripts/generate-static-pages.js) verwendet.

const ORGANIZER = {
  '@type': 'Organization',
  name: 'Grafschaft Fuchsbühl zu Menningen e.V.',
  url: 'https://fuchszunft-menningen.de',
};

const pad = (n) => String(n).padStart(2, '0');

// Deutschland folgt der EU-DST-Regel: Sommerzeit von der letzten
// Sonntag im März bis zur letzten Sonntag im Oktober. Rein kalendarisch
// berechnet (unabhängig von der Zeitzone der Build-Umgebung).
function lastSundayOfMonthUTC(year, monthIndex) {
  const d = new Date(Date.UTC(year, monthIndex + 1, 0));
  d.setUTCDate(d.getUTCDate() - d.getUTCDay());
  return d;
}

function germanUtcOffset(year, month, day) {
  const dstStart = lastSundayOfMonthUTC(year, 2); // März
  const dstEnd = lastSundayOfMonthUTC(year, 9); // Oktober
  const target = new Date(Date.UTC(year, month - 1, day));
  return target >= dstStart && target < dstEnd ? '+02:00' : '+01:00';
}

function parseTerminStartDate(termin) {
  const [tag, monat] = termin.datum.split('.');
  const day = parseInt(tag, 10);
  const month = parseInt(monat, 10);
  const year = parseInt(termin.jahr, 10);

  const zeitMatch = termin.zeit.match(/(\d{1,2}):(\d{2})/);
  const hour = zeitMatch ? parseInt(zeitMatch[1], 10) : 10;
  const minute = zeitMatch ? parseInt(zeitMatch[2], 10) : 0;

  const offset = germanUtcOffset(year, month, day);
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00${offset}`;
}

export function buildTermineEventsJsonLd(termine) {
  return termine.map((termin) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: termin.titel,
    startDate: parseTerminStartDate(termin),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: termin.ort,
    },
    description: termin.desc || termin.titel,
    organizer: ORGANIZER,
  }));
}
