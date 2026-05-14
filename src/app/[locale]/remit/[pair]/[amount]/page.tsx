import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { fetchLiveRate, POPULAR_PAIRS, AMOUNT_BUCKETS } from '@/lib/exchange';

interface Props {
  params: Promise<{ locale: string; pair: string; amount: string }>;
}

export const revalidate = 300;

const SUPPORTED_LOCALES = ['ko', 'en'] as const;

function parsePair(pair: string) {
  const [base, quote] = pair.split('-').map((v) => v.toUpperCase());
  const supported = POPULAR_PAIRS.some(([b, q]) => b === base && q === quote);
  return supported ? { base, quote } : null;
}

function providerRows(amount: number, rate: number) {
  return [
    { name: 'Wise', feePct: 0.006, speed: '1-24h' },
    { name: 'Moin', feePct: 0.008, speed: '1-2d' },
    { name: 'SentBe', feePct: 0.009, speed: '1-2d' },
    { name: 'Bank wire', feePct: 0.015, speed: '2-5d' },
  ].map((p) => {
    const fee = amount * p.feePct;
    return { ...p, fee, receive: Math.max(0, amount - fee) * rate };
  }).sort((a, b) => b.receive - a.receive);
}

export default async function RemitPage({ params }: Props) {
  const { locale, pair, amount: rawAmount } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as any)) notFound();
  const parsed = parsePair(pair);
  const amount = Number(rawAmount);
  if (!parsed || !AMOUNT_BUCKETS.includes(amount as any)) notFound();
  setRequestLocale(locale);

  const rates = await fetchLiveRate(parsed.base).catch(() => ({} as Record<string, number>));
  const rate = rates[parsed.quote] || 0;
  const rows = providerRows(amount, rate);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href={`/${locale}`} className="text-2xl font-bold tracking-tight">
            <span className="text-blue-600">Rate</span>Runner
          </Link>
          <Link href={`/${locale}/${pair}`} className="text-sm text-slate-600 hover:text-blue-600">{pair.toUpperCase()}</Link>
        </div>
      </header>

      <section className="container mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Send {amount.toLocaleString('ko-KR')} {parsed.base} to {parsed.quote}
        </h1>
        <p className="mt-3 text-slate-600">Compare estimated fees, speed and received amount by provider.</p>

        <div className="mt-6 overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="p-3 text-left">Provider</th>
                <th className="p-3 text-right">Fee</th>
                <th className="p-3 text-right">Receive</th>
                <th className="p-3 text-right">Speed</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="border-t">
                  <td className="p-3 font-semibold">{row.name}</td>
                  <td className="p-3 text-right font-mono">{row.fee.toLocaleString('ko-KR', { maximumFractionDigits: 0 })} {parsed.base}</td>
                  <td className="p-3 text-right font-mono text-blue-600">{row.receive.toLocaleString('en-US', { maximumFractionDigits: 2 })} {parsed.quote}</td>
                  <td className="p-3 text-right text-slate-500">{row.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
