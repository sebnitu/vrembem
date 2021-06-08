export async function handlerClick(event) {
  // Working catch
  if (this.working) return;

  // Trigger click
  const trigger = event.target.closest(`[data-${this.settings.dataOpen}]`);
  if (trigger) {
    event.preventDefault();
    const modalKey = trigger.getAttribute(`data-${this.settings.dataOpen}`);
    const fromModal = event.target.closest(`[data-${this.settings.dataModal}]`);
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
    event.target.hasAttribute(`data-${this.settings.dataModal}`) &&
    !event.target.hasAttribute(`data-${this.settings.dataRequired}`)
  ) {
    this.close();
    return;
  }
}

export function handlerKeydown(event) {
  // Working catch
  if (this.working) return;

  if (event.key === 'Escape') {
    const target = document.querySelector(
      `[data-${this.settings.dataModal}].${this.settings.stateOpened}`
    );
    if (target && !target.hasAttribute(`data-${this.settings.dataRequired}`)) {
      this.close();
    }
  }
}
