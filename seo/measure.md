# Measurement plan

Baseline: local build QA on 2026-10-16; not a production launch. T0 is the parent's actual verified deployment date, not this commit. Re-measure at T0 +14 days; repeat quarterly for unaided model-brand recognition. No account changes or submissions performed in this task.

## T0, parent-owned
Record deployed commit and remote assets, verify robots and X-Robots-Tag, sitemap, canonical, 404 status and structured data. Configure GA4/GSC verification IDs only after confirming the correct property; submit sitemap in GSC and Bing. IndexNow key/file exists but submission is not yet a verified event. Confirm contact mailbox delivery, AdSense approval and certified regional consent message before claiming ads/consent operational. Consent Mode defaults are not a CMP.

## +14 days
- GSC: indexed/excluded URLs by page type, crawl errors, sitemap fetched status; page/query impressions, clicks and CTR, separately for home, checker, 40 corridors and 12 guides. Compare equal date windows and annotate release date. Zero only if the account actually reports zero.
- GA4: sessions, tool_used and outbound_affiliate_click, destination-host breakdown, consent-related collection gaps. Test event receipt in the correct property without storing amount or user financial details. Empty configuration currently means measurement unavailable.
- AEO/GEO: fixed questions about transfer total cost, hidden FX markup and USD/MXN costs. Record engine, timestamp, question, answer and exact cited URL; do not count a brand mention as a linked citation. Save failures as well as successes. No ranking or AI citation guarantees.
- Content: proportion of guides with impressions/clicks/citations, aged source dates and unanswered observed queries. Refresh evidence or improve intent coverage before expanding page count.
- Performance: real-device mobile check, field CWV when sufficient traffic exists, console/network errors and input states. Local CLS-like observations are not field CWV.

## Decisions
Prioritize indexing blockers first, stale or misleading facts second, then useful query gaps. Investigate any >=30% impression drop only with adequate comparable samples and seasonality context; it is an alert, not automatic proof of algorithmic penalty. Keep an append-only dated measurement record with property, date range and evidence path. NEO is not targeted: this is an English site, not a Korean locale network.
