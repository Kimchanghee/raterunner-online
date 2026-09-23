import test from 'node:test';
import assert from 'node:assert/strict';
import { parseReferenceRate, getReferenceRate, rateLabel, STALE_AFTER_MS } from '../src/lib/reference-rate.ts';
const now = Date.UTC(2026, 8, 23);
const valid = { result: 'success', base_code: 'KRW', time_last_update_unix: Math.floor(now / 1000), rates: { USD: 0.00073, EUR: 0, JPY: -1, GBP: Infinity } };
test('valid source rate and absent/invalid targets', () => {
  const snapshot = parseReferenceRate(valid, 'KRW', now);
  assert.equal(snapshot.state, 'available');
  assert.equal(getReferenceRate(snapshot, 'USD'), 0.00073);
  assert.equal(getReferenceRate(snapshot, 'EUR'), null);
  assert.equal(rateLabel(snapshot, 'EUR'), 'Rate unavailable');
});
test('source timestamp beyond threshold is stale, not current', () => {
  const snapshot = parseReferenceRate({ ...valid, time_last_update_unix: Math.floor((now - STALE_AFTER_MS - 1000) / 1000) }, 'KRW', now);
  assert.equal(snapshot.state, 'stale');
  assert.equal(rateLabel(snapshot, 'USD'), 'Stale reference');
});
test('bad response status, base and shapes are errors without pseudoquotes', () => {
  for (const body of [null, { ...valid, result: 'error' }, { ...valid, base_code: 'USD' }, { ...valid, rates: {} }, { ...valid, time_last_update_unix: 'unknown' }, { ...valid, rates: { USD: 0 } }]) {
    const snapshot = parseReferenceRate(body, 'KRW', now);
    assert.equal(snapshot.state, 'error');
    assert.equal(getReferenceRate(snapshot, 'USD'), null);
  }
});
