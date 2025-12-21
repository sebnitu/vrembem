import { CollectionEntry, CollectionEntryConstructor } from "./CollectionEntry";
import { EventEmitter, PluginArray, Plugin } from "./modules";
import { dispatchLifecycleHook } from "./helpers";
import { getElement, maybeRunMethod } from "./utilities";

export interface CollectionConfig {
  selector: string;
  plugins?: Plugin[];
  presets?: Record<string, Record<string, any>>;
}

export class Collection<
  TEntry extends CollectionEntry = CollectionEntry,
  TConfig extends CollectionConfig = CollectionConfig
> {
  // Private fields
  #eventsEmitter = new EventEmitter();
  // Alias the event emitter API directly on the Collection instance
  readonly events = this.#eventsEmitter.events;
  on = this.#eventsEmitter.on.bind(this.#eventsEmitter);
  off = this.#eventsEmitter.off.bind(this.#eventsEmitter);
  emit = this.#eventsEmitter.emit.bind(this.#eventsEmitter);

  // Public fields assigned in constructor
  name: string;
  collection: TEntry[] = [];
  entryClass: CollectionEntryConstructor<TEntry> =
    CollectionEntry as CollectionEntryConstructor<TEntry>;
  config: TConfig;
  plugins: PluginArray;

  constructor(options: Partial<TConfig> = {}) {
    this.name = this.constructor.name;
    this.config = { ...options } as TConfig;
    this.plugins = new PluginArray(this.config.presets);
  }

  get(value: any, key: keyof TEntry = "id") {
    return this.collection.find((entry) => entry[key] === value);
  }

  getOrThrow(value: any, key: keyof TEntry = "id") {
    const entry = this.get(value, key);
    if (entry) {
      return entry;
    } else {
      throw new Error(
        `${this.name} entry not found in collection with ${String(key)} of "${value}"`
      );
    }
  }

  applyConfig(options: Partial<TConfig> = {}) {
    return Object.assign(this.config, options);
  }

  async createEntry(query: string | HTMLElement) {
    const entry = new this.entryClass(this, query);
    await maybeRunMethod(entry, "init");
    await dispatchLifecycleHook("onCreateEntry", this, entry);
    return entry;
  }

  async destroyEntry(entry: TEntry) {
    await dispatchLifecycleHook("onDestroyEntry", this, entry);
    await maybeRunMethod(entry, "destroy");
    return entry;
  }

  async register(query: string | HTMLElement) {
    // Get the element to register
    const element = getElement(query);

    // Check if the element with the provided ID has already been registered
    const index = this.collection.findIndex((item) => item.id === element.id);
    if (~index) {
      // Get the entry from the collection
      const entry = this.collection[index];

      // Override the element property with the provided element
      entry.el = element;

      // Run the entry init method if it exists
      await maybeRunMethod(entry, "init");

      // Return the registered entry
      return entry;
    } else {
      // Create the collection entry object
      const entry = await this.createEntry(element);

      // Add the entry to the collection
      this.collection.push(entry);

      // Dispatch onRegisterEntry lifecycle hooks
      await dispatchLifecycleHook("onRegisterEntry", this, entry);

      // Return the registered entry
      return entry;
    }
  }

  async deregister(id: string) {
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

  async mount(options: Partial<TConfig> = {}) {
    // Apply config with passed options
    this.applyConfig(options);

    // Add plugins
    for (const plugin of this.config?.plugins || []) {
      this.plugins.add(plugin);
    }

    // Run setup methods on plugins
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "setup", this);
    }

    // Dispatch beforeMount lifecycle hooks
    await dispatchLifecycleHook("beforeMount", this);

    // Get all the selector elements and register them
    if (this.config.selector) {
      const els = document.querySelectorAll(this.config.selector);
      for (const el of els) {
        await this.register(el as HTMLElement);
      }
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
      await maybeRunMethod(plugin, "teardown", this);
    }

    // Remove plugins
    for (const plugin of [...this.plugins]) {
      this.plugins.remove(plugin.name);
    }

    return this;
  }
}
