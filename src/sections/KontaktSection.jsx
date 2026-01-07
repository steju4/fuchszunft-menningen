import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const KontaktSection = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Wird gesendet...");
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
    formData.append("from_name", "Kontaktformular Fuchszunft Menningen");
    formData.append("subject", "Neue Nachricht über Webseite");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Nachricht erfolgreich gesendet!");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error(error);
      setResult("Es ist ein Fehler aufgetreten.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-fadeIn">
      <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-12 text-center">Kontakt & Service</h2>
      
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-6">Ansprechpartner</h3>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-stone-900 dark:text-stone-100 text-lg">Präsident</p>
              <p className="text-lg text-stone-800 dark:text-stone-200">Winfried Stengele</p>
              <p className="text-stone-600 dark:text-stone-300">Brunnenäcker 9<br/>88605 Meßkirch-Menningen</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <a href="tel:01623029546" className="flex items-center gap-3 text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-stone-50 dark:bg-stone-800 p-4 rounded-lg border border-stone-200 dark:border-stone-700 hover:shadow-md">
                <Phone size={20} />
                <span className="font-mono font-medium">0162 / 3029546</span>
              </a>
              <a href="mailto:Fuchszunft-Menningen@t-online.de" className="flex items-center gap-3 text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-stone-50 dark:bg-stone-800 p-4 rounded-lg border border-stone-200 dark:border-stone-700 hover:shadow-md">
                <Mail size={20} />
                <span className="font-medium">Fuchszunft-Menningen@t-online.de</span>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm transition-all duration-300 hover:shadow-md h-full">
            <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-6 flex items-center gap-2">
                <Send size={24} /> Kontaktformular
            </h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-medium text-stone-700 dark:text-stone-300">Name</label>
                        <input id="name" type="text" name="name" required className="bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-lg p-3 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" placeholder="Dein Name"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-medium text-stone-700 dark:text-stone-300">E-Mail</label>
                        <input id="email" type="email" name="email" required className="bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-lg p-3 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" placeholder="deine@email.de"/>
                    </div>
                </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-medium text-stone-700 dark:text-stone-300">Nachricht</label>
                    <textarea id="message" name="message" required rows="4" className="bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-lg p-3 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" placeholder="Deine Nachricht an uns..."></textarea>
                </div>
                <button type="submit" className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-4 hover:shadow-lg hover:-translate-y-0.5">
                    <Send size={20} /> Absenden
                </button>
                {result && <p className="text-center text-stone-600 dark:text-stone-300 mt-4 font-medium animate-fadeIn">{result}</p>}
            </form>
        </div>
      </div>

       <div className="bg-stone-100 dark:bg-stone-800 p-8 rounded-2xl border border-stone-200 dark:border-stone-700 flex flex-col max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4 flex items-center gap-2">
            <MapPin size={24} className="text-orange-600 dark:text-orange-500" /> Anfahrt
          </h3>
          <p className="text-stone-600 dark:text-stone-300 mb-4 leading-relaxed">
            Unsere Zunftstube befindet sich zentral in Menningen.
          </p>

          <div className="rounded-lg overflow-hidden border border-stone-200 dark:border-stone-600 shadow-sm">
              <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2749.2388978203894!2d9.157730476326291!3d48.00793386017798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a416826445e1f%3A0x458f624ad4bb8328!2sZunftstube%2C%20Fuchszunft%20Menningen%20e.V.!5e1!3m2!1sde!2sde!4v1767791185053!5m2!1sde!2sde"
                  width="100%" 
                  height="350" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Standort Zunftstube"
                  className="w-full block"
              ></iframe>
          </div>
          <div className="mt-4 text-center">
               <a 
                href="https://maps.app.goo.gl/JaQXzCpmsXcEoPhPA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 underline"
              >
                In Google Maps öffnen
              </a>
          </div>
        </div>

    </div>
  );
};

export default KontaktSection;
