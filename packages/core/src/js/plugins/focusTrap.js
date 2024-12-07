import { FocusTrap } from "../modules";

const defaults = {
  condition: true
};

export function focusTrap(options = {}) {
  const props = {
    name: "focusTrap",
    defaults,
    options
  };

  const methods = {
    setup({ parent }) {
      parent.on("opened", enableFocusTrap, this);
      parent.on("closed", disableFocusTrap, this);
    },

    teardown({ parent }) {
      parent.off("opened", enableFocusTrap);
      parent.off("closed", disableFocusTrap);
    },

    onCreateEntry({ entry }) {
      entry.focusTrap = new FocusTrap();
    }
  };

  function getValue(obj, ...args) {
    return typeof obj === "function" ? obj(...args) : obj;
  }

  function enableFocusTrap(entry, plugin) {
    const contextObj = { plugin, parent: entry.parent, entry };
    if (getValue(plugin.settings.condition, contextObj)) {
      entry.focusTrap?.on(entry.dialog);
    }
  }

  function disableFocusTrap(entry, plugin) {
    const contextObj = { plugin, parent: entry.parent, entry };
    if (getValue(plugin.settings.condition, contextObj)) {
      entry.focusTrap?.off();
    }
  }

  return { ...props, ...methods };
}
