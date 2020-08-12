import { breakpoints } from '../index';
import * as u from '../dist/scripts.js';

test('breakpoints has all size keys with a px value', () => {
  expect(breakpoints).toHaveProperty('xs', expect.stringContaining('px'));
  expect(breakpoints).toHaveProperty('sm', expect.stringContaining('px'));
  expect(breakpoints).toHaveProperty('md', expect.stringContaining('px'));
  expect(breakpoints).toHaveProperty('lg', expect.stringContaining('px'));
  expect(breakpoints).toHaveProperty('xl', expect.stringContaining('px'));

  expect(u.breakpoints).toHaveProperty('xs', expect.stringContaining('px'));
  expect(u.breakpoints).toHaveProperty('sm', expect.stringContaining('px'));
  expect(u.breakpoints).toHaveProperty('md', expect.stringContaining('px'));
  expect(u.breakpoints).toHaveProperty('lg', expect.stringContaining('px'));
  expect(u.breakpoints).toHaveProperty('xl', expect.stringContaining('px'));
});

test('breakpoints increment in the order of their keys', () => {
  let intObj = {};
  for (let prop in breakpoints) {
    intObj[prop] = parseInt(breakpoints[prop]);
  }
  expect(intObj.xs).toBeLessThan(intObj.sm);
  expect(intObj.sm).toBeLessThan(intObj.md);
  expect(intObj.md).toBeLessThan(intObj.lg);
  expect(intObj.lg).toBeLessThan(intObj.xl);
});

test('breakpoints increment in the order of their keys from cjs import', () => {
  let intObj = {};
  for (let prop in u.breakpoints) {
    intObj[prop] = parseInt(u.breakpoints[prop]);
  }
  expect(intObj.xs).toBeLessThan(intObj.sm);
  expect(intObj.sm).toBeLessThan(intObj.md);
  expect(intObj.md).toBeLessThan(intObj.lg);
  expect(intObj.lg).toBeLessThan(intObj.xl);
});
