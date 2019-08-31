import { Toggle } from "./index.js"
import "@testing-library/jest-dom/extend-expect"

let toggle

afterEach(() => {
  toggle.destroy()
  document.body.innerHTML = null
})

test("toggle using default settings", () => {
  toggle = new Toggle()
  document.body.innerHTML = `
    <button data-toggle>Button</button>
  `
  const button = document.querySelector("button")

  toggle.init()
  button.click()
  expect(button).toHaveClass("is-active")
  button.click()
  expect(button).not.toHaveClass("is-active")
})

test("toggle using a custom class", () => {
  toggle = new Toggle({ autoInit: true })
  document.body.innerHTML = `
    <button data-toggle="a">Button</button>
  `
  const button = document.querySelector("button")

  button.click()
  expect(button).toHaveClass("a")
  button.click()
  expect(button).not.toHaveClass("a")
})

describe("toggle target", () => {

  test("toggle a div using data-toggle-target attribute", () => {
    toggle = new Toggle({ autoInit: true })
    document.body.innerHTML = `
      <button data-toggle data-toggle-target="#target">Button</button>
      <div id="target"></div>
    `
    const button = document.querySelector("button")
    const div = document.getElementById("target")

    button.click()
    expect(div).toHaveClass("is-active")
    button.click()
    expect(div).not.toHaveClass("is-active")
  })

  test("toggle a custom class on div using data-toggle-target attribute", () => {
    toggle = new Toggle({ autoInit: true })
    document.body.innerHTML = `
      <button data-toggle="a" data-toggle-target="#target">Button</button>
      <div id="target"></div>
    `
    const button = document.querySelector("button")
    const div = document.getElementById("target")

    button.click()
    expect(div).toHaveClass("a")
    button.click()
    expect(div).not.toHaveClass("a")
  })

})

describe("toggle self", () => {

  test("toggle a class on list items and self", () => {
    toggle = new Toggle({ autoInit: true })
    document.body.innerHTML = `
      <button data-toggle="a" data-toggle-target=".b" data-toggle-self>
        Button
      </button>
      <ul>
        <li class="b">List item</li>
        <li class="b">List item</li>
        <li class="b">List item</li>
      </ul>
    `
    const button = document.querySelector("button")
    const li = document.querySelectorAll("li")

    button.click()
    expect(button).toHaveClass("a")
    li.forEach((item) => {
      expect(item).toHaveClass("a")
    })
  })

  test("toggle a class on list but a custom class on self", () => {
    toggle = new Toggle({ autoInit: true })
    document.body.innerHTML = `
      <button data-toggle="a" data-toggle-target=".b" data-toggle-self="c">
        Button
      </button>
      <ul>
        <li class="b">List item</li>
        <li class="b">List item</li>
        <li class="b">List item</li>
      </ul>
    `
    const button = document.querySelector("button")
    const li = document.querySelectorAll("li")

    button.click()
    expect(button).toHaveClass("c")
    li.forEach((item) => {
      expect(item).toHaveClass("a")
    })
  })

})
