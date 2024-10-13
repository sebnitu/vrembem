import { localStore, maybeRunMethod } from "../utilities";

const defaults = {
  watch: "state",
  keyPrefix: "VB:",
  key: null,
  condition: () => false,
  onChange: () => {}
};

export function localStorePlugin(options = {}) {
  const props = {
    name: "localStore",
    settings: {...defaults, ...options},
    store: null,
  };

  const methods = {
    mount(parent) {
      this.store = localStore(getKey(parent));
    },

    async onMount(entry) {
      // Guard if the property does not exist on entry.
      if (!entry?.[this.settings.watch]) return;

      // Store the initial property value.
      let _value = entry[this.settings.watch];

      // Define a getter and setter for the property.
      Object.defineProperty(entry, this.settings.watch, {
        get() {
          return _value;
        },
        set: (newValue) => {
          // Guard if value hasn't changed.
          if (_value === newValue) return;
          const oldValue = _value;
          _value = newValue;
          // Conditionally store the value in local storage.
          if (this.settings.condition(entry, newValue, oldValue)) {
            this.store.set(entry.id, _value);
          }
          // Run the on change callback.
          this.settings.onChange.call(this.store, entry, newValue, oldValue);
        },
      });

      // Attach the store object to entry for some reason.
      Object.defineProperty(entry, "store", {
        get() {
          return this.store.get(entry.id);
        }
      });

      // Run the apply method for the watched property if it exists.
      await maybeRunMethod.call(entry, getApplyMethodName());
    },

    onUnmount(entry) {
      // Remove the value from local storage when it's unmounted.
      props.store.set(entry.id, null);
    }
  };

  function getApplyMethodName() {
    return `apply${props.settings.watch.charAt(0).toUpperCase() + props.settings.watch.slice(1)}`;
  }

  function getKey(parent) {
    const prop = props.settings.watch.charAt(0).toUpperCase() + props.settings.watch.slice(1);
    const key = (props.settings.key || parent.module + prop);
    return props.settings.keyPrefix + key;
  }

  // Setup array with all lifecycle hooks.
  const hooks = [
    "beforeMount",
    "onMount",
    "beforeRegister",
    "afterRegister",
    "afterMount",
    "beforeUnmount",
    "onUnmount",
    "beforeDeregister",
    "afterDeregister",
    "afterUnmount",
  ];

  // Iterate over the hooks array.
  hooks.forEach((hookName) => {
    if (typeof props.settings[hookName] === "function") {
      // Check that the hook doesn't already exist in methods.
      // This is to prevent overriding core functionality.
      if (typeof methods[hookName] !== "function") {
        // Copy the method to the methods object.
        methods[hookName] = props.settings[hookName];
      } else {
        console.error(`${props.name} plugin already has "${hookName}" lifecycle hook defined!`);
      }
      // Delete the method from the settings object.
      delete props.settings[hookName];
    }
  });

  return {...props, ...methods};
}
