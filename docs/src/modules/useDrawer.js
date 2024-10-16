import { Drawer } from "vrembem";
import { propStore, mediaQuery } from "@vrembem/core";

let drawer = null;

if (typeof window !== "undefined") {
  drawer = new Drawer({
    selector: ".drawer",
    plugins: [
      propStore({
        prop: "inlineState",
        value: (entry) => entry.store,
        condition(entry) {
          return ["opened", "closed"].includes(entry.state);
        },
        onChange(entry, value) {
          entry.applyState(value);
        }
      }),
      mediaQuery({
        onChange(event, entry) {
          entry.mode = (event.matches) ? "inline" : "modal";
        }
      })
    ]
  });
  window["drawer"] = await drawer.mount();
}

export { drawer };
