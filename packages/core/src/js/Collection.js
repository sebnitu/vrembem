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

  async emit(event, data, ...emitArgs) {
    // Guard incase the event doesn't exist.
    if (!this.events[event]) return;

    // Run all the listeners for the emitted event.
    for (const { listener, args } of this.events[event]) {
      // Await each listener in case it's a Promise
      await listener(data, ...emitArgs, ...args);
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

    // beforeRegister lifecycle hooks.
    await maybeRunMethod(this, "beforeRegister", { parent: this, entry});
    await maybeRunMethod(entry, "beforeRegister", { parent: this, entry});
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "beforeRegister", { plugin, parent: this, entry});
    }
    // Emit the beforeRegister event.
    await this.emit("beforeRegister", { parent: this, entry });

    // Add the entry to the collection.
    this.collection.push(entry);

    // afterRegister lifecycle hooks.
    await maybeRunMethod(this, "afterRegister", { parent: this, entry});
    await maybeRunMethod(entry, "afterRegister", { parent: this, entry});
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "afterRegister", { plugin, parent: this, entry});
    }
    // Emit the afterRegister event.
    await this.emit("afterRegister", { parent: this, entry });

    return entry;
  }

  async deregister(id, reReg = false) {
    const index = this.collection.findIndex((entry) => entry.id === id);
    if (~index) {
      // Get the collection entry object from the collection and unmount it.
      const entry = this.collection[index];
      await entry.unmount(reReg);

      // beforeDeregister lifecycle hooks.
      await maybeRunMethod(this, "beforeDeregister", { parent: this, entry}, reReg);
      await maybeRunMethod(entry, "beforeDeregister", { parent: this, entry}, reReg);
      for (const plugin of this.plugins) {
        await maybeRunMethod(plugin, "beforeDeregister", { plugin, parent: this, entry}, reReg);
      }
      // Emit the beforeDeregister event.
      await this.emit("beforeDeregister", { parent: this, entry}, reReg);

      // Remove all the owned properties from the entry.
      Object.getOwnPropertyNames(entry).forEach((prop) => {
        if (prop != "beforeDeregister" && prop != "afterDeregister") {
          delete entry[prop];
        }
      });

      // Remove the entry from the collection.
      this.collection.splice(index, 1);

      // afterDeregister lifecycle hooks.
      await maybeRunMethod(this, "afterDeregister", { parent: this, entry}, reReg);
      await maybeRunMethod(entry, "afterDeregister", { parent: this, entry}, reReg);
      for (const plugin of this.plugins) {
        await maybeRunMethod(plugin, "afterDeregister", { plugin, parent: this, entry}, reReg);
      }
      // Emit the afterDeregister event.
      await this.emit("afterDeregister", { parent: this, entry}, reReg);
    }

    return this.collection;
  }

  async mount(options = {}) {
    // Apply settings with passed options.
    this.applySettings(options);

    // Mount plugins.
    for (const plugin of this.plugins) {
      await maybeRunMethod(plugin, "mount", { plugin, parent: this});
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
      await maybeRunMethod(plugin, "unmount", { plugin, parent: this});
    }
    
    return this;
  }
}
