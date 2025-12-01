import React from 'react';

const ImpressumSection = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
    <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-8">Impressum</h2>
    <div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">Angaben gemäß § 5 TMG</h3>
        <p>
          Grafschaft Fuchsbühl zu Menningen e.V.<br />
          Brunnenäcker 9<br />
          88605 Meßkirch-Menningen
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">Vertreten durch</h3>
        <p>
          1. Vorstand: Winfried Stengele<br />
          2. Vorstand: [Bitte Namen ergänzen]<br />
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">Kontakt</h3>
        <p>
          Telefon: 0162 / 3029546<br />
          E-Mail: Fuchszunft-Menningen@t-online.de
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">Registereintrag</h3>
        <p>
          Eintragung im Vereinsregister.<br />
          Registergericht: [Bitte Amtsgericht ergänzen]<br />
          Registernummer: [Bitte VR-Nummer ergänzen]
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
        <p>
          Winfried Stengele<br />
          Brunnenäcker 9<br />
          88605 Meßkirch-Menningen
        </p>
      </div>
      
      <div className="pt-6 border-t border-stone-200 dark:border-stone-700">
        <h3 className="text-xl font-bold text-stone-900 mb-2">Haftungsausschluss (Disclaimer)</h3>
        <p className="mb-4"><strong>Haftung für Inhalte</strong><br/>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
        <p className="mb-4"><strong>Haftung für Links</strong><br/>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
        <p><strong>Urheberrecht</strong><br/>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
      </div>
    </div>
  </div>
);

export default ImpressumSection;
