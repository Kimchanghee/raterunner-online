// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

const quotes = JSON.parse(readFileSync(new URL('./src/data/quotes.json', import.meta.url), 'utf8'));
const dataDate = quotes.asOf ? new Date(quotes.asOf) : undefined;

export default defineConfig({
  site: 'https://raterunner.online',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        // Data-driven pages: lastmod = quote snapshot date. Guides get their own date via custom map below.
        const u = new URL(item.url);
        const map = globalThis.__rrLastmod ?? {};
        const lm = map[u.pathname] ?? ((u.pathname.startsWith('/send/') || u.pathname === '/') ? dataDate?.toISOString() : undefined);
        if (lm) item.lastmod = lm;
        return item;
      },
    }),
  ],
});
