export function close(popover, obj) {
  // Update state class
  popover.target.classList.remove(obj.settings.stateActive);

  // Update a11y attributes
  popover.trigger.setAttribute('aria-expanded', 'false');

  // Disable popper event listeners
  popover.popper.setOptions({
    modifiers: [{ name: 'eventListeners', enabled: false }]
  });

  // Update collection status with new state
  const index = obj.collection.findIndex((item) => {
    return item.target === popover.target;
  });
  obj.collection[index].state = 'closed';

  // Clear the memory if popover trigger matches the ones saved in memory
  if (popover.trigger === obj.memory.trigger) {
    obj.memory.trigger = null;
  }

  // Return the popover
  return popover;
}

export function closeAll(obj) {
  obj.collection.forEach((popover) => {
    if (popover.state === 'opened') {
      close(popover, obj);
    }
  });

  // Return the collection
  return obj.collection;
}

export function closeCheck(popover, obj) {
  // Only run closeCheck if provided popover is currently open
  if (popover.state != 'opened') return;
  // Needed to correctly check which element is currently being focused
  setTimeout(() => {
    // Check if trigger or target are being hovered
    const isHovered =
      popover.target.closest(':hover') === popover.target ||
      popover.trigger.closest(':hover') === popover.trigger;

    // Check if trigger or target are being focused
    const isFocused =
      document.activeElement.closest(`[data-${obj.settings.dataPopover}]`) === popover.target ||
      document.activeElement.closest(`[data-${obj.settings.dataTrigger}]`) === popover.trigger;

    // Close if the trigger and target are not currently hovered or focused
    if (!isHovered && !isFocused) {
      close(popover, obj);
    }

    // Return the popover
    return popover;
  }, 1);
}
