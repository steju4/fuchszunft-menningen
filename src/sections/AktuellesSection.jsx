import React from 'react';
import { Clock, MapPin, Download, Calendar } from 'lucide-react';
import { termine } from '../data/termineData';

const AktuellesSection = () => {
  const exportToPDF = async () => {
    const jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Fuchszunft Menningen e.V.', 20, 20);
    doc.setFontSize(16);
    doc.text('Narrenfahrplan/Termine 2026', 20, 35);
    doc.setFontSize(10);
    doc.text('Die wichtigsten Termine der Fasnet 2026', 20, 45);
    
    // Linie
    doc.line(20, 50, 190, 50);
    
    let yPos = 65;
    
    termine.forEach((termin) => {
      // Prüfen ob neue Seite nötig
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      // Datum und Wochentag
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`${termin.datum}${termin.jahr} (${termin.wtag})`, 20, yPos);
      
      // Titel
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text(termin.titel, 20, yPos + 8);
      
      // Zeit und Ort
      doc.setFont(undefined, 'normal');
      doc.setFontSize(10);
      doc.text(`Zeit: ${termin.zeit}`, 20, yPos + 16);
      doc.text(`Ort: ${termin.ort}`, 20, yPos + 24);
      
      // Beschreibung falls vorhanden
      if (termin.desc) {
        doc.setFontSize(9);
        doc.text(`Details: ${termin.desc}`, 20, yPos + 32);
        yPos += 45;
      } else {
        yPos += 35;
      }
      
      // Trennlinie
      doc.line(20, yPos - 5, 190, yPos - 5);
      yPos += 5;
    });
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Fuchszunft Menningen e.V. | Fasnet 2026 | Seite ${i} von ${pageCount}`, 20, 290);
      doc.text('www.fuchszunft-menningen.de', 150, 290);
    }
    
    // PDF herunterladen
    doc.save('Fasnet-Termine-2026.pdf');
  };

  const exportToCalendar = async () => {
    const { createEvents } = await import('ics');
    const events = termine.map((termin) => {
      // Datum parsen
      const [tag, monat] = termin.datum.split('.');
      const jahr = termin.jahr;
      
      // Zeit parsen
      let stunde = 10; // Standardzeit falls nicht parsebar
      let minute = 0;
      
      if (termin.zeit !== 'Tagsüber' && termin.zeit !== 'Abends') {
        const zeitMatch = termin.zeit.match(/(\d{1,2}):?(\d{2})?/);
        if (zeitMatch) {
          stunde = parseInt(zeitMatch[1]);
          minute = zeitMatch[2] ? parseInt(zeitMatch[2]) : 0;
        }
      } else if (termin.zeit === 'Abends') {
        stunde = 19;
        minute = 0;
      }
      
      const startDate = [
        parseInt(jahr),
        parseInt(monat),
        parseInt(tag),
        stunde,
        minute
      ];
      
      // Enddatum (1-2 Stunden später je nach Event)
      const dauer = termin.titel.includes('Umzug') || termin.titel.includes('Ball') ? 3 : 2;
      const endDate = [
        parseInt(jahr),
        parseInt(monat),
        parseInt(tag),
        stunde + dauer,
        minute
      ];
      
      return {
        title: termin.titel,
        description: `${termin.desc || ''}\n\nVeranstaltung der Fuchszunft Menningen e.V.`,
        location: termin.ort,
        start: startDate,
        end: endDate,
        status: 'CONFIRMED',
        organizer: {
          name: 'Fuchszunft Menningen e.V.',
          email: 'Fuchszunft-Menningen@t-online.de'
        },
        alarms: [{
          action: 'display',
          description: 'Fasnet-Termin Erinnerung',
          trigger: { hours: 2, minutes: 0, before: true }
        }]
      };
    });

    createEvents(events, (error, value) => {
      if (error) {
        console.log('Fehler beim Erstellen der Kalender-Datei:', error);
        alert('Fehler beim Erstellen der Kalender-Datei. Bitte versuchen Sie es erneut.');
        return;
      }

      // ICS-Datei als Download anbieten
      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Fasnet-Termine-2026.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-stone-800 mb-4">Termine 2026</h2>
        <p className="text-stone-600 text-lg">Die wichtigsten Termine auf einen Blick.</p>
      </div>

      <div className="relative border-l-4 border-stone-200 ml-4 md:ml-8 space-y-8">
        {termine.map((termin, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12">
            {/* Dot */}
            <div className={`absolute -left-[13px] md:-left-[13px] w-6 h-6 rounded-full border-4 border-white ${termin.highlight ? 'bg-orange-600' : 'bg-stone-400'}`}></div>
            
            <div className={`bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow ${termin.highlight ? 'border-orange-200 bg-orange-50/30' : 'border-stone-100'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className={`font-bold text-2xl ${termin.highlight ? 'text-orange-600' : 'text-stone-700'}`}>
                      {termin.datum}
                    </span>
                    <span className="text-sm font-bold bg-stone-100 px-2 py-0.5 rounded text-stone-600">{termin.wtag}</span>
                    <span className="text-lg text-stone-400 font-normal hidden sm:inline">{termin.jahr}</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mt-1">{termin.titel}</h3>
                </div>
                <div className="flex items-center gap-2 text-stone-500 bg-white/50 px-3 py-1 rounded-full self-start md:self-center whitespace-nowrap border border-stone-100">
                  <Clock size={14} /> {termin.zeit}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-stone-600 font-medium mt-2">
                <MapPin size={16} className="text-orange-500" /> {termin.ort}
              </div>
              
              {termin.desc && (
                <p className="mt-3 text-stone-500 text-sm italic border-t border-stone-200/50 pt-2">
                  {termin.desc}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-stone-100 p-8 rounded-xl">
        <h3 className="font-bold text-stone-800 mb-4">Nichts mehr verpassen?</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={exportToPDF}
            className="text-orange-600 font-bold hover:underline flex items-center justify-center gap-2 transition-colors hover:text-orange-800 bg-white px-4 py-2 rounded-lg border border-orange-200 hover:bg-orange-50 shadow-sm"
          >
            <Download size={18} /> Als PDF herunterladen
          </button>
          <button 
            onClick={exportToCalendar}
            className="text-green-600 font-bold hover:underline flex items-center justify-center gap-2 transition-colors hover:text-green-800 bg-white px-4 py-2 rounded-lg border border-green-200 hover:bg-green-50 shadow-sm"
          >
            <Calendar size={18} /> In Kalender importieren
          </button>
        </div>
        <p className="text-xs text-stone-500 mt-3">
          ICS-Datei funktioniert mit Outlook, Google Calendar, Apple Calendar und allen anderen Kalender-Apps
        </p>
      </div>
    </div>
  );
};

export default AktuellesSection;
