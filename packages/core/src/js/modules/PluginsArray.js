export class PluginsArray extends Array {
  constructor(options) {
    super();
    this.presets = options?.presets || {};
    this.hooks = options?.hooks || [];
  }

  process(plugin) {
    maybeInitSettings.call(this, plugin);
    maybeOverrideName(plugin);
    maybeApplyHooks.call(this, plugin);
  }

  validate(plugin) {
    if (!("name" in plugin) || typeof plugin.name !== "string") {
      console.error("Plugin requires a name!");
      return false;
    };

    return true;
  }

  get(name) {
    return this.find((plugin) => plugin.name === name);
  }

  add(plugin) {
    if (Array.isArray(plugin)) {
      plugin.forEach((plugin) => this.add(plugin));
    } else {
      // Process the plugin object.
      this.process(plugin);
      // Ensure the plugin is valid.
      if (this.validate(plugin)) {
        // Either replace the plugin if it already exists in the array,
        // otherwise push the new plugin to the array.
        const index = this.findIndex((item) => item.name === plugin.name);
        if (~index) {
          this[index] = plugin;
        } else {
          this.push(plugin);
        }
      }
    }
  }

  remove(name) {
    const index = this.findIndex((plugin) => plugin.name === name);
    if (~index) {
      this.splice(index, 1);
    }
  }
}

function maybeInitSettings(plugin) {
  // If settings has not been defined...
  if (!plugin.settings) {
    // Get the defaults, presets and provided configuration of the plugin.
    const defaults = plugin?.defaults || {};
    const preset = this.presets?.[plugin.name] || {};
    const options = plugin?.options || {};

    // Create the settings property by merging the plugin defaults, presets and
    // any passed configurations.
    plugin.settings = {...defaults, ...preset, ...options};
  }
}

function maybeOverrideName(plugin) {
  // Apply custom plugin name if one is provided.
  if (plugin.settings.name) {
    plugin.name = plugin.settings.name;
    delete plugin.settings.name;
  }
}

function maybeApplyHooks(plugin) {
  // Iterate over the hooks array.
  for (const hook of this.hooks) {
    if (typeof plugin.settings[hook] === "function") {
      // Check we're allowed to override hooks or that the hook doesn't already 
      // exist in methods. This is to prevent overriding core functionality
      // unless explicitly allowed.
      if (plugin.settings.override || typeof plugin[hook] !== "function") {
        // Copy the method to the methods object.
        plugin[hook] = plugin.settings[hook];
      } else {
        console.error(`${plugin.name} plugin already has "${hook}" lifecycle hook defined!`);
      }
      // Delete the method from the settings object.
      delete plugin.settings[hook];
    }
  };
}
