import { reactive } from 'vue';
import { localStore } from '@vrembem/core';

const profile = localStore('VB:Profile');

const prefix = 'theme-';
const themes = ['light', 'dark', 'default'];
const classes = themes.map((theme) => `${prefix}${theme}`);

const store = reactive({
  theme: profile.get('theme'),
  change(value) {
    if (themes.includes(value)) {
      this.theme = value;
      profile.set('theme', value);
      document.documentElement.classList.remove(...classes);
      document.documentElement.classList.add(`${prefix}${value}`);
    } else {
      console.error(`Not a valid theme: "${value}"`);
    }
  }
});

export { store };
