import { hyphenCase } from '../index';
import * as u from '../dist/scripts.js';

test('properly converts camel case string to a hyphen separated string', () => {
  const str = hyphenCase('someStringGoesHere');
  expect(str).toMatch('some-string-goes-here');
});

test('properly converts camel case string to a hyphen separated string from cjs import', () => {
  const str = u.hyphenCase('someStringGoesHere');
  expect(str).toMatch('some-string-goes-here');
});
