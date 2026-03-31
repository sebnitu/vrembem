import { localStore } from "./localStore";
import { cssVar } from "../helpers";

const defaults = {
  // The class prefix for theme names.
  // @type string
  prefix: cssVar("theme-prefix", { fallback: "vb-theme" }),

  // Local storage key for saving theme state.
  // @type string
  storeKey: "VB:Profile",

  // The default theme if none is set in local storage. Must be an existing
  // theme in `themes` array.
  // @type string
  fallback: "auto",

  // An array of default theme names to make available.
  // @type string[]
  themes: ["auto", "light", "dark"] as string[],

  // Callback run on initialization.
  // @type function
  onInit() {},

  // Callback run when the theme changes.
  // @type function
  onChange() {}
};

export function themeStore(options: Partial<typeof defaults> = {}) {
  // Setup the default config object
  const config = { ...defaults, ...options };

  // Get the local storage profile
  const profile = localStore(config.storeKey);

  // Setup the API object
  const api = {
    // Store our config in the API
    config,

    add(value: string) {
      config.themes.push(value);
    },

    remove(value: string) {
      const index = config.themes.indexOf(value);
      ~index && config.themes.splice(index, 1);
    },

    get class() {
      return `${config.prefix}-${this.theme}`;
    },

    get classes() {
      return config.themes.map((theme) => `${config.prefix}-${theme}`);
    },

    get themes() {
      return config.themes;
    },

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
          document.documentElement.classList.add(`${config.prefix}-${value}`);

          // Run the on change callback
          callback("onChange");
        }
      } else {
        // Throw a console error if the theme doesn't exist as an option
        console.error(`Not a valid theme value: "${value}"`);
      }
    }
  };

  // Private callback function
  function callback(name: "onInit" | "onChange") {
    config[name].call(api);
  }

  // Run the on initialization callback
  callback("onInit");

  // Return the API
  return api;
}
