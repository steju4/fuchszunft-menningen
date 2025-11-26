import React from 'react';
import { Mail } from 'lucide-react';
import Instagram from './Instagram';

const Footer = ({ setActiveTab }) => {
  return (
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
  );
};

export default Footer;
