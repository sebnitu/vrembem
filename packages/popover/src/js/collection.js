export default class Collection {
  constructor() {
    this.collection = [];
  }

  register(item) {
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

  registerCollection(items) {
    items.forEach((item) => {
      this.register(item);
    });
    return this.collection;
  }

  deregisterCollection() {
    while (this.collection.length > 0) {
      this.deregister(this.collection[0]);
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
