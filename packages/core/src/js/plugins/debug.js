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

  function log(name, args) {
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
    setup({ plugin, parent }) {
      log("mountPlugins()", arguments);

      // Setup event based lifecycle hooks.
      // parent.on("beforeMount", function () {
      //   log("on > beforeMount()", arguments);
      //   console.log("Event > this > ", this);
      // });

      // parent.on("mount", function (entry) {
      //   if (getValue(plugin.settings.condition, entry)) {
      //     const count = parent.collection.length;
      //     log(`on > mount() > [${count}] #${entry.id}`, arguments);
      //     console.log("Event > this > ", this);
      //   }
      // });

      // parent.on("register", function (entry) {
      //   if (getValue(plugin.settings.condition, entry)) {
      //     const count = parent.collection.length;
      //     log(`on > register() > [${count}] #${entry.id}`, arguments);
      //     console.log("Event > this > ", this);
      //   }
      // });

      // parent.on("afterMount", function () {
      //   log("on > afterMount()", arguments);
      //   console.log("Event > this > ", this);
      // });
    },

    teardown() {
      log("unmountPlugins()", arguments);
    },
    
    // Mount lifecycle hooks.
    beforeMount() {
      log("beforeMount()", arguments);
    },

    onMount({ parent, entry }) {
      if (getValue(this.settings.condition, entry)) {
        const count = parent.collection.length;
        log(`onMount() > [${count}] #${entry.id}`, arguments);
      }
    },

    onRegister({ parent, entry }) {
      if (getValue(this.settings.condition, entry)) {
        const count = parent.collection.length - 1;
        log(`onRegister() > [${count}] #${entry.id}`, arguments);
      }
    },

    afterMount() {
      log("afterMount()", arguments);
    },

    // Unmount lifecycle hooks.
    beforeUnmount() {
      log("beforeUnmount()", arguments);
    },

    onUnmount({ parent, entry }) {
      if (getValue(this.settings.condition, entry)) {
        const count = parent.collection.length - 1;
        log(`onUnmount() > [${count}] #${entry.id}`, arguments);
      }
    },
    
    onDeregister({ parent, entry }) {
      if (getValue(this.settings.condition, entry)) {
        const count = parent.collection.length;
        log(`onDeregister() > [${count}] #${entry.id}`, arguments);
      }
    },

    afterUnmount() {
      log("afterUnmount()", arguments);
    },
    
  };

  return createPluginObject(props, methods);
}
