import '@testing-library/jest-dom/extend-expect';
import Popover from '../index.js';

let popover;

const keyEsc = new KeyboardEvent('keydown', {
  key: 'Escape'
});

const markup = `
  <button aria-controls="asdf">...</button>
  <div id="asdf" class="popover">...</div>
  <button aria-controls="fdsa">...</button>
  <div id="fdsa" class="popover">...</div>
`;

afterEach(() => {
  popover.destroy();
  popover = null;
  document.body.innerHTML = null;
});

describe('init() & destroy()', () => {
  it('should initialize the popover module when init is run', () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    popover.init();
    expect(popover.collection.length).toBe(2);
  });

  it('should auto initialize the popover module autoInit is set to true', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(2);
  });

  it('running init multiple times should not create duplicates in collection', async () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    await popover.init();
    expect(popover.collection.length).toBe(2);
  });

  it('should not attach keyboard event listener if eventListeners is set to false', () => {
    document.body.innerHTML = markup;
    popover = new Popover({
      autoInit: true,
      eventListeners: false
    });

    const trigger = document.querySelector('button');
    const target = document.querySelector('.popover');

    trigger.click();
    expect(target).toHaveClass('is-active');
    document.dispatchEvent(keyEsc);
    expect(target).toHaveClass('is-active');
  });

  it('should be able to pass options through init method', async () => {
    document.body.innerHTML = markup;
    popover = new Popover({ selectorPopover: '.asdf' });
    expect(popover.settings.selectorPopover).toBe('.asdf');
    await popover.init({ selectorPopover: '.popover' });
    expect(popover.settings.selectorPopover).toBe('.popover');
  });

  it('should remove all event listeners and clear collection', async () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('button');
    const target = document.querySelector('.popover');

    expect(popover.collection.length).toBe(2);
    await popover.destroy();
    expect(popover.collection.length).toBe(0);
    trigger.click();
    expect(target).not.toHaveClass('is-active');
  });
});

describe('initEventListeners() & destroyEventListeners()', () => {
  it('should remove event listeners', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('button');
    const target = document.querySelector('.popover');

    popover.destroyEventListeners();

    trigger.click();
    expect(target).not.toHaveClass('is-active');
  });

  it('should re-initialize event listeners', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('button');
    const target = document.querySelector('.popover');

    popover.destroyEventListeners();
    popover.initEventListeners();

    trigger.click();
    expect(target).toHaveClass('is-active');
  });

  it('should remove keyboard event listener', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('button');
    const target = document.querySelector('.popover');

    trigger.click();
    expect(target).toHaveClass('is-active');

    popover.destroyEventListeners();

    document.dispatchEvent(keyEsc);
    expect(target).toHaveClass('is-active');
  });

  it('should re-initialize keyboard event listener', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('button');
    const target = document.querySelector('.popover');

    trigger.click();
    expect(target).toHaveClass('is-active');

    popover.destroyEventListeners();
    popover.initEventListeners();

    document.dispatchEvent(keyEsc);
    expect(target).not.toHaveClass('is-active');
  });
});

describe('register() & deregister()', () => {
  it('should be able to manually register a popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover();

    expect(popover.collection.length).toBe(0);

    const trigger = document.querySelector('button');
    const target = document.querySelector('.popover');

    popover.register(trigger);
    expect(popover.collection.length).toBe(1);
    expect(popover.collection[0].trigger).toBe(trigger);
    expect(popover.collection[0].target).toBe(target);
  });

  it('should be able to manually deregister a popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    expect(popover.collection.length).toBe(2);
    popover.deregister(popover.collection[0]);
    expect(popover.collection.length).toBe(1);

    const trigger = document.querySelector('button');
    const target = document.querySelector('.popover');

    trigger.click();
    expect(target).not.toHaveClass('is-active');
  });

  it('should return collection if deregister is run non-existent popover', async () => {
    popover = new Popover({ autoInit: true });
    const result = await popover.deregister('asdf');
    expect(result).toBe(popover.collection);
  });
});

describe('registerCollection() & deregisterCollection()', () => {
  it('should remove all items from collection and their event listeners', async () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const trigger = document.querySelector('button');
    const target = document.querySelector('.popover');

    expect(popover.collection.length).toBe(2);
    trigger.click();
    expect(target).toHaveClass('is-active');

    await popover.deregisterCollection();

    expect(popover.collection.length).toBe(0);
    expect(target).not.toHaveClass('is-active');
    trigger.click();
    expect(target).not.toHaveClass('is-active');
  });

  it('should register all items into collection and add their event listeners', () => {
    document.body.innerHTML = markup;
    popover = new Popover();

    const trigger = document.querySelector('button');
    const target = document.querySelector('.popover');
    const items = document.querySelectorAll('.popover');

    expect(popover.collection.length).toBe(0);
    trigger.click();
    expect(target).not.toHaveClass('is-active');

    popover.registerCollection(items);

    expect(popover.collection.length).toBe(2);
    trigger.click();
    expect(target).toHaveClass('is-active');
  });
});

describe('open() & close()', () => {
  it('should open the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const target = document.querySelector('.popover');

    expect(target).not.toHaveClass('is-active');
    popover.open(popover.collection[0].id);
    expect(target).toHaveClass('is-active');
  });

  it('should close the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const target = document.querySelector('.popover');

    popover.open(popover.collection[0].id);
    popover.close(popover.collection[0].id);
    expect(target).not.toHaveClass('is-active');
  });

  it('should close all popovers', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    popover.collection.forEach((item) => {
      popover.open(item.id);
    });

    popover.collection.forEach((item) => {
      expect(item.state).toBe('opened');
      expect(item.target).toHaveClass('is-active');
    });

    popover.close();

    popover.collection.forEach((item) => {
      expect(item.state).toBe('closed');
      expect(item.target).not.toHaveClass('is-active');
    });
  });

  it('should return false if open is run with a popover it could not find', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const result = popover.open('missing');
    expect(result).toBe(false);
  });

  it('should return false if close is run with a popover it could not find', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });

    const result = popover.close('missing');
    expect(result).toBe(false);
  });
});
