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
      padding: parseInt(getStyle(target, '--popover-overflow-padding', 0), 10)
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
