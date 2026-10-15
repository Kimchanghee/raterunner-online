# raterunner.online v2 — progress (resume from here)

Branch: `v2-cloudflare-static`. Contract: `../CONTRACT.md`. Brief: `../BRIEFS.md` (raterunner section).

## Milestones
- [x] M0 Remove old Next.js app, add package.json/.gitignore, PROGRESS.md, first push
- [x] M1 Scaffold: astro.config, tsconfig, wrangler.jsonc, site.config.ts, refresh script + real data snapshot (40 corridors x 200/1000/5000, asOf 2026-10-15T14:57Z), src/lib/cost.ts + tests (9 pass)
- [x] M2 Design system: tokens (global.css, receipt.css), fonts (Plex Mono + Source Serif 4), Base layout with SEO head/consent/AdSense  (DESIGN_REFERENCES.md pending -> M8)
- [~] M3 Core pages: home calculator + 40 corridor pages + /send/ index DONE; quote screening (48h / -1% markup) DONE; hidden-markup checker DONE
- [~] M4 Trust pages: about, methodology, contact DONE; privacy, terms, disclaimer, 404 TODO
- [~] M5 Guides: collection + /guides/ + [slug] template DONE; 12/12 written DONE; TODO RSS
- [ ] M6 SEO files: sitemap, robots, llms.txt, ads.txt, IndexNow, OG images, JSON-LD
- [ ] M7 Gate script + tests + refresh-build.ps1
- [ ] M8 QA: build, check, gate, curl crawl, Playwright screenshots, scorecard before/after, measure.md
- [ ] M9 Final report

## Notes
- Old tree had committed .env.local/.env.production (public Adsterra keys) -> deleted in M0.

- Build: use `node node_modules/astro/astro.js build` (7-10 s). `pnpm build` hangs on this host (pnpm wrapper, not astro). Set ASTRO_TELEMETRY_DISABLED=1.

