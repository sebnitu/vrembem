export default {
  mediaQuery: {
    onChange(event, entry) {
      entry.mode = (event.matches) ? "inline" : "modal";
    }
  },
  propStore: {
    prop: "inlineState",
    value: ({ entry }) => entry.store,
    condition: ({ entry }) => ["opened", "closed", "indeterminate"].includes(entry.state),
    onChange: ({ entry }) => entry.applyState()
  }
};
