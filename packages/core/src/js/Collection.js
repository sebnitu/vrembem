import { CollectionEntry } from "./CollectionEntry";

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

    // Check if beforeRegister has been set and that it's a function.
    if ("beforeRegister" in this && typeof this.beforeRegister == "function") {
      await this.beforeRegister(entry);
    }

    // Check if beforeRegister has been set and that it's a function.
    if ("beforeRegister" in entry && typeof entry.beforeRegister == "function") {
      await entry.beforeRegister();
    }
    
    // Add the entry to the collection.
    this.collection.push(entry);

    // Check if afterRegister has been set and that it's a function.
    if ("afterRegister" in entry && typeof entry.afterRegister == "function") {
      await entry.afterRegister();
    }

    // Check if afterRegister has been set and that it's a function.
    if ("afterRegister" in this && typeof this.afterRegister == "function") {
      await this.afterRegister(entry);
    }

    return entry;
  }

  async deregister(id, reReg = false) {
    const index = this.collection.findIndex((entry) => entry.id === id);
    if (~index) {
      // Get the collection entry object from the collection and unmount it.
      const entry = this.collection[index];
      await entry.unmount(reReg);

      // Check if beforeDeregister has been set and that it's a function.
      if ("beforeDeregister" in this && typeof this.beforeDeregister == "function") {
        await this.beforeDeregister(entry);
      }

      // Check if beforeDeregister has been set and that it's a function.
      if ("beforeDeregister" in entry && typeof entry.beforeDeregister == "function") {
        await entry.beforeDeregister(reReg);
      }
      
      // Remove all the properties from the entry.
      Object.getOwnPropertyNames(entry).forEach((prop) => {
        if (prop != "beforeDeregister" && prop != "afterDeregister") {
          delete entry[prop];
        }
      });

      // Remove the entry from the collection.
      this.collection.splice(index, 1);

      // Check if afterDeregister has been set and that it's a function.
      if ("afterDeregister" in entry && typeof entry.afterDeregister == "function") {
        await entry.afterDeregister(reReg);
      }

      // Check if afterDeregister has been set and that it's a function.
      if ("afterDeregister" in this && typeof this.afterDeregister == "function") {
        await this.afterDeregister(entry);
      }
    }

    return this.collection;
  }

  async mount(options = {}) {
    // Apply settings with passed options.
    this.applySettings(options);

    // Check if beforeMount has been set and that it's a function.
    if ("beforeMount" in this && typeof this.beforeMount == "function") {
      await this.beforeMount();
    }

    // Get all the selector elements.
    const els = document.querySelectorAll(this.settings.selector);
    
    // Register the collections using the returned elements.
    for (const el of els) {
      await this.register(el);
    }

    // Check if afterMount has been set and that it's a function.
    if ("afterMount" in this && typeof this.afterMount == "function") {
      await this.afterMount();
    }

    return this;
  }

  async unmount() {
    // Check if beforeUnmount has been set and that it's a function.
    if ("beforeUnmount" in this && typeof this.beforeUnmount == "function") {
      await this.beforeUnmount();
    }
    
    // Remove all entries from the collection.
    while (this.collection.length > 0) {
      await this.deregister(this.collection[0].id);
    }

    // Check if afterUnmount has been set and that it's a function.
    if ("afterUnmount" in this && typeof this.afterUnmount == "function") {
      await this.afterUnmount();
    }

    return this;
  }
}
