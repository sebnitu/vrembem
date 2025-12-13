import type {
  FocusTrapConfig,
  MediaQueryConfig,
  PropStoreConfig
} from "@vrembem/core";

const presets: {
  focusTrap: FocusTrapConfig;
  mediaQuery: MediaQueryConfig;
  propStore: PropStoreConfig;
} = {
  focusTrap: {
    condition: ({ entry }: { entry: any }) => {
      return (
        entry.state === "closed" ||
        (entry.state === "opened" && entry.mode === "modal")
      );
    }
  },
  mediaQuery: {
    onChange(event, entry: any) {
      entry.mode = event.matches ? "inline" : "modal";
    }
  },
  propStore: {
    prop: "inlineState",
    value: ({ entry }: { entry: any }) => entry.store,
    condition: ({ entry }) =>
      ["opened", "closed", "indeterminate"].includes(entry.state),
    onChange: ({ entry }) => entry.applyState()
  }
};

export default presets;
