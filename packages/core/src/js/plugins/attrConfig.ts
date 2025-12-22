import { getAttrData } from "../utilities/getAttrData";
import type { Plugin } from "../modules/PluginArray";

export interface AttrConfig {
  attr?: string;
  sourceKey?: string;
}

const defaults: Required<AttrConfig> = {
  attr: "config",
  sourceKey: "attr"
};

export function attrConfig(options: AttrConfig = {}): Plugin {
  const props: Plugin = {
    name: "attrConfig",
    config: defaults,
    options
  };

  const methods: Partial<Plugin> = {
    onCreateEntry({ entry }) {
      const data = getAttrData(entry.el, this.config.attr);
      entry.config.set(this.config.sourceKey, data);
    },

    onDestroyEntry({ entry }) {
      entry.config.remove(this.config.sourceKey);
    }
  };

  return { ...props, ...methods };
}
