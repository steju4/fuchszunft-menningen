import React, { useState, useEffect, useMemo } from 'react';
import { FileText, Calendar, Users, ChevronRight, Award, Shield, Bell, MapPin } from 'lucide-react';
import Countdown from '../components/Countdown';
import { termine } from '../data/termineData';
import heroBg from '../assets/Gesamt.jpg';

const HomeSection = ({ setActiveTab }) => {
  // Prüfen, ob heute ein Termin ist
  const todaysEvents = useMemo(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear());
    const dateStr = `${day}.${month}.`;

    return termine.filter(t => t.datum === dateStr && t.jahr === year);
  }, []);

  return (
  <div className="animate-fadeIn bg-stone-900">
    {/* Hero Section */}
    <div className="relative flex flex-col overflow-hidden bg-stone-900">
      
      {/* Hintergrundbild - Responsive Position via Tailwind */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat opacity-50 
        bg-[center_-260px] 
        sm:bg-[center_-180px] 
        md:bg-[center_-190px] 
        min-[1350px]:bg-[center_-320px] 
        min-[1600px]:bg-[center_-450px]"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />
      
      {/* Preload Hint für Performance */}
      
      {/* Dynamischer Gradient - schwächer oben, stärker unten */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/20 to-stone-900" />
      
      {/* Extra sanfter Übergang am unteren Rand */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent" />
      
      {/* Content Container - Mit Flex-Grow für bessere Kontrolle */}
      <div className={`relative z-10 w-full max-w-6xl mx-auto px-4 pb-16 flex-grow flex flex-col justify-start space-y-8 ${
        todaysEvents.length > 0 ? 'pt-4 md:pt-6' : 'pt-16 md:pt-24'
      }`}>
        
        {/* HEUTE-BANNER: Nur anzeigen, wenn ein Termin heute ist */}
        {todaysEvents.length > 0 && (
          <div className="animate-bounce-slight w-full max-w-2xl mx-auto">
            <div className="bg-orange-600/90 text-white px-6 py-3 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.5)] border border-orange-400 flex items-center justify-center gap-3 backdrop-blur-md">
              <Bell className="animate-pulse flex-shrink-0" size={24} />
              <div className="text-center">
                <span className="font-bold uppercase tracking-wider text-sm block text-orange-200">Heute:</span>
                <span className="font-bold text-lg leading-tight">
                  {todaysEvents[0].titel} 
                  {todaysEvents[0].zeit && <span className="font-normal"> um {todaysEvents[0].zeit} Uhr</span>}
                  {todaysEvents[0].ort && (
                    <span className="text-orange-200 text-sm flex sm:inline-flex items-center justify-center sm:ml-2 gap-1 font-medium">
                       <MapPin size={14} /> {todaysEvents[0].ort}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

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

    {/* Trust Badges / Verbände Section */}
    <div className="bg-stone-800 border-b border-stone-700">
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
                
                {/* Kulturerbe */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-6 max-w-2xl text-center md:text-left">
                    <a href="https://www.unesco.de/staette/schwaebisch-alemannische-fastnacht/" target="_blank" rel="noopener noreferrer" className="block w-72 md:w-80 lg:w-96 hover:opacity-80 transition-opacity flex-shrink-0" title="Zum UNESCO-Eintrag">
                        <img src="/kulturerbe-logo.png" alt="Immaterielles Kulturerbe - Schwäbisch-Alemannische Fasnet" className="w-full h-auto object-contain rounded-xl" />
                    </a>
                    <div>
                        <h3 className="font-bold text-stone-100 uppercase text-xs tracking-wider mb-1">Immaterielles Kulturerbe</h3>
                        <p className="text-stone-400 text-sm leading-snug">
                            Die Fuchszunft ist als Teil der schwäbisch-alemannischen Fasnet im bundesweiten Verzeichnis eingetragen.
                        </p>
                    </div>
                </div>

                {/* Divider for Desktop */}
                <div className="hidden lg:block w-px h-12 bg-stone-600"></div>

                {/* Narrenvereinigung */}
                <div className="flex items-center gap-4 max-w-md">
                    <div className="bg-orange-900/40 p-3 rounded-full text-orange-400">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h3 className="font-bold text-stone-100 uppercase text-xs tracking-wider mb-1">Stolzes Mitglied</h3>
                        <p className="text-stone-400 text-sm leading-snug">
                            Wir sind Gründungsmitglied der <br/><strong>Narrenvereinigung Hegau-Bodensee.</strong>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>

    {/* Teaser Grid */}
    <div className="container mx-auto px-4 pt-12 pb-12">
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
