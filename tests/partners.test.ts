import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { partners, partnerLink, anyActive, activeLinks, type Partner } from '../src/lib/partners.ts';
import { buildLines, type Quote } from '../src/lib/cost.ts';

test('all partner programmes ship disabled with no tracking URL', () => {
  assert.ok(partners.length >= 4);
  for (const p of partners) { assert.equal(p.enabled, false); assert.equal(p.trackingUrl, ''); }
  assert.equal(anyActive(), false);
  assert.deepEqual(activeLinks(), {});
});

test('a partner activates only when enabled, https and verified', () => {
  const base: Partner = { alias: 'xe', name: 'Xe', network: 'Impact', enabled: true, trackingUrl: 'https://example.com/t', verifiedAt: '2026-10-19' };
  assert.equal(partnerLink('xe', [base]), 'https://example.com/t');
  assert.equal(partnerLink('xe', [{ ...base, enabled: false }]), '');
  assert.equal(partnerLink('xe', [{ ...base, verifiedAt: '' }]), '');
  assert.equal(partnerLink('xe', [{ ...base, trackingUrl: 'http://example.com/t' }]), '');
  assert.equal(partnerLink('xe', [{ ...base, trackingUrl: 'not a url' }]), '');
  assert.equal(partnerLink('wise', [base]), '');
});

test('ranking ignores partners and commissions', () => {
  const src = readFileSync('src/lib/cost.ts', 'utf8');
  assert.doesNotMatch(src, /partner|affiliat|commission|sponsor/i);
  const q = (alias: string, received: number) => ({ alias, name: alias, type: 'provider', fee: 0, markup: 0, rate: 1, received, isMid: false, collectedAt: '2026-10-19T00:00:00Z', delivery: null }) as unknown as Quote;
  const lines = buildLines(1000, [q('wise', 990), q('remitly', 995), q('xe', 980)]);
  assert.deepEqual(lines.map((l: any) => l.quote.alias), ['remitly', 'wise', 'xe']);
});

test('disclosure renders above the calculator and states ranking independence', () => {
  const calc = readFileSync('src/components/Calculator.astro', 'utf8');
  const at = calc.indexOf('<PartnerDisclosure />');
  assert.ok(at > -1 && at < calc.indexOf('<section class="calc"'));
  const disc = readFileSync('src/components/PartnerDisclosure.astro', 'utf8');
  assert.match(disc, /never affected by commissions/);
  assert.match(disc, /sponsored links/);
  const cta = readFileSync('src/components/ProviderCta.astro', 'utf8');
  assert.match(cta, /rel="sponsored nofollow noopener"/);
  assert.match(cta, /Sponsored link\./);
});
