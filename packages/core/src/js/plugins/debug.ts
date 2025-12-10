import type { Plugin } from "../modules/PluginsArray";

const defaults = {
  condition: true
};

const colors = {
  primary: "hsl(152deg 60% 50%)",
  secondary: "hsl(214deg 50% 50%)",
  neutral: "hsl(214deg 20% 50%)",
  important: "hsl(0deg 80% 50%)"
};

export function debug(options: Record<string, any> = {}): Plugin {
  const props = {
    name: "debug",
    defaults,
    options
  };

  function log(
    name: string,
    args: any[] = [],
    colorKeys: Array<keyof typeof colors> = ["primary", "secondary"]
  ) {
    const colorStyles = colorKeys.map((key) => `color: ${colors[key]}`);
    console.log(`%c📡 DEBUG: %c${name}`, ...colorStyles, ...args);
  }

  function getValue<T>(obj: T | ((...args: any[]) => T), ...args: any[]): T {
    return typeof obj === "function" ? (obj as Function)(...args) : obj;
  }

  // Create event listener references
  const refs = {
    beforeMountRef: log.bind(null, "Event > beforeMount()"),
    afterMountRef: log.bind(null, "Event > afterMount()"),
    beforeUnmountRef: log.bind(
      null,
      "Event > beforeUnmount()",
      [],
      ["important", "neutral"]
    ),
    afterUnmountRef: log.bind(
      null,
      "Event > afterUnmount()",
      [],
      ["important", "neutral"]
    ),
    createEntryRef: (entry: any, { parent, plugin }: any) => {
      if (getValue(plugin.config.condition, entry)) {
        const count = parent.collection.length;
        log(`Event > createEntry() > [${count}] #${entry.id}`);
      }
    },
    registerEntryRef: (entry: any, { parent, plugin }: any) => {
      if (getValue(plugin.config.condition, entry)) {
        const count = parent.collection.length;
        log(`Event > registerEntry() > [${count}] #${entry.id}`);
      }
    },
    destroyEntryRef: (entry: any, { parent, plugin }: any) => {
      if (getValue(plugin.config.condition, entry)) {
        const count = parent.collection.length;
        log(
          `Event > destroyEntry() > [${count}] #${entry.id}`,
          [],
          ["important", "neutral"]
        );
      }
    },
    deregisterEntryRef: (entry: any, { parent, plugin }: any) => {
      if (getValue(plugin.config.condition, entry)) {
        const count = parent.collection.length;
        log(
          `Event > deregisterEntry() > [${count}]`,
          [],
          ["important", "neutral"]
        );
      }
    }
  };

  const methods = {
    // Plugin setup/teardown methods
    setup(this: any, { parent }: any) {
      log("Plugin > setup()", Array.from(arguments), ["secondary", "neutral"]);

      // Mount event lifecycle hooks
      parent.on("beforeMount", refs.beforeMountRef);
      parent.on("createEntry", refs.createEntryRef, { parent, plugin: this });
      parent.on("registerEntry", refs.registerEntryRef, {
        parent,
        plugin: this
      });
      parent.on("afterMount", refs.afterMountRef);

      // Unmount event lifecycle hooks
      parent.on("beforeUnmount", refs.beforeUnmountRef);
      parent.on("destroyEntry", refs.destroyEntryRef, { parent, plugin: this });
      parent.on("deregisterEntry", refs.deregisterEntryRef, {
        parent,
        plugin: this
      });
      parent.on("afterUnmount", refs.afterUnmountRef);
    },

    teardown(this: any, { parent }: any) {
      log("Plugin > teardown()", Array.from(arguments), [
        "secondary",
        "neutral"
      ]);

      // Mount event lifecycle hooks
      parent.off("beforeMount", refs.beforeMountRef);
      parent.off("createEntry", refs.createEntryRef);
      parent.off("registerEntry", refs.registerEntryRef);
      parent.off("afterMount", refs.afterMountRef);

      // Unmount event lifecycle hooks
      parent.off("beforeUnmount", refs.beforeUnmountRef);
      parent.off("destroyEntry", refs.destroyEntryRef);
      parent.off("deregisterEntry", refs.deregisterEntryRef);
      parent.off("afterUnmount", refs.afterUnmountRef);
    },

    // Mount lifecycle hooks
    beforeMount() {
      log("Hook > beforeMount()", Array.from(arguments));
    },
    onCreateEntry(this: any, { parent, entry }: any) {
      if (getValue(this.config.condition, entry)) {
        const count = parent.collection.length;
        log(
          `Hook > onCreateEntry() > [${count}] #${entry.id}`,
          Array.from(arguments)
        );
      }
    },
    onRegisterEntry(this: any, { parent, entry }: any) {
      if (getValue(this.config.condition, entry)) {
        const count = parent.collection.length - 1;
        log(
          `Hook > onRegisterEntry() > [${count}] #${entry.id}`,
          Array.from(arguments)
        );
      }
    },
    afterMount() {
      log("Hook > afterMount()", Array.from(arguments));
    },

    // Unmount lifecycle hooks
    beforeUnmount() {
      log("Hook > beforeUnmount()", Array.from(arguments), [
        "important",
        "neutral"
      ]);
    },
    onDestroyEntry(this: any, { parent, entry }: any) {
      if (getValue(this.config.condition, entry)) {
        const count = parent.collection.length - 1;
        log(
          `Hook > onDestroyEntry() > [${count}] #${entry.id}`,
          Array.from(arguments),
          ["important", "neutral"]
        );
      }
    },
    onDeregisterEntry(this: any, { parent, entry }: any) {
      if (getValue(this.config.condition, entry)) {
        const count = parent.collection.length;
        log(`Hook > onDeregisterEntry() > [${count}]`, Array.from(arguments), [
          "important",
          "neutral"
        ]);
      }
    },
    afterUnmount() {
      log("Hook > afterUnmount()", Array.from(arguments), [
        "important",
        "neutral"
      ]);
    }
  };

  return { ...props, ...methods };
}
