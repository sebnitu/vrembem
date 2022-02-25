import Popover from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let popover;

jest.useFakeTimers();

const markup = `
  <button aria-controls="asdf">...</button>
  <div id="asdf" class="popover">...</div>
`;

afterEach(() => {
  popover.destroy();
  popover = null;
  document.body.innerHTML = null;
});

describe('open()', () => {
  test('should open the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection[0].state).toBe('closed');
    expect(popover.collection[0].target).not.toHaveClass('is-active');
    popover.open(popover.collection[0].id);
    expect(popover.collection[0].state).toBe('opened');
    expect(popover.collection[0].target).toHaveClass('is-active');
  });
});
