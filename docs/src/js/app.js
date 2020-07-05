import {
  Checkbox,
  Dismissible,
  Drawer,
  Modal
} from 'vrembem';
import ScrollStash from 'scroll-stash';
import 'svgxuse';
import './list.js';
import './version';

new Checkbox({ autoInit: true });
new Dismissible({ autoInit: true });
new Drawer({ autoInit: true });
new Modal({ autoInit: true });
const scrollStash = new ScrollStash({
  autoInit: true,
  selectorAnchor: '.is-active',
  selectorTopElem: '.dialog__header'
});

const el = document.querySelector('[data-scroll-stash]');
document.addEventListener('drawer:opened', () => {
  scrollStash.showAnchor(el, 'smooth');
});
