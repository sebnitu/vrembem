/**
 * @jest-environment jsdom
 */

import ScrollStash from '../src/index';
import '@testing-library/jest-dom/extend-expect';
import { throttleDelay } from './helpers/throttleDelay';

let scrollStash;

const markup = `
  <div data-scroll-stash="example-1" data-scroll-stash-anchor=".anchor">
    <span class="top"></span>
    <span class="anchor-parent">
      <span class="anchor"></span>
    </span>
    <span class="bot"></span>
  </div>
  <div data-scroll-stash="example-2">
    <span class="anchor-parent">
      <span class="anchor"></span>
    </span>
  </div>
  <div data-scroll-stash="example-3"></div>
  <div data-scroll-stash=""></div>
`;

const markupSimple = `
  <div data-scroll-stash="example" data-scroll-stash-anchor="[data-anchor]">
    <span data-anchor></span>
  </div>
`;

beforeEach(() => {
  document.body.innerHTML = markup;
  window.HTMLElement.prototype.scroll = jest.fn();
});

afterEach(() => {
  if (scrollStash) {
    scrollStash.destroy();
    scrollStash = null;
  }
});

test('should save scroll stash instances and scroll position on init', () => {
  scrollStash = new ScrollStash({ autoInit: true });
  const storage = JSON.parse(localStorage.getItem('ScrollStash'));
  expect(scrollStash.state).toEqual(storage);
});

test('should update state on scrolll event', async () => {
  scrollStash = new ScrollStash({ autoInit: true });
  const el1 = document.querySelector('[data-scroll-stash="example-1"]');
  const el2 = document.querySelector('[data-scroll-stash="example-2"]');
  const el3 = document.querySelector('[data-scroll-stash="example-3"]');
  el1.scrollTop = 100;
  el2.scrollTop = 200;
  el3.scrollTop = 300;
  el1.dispatchEvent(new CustomEvent('scroll'));
  await throttleDelay();
  const storage = JSON.parse(localStorage.getItem('ScrollStash'));
  expect(scrollStash.state).toEqual(storage);
  expect(scrollStash.state['example-1']).toEqual(100);
  expect(scrollStash.state['example-2']).toEqual(200);
  expect(scrollStash.state['example-3']).toEqual(300);
});

test('should apply saved scroll state to a fresh document', () => {
  localStorage.setItem('ScrollStash', JSON.stringify({
    'example-1': 25,
    'example-2': 50,
    'example-3': 75,
  }));
  const el1 = document.querySelector('[data-scroll-stash="example-1"]');
  const el2 = document.querySelector('[data-scroll-stash="example-2"]');
  const el3 = document.querySelector('[data-scroll-stash="example-3"]');
  expect(el1.scrollTop).toBe(0);
  expect(el2.scrollTop).toBe(0);
  expect(el3.scrollTop).toBe(0);

  scrollStash = new ScrollStash({ autoInit: true });
  const storage = JSON.parse(localStorage.getItem('ScrollStash'));
  expect(scrollStash.state).toEqual(storage);
  expect(el1.scrollTop).toBe(25);
  expect(el2.scrollTop).toBe(50);
  expect(el3.scrollTop).toBe(75);
});

test('should not throw error if element in localStorage is not present on page', () => {
  const el1 = document.querySelector('[data-scroll-stash="example-1"]');
  const el2 = document.querySelector('[data-scroll-stash="example-2"]');
  const el3 = document.querySelector('[data-scroll-stash="example-3"]');
  localStorage.setItem('ScrollStash', JSON.stringify({
    'example-asdf': 25,
    'example-2': 50,
    'example-3': 75,
  }));
  scrollStash = new ScrollStash();
  expect(scrollStash.init.bind(scrollStash)).not.toThrow();
  expect(el1.scrollTop).toBe(0);
  expect(el2.scrollTop).toBe(50);
  expect(el3.scrollTop).toBe(75);
});

test('throttle delay prevents multiple save calls from being fired', async () => {
  const el = document.querySelector('[data-scroll-stash="example-1"]');
  let count = 0;
  window.addEventListener('scroll-stash:saved', () => {
    count++;
  });
  scrollStash = new ScrollStash({ autoInit: true });
  expect(scrollStash.state['example-1']).toBe(0);
  expect(count).toBe(1);
  el.scrollTop = 100;
  el.dispatchEvent(new CustomEvent('scroll'));
  el.dispatchEvent(new CustomEvent('scroll'));
  el.dispatchEvent(new CustomEvent('scroll'));
  await throttleDelay();
  expect(scrollStash.state['example-1']).toBe(100);
  expect(count).toBe(2);
});

test('should scroll to anchor when anchor selector is set', () => {
  scrollStash = new ScrollStash({
    autoInit: true,
    selectorAnchor: '.anchor',
    selectorAnchorParent: '.anchor-parent',
  });
  const el = document.querySelector('[data-scroll-stash="example-1"]');
  expect(el.scroll).toHaveBeenCalledWith({ behavior: 'auto', top: -16 });
});

test('should not throw error if anchor parent doesn not return an element', () => {
  scrollStash = new ScrollStash({
    autoInit: true,
    selectorAnchor: '.anchor',
    selectorAnchorParent: '.anchor-asdf',
  });
  const el = document.querySelector('[data-scroll-stash="example-2"]');
  expect(el.scroll).toHaveBeenCalledTimes(2);
});

test('should scroll to anchor while adjusting for top elements', () => {
  const el = document.querySelector('[data-scroll-stash="example-1"]');
  el.scrollTop = 30;
  scrollStash = new ScrollStash({
    autoInit: true,
    selectorAnchor: '.anchor',
    selectorTopElem: '.top',
    selectorBotElem: '.bot',
  });
  expect(el.scroll).toHaveBeenCalledWith({ behavior: 'auto', top: -16 });
});

test('should scroll to anchor while adjusting for bottom elements', () => {
  const el = document.querySelector('[data-scroll-stash="example-1"]');
  el.scrollTop = -30;
  scrollStash = new ScrollStash({
    autoInit: true,
    selectorAnchor: '.anchor',
    selectorTopElem: '.top',
    selectorBotElem: '.bot',
  });
  expect(el.scroll).toHaveBeenCalledWith({ behavior: 'auto', top: 16 });
});

test('should not scroll if anchor is already in view', () => {
  const el = document.querySelector('[data-scroll-stash="example-1"]');
  let result;
  scrollStash = new ScrollStash({
    autoInit: true,
    selectorAnchor: '.anchor',
    anchorPadding: 0,
  });
  result = scrollStash.anchorShow(el);
  expect(result.scrolled).toBe(false);

  scrollStash.destroy();
  scrollStash.init({
    alignment: 'start'
  });
  scrollStash.anchorShow(el);
  result = scrollStash.anchorShow(el);
  expect(result.scrolled).toBe(false);

  scrollStash.destroy();
  scrollStash.init({
    alignment: 'center'
  });
  scrollStash.anchorShow(el);
  result = scrollStash.anchorShow(el);
  expect(result.scrolled).toBe(false);

  scrollStash.destroy();
  scrollStash.init({
    alignment: 'end'
  });
  result = scrollStash.anchorShow(el);
  expect(result.scrolled).toBe(false);
});

test('should not throw error if selector top and bottom elements aren\'t found', () => {
  const el = document.querySelector('[data-scroll-stash="example-1"]');
  scrollStash = new ScrollStash({
    selectorAnchor: '.anchor',
    selectorTopElem: '.top-asdf',
    selectorBotElem: '.bo-asdft',
  });
  expect(scrollStash.init.bind(scrollStash)).not.toThrow();
  expect(el.scroll).toHaveBeenCalled();
});

test('should ignore anchor selector if data value is set to false or ignore', () => {
  const el1 = document.querySelector('[data-scroll-stash="example-1"]');
  const el2 = document.querySelector('[data-scroll-stash="example-2"]');
  el1.dataset.scrollStashAnchor = 'false';
  el2.dataset.scrollStashAnchor = 'false';
  scrollStash = new ScrollStash({
    autoInit: true,
    selectorAnchor: '.anchor',
  });
  expect(el1.scroll).not.toHaveBeenCalled();

  scrollStash.destroy();
  el1.dataset.scrollStashAnchor = 'ignore';
  el2.dataset.scrollStashAnchor = 'ignore';
  scrollStash = new ScrollStash({
    autoInit: true,
    selectorAnchor: '.anchor',
  });
  expect(el1.scroll).not.toHaveBeenCalled();

  scrollStash.destroy();
  delete el1.dataset.scrollStashAnchor;
  delete el2.dataset.scrollStashAnchor;
  scrollStash = new ScrollStash({
    autoInit: true,
    selectorAnchor: '.anchor',
  });
  expect(el1.scroll).toHaveBeenCalled();
});

test('should not throw error if data anchor is not found', () => {
  const el = document.querySelector('[data-scroll-stash="example-1"]');
  el.dataset.scrollStashAnchor = '.asdf';
  scrollStash = new ScrollStash({
    selectorAnchor: '.anchor',
  });
  expect(scrollStash.init.bind(scrollStash)).not.toThrow();
  expect(el.scroll).toHaveBeenCalled();
});

test('should scroll to anchor when anchorShow api is called', () => {
  scrollStash = new ScrollStash({
    autoInit: true,
    selectorAnchor: '.anchor',
  });
  const el = document.querySelector('[data-scroll-stash="example-1"]');
  scrollStash.anchorShow(el);
  expect(el.scroll).toHaveBeenCalled();
});

test('should scroll with custom behavior when anchorShow api is called', () => {
  scrollStash = new ScrollStash({
    autoInit: true,
    selectorAnchor: '.anchor',
  });
  const el = document.querySelector('[data-scroll-stash="example-1"]');
  scrollStash.anchorShow(el, 'smooth');
  expect(el.scroll).toHaveBeenLastCalledWith({ behavior: 'smooth', top: -16 });
});

test('should scroll to anchor using alignment options', () => {
  document.body.innerHTML = markupSimple;
  const el = document.querySelector('[data-scroll-stash="example"]');
  scrollStash = new ScrollStash({
    autoInit: true,
    alignment: 'start'
  });
  expect(el.scroll).toHaveBeenCalledTimes(1);

  scrollStash.destroy();
  scrollStash = new ScrollStash({
    autoInit: true,
    alignment: 'center'
  });
  expect(el.scroll).toHaveBeenCalledTimes(1);

  scrollStash.destroy();
  scrollStash = new ScrollStash({
    autoInit: true,
    alignment: 'end'
  });
  expect(el.scroll).toHaveBeenCalledTimes(2);

  scrollStash.destroy();
  scrollStash = new ScrollStash({
    autoInit: true,
    alignment: 'nearest'
  });
  expect(el.scroll).toHaveBeenCalledTimes(3);

  scrollStash.destroy();
  scrollStash = new ScrollStash({
    autoInit: true,
    alignment: 'asdf'
  });
  expect(el.scroll).toHaveBeenCalledTimes(3);
});

test('should be able to set options via init api call', () => {
  scrollStash = new ScrollStash();
  scrollStash.init({
    selectorAnchor: '.anchor',
  });
  const storage = JSON.parse(localStorage.getItem('ScrollStash'));
  throttleDelay();
  expect(scrollStash.state).toEqual(storage);
});

test('should return anchor on anchorGet api call', () => {
  scrollStash = new ScrollStash({ autoInit: true });
  const el = document.querySelector('[data-scroll-stash]');
  const anchor = scrollStash.anchorGet(el);
  expect(anchor).toHaveClass('anchor');
});
