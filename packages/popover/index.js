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
        const placement = this.getPlacement(target);
        const popperInstance = createPopper(trigger, target, {
          placement: placement,
          modifiers: this.getModifiers(target)
        });

        // Build popover object and push to popovers array
        const popover = {
          trigger: trigger,
          target: target,
          state: 'hide',
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

    // Loop through popovers and setup event listeners
    this.popovers.forEach((popover) => {
      // Add event listeners based on event type
      // TODO: Move into if (this.settings.eventListeners) conditional and add eventListeners to default options
      const eventType = this.getEventType(popover.trigger);
      if (eventType === 'hover') {
        popover.trigger.addEventListener('mouseenter', this.show.bind(this, popover), false);
        popover.trigger.addEventListener('focus', this.show.bind(this, popover), false);
        popover.trigger.addEventListener('mouseleave', this.hideCheck.bind(this, popover), false);
        popover.trigger.addEventListener('focusout', this.hideCheck.bind(this, popover), false);
        popover.target.addEventListener('mouseleave', this.hideCheck.bind(this, popover), false);
        popover.target.addEventListener('focusout', this.hideCheck.bind(this, popover), false);
      } else {
        popover.trigger.addEventListener('click', this.handlerClick.bind(this, popover), false);
      }
    });

    // Add keydown global event listener
    document.addEventListener('keydown', this.__handlerKeydown, false);
  }

  destroy() {
    // Remove keydown global event listener
    document.removeEventListener('keydown', this.__handlerKeydown, false);
  }

  /**
   * Event listeners
   */

  // TODO: Move event listeners to these init and destroy methods

  initEventListeners() {
    // document.addEventListener('click', this.__handlerClick, false);
    // document.addEventListener('touchend', this.__handlerClick, false);
    // document.addEventListener('keyup', this.__handlerKeyup, false);
  }

  destroyEventListeners() {
    // document.removeEventListener('click', this.__handlerClick, false);
    // document.removeEventListener('touchend', this.__handlerClick, false);
    // document.removeEventListener('keyup', this.__handlerKeyup, false);
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
