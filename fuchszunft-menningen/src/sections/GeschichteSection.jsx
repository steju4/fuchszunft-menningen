import React from 'react';
import { Info, Music, BookOpen } from 'lucide-react';

const GeschichteSection = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
    <div className="prose prose-lg prose-stone mx-auto">
      <h2 className="text-4xl font-bold text-stone-800 mb-8 text-center">Von Rittern und Füchsen</h2>
      
      <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 mb-12 shadow-sm">
        <h3 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
          <Info size={24} /> Entstehung und Gründung
        </h3>
        <p className="mb-4">
          Mitte der 50er-Jahre suchte man nach einer Möglichkeit, die Menninger Fasnet auf feste Beine zu stellen. 
          Es fehlte vor allem eine feste Fasnachtsgestalt als Identifikationsfigur.
        </p>
        <p className="mb-4">
          Der damalige Bahnhofswirt <strong>Karl Hänsler</strong> hatte die zündende Idee: Inspiriert vom Flurnamen "Fuchsbühl" 
          und den dort lebenden schlauen Tieren, entwarf er heimlich das Urmodell der Fuchsmaske. 
          Der Maskenschnitzer Erwin Kleiner aus Meßkirch fertigte daraufhin die erste Holzmaske.
        </p>
        <p className="mb-4">
          <strong>Der erste Auftritt:</strong> Beim Bürgerball am 22. Januar 1956 traten überraschend die ersten beiden Menninger Füchse auf 
          (Karl Hänsler und Adolf Seifritz) und wurden mit großer Begeisterung gefeiert.
        </p>
        <p>
          Am <strong>10. Januar 1957</strong> war es dann soweit: Im Gasthaus "Bahnhof" wurde die Zunft offiziell gegründet. 
          Aufgrund der früher hier ansässigen Ritterschaft der Gremlich erhielt die Zunft den Namen "Grafschaft Fuchsbühl zu Menningen".
        </p>
      </div>

      {/* Zunftlied Sektion */}
      <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200 mb-12 shadow-sm">
        <h3 className="text-2xl font-bold text-orange-700 mb-6 flex items-center gap-2 justify-center">
          <Music size={24} /> Das Menninger Zunftlied
        </h3>
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden max-w-2xl">
            <img 
              src="/unnamed (1).gif" 
              alt="Das Menninger Zunftlied" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <p className="text-center text-stone-600 italic">
          Unser traditionelles Zunftlied
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-stone-800 mb-4">Unser Dorf Menningen</h3>
          <p className="text-stone-600 leading-relaxed">
            Menningen liegt malerisch im Ablachtal, östlich von Meßkirch. 
            Seit 1974 Teilort der Stadt, hat sich Menningen seinen eigenständigen Charakter bewahrt. 
            Ursprünglich bestand der Ort aus zwei Teilen: Menningen (links der Ablach) und Leitishofen (rechts der Ablach), 
            die 1932 vereint wurden.
          </p>
        </div>
        <div className="bg-green-900 text-white p-6 rounded-xl shadow-lg">
          <h4 className="font-bold mb-2 text-green-300 flex items-center gap-2"><BookOpen size={18}/> Schon gewusst?</h4>
          <p className="text-sm leading-relaxed opacity-90">
            Das Wappen der Herren von Gremlich spielt in unserer Zunft eine große Rolle. 
            Das Zunftpräsidium trägt Gewänder, die an diese Adelsfamilie erinnern. 
            Auch das Menninger Wasserschloss geht auf eine alte Wasserburg zurück.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default GeschichteSection;
