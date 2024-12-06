import { localStore } from "./modules";
import { cssVar } from "./helpers";

export function themeStore(options) {
  // Setup the default settings object.
  const settings = {
    prefix: cssVar("prefix-themes", { fallback: "vb-theme-" }),
    themes: ["root", "light", "dark"],
    storeKey: "VB:Profile"
  };

  // Override all settings values with provided options.
  for (const [key] of Object.entries(settings)) {
    if (options && options[key]) {
      settings[key] = options[key];
    }
  }

  // Setup the default callbacks object.
  const callbacks = {
    onInit() {},
    onChange() {}
  };

  // Override all callback values with provided options.
  for (const [key] of Object.entries(callbacks)) {
    if (options && options[key]) {
      callbacks[key] = options[key];
    }
  }

  // Get the local storage profile.
  const profile = localStore(settings.storeKey);

  // Setup the API object.
  const api = {
    // Store our settings in the API.
    settings,

    // Actions.
    add(value) {
      settings.themes.push(value);
    },
    remove(value) {
      const index = settings.themes.indexOf(value);
      ~index && settings.themes.splice(index, 1);
    },
    callback(name) {
      callbacks[name].call(this);
    },

    // Getters.
    get class() {
      return `${settings.prefix}${this.theme}`;
    },
    get classes() {
      return settings.themes.map((theme) => `${settings.prefix}${theme}`);
    },
    get themes() {
      return settings.themes;
    },

    // Setup the theme get and set methods.
    get theme() {
      return profile.get("theme") || "root";
    },
    set theme(value) {
      // Check if the value exists as a theme option.
      if (settings.themes.includes(value)) {
        // Check if the value is actually different from the one currently set.
        if (this.theme != value) {
          // Save the theme value to local storage.
          profile.set("theme", value);
          // Remove the theme classes from the html element.
          document.documentElement.classList.remove(...this.classes);
          // Add the new theme class to the html element.
          document.documentElement.classList.add(`${settings.prefix}${value}`);
          // Run the on change callback.
          this.callback("onChange");
        }
      } else {
        // Throw a console error if the theme doesn't exist as an option.
        console.error(`Not a valid theme value: "${value}"`);
      }
    }
  };

  // Run the on initialization callback.
  api.callback("onInit");

  // Return the API.
  return api;
}
