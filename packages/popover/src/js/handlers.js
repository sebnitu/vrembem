import { getDelay } from "./helpers";
import { closeAll, closeCheck } from "./close";

export function handleClick(popover) {
  if (popover.state === "opened") {
    popover.close();
  } else {
    this.trigger = popover.trigger;
    popover.open();
  }
}

export function handleTooltipClick(popover) {
  if (popover.isTooltip) {
    if (popover.toggleDelayId) {
      clearTimeout(popover.toggleDelayId);
    }
    popover.close();
  }
}

export function handleMouseEnter(popover, event) {
  // Store our hover state
  popover.isHovered = event;

  // Guard to ensure only focus-visible triggers the tooltip on focus events
  if (event.type == "focus" && !popover.trigger.matches(":focus-visible")) {
    return;
  }

  // Clear any existing toggle delays
  if (popover.toggleDelayId) {
    clearTimeout(popover.toggleDelayId);
  }

  // Guard to ensure a popover is not already open for this trigger
  const isExpanded = popover.trigger.getAttribute("aria-expanded");
  if (isExpanded && isExpanded == "true") return;

  // Remove the open delay if a hover popover is already active
  const delay = this.activeHover ? 0 : getDelay(popover, 0);

  // Close any active hover popovers
  if (this.activeHover) this.activeHover.close();

  // Set the toggle delay before opening the popover
  popover.toggleDelayId = setTimeout(() => {
    // If the popover still exists, open it
    if (popover.id) popover.open();
  }, delay);
}

export function handleMouseLeave(popover, event) {
  // Add a tiny delay to ensure hover isn't being moved to the popover element
  setTimeout(() => {
    // Update our hover state
    popover.isHovered = event;

    // Guard to prevent closing popover if either elements are being hovered
    if (popover.isHovered) return;

    // Clear any existing toggle delays
    if (popover.toggleDelayId) {
      clearTimeout(popover.toggleDelayId);
    }

    // Set the toggle delay before closing the popover
    popover.toggleDelayId = setTimeout(
      () => {
        closeCheck.call(this, popover);
      },
      getDelay(popover, 1)
    );
  }, 1);
}

export function handleKeydown(event) {
  switch (event.key) {
    case "Escape":
      if (this.trigger) {
        this.trigger.focus();
      }
      closeAll(this);
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
    // Check if a popover or its trigger was clicked
    const wasClicked = event.target.closest(
      `#${popover.id}, [aria-controls="${popover.id}"], [aria-describedby="${popover.id}"]`
    );

    // If popover or popover trigger was clicked...
    if (wasClicked) {
      // If popover element exists and is not active...
      if (
        popover.el &&
        !popover.el.classList.contains(root.settings.stateActive)
      ) {
        this.removeEventListener("click", _f);
      }
    } else {
      // If popover element exists and is active...
      if (
        popover.el &&
        popover.el.classList.contains(root.settings.stateActive)
      ) {
        popover.close();
      }
      this.removeEventListener("click", _f);
    }
  });
}
