import { Drawer } from "../index.js"
import "@testing-library/jest-dom/extend-expect"

let drawer, drawerOne, drawerTwo

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer" data-drawer="drawer-one"></div>
    <div class="drawer" data-drawer="drawer-two"></div>
  </div>
`

test("should restore state based on an existing values in local storage", () => {
  document.body.innerHTML = markup
  localStorage.setItem("DrawerState", JSON.stringify({
    "drawer-one": "is-open",
    "drawer-two": "is-open"
  }))
  drawer = new Drawer()
  drawerOne = document.querySelector("[data-drawer='drawer-one']")
  drawerTwo = document.querySelector("[data-drawer='drawer-two']")

  expect(drawerOne).not.toHaveClass("is-open")
  expect(drawerTwo).not.toHaveClass("is-open")

  drawer.init()
  expect(drawerOne).toHaveClass("is-open")
  expect(drawerTwo).toHaveClass("is-open")

  const state = JSON.parse(localStorage.getItem("DrawerState"))
  expect(state).toMatchObject(drawer.state)
})
