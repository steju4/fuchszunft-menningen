import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Assets for Preloading
import heroBg from './assets/Gesamt.jpg';
import fuechseGif from './assets/unnamed.gif';
import praesidiumImg from './assets/1057c88a-73d0-40a5-bcf8-f60b018cdd56.webp';
import liedGif from './assets/unnamed (1).gif';
import zunftstubeImg from './assets/Zunftstube.jpg';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SEO from './components/SEO';

// Sections - Home wird direkt geladen, Rest lazy mit Preload
import HomeSection from './sections/HomeSection';
const NewsSection = lazy(() => import('./sections/NewsSection'));
const AktuellesSection = lazy(() => import('./sections/AktuellesSection'));
const GalerieSection = lazy(() => import('./sections/GalerieSection'));
const FigurenSection = lazy(() => import('./sections/FigurenSection'));
const GeschichteSection = lazy(() => import('./sections/GeschichteSection'));
const ZunftstubeSection = lazy(() => import('./sections/ZunftstubeSection'));
const KontaktSection = lazy(() => import('./sections/KontaktSection'));
const ImpressumSection = lazy(() => import('./sections/ImpressumSection'));
const DatenschutzSection = lazy(() => import('./sections/DatenschutzSection'));

// Loading Spinner Component - außerhalb damit es nicht bei jedem Render neu erstellt wird
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
  </div>
);

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
    const validTabs = ['news', 'termine', 'galerie', 'figuren', 'geschichte', 'zunftstube', 'kontakt', 'impressum', 'datenschutz'];

    if (validTabs.includes(path)) {
      setActiveTab(path);
    }
  }, []);

  // SEO Daten Mapping
  const getSeoData = (tab) => {
    const baseUrl = "https://fuchszunft-menningen.de";
    const data = {
      home: { 
        title: "Fuchszunft Menningen e.V.", 
        desc: "Offizielle Website der Fuchszunft Menningen e.V. - Alle Infos zur Fasnet, unseren Figuren Fuchs & Henne und aktuellen Terminen.",
        url: `${baseUrl}/`
      },
      news: { 
        title: "News | Fuchszunft Menningen", 
        desc: "Aktuelle Neuigkeiten und Berichte der Fuchszunft Menningen. Bleib auf dem Laufenden über unser Vereinsleben.",
        url: `${baseUrl}/news`
      },
      termine: { 
        title: "Termine | Fuchszunft Menningen", 
        desc: "Aktuelle Termine: Alle Umzüge, Veranstaltungen und Termine der Fuchszunft im Überblick.",
        url: `${baseUrl}/termine`
      },
      galerie: {
        title: "Galerie & Videos | Fuchszunft Menningen",
        desc: "Bilder und Videos der Fuchszunft Menningen. Rückblicke auf Fasnachtsumzüge und Veranstaltungen.",
        url: `${baseUrl}/galerie`
      },
      figuren: { 
        title: "Figuren | Fuchszunft Menningen", 
        desc: "Unsere Figuren vorgestellt: Der Fuchs, die Gausmates und alle weiteren Figuren. Alles zu Häs und Geschichte.",
        url: `${baseUrl}/figuren`
      },
      geschichte: { 
        title: "Geschichte | Fuchszunft Menningen", 
        desc: "Die Chronik der Fuchszunft Menningen: Von der Gründung bis heute. Erfahre mehr über unsere Wurzeln.",
        url: `${baseUrl}/geschichte`
      },
      zunftstube: { 
        title: "Zunftstube | Fuchszunft Menningen", 
        desc: "Die Zunftstube Menningen: Unser Treffpunkt. Infos zu Veranstaltungen und Vermietung.",
        url: `${baseUrl}/zunftstube`
      },
      kontakt: { 
        title: "Kontakt | Fuchszunft Menningen", 
        desc: "Kontakt zur Fuchszunft Menningen e.V. - Wir freuen uns auf deine Nachricht.",
        url: `${baseUrl}/kontakt`
      },
      impressum: { 
        title: "Impressum | Fuchszunft Menningen", 
        desc: "Impressum und rechtliche Angaben der Fuchszunft Menningen e.V.",
        url: `${baseUrl}/impressum`
      },
      datenschutz: { 
        title: "Datenschutz | Fuchszunft Menningen", 
        desc: "Datenschutzerklärung der Fuchszunft Menningen e.V.",
        url: `${baseUrl}/datenschutz`
      }
    };
    return data[tab] || data.home;
  };


  const currentSeo = getSeoData(activeTab);

  // Update URL und Scroll-Position wenn Tab wechselt
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    // 1. Nach oben scrollen bei Tab-Wechsel
    window.scrollTo(0, 0);

    // 2. URL aktualisieren
    const path = activeTab === 'home' ? '/' : `/${activeTab}`;
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [activeTab]);

      const validTabs = ['news', 'termine', 'galerie', 'figuren', 'geschichte', 'zunftstube', 'kontakt', 'impressum', 'datenschutz'];
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1);
      const validTabs = ['news', 'termine', 'figuren', 'geschichte', 'zunftstube', 'kontakt', 'impressum', 'datenschutz'];
      
      if (validTabs.includes(path)) {
        setActiveTab(path);
      } else if (path === '' || path === 'home') {
        setActiveTab('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Preload wichtige Sections im Hintergrund nach Initial Load
  useEffect(() => {
    // Preload nach 2 Sekunden, wenn User noch auf der Seite ist
    const timer = setTimeout(() => {
      import('./sections/NewsSection');
      import('./sections/AktuellesSection');
      import('./sections/FigurenSection');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Preload critical images
  useEffect(() => {
    const imagesToPreload = [
      heroBg,
      fuechseGif,
      praesidiumImg,
      liedGif,
      zunftstubeImg
    ];

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
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

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [activeTab]);

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

      <SEO title={currentSeo.title} description={currentSeo.desc} url={currentSeo.url} />

      <main className="flex-grow pt-20">
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
