import { getValue } from "../utilities";
import { localStore } from "../modules";
import type { Plugin } from "../modules/PluginArray";
import type { CollectionEntry } from "../CollectionEntry";

export interface PropStorePlugin extends Plugin {
  store: ReturnType<typeof localStore> | null;
}

export type PropStoreEntry = CollectionEntry & {
  [key: string]: any;
};

type contextObject = {
  plugin: PropStorePlugin;
  parent: PropStoreEntry["parent"];
  entry: PropStoreEntry;
};

export interface PropStoreConfig {
  name?: string;
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

const defaults: Partial<PropStoreConfig> = {
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
      this.store = localStore(getKey(this, parent.name));
    },

    async onCreateEntry({ entry }) {
      await setupPropStore(this, entry);
    },

    async onDestroyEntry({ entry }) {
      await teardownPropStore(this, entry);
    }
  };

  async function setupPropStore(
    plugin: PropStorePlugin,
    entry: PropStoreEntry
  ) {
    // Store the initial property value. Set to null if property doesn't exist
    let _value = entry[plugin.config.prop] || null;
    const contextObj = { plugin: plugin, parent: entry.parent, entry };

    // Define a getter and setter for the property
    Object.defineProperty(entry, plugin.config.prop, {
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
          plugin.config.condition,
          contextObj,
          newValue,
          oldValue
        );

        if (condition) {
          plugin.store?.set(entry.id, newValue);
        }

        // Run the on change callback
        await plugin.config.onChange(contextObj, newValue, oldValue);
      }
    });

    // Create the store object for binding entry to its local store value
    Object.defineProperty(entry, "store", {
      configurable: true,
      get: () => {
        return plugin.store?.get(entry.id);
      },
      set: (value) => {
        entry[plugin.config.prop] = value;
      }
    });

    // Conditionally set the initial value (must be truthy)
    entry[plugin.config.prop] =
      (await getValue(plugin.config.value, contextObj)) ||
      entry[plugin.config.prop];
  }

  async function teardownPropStore(
    plugin: PropStorePlugin,
    entry: PropStoreEntry
  ) {
    // Remove the getter/setters and restore properties to its current value
    const currentValue = entry[plugin.config.prop];
    delete entry[plugin.config.prop];
    entry[plugin.config.prop] = currentValue;

    // Remove value from local store
    plugin.store?.set(entry.id, null);
  }

  function getKey(plugin: PropStorePlugin, moduleName: string): string {
    const prop =
      plugin.config.prop.charAt(0).toUpperCase() + plugin.config.prop.slice(1);
    const key = plugin.config.key || moduleName + prop;
    return plugin.config.keyPrefix + key;
  }

  return { ...props, ...methods };
}
