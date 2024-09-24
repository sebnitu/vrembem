import { 
  getConfig,
  getCustomProps,
  getElement,
  teleport,
  toCamel,
  toKebab
} from "@vrembem/core";

export class Entry {
  constructor(root, query) {
    const el = getElement(query);
    this.root = root;
    this.id = el?.id;
    this.el = el;
    this.settings = {};
    this.dataConfig = {};
    this.customProps = {};
    this.customPropKeys = [];
    this.returnRef = null;
  }

  applySettings(obj) {
    return Object.assign(this.settings, obj);
  }

  getDataConfig() {
    return Object.assign(this.dataConfig, getConfig(this.el, this.getSetting("dataConfig")));
  }

  getCustomProps() {
    return Object.assign(this.customProps, getCustomProps(this.el, this.root.module, this.customPropKeys));
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

    // Check the root settings.
    if ("settings" in this.root && camel in this.root.settings) {
      return this.root.settings[camel];
    }

    // Throw error if setting does not exist.
    throw(new Error(`${this.root.module} setting does not exist: ${key}`));
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
