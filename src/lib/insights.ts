// Cross-corridor statistics computed from the committed snapshot. Everything here is derived, never typed in.
import { allCorridors, HEADLINE_AMOUNT, type CorridorView } from './data.ts';
import { buildLines } from './cost.ts';

export interface Overview {
  corridors: number;
  quotes: number;
  providers: number;
  amount: number;
  medianBestPct: number;
  cheapest: CorridorView[];
  priciest: CorridorView[];
  bankAvgPct: number | null;
  serviceAvgPct: number | null;
  bankQuotes: number;
  serviceQuotes: number;
  zeroFeeQuotes: number;
  zeroFeeWithMarkup: number;
  medianHiddenShare: number | null;
  oldestFetch: string | null;
  newestFetch: string | null;
  staleBands: number;
}

function median(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length ? (s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2) : NaN;
}

export function bestPct(v: CorridorView, amount = HEADLINE_AMOUNT): number {
  const b = v.bands.find((x) => x.amount === amount);
  return b ? b.summary.best.totalPct : NaN;
}

export function overview(amount = HEADLINE_AMOUNT): Overview {
  const all = allCorridors();
  const withBand = all.filter((v) => v.bands.some((b) => b.amount === amount));
  const lines = withBand.flatMap((v) => {
    const b = v.bands.find((x) => x.amount === amount)!;
    return buildLines(amount, b.band.providers);
  });
  const banks = lines.filter((l) => l.quote.type === 'bank');
  const svc = lines.filter((l) => l.quote.type !== 'bank');
  const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);
  const byBest = [...withBand].sort((a, b) => bestPct(a, amount) - bestPct(b, amount));
  const fetches = all.flatMap((v) => v.bands.map((b) => b.band.fetchedAt)).sort();
  const hidden = lines.map((l) => l.hiddenShare).filter((x): x is number => x !== null);
  return {
    corridors: withBand.length,
    quotes: lines.length,
    providers: new Set(lines.map((l) => l.quote.alias)).size,
    amount,
    medianBestPct: median(withBand.map((v) => bestPct(v, amount))),
    cheapest: byBest.slice(0, 5),
    priciest: byBest.slice(-5).reverse(),
    bankAvgPct: avg(banks.map((l) => l.totalPct)),
    serviceAvgPct: avg(svc.map((l) => l.totalPct)),
    bankQuotes: banks.length,
    serviceQuotes: svc.length,
    zeroFeeQuotes: lines.filter((l) => l.fee === 0).length,
    zeroFeeWithMarkup: lines.filter((l) => l.fee === 0 && l.quote.markup > 0.5).length,
    medianHiddenShare: hidden.length ? median(hidden) : null,
    oldestFetch: fetches[0] ?? null,
    newestFetch: fetches.at(-1) ?? null,
    staleBands: all.reduce((n, v) => n + v.bands.filter((b) => b.band.stale).length, 0),
  };
}

/** Page-specific findings for one corridor, as plain sentences built from its own numbers. */
export function corridorFindings(v: CorridorView, fmt: { money: (n: number, c: string) => string; pct: (n: number) => string }): string[] {
  const out: string[] = [];
  const bySize = v.bands;
  const winners = bySize.map((b) => b.summary.best.quote.name);
  if (new Set(winners).size > 1) {
    out.push(`The provider that delivers the most changes with the amount: ${bySize.map((b) => `${b.summary.best.quote.name} at ${fmt.money(b.amount, v.from)}`).join(', ')}. Fixed fees weigh heavily on small transfers; rate margins dominate large ones.`);
  } else if (winners.length) {
    out.push(`${winners[0]} delivered the most at every snapshot amount (${bySize.map((b) => fmt.money(b.amount, v.from)).join(', ')}).`);
  }
  for (const b of bySize) {
    const s = b.summary;
    if (s.count > 1 && s.best.totalPct >= 0) {
      out.push(`At ${fmt.money(b.amount, v.from)}, true cost ranged from ${fmt.pct(s.best.totalPct)} (${s.best.quote.name}) to ${fmt.pct(s.worst.totalPct)} (${s.worst.quote.name}); the recipient would get ${fmt.money(s.spreadTarget, v.to)} less with the last quote than with the first.`);
      break;
    }
  }
  const h = v.headline?.summary;
  if (h) {
    if (h.bankAvgPct !== null && h.providerAvgPct !== null) {
      out.push(`Banks listed for this corridor averaged ${fmt.pct(h.bankAvgPct)} in true cost at ${fmt.money(h.send, v.from)}, against ${fmt.pct(h.providerAvgPct)} for non-bank transfer services${h.bankHiddenShare !== null ? `; on average ${Math.round(h.bankHiddenShare * 100)}% of the banks' cost sat inside the exchange rate rather than in a stated fee` : ''}.`);
    }
    if (h.zeroFeeWithMarkup > 0) {
      out.push(`${h.zeroFeeWithMarkup} of ${h.count} quotes at ${fmt.money(h.send, v.from)} charged no upfront fee but priced in a rate markup above 0.5%, so “no fee” did not mean free.`);
    }
    const neg = buildLines(h.send, v.headline!.band.providers).filter((l) => l.quote.markup < 0);
    if (neg.length) {
      out.push(`${neg.map((l) => l.quote.name).join(' and ')} quoted a rate above the mid-market rate recorded at collection time (negative markup). That usually reflects a promotional rate or a quote collected at a different moment, so confirm it before relying on it.`);
    }
  }
  return out;
}
