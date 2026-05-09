import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const packages = defineCollection({
  loader: glob({ base: "./src/content/packages", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    package: z.string().optional(),
    category: z.string().optional(),
    order: z.number().optional()
  })
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional()
  })
});

export const collections = { packages, pages };
