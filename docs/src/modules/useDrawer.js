import { Drawer } from "vrembem";
import { propStore, mediaQuery } from "@vrembem/core";

let drawer = null;

if (typeof window !== "undefined") {
  drawer = new Drawer({
    selector: ".drawer",
    plugins: [
      propStore({
        condition(entry) {
          const saveStates = ["opened", "closed"];
          return entry.mode === "inline" && saveStates.includes(entry.state);
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
