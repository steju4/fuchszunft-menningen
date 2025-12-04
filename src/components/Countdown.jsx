import React, { useState, useEffect } from 'react';

const Countdown = () => {
  // Ziel: Schmotziger Dunschdig 2026 (12.02.2026, 06:00 Uhr)
  const targetDate = new Date('2026-02-12T06:00:00').getTime();
  
  // Berechnung sofort beim ersten Render
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
  }, []);

  return (
    <div className="bg-stone-900/80 backdrop-blur-md text-white p-6 rounded-xl border border-orange-500/30 shadow-2xl max-w-2xl mx-auto mt-8 mb-0">
      <h3 className="text-center text-orange-400 uppercase tracking-widest text-sm mb-4 font-bold">Countdown zum Schmotzigen 2026</h3>
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
