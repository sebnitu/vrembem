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
    setup({ plugin, parent }) {
      parent.on("createEntry", teleport, plugin);
      parent.on("destroyEntry", teleportReturn, plugin);
    },

    teardown({ parent }) {
      parent.off("createEntry", teleport);
      parent.off("destroyEntry", teleportReturn);
      parent.collection.forEach((entry) => {
        if (typeof entry.teleportReturn === "function") {
          entry.teleportReturn();
          delete entry.teleport;
          delete entry.teleportReturn;
        }
      });
    },
  };

  function teleport(entry, plugin) {
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
    entry.parent.emit("teleport", { plugin, parent, entry });
  }

  function teleportReturn(entry, plugin) {
    // Return teleported element if the cleanup function exists.
    if (typeof entry.teleportReturn === "function") {
      entry.teleportReturn();
    }

    // Fire the teleport return event.
    entry.parent.emit("teleportReturn", { plugin, parent, entry });
  }

  return createPluginObject(props, methods);
};
