import { getConfig, getModifiers } from './helpers';

export function open(popover) {
  // Update state class
  popover.target.classList.add(this.settings.stateActive);

  // Update a11y attributes
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

  // Update popover's position
  popover.popper.update();

  // Update collection status with new state
  const index = this.collection.findIndex((item) => {
    return item.target === popover.target;
  });
  this.collection[index].state = 'opened';

  // Return the popover
  return popover;
}
