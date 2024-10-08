const defaults = {
  value: null,
  onChange: () => {}
};

export function breakpoint(options = {}) {
  const props = {
    name: "breakpoint",
    settings: { ...defaults, ...options},
  };

  const methods = {
    unmount(context) {
      context.collection.forEach((entry) => {
        removeMediaQueryList(entry);
      });
    },

    onMount(entry) {
      setupMediaQueryList(entry);
    },

    onUnmount(entry) {
      removeMediaQueryList(entry);
    }
  };

  function setupMediaQueryList(entry) {
    const value = entry?.breakpoint || props.settings.value;
    if (!value) return;
    entry.mql = window.matchMedia(`(min-width: ${value})`);
    entry.mql.onchange = (event) => {
      props.settings.onChange(event, entry);
    };
    props.settings.onChange(entry.mql, entry);
  }

  function removeMediaQueryList(entry) {
    if (!entry.mql) return;
    entry.mql.onchange = null;
    entry.mql = null;
  }

  return {...props, ...methods};
};
