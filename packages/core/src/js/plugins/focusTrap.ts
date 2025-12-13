import { FocusTrap } from "../modules";
import type { Plugin } from "../modules/PluginsArray";
import type { Collection } from "../Collection";
import type { CollectionEntry } from "../CollectionEntry";

export type FocusTrapEntry = CollectionEntry<any> & {
  focusTrap: FocusTrap;
  dialog: HTMLElement;
};

export interface FocusTrapConfig {
  condition?:
    | boolean
    | ((context: {
        plugin: Plugin;
        parent: Collection<any>;
        entry: FocusTrapEntry;
      }) => boolean);
}

const defaults: Required<FocusTrapConfig> = {
  condition: true
};

export function focusTrap(
  options: FocusTrapConfig = {}
): Plugin<Collection<any>, FocusTrapEntry> {
  const props: Plugin<Collection<any>, FocusTrapEntry> = {
    name: "focusTrap",
    config: defaults,
    options
  };

  const methods: Partial<Plugin<Collection<any>, FocusTrapEntry>> = {
    setup(parent) {
      parent.on("opened", enableFocusTrap, this);
      parent.on("closed", disableFocusTrap, this);
    },

    teardown(parent) {
      parent.off("opened", enableFocusTrap);
      parent.off("closed", disableFocusTrap);
    },

    onCreateEntry({ entry }: { entry: FocusTrapEntry }) {
      entry.focusTrap = new FocusTrap();
    }
  };

  function getValue<T>(obj: T | ((...args: any[]) => T), ...args: any[]): T {
    return typeof obj === "function" ? (obj as Function)(...args) : obj;
  }

  function enableFocusTrap(entry: FocusTrapEntry, plugin: Plugin) {
    const contextObj = { plugin, parent: entry.parent, entry };
    if (entry.focusTrap && getValue(plugin.config.condition, contextObj)) {
      entry.focusTrap.on(entry.dialog);
    }
  }

  function disableFocusTrap(entry: FocusTrapEntry, plugin: Plugin) {
    const contextObj = { plugin, parent: entry.parent, entry };
    if (entry.focusTrap && getValue(plugin.config.condition, contextObj)) {
      entry.focusTrap.off();
    }
  }

  return { ...props, ...methods };
}
