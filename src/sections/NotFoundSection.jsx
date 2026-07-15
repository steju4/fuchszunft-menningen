import React from 'react';
import { Compass } from 'lucide-react';

const NotFoundSection = ({ setActiveTab }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
      <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full w-20 h-20 flex items-center justify-center mb-6">
        <Compass size={40} className="text-orange-600 dark:text-orange-400" />
      </div>
      <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2">404 – Seite nicht gefunden</h1>
      <p className="text-stone-600 dark:text-stone-300 mb-8 max-w-md">
        Die aufgerufene Seite gibt es nicht (mehr). Vielleicht wurde der Link falsch eingegeben oder die Seite wurde umbenannt.
      </p>
      <button
        onClick={() => setActiveTab('home')}
        className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-full transition-colors shadow-md"
      >
        Zur Startseite
      </button>
    </div>
  );
};

export default NotFoundSection;
