import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

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

      <div className="bg-stone-100 dark:bg-stone-800 p-8 rounded-2xl border border-stone-200 dark:border-stone-700 h-full flex flex-col">
        <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4 flex items-center gap-2">
          <MapPin size={24} className="text-orange-600 dark:text-orange-500" /> Anfahrt
        </h3>
        <p className="text-stone-600 dark:text-stone-300 mb-4 leading-relaxed">
          Unsere Zunftstube befindet sich zentral in Menningen.
        </p>

        <div className="flex-grow rounded-lg overflow-hidden border border-stone-200 dark:border-stone-600 shadow-sm min-h-[300px]">
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://maps.google.com/maps?width=100%25&height=600&hl=de&q=Zunftstube,+Fuchszunft+Menningen+e.V.&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                title="Standort Zunftstube"
                className="w-full h-full"
            ></iframe>
        </div>
        <div className="mt-4 text-center">
             <a 
              href="https://maps.app.goo.gl/JaQXzCpmsXcEoPhPA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 underline"
            >
              In Google Maps öffnen
            </a>
        </div>
      </div>
    </div>
  </div>
);

export default KontaktSection;
