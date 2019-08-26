import { addClass } from "./addClass"
import { JSDOM } from "jsdom"
import "@testing-library/jest-dom/extend-expect"

const { document } = (new JSDOM(`<!DOCTYPE html>
  <h1>Hello world</h1>
  <p>...</p>
  <p>...</p>
`)).window

const h1 = document.querySelector("h1")
const p = document.querySelectorAll("p")

test("add a single class to an element", () => {
  addClass(h1, "a")
  expect(h1).toHaveClass("a")
})

test("add multiple classes to an element", () => {
  addClass(h1, "b", "c")
  expect(h1).toHaveClass("b", "c")
})

test("add a single class to a NodeList", () => {
  addClass(p, "a")
  p.forEach((el) => {
    expect(el).toHaveClass("a")
  })
})

test("add multiple classes to a NodeList", () => {
  addClass(p, "b", "c")
  p.forEach((el) => {
    expect(el).toHaveClass("b", "c")
  })
})
