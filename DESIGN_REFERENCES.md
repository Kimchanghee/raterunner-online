# RateRunner design references

## Product metaphor
An international transfer receipt on a customs ledger: itemise the visible fee and hidden exchange-rate cost, then rank by what the recipient actually gets.

## Preserved system
Paper #f3efe4, slip #fffdf6, ink #1a1915, hidden-cost stamp #a3161b, carbon-copy link/focus blue #1d3a8a. Source Serif 4 for explanation; IBM Plex Mono for tabular amounts. Fonts are locally bundled through Fontsource (OFL). Native controls, ruled tables, square form panels and a receipt, not a generic marketing hero. Main text 18px, restrained headings, 3px visible focus, reduced-motion rules. Mobile comparison rows stack; wide secondary tables remain internally scrollable.

## Inspected open-source reference (2026-10-16)
- Carbon: https://github.com/carbon-design-system/carbon , Apache-2.0. GitHub API reported pushed_at 2026-10-16T12:42:41Z; actively maintained when inspected.
- Data table guidance: https://carbondesignsystem.com/components/data-table/usage/ . Principles retained: meaningful table title/source description, aligned headers and rows, generous main-content width for dense data, supplementary detail separated from primary comparison. No Carbon implementation, trademarks, React components or branding copied. This is a retrospective reference check of the existing implementation, not a claim that the original author used Carbon.

## Adversarial visual review
Existing QA images under qa/screens/ reviewed: home-390.png (stacked receipt/rows), 1440.png (historical desktop composition), m-head.png and m-ledger.png (readable mobile details). Older generic-named 1440.png predates quote screening and is NOT current data evidence. Receipt + ledger is job-specific; no gradients, decorative metric tiles, testimonials or invented live values. Long corridor pages are information-dense; source and timing limitations remain visible. Existing report covers 1440/390, home, corridor, checker, guide and 404. See seo/scorecard.md for exact limitations: this is not a WCAG certification or production/Core Web Vitals result.
