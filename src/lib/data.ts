import quotesRaw from '../data/quotes.json';
import referenceRaw from '../data/reference.json';
import corridorsRaw from '../data/corridors.json';
import { summarise, buildLines, ageHours, screen, type Quote, type BandSummary } from './cost.ts';

export interface Band { fetchedAt: string; providers: Quote[]; stale?: boolean }
/** A band after screening: providers = ranked quotes, aw = everything returned, setAside = shown but unranked. */
export interface ScreenedBand extends Band { raw: Quote[]; setAside: { quote: Quote; reason: string }[] }
export interface CorridorData { from: string; to: string; bands: Record<string, Band> }

export const quotes = quotesRaw as unknown as {
  source: string; sourceUrl: string; endpoint: string; asOf: string | null; corridors: Record<string, CorridorData>;
};
export const reference = referenceRaw as unknown as {
  source: string; sourceUrl: string; asOf: string | null; bases: Record<string, { date: string; rates: Record<string, number> }>;
};
export const meta = corridorsRaw as unknown as {
  amounts: number[]; list: { from: string; to: string }[];
  currencies: Record<string, { name: string; place: string; symbol: string | null }>;
};

export const AMOUNTS = meta.amounts;
export const HEADLINE_AMOUNT = 1000;

export function slugOf(from: string, to: string): string {
  return `${from.toLowerCase()}-to-${to.toLowerCase()}`;
}
export function corridorUrl(from: string, to: string): string {
  return `/send/${slugOf(from, to)}/`;
}
export function curName(c: string): string {
  return meta.currencies[c]?.name ?? c;
}
export function place(c: string): string {
  return meta.currencies[c]?.place ?? c;
}
/** "the Philippines" -> "The Philippines" for sentence starts / titles. */
export function Place(c: string): string {
  const p = place(c);
  return p.charAt(0).toUpperCase() + p.slice(1);
}
export function placeShort(c: string): string {
  return place(c).replace(/^the /, '');
}

/** ECB reference mid for a pair, if Frankfurter publishes both currencies. */
export function referenceMid(from: string, to: string): { rate: number; date: string } | null {
  const b = reference.bases[from];
  const r = b?.rates?.[to];
  return b && typeof r === 'number' ? { rate: r, date: b.date } : null;
}

export interface CorridorView {
  key: string; from: string; to: string; slug: string; url: string;
  bands: { amount: number; band: ScreenedBand; summary: BandSummary }[];
  headline: { amount: number; band: ScreenedBand; summary: BandSummary } | null;
  providerCount: number;
  latestFetch: string | null;
  anyStale: boolean;
}

export function corridorView(from: string, to: string): CorridorView {
  const key = `${from}-${to}`;
  const c = quotes.corridors[key];
  const bands: CorridorView['bands'] = [];
  for (const amount of AMOUNTS) {
    const rawBand = c?.bands?.[String(amount)];
    if (!rawBand || rawBand.providers.length < 1) continue;
    const sc = screen(rawBand.providers, rawBand.fetchedAt);
    const band: ScreenedBand = { ...rawBand, providers: sc.ranked, raw: rawBand.providers, setAside: sc.setAside };
    const summary = summarise(amount, band.providers);
    if (summary) bands.push({ amount, band, summary });
  }
  const headline = bands.find((b) => b.amount === HEADLINE_AMOUNT) ?? bands[0] ?? null;
  const names = new Set(bands.flatMap((b) => b.band.providers.map((p) => p.alias)));
  const fetches = bands.map((b) => b.band.fetchedAt).sort();
  return {
    key, from, to, slug: slugOf(from, to), url: corridorUrl(from, to), bands, headline,
    providerCount: names.size, latestFetch: fetches.at(-1) ?? null, anyStale: bands.some((b) => b.band.stale),
  };
}

export function allCorridors(): CorridorView[] {
  return meta.list.map((c) => corridorView(c.from, c.to)).filter((v) => v.bands.length > 0);
}

/** Corridors sharing the same destination or source, for internal linking. */
export function related(view: CorridorView, n = 6): CorridorView[] {
  const all = allCorridors().filter((v) => v.key !== view.key);
  const sameTo = all.filter((v) => v.to === view.to);
  const sameFrom = all.filter((v) => v.from === view.from && v.to !== view.to);
  return [...sameTo, ...sameFrom].slice(0, n);
}

export { buildLines, ageHours };
