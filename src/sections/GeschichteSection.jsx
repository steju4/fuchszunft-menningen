import React from 'react';
import { Info, Music, BookOpen, MapPin, Calendar, Users } from 'lucide-react';
import liedGif from '../assets/unnamed (1).gif';

const GeschichteSection = () => (
  <div className="container mx-auto px-4 py-12 max-w-5xl animate-fadeIn">
    <div className="prose prose-lg prose-stone dark:prose-invert mx-auto max-w-none">
      <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-12 text-center">Von Rittern und Füchsen</h2>
      
      {/* 1. Dorf Menningen & Info (Moved Up) */}
      <div className="grid md:grid-cols-2 gap-8 mb-16 items-start">
        <div className="space-y-4">
           <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
             <MapPin className="text-orange-600" /> Unser Dorf Menningen
           </h3>
           <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
            Menningen (seit 1974 Teilort von Meßkirch) liegt im Ablachtal und besteht ursprünglich aus zwei Dörfern, die 1932 vereint wurden.
            Links der Ablach liegt <strong>Menningen</strong> mit der St. Johannes Kirche.
            Rechts der Ablach, im früheren <strong>Leitishofen</strong>, steht das ehemalige Gremlichsche Schloss.
            Heute hat das Dorf knapp 500 Einwohner und ein reges Vereinsleben.
           </p>
        </div>
        <div className="bg-green-900 dark:bg-green-950 text-white p-6 rounded-xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <h4 className="font-bold mb-3 text-green-300 flex items-center gap-2"><BookOpen size={18}/> Schon gewusst?</h4>
          <p className="text-sm leading-relaxed opacity-90">
            Das Wappen der Herren von Gremlich spielt in unserer Zunft eine große Rolle. 
            Das Zunftpräsidium trägt Gewänder, die an diese Adelsfamilie erinnern. 
            Auch das Menninger Wasserschloss geht auf eine alte Wasserburg zurück.
          </p>
        </div>
      </div>

      {/* 2. Entstehung (Middle) - Styled as Timeline/Cards */}
      <div className="mb-16">
        <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-4 inline-flex items-center gap-2">
            <Info size={24} /> Entstehung und Gründung
            </h3>
            <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
                Mitte der 50er-Jahre war die Nachkriegseuphorie abgeflacht und es herrschte oft Geldnot. 
                Man suchte nach einer Möglichkeit, die Fasnet auf feste Beine zu stellen – es fehlte eine Identifikationsfigur.
            </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-stone-50 dark:bg-stone-800 p-6 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-center gap-2 text-orange-600 font-bold mb-3">
                    <Calendar size={18}/> <span>Die Idee</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Bahnhofswirt <strong>Karl Hänsler</strong> hatte die Idee: Inspiriert vom "Fuchsbühl" und den dort lebenden Füchsen, die oft Hühner stahlen ("übel hausten"). 
                    Erwin Kleiner schnitzte die erste Maske.
                </p>
            </div>

            {/* Card 2 */}
            <div className="bg-stone-50 dark:bg-stone-800 p-6 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-center gap-2 text-orange-600 font-bold mb-3">
                    <Calendar size={18}/> <span>22. Jan 1956</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    <strong>Erster Auftritt:</strong> Beim Bürgerball im Gasthaus "Adler" traten überraschend die ersten beiden Füchse (Karl Hänsler und Adolf Seifritz) auf.
                </p>
            </div>

            {/* Card 3 */}
            <div className="bg-stone-50 dark:bg-stone-800 p-6 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-center gap-2 text-orange-600 font-bold mb-3">
                    <Calendar size={18}/> <span>10. Jan 1957</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Offizielle Gründung im Gasthaus "Bahnhof" mit 8 Mitgliedern. Name: "Grafschaft Fuchsbühl zu Menningen" (wegen der Gremlich-Ritter).
                    <br/><br/>
                    <span className="font-semibold text-orange-700 dark:text-orange-400">Übrigens:</span> Die Fuchszunft ist stolzes Gründungsmitglied der Narrenvereinigung Hegau-Bodensee.
                </p>
            </div>
        </div>
      </div>

      {/* 3. Zunftlied & Gründungsmitglieder (Side by Side) */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        
        {/* Zunftlied - Compact */}
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-200 dark:border-orange-800 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-orange-700 dark:text-orange-400 mb-4 flex items-center gap-2 justify-center">
            <Music size={20} /> Das Menninger Zunftlied
            </h3>
            <div className="flex-grow flex flex-col justify-center items-center">
                <div className="bg-white dark:bg-stone-800 rounded-lg shadow-md border border-orange-200 dark:border-orange-800 overflow-hidden max-w-sm w-full">
                    <img 
                    src={liedGif} 
                    alt="Das Menninger Zunftlied" 
                    className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </div>

        {/* Gründungsmitglieder */}
        <div className="bg-stone-100 dark:bg-stone-800 p-6 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-4 flex items-center gap-2">
                <Info size={20} className="text-blue-600" /> Die 8 Gründungsmitglieder
            </h3>
            <div className="prose prose-sm prose-stone dark:prose-invert flex-grow">
                <p className="mb-4">
                    Am 10. Januar 1957 unterschrieben im Gasthaus "Bahnhof" folgende acht Personen das Gründungsprotokoll:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 list-none pl-0">
                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">1</span> Karl Hänsler</li>
                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">2</span> Adolf Seifritz</li>
                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">3</span> Hubert Riegger</li>
                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">4</span> Werner Thunig</li>
                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">5</span> Albert Schellinger</li>
                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">6</span> Edmund Restle</li>
                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">7</span> Otto Boos</li>
                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">8</span> Berthold Riester</li>
                </ul>
                <p className="mt-6 text-xs italic opacity-70 border-t border-stone-200 dark:border-stone-700 pt-2">
                    Heute bereichern neben der Fuchszunft noch einige weitere Vereine das Dorfleben, darunter der VfR Menningen, die Musikkapelle und die Landjugend.
                </p>
            </div>
        </div>

      </div>
    </div>
  </div>
);

export default GeschichteSection;
