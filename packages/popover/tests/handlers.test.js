import '@testing-library/jest-dom/vitest';
import { delay } from './helpers/delay';
import Popover from '../index.js';
import { handleClick } from '../src/js/handlers';

let popover;

const keyEsc = new KeyboardEvent('keydown', {
  key: 'Escape'
});

const keySpace = new KeyboardEvent('keydown', {
  key: 'Space'
});

const keyTab = new KeyboardEvent('keydown', {
  key: 'Tab'
});

const markup = `
  <div id="app">
    <button aria-controls="asdf">...</button>
    <div id="asdf" class="popover">
      <button class="focus-test">...</button>
    </div>
    <button aria-controls="fdsa">...</button>
    <div id="fdsa" class="popover is-active">
      ...
    </div>
  </div>
`;

afterEach(async () => {
  await popover.destroy();
  popover = null;
  document.body.innerHTML = null;
});

describe('handleClick()', () => {
  it('should open popover if it does not contain the active class', async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    await popover.init();

    expect(popover.collection.length).toBe(2);

    handleClick.bind(popover, popover.collection[0])();
    expect(popover.collection[0].el).toHaveClass('is-active');
  });

  it('should close popover if it contains the active class', async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    await popover.init();

    expect(popover.collection.length).toBe(2);

    handleClick.bind(popover, popover.collection[1])();
    expect(popover.collection[1].el).not.toHaveClass('is-active');
  });

  it('should attach document click event listener when popover is opened', async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    await popover.init();

    handleClick.bind(popover, popover.collection[0])();
    expect(popover.collection[0].el).toHaveClass('is-active');
    expect(popover.collection[1].el).toHaveClass('is-active');

    document.querySelector('#app').click();
    await delay();

    expect(popover.collection[0].el).not.toHaveClass('is-active');
    expect(popover.collection[1].el).not.toHaveClass('is-active');
  });
});

describe('handlerKeydown()', () => {
  it('should close open popover when escape key is pressed', async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    await popover.init();

    expect(popover.collection[1].el).toHaveClass('is-active');
    document.dispatchEvent(keyEsc);
    await delay();
    expect(popover.collection[1].el).not.toHaveClass('is-active');
  });

  it('should do nothing when a non-escape key is pressed', async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    await popover.init();

    expect(popover.collection[1].el).toHaveClass('is-active');
    document.dispatchEvent(keySpace);
    await delay();
    expect(popover.collection[1].el).toHaveClass('is-active');
  });

  it('should return focus to the trigger element when escape key is pressed', async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    await popover.init();

    const button = document.querySelector('.focus-test');

    expect(popover.trigger).toBe(null);
    popover.collection[0].trigger.click();
    expect(popover.trigger).toBe(popover.collection[0].trigger);

    button.focus();
    expect(document.activeElement).toBe(button);

    document.dispatchEvent(keyEsc);
    await delay();

    expect(document.activeElement).toBe(popover.collection[0].trigger);
    expect(popover.trigger).toBe(null);
  });

  it('should run close check when the tab key is pressed', async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    await popover.init();

    expect(popover.collection.length).toBe(2);
    expect(popover.collection[1].el).toHaveClass('is-active');
    document.dispatchEvent(keyTab);
    await delay();
    expect(popover.collection[1].el).not.toHaveClass('is-active');
  });
});

describe('documentClick()', () => {
  it('should close other popover instances when a new one is toggled', async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    await popover.init();

    expect(popover.collection[0].el).not.toHaveClass('is-active');
    expect(popover.collection[1].el).toHaveClass('is-active');

    popover.collection[0].trigger.click();

    expect(popover.collection[0].el).toHaveClass('is-active');
    expect(popover.collection[1].el).not.toHaveClass('is-active');
  });

  it('should remove document event listener when popover is closed', async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    await popover.init();

    expect(popover.collection[0].el).not.toHaveClass('is-active');
    expect(popover.collection[1].el).toHaveClass('is-active');

    popover.collection[1].trigger.click();

    expect(popover.collection[0].el).not.toHaveClass('is-active');
    expect(popover.collection[1].el).not.toHaveClass('is-active');
  });
});
