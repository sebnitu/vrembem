import { storage } from "./storage";

export interface ThemeStoreAPI {
  config: typeof defaults;
  theme: string | undefined;
  mode: string | undefined;
}

const defaults = {
  // Local storage key for saving theme state.
  // @type string
  storeKey: "VB:Profile",

  // Used to toggle a separate vector for setting theme modes (light, dark, etc)
  // @type string[]
  modes: [] as string[],

  // An array of default theme names to make available.
  // @type string[]
  themes: [] as string[],

  // Callback run on initialization.
  // @type function
  onInit(_store: ThemeStoreAPI) {},

  // Callback run when the theme changes.
  // @type function
  onChange(_store: ThemeStoreAPI) {}
};

export function themeStore(options: Partial<typeof defaults> = {}) {
  const config = { ...defaults, ...options };
  const profile = storage(config.storeKey);
  const api = {
    config,

    get theme(): string | undefined {
      return profile.get("theme");
    },

    get mode(): string | undefined {
      return profile.get("mode");
    },

    set theme(value: string) {
      apply("theme", value, config.themes, this.theme);
    },

    set mode(value: string) {
      apply("mode", value, config.modes, this.mode);
    }
  };

  function apply(
    key: "theme" | "mode",
    value: string,
    group: string[],
    current: string | undefined
  ) {
    if (!group.includes(value)) {
      console.error(`Not a valid ${key} value: "${value}"`);
      return;
    }
    if (current !== value) {
      profile.set(key, value);
      document.documentElement.dataset[key] = value;
      config.onChange(api);
    }
  }

  config.onInit(api);

  return api;
}
