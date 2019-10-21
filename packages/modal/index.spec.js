const puppeteer = require("puppeteer")

test("should be titled 'Modal Test'", async () => {
  const browser = await puppeteer.launch() // { headless: false }
  const page = await browser.newPage()
  await page.goto(`file:///${__dirname}/test.html`)
  await page.screenshot({ path: `${__dirname}/screenshot.png` })
  await expect(page.title()).resolves.toMatch("Modal Test")
  await browser.close()
})
