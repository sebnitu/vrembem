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
