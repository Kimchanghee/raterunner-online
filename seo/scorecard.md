# Before / after scorecard

Audit 2026-10-16; local candidate only, no deployment/account work.

Before: CONTRACT.md reports paused Vercel HTTP 402. Inherited baseline, not a fresh live probe. SEO/AEO/GEO/LLMO/content delivery blocked; NEO not targeted for this English site.

After: local SEO gate passes 62 canonical pages / 62 sitemap URLs, including metadata lengths, canonical, noindex, OG existence, internal links, source sections, direct answers and visible FAQ / JSON-LD equality. AEO/GEO structure implemented, not proven search citations. LLMO identity internally consistent but external recognition unmeasured. Content: 12 guides + RSS + question/source frontmatter; backlog now recorded.

## Fresh execution
- OG generation: 58 images in 12.18s, then pnpm wrapper stalled.
- Direct Astro build completed 2026-10-16 22:55 KST: 63 HTML pages including 404, 18.08s.
- node scripts/gate.mjs: GATE PASS 62 pages, 62 sitemap URLs.
- node --test tests/*.test.ts: 10 pass, zero fail. Hand arithmetic, ranking, negative costs, zero/clamp, benchmark, summaries, age and quote screening.
- astro check wrapper stalled; direct @astrojs/check invocation emitted unused-import warnings for quotes (Calculator.astro) and slugOf (hidden-fx-markup.astro), but exceeded 30s before summary. Prior M7 zero-error result is historical; fresh checker completion NOT claimed.

## Existing evidence inspected
qa/crawl.md (2026-10-16 09:14 KST): local curl, no JS, home and three key routes 200; sitemap/robots/llms/ads files present; missing path 404; metadata/LD recorded. Not a new live crawl.
qa/screens/report.json: five routes x 1440/390, no document overflow, CLS-like max 0.0299, first three keyboard targets show 3px outline. Some internal-width elements and 1–2 small targets remain reported. Not full 44px-target/WCAG or field CWV certification. Report predates final nav/ledger fixes; crops show those fixes.
Images inspected: qa/screens/1440.png (historical desktop composition, NOT latest quote evidence), home-390.png, m-head.png, m-ledger.png. Receipt and ledger identity preserved. No new screenshots in this documentation-only pass.

## Inventory/data
62 canonical pages: 2 tools (home/checker), 40 corridors + index, 12 guides + index, 6 trust/legal pages. Plus 404 and 40 JSON endpoints. Wise public comparison source https://wise.com/gb/compare/, snapshot asOf 2026-10-15T14:57:10.378Z; individual collection dates differ. Frankfurter/ECB https://frankfurter.dev/ reference asOf 2026-10-15. Snapshots preserved, no API refresh.

## Release gaps
Complete fresh checker, full keyboard/touch-target review if certifying accessibility, production asset/status verification. GA4/GSC/Bing, contact mailbox, AdSense approval and certified CMP are unverified account-side work. Privacy text describes CMP behavior but the actual message is not verified: reconcile before release. Consent Mode is not a CMP. No deployment, IndexNow submission, indexing, citation or revenue claim. Measurement at actual deployment T0 +14 days: seo/measure.md.
