import { getAttrData } from "../utilities/getAttrData";
import type { Plugin } from "../modules/PluginsArray";

export interface AttrConfig {
  key?: string;
  attr?: string;
}

const defaults: Required<AttrConfig> = {
  key: "attr",
  attr: "config"
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
      entry.config.addConfigSource(this.config.key, data);
    },

    onDestroyEntry({ entry }) {
      entry.config.removeConfigSource(this.config.key);
    }
  };

  return { ...props, ...methods };
}
