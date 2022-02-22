export function getConfig(el, settings) {
  // Get the computed styles of the popover
  const styles = getComputedStyle(el);

  // Setup the config obj with default values
  const config = {
    'placement': settings.placement,
    'event': settings.eventType,
    'offset': 0,
    'overflow-padding': 0,
    'flip-padding': 0,
    'arrow-element': `[data-${settings.dataArrow}]`,
    'arrow-padding': 0
  };

  // Loop through config obj
  for (const prop in config) {
    // Get the CSS variable property values
    const prefix = getComputedStyle(document.body).getPropertyValue('--vrembem-variable-prefix');
    const val = styles.getPropertyValue(`--${prefix}popover-${prop}`).trim();
    // If a value was found, replace the default in config obj
    if (val) {
      config[prop] = val;
    }
  }

  // Return the config obj
  return config;
}

export function getData(el, attr, fallback = false) {
  return el.hasAttribute(`data-${attr}`) ?
    el.getAttribute(`data-${attr}`) :
    fallback;
}

export function getPadding(value) {
  let padding;

  // Split the value by spaces if it's a string
  const array = (typeof value === 'string') ? value.trim().split(' ') : [value];

  // Convert individual values to integers
  array.forEach(function (item, index) {
    array[index] = parseInt(item, 10);
  });

  // Build the padding object based on the number of values passed
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

  // Return the padding object
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

export function getPopoverID(obj) {
  if (typeof obj === 'string') {
    return obj;
  } else if (obj.id) {
    return obj.id;
  } else if (obj.hasAttribute(`data-${this.settings.dataTrigger}`)) {
    return obj.getAttribute('aria-controls');
  }
}

export function getPopoverElements(query) {
  const id = getPopoverID.call(this, query);
  const trigger = document.querySelector(`[aria-controls="${id}"]`);
  const target = document.querySelector(`#${id}`);

  if (!trigger && !target) {
    console.error('No popover elements found using the provided ID:', id);
  } else if (!trigger) {
    console.error('No popover trigger associated with the provided popover:', target);
  } else if (!target) {
    console.error('No popover associated with the provided popover trigger:', trigger);
  }

  if (!trigger || !target) {
    return false;
  } else {
    return { trigger, target };
  }
}
