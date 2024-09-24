export class Collection {
  constructor(options = {}) {
    this.module = this.constructor.name;
    this.collection = [];
    this.settings = Object.assign({ dataConfig: "config" }, options);
  }

  get(value, key = "id") {
    return this.collection.find((entry) => entry[key] === value);
  }

  applySettings(options) {
    return Object.assign(this.settings, options);
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
    await this.registerCollection(els);

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
    await this.deregisterCollection();

    // Check if afterUnmount has been set and that it's a function.
    if ("afterUnmount" in this && typeof this.afterUnmount == "function") {
      await this.afterUnmount();
    }

    return this;
  }

  // TODO: Refactor this so that it's used instead of always overridden.
  // TODO: Create a "beforeRegister" and "afterRegister" that allows an entry to
  // be modified before it's completely registered.
  async register(item) {
    await this.deregister(item);
    this.collection.push(item);
    return this.collection;
  }

  // TODO: Refactor this so that it's used instead of always overridden.
  // TODO: Create a "beforeDeregister" and "afterDeregister" that allows an entry to
  // be modified before it's completely registered.
  async deregister(ref) {
    const index = this.collection.findIndex((entry) => {
      return (entry === ref);
    });
    if (index >= 0) {
      const entry = this.collection[index];
      Object.getOwnPropertyNames(entry).forEach((prop) => {
        delete entry[prop];
      });
      this.collection.splice(index, 1);
    }
    return this.collection;
  }

  async registerCollection(items) {
    await Promise.all(Array.from(items, (item) => {
      this.register(item);
    }));
    return this.collection;
  }

  async deregisterCollection() {
    while (this.collection.length > 0) {
      await this.deregister(this.collection[0]);
    }
    return this.collection;
  }
}
