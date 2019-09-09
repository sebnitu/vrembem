import { Choice } from "./index"
import "@testing-library/jest-dom/extend-expect"

let choice

afterEach(() => {
  choice.destroy()
  document.body.innerHTML = null
})

describe("default settings with checkbox", () => {

  const choiceCheckbox = `
    <label class="choice">
      <input type="checkbox">
      <span>Choice label text</span>
    </label>
  `

  test("add active class when checkbox input changes", () => {
    choice = new Choice({ autoInit: true })
    document.body.innerHTML = choiceCheckbox
    const el = document.querySelector(".choice")
    const input = el.querySelector("input")

    el.click()
    expect(el).toHaveClass("is-active")
    expect(input.checked).toBe(true)
  })

  test("remove active class when checkbox input changes", () => {
    choice = new Choice({ autoInit: true })
    document.body.innerHTML = `
      <label class="choice is-active">
        <input type="checkbox" checked>
        <span>Choice label text</span>
      </label>
    `
    const el = document.querySelector(".choice")
    const input = el.querySelector("input")

    el.click()
    expect(el).not.toHaveClass("is-active")
    expect(input.checked).toBe(false)
  })

  test("destroy method properly removes event listener", () => {
    choice = new Choice({ autoInit: true })
    document.body.innerHTML = choiceCheckbox
    const el = document.querySelector(".choice")

    choice.destroy()
    el.click()
    expect(el).not.toHaveClass("is-active")
  })
})

describe("default settings with radio buttons", () => {

  const choiceRadio = `
    <label class="choice choice_yes">
      <input type="radio" name="choice">
      <span>Yes</span>
    </label>
    <label class="choice choice_no">
      <input type="radio" name="choice">
      <span>No</span>
    </label>
  `

  test("add active class when radio input changes", () => {
    choice = new Choice({ autoInit: true })
    document.body.innerHTML = choiceRadio
    const elYes = document.querySelector(".choice_yes")
    const elNo = document.querySelector(".choice_no")
    const inputYes = elYes.querySelector("input")
    const inputNo = elNo.querySelector("input")

    elYes.click()
    expect(elYes).toHaveClass("is-active")
    expect(inputYes.checked).toBe(true)
    expect(elNo).not.toHaveClass("is-active")
    expect(inputNo.checked).toBe(false)

    elNo.click()
    expect(elYes).not.toHaveClass("is-active")
    expect(inputYes.checked).toBe(false)
    expect(elNo).toHaveClass("is-active")
    expect(inputNo.checked).toBe(true)
  })
})

// Add test for focus state (.is-focus)
// Add tests for custom settings
