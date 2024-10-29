import { maybeRunMethod } from "./utilities";
import { pluginsArray } from "./helpers";
import { CollectionEntry } from "./CollectionEntry";

export class Collection {
  constructor(options = {}) {
    this.module = this.constructor.name;
    this.collection = [];
    this.plugins = new pluginsArray(this);
    this.events = {};
    this.settings = {
      dataConfig: "config",
      customProps: [],
    };
    this.applySettings(options);
  }

  on(event, listener, ...args) {
    // Initialize the event if it doesn't exist.
    if (!this.events[event]) {
      this.events[event] = [];
    }

    // Check if this listener already exists to prevent duplicate listeners.
    const listenerExists = this.events[event].some(
      (entry) => entry.listener === listener
    );
    
    // Add listener to the events array. 
    if (!listenerExists) {
      this.events[event].push({ listener, args });
    }
  }

  off(event, listenerRef) {
    // Guard incase the event doesn't exist.
    if (!this.events[event]) return;

    // Filter out the listener from the event array.
    this.events[event] = this.events[event].filter(
      (entry) => entry.listener !== listenerRef
    );
  }

  async emit(event, data) {
    // Guard incase the event doesn't exist.
    if (!this.events[event]) return;

    // Run all the listeners for the emitted event.
    for (const { listener, args } of this.events[event]) {
      // Await each listener in case it's a Promise
      await listener(data, ...args);
    }
  }

  get(value, key = "id") {
    return this.collection.find((entry) => entry[key] === value);
  }

  applySettings(options) {
    return Object.assign(this.settings, this.processOptions(options));
  }

  processOptions(options) {
    this.plugins.add(options?.plugins || []);
    delete options.plugins;
    return options;
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

    // Add the entry to the collection.
    this.collection.push(entry);

    // afterRegister lifecycle hooks.
    await maybeRunMethod(this, "onRegister", entry);
    await maybeRunMethod(entry, "onRegister");
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "onRegister", { plugin, parent: this, entry});
    }
    // Emit the register event.
    await this.emit("register", entry);

    return entry;
  }

  async deregister(id, reReg = false) {
    const index = this.collection.findIndex((entry) => entry.id === id);
    if (~index) {
      // Get the collection entry object from the collection and unmount it.
      const entry = this.collection[index];
      await entry.unmount(reReg);

      // Remove all the owned properties from the entry.
      Object.getOwnPropertyNames(entry).forEach((prop) => {
        if (prop != "onDeregister") {
          delete entry[prop];
        }
      });

      // Remove the entry from the collection.
      this.collection.splice(index, 1);

      // onDeregister lifecycle hooks.
      await maybeRunMethod(this, "onDeregister", entry, reReg);
      await maybeRunMethod(entry, "onDeregister", reReg);
      for (const plugin of this.plugins) {
        await maybeRunMethod(plugin, "onDeregister", { plugin, parent: this, entry}, reReg);
      }
      // Emit the deregister event.
      await this.emit("deregister", entry, reReg);
    }

    return this.collection;
  }

  async mount(options = {}) {
    // Apply settings with passed options.
    this.applySettings(options);

    // Mount plugins.
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "setup", { plugin, parent: this});
    }

    // beforeMount lifecycle hooks.
    
    await maybeRunMethod(this, "beforeMount");
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "beforeMount", { plugin, parent: this});
    }
    // Emit the beforeMount event.
    await this.emit("beforeMount");

    // Get all the selector elements and register them.
    const els = document.querySelectorAll(this.settings.selector);
    for (const el of els) {
      await this.register(el);
    }

    // afterMount lifecycle hooks.
    await maybeRunMethod(this, "afterMount");
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "afterMount", { plugin, parent: this});
    }
    // Emit the afterMount event.
    await this.emit("afterMount");

    return this;
  }

  async unmount() {
    // beforeUnmount lifecycle hooks.
    await maybeRunMethod(this, "beforeUnmount");
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "beforeUnmount", { plugin, parent: this});
    }
    // Emit the beforeUnmount event.
    await this.emit("beforeUnmount");

    // Loop through the collection and deregister each entry.
    while (this.collection.length > 0) {
      await this.deregister(this.collection[0].id);
    }

    // afterUnmount lifecycle hooks.
    await maybeRunMethod(this, "afterUnmount");
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "afterUnmount", { plugin, parent: this});
    }
    // Emit the mount event.
    await this.emit("afterUnmount");

    // Unmount plugins.
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "teardown", { plugin, parent: this});
    }
    
    return this;
  }
}
