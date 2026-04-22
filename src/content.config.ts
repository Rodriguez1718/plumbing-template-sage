import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({
    meta: z.object({
      title: z.string(),
      description: z.string(),
      keywords: z.string().optional(),
      ogImage: z.string().optional(),
    }),
    sections: z.array(
      z.object({
        component: z.string(),
        props: z.record(z.any()).default({}),
      })
    ),
    noindex: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
})

export const collections = { pages }
