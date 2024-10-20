import { createPluginObject } from "../helpers";

const defaults = {
  color1: "color: hsl(152deg 60% 40%)",
  color2: "color: hsl(152deg 60% 50%)",
  condition: true
};

export function debug(options = {}) {
  const props = {
    name: "debug",
    settings: {...defaults, ...options}
  };

  function log(string, args) {
    console.log(
      `%c📡 DEBUG: %c${string}`,
      props.settings.color1,
      props.settings.color2,
      ...args
    );
  }

  function getValue(obj, ...args) {
    return (typeof obj === "function") ? obj(...args) : obj;
  }

  const methods = {
    // Mount lifecycle hooks...
    mount() {
      log("mountPlugins()", arguments);
    },
    beforeMount() {
      log("beforeMount()", arguments);
    },
    onMount({ parent, entry }) {
      if (getValue(this.settings.condition, { parent, entry })) {
        const count = parent.collection.length;
        log(`onMount() > [${count}] #${entry.id}`, arguments);
      }
    },
    beforeRegister({ parent, entry }) {
      if (getValue(this.settings.condition, { parent, entry })) {
        const count = parent.collection.length;
        log(`beforeRegister() > [${count}] #${entry.id}`, arguments);
      }
    },
    afterRegister({ parent, entry }) {
      if (getValue(this.settings.condition, { parent, entry })) {
        const count = parent.collection.length - 1;
        log(`afterRegister() > [${count}] #${entry.id}`, arguments);
      }
    },
    afterMount() {
      log("afterMount()", arguments);
    },

    // Unmount lifecycle hooks...
    beforeUnmount() {
      log("beforeUnmount()", arguments);
    },
    onUnmount({ parent, entry }) {
      const count = parent.collection.length - 1;
      log(`onUnmount() > [${count}] #${entry.id}`, arguments);
    },
    beforeDeregister({ parent, entry }) {
      const count = parent.collection.length - 1;
      log(`beforeDeregister() > [${count}] #${entry.id}`, arguments);
    },
    afterDeregister({ parent, entry }) {
      const count = parent.collection.length;
      log(`afterDeregister() > [${count}] #${entry.id}`, arguments);
    },
    afterUnmount() {
      log("afterUnmount()", arguments);
    },
    unmount() {
      log("unmountPlugins()", arguments);
    }
  };

  return createPluginObject(props, methods);
}
