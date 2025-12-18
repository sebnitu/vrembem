// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Define a schema for each collection you'd like to validate
const packages = defineCollection({
  loader: glob({ base: "./src/content/packages", pattern: "*.mdx" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    package: z.string(),
    status: z.string().optional()
  })
});

const modules = defineCollection({
  loader: glob({ base: "./src/content/packages", pattern: "*/*.mdx" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    parent: z.string(),
    group: z.string().optional(),
    order: z.number().optional()
  })
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { packages, modules };
