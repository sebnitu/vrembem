import { maybeRunMethod } from "../utilities";

export class PluginsArray extends Array {
  constructor(parent) {
    super();
    // Save a reference to the parent module.
    this.parent = parent;

    // Get the presets and remove them from the parent settings object.
    this.presets = parent.settings?.presets || {};
    delete parent.settings.presets;

    // Add the provided plugins and delete them from the parent settings object.
    this.add(parent.settings?.plugins || []);
    delete parent.settings.plugins;
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

    if (this.find((item) => item.name === plugin.name)) {
      console.error(`Plugin with the name "${plugin.name}" is already being used!`);
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
      // Push to the array if the plugin is valid.
      if (this.validate(plugin)) {
        this.push(plugin);
      }
    }
  }

  async remove(name) {
    const index = this.findIndex((plugin) => plugin.name === name);
    if (~index) {
      await maybeRunMethod(this[index], "teardown", { parent: this.parent });
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
  for (const hook of this.parent.hooks) {
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
