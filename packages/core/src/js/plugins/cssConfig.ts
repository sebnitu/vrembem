import { getCustomProps } from "../helpers";
import type { Plugin } from "../modules/PluginsArray";
import type { CollectionEntry } from "../CollectionEntry";

export function cssConfig(): Plugin {
  const props = {
    name: "cssConfig"
  };

  const methods = {
    onCreateEntry({ entry }: { entry: CollectionEntry<any> }) {
      const data = getCustomProps(entry);
      entry.config.addConfigSource("css", data);
    },

    onDestroyEntry({ entry }: { entry: CollectionEntry<any> }) {
      entry.config.removeConfigSource("css");
    },

    update(entry: CollectionEntry<any>) {
      const data = getCustomProps(entry);
      entry.config.apply(data, "css");
    }
  };

  return { ...props, ...methods };
}
