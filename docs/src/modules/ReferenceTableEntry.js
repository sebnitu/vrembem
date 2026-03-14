import { CollectionEntry } from "@vrembem/core";

export class ReferenceTableEntry extends CollectionEntry {
  constructor(...args) {
    super(...args);
    this.table = this.el.querySelector("table");
  }

  onRegisterEntry() {
    if (this.config.get("filter")) {
      console.log("Setup filter functionality...");
    }
    if (this.config.get("expandable")) {
      console.log("Setup expandable functionality...");
    }
  }
}
