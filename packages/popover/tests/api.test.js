import Popover from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let popover;

const markup = `
  <button data-popover-trigger>...</button>
  <div class="popover" data-popover>
    ...
  </div>
`;

afterEach(() => {
  popover.destroy();
  popover = null;
  document.body.innerHTML = null;
});

test('should initialize the popover module when init is run', () => {
  document.body.innerHTML = markup;
  popover = new Popover();
  popover.init();
  expect(popover.collection.length).toBe(1);
});
