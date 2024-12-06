import { getCustomProps, getSetting } from "./helpers";
import { getDataConfig, getElement } from "./utilities";

export class CollectionEntry {
  constructor(parent, query, options = {}) {
    this.parent = parent;
    this.id = query?.id || query;
    this.el = getElement(query);
    this.settings = { ...options };
    this.dataConfig = {};
    this.customProps = {};
  }

  applySettings(options) {
    return Object.assign(this.settings, options);
  }

  getSetting(key, options) {
    return getSetting.call(this, key, options);
  }

  buildDataConfig() {
    return Object.assign(
      this.dataConfig,
      getDataConfig(this.el, this.getSetting("dataConfig"))
    );
  }

  buildCustomProps() {
    return Object.assign(this.customProps, getCustomProps(this));
  }

  async init(options = {}) {
    // Throw an error if the element for this entry was not found
    if (this.el === null) {
      throw new Error(
        `${this.parent.module} element was not found with ID: "${this.id}"`
      );
    }

    // Apply settings with passed options
    this.applySettings(options);

    // Build the data attribute and custom property setting objects
    this.buildDataConfig();
    this.buildCustomProps();
  }

  async destroy() {
    // Remove all the owned properties from the entry except for the id
    Object.getOwnPropertyNames(this).forEach((prop) => {
      if (prop !== "id") {
        delete this[prop];
      }
    });
  }
}
