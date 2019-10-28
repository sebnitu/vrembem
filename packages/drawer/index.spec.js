import { Drawer } from "./index.js"
import "@testing-library/jest-dom/extend-expect"

let drawer
const ev = new Event("transitionend")
// const keyEv = new KeyboardEvent("keyup", {
//   keyCode: 27
// })

const drawerDefault = `
  <div class="drawer__wrapper">
    <div class="drawer" data-drawer="drawer-default">
      <div class="drawer__item">
        <button data-drawer-close data-drawer-focus>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-default">Drawer Toggle</button>
    </div>
  </div>
`

afterEach(() => {
  drawer.destroy()
  drawer = null
  document.body.innerHTML = null
})

test("should apply state classes on 'click' and 'transition end' events", () => {
  document.body.innerHTML = drawerDefault
  drawer = new Drawer()
  const el = document.querySelector("[data-drawer]")
  const btnOpen = document.querySelector("[data-drawer-toggle]")
  const btnClose = document.querySelector("[data-drawer-close]")

  drawer.init()
  expect(el).toHaveClass("drawer")

  btnOpen.click()
  expect(el).toHaveClass("is-opening")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("is-open")

  btnClose.click()
  expect(el).toHaveClass("is-closing")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("drawer")
  expect(el).not.toHaveClass("is-opening")
  expect(el).not.toHaveClass("is-open")
  expect(el).not.toHaveClass("is-closing")
})
