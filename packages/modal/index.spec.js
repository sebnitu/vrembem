import puppeteer from "puppeteer"
import fs from "fs"

let browser
let page

beforeAll( async () => {
  if (!fs.existsSync(`${__dirname}/screenshots`)) {
    fs.mkdirSync(`${__dirname}/screenshots`)
  }
  browser = await puppeteer.launch() // { headless: false }
})

beforeEach( async () => {
  page = await browser.newPage()
  await page.goto(`file:///${__dirname}/test.html`)
  await expect(page.title()).resolves.toMatch("@vrembem/modal")
})

describe("Default modals", () => {

  test("should open [data-modal] when [data-modal-open] is clicked", async () => {
    await page.click("[data-modal-open]")
    const open = await page.waitForSelector("[data-modal]", {
      visible: true
    })
    await expect(open)
    await page.screenshot({ path: `${__dirname}/screenshots/modal-open.png` })
  })

})

afterEach( async () => {
  await page.close()
})

afterAll( async () => {
  await browser.close()
})
