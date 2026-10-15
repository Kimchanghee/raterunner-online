import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().min(20).max(70),
    seoTitle: z.string().min(50).max(60),
    description: z.string().min(150).max(160),
    question: z.string().min(5),
    answer: z.string().min(40),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    data_asof: z.coerce.date(),
    sources: z.array(z.object({ name: z.string(), url: z.string().url() })).min(1),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    corridors: z.array(z.string()).default([]),
    status: z.enum(['draft', 'published', 'refresh-needed']).default('published'),
  }),
});

export const collections = { guides };
