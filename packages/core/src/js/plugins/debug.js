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
    defaults,
    options
  };

  function log(name, args = [], colorKeys = ["primary", "secondary"]) {
    const colorStyles = colorKeys.map((key) => `color: ${colors[key]}`);
    console.log(
      `%c📡 DEBUG: %c${name}`,
      ...colorStyles,
      ...args
    );
  }

  function getValue(obj, ...args) {
    return (typeof obj === "function") ? obj(...args) : obj;
  }

  // Create event listener references.
  const refs = {
    beforeMountRef: log.bind(null, "Event > beforeMount()"),
    afterMountRef: log.bind(null, "Event > afterMount()"),
    beforeUnmountRef: log.bind(null, "Event > beforeUnmount()", [], ["important", "neutral"]),
    afterUnmountRef: log.bind(null, "Event > afterUnmount()", [], ["important", "neutral"]),
    createEntryRef: (entry, { parent, plugin }) => {
      if (getValue(plugin.settings.condition, entry)) {
        const count = parent.collection.length;
        log(`Event > createEntry() > [${count}] #${entry.id}`);
      }
    },
    registerEntryRef: (entry, { parent, plugin }) => {
      if (getValue(plugin.settings.condition, entry)) {
        const count = parent.collection.length;
        log(`Event > registerEntry() > [${count}] #${entry.id}`);
      }
    },
    destroyEntryRef: (entry, { parent, plugin }) => {
      if (getValue(plugin.settings.condition, entry)) {
        const count = parent.collection.length;
        log(`Event > destroyEntry() > [${count}] #${entry.id}`, [], ["important", "neutral"]);
      }
    },
    deregisterEntryRef: (entry, { parent, plugin }) => {
      if (getValue(plugin.settings.condition, entry)) {
        const count = parent.collection.length;
        log(`Event > deregisterEntry() > [${count}] #${entry.id}`, [], ["important", "neutral"]);
      }
    }
  };

  const methods = {
    // Plugin setup/teardown methods.
    setup({ parent }) {
      log("Plugin > setup()", arguments, ["secondary", "neutral"]);
      // Mount event lifecycle hooks.
      parent.on("beforeMount", refs.beforeMountRef);
      parent.on("createEntry", refs.createEntryRef, { parent, plugin: this });
      parent.on("registerEntry", refs.registerEntryRef, { parent, plugin: this });
      parent.on("afterMount", refs.afterMountRef);
      // Unmount event lifecycle hooks.
      parent.on("beforeUnmount", refs.beforeUnmountRef);
      parent.on("destroyEntry", refs.destroyEntryRef, { parent, plugin: this });
      parent.on("deregisterEntry", refs.deregisterEntryRef, { parent, plugin: this });
      parent.on("afterUnmount", refs.afterUnmountRef);
    },

    teardown({ parent }) {
      log("Plugin > teardown()", arguments, ["secondary", "neutral"]);
      // Mount event lifecycle hooks.
      parent.off("beforeMount", refs.beforeMountRef);
      parent.off("createEntry", refs.createEntryRef);
      parent.off("registerEntry", refs.registerEntryRef);
      parent.off("afterMount", refs.afterMountRef);
      // Unmount event lifecycle hooks.
      parent.off("beforeUnmount", refs.beforeUnmountRef);
      parent.off("destroyEntry", refs.destroyEntryRef);
      parent.off("deregisterEntry", refs.deregisterEntryRef);
      parent.off("afterUnmount", refs.afterUnmountRef);
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

  return {...props, ...methods};
}
