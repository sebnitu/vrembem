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
    console.log(createPopper);

    const popoverTriggers = document.querySelectorAll('[data-popover-trigger]');
    popoverTriggers.forEach((trigger) => {
      const target = this.getPopoverTarget(trigger);
      if (target) {
        const placement = target.hasAttribute('data-popover-placement') ?
          target.getAttribute('data-popover-placement') : 'bottom-start';
        const modifiers = [
          {
            name: 'offset',
            options: {
              offset: [0, parseInt(this.getCSSVar('--popover-offset', 0, target), 10)]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              padding: parseInt(this.getCSSVar('--popover-offset-overflow', 0, target), 10)
            }
          }
        ];

        const popperInstance = createPopper(trigger, target, {
          placement: placement,
          modifiers: modifiers
        });

        const popover = {
          trigger: trigger,
          target: target,
          state: 'hide',
          popper: popperInstance,
          modifiers: modifiers
        };

        this.popovers.push(popover);

        const eventType = trigger.hasAttribute('data-popover-event') ?
          trigger.getAttribute('data-popover-event') : 'click';
        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave', 'focusout'];

        if (eventType === 'hover') {
          showEvents.forEach(event => {
            trigger.addEventListener(event, this.showPopover.bind(this, popover));
          });

          hideEvents.forEach(event => {
            trigger.addEventListener(event, this.maybeHidePopover.bind(this, popover));
            target.addEventListener(event, this.maybeHidePopover.bind(this, popover));
          });
        } else {
          trigger.addEventListener('click', this.clickHandler.bind(this, popover));
        }

        if (target.classList.contains('is-active')) {
          this.showPopover(popover);
          this.documentClickListener(popover);
        }
      }
    });

    document.addEventListener('keydown', this.documentKeyListener.bind(this));
  }

  destroy() {
    // TODO: Should disable popper...
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

  clickHandler(popover) {
    if (popover.target.classList.contains('is-active')) {
      this.hidePopover(popover);
    } else {
      this.showPopover(popover);
      this.documentClickListener(popover);
    }
  }

  documentClickListener(popover) {
    const rootThis = this;
    document.addEventListener('click', function _f(event) {
      const result = event.target.closest('[data-popover], [data-popover-trigger]');
      const match = result === popover.target || result === popover.trigger;
      if (!match) {
        rootThis.hidePopover(popover);
        this.removeEventListener('click', _f);
      } else {
        if (!popover.target.classList.contains('is-active')) {
          this.removeEventListener('click', _f);
        }
      }
    });
  }

  documentKeyListener(event) {
    if (event.key === 'Escape') {
      const popover = this.popovers.find((item) => {
        return item.state === 'show';
      });
      if (popover) {
        this.hidePopover(popover);
      }
    }
  }

  showPopover(popover) {
    popover.target.classList.add('is-active');
    popover.popper.setOptions({
      modifiers: [
        {
          name: 'eventListeners',
          enabled: true
        },
        ...popover.modifiers
      ]
    });
    popover.popper.update();
    const index = this.popovers.findIndex((item) => {
      return item.target === popover.target;
    });
    this.popovers[index].state = 'show';
  }

  hidePopover(popover) {
    popover.target.classList.remove('is-active');
    popover.popper.setOptions({
      modifiers: [
        {
          name: 'eventListeners',
          enabled: false
        },
        ...popover.modifiers
      ]
    });
    const index = this.popovers.findIndex((item) => {
      return item.target === popover.target;
    });
    this.popovers[index].state = 'hide';
  }

  maybeHidePopover(popover) {
    // setTimeout is needed to correctly check which element is currently being focused
    setTimeout(() => {
      const isHovered =
        popover.target.closest(':hover') === popover.target ||
        popover.trigger.closest(':hover') === popover.trigger;
      const isFocused =
        document.activeElement.closest('[data-popover]') === popover.target ||
        document.activeElement.closest('[data-popover-trigger]') === popover.trigger;
      if (!isHovered && !isFocused) {
        this.hidePopover(popover);
      }
    }, 1);
  }
}
