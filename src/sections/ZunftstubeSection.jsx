import React from 'react';
import { Music, House } from 'lucide-react';
import Zunftstube from '../assets/Zunftstube.jpg';

const ZunftstubeSection = () => (
  <div className="animate-fadeIn">
    <div className="relative h-[400px] py-24 px-4 overflow-hidden bg-stone-900 dark:bg-stone-950">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 opacity-70 bg-cover bg-center"
        style={{ backgroundImage: `url(${Zunftstube})` }}
      />
      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/80 to-stone-900 dark:from-stone-950/90 dark:via-stone-950/80 dark:to-stone-950" />

      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      
      <div className="container mx-auto text-center max-w-3xl relative z-10">
        <Music size={48} className="mx-auto text-orange-500 mb-6" />
        <h2 className="text-4xl font-bold mb-6 text-white">Die Zunftstube</h2>
        <p className="text-xl text-stone-300 leading-relaxed">
          Seit 1985 unser ganzer Stolz. Ein Ort der Begegnung, der Kameradschaft und natürlich der Fasnet.
        </p>
      </div>
    </div>
    
    <div className="container mx-auto px-4 py-16 max-w-5xl -mt-10 relative z-20">
      <div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-xl mb-12">
        <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4">Ein eigenes Heim für die Zunft</h3>
        <p className="text-stone-600 dark:text-stone-300 mb-4 leading-relaxed">
          Im Jahr 1985 ging für die Fuchszunft ein lang gehegter Wunsch in Erfüllung. Nach zweijähriger Planungs- und Bauzeit konnte die Zunftstube eingeweiht werden. 
          Seither hat man Räumlichkeiten zur Aufbewahrung der Häser und Utensilien sowie ein Archiv für die Zunftunterlagen.
        </p>
        <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
          Durch unsere Zunftstube ist die Kameradschaft und der Zusammenhalt gewachsen. Sie ist längst eine Stätte der Begegnung geworden 
          und als Bestandteil des örtlichen Lebens nicht mehr wegzudenken – sei es bei Stammtischrunden, der Fasnetseröffnung oder Familienfesten.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-lg border-t-4 border-orange-500 hover:transform hover:-translate-y-1 transition-transform">
          <h3 className="font-bold text-xl mb-2 text-stone-800 dark:text-stone-100">Öffnungszeiten</h3>
          <p className="text-stone-600 dark:text-stone-300">
            Die Zunftstube ist als Schank-Gaststätte angemeldet und etwa jeden zweiten Montagabend für die Bevölkerung geöffnet.
          </p>
        </div>
        <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-lg border-t-4 border-green-600 hover:transform hover:-translate-y-1 transition-transform">
          <h3 className="font-bold text-xl mb-2 text-stone-800 dark:text-stone-100">Ausstattung</h3>
          <p className="text-stone-600 dark:text-stone-300">
            Kleine Küche, WC-Anlagen und ein Bewirtungsraum für Versammlungen, Sitzungen und kleine Feste.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ZunftstubeSection;
