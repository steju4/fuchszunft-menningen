import React, { useState, useMemo } from 'react';
import { Image as ImageIcon, Youtube } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import galleryData from '../data/galleryImages.json';

const GalerieSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentAlbumImages, setCurrentAlbumImages] = useState([]);
  
  // URL zum YouTube Kanal
  const youtubeChannelUrl = "https://www.youtube.com/@fuxstv7541"; 

  // Daten für die Anzeige aufbereiten
  const albums = useMemo(() => {
    const processedAlbums = [];
    
    // Iteriere über Jahre (z.B. "2025")
    Object.keys(galleryData).sort((a, b) => b - a).forEach(year => {
      const yearAlbums = galleryData[year];
      
      // Iteriere über Alben innerhalb des Jahres (z.B. "Fasnet")
      Object.keys(yearAlbums).forEach(albumName => {
        const images = yearAlbums[albumName];
        
        // Nur Alben mit Bildern anzeigen
        if (Array.isArray(images) && images.length > 0) {
          processedAlbums.push({
            id: `${year}-${albumName}`,
            year,
            title: albumName, // z.B. "Fasnet"
            fullTitle: `${albumName} ${year}`,
            coverImage: images[0], // Erstes Bild als Cover
            images: images.map(src => ({ src })), // Format für Lightbox
            count: images.length
          });
        }
      });
    });
    
    return processedAlbums;
  }, []);

  const openAlbum = (album) => {
    setCurrentAlbumImages(album.images);
    setLightboxOpen(true);
  };

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

      {/* Bildergalerie Section */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
            <ImageIcon className="text-orange-600" size={32} />
            <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Bildergalerien</h3>
        </div>

        {albums.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {albums.map((album) => (
                 <div 
                  key={album.id} 
                  onClick={() => openAlbum(album)}
                  className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer h-[250px] bg-stone-200 dark:bg-stone-800"
                >
                     {/* Image for SEO & Accessibility */}
                     <img 
                      src={album.coverImage}
                      alt={`Galerie Album: ${album.fullTitle}`}
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
        ) : (
          <div className="bg-orange-50 dark:bg-orange-900/10 border-2 border-dashed border-orange-200 dark:border-orange-800 rounded-2xl p-12 text-center">
            <ImageIcon size={48} className="text-orange-300 mb-4 mx-auto" />
            <h4 className="font-bold text-stone-700 dark:text-stone-300 mb-2">Noch keine Galerien verfügbar</h4>
            <p className="text-stone-500 dark:text-stone-400">
                Schau später wieder vorbei!
            </p>
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={currentAlbumImages}
        controller={{ closeOnBackdropClick: true }}
      />
    </div>
  );
};


export default GalerieSection;

