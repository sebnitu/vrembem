import { getValue } from "../utilities";
import type { Plugin } from "../modules/PluginArray";
import type { Collection } from "../Collection";
import type { CollectionEntry } from "../CollectionEntry";

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
  const props: Plugin = {
    name: "debug",
    config: defaults,
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

  // Create event listener references
  const refs = {
    beforeMountRef: log.bind(
      null,
      "Event > beforeMount()",
      [],
      ["primary", "secondary"]
    ),
    afterMountRef: log.bind(
      null,
      "Event > afterMount()",
      [],
      ["primary", "secondary"]
    ),
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
    createEntryRef: (
      {
        parent,
        entry
      }: { parent: Collection<any>; entry: CollectionEntry<any> },
      plugin: Plugin
    ) => {
      if (getValue(plugin.config.condition, entry)) {
        const count = parent.collection.length;
        log(`Event > createEntry() > [${count}] #${entry.id}`);
      }
    },
    registerEntryRef: (
      {
        parent,
        entry
      }: { parent: Collection<any>; entry: CollectionEntry<any> },
      plugin: Plugin
    ) => {
      if (getValue(plugin.config.condition, entry)) {
        const count = parent.collection.length;
        log(`Event > registerEntry() > [${count}] #${entry.id}`);
      }
    },
    destroyEntryRef: (
      {
        parent,
        entry
      }: { parent: Collection<any>; entry: CollectionEntry<any> },
      plugin: Plugin
    ) => {
      if (getValue(plugin.config.condition, entry)) {
        const count = parent.collection.length;
        log(
          `Event > destroyEntry() > [${count}] #${entry.id}`,
          [],
          ["important", "neutral"]
        );
      }
    },
    deregisterEntryRef: (
      {
        parent,
        entry
      }: { parent: Collection<any>; entry: CollectionEntry<any> },
      plugin: Plugin
    ) => {
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

  const methods: Partial<Plugin> = {
    // Plugin setup/teardown methods
    setup(parent) {
      log("Plugin > setup()", Array.from(arguments), ["secondary", "neutral"]);

      // Mount event lifecycle hooks
      parent.on("beforeMount", refs.beforeMountRef);
      parent.on("createEntry", refs.createEntryRef, this);
      parent.on("registerEntry", refs.registerEntryRef, this);
      parent.on("afterMount", refs.afterMountRef);

      // Unmount event lifecycle hooks
      parent.on("beforeUnmount", refs.beforeUnmountRef);
      parent.on("destroyEntry", refs.destroyEntryRef, this);
      parent.on("deregisterEntry", refs.deregisterEntryRef, this);
      parent.on("afterUnmount", refs.afterUnmountRef);
    },

    teardown(parent) {
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
    onCreateEntry({ parent, entry }) {
      if (getValue(this.config.condition, entry)) {
        const count = parent.collection.length;
        log(
          `Hook > onCreateEntry() > [${count}] #${entry.id}`,
          Array.from(arguments)
        );
      }
    },
    onRegisterEntry({ parent, entry }) {
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
    onDestroyEntry({ parent, entry }) {
      if (getValue(this.config.condition, entry)) {
        const count = parent.collection.length - 1;
        log(
          `Hook > onDestroyEntry() > [${count}] #${entry.id}`,
          Array.from(arguments),
          ["important", "neutral"]
        );
      }
    },
    onDeregisterEntry({ parent, entry }) {
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
