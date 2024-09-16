import { getPopoverConfig, getModifiers, getPopover } from "./helpers";

export async function open(query) {
  // Get the popover from collection.
  const popover = getPopover.call(this, query);

  // Update inert state and state class.
  popover.el.inert = false;
  popover.el.classList.add(this.settings.stateActive);

  // Update accessibility attribute(s).
  if (!popover.isTooltip) {
    popover.trigger.setAttribute("aria-expanded", "true");
  }

  // Update popover config.
  popover.settings = getPopoverConfig(popover.el, this.settings);

  // Enable popper event listeners and set placement/modifiers.
  popover.popper.setOptions({
    placement: popover.settings["placement"],
    modifiers: [
      { name: "eventListeners", enabled: true },
      ...getModifiers(popover.settings)
    ]
  });

  // Update popover position.
  popover.popper.update();

  // Update popover state.
  popover.state = "opened";

  // Return the popover.
  return popover;
}
