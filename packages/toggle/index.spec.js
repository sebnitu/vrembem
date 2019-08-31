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

test("toggle using multiple custom classes", () => {
  toggle = new Toggle({ autoInit: true })
  document.body.innerHTML = `
    <button data-toggle="a b, c">Button</button>
  `
  const button = document.querySelector("button")

  button.click()
  expect(button).toHaveClass("a b c")
  button.click()
  expect(button).not.toHaveClass("a b c")
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

describe("toggle parent", () => {

  test("toggle a class on parent element", () => {
    toggle = new Toggle({ autoInit: true })
    document.body.innerHTML = `
      <div class="a">
        <button data-toggle data-toggle-parent=".a">button</button>
      </div>
    `
    const button = document.querySelector("button")
    const div = document.querySelector("div.a")

    button.click()
    expect(button).not.toHaveClass("is-active")
    expect(div).toHaveClass("is-active")
  })

  test("toggle a class on an ancestor element", () => {
    toggle = new Toggle({ autoInit: true })
    document.body.innerHTML = `
    <div class="a">
      <div class="b">
        <div class="c">
          <button data-toggle data-toggle-parent=".a">button</button>
        </div>
      </div>
    </div>
    `
    const button = document.querySelector("button")
    const div = document.querySelector("div.a")

    button.click()
    expect(button).not.toHaveClass("is-active")
    expect(div).toHaveClass("is-active")
  })

})

describe("toggle sibling", () => {

  test("toggle a class on sibling elements", () => {
    toggle = new Toggle({ autoInit: true })
    document.body.innerHTML = `
      <div>
        <button data-toggle data-toggle-sibling="p">Button</button>
        <p>...</p>
        <p>...</p>
        <div>...</div>
      </div>
    `
    const button = document.querySelector("button")
    const siblings = document.querySelector("p")
    const div = document.querySelector("div div")

    button.click()
    expect(div).not.toHaveClass("is-active")
    expect(siblings).toHaveClass("is-active")
  })

})

describe("toggle child", () => {

  test("toggle a class child elements", () => {
    toggle = new Toggle({ autoInit: true })
    document.body.innerHTML = `
      <ul data-toggle data-toggle-child=".a, ul">
        <li class="a">List item</li>
        <li class="a">List item</li>
        <li>List item
          <ul>
            <li>List item</li>
            <li class="a">List item</li>
            <li class="a">List item</li>
          </ul>
        </li>
      </ul>
    `
    const trigger = document.querySelector("[data-toggle]")
    const children = document.querySelectorAll(".a, ul ul")

    trigger.click()
    expect(trigger).not.toHaveClass("is-active")
    children.forEach((el) => {
      expect(el).toHaveClass("is-active")
    })
  })

})

describe("the kitchen sink", () => {

  test("toggle a custom class on parent, sibling, children, custom target and the trigger itself", () => {
    toggle = new Toggle({ autoInit: true })
    document.body.innerHTML = `
    <div class="c">
      <button data-toggle="a" data-toggle-self="b"
        data-toggle-parent=".c"
        data-toggle-sibling="p"
        data-toggle-child="span"
        data-toggle-target="#target">
        <span>@</span>
        <span>Button</span>
      </button>
      <p>...</p>
      <p>...</p>
      <div class="d"></div>
    </div>
    <div id="target"></div>
    `
    const button = document.querySelector("button")
    const target = document.getElementById("target")
    const parent = document.querySelector("div.c")
    const sibling = document.querySelectorAll("target")
    const children = document.querySelectorAll("[data-toggle] span")
    const div = document.querySelector("div.d")

    button.click()
    expect(button).toHaveClass("b")
    expect(target).toHaveClass("a")
    expect(parent).toHaveClass("a")
    expect(div).not.toHaveClass("a")
    sibling.forEach((el) => {
      expect(el).toHaveClass("a")
    })
    children.forEach((el) => {
      expect(el).toHaveClass("a")
    })
  })

})
