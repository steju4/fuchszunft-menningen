import React, { useState, useEffect, useMemo } from 'react';
import { termine } from '../data/termineData';

const Countdown = () => {
  // Helfer-Funktion zum Parsen der Termine
  const parseDate = (t) => {
    const parts = t.datum.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Monate sind 0-basiert
    const year = parseInt(t.jahr, 10);
    const [hours, minutes] = t.zeit ? t.zeit.split(':').map(Number) : [0, 0];
    return new Date(year, month, day, hours, minutes);
  };

  // Nächstes Highlight finden
  const nextHighlight = useMemo(() => {
    const now = new Date();
    // Filtere Events, die ein Highlight sind UND in der Zukunft liegen
    const upcoming = termine
      .map(t => ({ ...t, dateObj: parseDate(t) }))
      .filter(t => t.highlight && t.dateObj > now)
      .sort((a, b) => a.dateObj - b.dateObj);

    return upcoming.length > 0 ? upcoming[0] : null;
  }, []); // Nur beim Mounten berechnen (oder wenn sich termine ändern würde)

  // Wenn kein Highlight mehr da ist dieses Jahr (Fallback)
  const targetDate = nextHighlight 
    ? nextHighlight.dateObj.getTime() 
    : new Date('2026-11-11T11:11:00').getTime(); // Fallback 11.11.

  // Berechnung
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="bg-stone-900/80 backdrop-blur-md text-white p-6 rounded-xl border border-orange-500/30 shadow-2xl max-w-2xl mx-auto mt-6 mb-0">
      <div className="text-center mb-3">
        <h3 className="text-orange-400 uppercase tracking-widest text-xs font-bold mb-1">
          {nextHighlight ? 'Nächster Termin' : 'Vorschau'}
        </h3>
        <div className="text-xl md:text-2xl font-black text-stone-100 leading-tight">
          {nextHighlight ? nextHighlight.titel : 'Fasneteröffnung 11.11.'}
        </div>
        {nextHighlight && (
          <div className="text-stone-400 text-sm mt-1">
             {nextHighlight.datum}{nextHighlight.jahr} &bull; {nextHighlight.ort}
          </div>
        )}
      </div>
      
      <div className="flex justify-center gap-4 md:gap-8 text-center">
        {[
          { label: 'Tage', value: timeLeft.days },
          { label: 'Std', value: timeLeft.hours },
          { label: 'Min', value: timeLeft.minutes },
          { label: 'Sek', value: timeLeft.seconds }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-3xl md:text-5xl font-bold font-mono text-white">{item.value}</span>
            <span className="text-xs text-stone-400 uppercase mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
