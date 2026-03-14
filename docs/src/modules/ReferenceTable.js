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

  clearHash() {
    // Build URL without the hash
    const url = window.location.pathname + window.location.search;
    history.pushState({}, "", url);
    // Manually fire hashchange event since `history.pushState` doesn't
    window.dispatchEvent(new Event("hashchange", { bubbles: true }));
    // Fire a custom event since the hash was more specifically cleared
    window.dispatchEvent(new CustomEvent("hashclear", { bubbles: true }));
  }
}
