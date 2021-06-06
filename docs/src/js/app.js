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

function showPopover(target, popper, modifiers) {
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

function hidePopover(target, popper, modifiers) {
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
