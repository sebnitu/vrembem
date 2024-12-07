const settings = {
  attr: "data-toggle"
};

const toggle = {
  open(id) {
    const trigger = document.querySelector(`#toggle-${id}-trigger`);
    const targetId = trigger.getAttribute(settings.attr);
    const target = document.getElementById(targetId);

    trigger.setAttribute("aria-expanded", "true");
    target.setAttribute("aria-hidden", "false");
  },

  close(id) {
    const trigger = document.querySelector(`#toggle-${id}-trigger`);
    const targetId = trigger.getAttribute(settings.attr);
    const target = document.getElementById(targetId);

    trigger.setAttribute("aria-expanded", "false");
    target.setAttribute("aria-hidden", "true");
  },

  mount() {
    // Get all the file reference toggle buttons
    const toggles = document.querySelectorAll(`[${settings.attr}]`);
    toggles.forEach((trigger) => {
      // Get the target element
      const targetId = trigger.getAttribute(settings.attr);
      const target = document.getElementById(targetId);

      // Set the event listener
      trigger.addEventListener("click", () => {
        // Toggle the new state
        const open = !(trigger.getAttribute("aria-expanded") === "true");
        trigger.setAttribute("aria-expanded", open.toString());
        target.setAttribute("aria-hidden", (!open).toString());
      });
    });
  }
};

export { toggle };
