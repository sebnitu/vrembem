import 'expect-puppeteer';
import path from 'path';

const scrollAnimationDelay = 300;

let eLog = {
  anchor: [],
  saved: [],
};

test('should re-initialize scroll-stash instance on api call', async () => {
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
  await page.waitForTimeout(scrollAnimationDelay);

  let result = await page.evaluate(() => {
    document.querySelector('.js-api-destroy').click();
    return localStorage.getItem('ScrollStash');
  });

  await page.waitForTimeout(scrollAnimationDelay);
  expect(result).toBe(null);

  const eSavedCount = eLog.saved.length;
  const eAnchorCount = eLog.anchor.length;

  result = await page.evaluate(() => {
    document.querySelector('.js-api-init').click();
    return localStorage.getItem('ScrollStash');
  });

  await page.waitForTimeout(scrollAnimationDelay);
  expect(result).not.toBe(null);
  expect(eLog.saved.length).toBe(eSavedCount + 1);
  expect(eLog.anchor.length).toBe(eAnchorCount);
});
