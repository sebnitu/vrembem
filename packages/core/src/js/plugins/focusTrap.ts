import { getValue } from "../utilities";
import { FocusTrap } from "../modules";
import type { Plugin } from "../modules/PluginArray";
import type { CollectionEntry } from "../CollectionEntry";

export type FocusTrapEntry = CollectionEntry & {
  focusTrap: FocusTrap;
  dialog: HTMLElement;
};

export interface FocusTrapConfig<TEntry = FocusTrapEntry> {
  name?: string;
  enableEvent?: string;
  disableEvent?: string;
  condition?:
    | boolean
    | ((context: { plugin: Plugin; parent: any; entry: TEntry }) => boolean);
}

const defaults: Partial<FocusTrapConfig> = {
  enableEvent: "opened",
  disableEvent: "closed",
  condition: true
};

export function focusTrap(
  options: FocusTrapConfig = {}
): Plugin<FocusTrapEntry> {
  const props: Plugin<FocusTrapEntry> = {
    name: "focusTrap",
    config: defaults,
    options
  };

  const methods: Partial<Plugin<FocusTrapEntry>> = {
    setup(parent) {
      parent.on(this.config.enableEvent, enableFocusTrap, this);
      parent.on(this.config.disableEvent, disableFocusTrap, this);
    },

    teardown(parent) {
      parent.off(this.config.enableEvent, enableFocusTrap);
      parent.off(this.config.disableEvent, disableFocusTrap);
    },

    onCreateEntry({ entry }: { entry: FocusTrapEntry }) {
      entry.focusTrap = new FocusTrap();
    }
  };

  function enableFocusTrap(entry: FocusTrapEntry, plugin: Plugin) {
    const context = { plugin, parent: entry.parent, entry };
    if (entry.focusTrap && getValue(plugin.config.condition, context)) {
      entry.focusTrap.on(entry.dialog);
    }
  }

  function disableFocusTrap(entry: FocusTrapEntry, plugin: Plugin) {
    const context = { plugin, parent: entry.parent, entry };
    if (entry.focusTrap && getValue(plugin.config.condition, context)) {
      entry.focusTrap.off();
    }
  }

  return { ...props, ...methods };
}
