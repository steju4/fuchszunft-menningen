import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import Instagram from '../components/Instagram';
import { newsArticles } from '../data/newsData';

const NewsSection = ({ selectedArticle, setSelectedArticle }) => {
  if (selectedArticle) {
    const article = newsArticles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="mb-8 flex items-center gap-2 text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 font-medium transition-colors"
        >
          ← Zurück zu den Neuigkeiten
        </button>
        
        <article className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
          {article.image && (
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-64 object-cover"
            />
          )}
          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4 text-sm text-stone-500 dark:text-stone-400">
              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full font-medium">
                {article.category}
              </span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.author}</span>
            </div>
            
            <h1 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="prose prose-lg prose-stone dark:prose-invert max-w-none">
              {article.content.split('\n').map((paragraph, idx) => {
                if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                  return (
                    <h3 key={idx} className="text-xl font-bold text-stone-800 dark:text-stone-100 mt-8 mb-4">
                      {paragraph.trim().slice(2, -2)}
                    </h3>
                  );
                }
                if (paragraph.trim().startsWith('- ')) {
                  return (
                    <li key={idx} className="ml-4 text-stone-600 dark:text-stone-300 leading-relaxed">
                      {paragraph.trim().slice(2)}
                    </li>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={idx} className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                      {paragraph.trim()}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4">Aktuelles aus der Zunft</h2>
        <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto mb-6">
          Hier erfahrt Ihr alle Neuigkeiten rund um die Fuchszunft Menningen - von Fasnetvorbereitungen bis zu Veranstaltungen in der Zunftstube.
        </p>
        
        <a 
          href="https://www.instagram.com/fuchszunft_menningen/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
        >
          <Instagram size={20} />
          Folge uns auch auf Instagram für aktuelle Infos!
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[...newsArticles].reverse().map((article) => (
          <article 
            key={article.id}
            onClick={() => setSelectedArticle(article.id)}
            className="bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="h-48 overflow-hidden bg-stone-100">
              {article.image ? (
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 group-hover:scale-105 transition-transform duration-300">
                  <ImageIcon className="text-stone-300 w-12 h-12" />
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded text-xs font-medium">
                  {article.category}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400">{article.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-tight">
                {article.title}
              </h3>
              
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-4">
                {article.preview}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">{article.author}</span>
                <span className="text-orange-600 dark:text-orange-400 text-sm font-medium group-hover:text-orange-800 dark:group-hover:text-orange-300 transition-colors">
                  Weiterlesen →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
