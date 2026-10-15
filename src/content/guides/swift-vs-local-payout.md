---
title: "SWIFT wire or local payout: which costs less to receive?"
seoTitle: "SWIFT Wire vs Local Payout: Fees, Speed and Who Pays What"
description: "A SWIFT wire can pass through intermediary banks that deduct fees; a local payout arrives as a domestic transfer. How each works, OUR/SHA/BEN, and what to ask."
question: "swift vs local transfer fees"
answer: "A local payout usually costs the recipient less. A SWIFT wire can pass through intermediary banks that deduct their own charges and the receiving bank may add an incoming-wire fee, while a local payout arrives as an ordinary domestic transfer with no deductions on the way."
published: 2026-10-15
updated: 2026-10-15
data_asof: 2026-10-15
sources:
  - name: "Swift: Swift gpi (tracking and fee transparency for cross-border payments)"
    url: "https://www.swift.com/our-solutions/swift-gpi"
  - name: "Directive (EU) 2015/2366 (PSD2), including charging rules within the EEA"
    url: "https://eur-lex.europa.eu/eli/dir/2015/2366/oj"
  - name: "Regulation (EU) 2021/1230 on cross-border payments in the Union"
    url: "https://eur-lex.europa.eu/eli/reg/2021/1230/oj"
  - name: "CFPB: Regulation E, 12 CFR 1005.31 (remittance disclosures, including covered third-party fees)"
    url: "https://www.consumerfinance.gov/rules-policy/regulations/1005/31/"
faq:
  - q: "What do OUR, SHA and BEN mean on a wire form?"
    a: "They decide who pays the charges. OUR: the sender pays all charges. SHA: the sender pays their bank, the recipient pays theirs. BEN: the recipient bears all charges, deducted from the amount."
  - q: "Can I avoid intermediary bank fees?"
    a: "Choosing OUR asks the sender's bank to cover them, but not every bank or route honours it fully. Using a provider that pays out locally in the recipient's country avoids intermediaries altogether."
  - q: "Is SWIFT always more expensive?"
    a: "No. For large business payments, or currencies with no local payout option, a wire may be the practical choice. The point is to know which charges can appear, and from whom."
related: ["bank-international-wire-fees", "how-long-international-transfers-take", "freelancer-international-payments"]
corridors: ["usd-to-eur", "gbp-to-eur", "usd-to-gbp"]
---

## How does a SWIFT wire actually travel?

SWIFT is a messaging network that banks use to instruct each other. When your bank sends an international wire, it sends a payment message to the recipient's bank. If the two banks do not hold accounts with each other, the money moves through one or more correspondent banks that do. Each bank in that chain can deduct a handling charge from the amount before passing it on, and the receiving bank may charge an incoming international wire fee on top.

That is how a recipient expecting 1,000 can see 965 arrive with no clear explanation. Since 2017, Swift's gpi service has let participating banks track payments end to end and show deductions along the way, which has made these charges more visible, but they still exist.

## What is a local payout?

Most transfer services and some banks hold accounts in the destination country. When you send money, you pay the provider in your currency at home; the provider pays the recipient from its local account in theirs, through the domestic payment system. Examples:

| Destination | Domestic system often used for payout | What the recipient needs |
|---|---|---|
| Eurozone | SEPA credit transfer or SEPA Instant | IBAN |
| United Kingdom | Faster Payments | Sort code and account number |
| Mexico | SPEI | 18-digit CLABE |
| India | IMPS or NEFT | Account number and IFSC |
| Philippines | InstaPay or PESONet, or an e-wallet | Account or e-wallet number |

To the recipient's bank this is a domestic payment, so there are no intermediary deductions and usually no incoming international wire fee. The cost to you is the provider's fee and exchange-rate markup, both of which you can see before paying. RateRunner's [corridor pages](/send/) rank providers by what arrives, assuming the quoted payout.

## Who pays the charges on a wire: OUR, SHA or BEN?

International wire forms usually offer three charge options:

- **OUR**: the sender pays all charges, including (in principle) intermediary and receiving-bank charges.
- **SHA** (shared): the sender pays their own bank's charges; the recipient bears charges from intermediaries and their bank.
- **BEN** (beneficiary): all charges are deducted from the amount; the recipient bears everything.

Within the European Economic Area, payment services rules generally require shared charging when both banks are in the EEA and no currency conversion is involved, and Regulation (EU) 2021/1230 requires a cross-border euro payment within the EU to cost the same as a domestic euro payment from the same provider. Outside those cases, the option chosen matters. Even with OUR, some correspondent banks still deduct a charge, because they are not party to the agreement between you and your bank.

## What does US law require providers to disclose?

For remittance transfers sent by consumers in the United States, Regulation E requires the provider to disclose, before payment, the exchange rate, its fees, certain third-party fees and the amount the recipient will receive. The rules allow some fees charged by the recipient's institution to be excluded from the total, with a statement that the recipient may receive less. That is the gap a local payout closes: if the money arrives as a domestic transfer, the recipient's bank has no international fee to apply.

## When does each option make sense?

**Local payout is usually better when**

- the amount is small or medium, so a flat intermediary charge would be a large share;
- the recipient needs a predictable amount, such as rent or tuition;
- the destination has a fast domestic system (SEPA Instant, Faster Payments, SPEI, IMPS, InstaPay).

**A SWIFT wire may be necessary when**

- the currency or country has no local payout from your provider;
- a business counterpart requires a wire with specific references;
- the amount exceeds a provider's limits (see [limits and ID checks](/guides/transfer-limits-and-id-checks/)).

## Questions to ask before sending a wire

1. Which charge option am I using, and can I choose OUR?
2. Will the payment go through an intermediary bank? Which one, and what does it usually deduct?
3. Does the recipient's bank charge for incoming international wires?
4. What exchange rate will be used, and when is it fixed?
5. Is there a tracking reference (a UETR on gpi payments)?

Then compare with the total cost of a local payout in the [calculator](/). For the fees banks put on outgoing wires, see [what banks charge for an international wire](/guides/bank-international-wire-fees/).
