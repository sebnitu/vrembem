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
    onCreateEntry({ entry }: { entry: CollectionEntry<any> }) {
      const data = getAttrConfig(entry.el, this.config.attr);
      entry.config.addConfigSource(this.config.key, data);
    },

    onDestroyEntry({ entry }: { entry: CollectionEntry<any> }) {
      entry.config.removeConfigSource(this.config.key);
    }
  };

  return { ...props, ...methods };
}
