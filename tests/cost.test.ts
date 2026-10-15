import { test } from 'node:test';
import assert from 'node:assert/strict';
import { markupCost, totalCost, midFromQuote, receivedAt, impliedMarkup, buildLines, summarise, humanDuration, ageHours, round } from '../src/lib/cost.ts';

// Hand-computed case (USD->MXN, $1,000, quote as published in the Wise comparison data on 2026-10-13):
// fee $1.99, markup 2.30526545 %, rate 18.0901339966, recipient gets 18,054.13 MXN.
// markup cost = (1000 - 1.99) * 0.0230526545 = 998.01 * 0.0230526545 = 23.00678...
// total       = 1.99 + 23.00678 = 24.99678 -> $25.00 (2.50 %)
test('markup and total cost match hand computation', () => {
  assert.equal(round(markupCost(1000, 1.99, 2.30526545), 4), 23.0068);
  assert.equal(round(totalCost(1000, 1.99, 2.30526545), 2), 25.00);
});

test('received amount reproduces the provider figure', () => {
  assert.equal(round(receivedAt(1000, 1.99, 18.0901339966), 2), 18054.13);
});

test('mid-market at collection is rate / (1 - markup)', () => {
  // 18.0901339966 / (1 - 0.0230526545) = 18.51698...
  assert.equal(round(midFromQuote(18.0901339966, 2.30526545), 4), 18.517);
  assert.equal(midFromQuote(18.4365, 0), 18.4365);
});

test('implied markup of a rate against a reference', () => {
  // 18.0 vs mid 18.5 -> (1 - 18/18.5) * 100 = 2.7027 %
  assert.equal(round(impliedMarkup(18, 18.5), 4), 2.7027);
  assert.ok(Number.isNaN(impliedMarkup(18, 0)));
});

test('zero fee, zero markup costs nothing; fee larger than send is clamped', () => {
  assert.equal(totalCost(500, 0, 0), 0);
  assert.equal(markupCost(5, 10, 3), 0);
  assert.equal(receivedAt(5, 10, 18), 0);
});

test('negative markup (rate above mid at collection) yields negative markup cost', () => {
  // Xoom-style: fee 0, markup -0.8368989 % on $1,000 -> -8.368989
  assert.equal(round(totalCost(1000, 0, -0.8368989), 4), -8.369);
});

const quotes = [
  { alias: 'a', name: 'Bank A', type: 'bank', fee: 5, markup: 3, rate: 17.95, received: 17860.25, isMid: false, collectedAt: '2026-10-15T00:00:00Z', delivery: null },
  { alias: 'b', name: 'Specialist B', type: 'provider', fee: 0, markup: 1, rate: 18.315, received: 18315, isMid: false, collectedAt: '2026-10-15T00:00:00Z', delivery: null },
  { alias: 'c', name: 'Specialist C', type: 'provider', fee: 8, markup: 0, rate: 18.5, received: 18352, isMid: true, collectedAt: '2026-10-14T12:00:00Z', delivery: { min: 'PT30M', max: 'PT30M' } },
];

test('lines ranked by what the recipient gets, with shortfall', () => {
  const lines = buildLines(1000, quotes);
  assert.deepEqual(lines.map((l) => l.quote.alias), ['c', 'b', 'a']);
  assert.equal(lines[0].rank, 1);
  assert.equal(round(lines[2].shortfallVsBest, 2), 491.75);
  // bank A: 5 + 995*0.03 = 34.85 -> 3.485 %
  assert.equal(round(lines[2].totalCost, 2), 34.85);
  assert.equal(round(lines[2].totalPct, 3), 3.485);
  // hidden share: 29.85 / 34.85
  assert.equal(round(lines[2].hiddenShare, 4), round(29.85 / 34.85, 4));
  assert.equal(lines[0].hiddenShare, 0);
});

test('summary statistics', () => {
  const s = summarise(1000, quotes);
  assert.equal(s.count, 3);
  assert.equal(s.best.quote.alias, 'c');
  assert.equal(s.worst.quote.alias, 'a');
  assert.equal(round(s.spreadTarget, 2), 491.75);
  assert.equal(s.zeroFeeWithMarkup, 1);
  assert.equal(round(s.bankAvgPct, 3), 3.485);
  // providers: B 1.0 %, C 0.8 % -> 0.9 %
  assert.equal(round(s.providerAvgPct, 3), 0.9);
  assert.equal(summarise(1000, []), null);
});

test('durations and ages', () => {
  assert.equal(humanDuration('PT31M27S'), '~31 min');
  assert.equal(humanDuration('PT20S'), 'under a minute');
  assert.equal(humanDuration('P2DT4H'), '~2 days');
  assert.equal(humanDuration('PT5H'), '~5 h');
  assert.equal(humanDuration(null), null);
  assert.equal(humanDuration('garbage'), null);
  assert.equal(ageHours('2026-10-14T12:00:00Z', '2026-10-15T00:00:00Z'), 12);
});
