import { Collection } from "@vrembem/core";
import { ReferenceTableEntry } from "./ReferenceTableEntry";

const config = {
  selector: ".reference-table",
  filter: false,
  expandable: false
};

export class ReferenceTable extends Collection {
  constructor(options) {
    super({ ...config, ...options });
    this.entryClass = ReferenceTableEntry;
  }

  afterMount() {
    window.addEventListener("hashchange", () => {
      this.collection.forEach((entry) => {
        entry.checkActiveHash();
      });
    });
    this.collection.forEach((entry) => {
      entry.checkActiveHash();
    });
  }

  async clearHash() {
    // Build URL without the hash
    const url = window.location.pathname + window.location.search;
    history.pushState({}, "", url);
    // Manually fire hashchange event since `history.pushState` doesn't
    window.dispatchEvent(new Event("hashchange", { bubbles: true }));
    // Emit the hash:clear event
    await this.emit("hash:clear");
  }
}
