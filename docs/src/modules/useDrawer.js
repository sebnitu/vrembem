import { Drawer } from "vrembem";
import { breakpoint } from "@vrembem/core";

let drawer = null;

if (typeof window !== "undefined") {
  drawer = new Drawer({
    selector: ".drawer",
    plugins: [
      breakpoint({
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
