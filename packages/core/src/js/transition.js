import { cssVar } from './cssVar';

function getTimeValue(value, el) {
  // If duration is a string, query for the css var value.
  if (typeof value === 'string') {
    const cssValue = cssVar(value, el);
    // Convert value to ms if needed.
    const ms = (cssValue.includes('ms')) ? true : false;
    return parseFloat(cssValue) * ((ms) ? 1 : 1000);
  } else {
    return value;
  }
}

export function transition(el, from, to, duration = '--transition-duration') {
  return new Promise((resolve) => {
    // If duration is a string, query for the css var value.
    duration = getTimeValue(duration, el);

    // Toggle classes for start of transition.
    el.classList.remove(from.finish);
    el.classList.add(to.start);

    // Setup the transition timing.
    setTimeout(() => {
      // Toggle classes for end of transition.
      el.classList.add(to.finish);
      el.classList.remove(to.start);

      // Resolve the promise.
      resolve(el);
    }, duration);
  });
}

export function transitionListener(el, from, to, timeout = false) {
  return new Promise((resolve) => {
    // If timeout is a string, query for the css var value.
    timeout = getTimeValue(timeout, el);

    // Toggle classes for start of transition.
    el.classList.remove(from.finish);
    el.classList.add(to.start);

    // Add event listener for when the transition is finished.
    el.addEventListener('transitionend', function _f(event) {
      // Prevent child transition bubbling from firing this event.
      // If it is the correct element, remove the event listener.
      if (event.target === el) {
        this.removeEventListener('transitionend', _f);
      } else { return; }

      // Toggle classes for end of transition.
      el.classList.add(to.finish);
      el.classList.remove(to.start);

      // Resolve the promise.
      resolve(el);
    });

    // Setup timeout is enabled, set it up and trigger the transitionend event.
    if (timeout) {
      setTimeout(() => {
        el.dispatchEvent(new CustomEvent('transitionend'));
      }, timeout);
    }
  });
}

export const openTransition = (el, settings) => {
  return new Promise((resolve) => {
    // Check if transitions are enabled.
    if (settings.transition) {
      // Toggle classes for opening transition.
      el.classList.remove(settings.stateClosed);
      el.classList.add(settings.stateOpening);

      // Add event listener for when the transition is finished.
      el.addEventListener('transitionend', function _f(event) {
        // Prevent child transition bubbling from firing this event.
        if (event.target != el) return;

        // Toggle final opened state classes.
        el.classList.add(settings.stateOpened);
        el.classList.remove(settings.stateOpening);

        // Resolve the promise and remove the event listener.
        resolve(el);
        this.removeEventListener('transitionend', _f);
      });
    } else {
      // Toggle final opened state classes and resolve the promise.
      el.classList.add(settings.stateOpened);
      el.classList.remove(settings.stateClosed);
      resolve(el);
    }
  });
};

export const closeTransition = (el, settings) => {
  return new Promise((resolve) => {
    // Check if transitions are enabled.
    if (settings.transition) {
      // Toggle classes for closing transition.
      el.classList.add(settings.stateClosing);
      el.classList.remove(settings.stateOpened);

      // Add event listener for when the transition is finished.
      el.addEventListener('transitionend', function _f(event) {
        // Prevent child transition bubbling from firing this event.
        if (event.target != el) return;

        // Toggle final closed state classes.
        el.classList.remove(settings.stateClosing);
        el.classList.add(settings.stateClosed);

        // Resolve the promise and remove the event listener.
        resolve(el);
        this.removeEventListener('transitionend', _f);
      });
    } else {
      // Toggle final closed state classes and resolve the promise.
      el.classList.add(settings.stateClosed);
      el.classList.remove(settings.stateOpened);
      resolve(el);
    }
  });
};
