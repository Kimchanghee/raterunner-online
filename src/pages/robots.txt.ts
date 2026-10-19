import site from '../site.config.ts';

// Allow all crawlers, including AI crawlers (GEO/LLMO). Nothing is blocked.
export function GET() {
  const agents = ['Googlebot', 'Bingbot', 'Yeti', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'];
  const body = [
    ...agents.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']),
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${site.url}/sitemap-index.xml`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
