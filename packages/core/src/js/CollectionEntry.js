import { 
  getConfig,
  getCustomProps,
  getElement,
  lifecycleHook,
  teleport,
  getSetting,
} from "@vrembem/core";

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

    await lifecycleHook.call(this, "beforeMount");

    // Teleport entry if a reference has been set.
    if (this.getSetting("teleport")) {
      this.teleport();
    }

    await lifecycleHook.call(this, "afterMount");
  }

  async unmount(reMount = false) {
    await lifecycleHook.call(this, "beforeUnmount", reMount);

    // Return teleported entry if a reference has been set.
    if (typeof this.teleportReturn === "function") {
      this.teleportReturn();
    }

    await lifecycleHook.call(this, "afterUnmount", reMount);
  }

  teleport(ref = this.getSetting("teleport"), method = this.getSetting("teleportMethod")) {
    if (typeof this.teleportReturn === "function") {
      this.teleportReturn();
    }
    this.teleportReturn = teleport(this.el, ref, method);
    return this.el;
  }
}
