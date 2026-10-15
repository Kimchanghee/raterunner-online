import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import site from '../site.config.ts';

export async function GET() {
  const guides = (await getCollection('guides'))
    .filter((g) => g.data.status !== 'draft')
    .sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime());
  return rss({
    title: 'RateRunner guides',
    description: site.description,
    site: site.url,
    items: guides.map((g) => ({
      title: g.data.title,
      description: g.data.description,
      link: `/guides/${g.id}/`,
      pubDate: g.data.published,
      categories: ['international money transfers'],
    })),
    customData: '<language>en</language>',
  });
}
