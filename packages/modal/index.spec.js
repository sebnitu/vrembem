import { Modal } from "./index.js"
import "@testing-library/jest-dom/extend-expect"

let modal
const ev = new Event("transitionend")
const keyEv = new KeyboardEvent("keyup", {
  keyCode: 27
})

const modalDefault = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div data-modal="modal-default" class="modal" tabindex="-1">
    <div class="modal__dialog">
      <p>Modal Default</p>
      <button data-modal-close data-modal-focus>Close</button>
    </div>
  </div>
`

const modalRequired = `
  <button data-modal-open="modal-default">Modal Required</button>
  <div data-modal="modal-default" data-modal-required="true" class="modal" tabindex="-1">
    <div class="modal__dialog">
      <p>Modal Required</p>
      <button data-modal-close data-modal-focus>Close</button>
    </div>
  </div>
`

const modalCustom = `
  <button data-a-o="modal-default">Modal Custom</button>
  <div data-a="modal-default" class="modal" tabindex="-1">
    <div class="modal__dialog">
      <p>Modal Custom</p>
      <button data-a-c data-a-f>Close</button>
    </div>
  </div>
`

afterEach(() => {
  modal.destroy()
  modal = null
  document.body.innerHTML = null
})

test("should apply state classes on 'click' and 'transition end' events", () => {
  document.body.innerHTML = modalDefault
  modal = new Modal()
  const el = document.querySelector("[data-modal]")
  const btnOpen = document.querySelector("[data-modal-open]")
  const btnClose = document.querySelector("[data-modal-close]")

  modal.init()
  expect(el).toHaveClass("modal")

  btnOpen.click()
  expect(el).toHaveClass("is-opening")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("is-open")

  btnClose.click()
  expect(el).toHaveClass("is-closing")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("modal")
  expect(el).not.toHaveClass("is-opening")
  expect(el).not.toHaveClass("is-open")
  expect(el).not.toHaveClass("is-closing")
})

test("should focus inner modal element and refocus trigger when closed", () => {
  document.body.innerHTML = modalDefault
  modal = new Modal({ autoInit: true })
  const el = document.querySelector("[data-modal]")
  const btnOpen = document.querySelector("[data-modal-open]")
  const btnClose = document.querySelector("[data-modal-close]")

  btnOpen.click()
  el.dispatchEvent(ev)
  expect(btnClose).toHaveFocus()

  btnClose.click()
  el.dispatchEvent(ev)
  expect(btnOpen).toHaveFocus()
})

test("should close when root modal (screen) is clicked", () => {
  document.body.innerHTML = modalDefault
  modal = new Modal({ autoInit: true })
  const el = document.querySelector("[data-modal]")
  const dialog = document.querySelector(".modal__dialog")
  const btnOpen = document.querySelector("[data-modal-open]")

  btnOpen.click()
  el.dispatchEvent(ev)

  dialog.click()
  expect(el).not.toHaveClass("is-closing")

  el.click()
  expect(el).toHaveClass("is-closing")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("modal")
  expect(el.classList.length).toBe(1)
})

test("should close when the escape key is pressed", () => {
  document.body.innerHTML = modalDefault
  modal = new Modal({ autoInit: true })
  const el = document.querySelector("[data-modal]")
  const btnOpen = document.querySelector("[data-modal-open]")

  btnOpen.click()
  expect(el).toHaveClass("modal is-opening")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("modal is-open")

  document.dispatchEvent(keyEv)
  expect(el).toHaveClass("modal is-closing")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("modal")
  expect(el.classList.length).toBe(1)
})

test("should prevent escape or screen click closing modal if required", () => {
  document.body.innerHTML = modalRequired
  modal = new Modal({ autoInit: true })
  const el = document.querySelector("[data-modal]")
  const btnOpen = document.querySelector("[data-modal-open]")
  const btnClose = document.querySelector("[data-modal-close]")

  btnOpen.click()
  el.dispatchEvent(ev)

  document.dispatchEvent(keyEv)
  el.dispatchEvent(ev)
  expect(el).toHaveClass("modal is-open")

  el.click()
  el.dispatchEvent(ev)
  expect(el).toHaveClass("modal is-open")

  btnClose.click()
  el.dispatchEvent(ev)
  expect(el).toHaveClass("modal")
  expect(el.classList.length).toBe(1)
})

test("setting focus to 'false' should disable focus handling", () => {
  document.body.innerHTML = modalDefault
  modal = new Modal({
    autoInit: true,
    focus: false
  })
  const el = document.querySelector("[data-modal]")
  const btnOpen = document.querySelector("[data-modal-open]")
  const btnClose = document.querySelector("[data-modal-close]")

  btnOpen.click()
  el.dispatchEvent(ev)
  expect(btnClose).not.toHaveFocus()

  btnClose.click()
  el.dispatchEvent(ev)
  expect(btnOpen).not.toHaveFocus()
})

test("destroy should remove event listeners", () => {
  document.body.innerHTML = modalRequired
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

test("should apply state classes on 'click' and 'transition end' events using custom data attributes", () => {
  document.body.innerHTML = modalCustom
  modal = new Modal({
    autoInit: true,
    dataModal: "a",
    dataOpen: "a-o",
    dataClose: "a-c",
    dataFocus: "a-f",
    dataRequired: "a-r"
  })
  const el = document.querySelector("[data-a]")
  const btnOpen = document.querySelector("[data-a-o]")
  const btnClose = document.querySelector("[data-a-c]")

  expect(el).toHaveClass("modal")

  btnOpen.click()
  expect(el).toHaveClass("is-opening")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("is-open")

  btnClose.click()
  expect(el).toHaveClass("is-closing")

  el.dispatchEvent(ev)
  expect(el).toHaveClass("modal")
  expect(el).not.toHaveClass("is-opening")
  expect(el).not.toHaveClass("is-open")
  expect(el).not.toHaveClass("is-closing")
})
