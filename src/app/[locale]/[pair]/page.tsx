import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pair } = await params;
  const parsed = parsePair(pair);
  if (!SUPPORTED_LOCALES.includes(locale as any) || !parsed) return {};
  const title = `${parsed.base} to ${parsed.quote} exchange rate | RateRunner`;
  const description = `Live ${parsed.base}/${parsed.quote} exchange rate, examples, spread notes, and transfer planning context.`;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/${pair}/` },
    openGraph: { title, description, url: `https://raterunner.online/${locale}/${pair}/` },
  };
}

export default async function PairPage({ params }: Props) {
  const { locale, pair } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as any)) notFound();
  const parsed = parsePair(pair);
  if (!parsed) notFound();
  setRequestLocale(locale);

  const rates = await fetchLiveRate(parsed.base).catch(() => ({} as Record<string, number>));
  const rate = rates[parsed.quote] || 0;
  const examples = [100_000, 500_000, 1_000_000].map((amount) => ({
    amount,
    receive: rate ? amount * rate : 0,
  }));

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

        <section className="mt-6 rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold">How to use this rate page</h2>
          <p className="mt-3 leading-7 text-slate-700">
            RateRunner keeps the exchange-rate decision on the page before sending you to a bank or transfer provider.
            Compare the live market reference, common remittance amounts, spread, and timing together so the next click is an informed action rather than an ad-driven jump.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {examples.map((row) => (
              <div key={row.amount} className="rounded-lg bg-blue-50 p-4">
                <div className="text-xs uppercase tracking-wide text-blue-700">Example conversion</div>
                <div className="mt-2 font-semibold">{row.amount.toLocaleString('ko-KR')} {parsed.base}</div>
                <div className="mt-1 font-mono text-blue-700">
                  {row.receive ? row.receive.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '-'} {parsed.quote}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 rounded-xl border bg-white p-6">
          <div className="text-sm uppercase tracking-wide text-slate-500">Current rate</div>
          <div className="mt-2 font-mono text-4xl font-bold text-blue-600">
            {rate ? rate.toLocaleString('en-US', { maximumFractionDigits: 6 }) : 'Loading'} {parsed.quote}
          </div>
          <p className="mt-2 text-sm text-slate-500">1 {parsed.base}</p>
        </div>

        <section className="mt-8 rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Before you transfer</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>- Compare both the displayed exchange rate and the fixed fee; a better rate can still lose after fees.</li>
            <li>- Check whether the recipient bank deducts an incoming transfer charge.</li>
            <li>- Recheck the quote near execution time because volatile currencies can move during checkout.</li>
          </ul>
        </section>

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
