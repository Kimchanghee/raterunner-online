import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import FeeWorksheet from '@/components/FeeWorksheet';
import RateStatus from '@/components/RateStatus';
import { fetchLiveRate, POPULAR_PAIRS, AMOUNT_BUCKETS } from '@/lib/exchange';
import { getReferenceRate } from '@/lib/reference-rate';

interface Props { params: Promise<{ locale: string; pair: string; amount: string }> }
export const revalidate = 300;
const SUPPORTED_LOCALES = ['ko', 'en'];
function parsePair(pair: string) { const [base, quote] = pair.split('-').map(v => v.toUpperCase()); return POPULAR_PAIRS.some(([b, q]) => b === base && q === quote) ? { base, quote } : null; }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pair, amount: rawAmount } = await params;
  const parsed = parsePair(pair); const amount = Number(rawAmount);
  if (!SUPPORTED_LOCALES.includes(locale) || !parsed || !AMOUNT_BUCKETS.includes(amount)) return {};
  return { title: `${amount.toLocaleString('en-US')} ${parsed.base} to ${parsed.quote} fee worksheet | RateRunner`, description: 'Manual remittance fee worksheet. No current provider quotes, rankings, or delivery estimates.', alternates: { canonical: `/${locale}/remit/${pair}/${rawAmount}/` } };
}
export default async function RemitPage({ params }: Props) {
  const { locale, pair, amount: rawAmount } = await params; const parsed = parsePair(pair); const amount = Number(rawAmount);
  if (!SUPPORTED_LOCALES.includes(locale) || !parsed || !AMOUNT_BUCKETS.includes(amount)) notFound();
  setRequestLocale(locale);
  const snapshot = await fetchLiveRate(parsed.base); const rate = getReferenceRate(snapshot, parsed.quote);
  return <main className="ledger-shell"><header className="site-header"><Link className="wordmark" href={`/${locale}`}>RATE<span>RUNNER</span><small>REFERENCE LEDGER</small></Link><Link className="header-note" href={`/${locale}/${pair}`}>← PAIR DETAILS</Link></header>
    <div className="ledger-layout narrow"><nav className="breadcrumb"><Link href={`/${locale}`}>Rate board</Link><span>/</span><Link href={`/${locale}/${pair}`}>{parsed.base}/{parsed.quote}</Link><span>/</span>Worksheet</nav>
      <section className="hero compact"><div className="eyebrow">TRANSFER PLANNING / NO PROVIDER RANKING</div><h1>{amount.toLocaleString('en-US')} {parsed.base}<br /><em>to {parsed.quote}</em></h1><p>송금사별 실시간 견적이 아닙니다. Enter an actual provider quote to model net proceeds. Nothing here predicts delivery time.</p></section>
      <section className="ledger-panel"><div className="panel-heading"><span className="eyebrow">01 / Separate source</span><h2>Public rate reference</h2></div><div className="big-rate">{rate === null ? 'Rate unavailable' : `1 ${parsed.base} = ${rate.toLocaleString('en-US', { maximumFractionDigits: 8 })} ${parsed.quote}`}</div><RateStatus snapshot={snapshot} quote={parsed.quote} /></section>
      <FeeWorksheet amount={amount} base={parsed.base} quote={parsed.quote} referenceRate={rate} stale={snapshot.state === 'stale'} />
      <section className="ledger-panel checklist"><div className="panel-heading"><span className="eyebrow">03 / Verify before sending</span><h2>Quote checklist</h2></div><ol><li>Confirm provider execution rate and its expiry.</li><li>Check fixed and percentage fees plus intermediary/recipient deductions.</li><li>Check provider-specific availability and delivery time directly.</li></ol></section>
    </div></main>;
}
