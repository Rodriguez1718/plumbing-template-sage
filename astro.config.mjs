// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Custom Vite plugin: when site.ts is saved, force a full page reload
 * so every component that imports getLocationText picks up the new values.
 */
function siteConfigReloadPlugin() {
  return {
    name: 'site-config-reload',
    handleHotUpdate({ file, server }) {
      const normalized = file.replace(/\\/g, '/');
      if (normalized.endsWith('/src/config/site.ts')) {
        server.ws.send({ type: 'full-reload' });
        return []; // prevent default HMR (we already triggered reload)
      }
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://acmeinc.com', // Update with actual domain
  
  vite: {
    plugins: [tailwindcss(), siteConfigReloadPlugin()],
    server: {
      hmr: {
        timeout: 120000
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'react-dom/server']
    },
    build: {
      cssMinify: true,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons';
            }
            if (id.includes('/components/ui/')) {
              return 'ui-components';
            }
          }
        }
      }
    },
    ssr: {
      noExternal: ['lucide-react']
    }
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/api/'),
    })
  ],

  compressHTML: true,
  
  build: {
    inlineStylesheets: 'always',
  },

  image: {
    domains: ['ucarecdn.com', '3l4xnbxrrw.ucarecd.net', 'ntv-template-1.vercel.app'],
    remotePatterns: [{ protocol: 'https' }],
  },

  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  }
});
