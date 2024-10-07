import { Drawer } from "vrembem";

let drawer = null;

if (typeof window !== "undefined") {
  drawer = new Drawer({
    selector: ".drawer, #layout-drawer, #layout-aside"
  });
  window["drawer"] = await drawer.mount();
}

export { drawer };
