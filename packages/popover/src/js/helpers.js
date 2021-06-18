function getCSSVar(property, fallback, el = document.documentElement) {
  const styles = getComputedStyle(el);
  const value = styles.getPropertyValue(property).trim();
  return value ? value : fallback;
}

export function getDataValue(el, data, fallback = null) {
  return el.hasAttribute(`data-${data}`) ?
    el.getAttribute(`data-${data}`) :
    fallback;
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

export function getPopover(trigger, settings) {
  return trigger.getAttribute(`data-${settings.dataTrigger}`).trim() ?
    document.querySelector(
      `[data-${settings.dataPopover}="${trigger.getAttribute(`data-${settings.dataTrigger}`)}"]`
    ) : (
      trigger.nextElementSibling &&
      trigger.nextElementSibling.hasAttribute(`data-${settings.dataPopover}`)
    ) ?
      trigger.nextElementSibling : false;
}
