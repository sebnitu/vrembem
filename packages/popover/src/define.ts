import { Popover } from "./index.js";

if (!customElements.get("vb-popover")) {
  customElements.define("vb-popover", Popover);
}

export { Popover };
