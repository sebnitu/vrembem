import 'expect-puppeteer';
import path from 'path';

const scrollAnimationDelay = 300;

let eLog = {
  anchor: [],
  saved: [],
};

test('should properly destroy scroll-stash instance on api call', async () => {
  await page.exposeFunction('onCustomEvent', ({ type, detail, target }) => {
    if (type == 'scroll-stash:anchor') {
      eLog.anchor.push({ type, detail, target });
    } else if (type == 'scroll-stash:saved') {
      eLog.saved.push({ type, detail, target });
    }
  });

  await page.evaluateOnNewDocument(() => {
    window.addEventListener('scroll-stash:anchor', ({ type, detail, target }) => {
      window.onCustomEvent({ type, detail, target });
    });
    window.addEventListener('scroll-stash:saved', ({ type, detail, target }) => {
      window.onCustomEvent({ type, detail, target });
    });
  });

  await page.goto(`file:${path.join(__dirname, '../example.html')}`);

  const result = await page.evaluate(() => {
    document.querySelector('.js-api-destroy').click();
    return localStorage.getItem('ScrollStash');
  });
  await page.waitForTimeout(scrollAnimationDelay);
  expect(result).toBe(null);

  const eCount = eLog.saved.length;
  await page.$eval('#page', (el) => {
    el.scrollTop = 0;
  });
  await page.waitForTimeout(scrollAnimationDelay);
  expect(eLog.saved.length).toBe(eCount);
});
