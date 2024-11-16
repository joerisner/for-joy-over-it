import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [sitemap()],
  redirects: {
    // TODO: Remove once home page is created.
    '/': '/blog'
  },
  server: {
    port: 4000
  },
  site: 'https://forjoyoverit.com'
});
