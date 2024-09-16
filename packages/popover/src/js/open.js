import { getConfig, getModifiers, getPopover } from "./helpers";

export async function open(query) {
  // Get the popover from collection.
  const popover = getPopover.call(this, query);

  // Update state class.
  popover.el.classList.add(this.settings.stateActive);

  // Update accessibility attribute(s).
  if (popover.trigger.hasAttribute("aria-controls")) {
    popover.trigger.setAttribute("aria-expanded", "true");
  }

  // Update popover config.
  popover.config = getConfig(popover.el, this.settings);

  // Enable popper event listeners and set placement/modifiers.
  popover.popper.setOptions({
    placement: popover.config["placement"],
    modifiers: [
      { name: "eventListeners", enabled: true },
      ...getModifiers(popover.config)
    ]
  });

  // Update popover position.
  popover.popper.update();

  // Update popover state.
  popover.state = "opened";

  // Return the popover.
  return popover;
}
