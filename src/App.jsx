import React, { useState, useEffect, lazy, Suspense } from 'react';
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

// Sections - Home wird direkt geladen, Rest lazy
import HomeSection from './sections/HomeSection';
const NewsSection = lazy(() => import('./sections/NewsSection'));
const AktuellesSection = lazy(() => import('./sections/AktuellesSection'));
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
    // Check local storage or system preference
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

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
    const LoadingSpinner = () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );

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

      <main className="flex-grow pt-20">
        {renderContent()}
      </main>

      <Footer setActiveTab={setActiveTab} />
      
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
