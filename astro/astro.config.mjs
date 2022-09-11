import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import addClasses from 'rehype-add-classes';

const additions = {
  table: 'table table_style_bordered table_zebra table_hover'
}

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), mdx()],
  markdown: {
    // remarkPlugins: [remarkToc],
    rehypePlugins: [
      [addClasses, additions],
    ],
    syntaxHighlight: 'prism',
    // shikiConfig: {
    //   // Choose from Shiki's built-in themes (or add your own)
    //   // https://github.com/shikijs/shiki/blob/main/docs/themes.md
    //   theme: 'one-dark-pro'
    // },
    // Preserve Astro's default plugins: GitHub-flavored Markdown and Smartypants
    // default: false
    extendDefaultPlugins: true,
  }
});
