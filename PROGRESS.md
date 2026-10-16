# raterunner.online v2 — progress (resume from here)

Branch: `v2-cloudflare-static`. Contract: `../CONTRACT.md`. Brief: `../BRIEFS.md` (raterunner section).

## Milestones
- [x] M0 Remove old Next.js app, add package.json/.gitignore, PROGRESS.md, first push
- [x] M1 Scaffold: astro.config, tsconfig, wrangler.jsonc, site.config.ts, refresh script + real data snapshot (40 corridors x 200/1000/5000, asOf 2026-10-15T14:57Z), src/lib/cost.ts + tests (9 pass)
- [x] M2 Design system: tokens (global.css, receipt.css), fonts (Plex Mono + Source Serif 4), Base layout with SEO head/consent/AdSense  (DESIGN_REFERENCES.md pending -> M8)
- [x] M3 Core pages: home calculator + 40 corridor pages + /send/ index DONE; quote screening (48h / -1% markup) DONE; hidden-markup checker DONE
- [x] M4 Trust pages: about, methodology, contact, privacy, terms, disclaimer, 404
- [x] M5 Guides: 12 guides + /guides/ + RSS (/rss.xml)
- [x] M6 SEO files: sitemap (per-page lastmod), robots, llms.txt, ads.txt, IndexNow key file, 58 OG PNGs, JSON-LD
- [x] M7 gate.mjs PASS 62 pages / 62 sitemap URLs; tests 10 pass; astro check 0 errors (test typings fixed); scripts/refresh-build.ps1
- [x] M8 documentation complete (see scorecard caveats): build/check/gate/tests DONE; curl crawl DONE (qa/crawl.md, all 200 + 404 path=404); Playwright 1440/390 via qa/shots.cjs DONE (no page overflow, CLS<=0.03, focus outline 3px); mobile ledger stacking + nav wrap fixed. DONE: content/backlog.md, seo/scorecard.md, seo/measure.md, DESIGN_REFERENCES.md
  - Playwright note: _pw-browsers folder does not exist and playwright 1.64 wants chromium-1248; qa/shots.cjs uses executablePath %LOCALAPPDATA%/ms-playwright/chromium-1243 (no download).
  - Preview: 
ode node_modules/astro/astro.js preview --port 4321 --host 127.0.0.1 (host restarts kill it).
- [x] M9 Final handoff in seo/scorecard.md; fresh type-check completion remains blocked by local timeout, no deployment

## Notes
- Old tree had committed .env.local/.env.production (public Adsterra keys) -> deleted in M0.

- Build: use `node node_modules/astro/astro.js build` (7-10 s). `pnpm build` hangs on this host (pnpm wrapper, not astro). Set ASTRO_TELEMETRY_DISABLED=1.


