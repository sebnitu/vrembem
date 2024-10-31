import { createPluginObject } from "../helpers";

const defaults = {
  color1: "color: hsl(152deg 50% 50%)",
  color2: "color: hsl(214deg 50% 50%)",
  condition: true
};

export function debug(options = {}) {
  const props = {
    name: "debug",
    settings: {...defaults, ...options}
  };

  function log(name, args = []) {
    console.log(
      `%c📡 DEBUG: %c${name}`,
      props.settings.color1,
      props.settings.color2,
      ...args
    );
  }

  function getValue(obj, ...args) {
    return (typeof obj === "function") ? obj(...args) : obj;
  }

  const methods = {
    // Plugin setup/teardown methods.
    setup({ parent }) {
      log("Plugin > setup()", arguments);

      // Setup mount based event lifecycle listeners.

      parent.on("beforeMount", () => {
        log("Event > beforeMount()");
      });

      parent.on("createEntry", (entry, plugin) => {
        if (getValue(plugin.settings.condition, entry)) {
          const count = entry.parent.collection.length;
          log(`Event > createEntry() > [${count}] #${entry.id}`);
        }
      }, this);

      parent.on("registerEntry", (entry, plugin) => {
        if (getValue(plugin.settings.condition, entry)) {
          const count = entry.parent.collection.length;
          log(`Event > registerEntry() > [${count}] #${entry.id}`);
        }
      }, this);

      parent.on("afterMount", () => {
        log("Event > afterMount()");
      });

      // Setup unmount based event lifecycle listeners.

      parent.on("beforeUnmount", () => {
        log("Event > beforeUnmount()");
      });

      parent.on("destroyEntry", (entry) => {
        log(`Event > destroyEntry() > #${entry.id}`);
      });

      parent.on("deregisterEntry", (entry) => {
        log(`Event > deregisterEntry() > #${entry.id}`);
      });

      parent.on("afterUnmount", () => {
        log("Event > afterUnmount()");
      });
    },

    teardown() {
      log("Plugin > teardown()", arguments);
    },
    
    // Mount lifecycle hooks.

    beforeMount() {
      log("Hook > beforeMount()", arguments);
    },

    onCreateEntry({ parent, entry }) {
      if (getValue(this.settings.condition, entry)) {
        const count = parent.collection.length;
        log(`Hook > onCreateEntry() > [${count}] #${entry.id}`, arguments);
      }
    },

    onRegisterEntry({ parent, entry }) {
      if (getValue(this.settings.condition, entry)) {
        const count = parent.collection.length - 1;
        log(`Hook > onRegisterEntry() > [${count}] #${entry.id}`, arguments);
      }
    },

    afterMount() {
      log("Hook > afterMount()", arguments);
    },

    // Unmount lifecycle hooks.

    beforeUnmount() {
      log("Hook > beforeUnmount()", arguments);
    },

    onDestroyEntry({ parent }, id) {
      // if (getValue(this.settings.condition, entry)) {
      const count = parent.collection.length - 1;
      log(`Hook > onDestroyEntry() > [${count}] #${id}`, arguments);
      // }
    },
    
    onDeregisterEntry({ parent }, id) {
      // if (getValue(this.settings.condition, entry)) {
      const count = parent.collection.length;
      log(`Hook > onDeregisterEntry() > [${count}] #${id}`, arguments);
      // }
    },

    afterUnmount() {
      log("Hook > afterUnmount()", arguments);
    },
    
  };

  return createPluginObject(props, methods);
}
