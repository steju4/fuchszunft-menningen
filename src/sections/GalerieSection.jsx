import React from 'react';
import { Image as ImageIcon, Youtube } from 'lucide-react';

// Beispiel-Daten für Galerie-Album
const albums = [
  {
    year: '2025',
    title: 'Fasnet 2025',
    coverImage: '/src/assets/Gesamt.jpg', // Nutzung vorhandener Assets als Platzhalter
    count: 42
  },
  {
    year: '2024',
    title: 'Jubiläumsumzug',
    coverImage: '/src/assets/Zunftstube.jpg',
    count: 120
  }
];

const GalerieSection = () => {
    
  // URL zum YouTube Kanal (Platzhalter)
  const youtubeChannelUrl = "https://www.youtube.com/@fuxstv7541"; 

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4">Medien & Rückblick</h2>
        <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto mb-8">
          Eindrücke vergangener Tage, Umzüge und Veranstaltungen. Erlebe die Menninger Fasnet in Bild und Ton.
        </p>

        <a 
          href={youtubeChannelUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
        >
          <Youtube size={24} />
          Zum YouTube Kanal "Fuxstv"
        </a>
      </div>

      {/* Bildergalerie Section (Placeholder) */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
            <ImageIcon className="text-orange-600" size={32} />
            <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Bildergalerien</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Hinweis Card */}
           <div className="bg-orange-50 dark:bg-orange-900/10 border-2 border-dashed border-orange-200 dark:border-orange-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[250px]">
                <ImageIcon size={48} className="text-orange-300 mb-4" />
                <h4 className="font-bold text-stone-700 dark:text-stone-300 mb-2">Hier entstehen Galerien</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                    In Kürze findest du hier Fotos der letzten Fasnets-Saisons.
                </p>
           </div>
           
           {/* Beispiel Album Cards */}
           {albums.map((album, idx) => (
               <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer h-[250px]">
                   {/* Image for SEO & Accessibility */}
                   <img 
                    src={album.coverImage}
                    alt={`Galerie Album: ${album.title}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                   />
                   
                   {/* Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                        <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2">
                            {album.year}
                        </span>
                        <h4 className="text-white font-bold text-xl">{album.title}</h4>
                        <div className="flex items-center gap-1 text-stone-300 text-sm mt-1">
                            <ImageIcon size={14} /> {album.count} Bilder
                        </div>
                   </div>
               </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default GalerieSection;

