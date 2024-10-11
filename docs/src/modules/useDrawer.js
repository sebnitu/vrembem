import { Drawer } from "vrembem";
import { localStorePlugin, mediaQuery } from "@vrembem/core";

let drawer = null;

if (typeof window !== "undefined") {
  drawer = new Drawer({
    selector: ".drawer",
    plugins: [
      localStorePlugin({
        condition: (entry, value) => {
          return entry.mode === "inline" && value != "indeterminate" && value != "opening" && value != "closing";
        },
        onChange: (entry, newValue, oldValue) => {
          console.log("PLUGIN > onChange()", entry.id, newValue, oldValue);
        }
      }),
      mediaQuery({
        dataBreakpoint: "drawer-breakpoint",
        onChange: (event, entry) => {
          entry.mode = (event.matches) ? "inline" : "modal";
        }
      })
    ]
  });
  window["drawer"] = await drawer.mount();
}

export { drawer };
