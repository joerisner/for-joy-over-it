import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    isDraft: z.boolean(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    title: z.string()
  })
});

export const collections = { blog };
