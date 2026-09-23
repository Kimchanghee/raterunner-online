import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import RateStatus from '@/components/RateStatus';
import { fetchLiveRate, POPULAR_PAIRS, AMOUNT_BUCKETS } from '@/lib/exchange';
import { getReferenceRate } from '@/lib/reference-rate';

interface Props { params: Promise<{ locale: string; pair: string }> }
export const revalidate = 300;
const SUPPORTED_LOCALES = ['ko', 'en'];
function parsePair(pair: string) { const [base, quote] = pair.split('-').map(v => v.toUpperCase()); return POPULAR_PAIRS.some(([b, q]) => b === base && q === quote) ? { base, quote } : null; }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pair } = await params; const parsed = parsePair(pair);
  if (!SUPPORTED_LOCALES.includes(locale) || !parsed) return {};
  return { title: `${parsed.base}/${parsed.quote} public reference | RateRunner`, description: `Timestamped reference rate and conversion examples for ${parsed.base}/${parsed.quote}. Not a provider quote.`, alternates: { canonical: `/${locale}/${pair}/` } };
}
export default async function PairPage({ params }: Props) {
  const { locale, pair } = await params; const parsed = parsePair(pair);
  if (!SUPPORTED_LOCALES.includes(locale) || !parsed) notFound();
  setRequestLocale(locale);
  const snapshot = await fetchLiveRate(parsed.base); const rate = getReferenceRate(snapshot, parsed.quote);
  return <main className="ledger-shell"><header className="site-header"><Link className="wordmark" href={`/${locale}`}>RATE<span>RUNNER</span><small>REFERENCE LEDGER</small></Link><Link className="header-note" href={`/${locale}`}>← ALL RATES</Link></header>
    <div className="ledger-layout narrow"><nav className="breadcrumb"><Link href={`/${locale}`}>Rate board</Link><span>/</span>{parsed.base} / {parsed.quote}</nav>
      <section className="hero compact"><div className="eyebrow">PAIR DOSSIER / {parsed.base} → {parsed.quote}</div><h1>{parsed.base} <em>/ {parsed.quote}</em></h1><p>Public exchange-rate reference. Confirm provider execution rates and fees separately before sending.</p></section>
      <section className="ledger-panel pair-hero"><div className="panel-heading"><span className="eyebrow">01 / Observed reference</span><h2>1 {parsed.base} in {parsed.quote}</h2></div><div className="big-rate">{rate === null ? 'Rate unavailable' : rate.toLocaleString('en-US', { maximumFractionDigits: 8 })} {rate !== null && <small>{parsed.quote}</small>}</div><RateStatus snapshot={snapshot} quote={parsed.quote} /></section>
      <section className="ledger-panel"><div className="panel-heading"><span className="eyebrow">02 / Arithmetic only</span><h2>Conversion examples <small>before fees and spread</small></h2></div><div className="example-grid">{[100_000, 500_000, 1_000_000].map(amount => <div className="example-cell" key={amount}><span>{amount.toLocaleString('en-US')} {parsed.base}</span><strong>{rate === null ? 'Unavailable' : (amount * rate).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ` ${parsed.quote}`}</strong></div>)}</div><p className="source-note">These are multiplication examples, not transfer proceeds. {snapshot.state === 'stale' ? 'The source rate is stale.' : ''}</p></section>
      <section className="ledger-panel"><div className="panel-heading"><span className="eyebrow">03 / Next step</span><h2>Fee worksheets <small>not provider rankings</small></h2></div><div className="scenario-grid">{AMOUNT_BUCKETS.map(amount => <Link key={amount} href={`/${locale}/remit/${pair}/${amount}`}>{amount.toLocaleString('en-US')} {parsed.base}<span>Open worksheet ↗</span></Link>)}</div><p className="source-note">Ask each provider for its own timestamped rate, fixed/percentage fees, intermediary charges, and delivery estimate.</p></section>
    </div></main>;
}
