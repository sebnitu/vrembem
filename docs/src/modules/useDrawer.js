import { Drawer } from "vrembem";
import { debug, breakpoint } from "@vrembem/core";

let drawer = null;

if (typeof window !== "undefined") {
  drawer = new Drawer({
    selector: ".drawer",
    plugins: [
      debug(),
      breakpoint()
    ]
  });
  window["drawer"] = await drawer.mount();
}

export { drawer };
