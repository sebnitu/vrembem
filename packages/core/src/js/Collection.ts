import defaults from "./defaults";
import { CollectionEntry } from "./CollectionEntry";
import { eventEmitter, PluginsArray } from "./modules";
import { dispatchLifecycleHook } from "./helpers";
import { getElement, maybeRunMethod } from "./utilities";
import type { EventEmitter } from "./modules";

export class Collection implements EventEmitter {
  module: string;
  collection: any[];
  entryClass: any;
  settings: Record<string, any>;
  plugins: PluginsArray;
  events: EventEmitter["events"];
  on: EventEmitter["on"];
  off: EventEmitter["off"];
  emit: EventEmitter["emit"];

  constructor(options: Record<string, any> = {}) {
    this.module = this.constructor.name;
    this.collection = [];
    this.entryClass = CollectionEntry;
    this.settings = { ...defaults, ...options };

    // Create the plugins array and provide any presets
    this.plugins = new PluginsArray(this.settings.presets);

    // Add event emitter prop and methods
    this.events = {};
    Object.assign(this, eventEmitter);
  }

  get(value: any, key: string = "id") {
    return this.collection.find((entry) => entry[key] === value);
  }

  applySettings(options: Record<string, any>) {
    return Object.assign(this.settings, options);
  }

  async createEntry(query: any, config: any) {
    const entry = new this.entryClass(this, query, config);
    await maybeRunMethod(entry, "init");
    await dispatchLifecycleHook("onCreateEntry", this, entry);
    return entry;
  }

  async destroyEntry(entry: any) {
    await dispatchLifecycleHook("onDestroyEntry", this, entry);
    await maybeRunMethod(entry, "destroy");
    return entry;
  }

  async register(query: any, config: any = {}) {
    // Get the element to register
    const element = getElement(query);

    // Throw an error if element wasn't found
    if (element === null) {
      throw new Error(
        `${this.module} element was not found with ID: "${query?.id || query}"`
      );
    }

    // Check if the element with the provided ID has already been registered
    const index = this.collection.findIndex((item) => item.id === element.id);
    if (~index) {
      // Get the entry from the collection
      const entry = this.collection[index];

      // Override the element property with the provided element
      entry.el = element;

      // Run the entry init() method if it exists
      if (typeof entry.init === "function") {
        await entry.init(config);
      }

      // Return the registered entry
      return entry;
    } else {
      // Create the collection entry object
      const entry = await this.createEntry(element, config);

      // Add the entry to the collection
      this.collection.push(entry);

      // Dispatch onRegisterEntry lifecycle hooks
      await dispatchLifecycleHook("onRegisterEntry", this, entry);

      // Return the registered entry
      return entry;
    }
  }

  async deregister(id: any) {
    const index = this.collection.findIndex((entry) => entry.id === id);
    if (~index) {
      // Get the collection entry object from the collection and destroy it
      const entry = await this.destroyEntry(this.collection[index]);

      // Dispatch onDeregisterEntry lifecycle hooks
      await dispatchLifecycleHook(
        "onDeregisterEntry",
        this,
        this.collection[index]
      );

      // Remove the entry from the collection
      this.collection.splice(index, 1);

      return entry;
    }

    return null;
  }

  async mount(options: Record<string, any> = {}) {
    // Apply settings with passed options
    this.applySettings(options);

    // Add plugins
    for (const plugin of this.settings?.plugins || []) {
      this.plugins.add(plugin);
    }

    // Run setup methods on plugins
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "setup", { plugin, parent: this });
    }

    // Dispatch beforeMount lifecycle hooks
    await dispatchLifecycleHook("beforeMount", this);

    // Get all the selector elements and register them
    const els = document.querySelectorAll(this.settings.selector);
    for (const el of els) {
      await this.register(el);
    }

    // Dispatch afterMount lifecycle hooks
    await dispatchLifecycleHook("afterMount", this);

    return this;
  }

  async unmount() {
    // Dispatch beforeUnmount lifecycle hooks
    await dispatchLifecycleHook("beforeUnmount", this);

    // Loop through the collection and deregister each entry
    while (this.collection.length > 0) {
      await this.deregister(this.collection[0].id);
    }

    // Dispatch afterUnmount lifecycle hooks
    await dispatchLifecycleHook("afterUnmount", this);

    // Run teardown methods on plugins
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "teardown", { plugin, parent: this });
    }

    // Remove plugins
    for (const plugin of [...this.plugins]) {
      this.plugins.remove(plugin.name);
    }

    return this;
  }
}
