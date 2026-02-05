import { useEffect } from 'react';

const SEO = ({ title, description, url, image }) => {
  useEffect(() => {
    // 1. Titel setzen
    document.title = title;

    // Helper function to set meta tag
    const setMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element && value) {
        element = document.createElement('meta');
        
        // Parse selector to set attributes (simple parser for this specific use case)
        if (selector.includes('[property="')) {
             element.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
        } else if (selector.includes('[name="')) {
             element.name = selector.match(/name="([^"]+)"/)[1];
        }
        
        document.head.appendChild(element);
      }
      if (element && value) {
        element.setAttribute(attribute, value);
      }
    };

    // Helper for link tags (canonical)
    const setLinkTag = (rel, href) => {
        let element = document.querySelector(`link[rel="${rel}"]`);
        if (!element && href) {
            element = document.createElement('link');
            element.rel = rel;
            document.head.appendChild(element);
        }
        if (element && href) {
            element.href = href;
        }
    }

    // 2. Standard Meta Description
    setMetaTag('meta[name="description"]', 'content', description);

    // 3. Open Graph Tags (Facebook, WhatsApp, LinkedIn)
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    if (url) {
        setMetaTag('meta[property="og:url"]', 'content', url);
        setLinkTag('canonical', url);
    }
    if (image) {
        setMetaTag('meta[property="og:image"]', 'content', image);
    }

    // Cleanup nicht zwingend nötig für SPA transitionen, da Werte überschrieben werden
  }, [title, description, url, image]);

  return null;
};

export default SEO;

