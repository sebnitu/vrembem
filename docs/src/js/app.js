import * as vb from 'vrembem';
import ScrollStash from 'scroll-stash';
import 'svgxuse';
import 'wicg-inert';
import './list.js';
import './version';

new vb.Checkbox({ autoInit: true });

new vb.Drawer({
  autoInit: true,
  selectorInert: '[role="main"]',
  selectorOverflow: 'body, [role="main"]'
});

new vb.Modal({
  autoInit: true,
  selectorInert: '.page',
  moveModals: {
    type: 'append',
    ref: '[role="modals-container"]'
  },
  toggleOverflow: 'body, .page__article'
});

const scrollStash = new ScrollStash({
  autoInit: true,
  selectorAnchor: '.is-active',
  selectorTopElem: '.dialog__header'
});

const el = document.querySelector('[data-scroll-stash]');

document.addEventListener('drawer:opened', () => {
  const anchor = scrollStash.anchorGet(el);
  anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

/**
 * Popover prototyping
 */

// TODO: Properly set popover as shown if `is-active` is present on init

const popovers = [];
const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'focusout'];

function getPopoverTarget(trigger) {
  return trigger.getAttribute('data-popover-trigger').trim() ?
    document.querySelector(`[data-popover="${trigger.getAttribute('data-popover-trigger')}"]`) :
    trigger.nextElementSibling.hasAttribute('data-popover') ?
      trigger.nextElementSibling : false;
}

function getCSSVar(property, fallback = false, el = document.documentElement) {
  const styles = getComputedStyle(el);
  const value = styles.getPropertyValue(property).trim();
  return value ? value : fallback;
}

function showPopover(popover) {
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
  const index = popovers.findIndex((item) => {
    return item.target === popover.target;
  });
  popovers[index].state = 'show';
}

function hidePopover(popover) {
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
  const index = popovers.findIndex((item) => {
    return item.target === popover.target;
  });
  popovers[index].state = 'hide';
}

function maybeHidePopover(popover) {
  // setTimeout is needed to correctly check which element is currently being focused
  setTimeout(() => {
    const isHovered =
      popover.target.closest(':hover') === popover.target ||
      popover.trigger.closest(':hover') === popover.trigger;
    const isFocused =
      document.activeElement.closest('[data-popover]') === popover.target ||
      document.activeElement.closest('[data-popover-trigger]') === popover.trigger;
    if (!isHovered && !isFocused) {
      hidePopover(popover);
    }
  }, 1);
}

function clickHandler(popover) {
  if (popover.target.classList.contains('is-active')) {
    hidePopover(popover);
  } else {
    showPopover(popover);
    document.addEventListener('click', function _f(event) {
      const result = event.target.closest('[data-popover], [data-popover-trigger]');
      const match = result === popover.target || result === popover.trigger;
      if (!match) {
        hidePopover(popover);
        this.removeEventListener('click', _f);
      } else {
        if (!popover.target.classList.contains('is-active')) {
          this.removeEventListener('click', _f);
        }
      }
    });
  }
}

const popoverTriggers = document.querySelectorAll('[data-popover-trigger]');
popoverTriggers.forEach((trigger) => {
  const target = getPopoverTarget(trigger);
  if (target) {
    const placement = target.hasAttribute('data-popover-placement') ?
      target.getAttribute('data-popover-placement') : 'bottom-start';
    const modifiers = [
      {
        name: 'offset',
        options: {
          offset: [0, parseInt(getCSSVar('--popover-offset', 0, target), 10)]
        }
      },
      {
        name: 'preventOverflow',
        options: {
          padding: parseInt(getCSSVar('--popover-offset-overflow', 0, target), 10)
        }
      }
    ];

    const popperInstance = window.Popper.createPopper(trigger, target, {
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

    popovers.push(popover);

    const eventType = trigger.hasAttribute('data-popover-event') ?
      trigger.getAttribute('data-popover-event') : 'click';

    if (eventType === 'hover') {
      showEvents.forEach(event => {
        trigger.addEventListener(event, showPopover.bind(null, popover));
      });

      hideEvents.forEach(event => {
        trigger.addEventListener(event, maybeHidePopover.bind(null, popover));
        target.addEventListener(event, maybeHidePopover.bind(null, popover));
      });
    } else {
      trigger.addEventListener('click', clickHandler.bind(null, popover));
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const popover = popovers.find((item) => {
      return item.state === 'show';
    });
    if (popover) {
      hidePopover(popover);
    }
  }
});
