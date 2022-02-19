import { getConfig, getData, getModifiers } from './helpers';

export function open(popover, obj) {
  // Update state class
  popover.target.classList.add(obj.settings.stateActive);

  // Update a11y attributes
  popover.trigger.setAttribute('aria-expanded', 'true');

  // Update popover config
  popover.config = getConfig(popover.target, obj.settings);

  // Enable popper event listeners and set placement/modifiers
  popover.popper.setOptions({
    placement: getData(
      popover.target, obj.settings.dataPlacement, popover.config['placement']
    ),
    modifiers: [
      { name: 'eventListeners', enabled: true },
      ...getModifiers(popover.config)
    ]
  });

  // Update popover's position
  popover.popper.update();

  // Update collection status with new state
  const index = obj.collection.findIndex((item) => {
    return item.target === popover.target;
  });
  obj.collection[index].state = 'opened';

  // Return the popover
  return popover;
}
