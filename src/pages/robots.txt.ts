import site from '../site.config.ts';

// Allow all crawlers, including AI crawlers (GEO/LLMO). Nothing is blocked.
export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${site.url}/sitemap-index.xml`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
