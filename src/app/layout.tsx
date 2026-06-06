import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'RateRunner — 실시간 환율 + 송금 경로 비교',
  description: 'USD·EUR·JPY·KRW 실시간 환율, 해외 송금 수수료 + 환율 통합 비교. Wise·페이팔·은행 송금 경로 한 번에.',
  keywords: ['환율', '실시간 환율', 'USD KRW', 'EUR KRW', '송금', '해외송금', 'Wise', 'remittance', 'exchange rate'],
  metadataBase: new URL('https://raterunner.online'),
  alternates: {
    canonical: '/',
    languages: { ko: '/ko', en: '/en', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://raterunner.online',
    siteName: 'RateRunner',
    title: 'RateRunner — 실시간 환율 + 송금 경로 비교',
    description: 'Wise·페이팔·은행 송금 수수료 + 환율 통합 비교',
  },
  twitter: { card: 'summary_large_image', title: 'RateRunner', description: '실시간 환율 + 송금 비교' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3LYD80FR0D" />
        <script
          dangerouslySetInnerHTML={{
            __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-3LYD80FR0D',{page_path:window.location.pathname});",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                { '@type': 'Organization', '@id': 'https://raterunner.online#org', name: 'RateRunner', url: 'https://raterunner.online' },
                { '@type': 'WebSite', '@id': 'https://raterunner.online#site', url: 'https://raterunner.online', name: 'RateRunner', inLanguage: 'ko-KR', publisher: { '@id': 'https://raterunner.online#org' } },
                { '@type': 'WebApplication', name: 'RateRunner', applicationCategory: 'FinanceApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
              ],
            }),
          }}
        />
              <script
          dangerouslySetInnerHTML={{
            __html: "window.addEventListener('click',function(event){var link=event.target&&event.target.closest?event.target.closest('a[rel*=\\\"sponsored\\\"],[data-affiliate-link]'):null;if(!link||typeof window.gtag!==\\\"function\\\")return;window.gtag('event','affiliate_click',{merchant:(link.textContent||'').trim().slice(0,60)||'partner',placement:link.getAttribute('data-placement')||link.getAttribute('aria-label')||'sponsored-link',page_location:window.location.href});},{capture:true});",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
