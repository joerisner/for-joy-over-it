import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [sitemap()],
  server: {
    port: 4000
  },
  site: 'https://forjoyoverit.com'
});
