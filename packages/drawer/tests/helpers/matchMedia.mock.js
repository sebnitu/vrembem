import { checkMatch } from './checkMatch';

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: checkMatch(query),
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  };
});
