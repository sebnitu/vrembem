const defaults = {};

export function breakpoint(options = {}) {
  const props = {
    name: "breakpoint",
    settings: { ...defaults, ...options},
  };

  const methods = {
    mount(context) {
      console.log(this.name, "> mount() >", context.module);
    },

    unmount(context) {
      console.log(this.name, "> ummount() >", context.module);
    },

    onMount(entry) {
      console.log(this.name, "> onMount() >", entry.id);
    },

    onUnmount(entry, reMount) {
      console.log(this.name, "> onUnmount() >", entry.id, reMount);
    }
  };

  return {...props, ...methods};
};
