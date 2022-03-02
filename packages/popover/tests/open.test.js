import Popover from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let popover;

jest.useFakeTimers();

const markup = `
  <button aria-controls="asdf">...</button>
  <div id="asdf" class="popover">...</div>
  <span aria-describedby="fdsa">...</span>
  <div id="fdsa" class="popover popover_tooltip" role="tooltip">...</div>
`;

afterEach(() => {
  popover.destroy();
  popover = null;
  document.body.innerHTML = null;
});

describe('open()', () => {
  it('should open the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    const el = popover.get('asdf');
    expect(el.state).toBe('closed');
    expect(el.target).not.toHaveClass('is-active');
    expect(el.trigger.getAttribute('aria-expanded')).toBe('false');
    el.open();
    expect(el.state).toBe('opened');
    expect(el.target).toHaveClass('is-active');
    expect(el.trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('should open the provided popover tooltip', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    const el = popover.get('fdsa');
    expect(el.state).toBe('closed');
    expect(el.target).not.toHaveClass('is-active');
    expect(el.trigger.hasAttribute('aria-expanded')).toBe(false);
    el.open();
    expect(el.state).toBe('opened');
    expect(el.target).toHaveClass('is-active');
    expect(el.trigger.hasAttribute('aria-expanded')).toBe(false);
  });
});
