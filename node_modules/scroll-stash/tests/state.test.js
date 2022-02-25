import 'expect-puppeteer';
import path from 'path';
import { throttleDelay } from './helpers/throttleDelay';
import defaults from '../src/defaults';

let maxScroll;

beforeAll(async () => {
  await page.goto(`file:${path.join(__dirname, '../example.html')}`);
  maxScroll = await page.$eval('#page', (el) => {
    return (el.scrollHeight - el.offsetHeight);
  });
});

test('should save all scroll-stash elements to local storage', async () => {
  const initialState = {
    'page': 0,
    'example-1': 0,
    'example-2': 217,
    'example-3': 107,
    'example-4': 217
  };
  await throttleDelay(defaults.throttleDelay * 2);
  const savedState = JSON.parse(await page.evaluate(() => {
    return localStorage.getItem('ScrollStash');
  }));
  expect(Object.keys(savedState).length).toEqual(5);
  expect(savedState).toEqual(initialState);
});

test('should update local storage when any scroll position changes', async () => {
  const expectedState = {
    'page': maxScroll,
    'example-1': 100,
    'example-2': 300,
    'example-3': 200,
    'example-4': 300
  };

  const el_1 = await page.$eval('[data-scroll-stash="example-1"]', (el, obj) => {
    document.querySelector('#example-1').scrollIntoView();
    el.scrollTop = obj['example-1'];
    return el.scrollTop;
  }, expectedState);
  expect(el_1).toBe(100);

  const el_2 = await page.$eval('[data-scroll-stash="example-2"]', (el, obj) => {
    document.querySelector('#example-2').scrollIntoView();
    el.scrollTop = obj['example-2'];
    return el.scrollTop;
  }, expectedState);
  expect(el_2).toBe(300);

  const el_3 = await page.$eval('[data-scroll-stash="example-3"]', (el, obj) => {
    document.querySelector('#example-3').scrollIntoView();
    el.scrollTop = obj['example-3'];
    return el.scrollTop;
  }, expectedState);
  expect(el_3).toBe(200);

  const el_4 = await page.$eval('[data-scroll-stash="example-4"]', (el, obj) => {
    document.querySelector('#example-4').scrollIntoView();
    el.scrollTop = obj['example-4'];
    return el.scrollTop;
  }, expectedState);
  expect(el_4).toBe(300);

  const el_page = await page.$eval('[data-scroll-stash="page"]', (el) => {
    el.scrollTop = 9999;
    return el.scrollTop;
  });
  expect(el_page).toBe(maxScroll);

  await throttleDelay();

  const savedState = JSON.parse(await page.evaluate(() => {
    return localStorage.getItem('ScrollStash');
  }));

  expect(savedState).toEqual(expectedState);
});

test('should apply scroll state when page is reloaded', async () => {
  await page.reload();
  await throttleDelay();

  const savedState = JSON.parse(await page.evaluate(() => {
    return localStorage.getItem('ScrollStash');
  }));

  const currentState = await page.$$eval('[data-scroll-stash]', (els) => {
    const obj = {};
    els.forEach((el) => {
      const id = el.dataset['scrollStash'];
      if (id) obj[id] = el.scrollTop;
    });
    return obj;
  });
  expect(currentState).toEqual(savedState);
});
