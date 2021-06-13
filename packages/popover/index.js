import defaults from './src/js/defaults';
import { createPopper } from '@popperjs/core/dist/esm';

// TODO: Move data attributes into defaults module
// TODO: Add placement and event type defaults
// TODO: Move feature methods into their own modules

export default class Popover {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.collection = [];
    this.__handlerKeydown = this.handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    // Update settings with passed options
    if (options) this.settings = { ...this.settings, ...options };

    // Get all the triggers
    const popoverTriggers = document.querySelectorAll('[data-popover-trigger]');
    popoverTriggers.forEach((trigger) => {
      // Get the triggers target
      const target = this.getPopover(trigger);
      if (target) {
        // Register the popover and save to collection array
        const popover = this.register(trigger, target);
        // Set initial state of popover
        this.setState(popover);
      }
    });

    // If eventListeners is enabled and popover triggers exist on page
    if (this.settings.eventListeners && popoverTriggers.length) {
      // Setup init event listeners
      this.initEventListeners(false);
    }
  }

  destroy() {
    // Unregister all popovers from collection
    this.collection.forEach((popover) => {
      this.unregister(popover);
    });

    // Rest the collection array
    this.collection = [];

    // If eventListeners is enabled
    if (this.settings.eventListeners) {
      this.destroyEventListeners(false);
    }
  }

  /**
   *  Register popover
   */

  register(trigger, target, collection = this.collection) {
    // Check if this item has already been registered in the collection
    const index = collection.findIndex((item) => {
      return (item.trigger === trigger && item.target === target);
    });

    // Return item if it already exists in collection
    if (index >= 0) return collection[index];

    // Get the placement
    const placement = this.getPlacement(target);

    // Create popper instance
    const popperInstance = createPopper(trigger, target, {
      placement: placement,
      modifiers: this.getModifiers(target)
    });

    // Build popover object and push to collection array
    const popover = {
      state: 'hide',
      trigger: trigger,
      target: target,
      popper: popperInstance
    };

    // Setup event listeners
    if (this.settings.eventListeners) {
      this.registerEventListeners(popover);
    }

    // Add item to collection
    this.collection.push(popover);

    // Return the popover object
    return popover;
  }

  unregister(popover) {
    console.log('unregister():', popover);

    // Hide the popover
    if (popover.state === 'show') {
      this.hide(popover);
    }

    // Remove event listeners
    if (this.settings.eventListeners) {
      this.unregisterEventListeners(popover);
    }
  }

  registerEventListeners(popover) {
    // If event listeners aren't already setup
    if (!popover.__eventListeners) {
      // Add event listeners based on event type
      const eventType = this.getEventType(popover.trigger);
      if (eventType === 'hover') {
        // Setup event listeners object for hover
        popover.__eventListeners = [{
          el: ['trigger'],
          type: ['mouseenter', 'focus'],
          listener: this.show.bind(this, popover)
        }, {
          el: ['trigger', 'target'],
          type: ['mouseleave', 'focusout'],
          listener: this.hideCheck.bind(this, popover)
        }];
        // Loop through listeners and apply to appropriate elements
        popover.__eventListeners.forEach((obj) => {
          obj.el.forEach((el) => {
            obj.type.forEach((type) => {
              popover[el].addEventListener(type, obj.listener, false);
            });
          });
        });
      } else {
        // Setup event listeners object for click
        popover.__eventListeners = [{
          el: ['trigger'],
          type: ['click'],
          listener: this.handlerClick.bind(this, popover)
        }];
        // Loop through listeners and apply to appropriate elements
        popover.__eventListeners.forEach((obj) => {
          obj.el.forEach((el) => {
            obj.type.forEach((type) => {
              popover[el].addEventListener(type, obj.listener, false);
            });
          });
        });
      }
    }
  }

  unregisterEventListeners(popover) {
    // If event listeners have been setup
    if (popover.__eventListeners) {
      // Loop through listeners and remove from appropriate elements
      popover.__eventListeners.forEach((obj) => {
        obj.el.forEach((el) => {
          obj.type.forEach((type) => {
            popover[el].removeEventListener(type, obj.listener, false);
          });
        });
      });
      // Remove eventListeners object from collection
      delete popover.__eventListeners;
    }
  }

  /**
   * Event listeners
   */

  initEventListeners(collection = true) {
    if (collection) {
      // Loop through collection and setup event listeners
      this.collection.forEach((popover) => {
        this.registerEventListeners(popover);
      });
    }

    // Add keydown global event listener
    document.addEventListener('keydown', this.__handlerKeydown, false);
  }

  destroyEventListeners(collection = true) {
    if (collection) {
      // Loop through collection and remove event listeners
      this.collection.forEach((popover) => {
        this.unregisterEventListeners(popover);
      });
    }

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

  // TODO: Maybe refactor this?
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

  getPopover(trigger) {
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

  getPlacement(target) {
    return target.hasAttribute('data-popover-placement') ?
      target.getAttribute('data-popover-placement') :
      'bottom-start';
  }

  getModifiers(target) {
    return [{
      name: 'offset',
      options: {
        offset: [0, parseInt(this.getCSSVar('--popover-offset', 0, target), 10)]
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: parseInt(this.getCSSVar('--popover-offset-overflow', 0, target), 10)
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

    // Update collection status with new state
    const index = this.collection.findIndex((item) => {
      return item.target === popover.target;
    });
    this.collection[index].state = 'show';
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

    // Update collection status with new state
    const index = this.collection.findIndex((item) => {
      return item.target === popover.target;
    });
    this.collection[index].state = 'hide';
  }

  hideAll() {
    this.collection.forEach((popover) => {
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

  setState(popover) {
    if (popover.target.classList.contains(this.settings.stateActive)) {
      this.show(popover);
      this.documentListenerClick(popover);
    } else {
      this.hide(popover);
    }
  }
}
