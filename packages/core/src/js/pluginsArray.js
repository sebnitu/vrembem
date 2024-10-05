import { lifecycleHook } from "@vrembem/core";

export class pluginsArray extends Array {
  constructor(parent) {
    super();
    this.parent = parent;
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
    return true;
  }

  add(plugin) {
    if (Array.isArray(plugin)) {
      plugin.forEach((plugin) => this.add(plugin));
    } else if (this.isValidPlugin(plugin)) {
      this.push(plugin);
    }
  }

  async remove(name) {
    const index = this.findIndex((plugin) => plugin.name === name);
    if (~index) {
      await lifecycleHook.call(this[index], "unmount", this.parent);
      this.splice(index, 1);
    }
  }
}
