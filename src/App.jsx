import React, { useState, useEffect } from 'react';
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

// Sections
import HomeSection from './sections/HomeSection';
import NewsSection from './sections/NewsSection';
import AktuellesSection from './sections/AktuellesSection';
import FigurenSection from './sections/FigurenSection';
import GeschichteSection from './sections/GeschichteSection';
import ZunftstubeSection from './sections/ZunftstubeSection';
import KontaktSection from './sections/KontaktSection';
import ImpressumSection from './sections/ImpressumSection';
import DatenschutzSection from './sections/DatenschutzSection';

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
    switch (activeTab) {
      case 'home':
        return <HomeSection setActiveTab={setActiveTab} />;
      case 'news':
        return <NewsSection selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} />;
      case 'termine':
        return <AktuellesSection />;
      case 'figuren':
        return <FigurenSection />;
      case 'geschichte':
        return <GeschichteSection />;
      case 'zunftstube':
        return <ZunftstubeSection />;
      case 'kontakt':
        return <KontaktSection />;
      case 'impressum':
        return <ImpressumSection />;
      case 'datenschutz':
        return <DatenschutzSection />;
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
