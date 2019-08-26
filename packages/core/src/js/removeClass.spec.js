import { removeClass } from "./removeClass"
import { JSDOM } from "jsdom"
import "@testing-library/jest-dom/extend-expect"

const { document } = (new JSDOM(`<!DOCTYPE html>
  <h1 class="a b c">Hello world</h1>
  <p class="a b c">...</p>
  <p class="a b c">...</p>
`)).window

const h1 = document.querySelector("h1")
const p = document.querySelectorAll("p")

test("remove a single class from an element", () => {
  removeClass(h1, "a")
  expect(h1).not.toHaveClass("a")
})

test("remove multiple classes from an element", () => {
  removeClass(h1, "b", "c")
  expect(h1).not.toHaveClass("b", "c")
})

test("remove a single class from a NodeList", () => {
  removeClass(p, "a")
  p.forEach((el) => {
    expect(el).not.toHaveClass("a")
  })
})

test("remove multiple classes from a NodeList", () => {
  removeClass(p, "b", "c")
  p.forEach((el) => {
    expect(el).not.toHaveClass("b", "c")
  })
})
