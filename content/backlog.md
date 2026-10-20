# RateRunner question backlog

Local candidate inventory, 2026-10-16. These are editorial hypotheses, not observed GSC queries or commissioned posts. No autonomous publication schedule is enabled here.

## Question queue (updated 2026-10-20)

| Question | Basis | Type | Status | URL |
|---|---|---|---|---|
| bank international transfer fees | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/bank-international-wire-fees/ |
| is cash pickup or bank deposit cheaper for sending money abroad | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/cash-pickup-vs-bank-deposit/ |
| how do exchange rate markups work | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/exchange-rate-markup-explained/ |
| how to get paid from abroad as a freelancer | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/freelancer-international-payments/ |
| how long does an international money transfer take | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/how-long-international-transfers-take/ |
| what is the mid-market rate | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/mid-market-rate/ |
| best way to send money to india | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/send-money-to-india/ |
| cheapest way to send money to mexico | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/send-money-to-mexico/ |
| cheapest way to send money to the philippines | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/send-money-to-philippines/ |
| swift vs local transfer fees | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/swift-vs-local-payout/ |
| why does a money transfer app need my id and set limits | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/transfer-limits-and-id-checks/ |
| us remittance tax 1 percent cash transfers | Primary sources cited in the guide; dated quote snapshot where used | guide | live | https://raterunner.online/guides/us-remittance-transfer-tax/ |
| Is there a downloadable copy of the quote snapshot? | Committed Wise comparison snapshot (provider, collectedAt preserved) | data endpoint | live (2026-10-20 release) | https://raterunner.online/data/snapshot.json |
| Why can a comparison quote be older than the displayed snapshot? | Committed Wise timestamps; 48-hour filter (update /methodology/ and markup guide) | guide update | queued | - |
| Why does a transfer sometimes show a negative cost? | Dated eligible quote plus arithmetic (update /guides/exchange-rate-markup-explained/) | guide update | queued | - |
| Does paying by card change what the recipient receives? | Needs primary provider fee schedules and card-issuer rules first | guide | queued (sources needed) | - |
| What should I compare when the cheapest quote is unavailable? | Provider eligibility rules; links /send/ | guide | queued | - |
| How do weekends affect reference exchange rates? | ECB publication calendar, Frankfurter docs (update /guides/mid-market-rate/) | guide update | queued | - |

Queue items are editorial hypotheses, not observed GSC queries. Keep existing URLs stable rather than creating competing answers; same-question duplicates get a 301 to the canonical page, 410 only as a last resort.

## Workflow
For each brief record question, direct answer, original sources and observation date, subquestions, two useful internal links, intended URL and reviewer. Inspect actual search results and 3–5 relevant originals before drafting, synthesize without copying, and do not fabricate personal experience. Run build, gate, check, tests and mobile review before parent-managed deployment. No page solely to meet a keyword quota. New corridor only with real distinct source data and useful insight.

## Refresh and measurement
Refresh changed source facts immediately; retain last good snapshot on API failure and its actual date. Recheck tax/identity rules with official sources before editing. At deployment +14 days record page/query impressions, clicks, CTR and citation observations; unavailable measurements stay unknown, not zero. Merge overlapping intent only with deliberate redirects and parent approval. No arbitrary date-only refreshes.
