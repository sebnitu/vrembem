import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import addClasses from 'rehype-add-classes';

const additions = {
  table: 'table table_style_bordered table_zebra table_hover'
}

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), mdx({
    rehypePlugins: [[addClasses, additions]],
  })]
});
