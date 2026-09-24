import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import CurrencyConverter from '@/components/CurrencyConverter';
import RateStatus from '@/components/RateStatus';
import { fetchLiveRate, POPULAR_PAIRS, AMOUNT_BUCKETS } from '@/lib/exchange';
import { getReferenceRate } from '@/lib/reference-rate';

interface Props { params: Promise<{ locale: string }> }
export const revalidate = 300;
const SUPPORTED_LOCALES = new Set(['ko', 'en']);
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.has(locale)) return { robots: { index: false, follow: false } };
  return { title: 'RateRunner | Public exchange-rate ledger', description: 'Timestamped public reference exchange rates and a manual remittance fee worksheet. Not provider quotes.', alternates: { canonical: `/${locale}/` } };
}
export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.has(locale)) notFound();
  setRequestLocale(locale);
  const snapshot = await fetchLiveRate('KRW');
  return <main className="ledger-shell">
    <header className="site-header"><Link className="wordmark" href={`/${locale}`}>RATE<span>RUNNER</span><small>REFERENCE LEDGER</small></Link><span className="header-note">PUBLIC DATA / NOT A TRANSFER QUOTE</span></header>
    <div className="ledger-layout">
      <section className="hero"><div className="eyebrow">CURRENCY INTELLIGENCE / 01</div><h1>Know the rate.<br /><em>Check the cost.</em></h1><p>공개 기준 환율을 확인하고, 실제 송금 수수료와 적용 환율은 직접 검증하세요. No provider prices or speeds are claimed here.</p><div className="hero-rule"><span>Source: open.er-api.com</span><span>Server cache: up to 5 min</span></div></section>
      <CurrencyConverter />
      <section className="ledger-panel rates-section"><div className="panel-heading"><span className="eyebrow">03 / Currency pairs</span><h2>KRW reference board <small>기준 환율</small></h2></div><RateStatus snapshot={snapshot} quote="USD" />
        <div className="rate-grid">{POPULAR_PAIRS.map(([base, quote], index) => { const rate = getReferenceRate(snapshot, quote); return <Link className="rate-row" key={quote} href={`/${locale}/${base.toLowerCase()}-${quote.toLowerCase()}`}><span className="row-index">{String(index + 1).padStart(2, '0')}</span><span className="pair-name">{base} / {quote}<small>1 {base} reference</small></span><strong>{rate === null ? 'Unavailable' : rate.toLocaleString('en-US', { maximumFractionDigits: 8 })}</strong><span className="row-arrow">↗</span></Link>; })}</div>
      </section>
      <section className="ledger-panel scenario-section"><div className="panel-heading"><span className="eyebrow">04 / Plan a transfer</span><h2>Scenario worksheets <small>송금 계획</small></h2></div><p className="source-note">These links open blank, non-ranking fee worksheets. Enter the actual provider fee and execution rate yourself.</p><div className="scenario-grid">{AMOUNT_BUCKETS.flatMap(amount => ['USD', 'JPY', 'EUR'].map(quote => <Link key={`${amount}-${quote}`} href={`/${locale}/remit/krw-${quote.toLowerCase()}/${amount}`}>{amount.toLocaleString('ko-KR')} KRW <span>→ {quote} ↗</span></Link>))}</div></section>
    </div>
  </main>;
}
