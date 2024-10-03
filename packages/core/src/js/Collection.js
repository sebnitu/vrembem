import { CollectionEntry, lifecycleHook } from "@vrembem/core";

export class Collection {
  constructor(options = {}) {
    this.module = this.constructor.name;
    this.collection = [];
    this.plugins = [];

    const plugins = options?.plugins || [];
    delete options.plugins;

    // Create the settings object.
    this.settings = Object.assign({ 
      dataConfig: "config",
      customProps: [],
    }, options);

    // Register the plugins.
    for (const plugin of plugins) {
      this.registerPlugin(plugin);
    }
  }

  get(value, key = "id") {
    return this.collection.find((entry) => entry[key] === value);
  }

  applySettings(obj) {
    return Object.assign(this.settings, obj);
  }

  async createEntry(query, config) {
    return new CollectionEntry(this, query, config);
  }

  async register(query, config = {}) {
    // Deregister the element in case it has already been registered.
    await this.deregister(query?.id || query, true);

    // Create the collection entry object and mount it.
    const entry = await this.createEntry(query, config);
    await entry.mount();
    await lifecycleHook.call(this, "beforeRegister", entry);
    await lifecycleHook.call(entry, "beforeRegister");
    
    // Add the entry to the collection.
    this.collection.push(entry);

    await lifecycleHook.call(entry, "afterRegister");
    await lifecycleHook.call(this, "afterRegister", entry);
    return entry;
  }

  async deregister(id, reReg = false) {
    const index = this.collection.findIndex((entry) => entry.id === id);
    if (~index) {
      // Get the collection entry object from the collection and unmount it.
      const entry = this.collection[index];
      await entry.unmount(reReg);
      await lifecycleHook.call(this, "beforeDeregister", entry);
      await lifecycleHook.call(entry, "beforeDeregister", reReg);
      
      // Remove all the owned properties from the entry.
      Object.getOwnPropertyNames(entry).forEach((prop) => {
        if (prop != "beforeDeregister" && prop != "afterDeregister") {
          delete entry[prop];
        }
      });

      // Remove the entry from the collection.
      this.collection.splice(index, 1);

      await lifecycleHook.call(entry, "afterDeregister", reReg);
      await lifecycleHook.call(this, "afterDeregister", entry);
    }

    return this.collection;
  }

  isValidPlugin(plugin) {
    if (typeof plugin != "object") {
      console.error("Plugin is not a valid object!");
      return false;
    };

    if (!("name" in plugin) || typeof plugin.name !== "string") {
      console.error("Plugin requires a name!");
      return false;
    };

    if (!("mount" in plugin) || typeof plugin.mount !== "function") {
      console.error("Plugin requires a mount function!");
      return false;
    };

    if (!("unmount" in plugin) || typeof plugin.unmount !== "function") {
      console.error("Plugin requires a unmount function!");
      return false;
    };

    return true;
  }

  registerPlugin(plugin) {
    console.log("registerPlugin() for", this.module);
    if (this.isValidPlugin(plugin)) {
      this.plugins.push(plugin);
    }
  }

  deregisterPlugin(plugin) {
    console.log("deregisterPlugin() for", this.module);
    const index = this.plugins.findIndex((entry) => entry === plugin);
    if (~index) {
      this.plugins.splice(index, 1);
    }
  }

  async mountPlugins() {
    console.log("mountPlugins() for", this.module);
    for (const plugin of this.plugins) {
      plugin.mount(this);
    }
  }

  async unmountPlugins() {
    console.log("unmountPlugins() for", this.module);
    for (const plugin of this.plugins) {
      plugin.unmount(this);
    }
  }

  async mount(options = {}) {
    // Apply settings with passed options.
    this.applySettings(options);
    this.mountPlugins();
    await lifecycleHook.call(this, "beforeMount");
    // Get all the selector elements and register them.
    const els = document.querySelectorAll(this.settings.selector);
    for (const el of els) {
      await this.register(el);
    }
    await lifecycleHook.call(this, "afterMount");
    return this;
  }

  async unmount() {
    this.unmountPlugins();
    await lifecycleHook.call(this, "beforeUnmount");
    // Loop through the collection and deregister each entry.
    while (this.collection.length > 0) {
      await this.deregister(this.collection[0].id);
    }
    await lifecycleHook.call(this, "afterUnmount");
    return this;
  }
}
