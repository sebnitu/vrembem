import Popover from '../index.js';
import { open } from '../src/js/open';
import '@testing-library/jest-dom/extend-expect';

let popover;

jest.useFakeTimers();

const markup = `
  <div id="app">
    <button data-popover-trigger>...</button>
    <div class="popover" data-popover>
      ...
    </div>
  </div>
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
    open(popover.collection[0], popover);
    expect(popover.collection[0].state).toBe('opened');
    expect(popover.collection[0].target).toHaveClass('is-active');
  });
});
