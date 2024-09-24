export class Collection {
  constructor(options = {}) {
    this.module = this.constructor.name;
    this.collection = [];
    this.settings = Object.assign({ dataConfig: "config" }, options);
  }

  applySettings(options) {
    return Object.assign(this.settings, options);
  }

  // TODO: Create a collection "mount" and "unmount" method.

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

  get(value, key = "id") {
    return this.collection.find((entry) => entry[key] === value);
  }
}
