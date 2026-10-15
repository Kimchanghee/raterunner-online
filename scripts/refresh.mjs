#!/usr/bin/env node
// Refresh public data snapshots into src/data/*.json.
// - Indicative multi-provider quotes: Wise public comparison endpoint (api.wise.com/v4/comparisons)
// - Reference rates: Frankfurter (ECB reference rates) api.frankfurter.dev
// Rules: on any failure keep the last good value and its real timestamp. Never invent or interpolate.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'src', 'data');
const UA = 'raterunner.online data refresh (+https://raterunner.online; contact@raterunner.online)';
const DELAY_MS = 900; // be polite: ~1 request per second

const corridors = JSON.parse(await readFile(path.join(dataDir, 'corridors.json'), 'utf8'));
const AMOUNTS = corridors.amounts;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, tries = 2) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' }, signal: AbortSignal.timeout(20000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
      await sleep(1500);
    }
  }
  throw lastErr;
}

async function readPrev(file) {
  try { return JSON.parse(await readFile(path.join(dataDir, file), 'utf8')); } catch { return null; }
}

function num(v) { return typeof v === 'number' && Number.isFinite(v) ? v : null; }

function normalise(payload) {
  const out = [];
  for (const p of payload.providers ?? []) {
    const q = (p.quotes ?? [])[0];
    if (!q) continue;
    const fee = num(q.fee), markup = num(q.markup), rate = num(q.rate), received = num(q.receivedAmount);
    if (fee === null || markup === null || rate === null || received === null || received <= 0) continue;
    const d = q.deliveryEstimation?.duration;
    out.push({
      alias: String(p.alias), name: String(p.name), type: p.type === 'bank' ? 'bank' : 'provider',
      fee, markup, rate, received,
      isMid: Boolean(q.isConsideredMidMarketRate),
      collectedAt: String(q.dateCollected),
      delivery: d && d.min ? { min: String(d.min), max: String(d.max ?? d.min) } : null,
    });
  }
  out.sort((a, b) => b.received - a.received);
  return out;
}

async function refreshQuotes() {
  const prev = (await readPrev('quotes.json')) ?? { corridors: {} };
  const next = {
    source: 'Wise public comparison data (indicative quotes collected by Wise)',
    sourceUrl: 'https://wise.com/gb/compare/',
    endpoint: 'https://api.wise.com/v4/comparisons/',
    asOf: prev.asOf ?? null,
    corridors: {},
  };
  let ok = 0, failed = 0;
  for (const c of corridors.list) {
    const key = `${c.from}-${c.to}`;
    const prevC = prev.corridors?.[key] ?? { bands: {} };
    const bands = {};
    for (const amt of AMOUNTS) {
      const url = `${next.endpoint}?sourceCurrency=${c.from}&targetCurrency=${c.to}&sendAmount=${amt}`;
      try {
        const j = await getJson(url);
        const providers = normalise(j);
        if (providers.length < 2) throw new Error('fewer than 2 usable quotes');
        bands[amt] = { fetchedAt: new Date().toISOString(), providers };
        ok++;
      } catch (e) {
        failed++;
        console.warn(`[quotes] ${key} ${amt}: ${e.message} -> keeping last good snapshot`);
        if (prevC.bands?.[amt]) bands[amt] = { ...prevC.bands[amt], stale: true };
      }
      await sleep(DELAY_MS);
    }
    next.corridors[key] = { from: c.from, to: c.to, bands };
  }
  if (ok > 0) next.asOf = new Date().toISOString();
  await writeFile(path.join(dataDir, 'quotes.json'), JSON.stringify(next, null, 1) + '\n');
  console.log(`[quotes] ok=${ok} failed=${failed} asOf=${next.asOf}`);
  return { ok, failed };
}

async function refreshReference() {
  const prev = (await readPrev('reference.json')) ?? { bases: {} };
  const next = {
    source: 'Frankfurter (European Central Bank reference rates)',
    sourceUrl: 'https://frankfurter.dev/',
    bases: { ...prev.bases },
  };
  const bases = [...new Set(corridors.list.map((c) => c.from))];
  let ok = 0;
  for (const b of bases) {
    try {
      const j = await getJson(`https://api.frankfurter.dev/v1/latest?from=${b}`);
      if (!j?.rates || !j?.date) throw new Error('unexpected payload');
      next.bases[b] = { date: j.date, rates: j.rates };
      ok++;
    } catch (e) {
      console.warn(`[reference] ${b}: ${e.message} -> keeping last good`);
    }
    await sleep(300);
  }
  const dates = Object.values(next.bases).map((x) => x.date).sort();
  next.asOf = dates.at(-1) ?? null;
  await writeFile(path.join(dataDir, 'reference.json'), JSON.stringify(next, null, 1) + '\n');
  console.log(`[reference] ok=${ok}/${bases.length} asOf=${next.asOf}`);
  return ok;
}

const q = await refreshQuotes();
await refreshReference();
// Fail only when nothing at all could be fetched AND no previous snapshot exists.
const have = JSON.parse(await readFile(path.join(dataDir, 'quotes.json'), 'utf8'));
if (!have.asOf) { console.error('No quote data available at all.'); process.exit(1); }
if (q.ok === 0) console.warn('All quote fetches failed; site will render last good snapshot with its real asOf.');
