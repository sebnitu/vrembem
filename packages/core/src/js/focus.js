export const focusTarget = (target, settings) => {
  const innerFocus = target.querySelector(
    `[data-${settings.dataFocus}]`
  );
  if (innerFocus) {
    innerFocus.focus();
  } else {
    const dialog = target.querySelector(
      `[data-${settings.dataDialog}][tabindex="-1"]`
    );
    if (dialog) {
      dialog.focus();
    }
  }
};

export const focusTrigger = (obj = null) => {
  if (obj.memory.trigger) {
    obj.memory.trigger.focus();
    obj.memory.trigger = null;
  }
};

/**
 * Focus trap functionality
 */

export const getFocusable = (target) => {
  const focusable = [];
  const scrollPos = target.scrollTop;
  const items = target.querySelectorAll(`
    a[href]:not([disabled]),
    button:not([disabled]),
    textarea:not([disabled]),
    input[type="text"]:not([disabled]),
    input[type="radio"]:not([disabled]),
    input[type="checkbox"]:not([disabled]),
    select:not([disabled]),
    [tabindex]:not([tabindex="-1"])
  `);
  items.forEach((el) => {
    el.focus();
    if (el === document.activeElement) {
      focusable.push(el);
    }
  });
  target.scrollTop = scrollPos;
  return focusable;
};
