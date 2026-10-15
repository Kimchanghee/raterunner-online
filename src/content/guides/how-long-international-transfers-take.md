---
title: "How long does an international money transfer take?"
seoTitle: "How Long Do International Transfers Take? Minutes to Days"
description: "Why some international transfers land in minutes and others take days: the last mile, cut-off times, weekends, compliance holds and payout rails, with data."
question: "how long does an international money transfer take"
answer: "Anywhere from seconds to several business days. Swift reports that 75% of cross-border payments on its network reach the recipient's bank within 10 minutes, but crediting the recipient can take more than a day. Cut-off times, weekends, checks and the payout rail decide the rest."
published: 2026-10-15
updated: 2026-10-15
data_asof: 2026-10-15
sources:
  - name: "Swift: Spotlight on Speed 2025 (24 September 2025)"
    url: "https://www.swift.com/insights/news/spotlight-speed-2025"
  - name: "Swift GPI product page (crediting speed)"
    url: "https://www.swift.com/products/swift-gpi"
  - name: "European Central Bank: Instant Payments Regulation"
    url: "https://www.ecb.europa.eu/paym/retail/instant_payments/html/instant_payments_regulation.en.html"
  - name: "Wise public comparison data (delivery estimates in RateRunner's snapshot)"
    url: "https://wise.com/gb/compare/"
  - name: "CFPB: sending money abroad (remittance transfer rights)"
    url: "https://www.consumerfinance.gov/consumer-tools/money-transfers/"
faq:
  - q: "Why does my transfer say it will arrive tomorrow when it is only 3 p.m.?"
    a: "Many payouts depend on a bank in the destination country, and that bank may already be closed or past its cut-off in its own time zone. The estimate counts to the next time that bank processes payments, not to the end of your day."
  - q: "Is a faster transfer more expensive?"
    a: "Sometimes. Some services charge more for instant delivery or for card funding, while a bank transfer to fund the payment is cheaper but slower. Compare the total cost at the same funding and payout options."
  - q: "What should I do if a transfer is late?"
    a: "Check the tracking status and whether the provider has asked for documents first. Most delays are verification requests or a cut-off being missed. For US remittances, you can report an error to the provider within 180 days of the promised delivery date."
related: ["swift-vs-local-payout", "transfer-limits-and-id-checks", "cash-pickup-vs-bank-deposit"]
corridors: ["usd-to-mxn", "usd-to-php", "gbp-to-inr", "usd-to-bdt"]
---

## What decides how long a transfer takes?

A transfer has three legs: getting your money to the provider, moving value across the border, and paying the recipient. The middle leg is now the fast part. Swift said in September 2025 that, for the top 40 countries on its network in the first quarter of 2025, 75% of cross-border payments reached the beneficiary's bank within 10 minutes. The same report notes it can still take more than a day for the beneficiary to be credited, depending on the receiving country.

Swift calls that final step the "last mile". It is where opening hours, local clearing systems, compliance checks and manual handling sit. On its GPI product page, Swift says nearly 60% of GPI payments are credited to end beneficiaries within 30 minutes and almost 100% within 24 hours.

Specialist transfer services often skip the international leg entirely. They hold money in both countries and pay out from a local account through the domestic system, so the speed you see is largely the speed of that domestic rail. See [SWIFT vs local payout](/guides/swift-vs-local-payout/) for how the two routes differ in cost as well as time.

## What did delivery estimates look like on 15 October 2026?

In RateRunner's snapshot, only Wise's quotes carried a delivery estimate (40 of the 439 quotes for 1,000 units). They were requested at about 14:57 UTC on a Thursday, so they reflect what one provider promised at one moment, not an average:

| Estimated delivery | Corridors (of 40) | Examples |
|---|---|---|
| Under 1 hour | 20 | USD to MXN, INR, BRL, EUR; GBP to INR; AUD to PHP |
| 1 to 12 hours | 3 | USD to CNY (about 8 hours), USD to COP, USD to EGP |
| About 24 hours | 14 | USD to PHP, JPY, CAD; EUR to USD; all four CAD corridors |
| More than 24 hours | 3 | USD to BDT (3 days), GBP to PLN (4 days), USD to GTQ (8 days) |

*Source: Wise public comparison data in RateRunner's snapshot, asOf 2026-10-15T14:57Z. Other providers did not publish an estimate in this data, so their speed is not compared here.*

Two patterns stand out. Corridors with a 24/7 instant rail on the receiving side (Mexico's SPEI, India's IMPS and UPI, the UK's Faster Payments, Brazil's Pix) showed delivery in minutes. Corridors quoted at 24 hours or more were mostly ones where the receiving step was outside local banking hours at the time of the quote, or where a holiday or longer processing applied. The very long Guatemala estimate is a single provider's figure and should be read as "check before you send", not as typical.

## Why do weekends and cut-off times matter so much?

Most domestic systems that do not run around the clock process payments in batches on business days. If your money arrives at the provider after the payout bank's cut-off, it waits for the next window. Friday afternoon in New York is already Saturday morning in Manila, and a public holiday in either country adds another day.

Instant systems remove much of this. In the euro area, the EU Instant Payments Regulation required payment providers to be able to receive instant euro credit transfers by 9 January 2025 and to send them by 9 October 2025. Non-euro EU countries have later deadlines, running into 2027. Instant euro payments run every day of the year, so a transfer paid out into an EU account through that route is not held for the weekend.

Some services also price differently outside market hours, because they cannot hedge the currency until markets reopen. That can mean a slightly wider rate at weekends even when the delivery itself is fast.

## Which delays are about checks, not plumbing?

The longest delays usually come from verification rather than payment systems:

- **First transfer or new recipient.** Providers verify identity before the first payment, and may ask again when you add someone new.
- **Larger amounts.** Above provider-specific thresholds you may be asked about the source of funds or the purpose of the payment. See [transfer limits and ID checks](/guides/transfer-limits-and-id-checks/).
- **Name mismatches.** If the recipient's name does not match their bank or wallet account, the receiving bank can hold or return the money. The EU now requires banks to offer a "verification of payee" check that flags mismatches before you send.
- **Sanctions screening.** Automated screening takes seconds for most payments; a small share needs manual review.

Swift's own analysis says compliance processes typically take seconds or minutes and affect a minority of payments, while conservative local practices in the final leg cause many of the longer delays.

## How you fund the transfer changes the clock

Paying by debit card or from a balance already held with the provider is usually the quickest start. Paying by bank transfer adds the time your bank takes to send it, which is instant in some countries and a business day in others. US senders paying through a standard bank debit may wait a few business days before the provider releases funds. Card funding can carry a fee, so check the [calculator](/) for the full cost at the funding method you plan to use.

## What can you do to make it faster?

1. **Send early in the recipient's business day**, and avoid Friday afternoons and local public holidays.
2. **Verify your account before you need it.** Upload identity documents when you sign up, not on the day of an urgent payment.
3. **Use exact recipient details.** Full legal name as the bank holds it, the correct account or wallet number, and the right bank code.
4. **Choose a payout rail that runs instantly** where the destination has one: e-wallets and instant bank systems are usually quicker than cash or international wires.
5. **Keep the receipt.** In the US, remittance providers must give a receipt with the date funds will be available. If the money does not arrive by then, you can report an error to the provider within 180 days, as the CFPB explains.

Speed and cost are separate decisions. The [corridor ledgers](/send/) rank quotes by what the recipient receives; use the delivery estimate as a tie-breaker, and check the provider's own estimate at the moment you send.
