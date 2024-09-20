import { getConfig, getCustomProps, toCamel, toKebab } from "@vrembem/core";

export class Collection {
  constructor() {
    const root = this;
    this.module = this.constructor.name;
    this.collection = [];
    this.settings = {};
    this.entry = {
      settings: {},
      dataConfig: {},
      customProps: {},
      customPropsArray: [],
      refreshDataConfig() {
        this.dataConfig = getConfig(this.el, this.getSetting("dataConfig"));
        return this.dataConfig;
      },
      refreshCustomProps() {
        this.customProps = getCustomProps(this.el, root.module, this.customPropsArray);
        return this.customProps;
      },
      getSetting(key) {
        // Store our key in both camel and kebab naming conventions.
        const camel = toCamel(key);
        const kebab = toKebab(key);
  
        // Check the data config object.
        if (camel in this.dataConfig) {
          return this.dataConfig[camel];
        }
  
        // Check the custom properties object.
        if (kebab in this.customProps) {
          return this.customProps[kebab];
        }
  
        // Check the entry settings.
        if (camel in this.settings) {
          return this.settings[camel];
        }
  
        // Check the root settings.
        if (camel in root.settings) {
          return root.settings[camel];
        }
  
        // Throw error if setting does not exist.
        throw(new Error(`${root.module} setting does not exist: ${key}`));
      }
    };
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
    return this.collection.find((entry) => entry[key] === value);
  }
}
