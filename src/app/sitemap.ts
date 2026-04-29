import type { MetadataRoute } from 'next';

const SITE = 'https://raterunner.online';
const LOCALES = ['ko', 'en'];
const PAIRS = [
  ['krw', 'usd'], ['krw', 'jpy'], ['krw', 'eur'], ['krw', 'gbp'], ['krw', 'cny'],
  ['krw', 'aud'], ['krw', 'cad'], ['krw', 'sgd'], ['krw', 'thb'], ['krw', 'vnd'],
  ['krw', 'php'], ['krw', 'hkd'],
];
const AMOUNTS = [100000, 500000, 1000000, 5000000, 10000000];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({ url: `${SITE}/${locale}`, lastModified, changeFrequency: 'hourly', priority: 1.0 });
    for (const [base, quote] of PAIRS) {
      entries.push({
        url: `${SITE}/${locale}/${base}-${quote}`,
        lastModified, changeFrequency: 'hourly', priority: 0.9,
      });
      for (const amount of AMOUNTS) {
        entries.push({
          url: `${SITE}/${locale}/remit/${base}-${quote}/${amount}`,
          lastModified, changeFrequency: 'daily', priority: 0.7,
        });
      }
    }
  }
  return entries;
}
