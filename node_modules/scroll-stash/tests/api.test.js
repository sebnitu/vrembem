import 'expect-puppeteer';
import path from 'path';

const scrollAnimationDelay = 300;

beforeAll(async () => {
  await page.goto(`file:${path.join(__dirname, '../example.html')}`);
  await page.waitForTimeout(scrollAnimationDelay);
});

test('should scroll to anchor on anchorShow api call', async () => {
  // Setup
  let result = await page.$eval('[data-scroll-stash="example-2"]', (el) => {
    el.scrollTop = 0;
    return el.scrollTop;
  });
  expect(result).toBe(0);
  await page.waitForTimeout(scrollAnimationDelay);

  // Click button and wait for animation
  await page.$eval('[data-scroll-stash="example-2"]', (el) => {
    const btn = el.closest('.example').querySelector('.js-api-anchor-show');
    btn.click();
  });
  await page.waitForTimeout(scrollAnimationDelay);

  // Check scroll position
  result = await page.$eval('[data-scroll-stash="example-2"]', (el) => {
    return el.scrollTop;
  });
  expect(result).toBe(217);
});

test('should scroll to anchor from top with space adjustments on anchorShow api call', async () => {
  // Setup
  let result = await page.$eval('[data-scroll-stash="example-3"]', (el) => {
    el.scrollTop = 0;
    return el.scrollTop;
  });
  expect(result).toBe(0);
  await page.waitForTimeout(scrollAnimationDelay);

  // Click button and wait for animation
  await page.$eval('[data-scroll-stash="example-3"]', (el) => {
    const btn = el.closest('.example').querySelector('.js-api-anchor-show');
    btn.click();
  });
  await page.waitForTimeout(scrollAnimationDelay);

  // Check scroll position
  result = await page.$eval('[data-scroll-stash="example-3"]', (el) => {
    return el.scrollTop;
  });
  expect(result).toBe(107);
});

test('should scroll to anchor from bottom with space adjustments on anchorShow api call', async () => {
  // Setup
  let result = await page.$eval('[data-scroll-stash="example-3"]', (el) => {
    el.scrollTop = 9999;
    return el.scrollTop;
  });
  expect(result).toBe(517);
  await page.waitForTimeout(scrollAnimationDelay);

  // Click button and wait for animation
  await page.$eval('[data-scroll-stash="example-3"]', (el) => {
    const btn = el.closest('.example').querySelector('.js-api-anchor-show');
    btn.click();
  });
  await page.waitForTimeout(scrollAnimationDelay);

  // Check scroll position
  result = await page.$eval('[data-scroll-stash="example-3"]', (el) => {
    return el.scrollTop;
  });
  expect(result).toBe(369);
});

test('should scroll to custom anchor on anchorShow api call', async () => {
  // Setup
  let result = await page.$eval('[data-scroll-stash="example-4"]', (el) => {
    el.scrollTop = 0;
    return el.scrollTop;
  });
  expect(result).toBe(0);
  await page.waitForTimeout(scrollAnimationDelay);

  // Click button and wait for animation
  await page.$eval('[data-scroll-stash="example-4"]', (el) => {
    const btn = el.closest('.example').querySelector('.js-api-anchor-show');
    btn.click();
  });
  await page.waitForTimeout(scrollAnimationDelay);

  // Check scroll position
  result = await page.$eval('[data-scroll-stash="example-4"]', (el) => {
    return el.scrollTop;
  });
  expect(result).toBe(217);
});
