import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    isDraft: z.boolean(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    title: z.string()
  })
});

export const collections = { blog };
