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
      parent.on("opened", setupFocusTrap, this);
      parent.on("closed", teardownFocusTrap, this);
    },

    teardown({ parent }) {
      parent.off("opened", setupFocusTrap);
      parent.off("closed", teardownFocusTrap);
    },

    onCreateEntry({ entry }) {
      entry.focusTrap = new FocusTrap();
    }
  };

  function getValue(obj, ...args) {
    return (typeof obj === "function") ? obj(...args) : obj;
  }

  function setupFocusTrap(entry, plugin) {
    const contextObj = { plugin, parent: entry.parent, entry };
    if (getValue(plugin.settings.condition, contextObj)) {
      entry.focusTrap?.mount(entry.dialog);
    }
  }

  function teardownFocusTrap(entry, plugin) {
    const contextObj = { plugin, parent: entry.parent, entry };
    if (getValue(plugin.settings.condition, contextObj)) {
      entry.focusTrap?.unmount();
    }
  }

  return {...props, ...methods};
}
