import { cssVar } from './cssVar';

export function transition(el, from, to, duration = '--transition-duration') {
  return new Promise((resolve) => {
    if (typeof duration === 'string') {
      const cssValue = cssVar(duration, el);
      const ms = (cssValue.includes('ms')) ? true : false;
      duration = parseFloat(cssValue) * ((ms) ? 1 : 1000);
    }

    el.classList.remove(from.finish);
    el.classList.add(to.start);

    setTimeout(() => {
      el.classList.add(to.finish);
      el.classList.remove(to.start);
      resolve(el);
    }, duration);
  });
}

export function transitionListener(el, from, to, timeout = 1000) {
  return new Promise((resolve) => {
    // Initialize transition state var.
    let fin = false;

    // Toggle classes for start of transition.
    el.classList.remove(from.finish);
    el.classList.add(to.start);

    // Add event listener for when the transition is finished.
    el.addEventListener('transitionend', function _f(event) {
      // Prevent child transition bubbling from firing this event.
      if (event.target != el) return;

      // Toggle classes for end of transition.
      el.classList.add(to.finish);
      el.classList.remove(to.start);

      // Resolve the promise and remove the event listener.
      resolve(el);
      this.removeEventListener('transitionend', _f);
      fin = true;
    });

    // Setup a timeout reset to dispatch the transitionend event if it hasn't
    // finished by the timeout duration.
    setTimeout(() => {
      if (!fin) {
        el.dispatchEvent(new CustomEvent('transitionend'));
      }
    }, timeout);
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
