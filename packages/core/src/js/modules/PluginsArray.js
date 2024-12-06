export class PluginsArray extends Array {
  constructor(presets = {}) {
    super();
    this.presets = presets;
  }

  applySettings(plugin) {
    // Get the defaults, presets and provided configuration of the plugin.
    const defaults = plugin?.defaults || {};
    const preset = this.presets?.[plugin.name] || {};
    const options = plugin?.options || {};

    // Create the settings property by merging the plugin defaults, preset and
    // any provided options.
    plugin.settings = { ...defaults, ...preset, ...options };
  }

  validate(plugin) {
    if (!("name" in plugin) || typeof plugin.name !== "string") {
      console.error("Plugin requires a name!");
      return false;
    }

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
      this.applySettings(plugin);
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
