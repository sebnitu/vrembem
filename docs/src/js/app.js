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

function getPopoverTarget(trigger) {
  return trigger.getAttribute('data-popover-trigger').trim() ?
    document.querySelector(`[data-popover="${trigger.getAttribute('data-popover-trigger')}"]`) :
    trigger.nextElementSibling.hasAttribute('data-popover') ?
      trigger.nextElementSibling : false;
}

function getOffset() {
  const styles = getComputedStyle(document.documentElement);
  const offset = styles.getPropertyValue('--popover-offset');
  return offset ? offset : 0;
}

function showPopover(target, popper, modifiers, event) {
  console.log(event);
  target.classList.add('is-active');
  popper.setOptions({
    modifiers: [
      {
        name: 'eventListeners',
        enabled: true
      },
    ].concat(modifiers)
  });
  popper.update();
}

// TODO: set params for both trigger and target. Then check for whether or not the popover
// should be closed. This can then be used for both mouseleave and blur events.

function hidePopover(target, popper, modifiers, event) {
  console.log(event);
  const isHovered = target.closest(':hover') === target;
  setTimeout(() => {
    const isFocused = document.activeElement.closest('[data-popover]') === target;
    console.log({ isHovered });
    console.log({ isFocused });

    if (!isHovered && !isFocused) {
      target.classList.remove('is-active');
      popper.setOptions({
        modifiers: [
          {
            name: 'eventListeners',
            enabled: false
          }
        ].concat(modifiers)
      });
    }
  }, 1);
}

const popovers = document.querySelectorAll('[data-popover-trigger]');
popovers.forEach((trigger) => {
  const target = getPopoverTarget(trigger);

  if (target) {

    const placement = target.hasAttribute('data-popover-placement') ?
      target.getAttribute('data-popover-placement') :
      'bottom';
    const modifiers = [
      {
        name: 'offset',
        options: {
          offset: [0, getOffset()]
        }
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 10
        }
      }
    ];
    const popperInstance = window.Popper.createPopper(trigger, target, {
      placement: placement,
      modifiers: modifiers
    });

    // TODO: add click events and the option to set which events to listen for

    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    showEvents.forEach(event => {
      trigger.addEventListener(event, showPopover.bind(null, target, popperInstance, modifiers));
    });

    hideEvents.forEach(event => {
      trigger.addEventListener(event, hidePopover.bind(null, target, popperInstance, modifiers));
    });
  }
});
