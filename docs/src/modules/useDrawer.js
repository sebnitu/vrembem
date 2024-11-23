import { Drawer } from "vrembem";
import { propStore, mediaQuery } from "@vrembem/core";

let drawer = null;

if (typeof window !== "undefined") {
  drawer = new Drawer({
    selector: ".drawer",
    plugins: [
      propStore(),
      mediaQuery()
    ]
  });
  window["drawer"] = await drawer.mount();
}

export { drawer };
