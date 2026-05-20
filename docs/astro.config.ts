import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    smartypants: false,
    shikiConfig: {
      theme: "css-variables"
    }
  }
});
