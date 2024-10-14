import { maybeRunMethod } from "../utilities";

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

    if (this.find((item) => item.name === plugin.name)) {
      console.error(`Plugin with the name "${plugin.name}" is already being used!`);
      return false;
    };

    return true;
  }

  get(name) {
    return this.find((plugin) => plugin.name === name);
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
      await maybeRunMethod.call(this[index], "unmount", this.parent);
      this.splice(index, 1);
    }
  }
}