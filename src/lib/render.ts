// HTML string renderers shared by the static build and the browser island, so the server-rendered
// receipt and the live-updated receipt are byte-for-byte the same component.
import { buildLines, ageHours, humanDuration, screen, type Quote, type CostLine } from './cost.ts';
import { money, pct, rate, stamp } from './format.ts';

export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export interface RenderInput {
  from: string;
  to: string;
  send: number;
  quotes: Quote[];
  fetchedAt: string; // when the quotes were retrieved by RateRunner (or by the browser, if live)
  mode: 'snapshot' | 'live' | 'snapshot-fallback';
  requested?: number; // amount the user typed, if different from `send`
}

function provType(q: Quote): string {
  return q.type === 'bank' ? 'bank' : 'transfer service';
}

function ageNote(q: Quote, fetchedAt: string): string {
  const h = ageHours(q.collectedAt, fetchedAt);
  if (!Number.isFinite(h)) return '';
  if (h > 24) return ` <span class="stamp amber" title="Quote collected more than 24 hours before retrieval">${Math.round(h / 24)}d old</span>`;
  return '';
}

export function receiptHtml(inp: RenderInput): string {
  const lines = buildLines(inp.send, screen(inp.quotes, inp.fetchedAt).ranked);
  if (!lines.length) return emptyHtml(inp);
  const best = lines[0]!;
  const worst = lines[lines.length - 1]!;
  const q = best.quote;
  const converted = Math.max(0, inp.send - q.fee);
  const markupLabel = best.markupCost < 0 ? 'Rate above mid-market' : 'Exchange-rate markup';
  const modeLabel =
    inp.mode === 'live'
      ? `<span class="stamp green">Live</span> indicative quotes fetched ${esc(stamp(inp.fetchedAt))}`
      : inp.mode === 'snapshot-fallback'
        ? `<span class="stamp amber">Snapshot</span> live quotes unavailable; showing the ${esc(money(inp.send, inp.from, { dp: 0 }))} snapshot from ${esc(stamp(inp.fetchedAt))}. Fees and markups were not rescaled to your amount.`
        : `<span class="stamp">Snapshot</span> indicative quotes retrieved ${esc(stamp(inp.fetchedAt))}`;
  const gap = worst.quote.received < best.quote.received
    ? `<p class="r-gap">Picking the last quote in this ledger (${esc(worst.quote.name)}) instead would leave the recipient <strong class="num">${esc(money(best.quote.received - worst.quote.received, inp.to))}</strong> short.</p>`
    : '';
  return `
<div class="receipt" data-mode="${inp.mode}">
  <div class="r-head">
    <p class="label">Transfer cost receipt · ${esc(inp.from)} → ${esc(inp.to)}</p>
    <p class="r-best">Most to the recipient: <strong>${esc(q.name)}</strong> <span class="r-type">${provType(q)}</span>${ageNote(q, inp.fetchedAt)}</p>
  </div>
  <dl class="r-lines">
    <div><dt>You send</dt><dd class="num">${esc(money(inp.send, inp.from))}</dd></div>
    <div><dt>Upfront fee</dt><dd class="num">${esc(money(-q.fee, inp.from))}</dd></div>
    <div><dt>Amount converted</dt><dd class="num">${esc(money(converted, inp.from))}</dd></div>
    <div class="r-sub"><dt>Rate given</dt><dd class="num">${esc(rate(q.rate))}</dd></div>
    <div class="r-sub"><dt>Mid-market when quoted</dt><dd class="num">${esc(rate(best.midAtCollection))}</dd></div>
    <div class="r-hidden"><dt>${markupLabel} <span class="r-why">inside the rate</span></dt><dd class="num">${esc(money(best.markupCost, inp.from))} <span class="r-pct">${esc(pct(q.markup))}</span></dd></div>
    <div class="r-total"><dt>True total cost</dt><dd class="num">${esc(money(best.totalCost, inp.from))} <span class="r-pct">${esc(pct(best.totalPct))}</span></dd></div>
    <div class="r-gets"><dt>Recipient gets</dt><dd class="num">${esc(money(q.received, inp.to))}</dd></div>
  </dl>
  ${gap}
  <p class="r-foot">${modeLabel}. Quote collected ${esc(stamp(q.collectedAt))}${q.delivery ? `; provider delivery estimate ${esc(humanDuration(q.delivery.min) ?? '')}` : ''}. Source: Wise public comparison data.</p>
</div>`;
}

export function emptyHtml(inp: { from: string; to: string }): string {
  return `<div class="receipt receipt-empty"><p class="label">No quotes</p><p>No usable quotes are available for ${esc(inp.from)} → ${esc(inp.to)} right now. This corridor is shown as unavailable rather than estimated.</p></div>`;
}

export function ledgerRowsHtml(send: number, from: string, to: string, quotes: Quote[], fetchedAt: string, links: Record<string, string> = {}): string {
  const sc = screen(quotes, fetchedAt);
  const lines: CostLine[] = buildLines(send, sc.ranked);
  const aside = sc.setAside.length
    ? `<tr class="aside-h"><th scope="rowgroup" colspan="7">Set aside, not ranked (`+sc.setAside.length+`): see methodology</th></tr>` +
      sc.setAside.map((s) => `<tr class="aside"><td class="name">`+esc(s.quote.name)+`<span class="tag">`+esc(s.reason)+`</span></td><td class="fee" data-l="fee">`+esc(money(s.quote.fee, from))+`</td><td class="mk" data-l="markup">`+esc(pct(s.quote.markup))+`</td><td class="na">—</td><td class="na">—</td><td class="recv">`+esc(money(s.quote.received, to))+`</td><td class="na">—</td></tr>`).join('')
    : '';
  return lines
    .map((l) => {
      const q = l.quote;
      const href = links[q.alias];
      const name = href ? `<a href="${esc(href)}" data-provider="${esc(q.alias)}">${esc(q.name)}</a>` : esc(q.name);
      return `<tr${l.rank === 1 ? ' class="best"' : ''}>
  <td class="name"><span class="rank">${l.rank}.</span> ${name}<span class="tag">${q.type === 'bank' ? 'bank' : 'service'}</span>${ageNote(q, fetchedAt)}</td>
  <td class="fee" data-l="fee">${esc(money(q.fee, from))}</td>
  <td class="mk" data-l="markup">${esc(pct(q.markup))}</td>
  <td class="cost" data-l="true cost">${esc(money(l.totalCost, from))}</td>
  <td class="pct">${esc(pct(l.totalPct))}</td>
  <td class="recv"><strong>${esc(money(q.received, to))}</strong></td>
  <td class="vs" data-l="vs best">${l.rank === 1 ? 'best' : esc(money(-l.shortfallVsBest, to))}</td>
</tr>`;
    })
    .join('') + aside;
}

export const LEDGER_HEAD = `<thead><tr>
  <th scope="col">Provider</th><th scope="col">Upfront fee</th><th scope="col">Rate markup</th><th scope="col">True cost</th><th scope="col">Cost %</th><th scope="col">Recipient gets</th><th scope="col">vs best</th>
</tr></thead>`;
