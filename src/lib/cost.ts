// Pure cost arithmetic. No I/O. Runs in Node (type stripping), Astro build and the browser island.
//
// Model (matches how the Wise comparison data is expressed):
//   recipient gets  = (send - fee) * providerRate
//   markup %        = (1 - providerRate / midAtCollection) * 100
//   markup cost     = (send - fee) * markup / 100          (in the send currency)
//   true total cost = fee + markup cost                      (in the send currency)

export interface Quote {
  alias: string;
  name: string;
  type: 'bank' | 'provider';
  fee: number; // upfront fee, send currency
  markup: number; // % below mid-market at collection time (negative = above mid)
  rate: number; // provider's exchange rate
  received: number; // what the recipient gets, target currency
  isMid: boolean;
  collectedAt: string; // ISO time the quote was collected by the data source
  delivery: { min: string; max: string } | null;
}

export interface CostLine {
  quote: Quote;
  rank: number; // 1 = recipient gets the most
  fee: number;
  markupCost: number;
  totalCost: number;
  totalPct: number;
  hiddenShare: number | null; // share of total cost hidden in the rate (0..1); null if total <= 0
  midAtCollection: number;
  shortfallVsBest: number; // target currency the recipient gets less than the best quote
}

export function round(n: number, dp = 2): number {
  const f = 10 ** dp;
  return Math.round((n + Number.EPSILON) * f) / f;
}

export function markupCost(send: number, fee: number, markupPct: number): number {
  return Math.max(0, send - fee) * (markupPct / 100);
}

export function totalCost(send: number, fee: number, markupPct: number): number {
  return fee + markupCost(send, fee, markupPct);
}

export function midFromQuote(rate: number, markupPct: number): number {
  const d = 1 - markupPct / 100;
  return d > 0 ? rate / d : rate;
}

/** What the recipient would receive at a given rate after a given fee. */
export function receivedAt(send: number, fee: number, rate: number): number {
  return Math.max(0, send - fee) * rate;
}

/** Implied markup of an arbitrary rate against a reference mid rate, in %. */
export function impliedMarkup(rate: number, mid: number): number {
  if (!(mid > 0)) return NaN;
  return (1 - rate / mid) * 100;
}

export function buildLines(send: number, quotes: Quote[]): CostLine[] {
  const sorted = [...quotes].sort((a, b) => b.received - a.received);
  const best = sorted[0]?.received ?? 0;
  return sorted.map((q, i) => {
    const mc = markupCost(send, q.fee, q.markup);
    const tc = q.fee + mc;
    return {
      quote: q,
      rank: i + 1,
      fee: q.fee,
      markupCost: mc,
      totalCost: tc,
      totalPct: send > 0 ? (tc / send) * 100 : 0,
      hiddenShare: tc > 0 ? Math.max(0, mc) / tc : null,
      midAtCollection: midFromQuote(q.rate, q.markup),
      shortfallVsBest: best - q.received,
    };
  });
}

/** Hours between a quote's collection time and a reference time. */
export function ageHours(collectedAt: string, ref: string | Date): number {
  const a = Date.parse(collectedAt);
  const b = typeof ref === 'string' ? Date.parse(ref) : ref.getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return NaN;
  return (b - a) / 36e5;
}

/** ISO-8601 duration like PT31M27S or P1DT2H -> human text. */
export function humanDuration(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const m = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/.exec(iso);
  if (!m) return null;
  const d = +(m[1] ?? 0), h = +(m[2] ?? 0), min = +(m[3] ?? 0), s = +(m[4] ?? 0);
  const totalMin = d * 1440 + h * 60 + min + s / 60;
  if (totalMin < 1) return 'under a minute';
  if (totalMin < 60) return `~${Math.round(totalMin)} min`;
  if (totalMin < 48 * 60) return `~${Math.round(totalMin / 60)} h`;
  return `~${Math.round(totalMin / 1440)} days`;
}

export interface BandSummary {
  send: number;
  count: number;
  best: CostLine;
  worst: CostLine;
  spreadTarget: number; // best.received - worst.received
  spreadSource: number; // spread converted back at best provider's mid
  zeroFeeWithMarkup: number; // providers advertising no fee but with markup > 0.5%
  bankAvgPct: number | null;
  providerAvgPct: number | null;
  bankHiddenShare: number | null;
}

function avg(xs: number[]): number | null {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
}

export function summarise(send: number, quotes: Quote[]): BandSummary | null {
  if (quotes.length < 1) return null;
  const lines = buildLines(send, quotes);
  const best = lines[0]!;
  const worst = lines[lines.length - 1]!;
  const banks = lines.filter((l) => l.quote.type === 'bank');
  const provs = lines.filter((l) => l.quote.type !== 'bank');
  const bankHidden = banks.map((l) => l.hiddenShare).filter((x): x is number => x !== null);
  const spreadTarget = best.quote.received - worst.quote.received;
  return {
    send,
    count: lines.length,
    best,
    worst,
    spreadTarget,
    spreadSource: best.midAtCollection > 0 ? spreadTarget / best.midAtCollection : 0,
    zeroFeeWithMarkup: lines.filter((l) => l.fee === 0 && l.quote.markup > 0.5).length,
    bankAvgPct: avg(banks.map((l) => l.totalPct)),
    providerAvgPct: avg(provs.map((l) => l.totalPct)),
    bankHiddenShare: avg(bankHidden),
  };
}
