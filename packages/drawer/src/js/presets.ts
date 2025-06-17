import type {
  FocusTrapConfig,
  MediaQueryConfig,
  PropStoreConfig
} from "@vrembem/core";

export default {
  focusTrap: {
    condition: ({ entry }) => {
      return (
        entry.state === "closed" ||
        (entry.state === "opened" && entry.mode === "modal")
      );
    }
  } as FocusTrapConfig,
  mediaQuery: {
    onChange(event, entry) {
      entry.mode = event.matches ? "inline" : "modal";
    }
  } as MediaQueryConfig,
  propStore: {
    prop: "inlineState",
    value: ({ entry }) => entry.store,
    condition: ({ entry }) =>
      ["opened", "closed", "indeterminate"].includes(entry.state),
    onChange: ({ entry }) => entry.applyState()
  } as PropStoreConfig
};
