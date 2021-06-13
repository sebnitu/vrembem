import defaults from './src/js/defaults';
import { createPopper } from '@popperjs/core/dist/esm';

// TODO: Move data attributes into defaults module
// TODO: Add placement and event type defaults
// TODO: Move feature methods into their own modules

export default class Popover {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.popovers = [];
    this.__handlerKeydown = this.handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings, ...options };

    // Initial popovers setup
    // Get all the triggers
    const popoverTriggers = document.querySelectorAll('[data-popover-trigger]');
    popoverTriggers.forEach((trigger) => {
      // Get the triggers target
      const target = this.getPopoverTarget(trigger);
      if (target) {
        // Get the placement
        const placement = this.getPlacement(target);

        // Create popper instance
        const popperInstance = createPopper(trigger, target, {
          placement: placement,
          modifiers: this.getModifiers(target)
        });

        // Build popover object and push to popovers array
        const popover = {
          state: 'hide',
          trigger: trigger,
          target: target,
          popper: popperInstance
        };
        this.popovers.push(popover);

        // Set initial state of popovers
        if (target.classList.contains(this.settings.stateActive)) {
          this.show(popover);
          this.documentListenerClick(popover);
        } else {
          this.hide(popover);
        }
      }
    });

    if (this.settings.eventListeners) {
      this.initEventListeners();
    }
  }

  destroy() {
    if (this.settings.eventListeners) {
      this.destroyEventListeners();
    }
  }

  /**
   * Event listeners
   */

  initEventListeners() {
    // Loop through popovers and setup event listeners
    this.popovers.forEach((popover, index) => {
      if (!this.popovers[index].__ref) {
        // Add event listeners based on event type
        const eventType = this.getEventType(popover.trigger);
        if (eventType === 'hover') {
          this.popovers[index].__ref = {
            __show: this.show.bind(this, popover),
            __hideCheck: this.hideCheck.bind(this, popover),
          };
          popover.trigger.addEventListener('mouseenter', this.popovers[index].__ref.__show, false);
          popover.trigger.addEventListener('focus', this.popovers[index].__ref.__show, false);
          popover.trigger.addEventListener('mouseleave', this.popovers[index].__ref.__hideCheck, false);
          popover.trigger.addEventListener('focusout', this.popovers[index].__ref.__hideCheck, false);
          popover.target.addEventListener('mouseleave', this.popovers[index].__ref.__hideCheck, false);
          popover.target.addEventListener('focusout', this.popovers[index].__ref.__hideCheck, false);
        } else {
          this.popovers[index].__ref = {
            __handlerClick: this.handlerClick.bind(this, popover),
          };
          popover.trigger.addEventListener('click', this.popovers[index].__ref.__handlerClick, false);
        }
      }
    });

    // Add keydown global event listener
    document.addEventListener('keydown', this.__handlerKeydown, false);
  }

  destroyEventListeners() {
    // Loop through popovers and remove event listeners
    this.popovers.forEach((popover, index) => {
      if (this.popovers[index].__ref) {
        // Remove event listeners based on event type
        const eventType = this.getEventType(popover.trigger);
        if (eventType === 'hover') {
          popover.trigger.removeEventListener('mouseenter', this.popovers[index].__ref.__show, false);
          popover.trigger.removeEventListener('focus', this.popovers[index].__ref.__show, false);
          popover.trigger.removeEventListener('mouseleave', this.popovers[index].__ref.__hideCheck, false);
          popover.trigger.removeEventListener('focusout', this.popovers[index].__ref.__hideCheck, false);
          popover.target.removeEventListener('mouseleave', this.popovers[index].__ref.__hideCheck, false);
          popover.target.removeEventListener('focusout', this.popovers[index].__ref.__hideCheck, false);
          delete this.popovers[index].__ref;
        } else {
          popover.trigger.removeEventListener('click', this.popovers[index].__ref.__handlerClick, false);
          delete this.popovers[index].__ref;
        }
      }
    });

    // Remove keydown global event listener
    document.removeEventListener('keydown', this.__handlerKeydown, false);
  }

  /**
   * Event handlers & listeners
   */

  handlerClick(popover) {
    if (popover.target.classList.contains(this.settings.stateActive)) {
      this.hide(popover);
    } else {
      this.show(popover);
      this.documentListenerClick(popover);
    }
  }

  handlerKeydown(event) {
    if (event.key === 'Escape') {
      this.hideAll();
    }
  }

  documentListenerClick(popover) {
    const rootThis = this;
    document.addEventListener('click', function _f(event) {
      const result = event.target.closest('[data-popover], [data-popover-trigger]');
      const match = result === popover.target || result === popover.trigger;
      if (!match) {
        rootThis.hide(popover);
        this.removeEventListener('click', _f);
      } else {
        if (!popover.target.classList.contains(rootThis.settings.stateActive)) {
          this.removeEventListener('click', _f);
        }
      }
    });
  }

  /**
   * Helpers
   */

  getCSSVar(property, fallback = false, el = document.documentElement) {
    const styles = getComputedStyle(el);
    const value = styles.getPropertyValue(property).trim();
    return value ? value : fallback;
  }

  setCSSVar(property, value, el = document.documentElement) {
    el.style.setProperty(property, value);
  }

  getPopoverTarget(trigger) {
    return trigger.getAttribute('data-popover-trigger').trim() ?
      document.querySelector(`[data-popover="${trigger.getAttribute('data-popover-trigger')}"]`) :
      trigger.nextElementSibling.hasAttribute('data-popover') ?
        trigger.nextElementSibling : false;
  }

  getEventType(trigger) {
    return trigger.hasAttribute('data-popover-event') ?
      trigger.getAttribute('data-popover-event') :
      'click';
  }

  getPlacement(popover) {
    return popover.hasAttribute('data-popover-placement') ?
      popover.getAttribute('data-popover-placement') :
      'bottom-start';
  }

  getModifiers(popover) {
    return [{
      name: 'offset',
      options: {
        offset: [0, parseInt(this.getCSSVar('--popover-offset', 0, popover), 10)]
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: parseInt(this.getCSSVar('--popover-offset-overflow', 0, popover), 10)
      }
    }];
  }

  /**
   * Show and Hide functionality
   */

  show(popover) {
    // Update state class
    popover.target.classList.add(this.settings.stateActive);

    // Update a11y attributes
    popover.trigger.setAttribute('aria-expanded', 'true');

    // Enable popper event listeners and update position
    popover.popper.setOptions({
      modifiers: [
        { name: 'eventListeners', enabled: true },
        ...this.getModifiers(popover.target)
      ]
    });
    popover.popper.update();

    // Update popovers status with new state
    const index = this.popovers.findIndex((item) => {
      return item.target === popover.target;
    });
    this.popovers[index].state = 'show';
  }

  hide(popover) {
    // Update state class
    popover.target.classList.remove(this.settings.stateActive);

    // Update a11y attributes
    popover.trigger.setAttribute('aria-expanded', 'false');

    // Disable popper event listeners
    popover.popper.setOptions({
      modifiers: [
        { name: 'eventListeners', enabled: false },
        ...this.getModifiers(popover.target)
      ]
    });

    // Update popovers status with new state
    const index = this.popovers.findIndex((item) => {
      return item.target === popover.target;
    });
    this.popovers[index].state = 'hide';
  }

  hideAll() {
    this.popovers.forEach((popover) => {
      if (popover.state === 'show') {
        this.hide(popover);
      }
    });
  }

  hideCheck(popover) {
    // setTimeout is needed to correctly check which element is currently being focused
    setTimeout(() => {
      // Check if trigger or target are being hovered
      const isHovered =
        popover.target.closest(':hover') === popover.target ||
        popover.trigger.closest(':hover') === popover.trigger;

      // Check if trigger or target are being focused
      const isFocused =
        document.activeElement.closest('[data-popover]') === popover.target ||
        document.activeElement.closest('[data-popover-trigger]') === popover.trigger;

      // Only hide popover if the trigger and target are not currently hovered or focused
      if (!isHovered && !isFocused) {
        this.hide(popover);
      }
    }, 1);
  }
}
