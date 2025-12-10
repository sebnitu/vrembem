import { teleportElement } from "../utilities";
import type { Plugin } from "../modules/PluginsArray";

export interface TeleportConfig {
  where?: string | null;
  how?: string;
}

const defaults: Required<TeleportConfig> = {
  where: null,
  how: "append"
};

export function teleport(options: TeleportConfig = {}): Plugin {
  const props = {
    name: "teleport",
    defaults,
    options
  };

  const methods = {
    onCreateEntry({ plugin, entry }: { plugin: any; entry: any }) {
      teleportAction(plugin, entry);
    },

    onDestroyEntry({ plugin, entry }: { plugin: any; entry: any }) {
      teleportReturn(plugin, entry);
    }
  };

  function teleportAction(plugin: any, entry: any) {
    // Store the teleportElement function in entry
    entry.teleport = () => {
      if (typeof entry.teleportReturn === "function") {
        entry.teleportReturn();
      }
      entry.teleportReturn = teleportElement(
        entry.el,
        entry.getConfig("teleport", { fallback: plugin.config.where }),
        entry.getConfig("teleportMethod", { fallback: plugin.config.how })
      );
    };

    // Call the teleport function
    entry.teleport();

    // Fire the teleport event
    entry.parent.emit("teleport", { plugin, parent: entry.parent, entry });
  }

  function teleportReturn(plugin: any, entry: any) {
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
