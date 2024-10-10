const defaults = {
  color1: "color: hsl(152deg 60% 40%)",
  color2: "color: hsl(152deg 60% 50%)"
};

export function debug(options = {}) {
  const props = {
    name: "debug",
    settings: {...defaults, ...options}
  };

  function log(string) {
    console.log(
      `%cDEBUG: %c${string}`, 
      props.settings.color1,
      props.settings.color2,
    );
  }

  const methods = {
    // Mount lifecycle hooks...
    mount() {
      log("mountPlugins()");
    },
    beforeMount() {
      log("beforeMount()");
    },
    onMount() {
      log("onMount()");
    },
    beforeRegister() {
      log("beforeRegister()");
    },
    afterRegister() {
      log("afterRegister()");
    },
    afterMount() {
      log("afterMount()");
    },

    // Unmount lifecycle hooks...
    beforeUnmount() {
      log("beforeUnmount()");
    },
    onUnmount() {
      log("onUnmount()");
    },
    beforeDeregister() {
      log("beforeDeregister()");
    },
    afterDeregister() {
      log("afterDeregister()");
    },
    afterUnmount() {
      log("afterUnmount()");
    },
    unmount() {
      log("unmountPlugins()");
    }
  };

  return {...props, ...methods};
}
