import { getCustomProps } from "../helpers";
import type { Plugin } from "../modules/PluginArray";
import type { CollectionEntry } from "../CollectionEntry";

export interface CSSConfig {
  name?: string;
  sourceKey?: string;
  updateEvent?: string;
}

export function cssConfig(options: CSSConfig = {}): Plugin {
  return {
    name: "cssConfig",
    config: {
      sourceKey: "css",
      updateEvent: "updateCustomProps"
    },
    options,

    setup(parent) {
      parent.on(this.config.updateEvent, update, this);
    },

    teardown(parent) {
      parent.off(this.config.updateEvent, update);
    },

    onCreateEntry({ entry }) {
      const data = getCustomProps(entry);
      entry.config.set(this.config.sourceKey, data);
    },

    onDestroyEntry({ entry }) {
      entry.config.remove(this.config.sourceKey);
    }
  };
}

function update(entry: CollectionEntry, plugin: Plugin) {
  const data = getCustomProps(entry);
  entry.config.set(plugin.config.sourceKey, data);
}
