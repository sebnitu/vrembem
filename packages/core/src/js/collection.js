export class Collection {
  constructor() {
    this.collection = [];
  }

  register(item) {
    this.deregister(item);
    this.collection.push(item);
    return this.collection;
  }

  deregister(ref) {
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
    await items.forEach(async (item) => {
      await this.register(item);
    });
    return this.collection;
  }

  async deregisterCollection() {
    while (this.collection.length > 0) {
      await this.deregister(this.collection[0]);
    }
    return this.collection;
  }

  get(query, key = 'id') {
    const result = this.collection.find((item) => {
      return item[key] === query;
    });
    return result || null;
  }
}
