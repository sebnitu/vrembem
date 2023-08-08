export function getInitialState(entry) {
  if (entry.store === 'opened') {
    return 'opened';
  } else if (entry.store === 'closed') {
    return 'closed';
  } else if (entry.store === 'indeterminate') {
    return 'indeterminate';
  } else {
    if (entry.el.classList.contains(entry.getSetting('stateOpened'))) {
      return 'opened';
    } else if (entry.el.classList.contains(entry.getSetting('stateClosed'))) {
      return 'closed';
    } else {
      return 'indeterminate';
    }
  }
}
