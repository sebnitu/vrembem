import { teleportElement } from "../utilities";
import { createPluginObject } from "../helpers";

const defaults = {
  where: null,
  how: "append"
};

export function teleport(options = {}) {
  const props = {
    name: "teleport",
    settings: {...defaults, ...options}
  };

  const methods = {
    mount({ plugin, parent }) {
      parent.on("mount", teleport, plugin);
      parent.on("unmount", teleportReturn, plugin);
    },

    unmount({ parent }) {
      parent.off("mount", teleport);
      parent.off("unmount", teleportReturn);
      parent.collection.forEach((entry) => {
        if (typeof entry.teleportReturn === "function") {
          entry.teleportReturn();
          delete entry.teleport;
          delete entry.teleportReturn;
        }
      });
    },
  };

  function teleport({ parent, entry }, plugin) {
    // Store the teleportElement function in entry.
    entry.teleport = () => {
      if (typeof entry.teleportReturn === "function") {
        entry.teleportReturn();
      }
      entry.teleportReturn = teleportElement(
        entry.el,
        entry.getSetting("teleport", { fallback: plugin.settings.where }),
        entry.getSetting("teleportMethod", { fallback: plugin.settings.how })
      );
    };

    // Call the teleport function.
    entry.teleport();

    // Fire the teleport event.
    parent.emit("teleport", { plugin, parent, entry });
  }

  function teleportReturn({ parent, entry }, plugin) {
    // Return teleported element if the cleanup function exists.
    if (typeof entry.teleportReturn === "function") {
      entry.teleportReturn();
    }
    
    // Fire the teleport return event.
    parent.emit("teleportReturn", { plugin, parent, entry });
  }

  return createPluginObject(props, methods);
};
