import Tooltip from '../index.js';
import '@testing-library/jest-dom/extend-expect';

let tooltip;

const markup = '';
console.log = jest.fn();

afterEach(() => {
  tooltip.destroy();
  tooltip = null;
  document.body.innerHTML = null;
});

describe('init() & destroy()', () => {
  test('should initialize the tooltip module when init is run', () => {
    document.body.innerHTML = markup;
    tooltip = new Tooltip();
    tooltip.init();
    expect(console.log).toHaveBeenCalledWith('init()...');
  });

  test('should destroy the tooltip module when destroy is run', () => {
    document.body.innerHTML = markup;
    tooltip = new Tooltip();
    tooltip.destroy();
    expect(console.log).toHaveBeenCalledWith('destroy()...');
  });
});
