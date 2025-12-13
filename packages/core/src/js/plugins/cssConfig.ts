import { getCustomProps } from "../helpers";
import type { Plugin } from "../modules/PluginsArray";
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
      parent.on("updateCustomProps", update.bind(this));
    },

    onCreateEntry({ entry }) {
      const data = getCustomProps(entry);
      entry.config.addConfigSource(this.config.sourceKey, data);
    },

    onDestroyEntry({ parent, entry }) {
      entry.config.removeConfigSource(this.config.sourceKey);
      parent.off("updateCustomProps", update.bind(this));
    }
  };

  function update(this: Plugin, entry: CollectionEntry<any>) {
    const data = getCustomProps(entry);
    entry.config.apply(data, this.config.sourceKey);
  }

  return { ...props, ...methods };
}
