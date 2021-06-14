function getCSSVar(property, fallback = false, el = document.documentElement) {
  const styles = getComputedStyle(el);
  const value = styles.getPropertyValue(property).trim();
  return value ? value : fallback;
}

export function getPopover(trigger, settings) {
  return trigger.getAttribute(`data-${settings.dataTrigger}`).trim() ?
    document.querySelector(
      `[data-${settings.dataPopover}="${trigger.getAttribute(`data-${settings.dataTrigger}`)}"]`
    ) :
    trigger.nextElementSibling.hasAttribute(`data-${settings.dataPopover}`) ?
      trigger.nextElementSibling : false;
}

export function getEventType(trigger, settings) {
  return trigger.hasAttribute(`data-${settings.dataEventType}`) ?
    trigger.getAttribute(`data-${settings.dataEventType}`) :
    settings.eventType;
}

export function getPlacement(target, settings) {
  return target.hasAttribute(`data-${settings.dataPlacement}`) ?
    target.getAttribute(`data-${settings.dataPlacement}`) :
    settings.placement;
}

export function getModifiers(target) {
  return [{
    name: 'offset',
    options: {
      offset: [0, parseInt(getCSSVar('--popover-offset', 0, target), 10)]
    }
  }, {
    name: 'preventOverflow',
    options: {
      padding: parseInt(getCSSVar('--popover-offset-overflow', 0, target), 10)
    }
  }];
}
