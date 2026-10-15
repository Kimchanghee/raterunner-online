---
title: "How do exchange-rate markups work, and how big are they?"
seoTitle: "Exchange-Rate Markups Explained: The Fee Hidden in the Rate"
description: "An exchange-rate markup is the gap between the mid-market rate and your rate. How to work it out, why it often beats the fee, and typical markups by provider."
question: "how do exchange rate markups work"
answer: "An exchange-rate markup is the gap between the mid-market rate and the rate a provider gives you, charged as a percentage of the money converted. In RateRunner's 15 October 2026 snapshot, the median bank markup on a 1,000 transfer was 2.23%, against 1.13% for transfer services."
published: 2026-10-15
updated: 2026-10-15
data_asof: 2026-10-15
sources:
  - name: "Wise public comparison data (quotes used in RateRunner's snapshot)"
    url: "https://wise.com/gb/compare/"
  - name: "Regulation (EU) 2019/518 on currency conversion charges"
    url: "https://eur-lex.europa.eu/eli/reg/2019/518/oj"
  - name: "CFPB: Regulation E, 12 CFR 1005.31 (remittance disclosures)"
    url: "https://www.consumerfinance.gov/rules-policy/regulations/1005/31/"
  - name: "World Bank: Remittance Prices Worldwide, Issue 54 (Q3 2025)"
    url: "https://remittanceprices.worldbank.org/sites/default/files/2026-04/RPW_main_report_and_annex_Q325.pdf"
faq:
  - q: "Is a 0% fee transfer free?"
    a: "Only if the rate is also the mid-market rate. A transfer with no fee and a 2% markup costs about 20 on every 1,000 converted."
  - q: "Do all providers add a markup?"
    a: "No. Some charge a visible fee and convert at the mid-market rate; others charge no fee and earn everything in the rate; many do both. Comparing the total, not either part, is what matters."
  - q: "Is a markup the same as a spread?"
    a: "They describe the same money from different angles. Dealers quote a buy and a sell price around the mid-market rate; the markup is how far the price you are given sits from the middle."
related: ["mid-market-rate", "bank-international-wire-fees", "swift-vs-local-payout"]
corridors: ["usd-to-mxn", "usd-to-eur"]
---

## What exactly is being marked up?

Every currency pair has a mid-market rate: the midpoint between what buyers are bidding and sellers are asking in the wholesale market at a given moment. Banks and transfer services buy currency close to that rate. When they convert your money, they can pass that rate on and charge a separate fee, or they can give you a slightly worse rate and keep the difference. That difference is the markup.

The markup is usually expressed as a percentage:

**markup % = (1 − your rate ÷ mid-market rate) × 100**

If the mid-market rate for US dollars to Mexican pesos is 18.52 and you are offered 17.96, the markup is (1 − 17.96 ÷ 18.52) × 100 = 3.02%. On 1,000 dollars converted, that is about 30 dollars, whether or not the provider calls it a fee. You can run the same arithmetic on any rate you are offered with the [hidden markup checker](/hidden-fx-markup/).

## Why is the markup often bigger than the fee?

Because fees are usually flat and markups scale with the amount. A 5 dollar wire fee is 0.5% of 1,000 dollars and 0.1% of 5,000 dollars. A 3% markup is 3% of whatever you send.

The RateRunner snapshot of 15 October 2026 shows the pattern clearly. Among the quotes for sending 200, the upfront fee made up a median 38% of the true cost. At 5,000, the median fee share fell to about 1%: almost the whole cost was in the rate. That is why the cheapest option for a small transfer and the cheapest for a large one are often different providers.

| Amount sent | Median true cost, all ranked quotes | Median true cost, best quote per corridor |
|---|---|---|
| 200 | 3.03% | 0.59% |
| 1,000 | 2.22% | 0.47% |
| 5,000 | 1.56% | 0.43% |

*RateRunner snapshot, 15 October 2026, 40 corridors. True cost = fee + markup cost. Source quotes: Wise public comparison data.*

## How large are markups by type of provider?

In the same snapshot, at 1,000 sent, the 117 bank quotes had a median markup of 2.23% and a median upfront fee of 5 in the sending currency, for a median true cost of 3.06%. The 278 quotes from non-bank transfer services had a median markup of 1.13% and a median true cost of 1.41%.

The spread inside each group is wide. PayPal's personal transfer quotes carried markups between 3.05% and 5.84% across the 23 corridors where it appeared. Several transfer services quoted markups below 0.5% on major corridors, and Wise, which publishes the comparison data, quoted the mid-market rate with a separate fee. Banks were not uniformly expensive either: State Bank of India's quotes for sending to India were among the cheapest in their corridors.

These are indicative quotes for the banks and services in Wise's comparison data, mostly large banks in the US, UK, eurozone, Canada and Australia. They are not a census of every bank. The World Bank's independent survey tells a similar story at a global level: in the third quarter of 2025, the average cost of sending the equivalent of 200 dollars was 6.36%, with digital services averaging 4.59% and non-digital services 7.30%.

## Where can you see the markup on a quote?

Usually you cannot see it directly. A provider shows a rate and, sometimes, a fee. To find the markup you need the mid-market rate for the same moment. Two sources are easy to use:

- A live mid-market quote from a market data site or from a provider that converts at mid-market. Rates move constantly, so check within minutes of your quote.
- The European Central Bank's euro reference rates, published once each working day around 16:00 CET. They are official and free, but they can be hours old by the time you compare. See [what the mid-market rate is](/guides/mid-market-rate/).

Some rules help. In the United States, the remittance transfer rule in Regulation E requires providers to disclose the exchange rate, fees and the amount the recipient will receive before you pay, so you have the numbers needed for the calculation. In the European Union, Regulation (EU) 2019/518 requires currency conversion charges on card payments to be shown as a percentage markup over the latest ECB reference rate.

## Does a markup ever go negative?

Occasionally a quote's rate is better than the mid-market rate recorded at collection time. In the snapshot this appeared mostly as small negatives, under 0.5%, from services offering introductory rates. A few were much larger, such as a bank quote 8.55% above mid-market for euros to dollars collected 43 hours earlier; that is almost certainly a data error. RateRunner ranks small negative markups with a note and sets aside anything more than 1% above mid-market or collected more than 48 hours before retrieval. The [methodology](/methodology/) explains the rule.

## How should you use this when choosing a provider?

Compare the amount the recipient gets for the same amount sent, at the same time. That single figure already includes the fee and the markup. Then check whether the quote applies to your payout method and funding method, since cash pickup, card funding and bank deposits can be priced differently. The [calculator](/) does the comparison across up to 24 providers per corridor and shows both cost lines separately, so you can see which part of the price you are paying.
