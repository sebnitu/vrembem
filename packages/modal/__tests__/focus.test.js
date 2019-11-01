import { Modal } from "../index.js"
import "@testing-library/jest-dom/extend-expect"

let modal
const ev = new Event("transitionend")

const markup = `
  <button data-modal-open="modal-one">Modal One</button>
  <button data-modal-open="modal-two">Modal Two</button>
  <div data-modal="modal-one" class="modal" tabindex="-1">
    <div class="modal__dialog">
      <button data-modal-close>Close</button>
      <button data-modal-open="modal-two">Modal Two</button>
    </div>
  </div>
  <div data-modal="modal-two" class="modal">
    <div class="modal__dialog">
      <button data-modal-close data-modal-focus>Close</button>
      <button data-modal-open="modal-one">Modal One</button>
    </div>
  </div>
`

afterEach(() => {
  modal.destroy()
  modal = null
  document.body.innerHTML = null
})

test("should focus modal when opened and refocus trigger when closed", () => {
  document.body.innerHTML = markup
  modal = new Modal({ autoInit: true })
  const el = document.querySelector("[data-modal='modal-one']")
  const btnOpen = document.querySelector("[data-modal-open='modal-one']")

  btnOpen.click()
  el.dispatchEvent(ev)
  expect(el).toHaveFocus()
})

test("should focus inner modal element and refocus trigger when closed", () => {
  document.body.innerHTML = markup
  modal = new Modal({ autoInit: true })
  const el = document.querySelector("[data-modal='modal-two']")
  const btnOpen = document.querySelector("[data-modal-open='modal-two']")
  const btnClose = el.querySelector("[data-modal-close]")

  btnOpen.click()
  el.dispatchEvent(ev)
  expect(btnClose).toHaveFocus()

  btnClose.click()
  el.dispatchEvent(ev)
  expect(btnOpen).toHaveFocus()
})

test("should remember initial trigger when opening modal through another modal", () => {
  document.body.innerHTML = markup
  modal = new Modal({ autoInit: true })
  const elOne = document.querySelector("[data-modal='modal-one']")
  const elTwo = document.querySelector("[data-modal='modal-two']")
  const btnOpen = document.querySelector("[data-modal-open='modal-one']")
  const btnTwo = elOne.querySelector("[data-modal-open='modal-two']")
  const btnClose = elTwo.querySelector("[data-modal-close]")

  btnOpen.click()
  elOne.dispatchEvent(ev)

  btnTwo.click()
  elOne.dispatchEvent(ev)
  elTwo.dispatchEvent(ev)

  btnClose.click()
  elTwo.dispatchEvent(ev)

  expect(btnOpen).toHaveFocus()
})

test("should disable focus handling when setting focus false", () => {
  document.body.innerHTML = markup
  modal = new Modal({
    autoInit: true,
    focus: false
  })
  const el = document.querySelector("[data-modal='modal-two']")
  const btnOpen = document.querySelector("[data-modal-open='modal-two']")
  const btnClose = el.querySelector("[data-modal-close]")

  btnOpen.click()
  el.dispatchEvent(ev)
  expect(el).toHaveClass("is-open")
  expect(btnClose).not.toHaveFocus()

  btnClose.click()
  el.dispatchEvent(ev)
  expect(el).not.toHaveClass("is-open")
  expect(btnOpen).not.toHaveFocus()
})
