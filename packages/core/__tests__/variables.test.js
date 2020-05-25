import { breakpoint } from '../index';

test('breakpoint has all size keys with a px value', () => {
  expect(breakpoint).toHaveProperty('xs', expect.stringContaining('px'));
  expect(breakpoint).toHaveProperty('sm', expect.stringContaining('px'));
  expect(breakpoint).toHaveProperty('md', expect.stringContaining('px'));
  expect(breakpoint).toHaveProperty('lg', expect.stringContaining('px'));
  expect(breakpoint).toHaveProperty('xl', expect.stringContaining('px'));
});

test('breakpoints increment in the order of their keys', () => {
  let intObj = {};
  for (let prop in breakpoint) {
    intObj[prop] = parseInt(breakpoint[prop]);
  }
  expect(intObj.xs).toBeLessThan(intObj.sm);
  expect(intObj.sm).toBeLessThan(intObj.md);
  expect(intObj.md).toBeLessThan(intObj.lg);
  expect(intObj.lg).toBeLessThan(intObj.xl);
});
