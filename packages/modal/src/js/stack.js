import { updateGlobalState } from '@vrembem/core/index';
import { updateStackIndex } from './helpers';

export function stack(settings) {

  const stackArray = [];

  return {
    get value() {
      return stackArray;
    },

    get last() {
      return stackArray[stackArray.length - 1];
    }

    update() {
      updateGlobalState(this.last, settings);
      updateStackIndex(stackArray);
    },

    add(entry) {
      // Move back to end of stack.
      stackArray.push(entry);

      // Update the global state.
      this.update();
    },

    remove(entry) {
      // Get index of modal in stack array.
      const index = stackArray.findIndex((item) => {
        return (item.id === entry.id);
      });

      // If entry is in stack...
      if (index >= 0) {
        // Remove entry from stack array.
        stackArray.splice(index, 1);

        // Update the global state.
        this.update();
      }
    },

    maybeAdd(entry) {
      // Check if modal is already in the stack.
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
  }
}
