import { Drawer } from "../index.js"
import "@testing-library/jest-dom/extend-expect"

let drawer, drawerOne, drawerTwo, btnOpenOne, btnOpenTwo, btnCloseOne, btnCloseTwo
const ev = new Event("transitionend")

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer drawer_pos_left is-open" data-drawer="drawer-one">
      <div class="drawer__item">
        <button class="close-one" data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer drawer_pos_right" data-drawer="drawer-two">
      <div class="drawer__item">
        <button class="close-two" data-drawer-close>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button class="open-one" data-drawer-toggle="drawer-one">
        Drawer Toggle
      </button>
      <button class="open-two" data-drawer-toggle="drawer-two">
        Drawer Toggle
        </button>
    </div>
  </div>
`

describe("save drawer state via local storage", () => {

  beforeAll(() => {
    document.body.innerHTML = markup
    drawer = new Drawer({ autoInit: true })
    drawerOne = document.querySelector("[data-drawer='drawer-one']")
    drawerTwo = document.querySelector("[data-drawer='drawer-two']")
    btnOpenOne = document.querySelector(".open-one")
    btnOpenTwo = document.querySelector(".open-two")
    btnCloseOne = document.querySelector(".close-one")
    btnCloseTwo = document.querySelector(".close-two")
  })

  test("should save initial drawer state to local storage", () => {
    const state = JSON.parse(localStorage.getItem("DrawerState"))
    expect(state).toMatchObject(drawer.state)
    expect(drawerOne).toHaveClass(state["drawer-one"])
    expect(state["drawer-two"]).toMatch("is-closed")
  })

  test("button toggle click should update state", () => {
    btnOpenOne.click()
    drawerOne.dispatchEvent(ev)

    btnOpenTwo.click()
    drawerTwo.dispatchEvent(ev)

    const state = JSON.parse(localStorage.getItem("DrawerState"))
    expect(state).toMatchObject(drawer.state)
    expect(state["drawer-one"]).toMatch("is-closed")
    expect(drawerTwo).toHaveClass(state["drawer-two"])
  })

  test("button close click should update state", () => {
    btnCloseOne.click()
    drawerOne.dispatchEvent(ev)

    btnCloseTwo.click()
    drawerTwo.dispatchEvent(ev)

    const state = JSON.parse(localStorage.getItem("DrawerState"))
    expect(state).toMatchObject(drawer.state)
    expect(state["drawer-one"]).toMatch("is-closed")
    expect(state["drawer-two"]).toMatch("is-closed")
  })
})
