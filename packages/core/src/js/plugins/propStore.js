import { localStore, maybeRunMethod } from "../utilities";
import { createPluginObject } from "../helpers";

// TODO: Missing test coverage 32-33,82-84

const defaults = {
  prop: "state",
  value: undefined,
  ref: null,
  keyPrefix: "VB:",
  key: null,
  condition: () => false,
  onChange: () => {}
};

export function propStore(options = {}) {
  const props = {
    name: "propStore",
    settings: {...defaults, ...options},
    store: null,
  };

  const methods = {
    mount(parent) {
      this.store = localStore(getKey(parent));
    },

    // TODO: Add unmount and onUnmount methods for cleanup.

    async onMount(entry) {     
      // TODO: Move onMount logic into function to keep hooks cleaner. 
      // Get the properties value.
      let prop = this.settings.prop.split(".").reduce((entry, key) => entry?.[key], entry);

      // If value doesn't exist and a fallback value is provided, set the property.
      if (prop === undefined && this.settings.value !== undefined) {
        prop = this.settings.value;
      }
      
      // Guard if the property does not exist on entry.
      if (!prop) return;

      // Store the initial property value.
      let _value = prop;

      // Define a getter and setter for the property.
      defineNestedProperty(entry, this.settings.prop, {
        configurable: true,
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
      
      // Attach the store get/set reference as an entry property.
      if (this.settings.ref) {
        let _refValue = entry[this.settings.ref];
        defineNestedProperty(entry, this.settings.ref, {
          configurable: true,
          get: () => {
            return this.store.get(entry.id) || _refValue;
          },
          set: (newValue) => {
            this.store.set(entry.id, newValue);
          }
        });
      }

      // Run the apply method for the watched property if it exists.
      await maybeRunMethod.call(entry, getApplyMethodName());
    }
  };

  function defineNestedProperty(obj, path, descriptor) {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => {
      // Create the nested object if it doesn't exist.
      if (!obj[key]) { obj[key] = {}; }
      return obj[key];
    }, obj);
    Object.defineProperty(target, lastKey, descriptor);
  }

  function getApplyMethodName() {
    return `apply${props.settings.prop.charAt(0).toUpperCase() + props.settings.prop.slice(1)}`;
  }

  function getKey(parent) {
    const prop = props.settings.prop.split(".").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("");
    const key = (props.settings.key || parent.module + prop);
    return props.settings.keyPrefix + key;
  }

  return createPluginObject(props, methods);
}
