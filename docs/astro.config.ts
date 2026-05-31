import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
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
