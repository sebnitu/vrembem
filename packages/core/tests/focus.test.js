import { focusTarget, focusTrigger, FocusTrap } from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const settings = {
  dataFocus: 'focus'
};

const markup = `
  <button class="trigger-1">...</button>
  <button class="trigger-2">...</button>
  <div class="item-1">
    <div data-dialog tabindex="-1">
      <button class="first">...</button>
      <button class="middle">...</button>
      <button class="last">...</button>
    </div>
  </div>
  <div class="item-2">
    <div data-dialog tabindex="-1">
      <button class="first-2" data-focus>...</button>
      <button class="middle-2">...</button>
      <button class="last-2">...</button>
    </div>
  </div>
  <div class="item-3">
    <div data-dialog  tabindex="-1">
      ...
    </div>
  </div>
  <div class="item-4">
    <div data-dialog>
      ...
    </div>
  </div>
  <div class="item-4">
    <div data-dialog>
      <button class="first-3">...</button>
      <button class="middle-3">...</button>
      <button class="last-3">...</button>
    </div>
  </div>
`;

beforeEach(() => {
  document.body.innerHTML = markup;
});

afterEach(() => {
  document.body.innerHTML = null;
});

test('should focus the inner dialog of element when focusTarget is called', () => {
  const el = document.querySelector('.item-1');
  const dialog = el.querySelector('[data-dialog]');
  focusTarget(el, settings);
  expect(dialog).toHaveFocus();
});

test('should focus the inner data focus element when focusTarget is called', () => {
  const el = document.querySelector('.item-2');
  const elFocus = el.querySelector('[data-focus]');
  focusTarget(el, settings);
  expect(elFocus).toHaveFocus();
});

test('should do nothing if no focusable items or tabindex is found on focusTarget call', () => {
  const el = document.querySelector('.item-4');
  const dialog = el.querySelector('[data-dialog]');
  focusTarget(el, settings);
  expect(dialog).not.toHaveFocus();
  expect(document.body).toHaveFocus();
});

test('should focus a trigger from memory object when focusTrigger is called', () => {
  const trigger = document.querySelector('.trigger-1');
  const obj = { memory: { trigger: trigger } };
  expect(trigger).not.toHaveFocus();
  focusTrigger(obj);
  expect(trigger).toHaveFocus();
});

test('should not throw error if focustTrigger is called with no arguments', () => {
  expect(focusTrigger).not.toThrowError();
});

test('should do nothing if object doesn\'t have the correct properties', () => {
  const trigger = document.querySelector('.trigger-2');

  const obj = {};
  focusTrigger(obj);
  expect(document.body).toHaveFocus();

  obj.memory = {};
  focusTrigger(obj);
  expect(document.body).toHaveFocus();

  obj.memory.trigger = null;
  focusTrigger(obj);
  expect(document.body).toHaveFocus();

  obj.memory.trigger = trigger;
  focusTrigger(obj);
  expect(trigger).toHaveFocus();
});

test('FocusTrap should properly cycle through focusable elements while tabbing', async () => {
  const el = document.querySelector('.item-1');
  const dialog = el.querySelector('[data-dialog]');
  const focusTrap = new FocusTrap();

  focusTarget(el, settings);
  expect(dialog).toHaveFocus();

  focusTrap.init(el);

  expect(focusTrap.focusable.length).toBe(3);
  expect(focusTrap.focusableFirst).toHaveClass('first');
  expect(focusTrap.focusableLast).toHaveClass('last');

  userEvent.tab();
  expect(focusTrap.focusableFirst).toHaveFocus();

  userEvent.tab();
  expect(document.activeElement).toHaveClass('middle');

  userEvent.tab();
  expect(focusTrap.focusableLast).toHaveFocus();

  userEvent.tab();
  expect(focusTrap.focusableFirst).toHaveFocus();
});

test('FocusTrap should properly cycle through focusable elements while shift tabbing', async () => {
  const el = document.querySelector('.item-1');
  const dialog = el.querySelector('[data-dialog]');
  const focusTrap = new FocusTrap();

  focusTarget(el, settings);
  expect(dialog).toHaveFocus();

  focusTrap.init(el);

  userEvent.tab({ shift: true });
  expect(focusTrap.focusableLast).toHaveFocus();
  expect(document.activeElement).toHaveClass('last');

  userEvent.tab({ shift: true });
  expect(document.activeElement).toHaveClass('middle');

  userEvent.tab({ shift: true });
  expect(focusTrap.focusableFirst).toHaveFocus();
  expect(document.activeElement).toHaveClass('first');

  userEvent.tab({ shift: true });
  expect(focusTrap.focusableLast).toHaveFocus();
  expect(document.activeElement).toHaveClass('last');
});

test('should lock focus on inner  if nothing inner is focusable', async () => {
  const el = document.querySelector('.item-3');
  const dialog = el.querySelector('[data-dialog]');
  const focusTrap = new FocusTrap();

  focusTarget(el, settings);
  expect(dialog).toHaveFocus();

  focusTrap.init(el);

  expect(focusTrap.focusable.length).toBe(0);
  expect(focusTrap.focusableFirst).toBe(undefined);
  expect(focusTrap.focusableLast).toBe(undefined);

  userEvent.tab();
  expect(dialog).toHaveFocus();

  userEvent.tab({ shift: true });
  expect(dialog).toHaveFocus();
});

test('should tear down focus trap when destroy method is run', () => {
  const el = document.querySelector('.item-1');
  const dialog = el.querySelector('[data-dialog]');
  const focusTrap = new FocusTrap();

  focusTarget(el, settings);
  expect(dialog).toHaveFocus();

  focusTrap.init(el);

  expect(focusTrap.focusable.length).toBe(3);
  expect(focusTrap.focusableFirst).toHaveClass('first');
  expect(focusTrap.focusableLast).toHaveClass('last');

  focusTrap.destroy();

  expect(focusTrap.focusable).toBe(null);
  expect(focusTrap.focusableFirst).toBe(null);
  expect(focusTrap.focusableLast).toBe(null);

  userEvent.tab({ shift: true });
  expect(document.activeElement).not.toHaveClass('last');
});

test('should do nothing if focus trap destroy is called before its been initialized', () => {
  const focusTrap = new FocusTrap();
  expect(focusTrap.destroy.bind(focusTrap)).not.toThrowError();
});

test('Should not throw error if tabindex="-1" is not present on inner target', () => {
  const el = document.querySelector('.item-4');
  const focusTrap = new FocusTrap();
  expect(focusTrap.init.bind(focusTrap, el)).not.toThrowError();
});

// NOTICE: Requires a headless browser to test properly

// const markupPruneFocusable = `
//   <div class="item">
//     <div data-dialog>
//       <button class="1" style="display:none;">...</button>
//       <button class="2">...</button>
//       <button class="3">...</button>
//       <button class="4">...</button>
//       <button class="5" style="display:none;">...</button>
//     </div>
//   </div>
// `;

// test('should remove unfocusable elements from memory', async () => {
//   document.body.innerHTML = markupPruneFocusable;
//   modal = new Modal({ autoInit: true });
//   const el = document.querySelector('[data-modal]');

//   modal.open('modal-default');
//   await transition(el);

//   expect(el).toHaveClass('modal is-opened');
//   expect(modal.memory.focusable.length).toBe(5); // Should actually be 3
//   expect(modal.memory.focusableFirst).toHaveClass('1'); // Should actually be 2
//   expect(modal.memory.focusableLast).toHaveClass('5'); // Should actually be 4
// });
