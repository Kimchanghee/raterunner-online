import type { APIRoute, GetStaticPaths } from 'astro';
import { allCorridors, quotes } from '../../../lib/data.ts';

export const getStaticPaths: GetStaticPaths = () => allCorridors().map((v) => ({ params: { slug: v.slug }, props: { key: v.key } }));

export const GET: APIRoute = ({ props }) => {
  const c = quotes.corridors[(props as { key: string }).key]!;
  return new Response(JSON.stringify({ from: c.from, to: c.to, source: quotes.source, bands: c.bands }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
