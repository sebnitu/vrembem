import { getCustomProps } from "../helpers";
import type { Plugin } from "../modules/PluginArray";
import type { CollectionEntry } from "../CollectionEntry";

export interface CSSConfig {
  name?: string;
  sourceKey?: string;
  updateEvent?: string;
}

const defaults: Partial<CSSConfig> = {
  sourceKey: "css",
  updateEvent: "updateCustomProps"
};

export function cssConfig(options: CSSConfig = {}): Plugin {
  const props: Plugin = {
    name: "cssConfig",
    config: defaults,
    options
  };

  const methods: Partial<Plugin> = {
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

  function update(entry: CollectionEntry, plugin: Plugin) {
    const data = getCustomProps(entry);
    entry.config.set(plugin.config.sourceKey, data);
  }

  return { ...props, ...methods };
}
