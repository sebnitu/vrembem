export function getConfig(el, settings) {
  // Get the computed styles of the popover
  const styles = getComputedStyle(el);

  // Setup the config obj with default values
  const config = {
    'placement': settings.placement,
    'event': settings.eventType,
    'offset': 0,
    'overflow-padding': 0,
    'flip-padding': 0
  };

  // Loop through config obj
  for (const prop in config) {
    if (Object.prototype.hasOwnProperty.call(config, prop)) {
      // Get the CSS variable property values
      const val = styles.getPropertyValue(`--popover-${prop}`).trim();
      // If a value was found, replace the default in config obj
      if (val) {
        config[prop] = val;
      }
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
  }];
}

export function getPopover(trigger, settings) {
  // Get the value of the popover trigger attribute
  const id = trigger.getAttribute(`data-${settings.dataTrigger}`).trim();
  if (id) {
    // If trigger attribute value exists, return the querySelector element using
    // the provided popover trigger attribute's value
    return document.querySelector(`[data-${settings.dataPopover}="${id}"]`);
  } else {
    // If trigger attribute value doesn't exist, check if 
    // - There is a nextElementSibling relative to the trigger
    // - And it has the popover data attribute.
    return (
      trigger.nextElementSibling &&
      trigger.nextElementSibling.hasAttribute(`data-${settings.dataPopover}`)
    ) ?
      // Return the element or false if the two checks fail
      trigger.nextElementSibling : false;
  }
}
