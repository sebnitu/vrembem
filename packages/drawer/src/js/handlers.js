export function handlerClick(event) {
  // Toggle data trigger
  let trigger = event.target.closest(`[data-${this.settings.dataToggle}]`);
  if (trigger) {
    const selector = trigger.getAttribute(`data-${this.settings.dataToggle}`);
    this.memory.trigger = trigger;
    this.toggle(selector);
    event.preventDefault();
    return;
  }

  // Open data trigger
  trigger = event.target.closest(`[data-${this.settings.dataOpen}]`);
  if (trigger) {
    const selector = trigger.getAttribute(`data-${this.settings.dataOpen}`);
    this.memory.trigger = trigger;
    this.open(selector);
    event.preventDefault();
    return;
  }

  // Close data trigger
  trigger = event.target.closest(`[data-${this.settings.dataClose}]`);
  if (trigger) {
    const selector = trigger.getAttribute(`data-${this.settings.dataClose}`);
    if (selector) {
      this.memory.trigger = trigger;
      this.close(selector);
    } else {
      const target = event.target.closest(`[data-${this.settings.dataDrawer}]`);
      if (target) this.close(target);
    }
    event.preventDefault();
    return;
  }

  // Screen modal trigger
  if (event.target.hasAttribute(`data-${this.settings.dataDrawer}`)) {
    this.close(event.target);
    return;
  }
}

export function handlerKeydown(event) {
  if (event.key === 'Escape') {
    const target = document.querySelector(
      `.${this.settings.classModal}.${this.settings.stateOpened}`
    );
    if (target) {
      this.close(target);
    }
  }
}
