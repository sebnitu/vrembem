import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// TODO: Test that things render correctly using a new collection

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
    order: z.number().optional(),
    anchor: z.string().optional()
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

export const collections = { packages, modules, pages };
