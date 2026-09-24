import type { MetadataRoute } from 'next';

// Withhold the unpublished local candidate from crawlers pending source/editorial approval.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', disallow: '/' }] };
}
