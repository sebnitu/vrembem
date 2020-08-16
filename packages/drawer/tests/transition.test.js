import Drawer from '../index.js';
import { transition } from './helpers/transition';
import '@testing-library/jest-dom/extend-expect';

let drawer;

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer is-closed" data-drawer="drawer-default">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-default">Drawer Toggle</button>
      <button data-drawer-open="drawer-default">Drawer Open</button>
      <button data-drawer-close="drawer-default">Drawer Close</button>
      <button class="drawer-close-empty" data-drawer-close>Drawer Close</button>
    </div>
  </div>
`;

const markupMultiple = `
  <div class="drawer__wrapper">
    <div class="drawer is-closed" data-drawer="drawer-one">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close>...</button>
      </div>
    </div>
    <div class="drawer is-closed" data-drawer="drawer-two">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close>...</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-one">...</button>
      <button data-drawer-toggle="drawer-two">...</button>
    </div>
  </div>
`;

const markupCustomAttr = `
  <div class="drawer__wrapper">
    <div class="drawer is-closed" data-d="drawer-default">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-c>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-t="drawer-default">Drawer Toggle</button>
    </div>
  </div>
`;

const markupCustomState = `
  <div class="drawer__wrapper">
    <div class="drawer off" data-drawer="drawer-default">
      <div data-drawer-dialog class="drawer__dialog">
        <button data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-default">Drawer Toggle</button>
    </div>
  </div>
`;

beforeEach(() => {
  document.body.innerHTML = null;
  window.innerWidth = 1200;
});

afterEach(() => {
  drawer.destroy();
  drawer = null;
});

test('should apply state classes on `click` and `transitionend` events', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-toggle]');
  const btnClose = document.querySelector('[data-drawer-close]');

  drawer.init();
  expect(el).toHaveClass('drawer is-closed');

  btnOpen.click();
  expect(el).toHaveClass('is-opening');

  await transition(el);
  expect(el).toHaveClass('is-opened');

  btnClose.click();
  expect(el).toHaveClass('is-closing');

  await transition(el);
  expect(el).toHaveClass('drawer is-closed');
  expect(el).not.toHaveClass('is-opening is-opened is-closing');
});

test('should be able to pass options on init method', () => {
  drawer = new Drawer({ stateKey: 'OnNew' });
  drawer.init({ stateKey: 'OnInit' });
  expect(drawer.settings.stateKey).toBe('OnInit');
});

test('should open and close drawer using data attribute triggers', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-open="drawer-default"]');
  const btnClose = document.querySelector('[data-drawer-close="drawer-default"]');

  drawer.init();
  expect(el).toHaveClass('drawer is-closed');

  btnOpen.click();
  expect(el).toHaveClass('is-opening');

  await transition(el);
  expect(el).toHaveClass('is-opened');

  btnClose.click();
  expect(el).toHaveClass('is-closing');

  await transition(el);
  expect(el).toHaveClass('drawer is-closed');
  expect(el).not.toHaveClass('is-opening is-opened is-closing');
});

test('should not throw error if drawer close button doesn\'t find a drawer', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer();
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-open="drawer-default"]');
  const btnClose = document.querySelector('.drawer-close-empty');

  drawer.init();
  expect(el).toHaveClass('drawer is-closed');

  btnOpen.click();
  expect(el).toHaveClass('is-opening');

  await transition(el);
  expect(el).toHaveClass('is-opened');

  btnClose.click();
  expect(el).not.toHaveClass('is-closing');
});

test('should apply state classes with custom data attributes', async () => {
  document.body.innerHTML = markupCustomAttr;
  drawer = new Drawer({
    autoInit: true,
    dataDrawer: 'd',
    dataToggle: 't',
    dataClose: 'c'
  });
  const el = document.querySelector('[data-d]');
  const btnOpen = document.querySelector('[data-t]');
  const btnClose = document.querySelector('[data-c]');

  expect(el).toHaveClass('drawer is-closed');

  btnOpen.click();
  expect(el).toHaveClass('is-opening');

  await transition(el);
  expect(el).toHaveClass('is-opened');

  btnClose.click();
  expect(el).toHaveClass('is-closing');

  await transition(el);
  expect(el).toHaveClass('drawer is-closed');
  expect(el).not.toHaveClass('is-opening is-opened is-closing');
});

test('should apply custom state classes', async () => {
  document.body.innerHTML = markupCustomState;
  drawer = new Drawer({
    autoInit: true,
    stateOpened: 'on',
    stateOpening: 'enable',
    stateClosing: 'disable',
    stateClosed: 'off'
  });
  const el = document.querySelector('[data-drawer]');
  const btnOpen = document.querySelector('[data-drawer-toggle]');
  const btnClose = document.querySelector('[data-drawer-close]');

  expect(el).toHaveClass('drawer off');

  btnOpen.click();
  expect(el).toHaveClass('enable');

  await transition(el);
  expect(el).toHaveClass('on');

  btnClose.click();
  expect(el).toHaveClass('disable');

  await transition(el);
  expect(el).toHaveClass('drawer off');
  expect(el).not.toHaveClass('on enable disable');

  const state = JSON.parse(localStorage.getItem('DrawerState'));
  expect(state['drawer-default']).toMatch('off');
});

test('should not apply transition classes when transitions are disabled', () => {
  document.body.innerHTML = markup;
  const el = document.querySelector('[data-drawer]');
  drawer = new Drawer({
    autoInit: true,
    transition: false
  });
  drawer.open('drawer-default');
  expect(el).toHaveClass('is-opened');
  expect(el.classList.length).toBe(2);

  drawer.close('drawer-default');
  expect(el).toHaveClass('is-closed');
  expect(el.classList.length).toBe(2);
});

test('should not be possible to open new drawer while a drawer transition is in process', async () => {
  document.body.innerHTML = markupMultiple;
  drawer = new Drawer();
  const elOne = document.querySelector('[data-drawer="drawer-one"]');
  const elTwo = document.querySelector('[data-drawer="drawer-two"]');
  const btnOne = document.querySelector('[data-drawer-toggle="drawer-one"]');
  const btnTwo = document.querySelector('[data-drawer-toggle="drawer-two"]');

  drawer.init();
  expect(elOne).toHaveClass('drawer is-closed');
  expect(elTwo).toHaveClass('drawer is-closed');

  btnOne.click();
  expect(elOne).toHaveClass('is-opening');

  btnTwo.click();
  expect(elOne).toHaveClass('is-opening');
  expect(elTwo).toHaveClass('is-closed');

  await transition(elOne);
  await transition(elTwo);

  expect(elOne).toHaveClass('is-opened');
  expect(elTwo).toHaveClass('is-closed');
  expect(elOne.classList.length).toBe(2);
  expect(elTwo.classList.length).toBe(2);
});
