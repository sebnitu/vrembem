import '@testing-library/jest-dom/extend-expect';
import Popover from '../index.js';
import { closeAll, closeCheck } from '../src/js/close';

let popover;

jest.useFakeTimers();

const markup = `
  <button aria-controls="asdf">...</button>
  <div id="asdf" class="popover is-active" tabindex="0">...</div>
  <button aria-controls="fdsa">...</button>
  <div id="fdsa" class="popover is-active">...</div>
  <span aria-describedby="afsd">...</span>
  <div id="afsd" class="popover popover_tooltip is-active" role="tooltip">...</div>
`;

afterEach(() => {
  popover.destroy();
  popover = null;
  document.body.innerHTML = null;
});

describe('close()', () => {
  it('should close the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    const el = popover.get('asdf');
    expect(el.state).toBe('opened');
    expect(el.target).toHaveClass('is-active');
    expect(el.trigger.getAttribute('aria-expanded')).toBe('true');
    el.close();
    expect(el.state).toBe('closed');
    expect(el.target).not.toHaveClass('is-active');
    expect(el.trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('should close the provided popover tooltip', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    const el = popover.get('afsd');
    expect(el.state).toBe('opened');
    expect(el.target).toHaveClass('is-active');
    expect(el.trigger.hasAttribute('aria-expanded')).toBe(false);
    el.close();
    expect(el.state).toBe('closed');
    expect(el.target).not.toHaveClass('is-active');
    expect(el.trigger.hasAttribute('aria-expanded')).toBe(false);
  });
});

describe('closeAll()', () => {
  it('should close all popovers', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(3);
    expect(popover.collection[0].target).toHaveClass('is-active');
    expect(popover.collection[1].target).toHaveClass('is-active');
    closeAll.call(popover);
    expect(popover.collection[0].target).not.toHaveClass('is-active');
    expect(popover.collection[1].target).not.toHaveClass('is-active');
  });
});

describe('closeCheck()', () => {
  it('should close popover if closeCheck does not detect a hover or focus on trigger or target elements', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(3);
    closeCheck.call(popover, popover.collection[0]);
    jest.advanceTimersByTime(100);
    expect(popover.collection[0].target).not.toHaveClass('is-active');
  });

  it('should not close popover if closeCheck detects a focus on trigger elements', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    popover.collection[0].trigger.focus();
    closeCheck.call(popover, popover.collection[0]);
    jest.advanceTimersByTime(100);
    expect(popover.collection[0].target).toHaveClass('is-active');
  });

  it('should not close popover if closeCheck detects a focus on target elements', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    popover.collection[0].target.focus();
    closeCheck.call(popover, popover.collection[0]);
    jest.advanceTimersByTime(100);
    expect(popover.collection[0].target).toHaveClass('is-active');
  });
});
