export async function applyInlineState(entry) {
  if (entry.store === 'opened') {
    await entry.open(false, false);
  } else if (entry.store === 'closed') {
    await entry.close(false, false);
  } else if (entry.store === 'indeterminate') {
    entry.el.classList.remove(entry.getSetting('stateOpened'));
    entry.el.classList.remove(entry.getSetting('stateClosed'));
    entry.state = 'indeterminate';
  } else {
    entry.state = entry.inlineState;
    if (entry.inlineState === 'opened') {
      await entry.open(false, false);
    } else if (entry.inlineState === 'closed') {
      await entry.close(false, false);
    } else if (entry.inlineState === 'indeterminate') {
      entry.el.classList.remove(entry.getSetting('stateOpened'));
      entry.el.classList.remove(entry.getSetting('stateClosed'));
    }
  }
}
