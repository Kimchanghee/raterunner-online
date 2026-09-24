import type { MetadataRoute } from 'next';

// Keep the route, but expose no unreviewed URLs until approved release.
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
