import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, 'public', 'galerie');
const OUTPUT_FILE = path.join(__dirname, 'src', 'data', 'galleryImages.json');

function getImagesRecursively(dir, rootDir) {
    let images = {};
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            images[item.name] = getImagesRecursively(fullPath, rootDir);
        } else {
             const ext = path.extname(item.name).toLowerCase();
             if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
                 if (!Array.isArray(images)) images = [];
                 // Convert absolute path to relative URL for browser
                 const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
                 // Ensure it starts with /galerie
                 const url = `/galerie/${relativePath}`;
                 images.push(url);
             }
        }
    }
    return images;
}

console.log('📸 Scanne Bilderordner...');
try {
    if (!fs.existsSync(GALLERY_DIR)) {
         console.error('❌ Ordner public/galerie existiert nicht!');
         process.exit(1);
    }
    
    const galleryData = getImagesRecursively(GALLERY_DIR, GALLERY_DIR);
    
    // Sort logic? Usually filename
    // We expect structure: { "2025": { "Fasnet": [url, url], "Sonstiges": [url] } }
    
    // Helper to sort arrays if found
    function sortArrays(obj) {
        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                obj[key].sort(); // Alphabetical sort
            } else if (typeof obj[key] === 'object') {
                sortArrays(obj[key]);
            }
        }
    }
    sortArrays(galleryData);

    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(galleryData, null, 2));
    console.log(`✅ Galerie-Daten gespeichert in: ${OUTPUT_FILE}`);
    console.log(JSON.stringify(galleryData, null, 2));

} catch (e) {
    console.error('Fehler:', e);
}
