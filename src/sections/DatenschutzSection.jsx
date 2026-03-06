import React, { useEffect } from 'react';

const DatenschutzSection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-stone-800 rounded-lg shadow-xl p-8 border-l-4 border-orange-600">
        
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-8">Datenschutzerklärung</h1>

        <div className="space-y-6 text-stone-700 dark:text-stone-300 leading-relaxed">

          {/* 1 */}
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">1. Datenschutz auf einen Blick</h2>
          <h3 className="text-lg font-bold text-orange-600">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer nachfolgenden Datenschutzerklärung.
          </p>

          <h3 className="text-lg font-bold text-orange-600">Wer ist verantwortlich für die Datenerfassung?</h3>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Verantwortliche Stelle" entnehmen.
          </p>

          <h3 className="text-lg font-bold text-orange-600">Wie erfassen wir Ihre Daten?</h3>
          <p>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.&nbsp;B. per Kontaktformular oder E-Mail). Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme bzw. den Hosting-Anbieter erfasst. Das sind vor allem technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem, IP-Adresse).
          </p>

          <h3 className="text-lg font-bold text-orange-600">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen sowie ein Beschwerderecht bei der zuständigen Aufsichtsbehörde. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
          </p>

          {/* 2 */}
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">2. Verantwortliche Stelle</h2>
          <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
          <p className="font-medium bg-stone-100 dark:bg-stone-900 p-4 rounded border border-stone-200 dark:border-stone-700">
            Grafschaft Fuchsbühl zu Menningen e.V.<br />
            Winfried Stengele<br />
            Brunnenäcker 9<br />
            88605 Meßkirch-Menningen<br />
            Telefon: 0162 / 3029546<br />
            E-Mail: info@fuchszunft-menningen.de
          </p>
          <p>
            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
          </p>

          {/* 3 */}
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">3. Hosting</h2>
          <h3 className="text-lg font-bold text-orange-600">Vercel</h3>
          <p>
            Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
          </p>
          <p>
            Wenn Sie unsere Website aufrufen, erfasst Vercel automatisch sogenannte Server-Log-Dateien, die Ihr Browser übermittelt. Dazu gehören insbesondere: IP-Adresse, Datum und Uhrzeit des Abrufs, übertragene Datenmenge, Meldung über erfolgreichen Abruf, Browsertyp und -version sowie das anfragende Betriebssystem. Diese Daten werden zur Sicherstellung des technischen Betriebs und zur Missbrauchsabwehr verwendet und nicht mit anderen Datenquellen zusammengeführt.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer zuverlässigen und sicheren Bereitstellung der Website). Details zur Verarbeitung durch Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">https://vercel.com/legal/privacy-policy</a>.
          </p>

          {/* 4 */}
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">4. Allgemeines zur Datenübertragung</h2>
          <h3 className="text-lg font-bold text-orange-600">SSL- bzw. TLS-Verschlüsselung</h3>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers mit „https://" beginnt. Bei aktivierter SSL- bzw. TLS-Verschlüsselung können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
          </p>

          {/* 5 */}
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">5. Datenerfassung auf dieser Website</h2>

          <h3 className="text-lg font-bold text-orange-600">Kontaktformular (Web3Forms)</h3>
          <p>
            Wenn Sie uns über das Kontaktformular eine Anfrage zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten (Name, E-Mail-Adresse, Nachricht) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p>
            Die Übermittlung des Formulars erfolgt über den Dienst <strong>Web3Forms</strong> (YTJ Innovations, web3forms.com). Die eingegebenen Daten werden dabei an die Server von Web3Forms übertragen und anschließend per E-Mail an uns weitergeleitet. Web3Forms speichert die übermittelten Daten nach eigenen Angaben nicht dauerhaft auf ihren Servern.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Bearbeitung vorvertraglicher Anfragen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Kontaktanfragen). Weitere Informationen: <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">https://web3forms.com/privacy</a>.
          </p>

          <h3 className="text-lg font-bold text-orange-600">Kontaktanfragen per E-Mail</h3>
          <p>
            Wenn Sie uns per E-Mail kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p>
            Unser E-Mail-Verkehr läuft über die Server der <strong>Strato AG</strong> (Pascalstraße 10, 10587 Berlin). Wir haben mit Strato einen Vertrag zur Auftragsverarbeitung abgeschlossen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
          </p>

          <h3 className="text-lg font-bold text-orange-600">Lokaler Speicher (LocalStorage)</h3>
          <p>
            Diese Webseite nutzt den lokalen Speicher Ihres Browsers (LocalStorage), um Ihre Präferenz für den Dunkelmodus (Dark Mode) zu speichern. Dabei werden keine personenbezogenen Daten verarbeitet, sondern lediglich die Einstellung „light" oder „dark" auf Ihrem Gerät hinterlegt. Es findet keine Übermittlung an externe Server statt.
          </p>

          {/* 6 */}
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">6. Analyse-Tools</h2>
          <h3 className="text-lg font-bold text-orange-600">Vercel Analytics &amp; Speed Insights</h3>
          <p>
            Wir nutzen auf dieser Website die Dienste „Vercel Analytics" und „Vercel Speed Insights", um die Performance und Nutzung unserer Webseite zu verstehen und zu optimieren.
          </p>
          <p>
            Vercel erfasst dabei anonymisierte Besucherdaten. Nach Angaben von Vercel werden <strong>keine Cookies</strong> gesetzt und keine personenbezogenen Daten (wie vollständige IP-Adressen) dauerhaft gespeichert, die einen Rückschluss auf einzelne Besucher erlauben (Privacy-Friendly Analytics).
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Verbesserung unseres Webangebots).
          </p>

          {/* 7 */}
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">7. Plugins und Tools</h2>
          <h3 className="text-lg font-bold text-orange-600">Google Maps (2-Klick-Lösung)</h3>
          <p>
            Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
          </p>
          <p>
            Zur Wahrung Ihrer Privatsphäre wird die Karte auf unserer Seite erst geladen, <strong>nachdem Sie aktiv auf die Schaltfläche „Karte anzeigen" geklickt haben</strong>. Erst ab diesem Zeitpunkt wird eine Verbindung zu den Servern von Google hergestellt und Ihre IP-Adresse übertragen.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch aktives Klicken). Die Einwilligung kann durch Neuladen der Seite jederzeit widerrufen werden. Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">https://policies.google.com/privacy</a>.
          </p>

          {/* 8 */}
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">8. Ihre Rechte als betroffene Person</h2>
          <p>
            Bezüglich Ihrer bei uns gespeicherten personenbezogenen Daten haben Sie folgende Rechte gegenüber uns:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO): Sie können Auskunft über die zu Ihrer Person gespeicherten Daten verlangen.</li>
            <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO): Sie können die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten verlangen.</li>
            <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO): Sie können unter bestimmten Voraussetzungen die Löschung Ihrer Daten verlangen.</li>
            <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO): Sie können unter bestimmten Voraussetzungen eine Einschränkung der Verarbeitung verlangen.</li>
            <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO): Sie können verlangen, Ihre Daten in einem strukturierten, maschinenlesbaren Format zu erhalten.</li>
            <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO): Sie können der Verarbeitung Ihrer personenbezogenen Daten, die auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO erfolgt, jederzeit widersprechen.</li>
            <li><strong>Widerruf von Einwilligungen</strong> (Art. 7 Abs. 3 DSGVO): Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.</li>
          </ul>
          <p>
            Zur Geltendmachung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:info@fuchszunft-menningen.de" className="text-orange-600 hover:underline">info@fuchszunft-menningen.de</a>
          </p>

          {/* 9 */}
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">9. Beschwerderecht bei der Aufsichtsbehörde</h2>
          <p>
            Sie haben gemäß Art. 77 DSGVO das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. Die für uns zuständige Aufsichtsbehörde ist:
          </p>
          <p className="bg-stone-100 dark:bg-stone-900 p-4 rounded border border-stone-200 dark:border-stone-700">
            Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
            Postfach 10 29 32, 70025 Stuttgart<br />
            Lautenschlagerstraße 20, 70173 Stuttgart<br />
            Telefon: +49 711 615541-0<br />
            E-Mail: poststelle@lfdi.bwl.de<br />
            <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">www.baden-wuerttemberg.datenschutz.de</a>
          </p>

          {/* 10 */}
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-8">10. Transparenz &amp; Open Source</h2>
          <h3 className="text-lg font-bold text-orange-600">Öffentlicher Quellcode</h3>
          <p>
            Unsere Webseite wird offen und transparent entwickelt. Der vollständige Programmcode (Source Code) ist auf der Plattform GitHub öffentlich einsehbar. Dadurch hat jeder Nutzer die technische Möglichkeit, genau zu überprüfen, welche Daten erfasst werden und wie die Seite funktioniert (Auditierbarkeit).
          </p>
          <p>
            Das öffentliche Repository finden Sie hier: <a href="https://github.com/steju4/fuchszunft-menningen" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">https://github.com/steju4/fuchszunft-menningen</a>
          </p>

        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700 text-sm text-stone-500">
          <p>Stand: März 2026</p>
        </div>
      </div>
    </div>
  );
};

export default DatenschutzSection;