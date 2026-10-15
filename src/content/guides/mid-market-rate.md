---
title: "What is the mid-market rate and where can you check it?"
seoTitle: "Mid-Market Exchange Rate: What It Is and Where to Check It"
description: "The mid-market rate is the midpoint between wholesale buy and sell prices. Where to find it, why the ECB rate differs, and how to use it to spot a markup."
question: "what is the mid-market rate"
answer: "The mid-market rate is the midpoint between the prices at which banks buy and sell a currency in the wholesale market at a given moment. It carries no margin, so it is the fair benchmark for judging any rate you are offered."
published: 2026-10-15
updated: 2026-10-15
data_asof: 2026-10-15
sources:
  - name: "European Central Bank: euro foreign exchange reference rates"
    url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html"
  - name: "Frankfurter: open API for ECB reference rates"
    url: "https://frankfurter.dev/"
  - name: "Bank for International Settlements: Triennial Central Bank Survey of FX turnover (2022)"
    url: "https://www.bis.org/statistics/rpfx22.htm"
  - name: "Regulation (EU) 2019/518 on currency conversion charges"
    url: "https://eur-lex.europa.eu/eli/reg/2019/518/oj"
faq:
  - q: "Can I get the mid-market rate as a consumer?"
    a: "Some transfer services convert at the mid-market rate and charge a separate, visible fee. Most banks and many apps convert at a marked-up rate instead. Either way, the total cost is what you compare."
  - q: "Why do different websites show slightly different mid-market rates?"
    a: "Because they sample the market at different moments and from different data feeds. Differences of a few hundredths of a percent are normal; differences of a whole percent are not."
  - q: "Is the ECB reference rate the mid-market rate?"
    a: "It is an official daily reference taken around 14:10 CET and published around 16:00 CET. It is close to the market at that moment but does not move during the day, so it can drift from the live mid-market rate."
related: ["exchange-rate-markup-explained", "how-long-international-transfers-take"]
corridors: ["usd-to-mxn", "gbp-to-eur"]
---

## Why is there a "middle" at all?

Currencies trade in a decentralised wholesale market between banks, funds and dealers. At any moment there is a best price someone will pay for a currency (the bid) and a best price someone will sell it at (the ask). The mid-market rate is halfway between them. Nobody is quoting you that exact price, but it is the reference point against which every bank's and every app's rate can be measured.

The market is large and nearly continuous on weekdays. The Bank for International Settlements' 2022 survey measured global foreign exchange turnover at 7.5 trillion US dollars per day. That depth is why the mid-market rate for major currencies moves in tiny steps and why two reputable sources rarely disagree by more than a few hundredths of a percent.

## Where can you check the mid-market rate?

| Source | How current | Cost | Good for |
|---|---|---|---|
| Market data sites and financial news terminals | Seconds to minutes | Free for basic quotes | Checking a quote while you look at it |
| Providers that convert at mid-market and show a separate fee | Live, at quote time | Free to view | Getting the rate and a real price together |
| ECB euro reference rates | Once per working day, around 16:00 CET | Free, official | Records, contracts, monthly comparisons |
| Frankfurter API (republishes ECB rates) | Same as ECB | Free | Developers and spreadsheets |

RateRunner uses two of these. The ranking uses each quote's own markup, which Wise's comparison data records against the mid-market rate at the moment the quote was collected. The [corridor pages](/send/) also show the ECB reference rate as an independent cross-check where the ECB publishes both currencies.

## Why does the ECB rate differ from the live rate?

The European Central Bank publishes its euro reference rates for about 30 currencies each working day. They are based on a regular daily concertation between central banks at around 14:10 CET and are published around 16:00 CET. They are designed for information and record-keeping, not as a trading rate, and they do not change until the next working day.

Currencies keep moving after the snapshot is taken. On a quiet day the difference between the ECB rate and the live mid-market rate might be a few hundredths of a percent; on a volatile day it can be much more. If you compare a quote taken at 9 p.m. with an ECB rate from 2 p.m., part of what looks like markup may simply be market movement. For that reason, RateRunner never ranks providers against the ECB rate. It is shown only to help readers sanity-check the numbers.

The EU does use the ECB rate as a disclosure benchmark. Regulation (EU) 2019/518 requires card currency conversion charges within the EU to be expressed as a percentage markup over the latest available ECB euro reference rate, so cardholders can compare offers on the same basis.

## How do you use the mid-market rate to judge a quote?

1. Note the rate you are offered and the time.
2. Find the mid-market rate for the same pair at the same time, quoted the same way round (units of the receiving currency per one unit of the sending currency).
3. Calculate (1 − offered ÷ mid-market) × 100. That is the markup in percent.
4. Multiply the markup by the amount being converted (after any upfront fee) to get its cost.
5. Add the upfront fee. That is the true cost.

The [hidden markup checker](/hidden-fx-markup/) does steps 3 to 5 and pre-fills the most recent mid-market reference it has, with its date. The [calculator](/) shows the same breakdown for every provider in a corridor.

## What about weekends?

The wholesale market largely pauses from Friday evening to Sunday evening (New York and Asia-Pacific time respectively). Many providers widen their rates or add a weekend buffer to protect themselves against a jump at the Monday open. A markup calculated against Friday's closing mid-market rate on a Saturday may therefore look larger than the same provider's weekday markup. If timing is flexible, compare on a weekday. The guide on [how long international transfers take](/guides/how-long-international-transfers-take/) covers cut-off times and weekends in more detail.

## Common mistakes

- **Comparing the wrong way round.** A rate of 0.054 dollars per peso and 18.52 pesos per dollar describe the same price. Mixing them gives nonsense.
- **Comparing with the "we buy" or "we sell" board rate.** Bank branch boards show their own buy and sell rates, which already include margin.
- **Ignoring the fee.** A provider at mid-market with a 12 dollar fee can cost more than one with a 0.5% markup and no fee on a small amount, and less on a large one. Always add both.
