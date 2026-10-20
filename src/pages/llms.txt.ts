import { getCollection } from 'astro:content';
import site from '../site.config.ts';
import { allCorridors, quotes } from '../lib/data.ts';

export async function GET() {
  const guides = (await getCollection('guides')).filter((g) => g.data.status !== 'draft');
  const corridors = allCorridors();
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `RateRunner covers ${corridors.length} corridors at amounts of 200, 1,000 and 5,000 in the sending currency. True cost = upfront fee + exchange-rate markup against the mid-market rate. Quotes are indicative, from Wise public comparison data; snapshot asOf ${quotes.asOf}. Ranking is by amount received; commercial relationships never change it. Not financial advice.`,
    '',
    '## Core pages',
    `- [Calculator](${site.url}/): true cost of a transfer for a corridor and amount`,
    `- [Corridor ledgers](${site.url}/send/): ranked quotes per corridor`,
    `- [Hidden markup checker](${site.url}/hidden-fx-markup/): compute the markup hidden in any quoted rate`,
    `- [Methodology and data sources](${site.url}/methodology/)`,
    `- [About](${site.url}/about/)`,
    `- [Quote snapshot (JSON)](${site.url}/data/snapshot.json): all corridors and bands with provider, fee, markup, rate, received and collectedAt; data as of ${quotes.asOf}, rebuilt when the quote data refreshes`,
    '',
    '## Guides',
    ...guides.map((g) => `- [${g.data.title}](${site.url}/guides/${g.id}/): ${g.data.answer}`),
    '',
    '## Corridors',
    ...corridors.map((c) => `- [${c.from} to ${c.to}](${site.url}${c.url})`),
    '',
    `Contact: ${site.contactEmail}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
