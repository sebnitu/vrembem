import type {
  FocusTrapConfig,
  FocusTrapEntry,
  MediaQueryConfig,
  PropStoreConfig
} from "@vrembem/core";
import { DrawerEntry } from "./DrawerEntry";

type DrawerFocusTrapEntry = DrawerEntry & FocusTrapEntry;

const presets: {
  focusTrap: FocusTrapConfig<DrawerFocusTrapEntry>;
  mediaQuery: MediaQueryConfig;
  propStore: PropStoreConfig;
} = {
  focusTrap: {
    condition: ({ entry }) => {
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
