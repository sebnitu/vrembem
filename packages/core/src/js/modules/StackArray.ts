import type { CollectionEntry } from "../CollectionEntry";

type StackArrayConfig = {
  onChange?: () => void;
  [key: string]: any;
};

export class StackArray<TEntry extends CollectionEntry> {
  #entries: Array<TEntry>;
  config: StackArrayConfig;

  constructor(config: StackArrayConfig = {}) {
    this.#entries = [];
    this.config = config;
  }

  get copy(): TEntry[] {
    return [...this.#entries];
  }

  get top(): TEntry | null {
    const result = this.#entries[this.#entries.length - 1];
    return result ? result : null;
  }

  get length() {
    return this.#entries.length;
  }

  updateIndex() {
    this.#entries.forEach((entry, index) => {
      entry.el.style.zIndex = "";

      const computed = getComputedStyle(entry.el).getPropertyValue("z-index");
      const base = parseInt(computed, 10);
      const calculated = String((Number.isNaN(base) ? 0 : base) + index + 1);

      entry.el.style.zIndex = calculated;
    });
  }

  onChange() {
    this.updateIndex();
    if (typeof this.config.onChange === "function") {
      this.config.onChange();
    }
  }

  get(index: number) {
    return this.#entries[index];
  }

  add(entry: TEntry) {
    this.#entries.push(entry);
    this.onChange();
  }

  remove(entry: TEntry) {
    // Get the index of the entry
    const index = this.#entries.findIndex((item) => item.id === entry.id);
    if (~index) {
      // Remove the z-index styles from the entry
      entry.el.style.zIndex = "";
      // Splice the entry from the stack array
      this.#entries.splice(index, 1);
      // Run the onChange callback
      this.onChange();
    }
  }

  moveToTop(entry: TEntry) {
    // Get the index of the entry
    const index = this.#entries.findIndex((item) => item.id === entry.id);
    if (~index) {
      // Splice the entry from the stack array
      this.#entries.splice(index, 1);
      // Add entry back to the stack array
      this.add(entry);
    }
  }
}
