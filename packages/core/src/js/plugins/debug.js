import { createPluginObject } from "../helpers";

const defaults = {
  color1: "color: hsl(152deg 60% 40%)",
  color2: "color: hsl(152deg 60% 50%)"
};

export function debug(options = {}) {
  const props = {
    name: "debug",
    settings: {...defaults, ...options}
  };

  function log(string, args) {
    console.log(
      `%c📡 DEBUG: %c${string} > Arguments:`,
      props.settings.color1,
      props.settings.color2,
      ...args
    );
  }

  const methods = {
    // Mount lifecycle hooks...
    mount() {
      log("mountPlugins()", arguments);
    },
    beforeMount() {
      log("beforeMount()", arguments);
    },
    onMount() {
      log("onMount()", arguments);
    },
    beforeRegister() {
      log("beforeRegister()", arguments);
    },
    afterRegister() {
      log("afterRegister()", arguments);
    },
    afterMount() {
      log("afterMount()", arguments);
    },

    // Unmount lifecycle hooks...
    beforeUnmount() {
      log("beforeUnmount()", arguments);
    },
    onUnmount() {
      log("onUnmount()", arguments);
    },
    beforeDeregister() {
      log("beforeDeregister()", arguments);
    },
    afterDeregister() {
      log("afterDeregister()", arguments);
    },
    afterUnmount() {
      log("afterUnmount()", arguments);
    },
    unmount() {
      log("unmountPlugins()", arguments);
    }
  };

  return createPluginObject(props, methods);
}
