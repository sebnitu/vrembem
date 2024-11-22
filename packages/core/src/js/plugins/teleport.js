import { teleportElement } from "../utilities";

const defaults = {
  where: null,
  how: "append"
};

export function teleport(config = {}) {
  const props = {
    name: "teleport",
    defaults,
    config
  };

  const methods = {
    teardown({ parent }) {
      parent.collection.forEach((entry) => {
        if (typeof entry.teleportReturn === "function") {
          entry.teleportReturn();
          delete entry.teleport;
          delete entry.teleportReturn;
        }
      });
    },

    onCreateEntry({ plugin, entry }) {
      teleport(plugin, entry);
    },

    onDestroyEntry({ plugin, entry }) {
      teleportReturn(plugin, entry);
    }
  };

  function teleport(plugin, entry) {
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

  function teleportReturn(plugin, entry) {
    // Return teleported element if the cleanup function exists.
    if (typeof entry.teleportReturn === "function") {
      entry.teleportReturn();
    }

    // Fire the teleport return event.
    entry.parent.emit("teleportReturn", { plugin, parent, entry });
  }

  return {...props, ...methods};
};
