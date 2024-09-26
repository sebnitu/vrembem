import { 
  getConfig,
  getCustomProps,
  getElement,
  teleport,
  toCamel,
  toKebab
} from "@vrembem/core";

export class CollectionEntry {
  constructor(context, query, options = {}) {
    this.context = context;
    this.id = query?.id || query;
    this.el = getElement(query);
    this.settings = Object.assign({}, options);
    this.dataConfig = {};
    this.customProps = {};
    this.returnRef = null;
  }

  applySettings(obj) {
    return Object.assign(this.settings, obj);
  }

  getDataConfig() {
    return Object.assign(this.dataConfig, getConfig(this.el, this.getSetting("dataConfig")));
  }

  getCustomProps() {
    return Object.assign(this.customProps, getCustomProps(this));
  }

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

    // Check the context settings.
    if ("settings" in this.context && camel in this.context.settings) {
      return this.context.settings[camel];
    }

    // Throw error if setting does not exist.
    throw(new Error(`${this.context.module} setting does not exist: ${key}`));
  }

  async mount(options = {}) {
    // Throw an error if the element for this entry was not found.
    if (this.el === null) {
      throw new Error(`${this.context.module} element was not found with ID: "${this.id}"`);
    }

    // Apply settings with passed options.
    this.applySettings(options);

    // Build the data attribute and custom property setting objects.
    this.getDataConfig();
    this.getCustomProps();

    // Check if beforeMount has been set and that it's a function.
    if ("beforeMount" in this && typeof this.beforeMount == "function") {
      await this.beforeMount();
    }

    // Teleport entry if a reference has been set.
    if (this.getSetting("teleport")) {
      this.teleport();
    }

    // Check if afterMount has been set and that it's a function.
    if ("afterMount" in this && typeof this.afterMount == "function") {
      await this.afterMount();
    }
  }

  async unmount() {
    // Check if beforeUnmount has been set and that it's a function.
    if ("beforeUnmount" in this && typeof this.beforeUnmount == "function") {
      await this.beforeUnmount();
    }

    // Return teleported entry if a reference has been set.
    if (this.getSetting("teleport")) {
      this.teleportReturn();
    }

    // Check if afterUnmount has been set and that it's a function.
    if ("afterUnmount" in this && typeof this.afterUnmount == "function") {
      await this.afterUnmount();
    }
  }

  teleport(ref = this.getSetting("teleport"), method = this.getSetting("teleportMethod")) {
    if (!this.returnRef) {
      this.returnRef = teleport(this.el, ref, method);
      return this.el;
    } else {
      console.error("Element has already been teleported:", this.el);
      return false;
    }
  }

  teleportReturn() {
    if (this.returnRef) {
      this.returnRef = teleport(this.el, this.returnRef);
      return this.el;
    } else {
      console.error("No return reference found:", this.el);
      return false;
    }
  }
}
