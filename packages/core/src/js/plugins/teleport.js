import { teleport as teleportUtility } from "../utilities/teleport";

export function teleport(options = {}) {
  const plugin = {
    name: "teleport",
    settings: { ...{ where: null, how: "append" }, ...options},
    mount() {
      console.log("Plugin mount():", this.name);
    },

    unmount() {
      console.log("Plugin unmount():", this.name);
    },

    entry: {
      beforeMount(entry) {
        entry.teleport = teleport.bind(null, entry);
        entry.teleport();
      },

      beforeUnmount(entry) {
        teleportReturn(entry);
      }
    }
  };

  function teleport(entry) {
    teleportReturn(entry);
    entry.teleportReturn = teleportUtility(
      entry.el,
      entry.getSetting("teleport", { fallback: plugin.settings.where }),
      entry.getSetting("teleportMethod", { fallback: plugin.settings.how })
    );
  }

  function teleportReturn(entry) {
    if (typeof entry.teleportReturn === "function") {
      entry.teleportReturn();
    }
  }

  return plugin;
};
