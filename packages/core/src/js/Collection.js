import { 
  getConfig,
  getCustomProps,
  getElement,
  teleport,
  toCamel,
  toKebab
} from "@vrembem/core";

export class Collection {
  #entryPrototype;

  constructor(options = {}) {
    const root = this;
    this.module = this.constructor.name;
    this.collection = [];
    this.settings = Object.assign({
      dataConfig: "config",
      teleport: null,
      teleportMethod: "append"
    }, options);
    this.#entryPrototype = {
      applySettings(obj) {
        return Object.assign(this.settings, obj);
      },
      getDataConfig() {
        return Object.assign(this.dataConfig, getConfig(this.el, this.getSetting("dataConfig")));
      },
      getCustomProps() {
        return Object.assign(this.customProps, getCustomProps(this.el, root.module, this.customPropKeys));
      },
      getSetting(key) {
        // Store our key in both camel and kebab naming conventions.
        const camel = toCamel(key);
        const kebab = toKebab(key);
  
        // Check the data config object.
        if ("dataConfig" in this && camel in this.dataConfig) {
          return this.dataConfig[camel];
        }
  
        // Check the custom properties object.
        if ("customProps" in this && kebab in this.customProps) {
          return this.customProps[kebab];
        }
  
        // Check the entry settings.
        if ("settings" in this && camel in this.settings) {
          return this.settings[camel];
        }
  
        // Check the root settings.
        if ("settings" in root && camel in root.settings) {
          return root.settings[camel];
        }
  
        // Throw error if setting does not exist.
        throw(new Error(`${root.module} setting does not exist: ${key}`));
      },
      teleport(ref = this.getSetting("teleport"), method = this.getSetting("teleportMethod")) {
        if (!this.returnRef) {
          this.returnRef = teleport(this.el, ref, method);
          return this.el;
        } else {
          console.error("Element has already been teleported:", this.el);
          return false;
        }
      },
      teleportReturn() {
        if (this.returnRef) {
          this.returnRef = teleport(this.el, this.returnRef);
          return this.el;
        } else {
          console.error("No return reference found:", this.el);
          return false;
        }
      },
    };
  }

  createEntry(query, overrides = {}) {
    const el = getElement(query);
    const entry = Object.create(this.#entryPrototype);
    Object.assign(entry, {
      id: el?.id,
      el: el,
      settings: {},
      dataConfig: {},
      customProps: {},
      customPropKeys: [],
      returnRef: null,
    }, overrides);
    return entry;
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
