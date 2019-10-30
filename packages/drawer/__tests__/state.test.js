import { Drawer } from "../index.js"
import "@testing-library/jest-dom/extend-expect"

let drawer
const ev = new Event("transitionend")

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer" data-drawer="drawer-one">
      <div class="drawer__item">
        <button class="close-one" data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer" data-drawer="drawer-two">
      <div class="drawer__item">
        <button class="close-two" data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer drawer_modal" data-drawer="drawer-three">
      <div class="drawer__item">
        <button class="close-three" data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button class="toggle-one" data-drawer-toggle="drawer-one">
        Drawer Toggle
      </button>
      <button class="toggle-two" data-drawer-toggle="drawer-two">
        Drawer Toggle
      </button>
      <button class="toggle-three" data-drawer-toggle="drawer-three">
        Drawer Toggle
      </button>
    </div>
  </div>
`

afterEach(() => {
  drawer.destroy()
  drawer = null
  localStorage.clear()
  document.body.innerHTML = null
})

test("should save initial states to local storage", () => {
  document.body.innerHTML = markup
  drawer = new Drawer({ autoInit: true })

  const state = JSON.parse(localStorage.getItem("DrawerState"))
  expect(state).toMatchObject(drawer.state)
  expect(state["drawer-one"]).toMatch("is-closed")
  expect(state["drawer-two"]).toMatch("is-closed")
})

test("should restore state based on existing values in local storage", () => {
  document.body.innerHTML = markup
  drawer = new Drawer()
  localStorage.setItem("DrawerState", JSON.stringify({
    "drawer-one": "is-open",
    "drawer-two": "is-open"
  }))
  const drawerOne = document.querySelector("[data-drawer='drawer-one']")
  const drawerTwo = document.querySelector("[data-drawer='drawer-two']")

  expect(drawerOne).not.toHaveClass("is-open")
  expect(drawerTwo).not.toHaveClass("is-open")

  drawer.init()
  expect(drawerOne).toHaveClass("is-open")
  expect(drawerTwo).toHaveClass("is-open")

  const state = JSON.parse(localStorage.getItem("DrawerState"))
  expect(state).toMatchObject(drawer.state)
})

test("should update local storage when toggle button changes state", () => {
  document.body.innerHTML = markup
  drawer = new Drawer()
  localStorage.setItem("DrawerState", JSON.stringify({
    "drawer-one": "is-close",
    "drawer-two": "is-close"
  }))
  const toggleOne = document.querySelector(".toggle-one")
  const toggleTwo = document.querySelector(".toggle-two")
  const drawerOne = document.querySelector("[data-drawer='drawer-one']")
  const drawerTwo = document.querySelector("[data-drawer='drawer-two']")

  drawer.init()
  expect(drawerOne).not.toHaveClass("is-open")
  expect(drawerTwo).not.toHaveClass("is-open")

  toggleOne.click()
  drawerOne.dispatchEvent(ev)
  toggleTwo.click()
  drawerTwo.dispatchEvent(ev)
  expect(drawerOne).toHaveClass("is-open")
  expect(drawerTwo).toHaveClass("is-open")

  const state = JSON.parse(localStorage.getItem("DrawerState"))
  expect(state).toMatchObject(drawer.state)
  expect(state["drawer-one"]).toMatch("is-open")
  expect(state["drawer-two"]).toMatch("is-open")
})

test("should update local storage when close button changes state", () => {
  document.body.innerHTML = markup
  drawer = new Drawer()
  localStorage.setItem("DrawerState", JSON.stringify({
    "drawer-one": "is-open",
    "drawer-two": "is-open"
  }))
  const closeOne = document.querySelector(".close-one")
  const closeTwo = document.querySelector(".close-two")
  const drawerOne = document.querySelector("[data-drawer='drawer-one']")
  const drawerTwo = document.querySelector("[data-drawer='drawer-two']")

  drawer.init()
  expect(drawerOne).toHaveClass("is-open")
  expect(drawerTwo).toHaveClass("is-open")

  closeOne.click()
  drawerOne.dispatchEvent(ev)
  closeTwo.click()
  drawerTwo.dispatchEvent(ev)
  expect(drawerOne).not.toHaveClass("is-open")
  expect(drawerTwo).not.toHaveClass("is-open")

  const state = JSON.parse(localStorage.getItem("DrawerState"))
  expect(state).toMatchObject(drawer.state)
  expect(state["drawer-one"]).toMatch("is-closed")
  expect(state["drawer-two"]).toMatch("is-closed")
})

test("should remove localStorage when state is disabled", () => {
  document.body.innerHTML = markup
  drawer = new Drawer({
    autoInit: true,
    saveState: false
  })
  expect(Object.getOwnPropertyNames(localStorage).length).toBe(0)
  expect(Object.getOwnPropertyNames(drawer.state).length).toBe(0)
})

test("should remove localStorage when state is disabled", () => {
  document.body.innerHTML = markup
  drawer = new Drawer({
    autoInit: true,
    saveKey: "awesome"
  })
  expect(localStorage).toHaveProperty("awesome")
})

test("should not save state if a modal drawer", () => {
  document.body.innerHTML = markup
  drawer = new Drawer({ autoInit: true })
  const state = JSON.parse(localStorage.getItem("DrawerState"))
  expect(state).not.toHaveProperty("drawer-three")
})
