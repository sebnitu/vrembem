export async function handlerClick(event) {
  if (this.busy) return;

  // Trigger click
  const trigger = event.target.closest(`[data-${this.settings.dataOpen}]`);
  if (trigger) {
    event.preventDefault();
    const modalKey = trigger.getAttribute(`data-${this.settings.dataOpen}`);
    const fromModal = event.target.closest(this.settings.selectorModal);
    if (!fromModal) this.memory.trigger = trigger;
    await this.close(!fromModal);
    this.open(modalKey);
    return;
  }

  // Close click
  if (event.target.closest(`[data-${this.settings.dataClose}]`)) {
    event.preventDefault();
    this.close();
    return;
  }

  // Root click
  if (
    event.target === event.target.closest(this.settings.selectorModal) &&
    !event.target.hasAttribute(`data-${this.settings.dataRequired}`)
  ) {
    this.close();
    return;
  }
}

export function handlerKeydown(event) {
  if (this.busy) return;

  if (event.key === 'Escape') {
    const target = document.querySelector(
      `${this.settings.selectorModal}.${this.settings.stateOpened}`
    );
    if (target && !target.hasAttribute(`data-${this.settings.dataRequired}`)) {
      this.close();
    }
  }
}
