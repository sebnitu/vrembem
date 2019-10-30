import { Drawer } from "../index.js"
import "@testing-library/jest-dom/extend-expect"

let drawer

const markup = `
  <div class="drawer__wrapper">
    <div class="drawer drawer_modal" data-drawer="drawer-one" data-drawer-modal="md">
      <div class="drawer__item">
        <button data-drawer-close data-drawer-focus>Close</button>
      </div>
    </div>
    <div class="drawer" data-drawer="drawer-two" data-drawer-modal="400px">
      <div class="drawer__item">
        <button data-drawer-close data-drawer-focus>Close</button>
      </div>
    </div>
    <div class="drawer__main">
      <button data-drawer-toggle="drawer-one">Drawer Toggle</button>
      <button data-drawer-toggle="drawer-two">Drawer Toggle</button>
    </div>
  </div>
`

window.matchMedia = jest.fn().mockImplementation((query) => {
  let value = query.match(/\d+/)[0]
  let match = (query.includes("min-width")) ?
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

test("should remove default modal modifier when above breakpoint", () => {
  document.body.innerHTML = markup
  window.innerWidth = 1200
  window.dispatchEvent(new Event("resize"))
  drawer = new Drawer()
  const el = document.querySelector("[data-drawer='drawer-one']")
  const value = drawer.settings.breakpoint[el.dataset.drawerModal]

  expect(el).toHaveClass("drawer_modal")
  drawer.init()
  expect(el).not.toHaveClass("drawer_modal")
  expect(parseInt(value)).toBeLessThan(window.innerWidth)
})

test("should switch to modal when below media breakpoint", () => {
  document.body.innerHTML = markup
  window.innerWidth = 600
  window.dispatchEvent(new Event("resize"))
  drawer = new Drawer()
  const el = document.querySelector("[data-drawer='drawer-one']")
  const value = drawer.settings.breakpoint[el.dataset.drawerModal]

  drawer.init()
  expect(el).toHaveClass("drawer_modal")
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth)
})

test("should switch to modal when below custom pixel value", () => {
  document.body.innerHTML = markup
  window.innerWidth = 300
  window.dispatchEvent(new Event("resize"))
  drawer = new Drawer()
  const el = document.querySelector("[data-drawer='drawer-two']")
  const value = el.dataset.drawerModal

  expect(el).not.toHaveClass("drawer_modal")
  drawer.init()
  expect(el).toHaveClass("drawer_modal")
  expect(parseInt(value)).toBeGreaterThan(window.innerWidth)
})

// TODO: Test that using a custom modal class works
// TODO: Test that using a custom dataModal attribute works
// TODO: Test that using custom breakpoints object works
// TODO: Test that modal drawers removes active class
// TODO: Test that removing drawer mod also returns drawer to saved state
