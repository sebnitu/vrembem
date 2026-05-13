import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
    package: z.string().optional(),
    category: z.string().optional()
  })
});

export const collections = { pages };
