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
  keyPrefix?: string;
  key?: string;
  prop?: string;
  value?: any | ((context: contextObject) => any);
  condition?:
    | boolean
    | ((context: contextObject, newValue: any, oldValue: any) => boolean);
  onChange?: (
    context: contextObject,
    newValue: any,
    oldValue: any
  ) => void | Promise<void>;
}

const defaults: Partial<PropStoreConfig> = {
  // The local storage key prefix
  keyPrefix: "VB:",

  // The local storage key to use. If not provided, module name and prop name
  // will be used e.g., "VB:ModalState".
  key: "",

  // The property on entries to watch for changes
  prop: "state",

  // The initial value or a function to compute the initial value of the watched
  // property. Will default to the local store value if it exists.
  value: ({ entry }: contextObject) => entry.store,

  // Condition to determine whether or not to store the value in local storage.
  // Can be either a boolean or a function that returns a boolean value.
  condition: true,

  // The function to run whenever the value of the watched property changes
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

    proxyEntry({ plugin, entry }) {
      return {
        get(target, prop) {
          return Reflect.get(target, prop);
        },
        set(target, prop, value) {
          if (prop === plugin.config.prop) {
            // Guard if value hasn't changed
            if (Reflect.get(target, prop) === value) return true;
            const oldValue = Reflect.get(target, prop);
            Reflect.set(target, prop, value);

            // Setup the context object
            const contextObj = { plugin, parent: entry.parent, entry };

            // Conditionally store the value in local storage
            if (
              getValue(plugin.config.condition, contextObj, value, oldValue)
            ) {
              plugin.store?.set(entry.id, value);
            }

            // Run the on change callback
            Promise.resolve(
              plugin.config.onChange(contextObj, value, oldValue)
            );

            return true;
          }

          return Reflect.set(target, prop, value);
        }
      };
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
    // Setup the context object that is passed to condition, onChange and value
    const contextObj = { plugin, parent: entry.parent, entry };

    // Create the store alias on entry that binds entry to its local storage
    // value as a getter/setter.
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
