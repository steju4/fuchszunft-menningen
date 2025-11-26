import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, MapPin, Music, Info, ChevronRight, Mail, Phone, FileText, Download, Clock, Home, Users, BookOpen, House } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

// Custom Instagram Icon
const Instagram = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// --- Komponente: Navigation ---
const Navigation = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Startseite', icon: Home },
    { id: 'news', label: 'Aktuelles', icon: FileText },
    { id: 'termine', label: 'Termine', icon: Calendar },
    { id: 'figuren', label: 'Zunftfiguren', icon: Users },
    { id: 'geschichte', label: 'Geschichte & Dorf', icon: BookOpen },
    { id: 'zunftstube', label: 'Zunftstube', icon: House },
    { id: 'kontakt', label: 'Kontakt', icon: Mail },
  ];

  return (
    <nav className="bg-stone-900 text-white shadow-lg sticky top-0 z-50 border-b-4 border-orange-600">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Area */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="bg-orange-600 p-2 rounded-lg transform group-hover:rotate-12 transition-transform">
              <span className="text-3xl">🦊</span>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-xl tracking-wide uppercase">Fuchszunft</div>
              <div className="text-orange-400 text-sm font-medium">Menningen e.V.</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 font-medium ${
                  activeTab === item.id 
                    ? 'bg-orange-600 text-white shadow-md transform scale-105' 
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-stone-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden bg-stone-800 border-t border-stone-700 absolute w-full left-0 shadow-xl">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`p-4 rounded-lg text-left flex items-center gap-3 ${
                  activeTab === item.id 
                    ? 'bg-orange-600 text-white' 
                    : 'text-stone-300 hover:bg-stone-700'
                }`}
              >
                <item.icon size={20} />
                <span className="text-lg">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Komponente: Countdown ---
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
    <div className="bg-stone-900/80 backdrop-blur-md text-white p-6 rounded-xl border border-orange-500/30 shadow-2xl max-w-2xl mx-auto mt-8 mb-12">
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

// --- Seiten-Komponenten ---

const HomeSection = ({ setActiveTab }) => (
  <div className="animate-fadeIn">
    {/* Hero */}
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-stone-900">
      <div className="absolute inset-0 opacity-50 bg-[url('/Gesamt.jpg')] bg-cover bg-[center_bottom_40%] transition-transform duration-[20s] hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/60" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="mb-4 inline-block animate-bounce">
          <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">Saison 2026</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
          Fuchs - Narro!
        </h1>
        <p className="text-xl text-stone-200 mb-8 max-w-2xl mx-auto leading-relaxed font-bold">
          Herzlich Willkommen bei der <strong>Grafschaft Fuchsbühl</strong> zu Menningen.
          Wir freuen uns auf eine glückselige Fasnet im Ablachtal!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            onClick={() => setActiveTab('news')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 border border-orange-500"
          >
            <FileText size={20} /> Aktuelle Neuigkeiten
          </button>
          <button 
            onClick={() => setActiveTab('termine')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            <Calendar size={20} /> Termine 2026
          </button>
          <button 
            onClick={() => setActiveTab('figuren')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            <Users size={20} /> Zunftfiguren
          </button>
        </div>

        <div className="hidden md:block">
          <Countdown />
        </div>
      </div>
    </div>

    {/* Mobile Countdown */}
    <div className="md:hidden bg-stone-900 py-0.5">
      <Countdown />
    </div>

    {/* Teaser Grid */}
    <div className="container mx-auto px-4 py-16 mt-8 md:-mt-20 relative z-10 md:z-20">
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Historie', text: 'Erfahre mehr über die Gründung 1957 und unsere Wurzeln im Gremlich-Schloss.', link: 'geschichte', color: 'bg-green-800' },
          { title: 'Kontakt & Infos', text: 'Haben Sie Fragen zur Zunft oder unseren Veranstaltungen? Hier finden Sie alle Ansprechpartner.', link: 'kontakt', color: 'bg-orange-700' },
          { title: 'Zunftstube', text: 'Unser Haupttreffpunkt. Etwa jeden 2. Montag für alle geöffnet.', link: 'zunftstube', color: 'bg-stone-800' },
        ].map((card, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveTab(card.link)}
            className={`${card.color} text-white p-8 rounded-xl shadow-xl cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group border-t-4 border-white/20`}
          >
            <h3 className="text-2xl font-bold mb-3 flex items-center justify-between">
              {card.title} <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-white/80 leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const NewsSection = ({ selectedArticle, setSelectedArticle }) => {
  const newsArticles = [
    {
      id: 1,
      title: "Erfolgreicher Saisonauftakt 2026",
      date: "15. November 2025",
      category: "Fasnet",
      preview: "Die Vorbereitungen für die Fasnet 2026 laufen auf Hochtouren. Alle Häser sind gereinigt und die ersten Proben haben begonnen...",
      content: `
        Die Fuchszunft Menningen ist bereit für eine großartige Fasnet 2026! 
        
        In den letzten Wochen haben alle Mitglieder fleißig an der Vorbereitung gearbeitet. Die traditionellen Häser wurden sorgfältig gereinigt und auf Schäden überprüft. Besonders die echten Fuchsfelle unserer Hauptfiguren benötigen intensive Pflege.
        
        **Erste Proben erfolgreich**
        
        Bereits am vergangenen Wochenende fanden die ersten Proben in der Zunftstube statt. Die kleinen Füchse zeigten dabei wieder ihre beeindruckende Begeisterung und lernten schnell die traditionellen Bewegungen.
        
        **Neue Mitglieder willkommen**
        
        Wir freuen uns besonders über drei neue Mitglieder, die in dieser Saison erstmals mit uns auf die Straße gehen werden. Sie werden die Reihen der Gausmates verstärken.
      `,
      image: null,
      author: "Zunftvorstand"
    },
    {
      id: 2,
      title: "Zunftstube erstrahlt in neuem Glanz",
      date: "3. November 2025",
      category: "Zunftstube",
      preview: "Nach wochenlangen Renovierungsarbeiten ist unsere beliebte Zunftstube wieder in vollem Betrieb. Die Küche wurde modernisiert...",
      content: `
        Unsere Zunftstube ist wieder bereit für die kommende Saison! Nach umfangreichen Renovierungsarbeiten erstrahlt sie in neuem Glanz.
        
        **Was wurde erneuert?**
        
        - Komplette Modernisierung der Küche mit neuen Geräten
        - Frischer Anstrich in den traditionellen Zunftfarben
        - Neue Beleuchtung im Hauptraum
        - Restaurierung der historischen Zunftbilder
        
        **Wiedereröffnung gefeiert**
        
        Am 2. November wurde die renovierte Zunftstube mit einem gemütlichen Dämmerschoppen wiedereröffnet. Über 40 Mitglieder und Freunde der Zunft feierten gemeinsam bis in die späten Abendstunden.
        
        **Öffnungszeiten**
        
        Ab sofort ist die Zunftstube wieder jeden zweiten Montag für alle geöffnet. Der nächste Termin ist der 18. November um 19:00 Uhr.
      `,
      image: null,
      author: "Hausmeister Team"
    }
  ];

  if (selectedArticle) {
    const article = newsArticles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="mb-8 flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium transition-colors"
        >
          ← Zurück zu den Neuigkeiten
        </button>
        
        <article className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          {article.image && (
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-64 object-cover"
            />
          )}
          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4 text-sm text-stone-500">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                {article.category}
              </span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.author}</span>
            </div>
            
            <h1 className="text-4xl font-bold text-stone-800 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="prose prose-lg prose-stone max-w-none">
              {article.content.split('\n').map((paragraph, idx) => {
                if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                  return (
                    <h3 key={idx} className="text-xl font-bold text-stone-800 mt-8 mb-4">
                      {paragraph.trim().slice(2, -2)}
                    </h3>
                  );
                }
                if (paragraph.trim().startsWith('- ')) {
                  return (
                    <li key={idx} className="ml-4 text-stone-600 leading-relaxed">
                      {paragraph.trim().slice(2)}
                    </li>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={idx} className="text-stone-600 leading-relaxed mb-4">
                      {paragraph.trim()}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-stone-800 mb-4">Aktuelles aus der Zunft</h2>
        <p className="text-stone-600 max-w-2xl mx-auto mb-6">
          Hier erfahrt Ihr alle Neuigkeiten rund um die Fuchszunft Menningen - von Fasnetvorbereitungen bis zu Veranstaltungen in der Zunftstube.
        </p>
        
        <a 
          href="https://www.instagram.com/fuchszunft_menningen/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
        >
          <Instagram size={20} />
          Folge uns auch auf Instagram für aktuelle Infos!
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {newsArticles.map((article) => (
          <article 
            key={article.id}
            onClick={() => setSelectedArticle(article.id)}
            className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group"
          >
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                  {article.category}
                </span>
                <span className="text-xs text-stone-500">{article.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-stone-800 mb-3 group-hover:text-orange-600 transition-colors leading-tight">
                {article.title}
              </h3>
              
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                {article.preview}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">{article.author}</span>
                <span className="text-orange-600 text-sm font-medium group-hover:text-orange-800 transition-colors">
                  Weiterlesen →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const AktuellesSection = () => {
  // Logik: 
  // Schmotzige 2026 = 12.02.
  // Rosenmontag = 16.02.
  // Fasnetsdienstag = 17.02.
  const termine = [
    { datum: '06.01.', jahr: '2026', zeit: '11:00', wtag: 'DI', titel: 'Dreikönigshock & Versammlung', ort: 'Zunftstube', highlight: false },
    { datum: '30.01.', jahr: '2026', zeit: 'Abends', wtag: 'FR', titel: 'Nachtumzug Bichtlingen', ort: 'Bichtlingen', highlight: true },
    { datum: '01.02.', jahr: '2026', zeit: 'Tagsüber', wtag: 'SO', titel: 'Umzug Bichtlingen', ort: 'Bichtlingen', highlight: false, desc: 'Anfahrt mit Biberbahn' },
    { datum: '08.02.', jahr: '2026', zeit: 'Tagsüber', wtag: 'SO', titel: 'Narrentreffen Oberkirch', ort: 'Oberkirch', highlight: true },
    { datum: '12.02.', jahr: '2026', zeit: '06:00', wtag: 'DO', titel: 'Schmotziger Dunschdig', ort: 'Menningen', highlight: true, desc: 'Wecken, Befreiung KiGa, Narrenbaumstellen (14 Uhr), Kinderfasnet im Gemeindesaal, Hemdglonker (19 Uhr)' },
    { datum: '14.02.', jahr: '2026', zeit: '19:33', wtag: 'SA', titel: 'Bürgerball', ort: 'Gemeindesaal', highlight: true, desc: 'Großes Programm der Menninger Vereine' },
    { datum: '17.02.', jahr: '2026', zeit: 'Tagsüber', wtag: 'DI', titel: 'Umzug Krauchenwies', ort: 'Krauchenwies', highlight: false },
    { datum: '17.02.', jahr: '2026', zeit: '19:00', wtag: 'DI', titel: 'Fasnetsverbrennen', ort: 'Zunftstube', highlight: false },
  ];

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

const FigurenSection = () => {
  const figuren = [
    { 
      name: 'Die Menninger Füchse', 
      year: '1957', 
      desc: 'Die erste und namensgebende Figur der Zunft. Das aufwändig gestaltete Häs mit echtem Fuchsfell erfordert sorgfältige Pflege. Die Füchse sind ständig in Bewegung - laufend und juckend begeistern sie die Zuschauer.', 
      emoji: '🦊', 
      color: 'bg-orange-100 border-orange-200' 
    },
    { 
      name: 'Der Schwarze Fuchs', 
      year: 'Einzelfigur', 
      desc: 'Vervollständigt die Gruppe der Füchse als Einzelfigur. Seine Aufgabe ist es, bei Umzügen die ganze Schar zusammenzuhalten und für einen erfolgreichen Auftritt zu sorgen.', 
      emoji: '🖤', 
      color: 'bg-stone-200 border-stone-300' 
    },
    { 
      name: 'Die kleinen Füchse', 
      year: '-', 
      desc: 'Eine der schönsten Erfindungen der Zunft. Drei bis fünf Kinder im Alter von 7-9 Jahren tragen die Miniatur-Ausführung des Fuchshäses und erregen überall großes Aufsehen.', 
      emoji: '🐾', 
      color: 'bg-orange-50 border-orange-100' 
    },
    { 
      name: 'Die Gausmates', 
      year: '1996/97', 
      desc: 'Stellen die früher ansässigen Viehhütefamilien dar, die Vieh und Gänse im Wald hüteten. Das von Jürgen Hohl gestaltete Häs ist der Kleidung armer Hüterfamilien nachempfunden, aber fasnächtlich verfremdet.', 
      emoji: '🪿', 
      color: 'bg-green-100 border-green-200' 
    },
    { 
      name: 'Das Zunftpräsidium', 
      year: '-', 
      desc: 'Zunftpräsident mit seinen beiden Zunftmeistern führt die Fuchszunft an. Das Häs ist der Kleidung der Reichsritter von Gremlich nachempfunden, aber fasnächtlich verfremdet.', 
      emoji: '👑', 
      color: 'bg-blue-50 border-blue-100' 
    },
    { 
      name: 'Der Zeremonienmeister', 
      year: '-', 
      desc: 'Führt direkt hinter dem Präsidium die große Schar der Füchse an. Trägt das gleiche Häs wie das Präsidium, nur in blau. Als Zunftschreiber sorgt er für Recht und Ordnung.', 
      emoji: '📜', 
      color: 'bg-blue-100 border-blue-200' 
    },
    { 
      name: 'Der Narrenbüttel', 
      year: '1960', 
      desc: 'Wurde zum ersten großen Auftritt in Ludwigshafen geschaffen. Springt in großen Achterbögen vorneweg und macht den Weg für die nachfolgende Zunft frei.', 
      emoji: '🔔', 
      color: 'bg-yellow-50 border-yellow-100' 
    },
    { 
      name: 'Der Standartenträger', 
      year: '1959', 
      desc: 'Trägt die aufwändig geschaffene Zunft-Standarte, die einst das Aushängeschild der Fuchszunft war und heute das offizielle Zunftschild darstellt.', 
      emoji: '🏴', 
      color: 'bg-purple-50 border-purple-100' 
    },
    { 
      name: 'Die Fahnengruppe', 
      year: '1966', 
      desc: 'Zum Narrentag in Meßkirch geschaffen und in der Stadthalle geweiht. Fahnenträger mit zwei Begleitern in historischen Gewändern, fasnächtlich angepasst.', 
      emoji: '🚩', 
      color: 'bg-red-50 border-red-100' 
    },
    { 
      name: 'Der Narrenpolizei', 
      year: 'vor 1957', 
      desc: 'Die einzige Figur, die schon vor der Zunftgründung existierte. Heute wichtige Person der Dorffasnet. Seit 1985 in der Zunft mit angepasstem, schönen Häs.', 
      emoji: '👮', 
      color: 'bg-gray-50 border-gray-100' 
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-stone-800 mb-4">Unsere Zunftfiguren</h2>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Jede Figur hat ihre eigene Geschichte und Bedeutung für die Menninger Fasnet.
        </p>
      </div>

      {/* Bilder der Zunftfiguren - nebeneinander auf Desktop */}
      <div className="mb-16 grid lg:grid-cols-2 gap-8 items-start">
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden max-w-fit">
            <img 
              src="/unnamed.gif" 
              alt="Füchse und Gausmates der Fuchszunft Menningen" 
              className="max-h-80 w-auto object-contain block"
            />
            <div className="px-4 py-6 text-center min-w-0">
              <h3 className="text-lg font-bold text-stone-800 mb-2 leading-tight">Unsere Zunftfiguren</h3>
              <p className="text-sm text-stone-600 leading-snug">Menninger Füchse und Gausmates</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          <div className="h-80 overflow-hidden">
            <img 
              src="/1057c88a-73d0-40a5-bcf8-f60b018cdd56.webp" 
              alt="Zunftpräsidium mit den kleinen Füchsen" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-lg font-bold text-stone-800 mb-2 leading-tight">Präsidium mit unseren kleinen Füchsen</h3>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {figuren.map((figur, idx) => (
          <div key={idx} className={`p-6 rounded-xl border-2 ${figur.color} hover:shadow-xl transition-all duration-300 group bg-white/50`}>
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{figur.emoji}</div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-stone-800">{figur.name}</h3>
              <span className="text-xs font-bold bg-white px-2 py-1 rounded text-stone-600 shadow-sm">{figur.year}</span>
            </div>
            <p className="text-stone-700 leading-relaxed">
              {figur.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const GeschichteSection = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
    <div className="prose prose-lg prose-stone mx-auto">
      <h2 className="text-4xl font-bold text-stone-800 mb-8 text-center">Von Rittern und Füchsen</h2>
      
      <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 mb-12 shadow-sm">
        <h3 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
          <Info size={24} /> Entstehung und Gründung
        </h3>
        <p className="mb-4">
          Mitte der 50er-Jahre suchte man nach einer Möglichkeit, die Menninger Fasnet auf feste Beine zu stellen. 
          Es fehlte vor allem eine feste Fasnachtsgestalt als Identifikationsfigur.
        </p>
        <p className="mb-4">
          Der damalige Bahnhofswirt <strong>Karl Hänsler</strong> hatte die zündende Idee: Inspiriert vom Flurnamen "Fuchsbühl" 
          und den dort lebenden schlauen Tieren, entwarf er heimlich das Urmodell der Fuchsmaske. 
          Der Maskenschnitzer Erwin Kleiner aus Meßkirch fertigte daraufhin die erste Holzmaske.
        </p>
        <p className="mb-4">
          <strong>Der erste Auftritt:</strong> Beim Bürgerball am 22. Januar 1956 traten überraschend die ersten beiden Menninger Füchse auf 
          (Karl Hänsler und Adolf Seifritz) und wurden mit großer Begeisterung gefeiert.
        </p>
        <p>
          Am <strong>10. Januar 1957</strong> war es dann soweit: Im Gasthaus "Bahnhof" wurde die Zunft offiziell gegründet. 
          Aufgrund der früher hier ansässigen Ritterschaft der Gremlich erhielt die Zunft den Namen "Grafschaft Fuchsbühl zu Menningen".
        </p>
      </div>

      {/* Zunftlied Sektion */}
      <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200 mb-12 shadow-sm">
        <h3 className="text-2xl font-bold text-orange-700 mb-6 flex items-center gap-2 justify-center">
          <Music size={24} /> Das Menninger Zunftlied
        </h3>
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden max-w-2xl">
            <img 
              src="/unnamed (1).gif" 
              alt="Das Menninger Zunftlied" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <p className="text-center text-stone-600 italic">
          Unser traditionelles Zunftlied
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-stone-800 mb-4">Unser Dorf Menningen</h3>
          <p className="text-stone-600 leading-relaxed">
            Menningen liegt malerisch im Ablachtal, östlich von Meßkirch. 
            Seit 1974 Teilort der Stadt, hat sich Menningen seinen eigenständigen Charakter bewahrt. 
            Ursprünglich bestand der Ort aus zwei Teilen: Menningen (links der Ablach) und Leitishofen (rechts der Ablach), 
            die 1932 vereint wurden.
          </p>
        </div>
        <div className="bg-green-900 text-white p-6 rounded-xl shadow-lg">
          <h4 className="font-bold mb-2 text-green-300 flex items-center gap-2"><BookOpen size={18}/> Schon gewusst?</h4>
          <p className="text-sm leading-relaxed opacity-90">
            Das Wappen der Herren von Gremlich spielt in unserer Zunft eine große Rolle. 
            Das Zunftpräsidium trägt Gewänder, die an diese Adelsfamilie erinnern. 
            Auch das Menninger Wasserschloss geht auf eine alte Wasserburg zurück.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ZunftstubeSection = () => (
  <div className="animate-fadeIn">
    <div className="bg-stone-900 text-white py-20 px-4 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      
      <div className="container mx-auto text-center max-w-3xl relative z-10">
        <Music size={48} className="mx-auto text-orange-500 mb-6" />
        <h2 className="text-4xl font-bold mb-6">Die Zunftstube</h2>
        <p className="text-xl text-stone-300 leading-relaxed">
          Seit 1985 unser ganzer Stolz. Ein Ort der Begegnung, der Kameradschaft und natürlich der Fasnet.
        </p>
      </div>
    </div>
    
    <div className="container mx-auto px-4 py-16 max-w-5xl -mt-10 relative z-20">
      <div className="bg-white p-8 rounded-xl shadow-xl mb-12">
        <h3 className="text-2xl font-bold text-stone-800 mb-4">Ein eigenes Heim für die Zunft</h3>
        <p className="text-stone-600 mb-4 leading-relaxed">
          Im Jahr 1985 ging für die Fuchszunft ein lang gehegter Wunsch in Erfüllung. Nach zweijähriger Planungs- und Bauzeit konnte die Zunftstube eingeweiht werden. 
          Seither hat man Räumlichkeiten zur Aufbewahrung der Häser und Utensilien sowie ein Archiv für die Zunftunterlagen.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Durch unsere Zunftstube ist die Kameradschaft und der Zusammenhalt gewachsen. Sie ist längst eine Stätte der Begegnung geworden 
          und als Bestandteil des örtlichen Lebens nicht mehr wegzudenken – sei es bei Stammtischrunden, der Fasnetseröffnung oder Familienfesten.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500 hover:transform hover:-translate-y-1 transition-transform">
          <h3 className="font-bold text-xl mb-2 text-stone-800">Öffnungszeiten</h3>
          <p className="text-stone-600">
            Die Zunftstube ist als Schank-Gaststätte angemeldet und etwa jeden zweiten Montagabend für die Bevölkerung geöffnet.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-600 hover:transform hover:-translate-y-1 transition-transform">
          <h3 className="font-bold text-xl mb-2 text-stone-800">Ausstattung</h3>
          <p className="text-stone-600">
            Kleine Küche, WC-Anlagen und ein Bewirtungsraum für Versammlungen, Sitzungen und kleine Feste.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const KontaktSection = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
    <h2 className="text-4xl font-bold text-stone-800 mb-12 text-center">Kontakt & Service</h2>
    
    <div className="grid md:grid-cols-2 gap-12 mb-16">
      <div>
        <h3 className="text-2xl font-bold text-orange-700 mb-6">Ansprechpartner</h3>
        <div className="space-y-6">
          <div>
            <p className="font-bold text-stone-900 text-lg">Präsident</p>
            <p className="text-lg text-stone-800">Winfried Stengele</p>
            <p className="text-stone-600">Brunnenäcker 9<br/>88605 Meßkirch-Menningen</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <a href="tel:01623029546" className="flex items-center gap-3 text-stone-700 hover:text-orange-600 transition-colors bg-stone-50 p-4 rounded-lg border border-stone-200 hover:shadow-md">
              <Phone size={20} />
              <span className="font-mono font-medium">0162 / 3029546</span>
            </a>
            <a href="mailto:Fuchszunft-Menningen@t-online.de" className="flex items-center gap-3 text-stone-700 hover:text-orange-600 transition-colors bg-stone-50 p-4 rounded-lg border border-stone-200 hover:shadow-md">
              <Mail size={20} />
              <span className="font-medium">Fuchszunft-Menningen@t-online.de</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-stone-100 p-8 rounded-2xl border border-stone-200">
        <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
          <Download size={24} className="text-green-700" /> Downloads
        </h3>
        <p className="text-stone-600 mb-6 text-sm">
          Hier finden Sie wichtige Dokumente zum Verein. Werden Sie Teil der Tradition!
        </p>
        <div className="space-y-3">
          <button className="w-full bg-white hover:bg-orange-50 text-left px-4 py-3 rounded-lg shadow-sm border border-stone-200 flex items-center justify-between group transition-all hover:border-orange-200">
            <span className="flex items-center gap-2 font-medium text-stone-700 group-hover:text-orange-700">
              <FileText size={18} /> Beitrittserklärung (PDF)
            </span>
            <Download size={16} className="text-stone-400 group-hover:text-orange-600" />
          </button>
          <button className="w-full bg-white hover:bg-orange-50 text-left px-4 py-3 rounded-lg shadow-sm border border-stone-200 flex items-center justify-between group transition-all hover:border-orange-200">
            <span className="flex items-center gap-2 font-medium text-stone-700 group-hover:text-orange-700">
              <BookOpen size={18} /> Vereinssatzung (PDF)
            </span>
            <Download size={16} className="text-stone-400 group-hover:text-orange-600" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ImpressumSection = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
    <h2 className="text-4xl font-bold text-stone-800 mb-8">Impressum</h2>
    <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 text-stone-700 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-stone-900 mb-2">Angaben gemäß § 5 TMG</h3>
        <p>
          Grafschaft Fuchsbühl zu Menningen e.V.<br />
          Brunnenäcker 9<br />
          88605 Meßkirch-Menningen
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 mb-2">Vertreten durch</h3>
        <p>
          1. Vorstand: Winfried Stengele<br />
          2. Vorstand: [Bitte Namen ergänzen]<br />
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 mb-2">Kontakt</h3>
        <p>
          Telefon: 0162 / 3029546<br />
          E-Mail: Fuchszunft-Menningen@t-online.de
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 mb-2">Registereintrag</h3>
        <p>
          Eintragung im Vereinsregister.<br />
          Registergericht: [Bitte Amtsgericht ergänzen]<br />
          Registernummer: [Bitte VR-Nummer ergänzen]
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
        <p>
          Winfried Stengele<br />
          Brunnenäcker 9<br />
          88605 Meßkirch-Menningen
        </p>
      </div>
      
      <div className="pt-6 border-t border-stone-200">
        <h3 className="text-xl font-bold text-stone-900 mb-2">Haftungsausschluss (Disclaimer)</h3>
        <p className="mb-4"><strong>Haftung für Inhalte</strong><br/>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
        <p className="mb-4"><strong>Haftung für Links</strong><br/>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
        <p><strong>Urheberrecht</strong><br/>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
      </div>
    </div>
  </div>
);

const DatenschutzSection = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
    <h2 className="text-4xl font-bold text-stone-800 mb-8">Datenschutzerklärung</h2>
    <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 text-stone-700">
      <p>Hier bitte den Text der Datenschutzerklärung einfügen.</p>
    </div>
  </div>
);

// --- Haupt-App Komponente ---
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (activeTab !== 'news') {
      setSelectedArticle(null);
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeSection setActiveTab={setActiveTab} />;
      case 'news': return <NewsSection selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} />;
      case 'termine': return <AktuellesSection />;
      case 'figuren': return <FigurenSection />;
      case 'geschichte': return <GeschichteSection />;
      case 'zunftstube': return <ZunftstubeSection />;
      case 'kontakt': return <KontaktSection />;
      case 'impressum': return <ImpressumSection />;
      case 'datenschutz': return <DatenschutzSection />;
      default: return <HomeSection setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-800 font-sans flex flex-col">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-orange-900">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://www.instagram.com/fuchszunft_menningen/" target="_blank" rel="noopener noreferrer" className="bg-stone-800 p-3 rounded-full hover:bg-orange-600 hover:text-white transition-all"><Instagram size={24} /></a>
            <a href="mailto:Fuchszunft-Menningen@t-online.de" className="bg-stone-800 p-3 rounded-full hover:bg-orange-600 hover:text-white transition-all"><Mail size={24} /></a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-8 uppercase tracking-wider font-medium">
            <button onClick={() => setActiveTab('impressum')} className="hover:text-white transition-colors">Impressum</button>
            <button onClick={() => setActiveTab('datenschutz')} className="hover:text-white transition-colors">Datenschutz</button>
            <a href="http://www.narrenvereinigung-hegau-bodensee.de/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">NV Hegau-Bodensee</a>
          </div>
          <p className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} Fuchszunft Menningen e.V. | Fuchs - Narro!
          </p>
        </div>
      </footer>
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;