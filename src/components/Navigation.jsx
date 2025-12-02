import React from 'react';
import { Menu, X, Home, FileText, Calendar, Users, BookOpen, House, Mail, Sun, Moon } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen, darkMode, toggleDarkMode }) => {
  const navItems = [
    { id: 'home', label: 'Startseite', icon: Home },
    { id: 'news', label: 'Aktuelles', icon: FileText },
    { id: 'termine', label: 'Termine', icon: Calendar },
    { id: 'figuren', label: 'Zunftfiguren', icon: Users },
    { id: 'geschichte', label: 'Geschichte & Dorf', icon: BookOpen },
    { id: 'zunftstube', label: 'Zunftstube', icon: House },
    { id: 'kontakt', label: 'Kontakt', icon: Mail },
  ];

  return (
    <nav className="bg-stone-900 dark:bg-stone-950 text-white shadow-lg fixed top-0 left-0 right-0 z-50 border-b-4 border-orange-600">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Area */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="bg-orange-600 p-2 rounded-lg transform group-hover:rotate-12 transition-transform">
              <span className="text-3xl">🦊</span>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-xl tracking-wide uppercase">Fuchszunft</div>
              <div className="text-orange-400 text-sm font-medium">Menningen e.V.</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-1 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 font-medium ${
                  activeTab === item.id 
                    ? 'bg-orange-600 text-white shadow-md transform scale-105' 
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
            
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
        <div className="lg:hidden bg-stone-800 border-t border-stone-700 absolute w-full left-0 shadow-xl">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
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
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
