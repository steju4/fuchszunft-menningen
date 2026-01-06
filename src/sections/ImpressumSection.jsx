import React from 'react';

const ImpressumSection = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
    <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-8">Impressum</h2>
    <div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2" id="m46">Diensteanbieter</h3>
        <p>Grafschaft Fuchsbühl zu Menningen e.V.</p>
        <p>Brunnenäcker 9</p>
        <p>88605 Meßkirch</p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2" id="m56">Kontaktmöglichkeiten</h3>
        <p>E-Mail-Adresse: <a href="mailto:fuchszunft-menningen@t-online.de" className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300">fuchszunft-menningen@t-online.de</a></p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2" id="m153">Vertretungsberechtigte Personen</h3>
        <p>Vertretungsberechtigt: Winfried Stengele (Präsident)</p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2" id="m151">Register und Registernummer</h3>
        <p>Vereinsregister</p>
        <p>Geführt bei: Amtsgericht Ulm</p>
        <p>Nummer: VR 710149</p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2" id="m172">Social Media und andere Onlinepräsenzen</h3>
        <p>Dieses Impressum gilt auch für die folgenden Social-Media-Präsenzen und Onlineprofile: </p>
        <p><a href="https://instagram.com/fuchszunft_menningen" target="_blank" rel="noreferrer" className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300">https://instagram.com/fuchszunft_menningen</a></p>
      </div>

      <div className="pt-6 border-t border-stone-200 dark:border-stone-700">
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2" id="m65">Haftungs- und Schutzrechtshinweise</h3>
        <p className="mb-4"><strong>Haftungsausschluss:</strong> Die Inhalte dieses Onlineangebotes wurden sorgfältig und nach unserem aktuellen Kenntnisstand erstellt, dienen jedoch nur der Information und entfalten keine rechtlich bindende Wirkung, sofern es sich nicht um gesetzlich verpflichtende Informationen (z.&nbsp;B. das Impressum, die Datenschutzerklärung, AGB oder verpflichtende Belehrungen von Verbrauchern) handelt. Wir behalten uns vor, die Inhalte vollständig oder teilweise zu ändern oder zu löschen, soweit vertragliche Verpflichtungen unberührt bleiben. Alle Angebote sind freibleibend und unverbindlich.</p>
        <p className="mb-4"><strong>Links auf fremde Webseiten:</strong> Die Inhalte fremder Webseiten, auf die wir direkt oder indirekt verweisen, liegen außerhalb unseres Verantwortungsbereiches und wir machen sie uns nicht zu Eigen. Für alle Inhalte und Nachteile, die aus der Nutzung der in den verlinkten Webseiten aufrufbaren Informationen entstehen, übernehmen wir keine Verantwortung.</p>
        <p className="mb-4"><strong>Urheberrechte und Markenrechte:</strong> Alle auf dieser Website dargestellten Inhalte, wie Texte, Fotografien, Grafiken, Marken und Warenzeichen sind durch die jeweiligen Schutzrechte (Urheberrechte, Markenrechte) geschützt. Die Verwendung, Vervielfältigung usw. unterliegen unseren Rechten oder den Rechten der jeweiligen Urheber bzw. Rechteinhaber.</p>
        <p><strong>Hinweise auf Rechtsverstöße:</strong> Sollten Sie innerhalb unseres Internetauftritts Rechtsverstöße bemerken, bitten wir Sie uns auf diese hinzuweisen. Wir werden rechtswidrige Inhalte und Links nach Kenntnisnahme unverzüglich entfernen.</p>
      </div>

      <p className="text-sm text-stone-500 dark:text-stone-400 mt-8">
        <a href="https://datenschutz-generator.de/" title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken." target="_blank" rel="noopener noreferrer nofollow" className="hover:underline">Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke</a>
      </p>
    </div>
  </div>
);

export default ImpressumSection;
