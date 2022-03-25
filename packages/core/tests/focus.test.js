import { FocusTrap } from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const focusTrap = new FocusTrap(null, '[data-focus]');

const markup = `
  <div class="item-1" tabindex="-1">
    <button class="first">...</button>
    <button class="middle">...</button>
    <button class="last">...</button>
  </div>

  <div class="item-2" tabindex="-1">
    <button class="first-2" data-focus>...</button>
    <button class="middle-2">...</button>
    <button class="last-2">...</button>
  </div>

  <div class="item-3" tabindex="-1">
    ...
  </div>

  <div class="item-4">
    ...
  </div>
`;

beforeEach(() => {
  document.body.innerHTML = markup;
});

afterEach(() => {
  document.body.innerHTML = null;
  document.activeElement.blur();
});

test('should focus the inner dialog of element when mount is called', () => {
  const el = document.querySelector('.item-1');
  focusTrap.mount(el);
  expect(el).toHaveFocus();
});

test('should focus the inner data focus element when focusTrap.setFocus is called', () => {
  const el = document.querySelector('.item-2');
  const elFocus = el.querySelector('[data-focus]');
  focusTrap.mount(el);
  expect(elFocus).toHaveFocus();
});

test('should do nothing if no focusable items or tabindex is found on focusTrap.setFocus call', () => {
  const el = document.querySelector('.item-4');
  focusTrap.mount(el);
  expect(el).not.toHaveFocus();
  expect(document.body).toHaveFocus();
});

test('FocusTrap should properly cycle through focusable elements while tabbing', async () => {
  const el = document.querySelector('.item-1');

  focusTrap.mount(el);
  expect(el).toHaveFocus();
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

  focusTrap.mount(el);
  expect(el).toHaveFocus();

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

  focusTrap.mount(el);
  expect(el).toHaveFocus();
  expect(focusTrap.focusable.length).toBe(0);
  expect(focusTrap.focusableFirst).toBe(undefined);
  expect(focusTrap.focusableLast).toBe(undefined);

  userEvent.tab();
  expect(el).toHaveFocus();

  userEvent.tab({ shift: true });
  expect(el).toHaveFocus();
});

test('should tear down focus trap when destroy method is run', () => {
  const el = document.querySelector('.item-1');

  focusTrap.mount(el);

  expect(el).toHaveFocus();
  expect(focusTrap.focusable.length).toBe(3);
  expect(focusTrap.focusableFirst).toHaveClass('first');
  expect(focusTrap.focusableLast).toHaveClass('last');

  focusTrap.unmount();

  expect(focusTrap.focusable).toEqual([]);
  expect(focusTrap.focusableFirst).toBe(undefined);
  expect(focusTrap.focusableLast).toBe(undefined);

  userEvent.tab({ shift: true });
  expect(document.activeElement).not.toHaveClass('last');
});

test('should do nothing if focus trap destroy is called before its been initialized', () => {
  expect(focusTrap.unmount.bind(focusTrap)).not.toThrowError();
});

test('Should not throw error if tabindex="-1" is not present on inner target', () => {
  const el = document.querySelector('.item-4');
  expect(focusTrap.mount.bind(focusTrap, el)).not.toThrowError();
});

describe(('FocusTrap.refresh'), () => {
  it('should correctly update the list of focusable elements', () => {
    const el = document.querySelector('.item-1');

    focusTrap.mount(el);
    expect(focusTrap.focusable.length).toBe(3);

    el.querySelector('.middle').remove();

    focusTrap.mount();
    expect(focusTrap.focusable.length).toBe(2);
  });

  it('should correctly setup a focus lock if no focusable elements are found', () => {
    const el = document.querySelector('.item-1');

    focusTrap.mount(el);
    expect(focusTrap.focusable.length).toBe(3);

    el.querySelector('.first').remove();
    el.querySelector('.middle').remove();
    el.querySelector('.last').remove();

    focusTrap.mount();
    expect(focusTrap.focusable.length).toBe(0);
  });
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
