import { Drawer } from "vrembem";
let drawer = null;

if (typeof window !== "undefined") {
  drawer = new Drawer();
  window["drawer"] = await drawer.mount();
}

export { drawer };
