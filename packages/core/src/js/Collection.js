export class Collection {
  constructor() {
    this.collection = [];
  }

  async register(item) {
    await this.deregister(item);
    this.collection.push(item);
    return this.collection;
  }

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
    return this.collection.find((item) => {
      return item[key] === value;
    });
  }
}
