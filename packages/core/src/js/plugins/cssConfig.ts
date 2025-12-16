import { getCustomProps } from "../helpers";
import type { Plugin } from "../modules/PluginArray";
import type { CollectionEntry } from "../CollectionEntry";

export interface CSSConfig {
  sourceKey?: string;
}

const defaults: Required<CSSConfig> = {
  sourceKey: "css"
};

export function cssConfig(options: CSSConfig = {}): Plugin {
  const props: Plugin = {
    name: "cssConfig",
    config: defaults,
    options
  };

  const methods: Partial<Plugin> = {
    setup(parent) {
      parent.on("updateCustomProps", update, this);
    },

    teardown(parent) {
      parent.off("updateCustomProps", update);
    },

    onCreateEntry({ entry }) {
      const data = getCustomProps(entry);
      entry.config.addConfigSource(this.config.sourceKey, data);
    },

    onDestroyEntry({ entry }) {
      entry.config.removeConfigSource(this.config.sourceKey);
    }
  };

  function update(entry: CollectionEntry<any>, plugin: Plugin) {
    const data = getCustomProps(entry);
    entry.config.apply(data, plugin.config.sourceKey);
  }

  return { ...props, ...methods };
}
