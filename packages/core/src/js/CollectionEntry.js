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

  // TODO: rename this to "init", "create", or "setup".
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

    // TODO: Move lifecycle hooks into parent.
    // On mount lifecycle hooks.
    await maybeRunMethod(this, "onMount");
    for (const plugin of this.parent.plugins) {
      await maybeRunMethod(plugin, "onMount", { plugin, parent: this.parent, entry: this });
    }
    // Emit the mount event.
    await this.parent.emit("mount", this);
  }

  // Rename this to "destroy" or "teardown".
  async unmount(reMount = false) {
    // TODO: Move lifecycle hooks into parent.
    // Before unmount lifecycle hooks.
    await maybeRunMethod(this, "onUnmount", reMount);
    for (const plugin of this.parent.plugins) {
      await maybeRunMethod(plugin, "onUnmount", { plugin, parent: this.parent, entry: this }, reMount);
    }
    // Emit the unmount event.
    await this.parent.emit("unmount", this, reMount);
  }
}
