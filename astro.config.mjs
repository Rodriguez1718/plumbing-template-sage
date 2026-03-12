// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Custom Vite plugin: when site.json or site.ts is saved, invalidate the
 * site.ts module and force a full page reload so every component picks up
 * the new values immediately.
 */
function siteConfigReloadPlugin() {
  return {
    name: 'site-config-reload',
    configureServer(server) {
      // Watch site.json for changes (it's read via fs, not imported,
      // so Vite doesn't track it automatically)
      const siteJsonPath = new URL('./src/data/settings/site.json', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
      server.watcher.add(siteJsonPath);
    },
    handleHotUpdate({ file, server, modules }) {
      const normalized = file.replace(/\\/g, '/');
      if (
        normalized.endsWith('/src/data/settings/site.json') ||
        normalized.endsWith('/src/config/site.ts')
      ) {
        // Invalidate the site.ts module so it re-executes (re-reads JSON from disk)
        const siteModule = server.moduleGraph.getModulesByFile(
          [...server.moduleGraph.fileToModulesMap.keys()].find(f =>
            f.replace(/\\/g, '/').endsWith('/src/config/site.ts')
          )
        );
        if (siteModule) {
          siteModule.forEach(mod => server.moduleGraph.invalidateModule(mod));
        }
        server.ws.send({ type: 'full-reload' });
        return [];
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
