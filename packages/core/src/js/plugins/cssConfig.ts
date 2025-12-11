import { getCustomProps } from "../helpers";
import type { Plugin } from "../modules/PluginsArray";
import type { Collection } from "../Collection";
import type { CollectionEntry } from "../CollectionEntry";

export function cssConfig(): Plugin {
  const props = {
    name: "cssConfig"
  };

  const methods = {
    onCreateEntry({
      entry,
      parent
    }: {
      entry: CollectionEntry<any>;
      parent: Collection<any>;
    }) {
      const data = getCustomProps(entry);
      entry.config.addConfigSource("css", data);
      parent.on("updateCustomProps", update, entry);
    },

    onDestroyEntry({
      entry,
      parent
    }: {
      entry: CollectionEntry<any>;
      parent: Collection<any>;
    }) {
      entry.config.removeConfigSource("css");
      parent.off("updateCustomProps", update);
    }
  };

  function update(entry: CollectionEntry<any>) {
    const data = getCustomProps(entry);
    entry.config.apply(data, "css");
  }

  return { ...props, ...methods };
}
