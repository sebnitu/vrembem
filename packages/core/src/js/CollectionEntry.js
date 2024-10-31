import { getCustomProps, getSetting } from "./helpers";
import { getConfig, getElement } from "./utilities";

export class CollectionEntry {
  constructor(parent, query, options = {}) {
    this.parent = parent;
    this.id = query?.id || query;
    this.el = getElement(query);
    this.settings = Object.assign({}, options);
    this.dataConfig = {};
    this.customProps = {};
  }

  applySettings(obj) {
    return Object.assign(this.settings, obj);
  }

  getSetting(key, options = {}) {
    return getSetting.call(this, key, options);
  }

  // TODO: Maybe rename this to "build" or something along with the helper function.
  getDataConfig() {
    return Object.assign(this.dataConfig, getConfig(this.el, this.getSetting("dataConfig")));
  }
  
  // TODO: Maybe rename this to "build" or something.
  getCustomProps() {
    return Object.assign(this.customProps, getCustomProps(this));
  }

  async init(options = {}) {
    // Throw an error if the element for this entry was not found.
    if (this.el === null) {
      throw new Error(`${this.parent.module} element was not found with ID: "${this.id}"`);
    }

    // Apply settings with passed options.
    this.applySettings(options);

    // Build the data attribute and custom property setting objects.
    this.getDataConfig();
    this.getCustomProps();
  }

  async destroy() {
    // console.log("CollectionEntry > destroy()");
  }
}
