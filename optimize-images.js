import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// ES Module Workaround für __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfiguration
const START_DIR = path.join(__dirname, 'public', 'galerie');
const MAX_SIZE = 1400; // Maximale Größe für die längste Seite (egal ob hoch oder quer)
const QUALITY = 82;    // Qualität 0-100

async function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Rekursiv in Unterordner gehen
            await processDirectory(fullPath);
        } else {
            // Check ob Bild
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                await optimizeImage(fullPath);
            }
        }
    }
}

async function optimizeImage(filePath) {
    const dir = path.dirname(filePath);
    const name = path.parse(filePath).name;
    const newPath = path.join(dir, `${name}.webp`);
    
    // Temp Pfad, falls wir die Datei selbst überschreiben (z.B. webp zu webp)
    const tempPath = path.join(dir, `${name}_temp.webp`);

    console.log(`Bearbeite: ${path.basename(filePath)}...`);

    try {
        await sharp(filePath)
            .resize({
                width: MAX_SIZE,
                height: MAX_SIZE,
                fit: 'inside', // Sorgt dafür, dass das Bild in die Box passt (Seitenverhältnis bleibt erhalten)
                withoutEnlargement: true // Bild nicht vergrößern, wenn es schon kleiner ist
            })
            .webp({ quality: QUALITY })
            .toFile(tempPath);

        // Wenn erfolgreich:
        // 1. Alte Datei löschen (wenn es nicht die gleiche ist)
        if (filePath !== newPath) {
            fs.unlinkSync(filePath);
        }
        
        // 2. Temp Datei zum finalen Namen umbenennen
        // Falls wir webp -> webp optimieren, müssen wir erst das Original löschen (oben if check) dann umbenennen
        if (fs.existsSync(newPath) && filePath !== newPath) {
             // Falls newPath schon existiert (doppelte Dateinamen Konflikt), sicherheitshalber löschen
             fs.unlinkSync(newPath);
        } else if (filePath === newPath) {
             // Wenn wir webp überschreiben, müssen wir das Original (was jetzt filePath ist) löschen, bevor wir temp umbenennen
             // Aber oben haben wir filePath !== newPath gecheckt.
             // Im Fall webp->webp: filePath == newPath.
             fs.unlinkSync(filePath);
        }

        fs.renameSync(tempPath, newPath);
        
        console.log(`✅ Optimiert: ${path.basename(newPath)}`);
    } catch (error) {
        console.error(`❌ Fehler bei ${path.basename(filePath)}:`, error.message);
        // Aufräumen falls Temp existiert
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
}

console.log('🚀 Starte Bildoptimierung...');
console.log(`📂 Zielordner: ${START_DIR}`);
console.log(`📏 Max Größe: ${MAX_SIZE}px`);

processDirectory(START_DIR)
    .then(() => console.log('✨ Alle Bilder fertig optimiert!'))
    .catch(err => console.error('Absturz:', err));
