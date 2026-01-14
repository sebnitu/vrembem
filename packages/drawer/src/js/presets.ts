import type {
  FocusTrapConfig,
  FocusTrapEntry,
  MediaQueryConfig,
  MediaQueryEntry,
  PropStoreConfig,
  PropStoreEntry
} from "@vrembem/core";
import { DrawerEntry } from "./DrawerEntry";

type DrawerFocusTrapEntry = DrawerEntry & FocusTrapEntry;
type DrawerMediaQueryEntry = DrawerEntry & MediaQueryEntry;

const presets: {
  focusTrap: FocusTrapConfig<DrawerFocusTrapEntry>;
  mediaQuery: MediaQueryConfig<DrawerMediaQueryEntry>;
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
    onChange(event, entry) {
      entry.mode = event.matches ? "inline" : "modal";
    }
  },
  propStore: {
    prop: "inlineState",
    condition: ({ entry }) =>
      ["opened", "closed", "indeterminate"].includes(entry.state),
    onChange: ({ entry }) => entry.applyState()
  }
};

export default presets;
