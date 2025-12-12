import { getAttrConfig } from "../utilities/getAttrConfig";
import type { Plugin } from "../modules/PluginsArray";

export interface AttrConfig {
  attr?: string;
}

const defaults: Required<AttrConfig> = {
  attr: "config"
};

export function attrConfig(options: AttrConfig = {}): Plugin {
  const props = {
    name: "attrConfig",
    defaults,
    options
  };

  const methods = {
    onCreateEntry({ entry, plugin }: { entry: any; plugin: any }) {
      const data = getAttrConfig(entry.el, plugin.config.attr);
      entry.config.addConfigSource("attr", data);
    },

    onDestroyEntry({ entry }: { entry: any }) {
      entry.config.removeConfigSource("attr");
    }
  };

  return { ...props, ...methods };
}
