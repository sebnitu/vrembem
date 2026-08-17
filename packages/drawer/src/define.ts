import { Drawer } from "./index.js";

if (!customElements.get("vb-drawer")) {
  customElements.define("vb-drawer", Drawer);
}

export { Drawer };
