import React from 'react';
import { figuren } from '../data/figurenData';
import fuechseGif from '../assets/unnamed.gif';
import praesidiumImg from '../assets/1057c88a-73d0-40a5-bcf8-f60b018cdd56.webp';

const FigurenSection = () => {
  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4">Unsere Zunftfiguren</h2>
        <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
          Jede Figur hat ihre eigene Geschichte und Bedeutung für die Menninger Fasnet.
        </p>
      </div>

      {/* Bilder der Zunftfiguren - nebeneinander auf Desktop */}
      <div className="mb-16 flex flex-col lg:flex-row justify-center items-center gap-4">
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden w-full max-w-md">
          <div className="h-80 overflow-hidden bg-stone-100 dark:bg-stone-900 flex items-center justify-center">
            <img 
              src={fuechseGif} 
              alt="Füchse und Gausmates der Fuchszunft Menningen" 
              className="h-full w-auto object-contain"
              loading="lazy"
            />
          </div>
          <div className="px-4 py-6 text-center">
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2 leading-tight">Unsere Zunftfiguren</h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-snug">Menninger Füchse und Gausmates</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden w-full max-w-md">
          <div className="h-80 overflow-hidden bg-stone-100 dark:bg-stone-900">
            <img 
              src={praesidiumImg} 
              alt="Zunftpräsidium mit den kleinen Füchsen" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="px-4 py-6 text-center">
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2 leading-tight">Präsidium mit unseren kleinen Füchsen</h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-snug">&nbsp;</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {figuren.map((figur, idx) => (
          <div key={idx} className={`p-6 rounded-xl border-2 ${figur.color} hover:shadow-xl transition-all duration-300 group bg-white/50 dark:bg-stone-800`}>
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{figur.emoji}</div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">{figur.name}</h3>
              <span className="text-xs font-bold bg-white dark:bg-stone-700 px-2 py-1 rounded text-stone-600 dark:text-stone-300 shadow-sm">{figur.year}</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {figur.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FigurenSection;
