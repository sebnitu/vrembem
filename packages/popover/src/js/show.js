import { getModifiers } from './helpers';

export function show(popover, obj) {
  // Update state class
  popover.target.classList.add(obj.settings.stateActive);

  // Update a11y attributes
  popover.trigger.setAttribute('aria-expanded', 'true');

  // Enable popper event listeners and update position
  popover.popper.setOptions({
    modifiers: [
      { name: 'eventListeners', enabled: true },
      ...getModifiers(popover.target)
    ]
  });
  popover.popper.update();

  // Update collection status with new state
  const index = obj.collection.findIndex((item) => {
    return item.target === popover.target;
  });
  obj.collection[index].state = 'show';
}
