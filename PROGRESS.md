# raterunner.online v2 — progress (resume from here)

Branch: `v2-cloudflare-static`. Contract: `../CONTRACT.md`. Brief: `../BRIEFS.md` (raterunner section).

## Milestones
- [x] M0 Remove old Next.js app, add package.json/.gitignore, PROGRESS.md, first push
- [x] M1 Scaffold: astro.config, tsconfig, wrangler.jsonc, site.config.ts, refresh script + real data snapshot (40 corridors x 200/1000/5000, asOf 2026-10-15T14:57Z), src/lib/cost.ts + tests (9 pass)
- [ ] M2 Design system: tokens, fonts, Base layout (receipt/customs-ledger metaphor), DESIGN_REFERENCES.md
- [ ] M3 Core pages: home calculator, corridor pages, hidden-markup explainer
- [ ] M4 Trust pages: about, methodology, contact, privacy, terms, disclaimer, 404
- [ ] M5 Guides batch (>=10) + content collection + RSS
- [ ] M6 SEO files: sitemap, robots, llms.txt, ads.txt, IndexNow, OG images, JSON-LD
- [ ] M7 Gate script + tests + refresh-build.ps1
- [ ] M8 QA: build, check, gate, curl crawl, Playwright screenshots, scorecard before/after, measure.md
- [ ] M9 Final report

## Notes
- Old tree had committed .env.local/.env.production (public Adsterra keys) -> deleted in M0.
