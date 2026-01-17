import { teleportElement } from "../utilities";
import type { Plugin } from "../modules/PluginArray";
import type { CollectionEntry } from "../CollectionEntry";

type TeleportEntry = CollectionEntry & {
  teleport: () => void;
  teleportReturn: () => void;
};

export interface TeleportConfig {
  name?: string;
  where?: HTMLElement | string;
  how?: "after" | "before" | "append" | "prepend";
}

const defaults: Partial<TeleportConfig> = {
  where: "",
  how: "append"
};

export function teleport(options: TeleportConfig = {}): Plugin {
  const props: Plugin = {
    name: "teleport",
    config: defaults,
    options
  };

  const methods: Partial<Plugin> = {
    onCreateEntry({ entry }) {
      teleportAction(this, entry as TeleportEntry);
    },

    onDestroyEntry({ entry }) {
      teleportReturn(this, entry as TeleportEntry);
    }
  };

  function teleportAction(plugin: Plugin, entry: TeleportEntry) {
    // Store the teleportElement function in entry
    entry.teleport = () => {
      if (typeof entry.teleportReturn === "function") {
        entry.teleportReturn();
      }
      entry.teleportReturn = teleportElement(
        entry.el,
        entry.config.get("teleport", { fallback: plugin.config.where }),
        entry.config.get("teleportMethod", { fallback: plugin.config.how })
      );
    };

    // Call the teleport function
    entry.teleport();

    // Fire the teleport event
    entry.parent.emit("teleport", { plugin, parent: entry.parent, entry });
  }

  function teleportReturn(plugin: Plugin, entry: TeleportEntry) {
    // Return teleported element if the cleanup function exists
    if (typeof entry.teleportReturn === "function") {
      entry.teleportReturn();
    }

    // Fire the teleport return event
    entry.parent.emit("teleportReturn", {
      plugin,
      parent: entry.parent,
      entry
    });
  }

  return { ...props, ...methods };
}
