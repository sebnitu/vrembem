import { maybeRunMethod } from "./utilities";
import { pluginsArray } from "./helpers";
import { CollectionEntry } from "./CollectionEntry";

export class Collection {
  constructor(options = {}) {
    this.module = this.constructor.name;
    this.collection = [];
    this.plugins = new pluginsArray(this);
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
    await maybeRunMethod(this, "beforeRegister", entry);
    await maybeRunMethod(entry, "beforeRegister");
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "beforeRegister", entry);
    }

    // Add the entry to the collection.
    this.collection.push(entry);

    // afterRegister lifecycle hooks.
    await maybeRunMethod(this, "afterRegister", entry);
    await maybeRunMethod(entry, "afterRegister");
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "afterRegister", entry);
    }

    return entry;
  }

  async deregister(id, reReg = false) {
    const index = this.collection.findIndex((entry) => entry.id === id);
    if (~index) {
      // Get the collection entry object from the collection and unmount it.
      const entry = this.collection[index];
      await entry.unmount(reReg);

      // beforeDeregister lifecycle hooks.
      await maybeRunMethod(this, "beforeDeregister", entry, reReg);
      await maybeRunMethod(entry, "beforeDeregister", reReg);
      for (const plugin of this.plugins) {
        await maybeRunMethod(plugin, "beforeDeregister", entry, reReg);
      }

      // Remove all the owned properties from the entry.
      Object.getOwnPropertyNames(entry).forEach((prop) => {
        if (prop != "beforeDeregister" && prop != "afterDeregister") {
          delete entry[prop];
        }
      });

      // Remove the entry from the collection.
      this.collection.splice(index, 1);

      // afterDeregister lifecycle hooks.
      await maybeRunMethod(this, "afterDeregister", entry, reReg);
      await maybeRunMethod(entry, "afterDeregister", reReg);
      for (const plugin of this.plugins) {
        await maybeRunMethod(plugin, "afterDeregister", entry, reReg);
      }
    }

    return this.collection;
  }

  async mount(options = {}) {
    // Apply settings with passed options.
    this.applySettings(options);

    // Mount plugins.
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "mount", this);
    }

    // beforeMount lifecycle hooks.
    
    await maybeRunMethod(this, "beforeMount");
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "beforeMount", this);
    }

    // Get all the selector elements and register them.
    const els = document.querySelectorAll(this.settings.selector);
    for (const el of els) {
      await this.register(el);
    }

    // afterMount lifecycle hooks.
    await maybeRunMethod(this, "afterMount");
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "afterMount", { plugin, parent: this});
    }

    return this;
  }

  async unmount() {
    // beforeUnmount lifecycle hooks.
    await maybeRunMethod(this, "beforeUnmount");
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "beforeUnmount", this);
    }

    // Loop through the collection and deregister each entry.
    while (this.collection.length > 0) {
      await this.deregister(this.collection[0].id);
    }

    // afterUnmount lifecycle hooks.
    await maybeRunMethod(this, "afterUnmount");
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "afterUnmount", this);
    }

    // Unmount plugins.
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "unmount", this);
    }
    
    return this;
  }
}
