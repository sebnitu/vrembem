import { hasClass } from "./hasClass"

document.body.innerHTML = `<!DOCTYPE html>
  <h1 class="a">Hello world</h1>
  <p class="b">...</p>
  <p class="b e">...</p>
`

const h1 = document.querySelector("h1")
const p = document.querySelectorAll("p")

test("check that a class exists on an element", () => {
  let result = hasClass(h1, "a")
  expect(result).toBe(true)
})

test("check that a class doesn't exists on an element", () => {
  let result = hasClass(h1, "b")
  expect(result).toBe(false)
})

test("check that a class exists in a NodeList", () => {
  let result = hasClass(p, "b")
  expect(result).toBe(true)
})

test("check that a class doesn't exists in a NodeList", () => {
  let result = hasClass(p, "c")
  expect(result).toBe(false)
})

test("check a list of classes to see if some exist in a NodeList", () => {
  let result = hasClass(p, "c", "d", "e")
  expect(result).toBe(true)
})
