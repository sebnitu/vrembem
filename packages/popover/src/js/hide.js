import { getModifiers } from './helpers';

export function hide(popover, obj) {
  // Update state class
  popover.target.classList.remove(obj.settings.stateActive);

  // Update a11y attributes
  popover.trigger.setAttribute('aria-expanded', 'false');

  // Disable popper event listeners
  popover.popper.setOptions({
    modifiers: [
      { name: 'eventListeners', enabled: false },
      ...getModifiers(popover.target)
    ]
  });

  // Update collection status with new state
  const index = obj.collection.findIndex((item) => {
    return item.target === popover.target;
  });
  obj.collection[index].state = 'hide';

  // Return the popover
  return popover;
}

export function hideAll(obj) {
  obj.collection.forEach((popover) => {
    if (popover.state === 'show') {
      hide(popover, obj);
    }
  });

  // Return the collection
  return obj.collection;
}

export function hideCheck(popover, obj) {
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

    // Hide if the trigger and target are not currently hovered or focused
    if (!isHovered && !isFocused) {
      hide(popover, obj);
    }

    // Return the popover
    return popover;
  }, 1);
}
