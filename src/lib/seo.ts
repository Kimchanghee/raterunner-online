import site from '../site.config.ts';

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

export function abs(path: string): string {
  return new URL(path, site.url).toString();
}

export function orgLd() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    url: site.url + '/',
    email: site.contactEmail,
    description: site.description,
    logo: abs('/favicon.svg'),
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: site.name,
    url: site.url + '/',
    description: site.description,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };
}

export interface Crumb { name: string; path: string }

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
