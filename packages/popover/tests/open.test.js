import '@testing-library/jest-dom/vitest';
import Popover from '../index.js';

let popover;

vi.useFakeTimers();

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
  it('should open the provided popover', async () => {
    document.body.innerHTML = markup;
    popover = new Popover();
    await popover.init();
    const entry = popover.get('asdf');
    expect(entry.state).toBe('closed');
    expect(entry.el).not.toHaveClass('is-active');
    expect(entry.trigger.getAttribute('aria-expanded')).toBe('false');
    await entry.open();
    expect(entry.state).toBe('opened');
    expect(entry.el).toHaveClass('is-active');
    expect(entry.trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('should open the provided popover tooltip', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    const entry = popover.get('fdsa');
    expect(entry.state).toBe('closed');
    expect(entry.el).not.toHaveClass('is-active');
    expect(entry.trigger.hasAttribute('aria-expanded')).toBe(false);
    entry.open();
    expect(entry.state).toBe('opened');
    expect(entry.el).toHaveClass('is-active');
    expect(entry.trigger.hasAttribute('aria-expanded')).toBe(false);
  });
});
