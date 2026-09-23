import { emptyRate, parseReferenceRate, type RateSnapshot } from './reference-rate';

/** Public reference only. No provider fees, execution rates or delivery times are collected here. */
export async function fetchLiveRate(base: string): Promise<RateSnapshot> {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return emptyRate(base, 'error');
    return parseReferenceRate(await res.json(), base);
  } catch {
    return emptyRate(base, 'error');
  }
}

export const POPULAR_PAIRS = [
  ['KRW', 'USD'], ['KRW', 'JPY'], ['KRW', 'EUR'], ['KRW', 'GBP'],
  ['KRW', 'CNY'], ['KRW', 'AUD'], ['KRW', 'CAD'], ['KRW', 'SGD'],
  ['KRW', 'THB'], ['KRW', 'VND'], ['KRW', 'PHP'], ['KRW', 'HKD'],
] as const;

export const AMOUNT_BUCKETS = [100_000, 500_000, 1_000_000, 5_000_000, 10_000_000];
