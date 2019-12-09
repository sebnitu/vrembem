import { Modal } from "../index.js"
import "@testing-library/jest-dom/extend-expect"

let modal
const ev = new Event("transitionend")

const markup = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div data-modal="modal-default" class="modal">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
    </div>
  </div>
`

afterEach(() => {
  modal.destroy()
  modal = null
  document.body.innerHTML = null
})

test("should open modal using api call", () => {
  document.body.innerHTML = markup
  modal = new Modal({ autoInit: true })
  const el = document.querySelector("[data-modal]")

  modal.open("modal-default")
  el.dispatchEvent(ev)

  expect(el).toHaveClass("modal is-open")
  expect(el.classList.length).toBe(2)
})

test("should close modal using api call", () => {
  document.body.innerHTML = markup
  modal = new Modal({ autoInit: true })
  const el = document.querySelector("[data-modal]")
  const btnOpen = document.querySelector("[data-modal-open]")

  btnOpen.click()
  el.dispatchEvent(ev)
  expect(el).toHaveClass("modal is-open")
  expect(el.classList.length).toBe(2)

  modal.close()
  el.dispatchEvent(ev)
  expect(el).toHaveClass("modal")
  expect(el.classList.length).toBe(1)
})

test("should fire callback when using open api", () => {
  document.body.innerHTML = markup
  modal = new Modal({ autoInit: true })
  const el = document.querySelector("[data-modal]")
  let callbackCheck = false

  modal.open("modal-default", () => {
    callbackCheck = true
  })
  el.dispatchEvent(ev)
  expect(callbackCheck).toBe(true)
})

test("should fire callback when using close api", () => {
  document.body.innerHTML = markup
  modal = new Modal({ autoInit: true })
  const el = document.querySelector("[data-modal]")
  let callbackCheck = false

  modal.open("modal-default")
  el.dispatchEvent(ev)

  modal.close(true, () => {
    callbackCheck = true
  })
  el.dispatchEvent(ev)
  expect(callbackCheck).toBe(true)
})

test("should properly destroy drawer instance on api call", () => {
  document.body.innerHTML = markup
  modal = new Modal({ autoInit: true })
  const el = document.querySelector("[data-modal]")
  const btnOpen = document.querySelector("[data-modal-open]")

  modal.destroy()
  btnOpen.click()
  el.dispatchEvent(ev)

  expect(modal.memoryTrigger).toBe(null)
  expect(modal.memoryTarget).toBe(null)
  expect(el).toHaveClass("modal")
  expect(el.classList.length).toBe(1)
})
