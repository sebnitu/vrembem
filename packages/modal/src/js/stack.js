import { updateGlobalState } from "@vrembem/core";

export function stack(settings) {

  const stackArray = [];

  return {
    get value() {
      return [...stackArray];
    },

    get top() {
      const result = stackArray[stackArray.length - 1];
      return (result) ? result : null;
    },

    updateIndex() {
      stackArray.forEach((entry, index) => {
        entry.el.style.zIndex = null;
        const value = getComputedStyle(entry.el)["z-index"];
        entry.el.style.zIndex = parseInt(value) + index + 1;
      });
    },

    updateGlobalState() {
      updateGlobalState(this.top, settings.selectorInert, settings.selectorOverflow);
      this.updateIndex();
    },

    add(entry) {
      // Apply z-index styles based on stack length.
      entry.el.style.zIndex = null;
      const value = getComputedStyle(entry.el)["z-index"];
      entry.el.style.zIndex = parseInt(value) + stackArray.length + 1;

      // Move back to end of stack.
      stackArray.push(entry);

      // Update the global state.
      this.updateGlobalState();
    },

    remove(entry) {
      // Get the index of the entry.
      const index = stackArray.findIndex((item) => {
        return (item.id === entry.id);
      });

      // If entry is in stack...
      if (index >= 0) {
        // Remove z-index styles.
        entry.el.style.zIndex = null;

        // Remove entry from stack array.
        stackArray.splice(index, 1);

        // Update the global state.
        this.updateGlobalState();
      }
    },

    moveToTop(entry) {
      // Get the index of the entry.
      const index = stackArray.findIndex((item) => {
        return (item.id === entry.id);
      });

      // If entry is in stack...
      if (index >= 0) {
        // Remove entry from stack array.
        stackArray.splice(index, 1);

        // Add entry back to top of stack.
        this.add(entry);
      }
    }
  };
}
