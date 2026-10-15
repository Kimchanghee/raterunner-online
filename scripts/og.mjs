#!/usr/bin/env node
// Build-time Open Graph images (1200x630 PNG) rendered from SVG with resvg.
// Receipt-slip look: desk paper, torn-edge slip, mono header, dashed ledger rules, red cost stamp.
// Uses system Georgia/Consolas (present on the Windows build PC); falls back to system fonts.
import { Resvg } from '@resvg/resvg-js';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'og');
const quotes = JSON.parse(readFileSync(join(root, 'src', 'data', 'quotes.json'), 'utf8'));
const asOf = new Date(quotes.asOf).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const PLACE = { MXN: 'Mexico', INR: 'India', PHP: 'the Philippines', GTQ: 'Guatemala', CNY: 'China', VND: 'Vietnam', PKR: 'Pakistan', COP: 'Colombia', KRW: 'South Korea', BRL: 'Brazil', EUR: 'the eurozone', GBP: 'the UK', CAD: 'Canada', JPY: 'Japan', BDT: 'Bangladesh', EGP: 'Egypt', THB: 'Thailand', IDR: 'Indonesia', AUD: 'Australia', USD: 'the US', PLN: 'Poland', ZAR: 'South Africa', MAD: 'Morocco', TRY: 'Turkey', NGN: 'Nigeria', KES: 'Kenya', NPR: 'Nepal', LKR: 'Sri Lanka', CHF: 'Switzerland', SGD: 'Singapore', NZD: 'New Zealand', HKD: 'Hong Kong' };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function wrap(text, max) {
  const lines = []; let cur = '';
  for (const w of text.split(/\s+/)) { if ((cur + ' ' + w).trim().length > max) { if (cur) lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }
  if (cur) lines.push(cur);
  return lines;
}
const zig = (() => { let d = 'M140 560'; for (let x = 140; x < 1060; x += 20) d += ` L${x + 10} 574 L${x + 20} 560`; return d + ' L1060 40 L140 40 Z'; })();

function card({ kicker, title, sub = '', line = 'TRUE COST = FEE + FX MARKUP' }) {
  const size = title.length > 64 ? 46 : title.length > 40 ? 54 : 66;
  const lines = wrap(title, Math.floor(1300 / (size * 0.95))).slice(0, 4);
  const lh = size * 1.14;
  const y0 = 250 - ((lines.length - 1) * lh) / 2;
  const subLines = sub ? wrap(sub, 62).slice(0, 2) : [];
  const ySub = y0 + (lines.length - 1) * lh + 58;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#e6dfcc"/>
  <path d="${zig}" fill="#fffdf6" stroke="#cbc3ae" stroke-width="1.5"/>
  <text x="190" y="98" font-family="Consolas" font-weight="700" font-size="26" letter-spacing="3" fill="#1a1915">RATERUNNER</text>
  <text x="1010" y="98" text-anchor="end" font-family="Consolas" font-size="20" letter-spacing="2" fill="#6b665a">${esc(kicker.toUpperCase())}</text>
  <line x1="190" y1="120" x2="1010" y2="120" stroke="#1a1915" stroke-width="2"/>
  ${lines.map((l, i) => `<text x="190" y="${(y0 + i * lh).toFixed(0)}" font-family="Georgia" font-weight="700" font-size="${size}" fill="#1a1915">${esc(l)}</text>`).join('\n  ')}
  ${subLines.map((l, i) => `<text x="190" y="${(ySub + i * 34).toFixed(0)}" font-family="Consolas" font-size="24" fill="#514d43">${esc(l)}</text>`).join('\n  ')}
  <line x1="190" y1="450" x2="1010" y2="450" stroke="#1a1915" stroke-width="1.5" stroke-dasharray="6 6"/>
  <text x="190" y="496" font-family="Consolas" font-size="22" fill="#514d43">raterunner.online · as of ${esc(asOf)}</text>
  <g transform="rotate(-3 870 500)"><rect x="725" y="474" width="290" height="52" fill="none" stroke="#a3161b" stroke-width="3"/>
  <text x="870" y="507" text-anchor="middle" font-family="Consolas" font-weight="700" font-size="16" fill="#a3161b">${esc(line)}</text></g>
</svg>`;
}

const WIN = 'C:/Windows/Fonts/';
const fontFiles = ['georgia.ttf', 'georgiab.ttf', 'consola.ttf', 'consolab.ttf'].map((f) => WIN + f).filter((f) => existsSync(f));
const fontOpt = fontFiles.length === 4 ? { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Georgia' } : { loadSystemFonts: true, defaultFontFamily: 'Georgia' };
function render(svg, file, width = 1200) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: fontOpt }).render().asPng();
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, png);
}

const t0 = Date.now();
const n = Object.keys(quotes.corridors).length;
const pages = [
  ['default', { kicker: 'Transfer cost receipt', title: 'What an international money transfer really costs', sub: `Fee + exchange-rate markup, ${n} corridors` }],
  ['home', { kicker: 'Calculator', title: 'What will your transfer really cost?', sub: `Ranked by what the recipient gets · ${n} corridors` }],
  ['send', { kicker: 'Corridor ledgers', title: `${n} money transfer corridors, itemised`, sub: 'Every quote split into fee and hidden markup' }],
  ['guides', { kicker: 'Guides', title: 'Fees, markups, timing, limits and tax', sub: 'Sourced, dated guides to sending money abroad' }],
  ['hidden-fx-markup', { kicker: 'Markup checker', title: 'How much markup is hidden in your exchange rate?', line: 'MARKUP = 1 - RATE / MID' }],
];
for (const [name, c] of pages) render(card(c), join(out, `${name}.png`));

const gdir = join(root, 'src', 'content', 'guides');
let g = 0;
for (const f of readdirSync(gdir).filter((x) => x.endsWith('.md'))) {
  const md = readFileSync(join(gdir, f), 'utf8');
  const t = (md.match(/^title:\s*"(.+)"\s*$/m) || [])[1] || f;
  render(card({ kicker: 'Guide', title: t }), join(out, `guide-${f.replace(/\.md$/, '')}.png`)); g++;
}

for (const c of Object.values(quotes.corridors)) {
  const slug = `${c.from}-to-${c.to}`.toLowerCase();
  const count = c.bands['1000']?.providers?.length ?? 0;
  render(card({ kicker: `${c.from} → ${c.to}`, title: `What does it cost to send ${c.from} to ${PLACE[c.to] ?? c.to}?`, sub: `${count} quotes for 1,000 ${c.from}, ranked by amount received` }), join(out, `send-${slug}.png`));
}

render(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#fffdf6"/><text x="60" y="380" font-family="Consolas" font-weight="700" font-size="330" fill="#1a1915">R</text><rect x="330" y="300" width="130" height="80" fill="none" stroke="#a3161b" stroke-width="16"/></svg>`, join(out, 'logo.png'), 512);
console.log(`[og] ${pages.length + g + n + 1} images in ${Date.now() - t0} ms`);
