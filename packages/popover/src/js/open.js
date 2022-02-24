import { getConfig, getModifiers } from './helpers';

export function open(popover) {
  // Update state class
  popover.target.classList.add(this.settings.stateActive);

  // Update a11y attribute
  popover.trigger.setAttribute('aria-expanded', 'true');

  // Update popover config
  popover.config = getConfig(popover.target, this.settings);

  // Enable popper event listeners and set placement/modifiers
  popover.popper.setOptions({
    placement: popover.config['placement'],
    modifiers: [
      { name: 'eventListeners', enabled: true },
      ...getModifiers(popover.config)
    ]
  });

  // Update popover position
  popover.popper.update();

  // Update popover state
  popover.state = 'opened';

  // Return the popover
  return popover;
}
