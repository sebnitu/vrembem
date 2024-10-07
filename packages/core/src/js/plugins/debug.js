export function debug(options = {}) {
  return {
    name: "debug",
    settings: options,

    // Mount lifecycle hooks...
    mount() {
      console.log("DEBUG: mountPlugins()");
    },
    beforeMount() {
      console.log("DEBUG: beforeMount()");
    },
    onMount() {
      console.log("DEBUG: onMount()");
    },
    beforeRegister() {
      console.log("DEBUG: beforeRegister()");
    },
    afterRegister() {
      console.log("DEBUG: afterRegister()");
    },
    afterMount() {
      console.log("DEBUG: afterMount()");
    },

    // Unmount lifecycle hooks...
    beforeUnmount() {
      console.log("DEBUG: beforeUnmount()");
    },
    onUnmount() {
      console.log("DEBUG: onUnmount()");
    },
    beforeDeregister() {
      console.log("DEBUG: beforeDeregister()");
    },
    afterDeregister() {
      console.log("DEBUG: afterDeregister()");
    },
    afterUnmount() {
      console.log("DEBUG: afterUnmount()");
    },
    unmount() {
      console.log("DEBUG: unmountPlugins()");
    }
  };
}
