import { Drawer } from "../index.js"
import "@testing-library/jest-dom/extend-expect"

let drawer
const ev = new Event("transitionend")
const keyEv = new KeyboardEvent("keyup", {
  keyCode: 27
})

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

const drawerModal = `
  <div class="drawer__wrapper">
    <div class="drawer drawer_modal" data-drawer="drawer-default">
      <div class="drawer__item">
        <button data-drawer-close data-drawer-focus>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-default">Drawer Toggle</button>
    </div>
  </div>
`

const drawerModalSwitch = `
  <div class="drawer__wrapper">
    <div class="drawer" data-drawer="drawer-key" data-drawer-modal="md">
      <div class="drawer__item">
        <button data-drawer-close data-drawer-focus>Close</button>
      </div>
    </div>
    <div class="drawer" data-drawer="drawer-exp" data-drawer-modal="300px">
      <div class="drawer__item">
        <button data-drawer-close data-drawer-focus>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-key">Drawer Toggle</button>
      <button data-drawer-toggle="drawer-exp">Drawer Toggle</button>
    </div>
  </div>
`

window.matchMedia = jest.fn().mockImplementation((query) => {
  let op = (query.includes("min-width")) ? ">" : "<"
  let value = query.replace("px)", "")
    .replace("(min-width:", "")
    .replace("(max-width:", "")

  let match = (op === ">") ?
    window.innerWidth > value:
    window.innerWidth < value

  return {
    matches: match,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }
})

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

test("should focus inner drawer element and refocus trigger when closed", () => {
  document.body.innerHTML = drawerDefault
  drawer = new Drawer({ autoInit: true })
  const el = document.querySelector("[data-drawer]")
  const btnOpen = document.querySelector("[data-drawer-toggle]")
  const btnClose = document.querySelector("[data-drawer-close]")

  btnOpen.click()
  el.dispatchEvent(ev)
  expect(btnClose).toHaveFocus()

  btnClose.click()
  el.dispatchEvent(ev)
  expect(btnOpen).toHaveFocus()
})

test("should close when root modal (screen) is clicked", () => {
  document.body.innerHTML = drawerModal
  drawer = new Drawer({ autoInit: true })
  const el = document.querySelector("[data-drawer]")
  const item = document.querySelector(".drawer__item")
  const btnOpen = document.querySelector("[data-drawer-toggle]")

  btnOpen.click()
  el.dispatchEvent(ev)

  item.click()
  expect(el).toHaveClass("is-open")

  el.click()
  expect(el).toHaveClass("is-closing")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("drawer drawer_modal")
  expect(el.classList.length).toBe(2)
})

test("should close when the escape key is pressed", () => {
  document.body.innerHTML = drawerModal
  drawer = new Drawer({ autoInit: true })
  const el = document.querySelector("[data-drawer]")
  const btnOpen = document.querySelector("[data-drawer-toggle]")

  btnOpen.click()
  expect(el).toHaveClass("drawer is-opening")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("drawer is-open")

  document.dispatchEvent(keyEv)
  expect(el).toHaveClass("drawer is-closing")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("drawer drawer_modal")
  expect(el.classList.length).toBe(2)
})

test("should switch to modal when below media breakpoint", () => {
  document.body.innerHTML = drawerModalSwitch
  drawer = new Drawer({ autoInit: true })
  const elKey = document.querySelector("[data-drawer='drawer-key']")
  const elExp = document.querySelector("[data-drawer='drawer-exp']")

  expect(elKey).not.toHaveClass("drawer_modal")
  expect(elKey.classList.length).toBe(1)
  expect(elExp).not.toHaveClass("drawer_modal")
  expect(elExp.classList.length).toBe(1)

  window.innerWidth = 600
  window.dispatchEvent(new Event("resize"))

  drawer.init()
  expect(elKey).toHaveClass("drawer drawer_modal")
  expect(elKey.classList.length).toBe(2)
  expect(elExp).not.toHaveClass("drawer_modal")
  expect(elExp.classList.length).toBe(1)

  window.innerWidth = 200
  window.dispatchEvent(new Event("resize"))

  drawer.init()
  expect(elKey).toHaveClass("drawer drawer_modal")
  expect(elKey.classList.length).toBe(2)
  expect(elExp).toHaveClass("drawer drawer_modal")
  expect(elExp.classList.length).toBe(2)
})
