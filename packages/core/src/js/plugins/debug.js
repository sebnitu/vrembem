import { createPluginObject } from "../helpers";

const defaults = {
  condition: true
};

const colors = {
  primary: "hsl(152deg 60% 50%)",
  secondary: "hsl(214deg 50% 50%)",
  neutral: "hsl(214deg 20% 50%)",
  important: "hsl(0deg 80% 50%)"
};

export function debug(options = {}) {
  const props = {
    name: "debug",
    settings: {...defaults, ...options}
  };

  function log(name, args = [], colorKeys = ["primary", "secondary"]) {
    const colorStyles = colorKeys.map((key) => `color: ${colors[key] || colors.primary}`);
    console.log(
      `%c📡 DEBUG: %c${name}`,
      ...colorStyles,
      ...args
    );
  }

  function getValue(obj, ...args) {
    return (typeof obj === "function") ? obj(...args) : obj;
  }

  const methods = {
    // Plugin setup/teardown methods.
    setup({ parent }) {
      log("Plugin > setup()", arguments, ["secondary", "neutral"]);

      // Setup mount based event lifecycle listeners.

      parent.on("beforeMount", () => {
        log("Event > beforeMount()");
      });

      parent.on("createEntry", (entry) => {
        if (getValue(this.settings.condition, entry)) {
          const count = parent.collection.length;
          log(`Event > createEntry() > [${count}] #${entry.id}`);
        }
      });

      parent.on("registerEntry", (entry) => {
        if (getValue(this.settings.condition, entry)) {
          const count = parent.collection.length;
          log(`Event > registerEntry() > [${count}] #${entry.id}`);
        }
      });

      parent.on("afterMount", () => {
        log("Event > afterMount()");
      });

      // Setup unmount based event lifecycle listeners.

      parent.on("beforeUnmount", () => {
        log("Event > beforeUnmount()", [], ["important", "neutral"]);
      });

      parent.on("destroyEntry", (entry) => {
        if (getValue(this.settings.condition, entry)) {
          const count = parent.collection.length;
          log(`Event > destroyEntry() > [${count}] #${entry.id}`, [], ["important", "neutral"]);
        }
      });

      parent.on("deregisterEntry", (entry) => {
        if (getValue(this.settings.condition, entry)) {
          const count = parent.collection.length;
          log(`Event > deregisterEntry() > [${count}] #${entry.id}`, [], ["important", "neutral"]);
        }
      });

      parent.on("afterUnmount", () => {
        log("Event > afterUnmount()", [], ["important", "neutral"]);
      });
    },

    teardown() {
      log("Plugin > teardown()", arguments, ["secondary", "neutral"]);
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
      log("Hook > beforeUnmount()", arguments, ["important", "neutral"]);
    },

    onDestroyEntry({ parent, entry }) {
      if (getValue(this.settings.condition, entry)) {
        const count = parent.collection.length - 1;
        log(`Hook > onDestroyEntry() > [${count}] #${entry.id}`, arguments, ["important", "neutral"]);
      }
    },
    
    onDeregisterEntry({ parent, entry }) {
      if (getValue(this.settings.condition, entry)) {
        const count = parent.collection.length;
        log(`Hook > onDeregisterEntry() > [${count}] #${entry.id}`, arguments, ["important", "neutral"]);
      }
    },

    afterUnmount() {
      log("Hook > afterUnmount()", arguments, ["important", "neutral"]);
    },
    
  };

  return createPluginObject(props, methods);
}
