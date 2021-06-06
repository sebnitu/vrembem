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

const popovers = document.querySelectorAll('[data-popover-trigger]');
popovers.forEach((trigger) => {
  const target = getPopoverTarget(trigger);

  if (target) {
    const cssOffset = getComputedStyle(document.documentElement).getPropertyValue('--popover-offset');
    const offset = cssOffset ? cssOffset : 0;
    const placement = target.hasAttribute('data-popover-placement') ?
      target.getAttribute('data-popover-placement') :
      'bottom';
    const popperInstance = window.Popper.createPopper(trigger, target, {
      placement: placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, offset]
          }
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 10
          }
        }
      ]
    });
    console.log(popperInstance);
  }
});
