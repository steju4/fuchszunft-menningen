import React, { useState } from 'react';
import { Menu, X, Home, FileText, Calendar, Users, BookOpen, House, Mail, Sun, Moon, Image as ImageIcon, ChevronDown } from 'lucide-react';
import wappenImg from '../assets/FZ Wappen digital_klein.png';

const Navigation = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen, darkMode, toggleDarkMode }) => {
  const navItems = [
    { id: 'home', label: 'Startseite', icon: Home },
    { id: 'news', label: 'Aktuelles', icon: FileText },
    { id: 'termine', label: 'Termine', icon: Calendar },
    { id: 'galerie', label: 'Galerie', icon: ImageIcon },
    { 
      id: 'verein', 
      label: 'Die Zunft', 
      icon: Users,
      isDropdown: true,
      subItems: [
        { id: 'figuren', label: 'Figuren', icon: Users },
        { id: 'geschichte', label: 'Geschichte', icon: BookOpen },
        { id: 'zunftstube', label: 'Zunftstube', icon: House },
      ]
    },
    { id: 'kontakt', label: 'Kontakt', icon: Mail },
  ];

  // Helper zum Checken ob ein (Sub-)Tab aktiv ist
  const isActive = (item) => {
    if (activeTab === item.id) return true;
    if (item.subItems) {
      return item.subItems.some(sub => sub.id === activeTab);
    }
    return false;
  };

  return (
    <nav className="bg-stone-900 dark:bg-stone-950 text-white shadow-lg fixed top-0 left-0 right-0 z-50 border-b-4 border-orange-600">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="flex justify-between items-center h-20">
          {/* Logo Area */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="transform group-hover:rotate-12 transition-transform">
              <img src={wappenImg} alt="Fuchszunft Wappen" className="h-12 w-auto drop-shadow-md" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-xl tracking-wide uppercase">Fuchszunft</div>
              <div className="text-orange-400 text-sm font-medium">Menningen e.V.</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-1 items-center">
            {navItems.map((item) => {
              if (item.isDropdown) {
                return (
                  <div key={item.id} className="relative group">
                    <button
                      className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 font-medium ${
                        isActive(item)
                          ? 'bg-orange-600 text-white shadow-md' 
                          : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                      }`}
                    >
                      <item.icon size={16} />
                      {item.label}
                      <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform" />
                    </button>
                    
                    {/* Dropdown Content */}
                    <div className="absolute left-0 mt-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                      <div className="bg-stone-800 rounded-lg shadow-xl border border-stone-700 overflow-hidden">
                        {item.subItems.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => setActiveTab(sub.id)}
                            className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                               activeTab === sub.id
                                ? 'bg-orange-600/20 text-orange-400 font-bold'
                                : 'text-stone-300 hover:bg-stone-700 hover:text-white'
                            }`}
                          >
                             <sub.icon size={16} />
                             {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 font-medium ${
                    isActive(item)
                      ? 'bg-orange-600 text-white shadow-md transform scale-105' 
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              );
            })}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full hover:bg-stone-800 transition-colors text-stone-300 hover:text-white"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-stone-300 hover:text-white"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button 
              className="p-2 text-stone-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden bg-stone-800 border-t border-stone-700 absolute w-full left-0 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              if (item.isDropdown) {
                 return (
                   <div key={item.id} className="bg-stone-900/50 rounded-lg p-2">
                      <div className="px-4 py-2 text-stone-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                         <item.icon size={14} /> {item.label}
                      </div>
                      <div className="pl-4 mt-1 space-y-1">
                        {item.subItems.map(sub => (
                             <button
                                key={sub.id}
                                onClick={() => {
                                  setActiveTab(sub.id);
                                  setIsMenuOpen(false);
                                }}
                                className={`w-full p-3 rounded-lg text-left flex items-center gap-3 ${
                                  activeTab === sub.id 
                                    ? 'bg-orange-600 text-white' 
                                    : 'text-stone-300 hover:bg-stone-700'
                                }`}
                              >
                                <sub.icon size={18} />
                                <span className="text-base">{sub.label}</span>
                              </button>
                        ))}
                      </div>
                   </div>
                 );
              }

              return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`p-4 rounded-lg text-left flex items-center gap-3 ${
                  activeTab === item.id 
                    ? 'bg-orange-600 text-white' 
                    : 'text-stone-300 hover:bg-stone-700'
                }`}
              >
                <item.icon size={20} />
                <span className="text-lg">{item.label}</span>
              </button>
            )})}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
