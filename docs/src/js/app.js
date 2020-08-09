import * as vb from 'vrembem';
import ScrollStash from 'scroll-stash';
import 'svgxuse';
import 'wicg-inert';
import './list.js';
import './version';

vb.Checkbox({ autoInit: true });

vb.Drawer({
  autoInit: true,
  selectorInert: '[role="main"]',
  selectorOverflow: 'body, [role="main"]'
});

vb.Modal({
  autoInit: true,
  selectorInert: '.page',
  moveModals: {
    selector: '[role="modals-container"]',
    location: 'append'
  },
  toggleOverflow: 'body, .page__article'
});

const scrollStash = ScrollStash({
  autoInit: true,
  selectorAnchor: '.is-active',
  selectorTopElem: '.dialog__header'
});

const el = document.querySelector('[data-scroll-stash]');

document.addEventListener('drawer:opened', () => {
  scrollStash.anchor.show(el, 'smooth');
});
