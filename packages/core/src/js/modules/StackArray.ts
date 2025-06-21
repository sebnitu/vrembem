import type { CollectionEntry } from "../CollectionEntry";

type StackArraySettings = {
  onChange?: () => void;
  [key: string]: any;
};

export class StackArray<
  TEntry extends CollectionEntry<any>
> extends Array<TEntry> {
  settings: StackArraySettings;

  constructor(settings: StackArraySettings = {}) {
    super();
    this.settings = settings;
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
    if (typeof this.settings.onChange === "function") {
      this.settings.onChange();
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
