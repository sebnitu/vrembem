import { CollectionEntry, lifecycleHook } from "@vrembem/core";

export class Collection {
  constructor(options = {}) {
    this.module = this.constructor.name;
    this.collection = [];
    this.settings = Object.assign({ 
      dataConfig: "config",
      teleport: null,
      teleportMethod: "append"
    }, options);
  }

  get(value, key = "id") {
    return this.collection.find((entry) => entry[key] === value);
  }

  applySettings(obj) {
    return Object.assign(this.settings, obj);
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
    await lifecycleHook.call(this, "beforeRegister", entry);
    await lifecycleHook.call(entry, "beforeRegister");
    
    // Add the entry to the collection.
    this.collection.push(entry);

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
      await lifecycleHook.call(this, "beforeDeregister", entry);
      await lifecycleHook.call(entry, "beforeDeregister", reReg);
      
      // Remove all the owned properties from the entry.
      Object.getOwnPropertyNames(entry).forEach((prop) => {
        if (prop != "beforeDeregister" && prop != "afterDeregister") {
          delete entry[prop];
        }
      });

      // Remove the entry from the collection.
      this.collection.splice(index, 1);

      await lifecycleHook.call(entry, "afterDeregister", reReg);
      await lifecycleHook.call(this, "afterDeregister", entry);
    }

    return this.collection;
  }

  async mount(options = {}) {
    // Apply settings with passed options.
    this.applySettings(options);
    await lifecycleHook.call(this, "beforeMount");
    // Get all the selector elements and register them.
    const els = document.querySelectorAll(this.settings.selector);
    for (const el of els) {
      await this.register(el);
    }
    await lifecycleHook.call(this, "afterMount");
    return this;
  }

  async unmount() {
    await lifecycleHook.call(this, "beforeUnmount");
    // Loop through the collection and deregister each entry.
    while (this.collection.length > 0) {
      await this.deregister(this.collection[0].id);
    }
    await lifecycleHook.call(this, "afterUnmount");
    return this;
  }
}
