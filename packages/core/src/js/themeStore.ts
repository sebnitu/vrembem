import { localStore } from "./modules";
import { cssVar } from "./helpers";

interface ThemeStoreOptions {
  prefix?: string;
  storeKey?: string;
  themes?: string[];
  fallback?: string;
  onInit?: () => void;
  onChange?: () => void;
}

interface ThemeStoreApi {
  config: {
    prefix: string;
    storeKey: string;
    fallback: string;
  };
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

export function themeStore(options: ThemeStoreOptions = {}): ThemeStoreApi {
  // Setup the default config object
  const config = {
    prefix: cssVar("theme-prefix", { fallback: "vb-theme-" }),
    storeKey: "VB:Profile",
    fallback: "root"
  };

  // Override all config values with provided options
  for (const [key] of Object.entries(config)) {
    if (options && options[key as keyof ThemeStoreOptions]) {
      config[key as keyof typeof config] = options[
        key as keyof ThemeStoreOptions
      ] as any;
    }
  }

  // Setup the default callbacks object
  const callbacks: ThemeStoreCallbacks = {
    onInit() {},
    onChange() {}
  };

  // Override all callback values with provided options
  for (const [key] of Object.entries(callbacks)) {
    if (options && options[key as keyof ThemeStoreCallbacks]) {
      callbacks[key as keyof ThemeStoreCallbacks] = options[
        key as keyof ThemeStoreCallbacks
      ] as any;
    }
  }

  // Private callback function
  function callback(name: keyof ThemeStoreCallbacks) {
    callbacks[name].call(api);
  }

  // Get the local storage profile
  const profile = localStore(config.storeKey);

  // Setup the private themes array
  const themesArray = options.themes || ["root", "light", "dark"];

  // Setup the API object
  const api: ThemeStoreApi = {
    // Store our config in the API
    config,

    // Actions
    add(value: string) {
      themesArray.push(value);
    },
    remove(value: string) {
      const index = themesArray.indexOf(value);
      ~index && themesArray.splice(index, 1);
    },

    // Getters
    get class() {
      return `${config.prefix}${this.theme}`;
    },
    get classes() {
      return themesArray.map((theme) => `${config.prefix}${theme}`);
    },
    get themes() {
      return themesArray;
    },

    // Setup the theme get and set methods
    get theme() {
      return profile.get("theme") || config.fallback;
    },
    set theme(value: string) {
      // Check if the value exists as a theme option
      if (themesArray.includes(value)) {
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
