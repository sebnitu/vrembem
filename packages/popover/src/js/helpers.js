export function getConfig(el, settings) {
  // Get the computed styles of the element.
  const styles = getComputedStyle(el);

  // Setup the config obj with default values.
  const config = {
    'placement': settings.placement,
    'event': settings.eventType,
    'offset': 0,
    'overflow-padding': 0,
    'flip-padding': 0,
    'arrow-element': settings.selectorArrow,
    'arrow-padding': 0
  };

  // Loop through config obj.
  for (const prop in config) {
    // Get the CSS variable property values.
    const prefix = getComputedStyle(document.body).getPropertyValue('--vrembem-variable-prefix');
    const value = styles.getPropertyValue(`--${prefix}popover-${prop}`).trim();

    // If a value was found, replace the default in config obj.
    if (value) {
      config[prop] = value;
    }
  }

  // Return the config obj.
  return config;
}

export function getPadding(value) {
  let padding;

  // Split the value by spaces if it's a string.
  const array = (typeof value === 'string') ? value.trim().split(' ') : [value];

  // Convert individual values to integers.
  array.forEach(function (item, index) {
    array[index] = parseInt(item, 10);
  });

  // Build the padding object based on the number of values passed.
  switch (array.length) {
    case 1:
      padding = array[0];
      break;
    case 2:
      padding = {
        top: array[0],
        right: array[1],
        bottom: array[0],
        left: array[1]
      };
      break;
    case 3:
      padding = {
        top: array[0],
        right: array[1],
        bottom: array[2],
        left: array[1]
      };
      break;
    case 4:
      padding = {
        top: array[0],
        right: array[1],
        bottom: array[2],
        left: array[3]
      };
      break;
    default:
      padding = false;
      break;
  }

  // Return the padding object.
  return padding;
}

export function getModifiers(options) {
  return [{
    name: 'offset',
    options: {
      offset: [0, parseInt(options['offset'], 10)]
    }
  }, {
    name: 'preventOverflow',
    options: {
      padding: getPadding(options['overflow-padding'])
    }
  }, {
    name: 'flip',
    options: {
      padding: getPadding(options['flip-padding'])
    }
  }, {
    name: 'arrow',
    options: {
      element: options['arrow-element'],
      padding: getPadding(options['arrow-padding'])
    }
  }];
}

export function getPopover(query) {
  // Get the entry from collection.
  const entry = (typeof query === 'string') ? this.get(query) : this.get(query.id);

  // Return entry if it was resolved, otherwise throw error.
  if (entry) {
    return entry;
  } else {
    throw new Error(`Popover not found in collection with id of "${query}".`);
  }
}

export function getPopoverID(obj) {
  // If it's a string, return the string.
  if (typeof obj === 'string') {
    return obj;
  }

  // If it's an HTML element.
  else if (typeof obj.hasAttribute === 'function') {
    // If it's a popover element, return the id.
    if (obj.closest(this.settings.selectorPopover)) {
      obj = obj.closest(this.settings.selectorPopover);
      return obj.id;
    }

    // If it's a popover trigger, return value of aria-controls.
    else if (obj.hasAttribute('aria-controls')) {
      return obj.getAttribute('aria-controls');
    }

    // If it's a popover tooltip trigger, return the value of aria-describedby.
    else if (obj.hasAttribute('aria-describedby')) {
      return obj.getAttribute('aria-describedby');
    }

    // Return false if no id was found.
    else return false;
  }

  // If it has an id property, return its value.
  else if (obj.id) {
    return obj.id;
  }

  // Return false if no id was found.
  else return false;
}

export function getPopoverElements(query) {
  const id = getPopoverID.call(this, query);
  if (id) {
    const popover = document.querySelector(`#${id}`);
    const trigger =
      document.querySelector(`[aria-controls="${id}"]`) ||
      document.querySelector(`[aria-describedby="${id}"]`);

    if (!trigger && !popover) {
      return { error: new Error(`No popover elements found using the ID: "${id}".`) };
    } else if (!trigger) {
      return { error: new Error('No popover trigger associated with the provided popover.') };
    } else if (!popover) {
      return { error: new Error('No popover associated with the provided popover trigger.') };
    } else {
      return { popover, trigger };
    }
  } else {
    return { error: new Error('Could not resolve the popover ID.') };
  }
}
