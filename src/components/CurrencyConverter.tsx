'use client';

import { useState, useEffect, useMemo } from 'react';

interface Props {
  initialFrom?: string;
  initialTo?: string;
  initialAmount?: number;
}

const POPULAR = ['KRW', 'USD', 'JPY', 'EUR', 'GBP', 'CNY', 'AUD', 'CAD', 'SGD', 'THB', 'VND', 'PHP', 'HKD'];

export default function CurrencyConverter({ initialFrom = 'KRW', initialTo = 'USD', initialAmount = 1_000_000 }: Props) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [amount, setAmount] = useState<string>(String(initialAmount));
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // base 통화 환율 fetch (5분 캐시)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    fetch(`https://open.er-api.com/v6/latest/${from}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setRates(data.rates || {});
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [from]);

  const result = useMemo(() => {
    const num = parseFloat(amount.replace(/,/g, '')) || 0;
    const rate = rates[to];
    if (!rate) return null;
    return num * rate;
  }, [amount, rates, to]);

  const swap = () => {
    const oldFrom = from;
    setFrom(to);
    setTo(oldFrom);
  };

  const fmt = (n: number, currency: string) => {
    const d = ['JPY', 'KRW', 'VND', 'IDR'].includes(currency) ? 0 : 2;
    return n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="grid gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-2xl font-mono focus:border-blue-500 focus:outline-none"
            inputMode="decimal"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              {POPULAR.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex items-end justify-center">
            <button
              onClick={swap}
              className="mb-1 rounded-full border bg-slate-50 p-2 hover:bg-slate-100 transition"
              aria-label="Swap currencies"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              {POPULAR.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-5">
          {loading ? (
            <div className="text-slate-500 text-center">환율 가져오는 중...</div>
          ) : error ? (
            <div className="text-red-700">{error}</div>
          ) : result === null ? null : (
            <>
              <div className="text-xs text-blue-700">
                {amount} {from} =
              </div>
              <div className="mt-1 text-3xl font-bold text-blue-900">
                {fmt(result, to)} <span className="text-lg font-medium text-blue-700">{to}</span>
              </div>
              <div className="mt-2 text-xs text-blue-700">
                1 {from} = {rates[to]?.toFixed(6)} {to} · 1 {to} = {(1 / (rates[to] || 1)).toFixed(6)} {from}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Live mid-market rate · 5분마다 갱신
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {[100_000, 500_000, 1_000_000, 5_000_000, 10_000_000].map((v) => (
            <button
              key={v}
              onClick={() => setAmount(String(v))}
              className="rounded-full bg-slate-100 px-3 py-1 hover:bg-slate-200"
            >
              {v.toLocaleString()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
