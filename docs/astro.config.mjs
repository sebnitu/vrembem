import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [vue(), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro'
    },
    extendDefaultPlugins: true,
  }
});
