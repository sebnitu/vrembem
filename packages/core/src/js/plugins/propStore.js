import { localStore } from "../modules";

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
  condition: false,
  // The function to run whenever the value changes.
  onChange() {}
};

export function propStore(config = {}) {
  const props = {
    name: "propStore",
    defaults,
    config,
    store: null,
  };

  const methods = {
    setup({ parent }) {
      this.store = localStore(getKey.call(this, parent.module));
    },

    teardown({ parent }) {
      parent.collection.forEach((entry) => {
        removePropStore.call(this, entry);
      });
    },

    async onCreateEntry({ entry }) {
      await setupPropStore.call(this, entry);
    },

    onDestroyEntry({ entry }) {
      removePropStore.call(this, entry);
    }
  };

  async function setupPropStore(entry) {
    // Store the initial property value. Set to null if property doesn't exist.
    let _value = entry[this.settings.prop] || null;
    const contextObj = { plugin: this, parent: entry.parent, entry };

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
        const condition = getValue(this.settings.condition, contextObj, newValue, oldValue);
        if (condition) {
          this.store.set(entry.id, newValue);
        }
        // Run the on change callback.
        await this.settings.onChange(contextObj, newValue, oldValue);
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
    entry[this.settings.prop] = await getValue(this.settings.value, contextObj) || entry[this.settings.prop];
  }

  function getValue(obj, ...args) {
    return (typeof obj === "function") ? obj(...args) : obj;
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
    const prop = this.settings.prop.charAt(0).toUpperCase() + this.settings.prop.slice(1);
    const key = (this.settings.key || moduleName + prop);
    return this.settings.keyPrefix + key;
  }

  return {...props, ...methods};
}
