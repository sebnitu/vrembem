import 'expect-puppeteer';
import path from 'path';

const scrollAnimationDelay = 300;

beforeAll(async () => {
  await page.goto(`file:${path.join(__dirname, '../example.html')}`);
});

test('should scroll to anchor from initial scroll position', async () => {
  await page.waitForTimeout(scrollAnimationDelay);
  const el = await page.$eval('[data-scroll-stash="example-2"]', (el) => {
    document.querySelector('#example-2').scrollIntoView();
    return el.scrollTop;
  });
  expect(el).toBe(217);
});

test('should scroll to anchor from saved scroll position', async () => {
  let el = await page.$eval('[data-scroll-stash="example-2"]', (el) => {
    document.querySelector('#example-2').scrollIntoView();
    el.scrollTop = 9999;
    return el.scrollTop;
  });
  expect(el).toBe(627);
  await page.waitForTimeout(scrollAnimationDelay);
  await page.reload();
  await page.waitForTimeout(scrollAnimationDelay);
  el = await page.$eval('[data-scroll-stash="example-2"]', (el) => {
    document.querySelector('#example-2').scrollIntoView();
    return el.scrollTop;
  });
  expect(el).toBe(369);
});

test('should scroll to anchor with spacing for sticky header', async () => {
  let el = await page.$eval('[data-scroll-stash="example-3"]', (el) => {
    document.querySelector('#example-3').scrollIntoView();
    return el.scrollTop;
  });
  expect(el).toBe(107);
});

test('should scroll to anchor with spacing for sticky footer', async () => {
  await page.$eval('[data-scroll-stash="example-3"]', (el) => {
    document.querySelector('#example-3').scrollIntoView();
    el.scrollTop = 9999;
  });
  await page.waitForTimeout(scrollAnimationDelay);
  await page.reload();
  await page.waitForTimeout(scrollAnimationDelay);
  let el = await page.$eval('[data-scroll-stash="example-3"]', (el) => {
    document.querySelector('#example-3').scrollIntoView();
    return el.scrollTop;
  });
  expect(el).toBe(369);
});

test('should scroll to custom anchor set in data attribute', async () => {
  const el = await page.$eval('[data-scroll-stash="example-4"]', (el) => {
    document.querySelector('#example-4').scrollIntoView();
    return el.scrollTop;
  });
  expect(el).toBe(217);
});

test('should disable anchor scrolling when data attribute is set to false', async () => {
  await page.setViewport({ height: 200, width: 800 });
  await page.$eval('[data-scroll-stash="page"]', (el) => {
    el.scrollTop = 0;
  });
  await page.waitForTimeout(scrollAnimationDelay);
  await page.reload();
  await page.waitForTimeout(scrollAnimationDelay);
  const el = await page.$eval('[data-scroll-stash="page"]', (el) => {
    return el.scrollTop;
  });
  expect(el).toBe(0);
});
