import { localStore } from "@vrembem/core";

export function themeStore(options) {
  const settings = {
    prefix: "vb-theme-",
    themes: ["root", "light", "dark"],
    storeKey: "VB:Profile",
    onInit() {},
    onChange() {},
    ...options
  };

  const profile = localStore(settings.storeKey);

  const api = {
    settings,
    onInit() { this.settings.onInit.call(this); },
    onChange() { this.settings.onChange.call(this); },
    add(value) {
      return this.settings.themes.push(value);
    },
    remove(value) {
      const index = this.settings.themes.indexOf(value);
      return (~index) ? this.settings.themes.splice(index, 1) : this.settings.themes;
    },
    get class() {
      return `${this.settings.prefix}${this.theme}`;
    },
    get classes() {
      return this.settings.themes.map((theme) => `${this.settings.prefix}${theme}`);
    },
    get theme() {
      return profile.get("theme") || "root";
    },
    set theme(value) {
      if (this.themes.includes(value)) {
        if (this.theme != value) {
          profile.set("theme", value);
          document.documentElement.classList.remove(...this.classes);
          document.documentElement.classList.add(`${this.settings.prefix}${value}`);
          this.onChange();
        }
      } else {
        console.error(`Not a valid theme value: "${value}"`);
      }
    },
    get themes() {
      return this.settings.themes;
    },
  };

  api.onInit();

  return api;
}
