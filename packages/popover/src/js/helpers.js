function getStyle(el, property, fallback = null) {
  const styles = getComputedStyle(el);
  const value = styles.getPropertyValue(property).trim();
  return value ? value : fallback;
}

function getData(el, attr, fallback = null) {
  return el.hasAttribute(`data-${attr}`) ?
    el.getAttribute(`data-${attr}`) :
    fallback;
}

function getOption(el, data, style, fallback) {
  let result = null;
  // Option priority
  // 1. Check the data attribute
  result = getData(el, data);
  if (result) return result;
  // 2. Check the CSS variable
  result = getStyle(el, style);
  if (result) return result;
  // 3. Return the fallback
  return fallback;
}

export function getPadding(value) {
  let padding;
  // Split the value by spaces
  const array = value.trim().split(' ');

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
        left: array[1],
      };
      break;
    case 3:
      padding = {
        top: array[0],
        right: array[1],
        bottom: array[2],
        left: array[1],
      };
      break;
    case 4:
      padding = {
        top: array[0],
        right: array[1],
        bottom: array[2],
        left: array[3],
      };
      break;
    default:
      padding = false;
      break;
  }

  // Return the padding object
  return padding;
}

export function getEventType(el, settings) {
  return getOption(el, settings.dataEventType, '--popover-event', settings.eventType);
}

export function getPlacement(el, settings) {
  return getOption(el, settings.dataPlacement, '--popover-placement', settings.placement);
}

export function getModifiers(target) {
  return [{
    name: 'offset',
    options: {
      offset: [0, parseInt(getStyle(target, '--popover-offset', 0), 10)]
    }
  }, {
    name: 'preventOverflow',
    options: {
      padding: getPadding(getStyle(target, '--popover-overflow-padding', '0'))
    }
  }, {
    name: 'flip',
    options: {
      padding: getPadding(getStyle(target, '--popover-flip-padding', '0'))
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
