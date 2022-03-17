import { getPopover } from './helpers';

export async function close(query) {
  // Get the popover from collection.
  const popover = (query) ? getPopover.call(this, query) : await closeAll.call(this);

  // If a modal exists and its state is opened.
  if (popover && popover.state === 'opened') {

    // Update state class.
    popover.target.classList.remove(this.settings.stateActive);

    // Update accessibility attribute(s).
    if (popover.trigger.hasAttribute('aria-controls')) {
      popover.trigger.setAttribute('aria-expanded', 'false');
    }

    // Disable popper event listeners.
    popover.popper.setOptions({
      modifiers: [{ name: 'eventListeners', enabled: false }]
    });

    // Update popover state.
    popover.state = 'closed';

    // Clear memory if popover trigger matches the one saved in memory.
    if (popover.trigger === this.memory.trigger) {
      this.memory.trigger = null;
    }
  }

  // Return the popover.
  return popover;
}

export async function closeAll() {
  const result = [];
  await Promise.all(this.collection.map(async (popover) => {
    if (popover.state === 'opened') {
      result.push(await close.call(this, popover));
    }
  }));
  return result;
}

export function closeCheck(popover) {
  // Only run closeCheck if provided popover is currently open.
  if (popover.state != 'opened') return;

  // Needed to correctly check which element is currently being focused.
  setTimeout(() => {
    // Check if trigger or target are being hovered.
    const isHovered =
      popover.target.closest(':hover') === popover.target ||
      popover.trigger.closest(':hover') === popover.trigger;

    // Check if trigger or target are being focused.
    const isFocused = document.activeElement.closest(`#${popover.id}, [aria-controls="${popover.id}"]`);

    // Close if the trigger and target are not currently hovered or focused.
    if (!isHovered && !isFocused) {
      popover.close();
    }

    // Return the popover.
    return popover;
  }, 1);
}
