export async function applyInitialState(entry) {
  if (entry.store === 'opened') {
    await entry.open(false, false);
  } else if (entry.store === 'closed') {
    await entry.close(false, false);
  } else if (entry.store === 'indeterminate') {
    entry.el.classList.remove(entry.getSetting('stateOpened'));
    entry.el.classList.remove(entry.getSetting('stateClosed'));
    entry.state = 'indeterminate';
  } else {
    if (entry.el.classList.contains(entry.getSetting('stateOpened'))) {
      await entry.open(false, false);
    } else if (entry.el.classList.contains(entry.getSetting('stateClosed'))) {
      await entry.close(false, false);
    } else {
      entry.state = 'indeterminate';
    }
  }
}
