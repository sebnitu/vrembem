import { teleport as teleportUtility } from "../utilities/teleport";

export function teleport(options = {}) {
  const plugin = {
    name: "teleport",
    settings: { ...{ where: null, how: "append" }, ...options},

    unmount(context) {
      context.collection.forEach((entry) => {
        if (typeof entry.teleportReturn === "function") {
          entry.teleportReturn();
          delete entry.teleport;
          delete entry.teleportReturn;
        }
      });
    },

    onMount(entry) {
      entry.teleport = teleport.bind(this, entry);
      entry.teleport();
    },

    onUnmount(entry) {
      teleportReturn(entry);
    }
  };

  function teleport(entry) {
    teleportReturn(entry);
    entry.teleportReturn = teleportUtility(
      entry.el,
      entry.getSetting("teleport", { fallback: this.settings.where }),
      entry.getSetting("teleportMethod", { fallback: this.settings.how })
    );
  }

  function teleportReturn(entry) {
    if (typeof entry.teleportReturn === "function") {
      entry.teleportReturn();
    }
  }

  return plugin;
};
