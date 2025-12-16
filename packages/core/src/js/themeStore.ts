import { localStore } from "./modules";
import { cssVar } from "./helpers";

interface ThemeStoreApi {
  config: ThemeStoreConfig;
  add: (value: string) => void;
  remove: (value: string) => void;
  readonly class: string;
  readonly classes: string[];
  readonly themes: string[];
  theme: string;
}

interface ThemeStoreCallbacks {
  onInit: () => void;
  onChange: () => void;
}

interface ThemeStoreConfig extends ThemeStoreCallbacks {
  prefix: string;
  storeKey: string;
  fallback: string;
  themes: string[];
}

const defaults: ThemeStoreConfig = {
  prefix: cssVar("theme-prefix", { fallback: "vb-theme-" }),
  storeKey: "VB:Profile",
  fallback: "root",
  themes: ["root", "light", "dark"],
  onInit() {},
  onChange() {}
};

export function themeStore(
  options: Partial<ThemeStoreConfig> = {}
): ThemeStoreApi {
  // Setup the default config object
  const config: ThemeStoreConfig = { ...defaults, ...options };

  // Private callback function
  function callback(name: keyof ThemeStoreCallbacks) {
    config[name].call(api);
  }

  // Get the local storage profile
  const profile = localStore(config.storeKey);

  // Setup the API object
  const api: ThemeStoreApi = {
    // Store our config in the API
    config,

    // Actions
    add(value: string) {
      config.themes.push(value);
    },
    remove(value: string) {
      const index = config.themes.indexOf(value);
      ~index && config.themes.splice(index, 1);
    },

    // Getters
    get class() {
      return `${config.prefix}${this.theme}`;
    },
    get classes() {
      return config.themes.map((theme) => `${config.prefix}${theme}`);
    },
    get themes() {
      return config.themes;
    },

    // Setup the theme get and set methods
    get theme() {
      return profile.get("theme") || config.fallback;
    },
    set theme(value: string) {
      // Check if the value exists as a theme option
      if (config.themes.includes(value)) {
        // Check if the value is actually different from the one currently set
        if (this.theme != value) {
          // Save the theme value to local storage
          profile.set("theme", value);

          // Remove the theme classes from the html element
          document.documentElement.classList.remove(...this.classes);

          // Add the new theme class to the html element
          document.documentElement.classList.add(`${config.prefix}${value}`);

          // Run the on change callback
          callback("onChange");
        }
      } else {
        // Throw a console error if the theme doesn't exist as an option
        console.error(`Not a valid theme value: "${value}"`);
      }
    }
  };

  // Run the on initialization callback
  callback("onInit");

  // Return the API
  return api;
}
