import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Users, ChevronRight } from 'lucide-react';
import Countdown from '../components/Countdown';
import heroBg from '../assets/Gesamt.jpg';

const HomeSection = ({ setActiveTab }) => {
  // Responsive background position mit useState für korrektes Re-Rendering
  const [bgPosition, setBgPosition] = useState('center -290px');

  useEffect(() => {
    const updateBgPosition = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBgPosition('center -290px');      // Mobile
      } else if (width < 1350) {
        setBgPosition('center -190px');      // Desktop < 1440px
      } else if (width < 1600) {
        setBgPosition('center -320px');      // Desktop 1440px - 1600px
      } else {
        setBgPosition('center -430px');      // Desktop >= 1440px
      }
    };

    // Initial set
    updateBgPosition();

    // Update on resize
    window.addEventListener('resize', updateBgPosition);
    return () => window.removeEventListener('resize', updateBgPosition);
  }, []);

  return (
  <div className="animate-fadeIn bg-stone-900">
    {/* Hero Section */}
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-stone-900">
      
      {/* Hintergrundbild - Responsive Position */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: bgPosition,
          backgroundRepeat: 'no-repeat',
          opacity: 0.5
        }}
      />
      
      {/* Preload Hint für Performance */}
      
      {/* Dynamischer Gradient - schwächer oben, stärker unten */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/20 to-stone-900" />
      
      {/* Extra sanfter Übergang am unteren Rand */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent" />
      
      {/* Content Container - Mit Flex-Grow für bessere Kontrolle */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-16 md:pt-24 pb-8 md:pb-12 flex-grow flex flex-col justify-start space-y-8">
        
        {/* Hauptüberschrift */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl tracking-tight">
            <span className="inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
              Fuchs - Narro!
            </span>
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>
        
        {/* Beschreibungstext - MEHR ABSTAND (ROT) */}
        <div className="pt-16 md:pt-32">
          <p className="text-lg sm:text-xl md:text-2xl text-stone-100 max-w-3xl mx-auto leading-relaxed text-center font-medium px-4 drop-shadow-lg">
            Herzlich Willkommen bei der <span className="text-orange-400 font-bold">Grafschaft Fuchsbühl</span> zu Menningen.
            <br className="hidden sm:block" />
            <span className="text-stone-200">Wir freuen uns auf eine glückselige Fasnet im Ablachtal!</span>
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl px-4 mx-auto">
          <button 
            onClick={() => setActiveTab('news')}
            className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center gap-3 border-2 border-orange-500/50"
          >
            <FileText size={22} /> 
            <span>Neuigkeiten</span>
          </button>
          <button 
            onClick={() => setActiveTab('termine')}
            className="flex-1 bg-stone-800/80 hover:bg-stone-700/90 backdrop-blur-sm border-2 border-stone-600 hover:border-stone-500 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
          >
            <Calendar size={22} /> 
            <span>Termine</span>
          </button>
          <button 
            onClick={() => setActiveTab('figuren')}
            className="flex-1 bg-stone-800/80 hover:bg-stone-700/90 backdrop-blur-sm border-2 border-stone-600 hover:border-stone-500 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
          >
            <Users size={22} /> 
            <span>Figuren</span>
          </button>
        </div>

        {/* Countdown */}
        <div className="w-full max-w-4xl px-4 mx-auto mt-auto">
          <Countdown />
        </div>
      </div>
    </div>

    {/* Teaser Grid */}
    <div className="container mx-auto px-4 py-4 -mt-20 md:-mt28">
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {[
          { title: 'Historie', text: 'Erfahre mehr über die Gründung 1957 und unsere Wurzeln im Gremlich-Schloss.', link: 'geschichte', color: 'bg-green-800' },
          { title: 'Kontakt & Infos', text: 'Haben Sie Fragen zur Zunft oder unseren Veranstaltungen? Hier finden Sie alle Ansprechpartner.', link: 'kontakt', color: 'bg-orange-700' },
          { title: 'Zunftstube', text: 'Unser Haupttreffpunkt. Etwa jeden 2. Montag für alle geöffnet.', link: 'zunftstube', color: 'bg-stone-800' },
        ].map((card, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveTab(card.link)}
            className={`${card.color} text-white p-6 md:p-8 rounded-xl shadow-xl cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group border-t-4 border-white/20`}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 flex items-center justify-between">
              {card.title} <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </h3>
            <p className="text-white/80 leading-relaxed text-sm md:text-base">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default HomeSection;
