// Site-wide configuration. Values that differ per environment come from PUBLIC_* env vars at build time.
const env = (import.meta as any).env ?? {};

export const site = {
  domain: 'raterunner.online',
  url: 'https://raterunner.online',
  name: 'RateRunner',
  tagline: 'What an international money transfer really costs',
  description:
    'RateRunner itemises what an international money transfer really costs: the upfront fee plus the exchange-rate markup against the mid-market rate, ranked by what the recipient actually gets.',
  locale: 'en',
  contactEmail: 'contact@raterunner.online',
  ga4Id: (env.PUBLIC_GA4_ID as string | undefined) ?? '',
  gscVerification: (env.PUBLIC_GSC_VERIFICATION as string | undefined) ?? '',
  bingVerification: (env.PUBLIC_BING_VERIFICATION as string | undefined) ?? '',
  naverVerification: (env.PUBLIC_NAVER_VERIFICATION as string | undefined) ?? '',
  adsenseClient: 'ca-pub-4490818204529253',
  adSlots: {
    incontent1: (env.PUBLIC_ADSENSE_SLOT_INCONTENT1 as string | undefined) ?? '',
    incontent2: (env.PUBLIC_ADSENSE_SLOT_INCONTENT2 as string | undefined) ?? '',
  } as Record<string, string>,
  indexNowKey: '6be73d7d86230e4c2f51173b799c8184',
  // Affiliate links render only when non-empty. Until then neutral official links are shown (no rel=sponsored).
  affiliates: {
    wise: (env.PUBLIC_AFF_WISE as string | undefined) ?? '',
    remitly: (env.PUBLIC_AFF_REMITLY as string | undefined) ?? '',
  } as Record<string, string>,
  // Neutral official homepages used when no affiliate URL is configured.
  officialSites: {
    wise: 'https://wise.com/',
    remitly: 'https://www.remitly.com/',
    'western-union': 'https://www.westernunion.com/',
    xoom: 'https://www.xoom.com/',
    instarem: 'https://www.instarem.com/',
    ofx: 'https://www.ofx.com/',
    'world-remit': 'https://www.worldremit.com/',
    moneygram: 'https://www.moneygram.com/',
    paypal: 'https://www.paypal.com/',
  } as Record<string, string>,
  // Consent Mode v2: regions where storage defaults to denied (EEA + UK + CH).
  consentDeniedRegions: [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU',
    'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
  ],
  sameAs: [] as string[],
  foundingDate: '2026',
};

export type Site = typeof site;
export default site;
