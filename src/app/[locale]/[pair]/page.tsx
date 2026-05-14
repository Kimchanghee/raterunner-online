import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { fetchLiveRate, POPULAR_PAIRS, AMOUNT_BUCKETS } from '@/lib/exchange';

interface Props {
  params: Promise<{ locale: string; pair: string }>;
}

export const revalidate = 300;

const SUPPORTED_LOCALES = ['ko', 'en'] as const;

function parsePair(pair: string) {
  const [base, quote] = pair.split('-').map((v) => v.toUpperCase());
  const supported = POPULAR_PAIRS.some(([b, q]) => b === base && q === quote);
  return supported ? { base, quote } : null;
}

export default async function PairPage({ params }: Props) {
  const { locale, pair } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as any)) notFound();
  const parsed = parsePair(pair);
  if (!parsed) notFound();
  setRequestLocale(locale);

  const rates = await fetchLiveRate(parsed.base).catch(() => ({} as Record<string, number>));
  const rate = rates[parsed.quote] || 0;

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href={`/${locale}`} className="text-2xl font-bold tracking-tight">
            <span className="text-blue-600">Rate</span>Runner
          </Link>
          <Link href={`/${locale}`} className="text-sm text-slate-600 hover:text-blue-600">All rates</Link>
        </div>
      </header>

      <section className="container mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-4xl font-bold tracking-tight">{parsed.base} to {parsed.quote} exchange rate</h1>
        <p className="mt-3 text-slate-600">
          Live market reference for {parsed.base}/{parsed.quote}, refreshed about every 5 minutes.
        </p>

        <div className="mt-6 rounded-xl border bg-white p-6">
          <div className="text-sm uppercase tracking-wide text-slate-500">Current rate</div>
          <div className="mt-2 font-mono text-4xl font-bold text-blue-600">
            {rate ? rate.toLocaleString('en-US', { maximumFractionDigits: 6 }) : 'Loading'} {parsed.quote}
          </div>
          <p className="mt-2 text-sm text-slate-500">1 {parsed.base}</p>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Popular remittance amounts</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {AMOUNT_BUCKETS.map((amount) => (
            <Link
              key={amount}
              href={`/${locale}/remit/${pair}/${amount}`}
              className="rounded-lg border bg-white p-4 hover:border-blue-400"
            >
              <div className="font-semibold">{amount.toLocaleString('ko-KR')} {parsed.base}</div>
              <div className="text-sm text-slate-500">
                Estimated receive: {rate ? (amount * rate).toLocaleString('en-US', { maximumFractionDigits: 2 }) : '-'} {parsed.quote}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
