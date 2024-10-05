import { CollectionEntry, lifecycleHook, pluginsArray } from "@vrembem/core";

export class Collection {
  constructor(options = {}) {
    this.module = this.constructor.name;
    this.collection = [];
    this.plugins = new pluginsArray();
    this.settings = { 
      dataConfig: "config",
      customProps: [],
    };
    this.applySettings(options);
  }

  get(value, key = "id") {
    return this.collection.find((entry) => entry[key] === value);
  }

  applySettings(options) {
    return Object.assign(this.settings, this.processOptions(options));
  }

  processOptions(options) {
    this.plugins.add(options?.plugins || []);
    delete options.plugins;
    return options;
  }

  async createEntry(query, config) {
    return new CollectionEntry(this, query, config);
  }

  async register(query, config = {}) {
    // Deregister the element in case it has already been registered.
    await this.deregister(query?.id || query, true);

    // Create the collection entry object and mount it.
    const entry = await this.createEntry(query, config);
    await entry.mount();

    // beforeRegister lifecycle hooks.
    for (const plugin of this.plugins) {
      await lifecycleHook.call(plugin, "beforeRegister", this);
    }
    await lifecycleHook.call(this, "beforeRegister", entry);
    await lifecycleHook.call(entry, "beforeRegister");
    
    // Add the entry to the collection.
    this.collection.push(entry);

    // afterRegister lifecycle hooks.
    for (const plugin of this.plugins) {
      await lifecycleHook.call(plugin, "afterRegister", this);
    }
    await lifecycleHook.call(entry, "afterRegister");
    await lifecycleHook.call(this, "afterRegister", entry);
    return entry;
  }

  async deregister(id, reReg = false) {
    const index = this.collection.findIndex((entry) => entry.id === id);
    if (~index) {
      // Get the collection entry object from the collection and unmount it.
      const entry = this.collection[index];
      await entry.unmount(reReg);

      // beforeDeregister lifecycle hooks.
      for (const plugin of this.plugins) {
        await lifecycleHook.call(plugin, "beforeDeregister", this, reReg);
      }
      await lifecycleHook.call(this, "beforeDeregister", entry, reReg);
      await lifecycleHook.call(entry, "beforeDeregister", reReg);
      
      // Remove all the owned properties from the entry.
      Object.getOwnPropertyNames(entry).forEach((prop) => {
        if (prop != "beforeDeregister" && prop != "afterDeregister") {
          delete entry[prop];
        }
      });

      // Remove the entry from the collection.
      this.collection.splice(index, 1);

      // afterDeregister lifecycle hooks.
      for (const plugin of this.plugins) {
        await lifecycleHook.call(plugin, "afterDeregister", this, reReg);
      }
      await lifecycleHook.call(entry, "afterDeregister", reReg);
      await lifecycleHook.call(this, "afterDeregister", entry, reReg);
    }

    return this.collection;
  }

  async mount(options = {}) {
    // Apply settings with passed options.
    this.applySettings(options);

    // Mount plugins.
    for (const plugin of this.plugins) {
      await lifecycleHook.call(plugin, "mount", this);
    }

    // beforeMount lifecycle hooks.
    for (const plugin of this.plugins) {
      await lifecycleHook.call(plugin, "beforeMount", this);
    }
    await lifecycleHook.call(this, "beforeMount");

    // Get all the selector elements and register them.
    const els = document.querySelectorAll(this.settings.selector);
    for (const el of els) {
      await this.register(el);
    }

    // afterMount lifecycle hooks.
    for (const plugin of this.plugins) {
      await lifecycleHook.call(plugin, "afterMount", this);
    }
    await lifecycleHook.call(this, "afterMount");

    return this;
  }

  async unmount() {
    // beforeUnmount lifecycle hooks.
    for (const plugin of this.plugins) {
      await lifecycleHook.call(plugin, "beforeUnmount", this);
    }
    await lifecycleHook.call(this, "beforeUnmount");

    // Loop through the collection and deregister each entry.
    while (this.collection.length > 0) {
      await this.deregister(this.collection[0].id);
    }

    // afterUnmount lifecycle hooks.
    for (const plugin of this.plugins) {
      await lifecycleHook.call(plugin, "afterUnmount", this);
    }
    await lifecycleHook.call(this, "afterUnmount");

    // Unmount plugins.
    for (const plugin of this.plugins) {
      await lifecycleHook.call(plugin, "unmount", this);
    }
    
    return this;
  }
}
