type Plugin = {
  name: string;
  defaults?: Record<string, any>;
  options?: Record<string, any>;
  settings?: Record<string, any>;
  [key: string]: any;
};

type Presets = Record<string, Record<string, any>>;

export class PluginsArray extends Array<Plugin> {
  presets: Presets;

  constructor(presets: Presets = {}) {
    super();
    this.presets = presets;
  }

  applySettings(plugin: Plugin): void {
    // Get the defaults, presets and provided configuration of the plugin
    const defaults = plugin?.defaults || {};
    const preset = this.presets?.[plugin.name] || {};
    const options = plugin?.options || {};

    // Create the settings property by merging the plugin defaults, preset and
    // any provided options.
    plugin.settings = { ...defaults, ...preset, ...options };
  }

  validate(plugin: Plugin): boolean {
    if (!("name" in plugin) || typeof plugin.name !== "string") {
      console.error("Plugin requires a name!");
      return false;
    }
    return true;
  }

  get(name: string): Plugin | undefined {
    return this.find((plugin) => plugin.name === name);
  }

  add(plugin: Plugin | Plugin[]): void {
    if (Array.isArray(plugin)) {
      plugin.forEach((p) => this.add(p));
    } else {
      // Process the plugin object
      this.applySettings(plugin);
      // Ensure the plugin is valid
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

  remove(name: string): void {
    const index = this.findIndex((plugin) => plugin.name === name);
    if (~index) {
      this.splice(index, 1);
    }
  }
}
