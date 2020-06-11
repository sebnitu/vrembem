import {
  Checkbox,
  Dismissible,
  Drawer,
  Modal
} from 'vrembem';
import 'svgxuse';
import './list.js';
import { Version } from './version';
import { StickyScroll } from './stickyScroll';

new Checkbox({ autoInit: true });
new Dismissible({ autoInit: true });
new Drawer({ autoInit: true });
new Modal({ autoInit: true });

new Version({ autoInit: true });
const stickyScroll = new StickyScroll({
  autoInit: true,
  selectorActive: '.is-active',
  selectorActiveParent: '.menu__item',
  selectorElementPadding: '.dialog__header'
});

const stickyButton = document.querySelector('[data-sticky-scroll-toggle]');

stickyButton.addEventListener('click', () => {
  stickyScroll.showActive();
});
