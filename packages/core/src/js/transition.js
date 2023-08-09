import { getPrefix } from './getPrefix';

export function cssVar(property, el = document.body, prefix = true) {
  if (prefix) {
    const prefixValue = getPrefix();
    if (prefixValue && !property.includes(`--${prefixValue}`)) {
      property = property.replace('--', `--${prefixValue}`);
    }
  }
  const cssValue = getComputedStyle(el).getPropertyValue(property).trim();
  if (cssValue) {
    return cssValue;
  } else {
    throw new Error(`CSS variable "${property}" was not found!`);
  }
}

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
