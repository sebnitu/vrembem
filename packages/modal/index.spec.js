import { Modal } from "./index.js"
import "@testing-library/jest-dom/extend-expect"

// import puppeteer from "puppeteer"
// import fs from "fs"

// let browser
// let page

const modalDefault = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div data-modal="modal-default" class="modal" tabindex="-1">
    <div class="modal__dialog">
      <p>Modal Default</p>
      <button data-modal-close data-modal-focus>Close</button>
    </div>
  </div>
`

// beforeAll( async () => {
//   if (!fs.existsSync(`${__dirname}/screenshots`)) {
//     fs.mkdirSync(`${__dirname}/screenshots`)
//   }
//   browser = await puppeteer.launch({ headless: false }) // { headless: false }
// })

// beforeEach( async () => {
//   page = await browser.newPage()
//   await page.goto(`file:///${__dirname}/test.html`)
//   await expect(page.title()).resolves.toMatch("@vrembem/modal")
// })

describe("Default modals", () => {

  test("should apply state classes on 'click' and 'transition end' events", async () => {
    document.body.innerHTML = modalDefault
    const m = new Modal()
    const e = new Event("transitionend")
    const modal = document.querySelector("[data-modal]")
    const open = document.querySelector("[data-modal-open]")
    const close = document.querySelector("[data-modal-close]")

    m.init()
    expect(modal).toHaveClass("modal")

    open.click()
    expect(modal).toHaveClass("is-opening")

    modal.dispatchEvent(e)
    expect(modal).toHaveClass("is-open")

    close.click()
    expect(modal).toHaveClass("is-closing")

    modal.dispatchEvent(e)
    expect(modal).toHaveClass("modal")
    expect(modal).not.toHaveClass("is-opening")
    expect(modal).not.toHaveClass("is-open")
    expect(modal).not.toHaveClass("is-closing")

    // expect(action.indeterminate).toBe(true)
    // await page.click("[data-modal-open]")
    // const open = await page.waitForSelector("[data-modal]", {
    //   visible: true
    // })
    // await expect(open)
    // await page.screenshot({ path: `${__dirname}/screenshots/default-modal-open.png` })
    //
    // await page.click("[data-modal-close]")
    // const close = await page.waitForSelector("[data-modal]", {
    //   hidden: true
    // })
    // await expect(close)
    // await page.screenshot({ path: `${__dirname}/screenshots/default-modal-close.png` })
  })

})

// afterEach( async () => {
//   await page.close()
// })

// afterAll( async () => {
//   await browser.close()
// })
