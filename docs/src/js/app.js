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

// TODO: Maybe will need focus management for when a trigger and target are connected
// via attribute values and focus needs to be returned to the element after trigger

// TODO: Add keyRouting support when popover is open
// - Pressing 'Escape' should close popovers
// - Process 'Enter', 'ArrowUp', 'ArrowDown', 'Tab', 'Space'

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

function showPopover(target, popper, modifiers) {
  target.classList.add('is-active');
  popper.setOptions({
    modifiers: [
      {
        name: 'eventListeners',
        enabled: true
      },
      ...modifiers
    ]
  });
  popper.update();
}

function hidePopover(target, popper, modifiers) {
  target.classList.remove('is-active');
  popper.setOptions({
    modifiers: [
      {
        name: 'eventListeners',
        enabled: false
      },
      ...modifiers
    ]
  });
}

function maybeHidePopover(trigger, target, popper, modifiers) {
  // setTimeout is needed to correctly check which element is currently being focused
  setTimeout(() => {
    const isHovered =
      target.closest(':hover') === target ||
      trigger.closest(':hover') === trigger;
    const isFocused =
      document.activeElement.closest('[data-popover]') === target ||
      document.activeElement.closest('[data-popover-trigger]') === trigger;
    if (!isHovered && !isFocused) {
      hidePopover(target, popper, modifiers);
    }
  }, 1);
}

function clickHandler(target, popper, modifiers) {
  if (target.classList.contains('is-active')) {
    hidePopover(target, popper, modifiers);
  } else {
    showPopover(target, popper, modifiers);
  }
}

const eventType = 'click';

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'focusout'];

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

    if (eventType === 'hover') {
      showEvents.forEach(event => {
        trigger.addEventListener(event, showPopover.bind(null, target, popperInstance, modifiers));
      });

      hideEvents.forEach(event => {
        trigger.addEventListener(event, maybeHidePopover.bind(null, trigger, target, popperInstance, modifiers));
        target.addEventListener(event, maybeHidePopover.bind(null, trigger, target, popperInstance, modifiers));
      });
    } else {
      trigger.addEventListener('click', clickHandler.bind(null, target, popperInstance, modifiers));
    }
  }
});
