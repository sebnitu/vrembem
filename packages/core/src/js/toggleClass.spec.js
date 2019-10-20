/**
 * @jest-environment jsdom
 */

import { toggleClass } from "./toggleClass"
import "@testing-library/jest-dom/extend-expect"

document.body.innerHTML = `<!DOCTYPE html>
  <h1 class="b c">Hello world</h1>
  <p class="b c">...</p>
  <p class="b c">...</p>
`

const h1 = document.querySelector("h1")
const p = document.querySelectorAll("p")

test("toggle a single class from an element", () => {
  toggleClass(h1, "a")
  expect(h1).toHaveClass("a")
})

test("toggle multiple classes from an element", () => {
  toggleClass(h1, "b", "c")
  expect(h1).not.toHaveClass("b", "c")
})

test("toggle a single class from a NodeList", () => {
  toggleClass(p, "a")
  p.forEach((el) => {
    expect(el).toHaveClass("a")
  })
})

test("toggle multiple classes from a NodeList", () => {
  toggleClass(p, "b", "c")
  p.forEach((el) => {
    expect(el).not.toHaveClass("b", "c")
  })
})
