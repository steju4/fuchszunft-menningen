import { useState, useEffect } from 'react';

const useImagePreloader = (imageSources) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Reset state bei neuen Bildern
    setImagesLoaded(false);

    // Wenn keine Bilder da sind, sind wir "fertig"
    if (!imageSources || imageSources.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const total = imageSources.length;

    const checkDone = () => {
      if (!isMounted) return;
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

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(imageSources)]); 

  return imagesLoaded;
};

export default useImagePreloader;
