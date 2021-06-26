import Popover from '../index.js';
import { show } from '../src/js/show';
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

describe('show()', () => {
  test('should show the provided popover', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection[0].state).toBe('hide');
    expect(popover.collection[0].target).not.toHaveClass('is-active');
    show(popover.collection[0], popover);
    expect(popover.collection[0].state).toBe('show');
    expect(popover.collection[0].target).toHaveClass('is-active');
  });
});
