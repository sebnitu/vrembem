import defaults from './src/js/defaults';
import { createPopper } from '@popperjs/core/dist/esm';

// TODO:
// Handle a11y attributes for when a popover is opened or closed. E.g:
// aria-expanded="true | false" on trigger element
// aria-hidden="true | false" on popover element
// aria-labelledby="triggerID" on popover element (handled in markup)

export default class Popover {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.popovers = [];
    // this.__handlerClick = handlerClick.bind(this);
    // this.__handlerKeyup = handlerKeyup.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings, ...options };

    const popoverTriggers = document.querySelectorAll('[data-popover-trigger]');
    popoverTriggers.forEach((trigger) => {
      const target = this.getPopoverTarget(trigger);
      if (target) {
        const placement = target.hasAttribute('data-popover-placement') ?
          target.getAttribute('data-popover-placement') : 'bottom-start';

        const popperInstance = createPopper(trigger, target, {
          placement: placement,
          modifiers: this.getModifiers(target)
        });

        const popover = {
          trigger: trigger,
          target: target,
          state: 'hide',
          popper: popperInstance
        };
        this.popovers.push(popover);

        const eventType = trigger.hasAttribute('data-popover-event') ?
          trigger.getAttribute('data-popover-event') : 'click';
        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave', 'focusout'];

        if (eventType === 'hover') {
          showEvents.forEach(event => {
            trigger.addEventListener(event, this.show.bind(this, popover));
          });

          hideEvents.forEach(event => {
            trigger.addEventListener(event, this.hideCheck.bind(this, popover));
            target.addEventListener(event, this.hideCheck.bind(this, popover));
          });
        } else {
          trigger.addEventListener('click', this.handlerClick.bind(this, popover));
        }

        if (target.classList.contains(this.settings.stateActive)) {
          this.show(popover);
          this.documentListenerClick(popover);
        }
      }
    });

    document.addEventListener('keydown', this.handlerKeydown.bind(this));
  }

  destroy() {
    // TODO: Should disable popover...
  }

  /**
   * Event listeners
   */

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
      const popover = this.popovers.find((item) => {
        return item.state === 'show';
      });
      if (popover) {
        this.hide(popover);
      }
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

  getPopoverTarget(trigger) {
    return trigger.getAttribute('data-popover-trigger').trim() ?
      document.querySelector(`[data-popover="${trigger.getAttribute('data-popover-trigger')}"]`) :
      trigger.nextElementSibling.hasAttribute('data-popover') ?
        trigger.nextElementSibling : false;
  }

  getCSSVar(property, fallback = false, el = document.documentElement) {
    const styles = getComputedStyle(el);
    const value = styles.getPropertyValue(property).trim();
    return value ? value : fallback;
  }

  setCSSVar(property, value, el = document.documentElement) {
    el.style.setProperty(property, value);
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
