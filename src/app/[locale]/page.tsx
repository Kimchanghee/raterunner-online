import { setRequestLocale } from 'next-intl/server';
import { fetchLiveRate, POPULAR_PAIRS, AMOUNT_BUCKETS } from '@/lib/exchange';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export const revalidate = 300; // 5분 ISR

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const krwRates = await fetchLiveRate('KRW').catch(() => ({} as Record<string, number>));

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex max-w-6xl items-center justify-between p-4">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-blue-600">Rate</span>Runner
          </div>
          <nav className="flex gap-3 text-sm">
            <Link href={`/${locale}/remit`} className="hover:text-blue-600">송금 비교</Link>
            <Link href={`/${locale}/cards`} className="hover:text-blue-600">외화 카드</Link>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-50 to-white py-10">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">실시간 환율 + 가장 싼 송금 경로</h1>
          <p className="mt-3 text-slate-600">
            한국은행 매매기준율 + Wise·모인·센트비·핀샷 수수료 5분 단위 비교.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-xl font-semibold">📈 KRW 기준 환율</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {POPULAR_PAIRS.map(([base, quote]) => {
            const rate = krwRates[quote];
            return (
              <Link
                key={`${base}-${quote}`}
                href={`/${locale}/${base.toLowerCase()}-${quote.toLowerCase()}`}
                className="rounded-xl border bg-white p-4 transition hover:border-blue-400 hover:shadow"
              >
                <div className="text-xs text-slate-500">1 KRW =</div>
                <div className="mt-1 font-mono text-lg">
                  {rate ? rate.toFixed(quote === 'JPY' || quote === 'VND' || quote === 'PHP' ? 2 : 6) : '—'}{' '}
                  <span className="text-sm font-normal text-slate-500">{quote}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-xl font-semibold">💸 자주 묻는 송금 시나리오</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AMOUNT_BUCKETS.flatMap((amount) =>
            ['USD', 'JPY', 'EUR'].map((quote) => (
              <Link
                key={`${amount}-${quote}`}
                href={`/${locale}/remit/krw-${quote.toLowerCase()}/${amount}`}
                className="rounded-lg border bg-white p-3 hover:border-blue-400"
              >
                <span className="font-medium">{amount.toLocaleString()}원 → {quote}</span>
                <span className="ml-2 text-xs text-slate-500">가장 싸게 보내는 방법</span>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
