import {
  Checkbox,
  Dismissible,
  Drawer,
  Modal
} from 'vrembem';
import ScrollStash from 'scroll-stash';
import 'svgxuse';
import 'wicg-inert';
import './list.js';
import './version';

new Checkbox({ autoInit: true });
new Dismissible({ autoInit: true });

new Drawer({
  autoInit: true,
  selectorInert: '[role="main"]',
  selectorOverflow: 'body, [role="main"]'
});

new Modal({
  autoInit: true,
  selectorInert: '.page',
  moveModals: {
    selector: '[role="modals-container"]',
    location: 'append'
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
  scrollStash.anchor.show(el, 'smooth');
});
