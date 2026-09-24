import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import './globals.css';

export const metadata: Metadata = {
  title: 'RateRunner | 공개 기준 환율과 송금 수수료 계산',
  description: '시각이 표시된 공개 기준 환율과 직접 입력하는 송금 수수료 계산기. 송금사별 실시간 견적이나 순위가 아닙니다.',
  keywords: ['환율', '기준 환율', 'USD KRW', 'EUR KRW', '송금 수수료 계산', 'exchange rate'],
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
    title: 'RateRunner | 공개 기준 환율과 송금 수수료 계산',
    description: '공개 기준 환율과 사용자 입력 기반 송금 수수료 계산기. 송금사 견적이 아닙니다.',
  },
  twitter: { card: 'summary_large_image', title: 'RateRunner', description: '공개 기준 환율과 수동 수수료 계산' },
  // Local source-port gate: no editorial/live-rate accuracy sign-off or owner deployment approval.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = (await headers()).get('x-raterunner-locale') === 'en' ? 'en' : 'ko';
  return (
    <html lang={locale}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W4S4GB2VLB" />
        <script
          dangerouslySetInnerHTML={{
            __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-W4S4GB2VLB',{page_path:window.location.pathname});",
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
