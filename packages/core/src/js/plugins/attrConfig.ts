import { getAttrData } from "../utilities/getAttrData";
import type { Plugin } from "../modules/PluginArray";

export interface AttrConfig {
  name?: string;
  attr?: string;
  sourceKey?: string;
}

export function attrConfig(options: AttrConfig = {}): Plugin {
  return {
    name: "attrConfig",
    config: {
      attr: "config",
      sourceKey: "attr"
    },
    options,

    onCreateEntry({ entry }) {
      const data = getAttrData(entry.el, this.config.attr);
      entry.config.set(this.config.sourceKey, data);
    },

    onDestroyEntry({ entry }) {
      entry.config.remove(this.config.sourceKey);
    }
  };
}
