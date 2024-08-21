import * as vb from 'vrembem';
import ScrollStash from 'scroll-stash';
import 'svgxuse';
import './list.js';
import './version';

const checkbox = new vb.Checkbox({ autoInit: true });

const drawer = new vb.Drawer({
  autoInit: true,
  selectorInert: 'main',
  selectorOverflow: 'body, main'
});

const modal = new vb.Modal({
  autoInit: true,
  selectorInert: '.page',
  selectorOverflow: 'body, main',
  teleport: '.modals-container'
});

const popover = new vb.Popover({
  autoInit: true
});

window.checkbox = checkbox;
window.drawer = drawer;
window.modal = modal;
window.popover = popover;

const scrollStash = new ScrollStash({
  autoInit: true,
  selectorAnchor: '.is-active',
  selectorTopElem: '.dialog__header'
});

const el = document.querySelector('[data-scroll-stash]');

document.addEventListener('drawer:opened', (event) => {
  if (event.target.id === 'listjs') {
    const anchor = scrollStash.anchorGet(el);
    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});
