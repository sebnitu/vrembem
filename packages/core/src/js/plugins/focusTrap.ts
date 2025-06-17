import { FocusTrap } from "../modules";
import type { Plugin } from "../modules/PluginsArray";

export interface FocusTrapConfig {
  condition?:
    | boolean
    | ((context: { plugin: Plugin; parent: any; entry: any }) => boolean);
}

interface FocusTrapEntry {
  dialog?: HTMLElement;
  parent?: any;
  focusTrap?: FocusTrap;
  [key: string]: any;
}

interface FocusTrapPluginContext {
  parent: {
    on: (event: string, handler: Function, context?: any) => void;
    off: (event: string, handler: Function) => void;
  };
}

const defaults: Required<FocusTrapConfig> = {
  condition: true
};

export function focusTrap(options: FocusTrapConfig = {}): Plugin {
  const props = {
    name: "focusTrap",
    defaults,
    options
  };

  const methods = {
    setup(this: any, { parent }: FocusTrapPluginContext) {
      parent.on("opened", enableFocusTrap, this);
      parent.on("closed", disableFocusTrap, this);
    },

    teardown(this: any, { parent }: FocusTrapPluginContext) {
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

  function enableFocusTrap(entry: FocusTrapEntry, plugin: any) {
    const contextObj = { plugin, parent: entry.parent, entry };
    if (getValue(plugin.settings.condition, contextObj)) {
      entry.focusTrap?.on(entry.dialog);
    }
  }

  function disableFocusTrap(entry: FocusTrapEntry, plugin: any) {
    const contextObj = { plugin, parent: entry.parent, entry };
    if (getValue(plugin.settings.condition, contextObj)) {
      entry.focusTrap?.off();
    }
  }

  return { ...props, ...methods };
}
