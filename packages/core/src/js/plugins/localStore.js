import { localStore } from "../utilities";

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
    store: null, // TODO: Why is this value not updated in console on mount?
  };

  const methods = {
    mount(parent) {
      props.store = localStore(getKey(parent));
    },

    async onMount(entry) {
      // Guard if the property does not exist on entry.
      if (!entry?.[props.settings.watch]) return;

      // Store the initial property value.
      let _value = entry[props.settings.watch];

      // Attach the store object to entry for some reason.
      // entry.store = props.store;
      // get store() {
      //   return this.parent.store.get(this.id);
      // }
      Object.defineProperty(entry, "store", {
        get() {
          return props.store.get(entry.id);
        }
      });

      // TODO: Is this the best way to restore the previous state?
      // I think it's too coupled with drawer logic in this way.
      // Restore the saved state if it exists.
      const restore = props.store.get(entry.id);
      if (restore) {
        if (restore === "opened") {
          await entry.open(false, false);
        } else if (restore === "closed") {
          await entry.close(false, false);
        }
      }

      // Define a getter and setter for the property.
      Object.defineProperty(entry, props.settings.watch, {
        get() {
          return _value;
        },
        set(newValue) {
          const oldValue = _value;
          _value = newValue;
          // Conditionally store the value in local storage.
          if (props.settings.condition(entry, newValue, oldValue)) {
            props.store.set(entry.id, _value);
          }
          // Run the on change callback.
          props.settings.onChange(entry, newValue, oldValue);
        },
      });
    },

    onUnmount(entry) {
      // Remove the value from local storage when it's unmounted.
      props.store.set(entry.id, null);
    }
  };

  function getKey(parent) {
    const prop = props.settings.watch.charAt(0).toUpperCase() + props.settings.watch.slice(1);
    const key = (props.settings.key || parent.module + prop);
    return props.settings.keyPrefix + key;
  }

  return {...props, ...methods};
}
