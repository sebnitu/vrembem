import { Dismissible } from "./index.js"
import "@testing-library/jest-dom/extend-expect"

document.body.innerHTML = `
  <div data-dismissible>
    <button data-dismiss>Close</button>
  </div>
  <div class="a">
    <button class="b"></button>
  </div>
`

test("dismiss using default settings", () => {
  const dismissible = new Dismissible()
  const el = document.querySelector("[data-dismissible]")
  const button = document.querySelector("[data-dismiss]")

  dismissible.init()
  expect(el).not.toHaveClass("dismiss")
  button.click()
  expect(el).toHaveClass("dismiss")
})

test("dismiss using custom settings and auto init", () => {
  new Dismissible({
    autoInit: true,
    classToggle: "c",
    target: ".a",
    trigger: ".b"
  })
  const el = document.querySelector(".a")
  const button = document.querySelector(".b")

  expect(el).not.toHaveClass("c")
  button.click()
  expect(el).toHaveClass("c")
})

test("dismissible destroy method removes event listener", () => {
  const dismissible = new Dismissible({
    autoInit: true,
    classToggle: "a"
  })
  const el = document.querySelector("[data-dismissible]")
  const button = document.querySelector("[data-dismiss]")

  expect(el).not.toHaveClass("a")
  button.click()
  expect(el).toHaveClass("a")
  dismissible.destroy()
  button.click()
  expect(el).toHaveClass("a")
})
