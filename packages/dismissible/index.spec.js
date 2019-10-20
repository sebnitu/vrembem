/**
 * @jest-environment jsdom
 */

import { Dismissible } from "./index.js"
import "@testing-library/jest-dom/extend-expect"

let dismissible

const dismissContent = `
  <div data-dismissible>
    <button data-dismiss></button>
  </div>
  <div class="a">
    <button class="b"></button>
  </div>
`

afterEach(() => {
  dismissible.destroy()
  document.body.innerHTML = null
})

test("dismiss using default settings", () => {
  dismissible = new Dismissible()
  document.body.innerHTML = dismissContent
  const el = document.querySelector("[data-dismissible]")
  const button = document.querySelector("[data-dismiss]")

  dismissible.init()
  expect(el).toBeInTheDocument()
  button.click()
  expect(el).not.toBeInTheDocument()
})

test("dismiss using custom settings and auto init", () => {
  dismissible = new Dismissible({
    autoInit: true,
    class: "c",
    target: ".a",
    trigger: ".b"
  })
  document.body.innerHTML = dismissContent
  const el = document.querySelector(".a")
  const button = document.querySelector(".b")

  expect(el).toBeInTheDocument()
  button.click()
  expect(el).not.toBeInTheDocument()
})

test("dismissible destroy method removes event listener", () => {
  dismissible = new Dismissible({
    autoInit: true
  })
  document.body.innerHTML = dismissContent
  const el = document.querySelector("[data-dismissible]")
  const button = document.querySelector("[data-dismiss]")

  expect(el).toBeInTheDocument()
  dismissible.destroy()
  button.click()
  expect(el).toBeInTheDocument()
})
