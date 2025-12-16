import type { CollectionEntry } from "../CollectionEntry";

type StackArrayConfig = {
  onChange?: () => void;
  [key: string]: any;
};

export class StackArray<
  TEntry extends CollectionEntry<any>
> extends Array<TEntry> {
  config: StackArrayConfig;

  constructor(config: StackArrayConfig = {}) {
    super();
    this.config = config;
  }

  get copy(): TEntry[] {
    return [...this];
  }

  get top(): TEntry | null {
    const result = this[this.length - 1];
    return result ? result : null;
  }

  updateIndex() {
    this.forEach((entry, index) => {
      entry.el.style.zIndex = "";
      const value = getComputedStyle(entry.el)["z-index"];
      entry.el.style.zIndex = String(parseInt(value, 10) + index + 1);
    });
  }

  onChange() {
    this.updateIndex();
    if (typeof this.config.onChange === "function") {
      this.config.onChange();
    }
  }

  add(entry: TEntry) {
    this.push(entry);
    this.onChange();
  }

  remove(entry: TEntry) {
    // Get the index of the entry
    const index = this.findIndex((item) => item.id === entry.id);
    if (~index) {
      // Remove the z-index styles from the entry
      entry.el.style.zIndex = "";
      // Splice the entry from the stack array
      this.splice(index, 1);
      // Run the onChange callback
      this.onChange();
    }
  }

  moveToTop(entry: TEntry) {
    // Get the index of the entry
    const index = this.findIndex((item) => item.id === entry.id);
    if (~index) {
      // Splice the entry from the stack array
      this.splice(index, 1);
      // Add entry back to the stack array
      this.add(entry);
    }
  }
}
