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
}
