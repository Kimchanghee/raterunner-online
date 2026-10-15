---
title: "What do banks really charge for an international transfer?"
seoTitle: "Bank International Transfer Fees: What Banks Really Charge"
description: "Bank transfers abroad carry an upfront fee, an exchange-rate markup and sometimes third-party charges. What 24 large banks quoted, and why no fee misleads."
question: "bank international transfer fees"
answer: "More than the fee suggests. In RateRunner's 15 October 2026 snapshot, bank quotes for sending 1,000 had a median upfront fee of 5 but a median exchange-rate markup of 2.23%, for a median true cost of 3.06%, about twice the 1.41% median for transfer services."
published: 2026-10-15
updated: 2026-10-15
data_asof: 2026-10-15
sources:
  - name: "Wise public comparison data (quotes used in RateRunner's snapshot)"
    url: "https://wise.com/gb/compare/"
  - name: "CFPB: Regulation E, 12 CFR 1005.31 (remittance disclosures)"
    url: "https://www.consumerfinance.gov/rules-policy/regulations/1005/31/"
  - name: "Regulation (EU) 2021/1230 on cross-border payments in the Union"
    url: "https://eur-lex.europa.eu/eli/reg/2021/1230/oj"
  - name: "World Bank: Remittance Prices Worldwide, Issue 54 (Q3 2025)"
    url: "https://remittanceprices.worldbank.org/"
faq:
  - q: "Why does my bank say the transfer is free?"
    a: "Because it has no upfront fee. The bank still converts your money at its own rate. In the snapshot, US, Canadian and Australian banks with no fee had markups between 2.07% and 6.82% on 1,000."
  - q: "Are banks always the most expensive option?"
    a: "No. State Bank of India's remittance quotes were among the cheapest in their corridors, and some European banks charged low markups but high flat fees, which can work out cheaply on very large amounts."
  - q: "What other charges can appear on a bank wire?"
    a: "Intermediary (correspondent) bank charges and the recipient bank's incoming-wire fee. These may be deducted from the amount on the way, depending on the charge option chosen."
related: ["exchange-rate-markup-explained", "swift-vs-local-payout", "mid-market-rate"]
corridors: ["usd-to-eur", "gbp-to-eur", "eur-to-usd", "cad-to-usd", "aud-to-usd"]
---

## The three parts of a bank's price

1. **Upfront fee.** A fixed charge for sending, sometimes waived for online transfers or premium accounts.
2. **Exchange-rate markup.** The bank converts at its own rate, which sits below the mid-market rate. This is usually the largest part.
3. **Third-party charges.** On SWIFT wires, intermediary banks and the recipient's bank may deduct their own fees. See [SWIFT vs local payout](/guides/swift-vs-local-payout/).

Banks disclose the first part prominently. The second is visible only as a rate. The third may not be known in advance.

## What did banks quote on 15 October 2026?

RateRunner's snapshot includes indicative quotes from 24 banks (as Wise classifies them) across the US, UK, eurozone, Canada, Australia and India, collected in Wise's public comparison data. Here is what they quoted for sending 1,000 units of the home currency, grouped by country.

| Bank group | Upfront fee | Markup range | True cost range |
|---|---|---|---|
| US: Wells Fargo, Chase | 0 to 5 USD | 2.89% to 3.56% | 3.00% to 3.62% |
| UK: NatWest, RBS, HSBC, Nationwide | 0 to 15 GBP | 0.65% to 2.57% | 0.65% to 4.03% |
| Eurozone: ten banks incl. Deutsche Bank, Sparkasse, ING, Santander | 0 to 50 EUR | −0.45% to 3.10% (one outlier at 13.06%) | 0.15% to 6.11% (outlier 13.58%) |
| Canada: RBC, BMO, TD | 0 CAD | 2.07% to 6.82% | 2.07% to 6.82% |
| Australia: NAB, CBA, ANZ | 0 AUD | 2.20% to 4.90% | 2.20% to 4.90% |
| India: State Bank of India (remittance service) | 0 | 0.21% to 0.43% | 0.21% to 0.43% |

*Indicative quotes, Wise public comparison data, retrieved 15 October 2026. The eurozone outlier was a 13.06% markup quoted for euros to Turkish lira. Live figures per corridor on the [corridor ledger](/send/).*

Two patterns stand out.

**North American and Australian banks mostly charged no upfront fee and earned through the rate.** Wells Fargo's markup was between 3.00% and 3.20% in all nine corridors where it appeared. Canada's three banks quoted no fees, with markups up to 6.82% (BMO, Canadian dollars to Philippine pesos).

**Several eurozone banks did the reverse.** Sparkasse quoted a 50 euro fee with markups between 0.15% and 1.17%; Deutsche Bank 36.55 euros with markups from 0.56% to 2.41%. On 1,000 euros that is expensive; on 20,000 euros, the flat fee shrinks to a small share and the low markup matters more.

Across all 117 bank quotes at 1,000, the median true cost was 3.06%. Across the 278 quotes from non-bank services in the same corridors, it was 1.41%.

## Why do banks price this way?

A visible fee is easy to compare; a rate is not. A transfer advertised as "no fee" with a 3% markup will look cheaper than one with a 5 dollar fee at mid-market, even though on 1,000 dollars it costs six times as much. Banks also carry the overhead of correspondent relationships and compliance for SWIFT payments, which specialist services with local payout accounts avoid.

Regulators have pushed for clarity rather than price caps. In the US, Regulation E requires remittance providers, banks included, to disclose the exchange rate, fees and amount to be received before you pay. In the EU, Regulation (EU) 2021/1230 equalises charges for cross-border and domestic euro payments within the EU, and separate rules require currency conversion charges to be expressed against the ECB reference rate.

## How to check your own bank's price

1. Start a transfer in online banking and stop at the confirmation screen, which should show the rate, fee and amount to be received.
2. Note the time, and look up the mid-market rate at that moment.
3. Use the [hidden markup checker](/hidden-fx-markup/) to turn the rate into a markup and a cost.
4. Compare the amount received with the same amount in the [calculator](/).

If your bank is in the snapshot, its quote appears on the relevant corridor page with the time it was collected.

## When a bank transfer still makes sense

- Large amounts where a flat fee is negligible and the bank's markup is low.
- Payments that must come from a specific account for legal or business reasons.
- Destinations or currencies where specialist services do not pay out.

In those cases, ask whether the bank offers a better rate for larger amounts, and whether you can choose charge option OUR to keep intermediary deductions off the recipient's side.
