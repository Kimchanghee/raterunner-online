'use client';

import { useState } from 'react';

export default function FeeWorksheet({ amount, base, quote, referenceRate, stale }: { amount: number; base: string; quote: string; referenceRate: number | null; stale: boolean }) {
  const [fee, setFee] = useState('0');
  const [percent, setPercent] = useState('0');
  const [executionRate, setExecutionRate] = useState('');
  const flat = Number(fee), pct = Number(percent), applied = Number(executionRate);
  const valid = fee.trim() !== '' && percent.trim() !== '' && Number.isFinite(flat) && Number.isFinite(pct) && flat >= 0 && pct >= 0 && pct <= 100;
  const providedRate = executionRate.trim() !== '' && Number.isFinite(applied) && applied > 0;
  const net = valid ? Math.max(0, amount - flat - amount * pct / 100) : null;
  const calculated = net !== null && providedRate ? net * applied : null;
  const receive = calculated !== null && Number.isFinite(calculated) ? calculated : null;
  return <section className="ledger-panel worksheet">
    <div className="panel-heading"><span className="eyebrow">02 / Your scenario</span><h2>Fee worksheet <small>수수료 직접 입력</small></h2></div>
    <p className="source-note">No provider data is loaded. Enter the fee and execution rate from your own dated provider quote. Starting inputs of zero are illustrative placeholders, not free-transfer claims. No provider ranking or delivery-time estimate.</p>
    <div className="worksheet-grid">
      <label>Flat fee <span>{base}</span><input type="number" min="0" step="any" value={fee} onChange={e => setFee(e.target.value)} /></label>
      <label>Percentage fee <span>% of amount</span><input type="number" min="0" max="100" step="any" value={percent} onChange={e => setPercent(e.target.value)} /></label>
      <label>Provider execution rate <span>1 {base} in {quote}</span><input type="number" min="0" step="any" placeholder="Enter quoted rate" value={executionRate} onChange={e => setExecutionRate(e.target.value)} /></label>
    </div>
    <div className="worksheet-results" aria-live="polite">
      <div><span>Send amount</span><strong>{amount.toLocaleString('en-US')} {base}</strong></div>
      <div><span>After entered fees</span><strong>{net === null ? 'Invalid fee inputs' : `${net.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${base}`}</strong></div>
      <div><span>Calculated receive, excluding other charges</span><strong>{receive === null ? 'Enter a valid provider rate' : `${receive.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${quote}`}</strong></div>
    </div>
    <p className="source-note">Public reference: {referenceRate === null ? 'unavailable' : `1 ${base} = ${referenceRate.toPrecision(7)} ${quote}${stale ? ' (stale)' : ''}`}. This is not applied to the worksheet calculation. Check additional intermediary and recipient fees, rate expiry, and delivery time with the provider before sending.</p>
  </section>;
}
