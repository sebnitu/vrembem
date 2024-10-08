import { getCustomProps, getSetting } from "./helpers";
import { getConfig, getElement, maybeRunMethod } from "./utilities";

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

  getDataConfig() {
    return Object.assign(this.dataConfig, getConfig(this.el, this.getSetting("dataConfig")));
  }

  getCustomProps() {
    return Object.assign(this.customProps, getCustomProps(this));
  }

  getSetting(key, options = {}) {
    return getSetting.call(this, key, options);
  }

  async mount(options = {}) {
    // Throw an error if the element for this entry was not found.
    if (this.el === null) {
      throw new Error(`${this.parent.module} element was not found with ID: "${this.id}"`);
    }

    // Apply settings with passed options.
    this.applySettings(options);

    // Build the data attribute and custom property setting objects.
    this.getDataConfig();
    this.getCustomProps();

    // On mount lifecycle hooks.
    await maybeRunMethod.call(this, "onMount");
    for (const plugin of this.parent.plugins) {
      await maybeRunMethod.call(plugin, "onMount", this);
    }
  }

  async unmount(reMount = false) {
    // Before mount lifecycle hooks.
    await maybeRunMethod.call(this, "onUnmount", reMount);
    for (const plugin of this.parent.plugins) {
      await maybeRunMethod.call(plugin, "onUnmount", this, reMount);
    }
  }
}
