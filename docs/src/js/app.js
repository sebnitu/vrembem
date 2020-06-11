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

document.addEventListener('drawer:opened', (event) => {
  console.log(event);
  stickyScroll.showActive();
});

document.addEventListener('drawer:closed', (event) => {
  console.log(event);
});

document.addEventListener('drawer:breakpoint', (event) => {
  console.log(event);
});

document.addEventListener('modal:opened', (event) => {
  console.log(event);
});

document.addEventListener('modal:closed', (event) => {
  console.log(event);
});
