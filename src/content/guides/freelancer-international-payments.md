---
title: "How can freelancers get paid from abroad without losing 5%?"
seoTitle: "Getting Paid from Abroad as a Freelancer: Cut FX and Fees"
description: "Freelancers paid by foreign clients lose money in three places: platform fees, the conversion rate and receiving-bank charges. Where each comes from and how to shrink it."
question: "how to get paid from abroad as a freelancer"
answer: "Invoice in a way that lets you control the currency conversion, and receive through local account details rather than a SWIFT wire or a payment wallet's default conversion. In RateRunner's 15 October 2026 snapshot, PayPal's transfer markups ran 3.05% to 5.84%, against under 1% for the best services."
published: 2026-10-15
updated: 2026-10-15
data_asof: 2026-10-15
sources:
  - name: "Wise public comparison data (quotes used in RateRunner's snapshot)"
    url: "https://wise.com/gb/compare/"
  - name: "IRS: About Form W-8BEN (foreign status for US withholding)"
    url: "https://www.irs.gov/forms-pubs/about-form-w-8-ben"
  - name: "Swift: Swift gpi (cross-border payment tracking and fee transparency)"
    url: "https://www.swift.com/our-solutions/swift-gpi"
  - name: "Regulation (EU) 2021/1230 on cross-border payments in the Union"
    url: "https://eur-lex.europa.eu/eli/reg/2021/1230/oj"
faq:
  - q: "Should I invoice in my currency or my client's?"
    a: "Invoicing in your currency moves the conversion to your client's provider, which you cannot see or control. Invoicing in theirs and converting yourself lets you choose the provider, but you carry the exchange-rate risk until you convert."
  - q: "Why did less arrive than I invoiced?"
    a: "Usually one of three reasons: an intermediary bank deducted a charge on a SWIFT wire, your bank charged for an incoming international payment, or the money was converted at a marked-up rate on the way in."
  - q: "Do I need to fill in a W-8BEN for a US client?"
    a: "US payers often ask non-US individuals for Form W-8BEN to document foreign status for US tax withholding purposes. It is a tax form, not a payment form; check the IRS instructions or a tax adviser for your situation."
related: ["swift-vs-local-payout", "exchange-rate-markup-explained", "bank-international-wire-fees"]
corridors: ["usd-to-eur", "usd-to-gbp", "usd-to-inr", "gbp-to-eur"]
---

## Where does the money go?

A freelancer invoicing a foreign client for 2,000 dollars can lose money at up to four points before it lands:

| Stage | What happens | Typical size |
|---|---|---|
| Platform or marketplace | Service fee on the job value | Set by the platform's terms |
| Client's payment method | Card or wallet fees, sometimes passed on | Varies |
| Currency conversion | The rate is marked up against mid-market | From about 0% to over 5% |
| Delivery route | Intermediary and receiving-bank charges on SWIFT wires | Flat amounts per payment |

The first two depend on your contract and platform. The last two you can usually influence, and they are often the larger.

## How big is the conversion cost?

Payment wallets often convert automatically when money moves between currencies, and the conversion rate is where much of their margin sits. In RateRunner's snapshot of 15 October 2026, PayPal's personal international transfer quotes appeared in 23 corridors, with exchange-rate markups between 3.05% and 5.84% (median 4.69%) on top of a fixed fee. In the same corridors, the best services quoted markups under 1%, and several were within 0.5% of mid-market.

On 2,000 dollars converted, a 4.69% markup costs about 94 dollars; a 0.5% markup costs 10. That difference recurs every time you are paid. The exact wallet rate for receiving business payments may differ from the personal transfer quotes in the snapshot, so check your own transaction history: the statement shows the rate used, and the [hidden markup checker](/hidden-fx-markup/) turns it into a percentage.

## Option 1: Receive in the client's currency, convert yourself

Several providers offer multi-currency accounts with local account details in other countries: for example, a US routing and account number, a UK sort code and account number, or a eurozone IBAN. Your client pays you as if paying a domestic supplier. You then hold the foreign currency or convert it when you choose, at the provider's rate.

**Advantages:** the client pays a domestic transfer, so no intermediary bank is involved; you choose when to convert and can compare rates with the [calculator](/).

**Trade-offs:** you carry exchange-rate risk while holding foreign currency, and the provider's own conversion fee still applies. Check that the provider's terms allow business receipts.

## Option 2: Invoice in your own currency

Your client's bank or payment provider converts. This is simple for you and moves the currency risk to the client, but the conversion happens at a rate you cannot see. Many clients will not notice a 3% markup on their side; some will, and may ask to switch. It also does not protect you from intermediary deductions if the client sends a SWIFT wire with charges shared (SHA).

## Option 3: SWIFT wire

A wire is sometimes the only option a client's accounts department will use. To limit deductions:

- Ask the client to choose charge option **OUR** so their side pays the charges, while knowing that some correspondent banks may still deduct.
- Give a correct SWIFT/BIC and IBAN or account number to avoid repair fees and returns.
- Ask your bank what it charges for incoming international payments and whether a different account type avoids it.

Within the EU, a euro payment from another EU country must cost the same as a domestic euro payment from the same provider, under Regulation (EU) 2021/1230, which makes euro-to-euro invoicing between EU countries straightforward. See [SWIFT vs local payout](/guides/swift-vs-local-payout/) for how the charge options work.

## Paperwork that affects payments

- **US clients and W-8BEN.** US payers commonly request Form W-8BEN from non-US individuals to document foreign status for withholding. It is a tax document; read the IRS instructions or ask a tax adviser.
- **Payment references.** Put the invoice number in the payment reference. It helps reconcile receipts and answers compliance questions on larger payments.
- **Source-of-funds questions.** Providers may ask about unusual or large incoming payments. Keeping contracts and invoices to hand speeds this up. See [why providers ask for ID](/guides/transfer-limits-and-id-checks/).

## A routine that keeps costs down

1. Get local receiving details in your main client currencies.
2. Invoice in the client's currency where you can convert cheaply, in your own where you cannot.
3. Convert in larger batches rather than every small payment, if you can tolerate the rate risk.
4. Check the true cost of each conversion: fee plus markup, as itemised in the [calculator](/).
5. Review statements quarterly for incoming-payment charges you did not expect.
