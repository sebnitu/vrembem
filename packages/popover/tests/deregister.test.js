import Popover from '../index.js';
import { deregister } from '../src/js/deregister';
import '@testing-library/jest-dom/extend-expect';

let popover;

const markup = `
  <div id="app">
    <button id="asdf-trigger" aria-controls="asdf">...</button>
    <div id="asdf" class="popover">
      ...
    </div>
    <button id="fdsa-trigger" aria-controls="fdsa">...</button>
    <div id="fdsa" class="popover" style="--popover-event: hover;">
      ...
    </div>
    <button id="third" aria-controls="missing">...</button>
  </div>
`;

describe('deregister()', () => {
  test('should deregister a popover and do nothing for popovers not in collection', () => {
    document.body.innerHTML = markup;
    popover = new Popover({ autoInit: true });
    expect(popover.collection.length).toBe(2);
    const item = popover.collection[0];
    deregister.call(popover, item);
    expect(popover.collection.length).toBe(1);
    deregister.call(popover, item);
    expect(popover.collection.length).toBe(1);
  });
});
