// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';

const quotes = JSON.parse(readFileSync(new URL('./src/data/quotes.json', import.meta.url), 'utf8'));
const dataDate = quotes.asOf ? new Date(quotes.asOf) : undefined;
// lastmod for guides = frontmatter updated; for static trust pages = their visible "Last updated" date.
/** @type {Record<string, string>} */
const lastmod = {};
const gdir = new URL('./src/content/guides/', import.meta.url);
let newestGuide = '';
for (const f of readdirSync(gdir).filter((n) => n.endsWith('.md'))) {
  const m = readFileSync(new URL(f, gdir), 'utf8').match(/^updated:\s*([0-9-]+)/m);
  if (m) { lastmod['/guides/' + f.replace(/\.md$/, '') + '/'] = m[1]; if (m[1] > newestGuide) newestGuide = m[1]; }
}
if (newestGuide) lastmod['/guides/'] = newestGuide;
for (const f of ['about', 'methodology', 'contact', 'privacy', 'terms', 'disclaimer', 'hidden-fx-markup']) {
  const src = readFileSync(new URL('./src/pages/' + f + '.astro', import.meta.url), 'utf8');
  const m = src.match(/updated="([0-9-]+)"/) || src.match(/dateModified:\s*'([0-9-]+)'/);
  if (m) lastmod['/' + f + '/'] = m[1];
}

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
        const map = lastmod;
        const lm = map[u.pathname] ?? ((u.pathname.startsWith('/send/') || u.pathname === '/' || u.pathname === '/hidden-fx-markup/') ? dataDate?.toISOString() : undefined);
        if (lm) item.lastmod = lm;
        return item;
      },
    }),
  ],
});
