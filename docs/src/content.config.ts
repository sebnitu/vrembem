// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Define a schema for each collection you'd like to validate
const packages = defineCollection({
  loader: glob({ base: "./src/content/packages", pattern: "*.mdx" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    package: z.string(),
    category: z.string().optional()
  })
});

const modules = defineCollection({
  loader: glob({ base: "./src/content/modules", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    parent: z.string(),
    group: z.string().optional(),
    order: z.number().optional()
  })
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional()
  })
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { packages, modules, pages };
