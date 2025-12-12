import { getAttrConfig } from "../utilities/getAttrConfig";
import type { Plugin } from "../modules/PluginsArray";
import type { CollectionEntry } from "../CollectionEntry";

export interface AttrConfig {
  key?: string;
  attr?: string;
}

const defaults: Required<AttrConfig> = {
  key: "attr",
  attr: "config"
};

export function attrConfig(options: AttrConfig = {}): Plugin {
  const props = {
    name: "attrConfig",
    defaults,
    options
  };

  const methods = {
    onCreateEntry({
      entry,
      plugin
    }: {
      entry: CollectionEntry<any>;
      plugin: Plugin;
    }) {
      const data = getAttrConfig(entry.el, plugin.config.attr);
      entry.config.addConfigSource(plugin.config.key, data);
    },

    onDestroyEntry({
      entry,
      plugin
    }: {
      entry: CollectionEntry<any>;
      plugin: Plugin;
    }) {
      entry.config.removeConfigSource(plugin.config.key);
    }
  };

  return { ...props, ...methods };
}
