export const eventEmitter = {
  on(event, listener, ...args) {
    // Initialize the event if it doesn't exist
    if (!this.events[event]) {
      this.events[event] = [];
    }

    // Check if this listener already exists to prevent duplicate listeners
    const listenerExists = this.events[event].some(
      (entry) => entry.listener === listener
    );

    // Add listener to the events array
    if (!listenerExists) {
      this.events[event].push({ listener, args });
    }
  },

  off(event, listenerRef) {
    // Guard incase the event doesn't exist
    if (!this.events[event]) return;

    // Filter out the listener from the event array
    this.events[event] = this.events[event].filter(
      (entry) => entry.listener !== listenerRef
    );
  },

  async emit(event, data) {
    // If the event starts with "on":
    // - Get the third letter of the string and lowercase it
    // - Concatenate it with the rest of the string
    // e.g: "onMount" > "mount", "onRegister" > "register", etc
    event = event.startsWith("on")
      ? event.slice(2, 3).toLowerCase() + event.slice(3)
      : event;

    // Guard incase the event doesn't exist
    if (!this.events[event]) return;

    // Run all the listeners for the emitted event
    for (const { listener, args } of this.events[event]) {
      // Await each listener in case it's a promise
      await listener(data, ...args);
    }
  }
};
