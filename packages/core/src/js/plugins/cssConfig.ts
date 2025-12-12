import { getCustomProps } from "../helpers";
import type { Plugin } from "../modules/PluginsArray";
import type { Collection } from "../Collection";
import type { CollectionEntry } from "../CollectionEntry";

export interface AttrConfig {
  key?: string;
}

const defaults: Required<AttrConfig> = {
  key: "css"
};

export function cssConfig(options: AttrConfig = {}): Plugin {
  const props = {
    name: "cssConfig",
    defaults,
    options
  };

  const methods = {
    setup({ parent }: { parent: Collection<any> }) {
      parent.on("updateCustomProps", update);
    },

    onCreateEntry({ entry }: { entry: CollectionEntry<any> }) {
      const data = getCustomProps(entry);
      entry.config.addConfigSource(this.config.key, data);
    },

    onDestroyEntry({
      entry,
      parent
    }: {
      entry: CollectionEntry<any>;
      parent: Collection<any>;
    }) {
      entry.config.removeConfigSource(this.config.key);
      parent.off("updateCustomProps", update);
    }
  };

  function update(entry: CollectionEntry<any>) {
    const data = getCustomProps(entry);
    entry.config.apply(data, this.config.key);
  }

  return { ...props, ...methods };
}
