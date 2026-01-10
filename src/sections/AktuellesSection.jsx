import React from 'react';
import { Clock, MapPin, Download, Calendar } from 'lucide-react';
import { termine } from '../data/termineData';

const AktuellesSection = () => {

  const generateICS = (terminListe) => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Fuchszunft Menningen//Website//DE\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n";
    
    terminListe.forEach(termin => {
       const [tag, monat] = termin.datum.split('.');
       const jahr = termin.jahr;
       
       // Zeit parsen
       let stunde = 10; 
       let minute = 0;
       
       if (termin.zeit !== 'Tagsüber' && termin.zeit !== 'Abends') {
         const zeitMatch = termin.zeit.match(/(\d{1,2}):?(\d{2})?/);
         if (zeitMatch) {
           stunde = parseInt(zeitMatch[1]);
           minute = zeitMatch[2] ? parseInt(zeitMatch[2]) : 0;
         }
       } else if (termin.zeit === 'Abends') {
         stunde = 19;
       }

       const pad = (n) => n < 10 ? '0' + n : n;
       const formatDT = (y, m, d, h, min) => `${y}${pad(m)}${pad(d)}T${pad(h)}${pad(min)}00`;
       
       const start = formatDT(jahr, parseInt(monat), parseInt(tag), stunde, minute);
       
       // Dauer: Standard 3h
       const end = formatDT(jahr, parseInt(monat), parseInt(tag), stunde + 3, minute);
       const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
       const uid = `${jahr}${monat}${tag}-${stunde}${minute}@fuchszunft-menningen.de`;

       icsContent += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${now}
DTSTART:${start}
DTEND:${end}
SUMMARY:${termin.titel}
DESCRIPTION:${termin.desc || 'Fasnet Veranstaltung'}
LOCATION:${termin.ort}
STATUS:CONFIRMED
END:VEVENT
`;
    });

    icsContent += "END:VCALENDAR";
    return icsContent;
  };

  const downloadICS = (content, filename) => {
      const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const exportAllToCalendar = () => {
    const content = generateICS(termine);
    downloadICS(content, 'Fasnet-Termine-2026.ics');
  };

  const exportSingleToCalendar = (termin) => {
    const content = generateICS([termin]);
    downloadICS(content, `Termin_${termin.titel.replace(/\s+/g, '_')}.ics`);
  };

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

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4">Termine 2026</h2>
        <p className="text-stone-600 dark:text-stone-300 text-lg">Die wichtigsten Termine auf einen Blick.</p>
      </div>

      <div className="relative border-l-4 border-stone-200 dark:border-stone-700 ml-4 md:ml-8 space-y-8">
        {termine.map((termin, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12">
            {/* Dot */}
            <div className={`absolute -left-[13px] md:-left-[13px] w-6 h-6 rounded-full border-4 border-white dark:border-stone-900 ${termin.highlight ? 'bg-orange-600' : 'bg-stone-400 dark:bg-stone-600'}`}></div>
            
            <div className={`bg-white dark:bg-stone-800 p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow ${termin.highlight ? 'border-orange-200 dark:border-orange-800 bg-orange-50/30 dark:bg-orange-900/20' : 'border-stone-100 dark:border-stone-700'}`}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                <div className="flex-grow">
                  <div className="flex items-baseline gap-2">
                    <span className={`font-bold text-2xl ${termin.highlight ? 'text-orange-600 dark:text-orange-500' : 'text-stone-700 dark:text-stone-300'}`}>
                      {termin.datum}
                    </span>
                    <span className="text-sm font-bold bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded text-stone-600 dark:text-stone-300">{termin.wtag}</span>
                    <span className="text-lg text-stone-400 dark:text-stone-500 font-normal hidden sm:inline">{termin.jahr}</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mt-1">{termin.titel}</h3>
                </div>
                
                <div className="flex items-center gap-2 self-start md:self-start">
                  <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 bg-white/50 dark:bg-stone-900/50 px-3 py-1 rounded-full whitespace-nowrap border border-stone-100 dark:border-stone-700">
                    <Clock size={14} /> {termin.zeit}
                  </div>
                   <button 
                    onClick={() => exportSingleToCalendar(termin)}
                    title="Diesen Termin in Kalender speichern"
                    className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-400 hover:text-green-600 dark:text-stone-500 dark:hover:text-green-400 transition-colors"
                  >
                    <Calendar size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300 font-medium mt-2">
                <MapPin size={16} className="text-orange-500" /> {termin.ort}
              </div>
              
              {termin.desc && (
                <p className="mt-3 text-stone-500 dark:text-stone-400 text-sm italic border-t border-stone-200/50 dark:border-stone-700/50 pt-2">
                  {termin.desc}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-stone-100 dark:bg-stone-800 p-8 rounded-xl">
        <h3 className="font-bold text-stone-800 dark:text-stone-100 mb-4">Nichts mehr verpassen?</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={exportToPDF}
            className="text-orange-600 dark:text-orange-400 font-bold hover:underline flex items-center justify-center gap-2 transition-colors hover:text-orange-800 dark:hover:text-orange-300 bg-white dark:bg-stone-700 px-4 py-2 rounded-lg border border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-900/30 shadow-sm"
          >
            <Download size={18} /> Als PDF herunterladen
          </button>
          <button 
            onClick={exportAllToCalendar}
            className="text-green-600 dark:text-green-400 font-bold hover:underline flex items-center justify-center gap-2 transition-colors hover:text-green-800 dark:hover:text-green-300 bg-white dark:bg-stone-700 px-4 py-2 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30 shadow-sm"
          >
            <Calendar size={18} /> Alle in Kalender importieren
          </button>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-3">
          ICS-Datei funktioniert mit Outlook, Google Calendar, Apple Calendar und allen anderen Kalender-Apps
        </p>
      </div>
    </div>
  );
};

export default AktuellesSection;
