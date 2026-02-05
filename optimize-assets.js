import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, 'src', 'assets');
const QUALITY = 80;

async function optimizeAssets() {
    console.log(`📂 Optimiere Assets in: ${ASSETS_DIR}`);
    
    const files = [
        'Gesamt.jpg',
        'Zunftstube.jpg',
        'unnamed.gif' // Trying to optimize the GIF too
    ];

    for (const file of files) {
        const inputPath = path.join(ASSETS_DIR, file);
        if (!fs.existsSync(inputPath)) {
            console.log(`⚠️ Datei nicht gefunden: ${file}`);
            continue;
        }

        const name = path.parse(file).name;
        const outputPath = path.join(ASSETS_DIR, `${name}.webp`);

        console.log(`Bearbeite: ${file}...`);

        try {
            await sharp(inputPath, { animated: true }) // Enable animation support for GIF
                .resize({ 
                    width: 1920, // Max width for backgrounds
                    withoutEnlargement: true 
                }) 
                .webp({ quality: QUALITY })
                .toFile(outputPath);
            
            console.log(`✅ Erstellt: ${path.basename(outputPath)}`);
        } catch (error) {
            console.error(`❌ Fehler bei ${file}:`, error);
        }
    }
}

optimizeAssets();
