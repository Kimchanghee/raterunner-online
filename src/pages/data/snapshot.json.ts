import type { APIRoute } from 'astro';
import site from '../../site.config.ts';
import { allCorridors, quotes } from '../../lib/data.ts';

// Whole-snapshot download built from the committed quote data at build time. Provider names and each quote's
// collectedAt timestamp are passed through unchanged; nothing is recomputed or filled in.
export const GET: APIRoute = () => {
  const corridors = allCorridors().map((v) => {
    const c = quotes.corridors[v.key]!;
    return { from: c.from, to: c.to, page: `${site.url}${v.url}`, bands: c.bands };
  });
  const body = {
    name: `${site.name} money-transfer quote snapshot`,
    publisher: site.url,
    source: quotes.source,
    sourceUrl: quotes.sourceUrl,
    asOf: quotes.asOf,
    note: 'Indicative quotes as collected. Pages screen out quotes older than 48 hours before ranking; this file is the unscreened snapshot. Not financial advice.',
    fields: { fee: 'upfront fee in the sending currency', markup: 'exchange-rate markup vs mid-market, percent', rate: 'quoted rate', received: 'amount received', collectedAt: 'when the provider quote was collected' },
    corridors,
  };
  return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
