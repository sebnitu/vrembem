import type { Collection } from "../Collection";
import type { CollectionEntry } from "../CollectionEntry";

export interface Plugin<
  TParent extends Collection<any> = Collection<any>,
  TEntry extends CollectionEntry<any> = CollectionEntry<any>
> {
  name: string;
  config: Record<string, any>;
  options?: Record<string, any>;
  setup?: (this: this, context: TParent) => void;
  teardown?: (this: this, context: TParent) => void;
  onCreateEntry?: (
    this: this,
    context: { parent: TParent; entry: TEntry }
  ) => void;
  onDestroyEntry?: (
    this: this,
    context: { parent: TParent; entry: TEntry }
  ) => void;
  onRegisterEntry?: (
    this: this,
    context: { parent: TParent; entry: TEntry }
  ) => void;
  onDeregisterEntry?: (
    this: this,
    context: { parent: TParent; entry: TEntry }
  ) => void;
  beforeMount?: (this: this, context: TParent) => void;
  afterMount?: (this: this, context: TParent) => void;
  beforeUnmount?: (this: this, context: TParent) => void;
  afterUnmount?: (this: this, context: TParent) => void;
}

type Presets = Record<string, Record<string, any>>;

export class PluginArray extends Array<Plugin> {
  presets: Presets;

  constructor(presets: Presets = {}) {
    super();
    this.presets = presets;
  }

  buildConfig(plugin: Plugin): void {
    // Get the preset and options of the plugin if they were set
    const preset = this.presets?.[plugin.name] || {};
    const options = plugin?.options || {};

    // Create the config property by merging the plugin defaults, preset and
    // any provided options.
    plugin.config = { ...plugin.config, ...preset, ...options };
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
      this.buildConfig(plugin);
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
