import { Drawer } from "../index.js"
import "@testing-library/jest-dom/extend-expect"

let drawer
const ev = new Event("transitionend")

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer" data-drawer="drawer-one" tabindex="-1">
      <div class="drawer__item">
        <button class="close-one" data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer" data-drawer="drawer-two" tabindex="-1">
      <div class="drawer__item">
        <button class="close-two" data-drawer-close data-drawer-focus>
          Close
        </button>
      </div>
    </div>
    <div class="drawer__main">
      <button class="toggle-one" data-drawer-toggle="drawer-one">
        Drawer Toggle
      </button>
      <button class="toggle-two" data-drawer-toggle="drawer-two">
        Drawer Toggle
      </button>
    </div>
  </div>
`

afterEach(() => {
  drawer.destroy()
  drawer = null
  document.body.innerHTML = null
})

test("should focus drawer element and refocus trigger when closed", () => {
  document.body.innerHTML = markup
  drawer = new Drawer({ autoInit: true })
  const el = document.querySelector("[data-drawer='drawer-one']")
  const btn = document.querySelector(".toggle-one")
  const btnClose = document.querySelector(".close-one")

  btn.click()
  el.dispatchEvent(ev)
  expect(el).toHaveFocus()

  btnClose.click()
  el.dispatchEvent(ev)
  expect(btn).toHaveFocus()
})

test("should focus data-drawer-focus element and refocus trigger when closed", () => {
  document.body.innerHTML = markup
  drawer = new Drawer({ autoInit: true })
  const el = document.querySelector("[data-drawer='drawer-two']")
  const btn = document.querySelector(".toggle-two")
  const btnClose = document.querySelector(".close-two")

  btn.click()
  el.dispatchEvent(ev)
  expect(btnClose).toHaveFocus()

  btnClose.click()
  el.dispatchEvent(ev)
  expect(btn).toHaveFocus()
})

test("should not change focus when feature is disabled", () => {
  document.body.innerHTML = markup
  drawer = new Drawer({
    autoInit: true,
    focus: false
  })
  const el = document.querySelector("[data-drawer='drawer-two']")
  const btn = document.querySelector(".toggle-two")
  const btnClose = document.querySelector(".close-two")

  btn.click()
  el.dispatchEvent(ev)
  expect(btnClose).not.toHaveFocus()

  btnClose.click()
  el.dispatchEvent(ev)
  expect(btn).not.toHaveFocus()
})

// TODO: Test that using a custom dataFocus options works
