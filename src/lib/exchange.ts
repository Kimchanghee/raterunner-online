/**
 * 환율·송금사 비교 핵심 로직
 *
 * 데이터 소스:
 *  1. 한국은행 ECOS API — https://ecos.bok.or.kr/api/
 *     (매일 매매기준율 일배치)
 *  2. exchangerate-api — https://www.exchangerate-api.com/ (무료 티어)
 *     (실시간 환율, 5분 폴링)
 *  3. 송금사 공시 — Wise, 모인, 센트비, 핀샷 (각 사 페이지 일배치 스크래핑)
 *
 * 주요 통화 페어 (한국 기준): USD, JPY, EUR, GBP, CNY, AUD, CAD, SGD, THB, VND, PHP, HKD
 */

export interface ExchangeRate {
  base: string;
  quote: string;
  rate: number;            // 1 base = rate quote
  source: 'bok' | 'exchangerate-api';
  updatedAt: string;       // ISO timestamp
}

export interface RemittanceQuote {
  provider: 'wise' | 'moin' | 'sentbe' | 'finshot' | 'bank' | 'paypal';
  fromCurrency: string;
  toCurrency: string;
  sendAmount: number;       // 보내는 금액
  exchangeRate: number;     // 적용 환율
  fee: number;              // 수수료 (보내는 통화)
  receiveAmount: number;    // 받는 금액
  marketRate: number;       // 시장 환율
  spreadPct: number;        // 시장 환율 대비 차이 %
  estimatedHours: number;   // 도착 예상 시간
}

/* ECOS (한국은행) 환율 */
export async function fetchBokRates(date: string): Promise<ExchangeRate[]> {
  const apiKey = process.env.BOK_ECOS_API_KEY;
  if (!apiKey) {
    console.warn('BOK_ECOS_API_KEY missing');
    return [];
  }
  const formatted = date.replace(/-/g, '');
  const url = `https://ecos.bok.or.kr/api/StatisticSearch/${apiKey}/json/kr/1/100/036Y001/D/${formatted}/${formatted}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const rows: any[] = data.StatisticSearch?.row || [];
    return rows.map((r) => ({
      base: r.ITEM_NAME1?.split('/')[0] || 'KRW',
      quote: 'KRW',
      rate: parseFloat(r.DATA_VALUE),
      source: 'bok' as const,
      updatedAt: new Date(date).toISOString(),
    }));
  } catch (e) {
    console.error('BOK fetch failed:', e);
    return [];
  }
}

/* 실시간 환율 (5분 캐시) */
export async function fetchLiveRate(base: string): Promise<Record<string, number>> {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`, {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return data.rates || {};
  } catch (e) {
    console.error('Live rate fetch failed:', e);
    return {};
  }
}

/* Wise 견적 (공개 API) */
export async function fetchWiseQuote(
  sourceCurrency: string,
  targetCurrency: string,
  sourceAmount: number
): Promise<Pick<RemittanceQuote, 'sendAmount' | 'exchangeRate' | 'fee' | 'receiveAmount' | 'estimatedHours'> | null> {
  // Wise 공개 견적 endpoint 구조 (인증 없이 접근 가능한 부분)
  // 실제 운영시 Wise 어필리에이트 가입 후 정식 API 사용 권장
  const url = `https://wise.com/gateway/v3/price?sourceAmount=${sourceAmount}&sourceCurrency=${sourceCurrency}&targetCurrency=${targetCurrency}`;
  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    const data = await res.json();
    const quote = data?.[0]?.total ?? data?.priceSetId;
    if (!quote) return null;
    return {
      sendAmount: sourceAmount,
      exchangeRate: data[0]?.midRate || 0,
      fee: data[0]?.fee?.total || 0,
      receiveAmount: data[0]?.targetAmount || 0,
      estimatedHours: 24,
    };
  } catch {
    return null;
  }
}

/* 시장환율 대비 spread 계산 */
export function calculateSpread(providerRate: number, marketRate: number): number {
  return ((marketRate - providerRate) / marketRate) * 100;
}

/* SEO 페이지용: 통화 × 금액대 무한 조합 */
export const POPULAR_PAIRS = [
  ['KRW', 'USD'],
  ['KRW', 'JPY'],
  ['KRW', 'EUR'],
  ['KRW', 'GBP'],
  ['KRW', 'CNY'],
  ['KRW', 'AUD'],
  ['KRW', 'CAD'],
  ['KRW', 'SGD'],
  ['KRW', 'THB'],
  ['KRW', 'VND'],
  ['KRW', 'PHP'],
  ['KRW', 'HKD'],
] as const;

export const AMOUNT_BUCKETS = [100_000, 500_000, 1_000_000, 5_000_000, 10_000_000];
