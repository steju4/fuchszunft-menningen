import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, MapPin, Music, Info, ChevronRight, Facebook, Mail, Phone, FileText, Download, Clock, Home, Users, BookOpen } from 'lucide-react';

// --- Komponente: Navigation ---
const Navigation = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Startseite', icon: Home },
    { id: 'aktuelles', label: 'Fahrplan 2026', icon: Calendar },
    { id: 'figuren', label: 'Zunftfiguren', icon: Users },
    { id: 'geschichte', label: 'Geschichte & Dorf', icon: BookOpen },
    { id: 'zunftstube', label: 'Zunftstube', icon: Music },
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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Ziel: Schmotziger Dunschdig 2026 (12.02.2026, 06:00 Uhr)
    const targetDate = new Date('2026-02-12T06:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-stone-900/80 backdrop-blur-md text-white p-6 rounded-xl border border-orange-500/30 shadow-2xl max-w-2xl mx-auto mt-8">
      <h3 className="text-center text-orange-400 uppercase tracking-widest text-sm mb-4 font-bold">Countdown zum Wecken 2026</h3>
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
      {/* HINWEIS ZUM HINTERGRUNDBILD:
          Aktuell lädt hier ein Platzhalterbild. Wenn du ein eigenes Bild hast (z.B. 'hero.jpg'),
          lege es in den 'public'-Ordner deines Projekts und ändere die URL unten in:
          bg-[url('/hero.jpg')]
      */}
      <div className="absolute inset-0 opacity-50 bg-[url('https://placehold.co/1920x1080/2a2a2a/FFFFFF/png?text=Hintergrundbild+hier+einfuegen')] bg-cover bg-center transition-transform duration-[20s] hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/60" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="mb-4 inline-block animate-bounce">
          <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">Saison 2026</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
          Fuchs - Narro!
        </h1>
        <p className="text-xl text-stone-200 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
          Herzlich Willkommen bei der <strong>Grafschaft Fuchsbühl</strong> zu Menningen.
          Wir freuen uns auf eine glückselige Fasnet im Ablachtal!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            onClick={() => setActiveTab('aktuelles')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 border border-orange-500"
          >
            <Calendar size={20} /> Zum Narrenfahrplan
          </button>
          <button 
            onClick={() => setActiveTab('figuren')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            <Users size={20} /> Zunftfiguren
          </button>
        </div>

        <Countdown />
      </div>
    </div>

    {/* Teaser Grid */}
    <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Historie', text: 'Erfahre mehr über die Gründung 1957 und unsere Wurzeln im Gremlich-Schloss.', link: 'geschichte', color: 'bg-green-800' },
          { title: 'Mitglied werden', text: 'Lust auf Fasnet? Wir suchen immer neue Füchse und Gausmates!', link: 'kontakt', color: 'bg-orange-700' },
          { title: 'Zunftstube', text: 'Unser Wohnzimmer. Jeden 2. Montag für alle geöffnet.', link: 'zunftstube', color: 'bg-stone-800' },
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

const AktuellesSection = () => {
  // Logik: 
  // Schmotzige 2026 = 12.02.
  // Rosenmontag = 16.02.
  // Fasnetsdienstag = 17.02.
  const termine = [
    { datum: '06.01.', jahr: '2026', zeit: '11:00', wtag: 'DI', titel: 'Dreikönigshock & Versammlung', ort: 'Gemeindesaal', highlight: false },
    { datum: '30.01.', jahr: '2026', zeit: 'Abends', wtag: 'FR', titel: 'Nachtumzug Bichtlingen', ort: 'Bichtlingen', highlight: true },
    { datum: '01.02.', jahr: '2026', zeit: 'Tagsüber', wtag: 'SO', titel: 'Umzug Bichtlingen', ort: 'Bichtlingen (mit Biberbahn)', highlight: false },
    { datum: '08.02.', jahr: '2026', zeit: 'Tagsüber', wtag: 'SO', titel: 'Narrentreffen Oberkirch', ort: 'Oberkirch', highlight: true },
    { datum: '12.02.', jahr: '2026', zeit: '06:00', wtag: 'DO', titel: 'Schmotziger Dunschdig', ort: 'Ganzes Dorf', highlight: true, desc: 'Wecken, Befreiung KiGa, Narrenbaumstellen (14 Uhr), Hemdglonker (19 Uhr)' },
    { datum: '14.02.', jahr: '2026', zeit: '19:33', wtag: 'SA', titel: 'Bürgerball', ort: 'Gemeindesaal', highlight: true, desc: 'Großes Programm der Menninger Vereine' },
    { datum: '16.02.', jahr: '2026', zeit: '13:30', wtag: 'MO', titel: 'Rosenmontagsumzug', ort: 'Meßkirch', highlight: false },
    { datum: '17.02.', jahr: '2026', zeit: 'Tagsüber', wtag: 'DI', titel: 'Umzug Krauchenwies', ort: 'Krauchenwies', highlight: false },
    { datum: '17.02.', jahr: '2026', zeit: '19:00', wtag: 'DI', titel: 'Fasnetsverbrennung', ort: 'Zunftstube', highlight: false },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-stone-800 mb-4">Narrenfahrplan 2026</h2>
        <p className="text-stone-600 text-lg">Die wichtigsten Termine der kommenden Saison.</p>
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
        <h3 className="font-bold text-stone-800 mb-2">Nichts mehr verpassen?</h3>
        <button className="text-orange-600 font-bold hover:underline flex items-center justify-center gap-2 mx-auto transition-colors hover:text-orange-800">
          <Download size={18} /> Fahrplan als PDF herunterladen (Placeholder)
        </button>
      </div>
    </div>
  );
};

const FigurenSection = () => {
  const figuren = [
    { name: 'Menninger Fuchs', year: '1956', desc: 'Die Hauptfigur mit Holzmaske und echtem Fuchsfell. Immer in Bewegung, listig und schlau.', emoji: '🦊', color: 'bg-orange-100 border-orange-200' },
    { name: 'Schwarzer Fuchs', year: 'Einzelfigur', desc: 'Führt die Fuchsgruppe an und sorgt für Ordnung beim Umzug.', emoji: '🖤', color: 'bg-stone-200 border-stone-300' },
    { name: 'Gausmates', year: '1996', desc: 'Stellt die historischen Hirten dar. Ein Häs für die älteren Mitglieder, oft mit Stecken ausgestattet.', emoji: '🌾', color: 'bg-green-100 border-green-200' },
    { name: 'Kleine Füchse', year: '-', desc: 'Der ganze Stolz der Zunft: Kinder von 7-9 Jahren im Miniatur-Fuchshäs.', emoji: '🐾', color: 'bg-orange-50 border-orange-100' },
    { name: 'Zunftpräsidium', year: '-', desc: 'Präsident und Zunftmeister in edlen Gewändern, angelehnt an die Ritter von Gremlich.', emoji: '🎩', color: 'bg-blue-50 border-blue-100' },
    { name: 'Narrenbüttel', year: '1960', desc: 'Springt in Achterbögen voran und macht den Weg frei.', emoji: '🔔', color: 'bg-yellow-50 border-yellow-100' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-stone-800 mb-4">Unsere Zunftfiguren</h2>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Jede Figur hat ihre eigene Geschichte und Bedeutung für die Menninger Fasnet.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <Info size={24} /> Die Gründung 1957
        </h3>
        <p>
          Mitte der 50er Jahre suchte man nach einer festen Struktur für die Menninger Fasnet. 
          Der Bahnhofswirt <strong>Karl Hänsler</strong> hatte die zündende Idee: Inspiriert vom Flurnamen "Fuchsbühl" 
          und den schlauen Tieren, entwarf er heimlich das Urmodell der Fuchsmaske.
        </p>
        <p className="mt-4">
          Am <strong>10. Januar 1957</strong> war es soweit: Im Gasthaus "Bahnhof" wurde die Zunft offiziell gegründet. 
          Der Name "Grafschaft Fuchsbühl zu Menningen" ist eine Hommage an die früher hier ansässigen Ritter von Gremlich.
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
          Hier werden Pläne geschmiedet, Feste gefeiert und Traditionen gelebt.
        </p>
      </div>
    </div>
    
    <div className="container mx-auto px-4 py-16 max-w-5xl -mt-10 relative z-20">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500 hover:transform hover:-translate-y-1 transition-transform">
          <h3 className="font-bold text-xl mb-2 text-stone-800">Öffnungszeiten</h3>
          <p className="text-stone-600">Jeden 2. Montag ist die Stube für die Bevölkerung geöffnet. Stammtisch, Dämmerschoppen und gemütliches Beisammensein.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-600 hover:transform hover:-translate-y-1 transition-transform">
          <h3 className="font-bold text-xl mb-2 text-stone-800">Ausstattung</h3>
          <p className="text-stone-600">Voll ausgestattete Küche, Bewirtungsraum für Versammlungen und ein Archiv für unsere historischen Zunftunterlagen.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-stone-600 hover:transform hover:-translate-y-1 transition-transform">
          <h3 className="font-bold text-xl mb-2 text-stone-800">Vermietung</h3>
          <p className="text-stone-600">Ein beliebter Treffpunkt für Geburtstage und Familienfeste in Menningen. Anfragen bitte direkt an den Vorstand.</p>
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

// --- Haupt-App Komponente ---
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeSection setActiveTab={setActiveTab} />;
      case 'aktuelles': return <AktuellesSection />;
      case 'figuren': return <FigurenSection />;
      case 'geschichte': return <GeschichteSection />;
      case 'zunftstube': return <ZunftstubeSection />;
      case 'kontakt': return <KontaktSection />;
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
            <a href="#" className="bg-stone-800 p-3 rounded-full hover:bg-orange-600 hover:text-white transition-all"><Facebook size={24} /></a>
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
    </div>
  );
};

export default App;