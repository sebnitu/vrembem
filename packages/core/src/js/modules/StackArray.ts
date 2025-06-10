type StackArraySettings = {
  onChange?: () => void;
  [key: string]: any;
};

type StackArrayEntry = {
  id: string;
  el: HTMLElement;
  [key: string]: any;
};

export class StackArray extends Array<StackArrayEntry> {
  settings: StackArraySettings;

  constructor(settings: StackArraySettings = {}) {
    super();
    this.settings = settings;
  }

  get copy() {
    return [...this];
  }

  get top() {
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

  add(entry: StackArrayEntry) {
    this.push(entry);
    this.onChange();
  }

  remove(entry: StackArrayEntry) {
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

  moveToTop(entry: StackArrayEntry) {
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
