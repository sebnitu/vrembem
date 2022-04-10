export async function sync(entry) {
  console.log('sync()...', entry.id, this);

  if (entry.mode === 'modal') {
    entry.el.classList.add(this.settings.classModal);
  } else {
    entry.el.classList.remove(this.settings.classModal);
  }

  if (entry.state === 'opened') {
    entry.el.classList.remove(this.settings.stateClosed);
    entry.el.classList.add(this.settings.stateOpened);
  } else if (entry.state === 'closed') {
    entry.el.classList.add(this.settings.stateClosed);
    entry.el.classList.remove(this.settings.stateOpened);
  }

  return entry;
}
