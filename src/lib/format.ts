// Formatting helpers shared by pages and the browser island. Deterministic (en-US / en-GB style).
const ZERO_DP = new Set(['JPY', 'KRW', 'VND', 'IDR', 'COP']);

export function dp(cur: string): number {
  return ZERO_DP.has(cur) ? 0 : 2;
}

export function money(n: number, cur: string, opts: { dp?: number; sign?: boolean } = {}): string {
  const d = opts.dp ?? dp(cur);
  const s = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const sign = n < 0 ? '−' : opts.sign && n > 0 ? '+' : '';
  return `${sign}${s} ${cur}`;
}

export function pct(n: number, d = 2): string {
  if (!Number.isFinite(n)) return '—';
  const s = Math.abs(n).toFixed(d);
  return `${n < 0 ? '−' : ''}${s}%`;
}

export function rate(n: number): string {
  if (!Number.isFinite(n)) return '—';
  const d = n >= 100 ? 2 : n >= 1 ? 4 : 6;
  return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "15 October 2026" (UTC) */
export function longDate(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** "15 Oct 2026, 14:57 UTC" */
export function stamp(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]!.slice(0, 3)} ${d.getUTCFullYear()}, ${hh}:${mm} UTC`;
}

export function isoDate(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  return d.toISOString().slice(0, 10);
}

export function plural(n: number, one: string, many = one + 's'): string {
  return `${n} ${n === 1 ? one : many}`;
}
