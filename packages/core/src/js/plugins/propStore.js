import { localStore, maybeRunMethod } from "../utilities";
import { createPluginObject } from "../helpers";

const defaults = {
  prop: "state",
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

    async onMount(entry) {
      // TODO: Allow passing a prop path, e.g: "parent.stack.value"
      // Guard if the property does not exist on entry.
      if (!entry?.[this.settings.prop]) return;

      // Store the initial property value.
      let _value = entry[this.settings.prop];

      // Define a getter and setter for the property.
      Object.defineProperty(entry, this.settings.prop, {
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

      // Attach the store object on entry for internal use.
      Object.defineProperty(entry, "store", {
        get: () => {
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
    return `apply${props.settings.prop.charAt(0).toUpperCase() + props.settings.prop.slice(1)}`;
  }

  function getKey(parent) {
    const prop = props.settings.prop.charAt(0).toUpperCase() + props.settings.prop.slice(1);
    const key = (props.settings.key || parent.module + prop);
    return props.settings.keyPrefix + key;
  }

  return createPluginObject(props, methods);
}
