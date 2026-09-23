/** Public reference rates, never provider execution quotes. */
export type RateState = 'available' | 'stale' | 'unavailable' | 'error';
export type RateSnapshot = {
  state: RateState;
  base: string;
  rates: Record<string, number>;
  updatedAt: string | null;
};

export const STALE_AFTER_MS = 36 * 60 * 60 * 1000;

export function emptyRate(base: string, state: 'unavailable' | 'error' = 'unavailable'): RateSnapshot {
  return { state, base, rates: {}, updatedAt: null };
}

export function parseReferenceRate(data: unknown, base: string, now = Date.now()): RateSnapshot {
  if (!data || typeof data !== 'object') return emptyRate(base, 'error');
  const payload = data as Record<string, unknown>;
  const timestamp = payload.time_last_update_unix;
  if (payload.result !== 'success' || payload.base_code !== base ||
      typeof timestamp !== 'number' || !Number.isFinite(timestamp) ||
      timestamp <= 0 || timestamp * 1000 > now + 5 * 60 * 1000 ||
      !payload.rates || typeof payload.rates !== 'object' || Array.isArray(payload.rates)) {
    return emptyRate(base, 'error');
  }
  const rates: Record<string, number> = {};
  for (const [key, value] of Object.entries(payload.rates)) {
    if (/^[A-Z]{3}$/.test(key) && typeof value === 'number' && Number.isFinite(value) && value > 0) {
      rates[key] = value;
    }
  }
  if (!Object.keys(rates).length) return emptyRate(base, 'error');
  return {
    state: now - timestamp * 1000 > STALE_AFTER_MS ? 'stale' : 'available',
    base,
    rates,
    updatedAt: new Date(timestamp * 1000).toISOString(),
  };
}

export function getReferenceRate(snapshot: RateSnapshot, quote: string): number | null {
  return snapshot.rates[quote] ?? null;
}

export function rateLabel(snapshot: RateSnapshot, quote: string): string {
  if (snapshot.state === 'error') return 'Source error';
  if (getReferenceRate(snapshot, quote) === null) return 'Rate unavailable';
  return snapshot.state === 'stale' ? 'Stale reference' : 'Reference available';
}

export function formatObservedAt(value: string | null): string {
  return value ? new Date(value).toLocaleString('en-GB', { timeZone: 'UTC', dateStyle: 'medium', timeStyle: 'short' }) + ' UTC' : 'No verified source timestamp';
}
