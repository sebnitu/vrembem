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
