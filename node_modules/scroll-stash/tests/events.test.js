import 'expect-puppeteer';
import path from 'path';
import { throttleDelay } from './helpers/throttleDelay';

let eLog = {
  anchor: [],
  applied: [],
  saved: [],
};

beforeAll(async () => {
  await page.exposeFunction('onCustomEvent', ({ type, detail, target }) => {
    if (type == 'scroll-stash:anchor') {
      eLog.anchor.push({ type, detail, target });
    } else if (type == 'scroll-stash:applied') {
      eLog.applied.push({ type, detail, target });
    } else if (type == 'scroll-stash:saved') {
      eLog.saved.push({ type, detail, target });
    }
  });

  await page.evaluateOnNewDocument(() => {
    window.addEventListener('scroll-stash:anchor', ({ type, detail, target }) => {
      window.onCustomEvent({ type, detail, target });
    });
    window.addEventListener('scroll-stash:applied', ({ type, detail, target }) => {
      window.onCustomEvent({ type, detail, target });
    });
    window.addEventListener('scroll-stash:saved', ({ type, detail, target }) => {
      window.onCustomEvent({ type, detail, target });
    });
  });

  await page.goto(`file:${path.join(__dirname, '../example.html')}`, {
    waitUntil: 'networkidle0'
  });
});

test('should emit custom event when scroll states are saved', async () => {
  const eCount = eLog.saved.length;
  await page.$eval('[data-scroll-stash="example-1"]', (el) => {
    document.querySelector('#example-1').scrollIntoView();
    el.scrollTop = 100;
  });
  await throttleDelay(500);
  expect(eLog.saved.length).toBe(eCount + 1);
  const current = eLog.saved[eLog.saved.length - 1];
  expect(current.type).toBe('scroll-stash:saved');
  expect(current.detail.state['example-1']).toBe(100);
});

test('should emit custom event when scolling anchors into view', async () => {
  const eCount = eLog.anchor.length;
  await page.evaluate(() => {
    localStorage.removeItem('ScrollStash');
  });
  await page.reload();
  await throttleDelay();
  const anchorScroll = await page.evaluate(() => {
    document.querySelector('#example-2').scrollIntoView();
    return [{
      key: 'example-2',
      scrolled: {
        behavior: 'auto',
        value: (document.querySelector('[data-scroll-stash="example-2"]').scrollTop)
      }
    }, {
      key: 'example-3',
      scrolled: {
        behavior: 'auto',
        value: (document.querySelector('[data-scroll-stash="example-3"]').scrollTop)
      }
    }, {
      key: 'example-4',
      scrolled: {
        behavior: 'auto',
        value: (document.querySelector('[data-scroll-stash="example-4"]').scrollTop)
      }
    }];
  });
  await throttleDelay();
  expect(eLog.anchor.length).toBe(eCount + 3);

  const current = eLog.anchor.slice(Math.max(eLog.anchor.length - 3, 0));

  current.forEach((el, i) => {
    expect(el.type).toBe('scroll-stash:anchor');
    expect(el.detail).toEqual(anchorScroll[i]);
  });
});

test('should emit custom event when scroll states are applied', async () => {
  const eCount = eLog.applied.length;
  await page.reload();
  await throttleDelay();
  const pageScroll = await page.$eval('[data-scroll-stash="page"]', (el) => {
    return el.scrollTop;
  });
  expect(eLog.applied.length).toBe(eCount + 1);
  const current = eLog.applied[eLog.applied.length - 1];
  expect(current.type).toBe('scroll-stash:applied');
  expect(current.detail.state.page).toBe(pageScroll);
});
