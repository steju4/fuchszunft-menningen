import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

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
    <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-orange-200 selection:text-orange-900">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        scrolled={scrolled} 
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
