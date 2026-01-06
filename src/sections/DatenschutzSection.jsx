import React, { useEffect } from 'react';

const DatenschutzSection = () => {
  // Nach oben scrollen beim Laden
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-stone-800 rounded-lg shadow-xl p-8 border-l-4 border-orange-600">
        
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-8">Datenschutzerklärung</h1>

        <div className="space-y-6 text-stone-700 dark:text-stone-300 leading-relaxed">
          
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">1. Datenschutz auf einen Blick</h2>
          <h3 className="text-lg font-bold text-orange-600">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">2. Hosting und Content Delivery Networks (CDN)</h2>
          <h3 className="text-lg font-bold text-orange-600">Hosting bei Vercel</h3>
          <p>
            Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
          </p>
          <p>
            Wenn Sie unsere Website aufrufen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adressen. Vercel verwendet diese Daten zur Analyse und Aufrechterhaltung der technischen Funktionsfähigkeit der Infrastruktur. Details entnehmen Sie der Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">https://vercel.com/legal/privacy-policy</a>.
          </p>
          <p>
            Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website.
          </p>

          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">3. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3 className="text-lg font-bold text-orange-600">Verantwortliche Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p className="font-medium bg-stone-100 dark:bg-stone-900 p-4 rounded border border-stone-200 dark:border-stone-700">
            Grafschaft Fuchsbühl zu Menningen e.V.<br />
            Winfried Stengele<br />
            Brunnenäcker 9<br />
            88605 Meßkirch-Menningen<br />
            E-Mail: info@fuchszunft-menningen.de
          </p>

          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">4. Datenerfassung auf dieser Website</h2>
          
          <h3 className="text-lg font-bold text-orange-600">Kontaktanfragen per E-Mail</h3>
          <p>
            Wenn Sie uns per E-Mail kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p>
            Unser E-Mail-Verkehr läuft über die Server der <strong>Strato AG</strong> (Pascalstraße 10, 10587 Berlin). Wir haben mit Strato einen Vertrag zur Auftragsverarbeitung abgeschlossen.
          </p>

          <h3 className="text-lg font-bold text-orange-600">Lokaler Speicher (LocalStorage)</h3>
          <p>
            Diese Webseite nutzt den lokalen Speicher Ihres Browsers (LocalStorage), um Ihre Präferenz für den Dunkelmodus (Dark Mode) zu speichern. Dabei werden keine personenbezogenen Daten verarbeitet, sondern lediglich die Einstellung "light" oder "dark" auf Ihrem Gerät hinterlegt.
          </p>

          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">5. Analyse-Tools</h2>
          <h3 className="text-lg font-bold text-orange-600">Vercel Analytics & Speed Insights</h3>
          <p>
            Wir nutzen auf dieser Website die Dienste "Vercel Analytics" und "Vercel Speed Insights" um die Performance und Nutzung unserer Webseite zu verstehen und zu optimieren.
          </p>
          <p>
            Vercel erfasst dabei anonymisierte Besucherdaten. Nach Angaben von Vercel werden dabei <strong>keine Cookies</strong> gesetzt und keine personenbezogenen Daten (wie IP-Adressen) dauerhaft gespeichert, die einen Rückschluss auf einzelne Besucher zulassen (Privacy-Friendly Analytics).
          </p>

          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">6. Plugins und Tools</h2>
          <h3 className="text-lg font-bold text-orange-600">Google Maps / OpenStreetMap</h3>
          <p>
            Diese Seite nutzt über eine API bzw. Iframe den Kartendienst Google Maps bzw. OpenStreetMap. Anbieter ist die Google Ireland Limited bzw. die OpenStreetMap Foundation.
            Zur Nutzung der Funktionen ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server des Anbieters übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.
          </p>

        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700 text-sm text-stone-500">
          <p>Stand: Januar 2025</p>
        </div>
      </div>
    </div>
  );
};

export default DatenschutzSection;