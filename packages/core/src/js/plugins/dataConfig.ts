import { getDataConfig } from "../utilities/getDataConfig";
import type { Plugin } from "../modules/PluginsArray";

export interface DataConfig {
  attr?: string;
}

const defaults: Required<DataConfig> = {
  attr: "config"
};

export function dataConfig(options: DataConfig = {}): Plugin {
  const props = {
    name: "dataConfig",
    defaults,
    options
  };

  const methods = {
    onCreateEntry({ entry, plugin }: { entry: any; plugin: any }) {
      const data = getDataConfig(entry.el, plugin.config.attr);
      entry.config.addConfigSource("attr", data);
    },

    onDestroyEntry({ entry }: { entry: any }) {
      entry.config.removeConfigSource("attr");
    }
  };

  return { ...props, ...methods };
}
