import { Checkbox } from "../index.js"

let checkbox

const markup = `
  <input type="checkbox" aria-checked="mixed">
`

afterEach(() => {
  checkbox.destroy()
  checkbox = null
  document.body.innerHTML = null
})

test("set checkboxes to indeterminate on init", () => {
  document.body.innerHTML = markup
  checkbox = new Checkbox()
  const input = document.querySelector("[type='checkbox']")

  checkbox.init()
  expect(input.indeterminate).toBe(true)
})

test("click event removes aria checked attribute", () => {
  document.body.innerHTML = markup
  checkbox = new Checkbox({ autoInit: true })
  const input = document.querySelector("[type='checkbox']")

  expect(input.hasAttribute("aria-checked")).toBe(true)
  expect(input.indeterminate).toBe(true)
  input.click()
  expect(input.hasAttribute("aria-checked")).toBe(false)
  expect(input.indeterminate).toBe(false)
})

test("destroy should remove event listener", () => {
  document.body.innerHTML = markup
  checkbox = new Checkbox({ autoInit: true })
  const input = document.querySelector("[type='checkbox']")

  checkbox.destroy()
  input.click()
  expect(input.hasAttribute("aria-checked")).toBe(true)
  expect(input.indeterminate).toBe(true)
})

test("set aria checked state attribute", () => {
  document.body.innerHTML = `
    <input type="checkbox">
  `
  checkbox = new Checkbox({ autoInit: true })
  const input = document.querySelector("[type='checkbox']")

  expect(input.hasAttribute("aria-checked")).toBe(false)
  expect(input.indeterminate).toBe(false)

  checkbox.setAriaState(input)
  expect(input.hasAttribute("aria-checked")).toBe(true)
  expect(input.indeterminate).toBe(false)
})

test("remove aria checked state attribute", () => {
  document.body.innerHTML = markup
  checkbox = new Checkbox({ autoInit: true })
  const input = document.querySelector("[type='checkbox']")

  expect(input.hasAttribute("aria-checked")).toBe(true)
  expect(input.indeterminate).toBe(true)

  checkbox.removeAriaState(input)
  expect(input.hasAttribute("aria-checked")).toBe(false)
  expect(input.indeterminate).toBe(true)
})

test("set indeterminate based on state attribute", () => {
  document.body.innerHTML = markup
  checkbox = new Checkbox({ autoInit: true })
  const input = document.querySelector("[type='checkbox']")

  expect(input.hasAttribute("aria-checked")).toBe(true)
  expect(input.indeterminate).toBe(true)

  checkbox.removeAriaState(input)
  checkbox.setIndeterminate(input)
  expect(input.hasAttribute("aria-checked")).toBe(false)
  expect(input.indeterminate).toBe(false)
})

test("custom options are passed and used properly", () => {
  document.body.innerHTML = `
    <input type="checkbox" data-status="indeterminate">
  `
  checkbox = new Checkbox({
    stateAttr: "data-status",
    stateValue: "indeterminate"
  })
  const input = document.querySelector("[type='checkbox']")

  checkbox.init()
  expect(input.hasAttribute("data-status")).toBe(true)
  expect(input.indeterminate).toBe(true)

  checkbox.removeAriaState(input)
  checkbox.setIndeterminate(input)
  expect(input.hasAttribute("data-status")).toBe(false)
  expect(input.indeterminate).toBe(false)

  checkbox.setAriaState(input)
  checkbox.setIndeterminate(input)
  expect(input.hasAttribute("data-status")).toBe(true)
  expect(input.indeterminate).toBe(true)
})
