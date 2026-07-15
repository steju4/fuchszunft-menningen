import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Assets for Preloading
// Wir importieren die wichtigen Bilder hier, um sie vorzuladen
import heroBg from './assets/Gesamt.webp';
import fuechseGif from './assets/unnamed.webp';
import zunftstubeImg from './assets/Zunftstube.webp';


// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SEO from './components/SEO';
import LoadingSpinner from './components/LoadingSpinner';
import { PAGE_TABS, getSeoData } from './data/seoData';

// Sections - Home wird direkt geladen, Rest lazy mit Preload
import HomeSection from './sections/HomeSection';
import NotFoundSection from './sections/NotFoundSection';
const NewsSection = lazy(() => import('./sections/NewsSection'));
const AktuellesSection = lazy(() => import('./sections/AktuellesSection'));
const GalerieSection = lazy(() => import('./sections/GalerieSection'));
const FigurenSection = lazy(() => import('./sections/FigurenSection'));
const GeschichteSection = lazy(() => import('./sections/GeschichteSection'));
const ZunftstubeSection = lazy(() => import('./sections/ZunftstubeSection'));
const KontaktSection = lazy(() => import('./sections/KontaktSection'));
const ImpressumSection = lazy(() => import('./sections/ImpressumSection'));
const DatenschutzSection = lazy(() => import('./sections/DatenschutzSection'));

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const isFirstRun = useRef(true);

  // Initial Load: URL checken
  useEffect(() => {
    const path = window.location.pathname.substring(1);

    if (path === '') {
      setActiveTab('home');
    } else if (PAGE_TABS.includes(path)) {
      setActiveTab(path);
    } else {
      setActiveTab('notfound');
    }
  }, []);

  const currentSeo = getSeoData(activeTab);

  // Update URL und Scroll-Position wenn Tab wechselt
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    // 1. Nach oben scrollen bei Tab-Wechsel
    window.scrollTo(0, 0);

    // 2. URL aktualisieren (bei 404 bleibt die ursprünglich aufgerufene,
    // fehlerhafte URL sichtbar, damit sie nicht überschrieben wird)
    if (activeTab === 'notfound') {
      return;
    }
    const path = activeTab === 'home' ? '/' : `/${activeTab}`;
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [activeTab]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1);

      if (path === '' || path === 'home') {
        setActiveTab('home');
      } else if (PAGE_TABS.includes(path)) {
        setActiveTab(path);
      } else {
        setActiveTab('notfound');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Preload wichtige Sections UND BILDER im Hintergrund nach Initial Load
  useEffect(() => {
    // 1. Module (Code) vorladen
    const timer = setTimeout(() => {
      import('./sections/NewsSection');
      import('./sections/AktuellesSection');
      import('./sections/FigurenSection');
      import('./sections/ZunftstubeSection');

      // 2. Bilder vorladen (damit sie beim Klick sofort da sind)
      const imagesToPreload = [
        // heroBg entfernt - wird nativ geladen
        fuechseGif,   // Für Figuren-Seite
        zunftstubeImg // Für Zunftstube-Seite
      ];

      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onerror = (e) => console.warn('Konnte Bild nicht preloaden:', src, e); 
      });

    }, 2000); // 2 Sekunden warten, damit Initial Load nicht blockiert wird
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSection setActiveTab={setActiveTab} />;
      case 'news':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <NewsSection selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} />
          </Suspense>
        );
      case 'termine':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AktuellesSection />
          </Suspense>
        );
      case 'galerie':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <GalerieSection />
          </Suspense>
        );
      case 'figuren':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <FigurenSection />
          </Suspense>
        );
      case 'geschichte':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <GeschichteSection />
          </Suspense>
        );
      case 'zunftstube':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ZunftstubeSection />
          </Suspense>
        );
      case 'kontakt':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <KontaktSection />
          </Suspense>
        );
      case 'impressum':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ImpressumSection />
          </Suspense>
        );
      case 'datenschutz':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DatenschutzSection />
          </Suspense>
        );
      case 'notfound':
        return <NotFoundSection setActiveTab={setActiveTab} />;
      default:
        return <HomeSection setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-900 font-sans text-stone-900 dark:text-stone-100 selection:bg-orange-200 selection:text-orange-900 transition-colors duration-300">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        scrolled={scrolled}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <SEO title={currentSeo.title} description={currentSeo.desc} url={currentSeo.url} noindex={currentSeo.noindex} />

      <main className="grow pt-20">
        <ErrorBoundary>
          {renderContent()}
        </ErrorBoundary>
      </main>

      <Footer setActiveTab={setActiveTab} />
      
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
