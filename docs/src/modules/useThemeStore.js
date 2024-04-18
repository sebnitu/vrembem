import { localStore } from '@vrembem/core';

const prefix = 'vb-theme-';
const themes = ['light', 'dark', 'root'];
const classes = themes.map((theme) => `${prefix}${theme}`);

const store = {
  theme: 'root',
  change(value) {
    console.error(`Document is not available in this context: ${value}`);
  }
};

if (typeof window !== 'undefined') {
  const profile = localStore('VB:Profile');
  store.theme = profile.get('theme') || 'root';
  store.change = (value) => {
    if (themes.includes(value)) {
      store.theme = value;
      profile.set('theme', value);
      document.documentElement.classList.remove(...classes);
      document.documentElement.classList.add(`${prefix}${value}`);
    } else {
      console.error(`Not a valid theme: "${value}"`);
    }
  };
}

export { store };
