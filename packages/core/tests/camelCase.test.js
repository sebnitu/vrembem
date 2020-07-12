import { camelCase } from '../index';
import * as u from '../dist/scripts.cjs.js';

test('properly converts a dash string to camel case', () => {
  const str = camelCase('some-string-goes-here');
  expect(str).toMatch('someStringGoesHere');
});

test('properly converts a dash string to camel case from cjs import', () => {
  const str = u.camelCase('some-string-goes-here');
  expect(str).toMatch('someStringGoesHere');
});
