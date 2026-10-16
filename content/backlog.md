# RateRunner question backlog

Local candidate inventory, 2026-10-16. These are editorial hypotheses, not observed GSC queries or commissioned posts. No autonomous publication schedule is enabled here.

## Existing intent ownership
12 original guides live in src/content/guides; each has question, answer, data_asof, sources, faq and updated. Current clusters: mid-market rates and hidden markup; bank wire fees; SWIFT/local payout; transfer time and identity/limits; cash pickup; freelancer payments; India/Mexico/Philippines; US remittance tax. Keep these stable URLs rather than create competing answers.

## Next briefs, in priority order
1. Why can a comparison quote be older than the displayed snapshot? Update /methodology/ and the markup guide. Direct answer: retrieval time and provider collection time differ; screen old quotes instead of silently treating them as live. Evidence: committed Wise timestamps, 48-hour filter. Links: / and /send/.
2. Why does a transfer sometimes show a negative cost? Update /guides/exchange-rate-markup-explained/. Explain rates above the collected benchmark, timing and promotions without promising profit. Evidence: dated eligible quote plus arithmetic; link /hidden-fx-markup/ and /methodology/.
3. Does paying by card change what the recipient receives? Candidate guide only after primary provider fee schedules and card-issuer rules are inspected. Separate provider charges from issuer cash-advance fees. Link bank-wire and cash-pickup guides.
4. What should I compare when the cheapest quote is unavailable? Candidate guide: availability, payout method and dated quote limitations before price ranking. Require provider eligibility rules; link /send/ and transfer-limits guide.
5. How do weekends affect reference exchange rates? Update /guides/mid-market-rate/ after reading ECB publication calendar and Frankfurter documentation. Separate reference date from executable retail price; link checker and methodology.

## Workflow
For each brief record question, direct answer, original sources and observation date, subquestions, two useful internal links, intended URL and reviewer. Inspect actual search results and 3–5 relevant originals before drafting, synthesize without copying, and do not fabricate personal experience. Run build, gate, check, tests and mobile review before parent-managed deployment. No page solely to meet a keyword quota. New corridor only with real distinct source data and useful insight.

## Refresh and measurement
Refresh changed source facts immediately; retain last good snapshot on API failure and its actual date. Recheck tax/identity rules with official sources before editing. At deployment +14 days record page/query impressions, clicks, CTR and citation observations; unavailable measurements stay unknown, not zero. Merge overlapping intent only with deliberate redirects and parent approval. No arbitrary date-only refreshes.
