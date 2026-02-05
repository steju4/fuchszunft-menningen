import { useState, useEffect } from 'react';

const useImagePreloader = (imageSources) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Wenn keine Bilder da sind, sind wir "fertig"
    if (!imageSources || imageSources.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const total = imageSources.length;

    const checkDone = () => {
      loadedCount++;
      if (loadedCount === total) {
        setImagesLoaded(true);
      }
    };

    imageSources.forEach(src => {
      const img = new Image();
      img.src = src;
      // Egal ob Erfolg oder Fehler, wir zählen weiter, damit es nicht "hängt"
      if (img.complete) {
        checkDone();
      } else {
        img.onload = checkDone;
        img.onerror = checkDone;
      }
    });

    // Cleanup nicht nötig, da Image-Objekte garbage collected werden
  }, [imageSources]); // Dependency array sicherstellen

  return imagesLoaded;
};

export default useImagePreloader;
