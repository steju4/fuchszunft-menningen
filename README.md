# Fuchszunft Menningen e.V. - Offizielle Webseite

Dies ist das Repository für die offizielle Webseite der **Grafschaft Fuchsbühl zu Menningen e.V.**
Die Seite dient als Informationsplattform für Mitglieder, Freunde und Interessierte der Menninger Fasnet. Sie bietet aktuelle Neuigkeiten, Termine, Informationen zu den Zunftfiguren und der Geschichte des Vereins.

##  Technologie-Stack

Das Projekt wurde mit modernen Web-Technologien entwickelt, um eine schnelle und responsive Benutzererfahrung zu gewährleisten:

*   **Framework:** [React](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Features:**
    *   Dynamischer PDF-Export für Termine (jspdf)
    *   Kalender-Export (ics)
    *   Performance Monitoring (@vercel/analytics, @vercel/speed-insights)

##  Hosting & Deployment

Die Webseite wird auf **[Vercel](https://vercel.com)** gehostet. Das Deployment erfolgt vollautomatisch über Git-Integration.

### Branching-Strategie

Wir verwenden ein einfaches Branching-Modell für die Entwicklung:

*   **main (Production):**
    *   Dieser Branch spiegelt die **Live-Version** der Webseite wider.
    *   Jeder Push auf diesen Branch löst ein automatisches Deployment auf die Produktionsumgebung aus: [fuchszunft-menningen.vercel.app](https://fuchszunft-menningen.vercel.app)
    *   Hier landet nur getesteter und funktionierender Code.

*   **dev (Development):**
    *   Dieser Branch dient der **Entwicklung**.
    *   Neue Features, Refactorings oder Design-Änderungen werden hier zuerst zusammengeführt.
    *   Vercel erstellt für diesen Branch eine separate *Preview-URL*, unter der Änderungen getestet werden können, bevor sie live gehen.

### Workflow

1.  Entwicklung neuer Features im dev Branch (oder Feature-Branches).
2.  Testen der Änderungen in der Preview-Umgebung.
3.  Merge von dev nach main, um die Änderungen live zu schalten.

##  Autor & Kontakt

Entwickelt und gepflegt von **Julian Stengele** für die Fuchszunft Menningen e.V.

Bei Fragen oder technischen Problemen bitte ein Issue im GitHub-Repository erstellen oder direkt Kontakt aufnehmen.

---
*Fuchs - Narro!* 