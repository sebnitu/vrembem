import vb from 'vrembem';
import ScrollStash from 'scroll-stash';
import 'svgxuse';
import 'wicg-inert';
import './list.js';
import './version';

vb.checkbox({ autoInit: true });
vb.dismissible({ autoInit: true });

vb.drawer({
  autoInit: true,
  selectorInert: '[role="main"]',
  selectorOverflow: 'body, [role="main"]'
});

vb.modal({
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
