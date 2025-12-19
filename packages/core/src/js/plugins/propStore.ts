import { getValue } from "../utilities";
import { localStore } from "../modules";
import type { Plugin } from "../modules/PluginArray";
import type { CollectionEntry } from "../CollectionEntry";

export interface PropStorePlugin extends Plugin {
  store: ReturnType<typeof localStore> | null;
}

export type PropStoreEntry = CollectionEntry<any> & {
  [key: string]: any;
};

type contextObject = {
  plugin: PropStorePlugin;
  parent: PropStoreEntry["parent"];
  entry: PropStoreEntry;
};

export interface PropStoreConfig {
  prop: string;
  value?: any | ((context: contextObject) => any);
  keyPrefix?: string;
  key?: string | null;
  condition?:
    | boolean
    | ((context: contextObject, newValue?: any, oldValue?: any) => boolean);
  onChange?: (
    context: contextObject,
    newValue: any,
    oldValue: any
  ) => void | Promise<void>;
}

const defaults: Required<PropStoreConfig> = {
  // The property on entry objects to watch
  prop: "state",

  // The default value or a function to compute the initial value
  value: null,

  // The local storage key prefix
  keyPrefix: "VB:",

  // The local storage key to use. If not provided, module name and prop value
  // will be used e.g., "VB:ModalState".
  key: null,

  // Condition to determine whether or not to store the value in local storage
  condition: false,

  // The function to run whenever the value changes
  onChange() {}
};

export function propStore(
  options: Partial<PropStoreConfig> = {}
): PropStorePlugin {
  const props: PropStorePlugin = {
    name: "propStore",
    config: defaults,
    options,
    store: null
  };

  const methods: Partial<PropStorePlugin> = {
    setup(this: PropStorePlugin, parent) {
      this.store = localStore(getKey.call(this, parent.name));
    },

    async onCreateEntry({ entry }) {
      await setupPropStore.call(this, entry);
    },

    onDestroyEntry({ entry }) {
      removePropStore.call(this, entry);
    }
  };

  async function setupPropStore(this: PropStorePlugin, entry: PropStoreEntry) {
    // Store the initial property value. Set to null if property doesn't exist
    let _value = entry[this.config.prop] || null;
    const contextObj = { plugin: this, parent: entry.parent, entry };

    // Define a getter and setter for the property
    Object.defineProperty(entry, this.config.prop, {
      configurable: true,
      get() {
        return _value;
      },
      set: async (newValue) => {
        // Guard if value hasn't changed
        if (_value === newValue) return;
        const oldValue = _value;
        _value = newValue;

        // Conditionally store the value in local storage
        const condition = getValue(
          this.config.condition,
          contextObj,
          newValue,
          oldValue
        );

        if (condition) {
          this.store?.set(entry.id, newValue);
        }

        // Run the on change callback
        await this.config.onChange(contextObj, newValue, oldValue);
      }
    });

    // Create the store object for binding entry to its local store value
    Object.defineProperty(entry, "store", {
      configurable: true,
      get: () => {
        return this.store?.get(entry.id);
      },
      set: (value) => {
        entry[this.config.prop] = value;
      }
    });

    // Conditionally set the initial value (must be truthy)
    entry[this.config.prop] =
      (await getValue(this.config.value, contextObj)) ||
      entry[this.config.prop];
  }

  async function removePropStore(this: PropStorePlugin, entry: PropStoreEntry) {
    // Remove the getter/setters and restore properties to its current value
    const currentValue = entry[this.config.prop];
    delete entry[this.config.prop];
    entry[this.config.prop] = currentValue;

    // Remove value from local store
    this.store?.set(entry.id, null);
  }

  function getKey(this: PropStorePlugin, moduleName: string): string {
    const prop =
      this.config.prop.charAt(0).toUpperCase() + this.config.prop.slice(1);
    const key = this.config.key || moduleName + prop;
    return this.config.keyPrefix + key;
  }

  return { ...props, ...methods };
}
