import React from 'react';
import { FileText, Calendar, Users, ChevronRight } from 'lucide-react';
import Countdown from '../components/Countdown';
import heroBg from '../assets/Gesamt.jpg';

const HomeSection = ({ setActiveTab }) => (
  <div className="animate-fadeIn bg-stone-900">
    {/* Hero */}
    <div className="relative h-[520px] md:h-[610px] flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Preload hint for browser */}
      <div 
        className="absolute inset-0 opacity-50 bg-cover bg-[center_bottom_6rem] md:bg-[center_bottom_30%] transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/60" />
      
      {/* Soft transition to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-900 to-transparent" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mt-0 md:mt-8">
        <h1 className="inline-block text-3xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-orange-500 to-orange-600 mb-20 md:mb-32 leading-tight bg-stone-950/90 backdrop-blur-sm px-5 py-3 md:px-10 md:py-6 rounded-xl md:rounded-2xl border-2 border-orange-500/40 shadow-[0_0_40px_-10px_rgba(234,88,12,0.3)]">
          Fuchs - Narro!
        </h1>
        <p className="text-base md:text-xl text-stone-200 mb-5 md:mb-8 max-w-2xl mx-auto leading-relaxed font-semibold md:font-bold">
          Herzlich Willkommen bei der <strong>Grafschaft Fuchsbühl</strong> zu Menningen.
          Wir freuen uns auf eine glückselige Fasnet im Ablachtal!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-4 md:mb-8">
          <button 
            onClick={() => setActiveTab('news')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 border border-orange-500"
          >
            <FileText size={18} className="md:w-5 md:h-5" /> Aktuelle Neuigkeiten
          </button>
          <button 
            onClick={() => setActiveTab('termine')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2"
          >
            <Calendar size={18} className="md:w-5 md:h-5" /> Termine 2026
          </button>
          <button 
            onClick={() => setActiveTab('figuren')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2"
          >
            <Users size={18} className="md:w-5 md:h-5" /> Zunftfiguren
          </button>
        </div>

        <div className="hidden md:block">
          <Countdown />
        </div>
      </div>
    </div>

    {/* Mobile Countdown */}
    <div className="md:hidden bg-stone-900 py-0">
      <Countdown />
    </div>

    {/* Teaser Grid */}
    <div className="container mx-auto px-4 py-8 md:py-16 mt-0 md:mt-4 md:-mt-12 relative z-10 md:z-20">
      <div className="grid md:grid-cols-3 gap-4 md:gap-8">
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

export default HomeSection;
