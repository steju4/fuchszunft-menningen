import { describe, it, expect } from 'vitest';
import { buildTermineEventsJsonLd } from './eventSchema.js';

// EU-Sommerzeit 2026 laut Kalenderregel (letzter Sonntag im März/Oktober):
// Beginn 29.03.2026, Ende 25.10.2026 - diese Werte gegen echte Termine
// geprüft, siehe auch die manuelle Verifikation während der Tailwind/Vite-
// Migration in diesem Projekt.
describe('buildTermineEventsJsonLd', () => {
  it('erzeugt für jeden Termin ein schema.org Event mit den Kernfeldern', () => {
    const termine = [
      { datum: '06.01.', jahr: '2026', zeit: '11:00', titel: 'Dreikönigshock', ort: 'Zunftstube' },
    ];
    const [event] = buildTermineEventsJsonLd(termine);

    expect(event['@context']).toBe('https://schema.org');
    expect(event['@type']).toBe('Event');
    expect(event.name).toBe('Dreikönigshock');
    expect(event.location).toEqual({ '@type': 'Place', name: 'Zunftstube' });
    expect(event.eventAttendanceMode).toBe('https://schema.org/OfflineEventAttendanceMode');
    expect(event.eventStatus).toBe('https://schema.org/EventScheduled');
    expect(event.organizer.name).toBe('Grafschaft Fuchsbühl zu Menningen e.V.');
  });

  it('nutzt desc als description, fällt sonst auf titel zurück', () => {
    const [withDesc] = buildTermineEventsJsonLd([
      { datum: '01.01.', jahr: '2026', zeit: '10:00', titel: 'Test', ort: 'X', desc: 'Details hier' },
    ]);
    expect(withDesc.description).toBe('Details hier');

    const [withoutDesc] = buildTermineEventsJsonLd([
      { datum: '01.01.', jahr: '2026', zeit: '10:00', titel: 'Test', ort: 'X' },
    ]);
    expect(withoutDesc.description).toBe('Test');
  });

  it('verwendet die Winterzeit (+01:00) für Termine außerhalb der Sommerzeit', () => {
    const [event] = buildTermineEventsJsonLd([
      { datum: '06.01.', jahr: '2026', zeit: '11:00', titel: 'X', ort: 'Y' },
    ]);
    expect(event.startDate).toBe('2026-01-06T11:00:00+01:00');
  });

  it('verwendet die Sommerzeit (+02:00) für Termine im Sommer', () => {
    const [event] = buildTermineEventsJsonLd([
      { datum: '18.07.', jahr: '2026', zeit: '19:00', titel: 'X', ort: 'Y' },
    ]);
    expect(event.startDate).toBe('2026-07-18T19:00:00+02:00');
  });

  it('trifft den Sommerzeit-Beginn am 29.03.2026 korrekt (bereits +02:00)', () => {
    const [event] = buildTermineEventsJsonLd([
      { datum: '29.03.', jahr: '2026', zeit: '12:00', titel: 'X', ort: 'Y' },
    ]);
    expect(event.startDate).toBe('2026-03-29T12:00:00+02:00');
  });

  it('trifft das Sommerzeit-Ende am 25.10.2026 korrekt (schon wieder +01:00)', () => {
    const [event] = buildTermineEventsJsonLd([
      { datum: '25.10.', jahr: '2026', zeit: '12:00', titel: 'X', ort: 'Y' },
    ]);
    expect(event.startDate).toBe('2026-10-25T12:00:00+01:00');
  });

  it('bleibt am Tag davor (24.10.2026) noch in der Sommerzeit (+02:00)', () => {
    const [event] = buildTermineEventsJsonLd([
      { datum: '24.10.', jahr: '2026', zeit: '12:00', titel: 'X', ort: 'Y' },
    ]);
    expect(event.startDate).toBe('2026-10-24T12:00:00+02:00');
  });

  it('fällt bei ungültigem Zeit-Format auf 10:00 Uhr zurück', () => {
    const [event] = buildTermineEventsJsonLd([
      { datum: '01.01.', jahr: '2026', zeit: 'Tagsüber', titel: 'X', ort: 'Y' },
    ]);
    expect(event.startDate).toBe('2026-01-01T10:00:00+01:00');
  });

  it('behält die Reihenfolge und Anzahl der übergebenen Termine bei', () => {
    const termine = [
      { datum: '01.01.', jahr: '2026', zeit: '10:00', titel: 'Erster', ort: 'A' },
      { datum: '02.01.', jahr: '2026', zeit: '10:00', titel: 'Zweiter', ort: 'B' },
      { datum: '03.01.', jahr: '2026', zeit: '10:00', titel: 'Dritter', ort: 'C' },
    ];
    const events = buildTermineEventsJsonLd(termine);
    expect(events).toHaveLength(3);
    expect(events.map((e) => e.name)).toEqual(['Erster', 'Zweiter', 'Dritter']);
  });
});
