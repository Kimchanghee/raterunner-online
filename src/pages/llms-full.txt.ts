import { getCollection } from 'astro:content';
import site from '../site.config.ts';
import { allCorridors, quotes } from '../lib/data.ts';

// Full-text companion to /llms.txt, generated from the same guide sources and snapshot the pages render.
export async function GET() {
  const guides = (await getCollection('guides')).filter((g) => g.data.status !== 'draft').sort((a, b) => a.id.localeCompare(b.id));
  const corridors = allCorridors();
  const text = [
    `# ${site.name} — full text`,
    '',
    `> ${site.description}`,
    '',
    `Quotes are indicative, from Wise public comparison data; snapshot asOf ${quotes.asOf}. ${corridors.length} corridors. True cost = upfront fee + exchange-rate markup against the mid-market rate. Ranking is by amount received; commissions never change it. Not financial advice. Method: ${site.url}/methodology/`,
    '',
    '# Guides',
    '',
    ...guides.map((g) => [
      `## ${g.data.title}`,
      `URL: ${site.url}/guides/${g.id}/`,
      `Updated: ${g.data.updated.toISOString().slice(0, 10)}`,
      `Data as of: ${g.data.data_asof.toISOString().slice(0, 10)}`,
      '',
      `Question: ${g.data.question}`,
      `Answer: ${g.data.answer}`,
      '',
      (g.body ?? '').trim(),
      '',
      `Sources: ${g.data.sources.map((s) => s.url).join(', ')}`,
      '',
    ].join('\n')),
    '# Corridors',
    '',
    ...corridors.map((c) => `- ${c.from} to ${c.to}: ${site.url}${c.url}`),
    '',
  ];
  return new Response(text.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
