import React from 'react';
import { Phone, Mail, Download, FileText, BookOpen } from 'lucide-react';

const KontaktSection = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
    <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-12 text-center">Kontakt & Service</h2>
    
    <div className="grid md:grid-cols-2 gap-12 mb-16">
      <div>
        <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-6">Ansprechpartner</h3>
        <div className="space-y-6">
          <div>
            <p className="font-bold text-stone-900 dark:text-stone-100 text-lg">Präsident</p>
            <p className="text-lg text-stone-800 dark:text-stone-200">Winfried Stengele</p>
            <p className="text-stone-600 dark:text-stone-300">Brunnenäcker 9<br/>88605 Meßkirch-Menningen</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <a href="tel:01623029546" className="flex items-center gap-3 text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-stone-50 dark:bg-stone-800 p-4 rounded-lg border border-stone-200 dark:border-stone-700 hover:shadow-md">
              <Phone size={20} />
              <span className="font-mono font-medium">0162 / 3029546</span>
            </a>
            <a href="mailto:Fuchszunft-Menningen@t-online.de" className="flex items-center gap-3 text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-stone-50 dark:bg-stone-800 p-4 rounded-lg border border-stone-200 dark:border-stone-700 hover:shadow-md">
              <Mail size={20} />
              <span className="font-medium">Fuchszunft-Menningen@t-online.de</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-stone-100 dark:bg-stone-800 p-8 rounded-2xl border border-stone-200 dark:border-stone-700">
        <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-6 flex items-center gap-2">
          <Download size={24} className="text-green-700 dark:text-green-500" /> Downloads
        </h3>
        <p className="text-stone-600 dark:text-stone-300 mb-6 text-sm">
          Hier finden Sie wichtige Dokumente zum Verein. Werden Sie Teil der Tradition!
        </p>
        <div className="space-y-3">
          <button className="w-full bg-white dark:bg-stone-700 hover:bg-orange-50 dark:hover:bg-orange-900/30 text-left px-4 py-3 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 flex items-center justify-between group transition-all hover:border-orange-200 dark:hover:border-orange-800">
            <span className="flex items-center gap-2 font-medium text-stone-700 dark:text-stone-300 group-hover:text-orange-700 dark:group-hover:text-orange-400">
              <FileText size={18} /> Beitrittserklärung (PDF)
            </span>
            <Download size={16} className="text-stone-400 dark:text-stone-500 group-hover:text-orange-600 dark:group-hover:text-orange-400" />
          </button>
          <button className="w-full bg-white dark:bg-stone-700 hover:bg-orange-50 dark:hover:bg-orange-900/30 text-left px-4 py-3 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 flex items-center justify-between group transition-all hover:border-orange-200 dark:hover:border-orange-800">
            <span className="flex items-center gap-2 font-medium text-stone-700 dark:text-stone-300 group-hover:text-orange-700 dark:group-hover:text-orange-400">
              <BookOpen size={18} /> Vereinssatzung (PDF)
            </span>
            <Download size={16} className="text-stone-400 dark:text-stone-500 group-hover:text-orange-600 dark:group-hover:text-orange-400" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default KontaktSection;
