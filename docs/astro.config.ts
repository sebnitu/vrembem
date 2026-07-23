import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  vite: {
    build: {
      cssMinify: "esbuild"
    }
  },
  integrations: [
    mdx({
      smartypants: false
    })
  ],
  markdown: {
    shikiConfig: {
      theme: "css-variables"
    }
  }
});
