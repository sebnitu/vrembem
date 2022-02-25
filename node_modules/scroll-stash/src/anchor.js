import { anchorPositionGet } from './anchorPosition';

export const anchorGet = (el, settings) => {
  const dataAnchor = el.getAttribute(`data-${settings.dataAnchor}`);
  if (dataAnchor == 'false' || dataAnchor == 'ignore') {
    return null;
  }

  if (dataAnchor && el.querySelector(dataAnchor)) {
    return el.querySelector(dataAnchor);
  }

  const selectorAnchor = (settings.selectorAnchor) ?
    el.querySelector(settings.selectorAnchor) : null;
  if (selectorAnchor && settings.selectorAnchorParent) {
    const parentAnchor = selectorAnchor.closest(settings.selectorAnchorParent);
    if (parentAnchor) return parentAnchor;
  }

  return (selectorAnchor) ? selectorAnchor : null;
};

export const anchorShow = (el, behavior, settings) => {
  const anchor = anchorGet(el, settings);

  if (anchor) {
    const position = anchorPositionGet(el, anchor, settings);
    if (position) {
      behavior = (behavior) ? behavior : settings.behavior;
      el.scroll({
        top: position,
        behavior: behavior
      });
      el.dispatchEvent(new CustomEvent(settings.customEventPrefix + 'anchor', {
        bubbles: true,
        detail: {
          scrolled: { value: position, behavior: behavior },
          key: el.getAttribute(`data-${settings.dataScroll}`)
        }
      }));
      return {
        scrolled: { value: position, behavior: behavior },
        msg: 'Anchor was scrolled into view'
      };
    } else {
      return { scrolled: false, msg: 'Anchor is already in view' };
    }
  } else {
    return { scrolled: false, msg: 'Anchor was not found' };
  }
};
