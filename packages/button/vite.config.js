import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import data from './package.json';

const shortName = data.name.replace('@vrembem/', '');
const shortNameCap = shortName.charAt(0).toUpperCase() + shortName.slice(1);

export default defineConfig({
  build: {},
  plugins: [
    createHtmlPlugin({
      inject: {
        data: { ...{ shortName, shortNameCap }, ...data }
      }
    })
  ]
});
