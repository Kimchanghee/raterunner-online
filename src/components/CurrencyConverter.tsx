'use client';

import { useEffect, useState } from 'react';
import { emptyRate, formatObservedAt, getReferenceRate, parseReferenceRate, rateLabel, type RateSnapshot } from '@/lib/reference-rate';

interface Props { initialFrom?: string; initialTo?: string; initialAmount?: number }
const CURRENCIES = ['KRW', 'USD', 'JPY', 'EUR', 'GBP', 'CNY', 'AUD', 'CAD', 'SGD', 'THB', 'VND', 'PHP', 'HKD'];

export default function CurrencyConverter({ initialFrom = 'KRW', initialTo = 'USD', initialAmount = 1_000_000 }: Props) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [amount, setAmount] = useState(String(initialAmount));
  const [snapshot, setSnapshot] = useState<RateSnapshot>(() => emptyRate(initialFrom));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setSnapshot(emptyRate(from));
    fetch(`https://open.er-api.com/v6/latest/${from}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('HTTP response failed');
        return parseReferenceRate(await response.json(), from);
      })
      .then((result) => { if (!controller.signal.aborted) setSnapshot(result); })
      .catch(() => { if (!controller.signal.aborted) setSnapshot(emptyRate(from, 'error')); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [from]);

  const numericAmount = Number(amount.replace(/,/g, ''));
  const validAmount = amount.trim() !== '' && Number.isFinite(numericAmount) && numericAmount >= 0 && numericAmount <= Number.MAX_SAFE_INTEGER;
  const rate = getReferenceRate(snapshot, to);
  const canCalculate = !loading && validAmount && rate !== null;
  const calculated = canCalculate ? numericAmount * rate : null;
  const result = calculated !== null && Number.isFinite(calculated) ? calculated : null;
  const formatted = (value: number, currency: string) => value.toLocaleString('en-US', {
    maximumFractionDigits: ['JPY', 'KRW', 'VND'].includes(currency) ? 0 : 2,
  });
  return (
    <section className="ledger-panel converter" aria-label="Public reference converter">
      <div className="panel-heading"><span className="eyebrow">01 / Reference desk</span><h2>환율 계산기 <small>Reference converter</small></h2></div>
      <div className="converter-fields">
        <label>보낼 금액 <span>Amount</span><input inputMode="decimal" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} aria-invalid={!validAmount} /></label>
        <label>기준 통화 <span>From</span><select value={from} onChange={(e) => setFrom(e.target.value)}>{CURRENCIES.map(c => <option key={c}>{c}</option>)}</select></label>
        <button type="button" className="swap-button" onClick={() => { setFrom(to); setTo(from); }} aria-label="Swap currencies">⇄</button>
        <label>대상 통화 <span>To</span><select value={to} onChange={(e) => setTo(e.target.value)}>{CURRENCIES.map(c => <option key={c}>{c}</option>)}</select></label>
      </div>
      <div className="result-block" aria-live="polite">
        <div className="result-top"><span className="eyebrow">02 / Calculation</span><span className={`status status-${loading ? 'loading' : rateLabel(snapshot, to).toLowerCase().replaceAll(' ', '-')}`}>{loading ? 'Loading' : rateLabel(snapshot, to)}</span></div>
        {loading ? <p>기준 환율을 불러오는 중입니다. / Loading reference rate…</p>
          : !validAmount ? <p>0 이상의 유효한 금액을 입력하세요. / Enter a valid non-negative amount.</p>
          : result === null ? <p>{snapshot.state === 'error' ? '소스 응답을 확인할 수 없습니다. / Source error. Try again later.' : '이 통화의 환율을 사용할 수 없습니다. / Rate unavailable.'}</p>
          : <><strong className="result-number">{formatted(result, to)} <em>{to}</em></strong><p>1 {from} = {rate?.toPrecision(7)} {to} · 1 {to} = {(1 / rate!).toPrecision(7)} {from}</p></>}
        <p className="source-note">Source: open.er-api.com · Last source update: {formatObservedAt(snapshot.updatedAt)}. {snapshot.state === 'stale' ? 'Older than 36 hours; recheck before using.' : 'Reference only; not a provider execution rate or fee-inclusive quote.'}</p>
      </div>
    </section>
  );
}
