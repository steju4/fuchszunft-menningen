import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  useEffect(() => {
    // Titel setzen
    document.title = title;

    // Meta Description finden oder erstellen
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    
    // Description setzen
    metaDescription.setAttribute('content', description);

    // Cleanup (optional, setzt auf Default zurück wenn Komponente unmountet, 
    // hier aber nicht zwingend nötig da wir immer eine SEO Komponente haben)
    return () => {
        // Kann leer bleiben
    };
  }, [title, description]);

  return null;
};

export default SEO;
