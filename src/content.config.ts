import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 项目集合
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: z.object({
    title: z.object({ zh: z.string(), en: z.string() }),
    description: z.object({ zh: z.string(), en: z.string() }),
    cover: z.string(),
    tags: z.array(z.string()),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
    date: z.coerce.date(),
  }),
});

// 博客文章集合
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: z.object({
    title: z.object({ zh: z.string(), en: z.string() }),
    description: z.object({ zh: z.string(), en: z.string() }),
    cover: z.string().optional(),
    tags: z.array(z.string()),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
