import { getCustomProps } from "../helpers";
import type { Plugin } from "../modules/PluginsArray";
import type { Collection } from "../Collection";
import type { CollectionEntry } from "../CollectionEntry";

export interface CSSConfig {
  key?: string;
}

const defaults: Required<CSSConfig> = {
  key: "css"
};

export function cssConfig(options: CSSConfig = {}): Plugin {
  const props = {
    name: "cssConfig",
    defaults,
    options
  };

  const methods = {
    setup({ parent, plugin }: { parent: Collection<any>; plugin: Plugin }) {
      parent.on("updateCustomProps", update.bind(plugin));
    },

    onCreateEntry({
      entry,
      plugin
    }: {
      entry: CollectionEntry<any>;
      plugin: Plugin;
    }) {
      const data = getCustomProps(entry);
      entry.config.addConfigSource(plugin.config.key, data);
    },

    onDestroyEntry({
      entry,
      parent,
      plugin
    }: {
      entry: CollectionEntry<any>;
      parent: Collection<any>;
      plugin: Plugin;
    }) {
      entry.config.removeConfigSource(plugin.config.key);
      parent.off("updateCustomProps", update.bind(plugin));
    }
  };

  function update(this: Plugin, entry: CollectionEntry<any>) {
    const data = getCustomProps(entry);
    entry.config.apply(data, this.config.key);
  }

  return { ...props, ...methods };
}
