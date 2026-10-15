// QA screenshots + overflow/CLS/focus checks. Usage: node qa/shots.cjs [baseUrl]
const path = require('path');
const { chromium } = require(path.join('D:/웹 수익 자동화/rebuild-202610/_qa-tools/node_modules/playwright'));
const base = process.argv[2] || 'http://127.0.0.1:4321';
const pages = (process.argv[3] || '/,/send/usd-to-mxn/,/hidden-fx-markup/').split(',');
const widths = [1440, 390];
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.RR_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const results = [];
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, deviceScaleFactor: 1 });
    for (const p of pages) {
      const page = await ctx.newPage();
      await page.addInitScript(() => {
        window.__cls = 0;
        new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
      });
      const res = await page.goto(base + p, { waitUntil: 'networkidle' }).catch((e) => ({ status: () => 'ERR ' + e.message }));
      await page.waitForTimeout(800);
      const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, cls: window.__cls, h1: document.querySelector('h1')?.textContent?.trim() }));
      // keyboard focus visibility: tab 3 times and read outline of the focused element
      await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.keyboard.press('Tab');
      const focus = await page.evaluate(() => { const a = document.activeElement; if (!a) return null; const s = getComputedStyle(a); return { tag: a.tagName, text: (a.textContent || '').trim().slice(0, 30), outline: s.outlineStyle + ' ' + s.outlineWidth }; });
      const name = `${p.replace(/\//g, '_') || '_'}${w}`.replace(/^_+/, '') || 'home';
      const file = path.join(__dirname, 'screens', `${name || 'home'}.png`);
      await page.screenshot({ path: file, fullPage: true });
      results.push({ w, p, status: res.status(), overflow: m.sw > m.cw, sw: m.sw, cw: m.cw, cls: Number(m.cls.toFixed(4)), focus, file });
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(results, null, 1));
})();
