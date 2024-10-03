import { teleport as teleportUtility } from "../utilities/teleport";

export function teleport(options = {}) {
  const { where, how = "append" } = options;
  const plugin = {
    name: "teleport",
    mount() {
      console.log("Plugin mount():", this.name);
    },

    unmount() {
      console.log("Plugin unmount():", this.name);
    },

    entry: {
      beforeMount(entry) {
        entry.teleport = () => {
          if (typeof entry.teleportReturn === "function") {
            entry.teleportReturn();
          }
          entry.teleportReturn = teleportUtility(
            entry.el,
            entry.getSetting("teleport", { fallback: where }),
            entry.getSetting("teleportMethod", { fallback: how })
          );
        };
        
        entry.teleport();
      },

      beforeUnmount(entry) {
        if (typeof entry.teleportReturn === "function") {
          entry.teleportReturn();
        }
      }
    }
  };

  return plugin;
};
