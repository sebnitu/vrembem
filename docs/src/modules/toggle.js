function toggle(options = {}) {
  const settings = {
    attr: 'data-toggle',
    ...options
  };

  function mount() {
    // Get all the file reference toggle buttons.
    const toggles = document.querySelectorAll(`[${settings.attr}]`);
    toggles.forEach((trigger) => {
      // Get the target element.
      const targetId = trigger.getAttribute(settings.attr);
      const target = document.getElementById(targetId);

      // Get the current state.
      let open = (trigger.getAttribute('aria-expanded') === 'true');

      // Set the event listener.
      trigger.addEventListener('click', () => {
        // Toggle the new state.
        open = !open;
        trigger.setAttribute('aria-expanded', open.toString());
        target.setAttribute('aria-hidden', (!open).toString());
      });
    });
  }

  return {
    settings,
    mount
  };
}

export { toggle };
