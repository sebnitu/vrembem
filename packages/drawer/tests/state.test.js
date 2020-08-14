import Drawer from '../index.js';
import { transition } from './helpers/transition';
import '@testing-library/jest-dom/extend-expect';

let drawer;

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer" data-drawer="drawer-one">
      <div data-drawer-dialog class="drawer__dialog">
        <button class="close-one" data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer" data-drawer="drawer-two">
      <div data-drawer-dialog class="drawer__dialog">
        <button class="close-two" data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer drawer_modal" data-drawer="drawer-three">
      <div data-drawer-dialog class="drawer__dialog">
        <button class="close-three" data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button class="toggle-one" data-drawer-toggle="drawer-one">
        Drawer Toggle
      </button>
      <button class="toggle-two" data-drawer-toggle="drawer-two">
        Drawer Toggle
      </button>
      <button class="toggle-three" data-drawer-toggle="drawer-three">
        Drawer Toggle
      </button>
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

test('should save initial states to local storage', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });

  const state = JSON.parse(localStorage.getItem('DrawerState'));
  expect(state).toMatchObject(drawer.state);
  expect(state['drawer-one']).toMatch('is-closed');
  expect(state['drawer-two']).toMatch('is-closed');
});

test('should restore state based on existing values in local storage', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer();
  localStorage.setItem('DrawerState', JSON.stringify({
    'drawer-one': 'is-opened',
    'drawer-two': 'is-opened',
    'drawer-three': 'is-closed'
  }));
  const drawerOne = document.querySelector('[data-drawer="drawer-one"]');
  const drawerTwo = document.querySelector('[data-drawer="drawer-two"]');
  const drawerThr = document.querySelector('[data-drawer="drawer-three"]');
  drawerThr.classList.add('is-opened');

  expect(drawerOne).not.toHaveClass('is-opened');
  expect(drawerTwo).not.toHaveClass('is-opened');
  expect(drawerThr).toHaveClass('is-opened');

  drawer.init();
  expect(drawerOne).toHaveClass('is-opened');
  expect(drawerTwo).toHaveClass('is-opened');
  expect(drawerThr).not.toHaveClass('is-opened');

  const state = JSON.parse(localStorage.getItem('DrawerState'));
  expect(state).toMatchObject(drawer.state);
});

test('should do nothing if saved drawer doesn\'t exist on the page', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer();
  localStorage.setItem('DrawerState', JSON.stringify({
    'drawer-asdf': 'is-opened'
  }));
  expect(drawer.init.bind(drawer)).not.toThrow();
});

test('should update local storage when toggle button changes state', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  localStorage.setItem('DrawerState', JSON.stringify({
    'drawer-one': 'is-close',
    'drawer-two': 'is-close'
  }));
  const toggleOne = document.querySelector('.toggle-one');
  const toggleTwo = document.querySelector('.toggle-two');
  const drawerOne = document.querySelector('[data-drawer="drawer-one"]');
  const drawerTwo = document.querySelector('[data-drawer="drawer-two"]');

  expect(drawerOne).not.toHaveClass('is-opened');
  expect(drawerTwo).not.toHaveClass('is-opened');

  toggleOne.click();
  await transition(drawerOne);
  expect(drawerOne).toHaveClass('is-opened');

  toggleTwo.click();
  await transition(drawerTwo);
  expect(drawerTwo).toHaveClass('is-opened');

  const state = JSON.parse(localStorage.getItem('DrawerState'));
  expect(state).toMatchObject(drawer.state);
  expect(state['drawer-one']).toMatch('is-opened');
  expect(state['drawer-two']).toMatch('is-opened');
});

test('should update local storage when close button changes state', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer();
  localStorage.setItem('DrawerState', JSON.stringify({
    'drawer-one': 'is-opened',
    'drawer-two': 'is-opened'
  }));
  const closeOne = document.querySelector('.close-one');
  const closeTwo = document.querySelector('.close-two');
  const drawerOne = document.querySelector('[data-drawer="drawer-one"]');
  const drawerTwo = document.querySelector('[data-drawer="drawer-two"]');

  drawer.init();
  expect(drawerOne).toHaveClass('is-opened');
  expect(drawerTwo).toHaveClass('is-opened');

  closeOne.click();
  await transition(drawerOne);
  expect(drawerOne).not.toHaveClass('is-opened');

  closeTwo.click();
  await transition(drawerTwo);
  expect(drawerTwo).not.toHaveClass('is-opened');

  const state = JSON.parse(localStorage.getItem('DrawerState'));
  expect(state).toMatchObject(drawer.state);
  expect(state['drawer-one']).toMatch('is-closed');
  expect(state['drawer-two']).toMatch('is-closed');
});

test('should remove localStorage when state is disabled', () => {
  document.body.innerHTML = markup;
  localStorage.setItem('DrawerState', JSON.stringify({
    'drawer-one': 'is-opened',
    'drawer-two': 'is-opened'
  }));
  drawer = new Drawer({
    autoInit: true,
    stateSave: false
  });
  expect(Object.getOwnPropertyNames(localStorage).length).toBe(0);
  expect(Object.getOwnPropertyNames(drawer.state).length).toBe(0);
});

test('should do nothing with localStorage if state feature is disabled', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({
    autoInit: true,
    stateSave: false
  });
  expect(Object.getOwnPropertyNames(localStorage).length).toBe(0);
  expect(Object.getOwnPropertyNames(drawer.state).length).toBe(0);
});

test('should do nothing with localStorage when drawer is opened and stateSave is called', async () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({
    autoInit: true,
    stateSave: false
  });
  const el = document.querySelector('[data-drawer="drawer-one"]');
  expect(localStorage.getItem('DrawerState')).toBe(null);
  drawer.open('drawer-one');
  await transition(el);
  expect(localStorage.getItem('DrawerState')).toBe(null);
  expect(Object.getOwnPropertyNames(localStorage).length).toBe(0);
  expect(Object.getOwnPropertyNames(drawer.state).length).toBe(0);
});

test('should remove localStorage under a custom key', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({
    autoInit: true,
    stateKey: 'awesome'
  });
  expect(localStorage).toHaveProperty('awesome');
});

test('should not save state if a modal drawer', () => {
  document.body.innerHTML = markup;
  drawer = new Drawer({ autoInit: true });
  const state = JSON.parse(localStorage.getItem('DrawerState'));
  expect(state).not.toHaveProperty('drawer-three');
});
