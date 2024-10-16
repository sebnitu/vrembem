import { localStore } from "../utilities";
import { createPluginObject } from "../helpers";

const defaults = {
  // The property on entry objects to watch.
  prop: "state",
  // The default value or a function to compute the initial value.
  value: null,
  // The local storage key prefix.
  keyPrefix: "VB:",
  // The local storage key to use. If not provided, module name and prop value
  // will be used e.g: "VB:ModalState".
  key: null,
  // Condition to determine whether or not to store the value in local storage.
  condition: () => false,
  // The function to run whenever the value changes.
  onChange() {}
};

export function propStore(options = {}) {
  const props = {
    name: "propStore",
    settings: {...defaults, ...options},
    store: null,
  };

  const methods = {
    mount(parent) {
      this.store = localStore(getKey(parent.module));
    },

    unmount(context) {
      context.collection.forEach((entry) => {
        this.onUnmount(entry);
      });
    },

    async onMount(entry) {
      await setupPropStore.call(this, entry);
    },

    onUnmount(entry) {
      removePropStore.call(this, entry);
    }
  };

  async function setupPropStore(entry) {
    // Store the initial property value. Set to null if property doesn't exist.
    let _value = entry[this.settings.prop] || null;

    // Define a getter and setter for the property.
    Object.defineProperty(entry, this.settings.prop, {
      configurable: true,
      get() {
        return _value;
      },
      set: async (newValue) => {
        // Guard if value hasn't changed.
        if (_value === newValue) return;
        const oldValue = _value;
        _value = newValue;
        // Conditionally store the value in local storage.
        if (this.settings.condition(entry, newValue, oldValue)) {
          this.store.set(entry.id, _value);
        }
        // Run the on change callback.
        await this.settings.onChange.call(this, entry, newValue, oldValue);
      },
    });

    // Create the store object for binding entry to its local store value.
    Object.defineProperty(entry, "store", {
      configurable: true,
      get: () => {
        return this.store.get(entry.id);
      },
      set: (value) => {
        entry[this.settings.prop] = value;
      },
    });

    // Conditionally set the initial value. Must be a truthy value.
    entry[this.settings.prop] = (typeof this.settings.value === "function") ?
      this.settings.value.call(this, entry) || entry[this.settings.prop] :
      this.settings.value || entry[this.settings.prop];
  }

  async function removePropStore(entry) {
    // Remove the getter/setters and restore properties to its current value.
    const currentValue = entry[this.settings.prop];
    delete entry[this.settings.prop];
    entry[this.settings.prop] = currentValue;

    // Remove value from local store.
    this.store.set(entry.id, null);
  }

  function getKey(moduleName) {
    const prop = props.settings.prop.charAt(0).toUpperCase() + props.settings.prop.slice(1);
    const key = (props.settings.key || moduleName + prop);
    return props.settings.keyPrefix + key;
  }

  return createPluginObject(props, methods);
}
