import React from 'react';
import { FileText, Calendar, Users, ChevronRight } from 'lucide-react';
import Countdown from '../components/Countdown';
import heroBg from '../assets/Gesamt.jpg';

const HomeSection = ({ setActiveTab }) => (
  <div className="animate-fadeIn">
    {/* Hero */}
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-stone-900">
      <div 
        className="absolute inset-0 opacity-50 bg-cover bg-[center_bottom_40%] transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
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

export default HomeSection;
