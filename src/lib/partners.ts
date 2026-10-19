// Remittance partner programmes. Every entry stays disabled with an empty tracking URL until the programme has
// approved RateRunner and the exact tracking URL has been checked by hand (verifiedAt). Only then does a provider
// CTA become a sponsored link. Partners never influence ranking: ordering lives in src/lib/cost.ts and sorts by
// amount received only.
export interface Partner {
  alias: string; // provider alias as it appears in the quote data
  name: string;
  network: string;
  enabled: boolean;
  trackingUrl: string; // https URL issued by the programme
  verifiedAt: string; // ISO date the tracking URL was checked; required to activate
}

export const partners: Partner[] = [
  { alias: 'remitly', name: 'Remitly', network: 'Impact', enabled: false, trackingUrl: '', verifiedAt: '' },
  { alias: 'xe', name: 'Xe', network: 'Impact', enabled: false, trackingUrl: '', verifiedAt: '' },
  { alias: 'world-remit', name: 'WorldRemit', network: 'Impact', enabled: false, trackingUrl: '', verifiedAt: '' },
  { alias: 'wise', name: 'Wise', network: 'Partnerize', enabled: false, trackingUrl: '', verifiedAt: '' },
];

export function isActive(p: Partner): boolean {
  if (!p.enabled || !p.verifiedAt || Number.isNaN(Date.parse(p.verifiedAt))) return false;
  try { return new URL(p.trackingUrl).protocol === 'https:'; } catch { return false; }
}

/** Sponsored URL for a provider alias, or '' when no verified, enabled partner exists. */
export function partnerLink(alias: string, list: Partner[] = partners): string {
  const p = list.find((x) => x.alias === alias);
  return p && isActive(p) ? p.trackingUrl : '';
}

export function anyActive(list: Partner[] = partners): boolean {
  return list.some(isActive);
}

export function activeLinks(list: Partner[] = partners): Record<string, string> {
  return Object.fromEntries(list.filter(isActive).map((p) => [p.alias, p.trackingUrl]));
}
