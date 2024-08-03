import { closeAll, closeCheck } from "./close";

export function handleClick(popover) {
  if (popover.state === "opened") {
    popover.close();
  } else {
    this.trigger = popover.trigger;
    popover.open();
    handleDocumentClick.call(this, popover);
  }
}

export function handleMouseEnter(popover) {
  // Clear any existing toggle delays.
  if (popover.toggleDelayId) {
    clearTimeout(popover.toggleDelayId);
  }

  // Remove the open/close delay if a tooltip popover is already active.
  const delay = (this.activeTooltip) ? 0 : popover.config["toggle-delay"];

  // Close any active tooltip popovers.
  if (this.activeTooltip) this.activeTooltip.close();

  // Set the toggle delay before opening the popover.
  popover.toggleDelayId = setTimeout(() => {
    // If the popover still exists, open it.
    if (popover) popover.open();
  }, delay);
}

export function handleMouseLeave(popover) {
  // Clear any existing toggle delays.
  if (popover.toggleDelayId) {
    clearTimeout(popover.toggleDelayId);
  }

  // Set the toggle delay before closing the popover.
  popover.toggleDelayId = setTimeout(() => {
    closeCheck.call(this, popover);
  }, popover.config["toggle-delay"]);
}

export function handleKeydown(event) {
  switch (event.key) {
    case "Escape":
      if (this.trigger) {
        this.trigger.focus();
      }
      closeAll.call(this);
      return;

    case "Tab":
      this.collection.forEach((popover) => {
        closeCheck.call(this, popover);
      });
      return;

    default:
      return;
  }
}

export function handleDocumentClick(popover) {
  const root = this;
  document.addEventListener("click", function _f(event) {
    // Check if a popover or its trigger was clicked.
    const wasClicked = event.target.closest(
      `#${popover.id}, [aria-controls="${popover.id}"], [aria-describedby="${popover.id}"]`
    );

    // If popover or popover trigger was clicked...
    if (wasClicked) {
      // If popover element exists and is not active...
      if (popover.el && !popover.el.classList.contains(root.settings.stateActive)) {
        this.removeEventListener("click", _f);
      }

    } else {
      // If popover element exists and is active...
      if (popover.el && popover.el.classList.contains(root.settings.stateActive)) {
        popover.close();
      }
      this.removeEventListener("click", _f);
    }
  });
}
