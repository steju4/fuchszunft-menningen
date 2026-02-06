import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Plugin: Hero-Hintergrundbild vorab laden via <link rel="preload">
function preloadHeroImage() {
  return {
    name: 'preload-hero-image',
    transformIndexHtml(html, ctx) {
      // Im Build: die gehashten Asset-Pfade aus dem Bundle finden
      if (ctx.bundle) {
        const heroDesktop = Object.keys(ctx.bundle).find(k => k.match(/assets\/Gesamt[^-].*\.webp$/i));
        const heroMobile = Object.keys(ctx.bundle).find(k => k.match(/assets\/Gesamt-mobile.*\.webp$/i));

        const tags = [];
        if (heroDesktop) {
          tags.push({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'image',
              type: 'image/webp',
              href: '/' + heroDesktop,
              imagesrcset: heroMobile ? `/${heroMobile} 800w, /${heroDesktop} 1920w` : undefined,
              imagesizes: heroMobile ? '100vw' : undefined,
              fetchpriority: 'high',
            },
            injectTo: 'head-prepend',
          });
        }
        return tags;
      }

      // Im Dev-Modus: direkte Pfade nutzen
      return [
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            type: 'image/webp',
            href: '/src/assets/Gesamt.webp',
            imagesrcset: '/src/assets/Gesamt-mobile.webp 800w, /src/assets/Gesamt.webp 1920w',
            imagesizes: '100vw',
            fetchpriority: 'high',
          },
          injectTo: 'head-prepend',
        },
      ];
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadHeroImage()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-analytics': ['@vercel/analytics', '@vercel/speed-insights'],
          'vendor-lucide': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
})
