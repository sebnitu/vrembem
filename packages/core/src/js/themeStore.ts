import { localStore } from "./modules";
import { cssVar } from "./helpers";

interface ThemeStoreOptions {
  prefix?: string;
  themes?: string[];
  storeKey?: string;
  onInit?: () => void;
  onChange?: () => void;
}

interface ThemeStoreApi {
  settings: {
    prefix: string;
    themes: string[];
    storeKey: string;
  };
  add: (value: string) => void;
  remove: (value: string) => void;
  callback: (name: keyof ThemeStoreCallbacks) => void;
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
  // Setup the default settings object
  const settings = {
    prefix: cssVar("prefix-themes", { fallback: "vb-theme-" }),
    themes: ["root", "light", "dark"],
    storeKey: "VB:Profile"
  };

  // Override all settings values with provided options
  for (const [key] of Object.entries(settings)) {
    if (options && options[key as keyof ThemeStoreOptions]) {
      settings[key as keyof typeof settings] = options[
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

  // Get the local storage profile
  const profile = localStore(settings.storeKey);

  // Setup the API object
  const api: ThemeStoreApi = {
    // Store our settings in the API
    settings,

    // Actions
    add(value: string) {
      settings.themes.push(value);
    },
    remove(value: string) {
      const index = settings.themes.indexOf(value);
      ~index && settings.themes.splice(index, 1);
    },
    callback(name: keyof ThemeStoreCallbacks) {
      callbacks[name].call(this);
    },

    // Getters
    get class() {
      return `${settings.prefix}${this.theme}`;
    },
    get classes() {
      return settings.themes.map((theme) => `${settings.prefix}${theme}`);
    },
    get themes() {
      return settings.themes;
    },

    // Setup the theme get and set methods
    get theme() {
      return profile.get("theme") || "root";
    },
    set theme(value: string) {
      // Check if the value exists as a theme option
      if (settings.themes.includes(value)) {
        // Check if the value is actually different from the one currently set
        if (this.theme != value) {
          // Save the theme value to local storage
          profile.set("theme", value);

          // Remove the theme classes from the html element
          document.documentElement.classList.remove(...this.classes);

          // Add the new theme class to the html element
          document.documentElement.classList.add(`${settings.prefix}${value}`);

          // Run the on change callback
          this.callback("onChange");
        }
      } else {
        // Throw a console error if the theme doesn't exist as an option
        console.error(`Not a valid theme value: "${value}"`);
      }
    }
  };

  // Run the on initialization callback
  api.callback("onInit");

  // Return the API
  return api;
}
