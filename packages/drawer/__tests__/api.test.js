import { Drawer } from "../index.js"
import "@testing-library/jest-dom/extend-expect"

let drawer
const ev = new Event("transitionend")

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer" data-drawer="drawer-default">
      <div class="drawer__item">
        <button data-drawer-close>Close</button>
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

test("should toggle drawer using api call", () => {
  document.body.innerHTML = markup
  drawer = new Drawer()
  const el = document.querySelector("[data-drawer]")

  drawer.init()
  expect(el).toHaveClass("drawer")

  drawer.toggle("drawer-default")
  expect(el).toHaveClass("is-opening")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("is-open")

  drawer.toggle("drawer-default")
  expect(el).toHaveClass("is-closing")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("drawer")
  expect(el).not.toHaveClass("is-opening")
  expect(el).not.toHaveClass("is-open")
  expect(el).not.toHaveClass("is-closing")
})

test("should open drawer using api call", () => {
  document.body.innerHTML = markup
  drawer = new Drawer()
  const el = document.querySelector("[data-drawer]")

  drawer.init()
  expect(el).toHaveClass("drawer")

  drawer.open("drawer-default")
  expect(el).toHaveClass("is-opening")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("drawer is-open")
  expect(el).not.toHaveClass("is-opening")
  expect(el).not.toHaveClass("is-closing")
})

test("should close drawer using api call", () => {
  document.body.innerHTML = markup
  drawer = new Drawer()
  const el = document.querySelector("[data-drawer]")
  const btnOpen = document.querySelector("[data-drawer-toggle]")

  drawer.init()
  expect(el).toHaveClass("drawer")

  btnOpen.click()
  expect(el).toHaveClass("is-opening")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("drawer is-open")
  expect(el).not.toHaveClass("is-opening")
  expect(el).not.toHaveClass("is-closing")

  drawer.close("drawer-default")
  expect(el).toHaveClass("is-closing")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("drawer")
  expect(el).not.toHaveClass("is-open")
  expect(el).not.toHaveClass("is-opening")
  expect(el).not.toHaveClass("is-closing")
})

test("should fire callback when using toggle api", () => {
  document.body.innerHTML = markup
  drawer = new Drawer({ autoInit: true })
  const el = document.querySelector("[data-drawer]")
  let callbackCheck = false

  drawer.toggle("drawer-default", () => {
    callbackCheck = true
  })
  el.dispatchEvent(ev)
  expect(callbackCheck).toBe(true)
})

test("should fire callback when using open api", () => {
  document.body.innerHTML = markup
  drawer = new Drawer({ autoInit: true })
  const el = document.querySelector("[data-drawer]")
  let callbackCheck = false

  drawer.open("drawer-default", () => {
    callbackCheck = true
  })
  el.dispatchEvent(ev)
  expect(callbackCheck).toBe(true)
})

test("should fire callback when using close api", () => {
  document.body.innerHTML = markup
  drawer = new Drawer({ autoInit: true })
  const el = document.querySelector("[data-drawer]")
  let callbackCheck = false

  drawer.open("drawer-default")
  el.dispatchEvent(ev)

  drawer.close("drawer-default", () => {
    callbackCheck = true
  })
  el.dispatchEvent(ev)
  expect(callbackCheck).toBe(true)
})

test("should properly destroy drawer instance on api call", () => {
  document.body.innerHTML = markup
  drawer = new Drawer({ autoInit: true })
  const el = document.querySelector("[data-drawer]")
  const btnOpen = document.querySelector("[data-drawer-toggle]")

  drawer.destroy()
  btnOpen.click()
  el.dispatchEvent(ev)
  expect(el).not.toHaveClass("is-open")
  expect(Object.getOwnPropertyNames(localStorage).length).toBe(0)
  expect(Object.getOwnPropertyNames(drawer.state).length).toBe(0)
})
