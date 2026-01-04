import { maybeRunMethod } from "../utilities";
import type { CollectionEntry } from "../CollectionEntry";

export interface Plugin<TEntry extends CollectionEntry = CollectionEntry> {
  name: string;
  config: Record<string, any>;
  options?: Record<string, any>;
  setup?: (this: this, context: any) => void;
  teardown?: (this: this, context: any) => void;
  onCreateEntry?: (this: this, context: { parent: any; entry: TEntry }) => void;
  onDestroyEntry?: (
    this: this,
    context: { parent: any; entry: TEntry }
  ) => void;
  onRegisterEntry?: (
    this: this,
    context: { parent: any; entry: TEntry }
  ) => void;
  onDeregisterEntry?: (
    this: this,
    context: { parent: any; entry: TEntry }
  ) => void;
  beforeMount?: (this: this, context: any) => void;
  afterMount?: (this: this, context: any) => void;
  beforeUnmount?: (this: this, context: any) => void;
  afterUnmount?: (this: this, context: any) => void;
}

type Presets = Record<string, Record<string, any>>;

export class PluginArray {
  #plugins: Array<Plugin>;
  presets: Presets;

  constructor(presets: Presets = {}) {
    this.#plugins = [];
    this.presets = presets;
  }

  #buildConfig(plugin: Plugin): void {
    // Get the preset and options of the plugin if they were set
    const preset = this.presets?.[plugin.name] || {};
    const options = plugin?.options || {};

    // Set the name property if it has been provided
    plugin.name = options.name || plugin.name;

    // Create the config property by merging the plugin defaults, preset and
    // any provided options.
    plugin.config = { ...plugin.config, ...preset, ...options };
  }

  #validate(plugin: Plugin): boolean {
    if (!("name" in plugin) || typeof plugin.name !== "string") {
      console.error("Plugin requires a name!");
      return false;
    }
    return true;
  }

  get length() {
    return this.#plugins.length;
  }

  get(name: "*"): Array<Plugin>;
  get(name: string): Array<Plugin> | Plugin | null {
    if (name === "*") {
      return this.#plugins;
    } else {
      return this.#plugins.find((plugin) => plugin.name === name) || null;
    }
  }

  async add(plugin: Plugin, ...args: any[]): Promise<void> {
    // Process the plugin object
    this.#buildConfig(plugin);
    // Ensure the plugin is valid
    if (this.#validate(plugin)) {
      // Either replace the plugin if it already exists in the array,
      // otherwise push the new plugin to the array.
      const index = this.#plugins.findIndex(
        (item) => item.name === plugin.name
      );
      if (~index) {
        console.error(`Plugin name must be unique: "${plugin.name}"`);
      } else {
        // Push plugin to the array and run the setup method
        this.#plugins.push(plugin);
        await maybeRunMethod(plugin, "setup", ...args);
      }
    }
  }

  async remove(name: string, ...args: any[]): Promise<void> {
    const index = this.#plugins.findIndex((plugin) => plugin.name === name);
    if (~index) {
      // Run the teardown method and splice plugin from the array
      await maybeRunMethod(this.#plugins[index], "teardown", ...args);
      this.#plugins.splice(index, 1);
    }
  }
}
