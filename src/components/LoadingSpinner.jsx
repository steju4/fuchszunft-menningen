import React from 'react';

const LoadingSpinner = () => (
  <div 
    className="flex items-center justify-center min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300"
    role="status"
    aria-live="polite"
    aria-label="Inhalt wird geladen"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" aria-hidden="true"></div>
      <span className="text-stone-500 dark:text-stone-400 font-medium animate-pulse">Lade Inhalte...</span>
    </div>
  </div>
);

export default LoadingSpinner;
