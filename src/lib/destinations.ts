// Short, factual payout notes per receiving currency, each with an official source. Only where verifiable.
export interface DestNote { text: string; source: { name: string; url: string }; guide?: string }

export const destinations: Record<string, DestNote> = {
  MXN: {
    text: 'Bank deposits in Mexico normally arrive through SPEI, the Bank of Mexico’s real-time interbank system, and need the recipient’s 18-digit CLABE account number. Cash pickup is widely offered but is a different product with its own pricing.',
    source: { name: 'Banco de México: SPEI', url: 'https://www.banxico.org.mx/servicios/sistema-pagos-electronicos-in.html' },
    guide: 'send-money-to-mexico',
  },
  INR: {
    text: 'Deposits to Indian bank accounts need the account number and the branch IFSC code; inbound transfers are commonly credited over IMPS or NEFT. Non-resident Indians should check whether the receiving account is NRE or NRO, because the rules on repatriation and tax differ.',
    source: { name: 'Reserve Bank of India: NEFT FAQs', url: 'https://www.rbi.org.in/commonman/English/Scripts/FAQs.aspx?Id=60' },
    guide: 'send-money-to-india',
  },
  PHP: {
    text: 'In the Philippines, transfers to banks and e-wallets usually settle over InstaPay (real-time, lower-value) or PESONet (batch). E-wallet and cash pickup payouts are common and can carry different fees from bank deposits.',
    source: { name: 'Bangko Sentral ng Pilipinas: National Retail Payment System', url: 'https://www.bsp.gov.ph/SitePages/PaymentAndSettlement/NationalRetailPaymentSystem.aspx' },
    guide: 'send-money-to-philippines',
  },
  EUR: {
    text: 'Euro payouts inside the Single Euro Payments Area use SEPA credit transfers and need an IBAN. Under EU rules, a cross-border euro payment within the EU costs the same as a domestic one from the same bank.',
    source: { name: 'European Commission: cross-border payments', url: 'https://finance.ec.europa.eu/consumer-finance-and-payments/payment-services/cross-border-payments_en' },
    guide: 'swift-vs-local-payout',
  },
  GBP: {
    text: 'Pounds paid out locally in the UK usually arrive over Faster Payments using a sort code and account number. A provider with a UK payout account avoids the SWIFT charges a recipient bank may deduct from an incoming international wire.',
    source: { name: 'Pay.UK: Faster Payment System', url: 'https://www.wearepay.uk/what-we-do/payment-systems/faster-payment-system/' },
    guide: 'swift-vs-local-payout',
  },
};
