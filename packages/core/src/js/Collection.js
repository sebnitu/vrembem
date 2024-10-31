import { eventEmitter, extendObject, maybeRunMethod } from "./utilities";
import { dispatchLifecycleHook, pluginsArray } from "./helpers";
import { CollectionEntry } from "./CollectionEntry";

export class Collection {
  constructor(options = {}) {
    this.module = this.constructor.name;
    this.collection = [];
    this.entryClass = CollectionEntry;
    this.plugins = new pluginsArray(this);
    this.settings = {
      dataConfig: "config",
      customProps: [],
    };
    this.applySettings(options);
    extendObject(this, eventEmitter);
  }

  get(value, key = "id") {
    return this.collection.find((entry) => entry[key] === value);
  }

  applySettings(options) {
    this.plugins.add(options?.plugins || []);
    delete options.plugins;
    return Object.assign(this.settings, options);
  }

  async createEntry(query, config) {
    // Instantiate the entry class.
    const entry = new this.entryClass(this, query, config);

    // Run the entry init() method if it exists.
    if (typeof entry.init === "function") {
      await entry.init();
    }

    // Dispatch onCreateEntry lifecycle hooks.
    await dispatchLifecycleHook("onCreateEntry", { parent: this, entry });

    // Return the entry
    return entry;
  }

  // TODO: Store and provide the entry ID to lifecycle hooks and as the return.
  async destroyEntry(entry) {
    // Store the ID of the entry.
    const id = entry.id;

    // Run the entry destroy() method if it exists.
    if (typeof entry.init === "function") {
      await entry.destroy();
    }

    // Remove all the owned properties from the entry. except for the ""
    Object.getOwnPropertyNames(entry).forEach((prop) => {
      if (prop != "onDeregister") {
        delete entry[prop];
      }
    });

    // Dispatch onDestroyEntry lifecycle hooks.
    await dispatchLifecycleHook("onDestroyEntry", { parent: this, entry }, id);

    // Return the entry.
    return entry;
  }

  async register(query, config = {}) {
    // Create the collection entry object and mount it.
    const entry = await this.createEntry(query, config);

    // Add the entry to the collection.
    this.collection.push(entry);

    // Dispatch onRegisterEntry lifecycle hooks.
    await dispatchLifecycleHook("onRegisterEntry", { parent: this, entry });
  }

  // TODO: Store and provide the entry ID to lifecycle hooks and as the return.
  async deregister(id) {
    const index = this.collection.findIndex((entry) => entry.id === id);
    if (~index) {
      // Get the collection entry object from the collection and destroy it.
      const entry = await this.destroyEntry(this.collection[index]);

      // Remove the entry from the collection.
      this.collection.splice(index, 1);

      // Dispatch onDeregisterEntry lifecycle hooks.
      await dispatchLifecycleHook("onDeregisterEntry", { parent: this, entry }, id);
    }
  }

  async mount(options = {}) {
    // Apply settings with passed options.
    this.applySettings(options);

    // Mount plugins.
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "setup", { plugin, parent: this});
    }

    // Dispatch beforeMount lifecycle hooks.
    await dispatchLifecycleHook("beforeMount", { parent: this });

    // Get all the selector elements and register them.
    const els = document.querySelectorAll(this.settings.selector);
    for (const el of els) {
      await this.register(el);
    }

    // Dispatch afterMount lifecycle hooks.
    await dispatchLifecycleHook("afterMount", { parent: this });

    return this;
  }

  async unmount() {
    // Dispatch beforeUnmount lifecycle hooks.
    await dispatchLifecycleHook("beforeUnmount", { parent: this });

    // Loop through the collection and deregister each entry.
    while (this.collection.length > 0) {
      await this.deregister(this.collection[0].id);
    }

    // Dispatch afterUnmount lifecycle hooks.
    await dispatchLifecycleHook("afterUnmount", { parent: this });

    // Unmount plugins.
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "teardown", { plugin, parent: this});
    }

    return this;
  }
}
