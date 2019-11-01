import { Modal } from "../index.js"
import "@testing-library/jest-dom/extend-expect"

let modal
const ev = new Event("transitionend")

const markup = `
  <button data-modal-open="modal-default">Modal Default</button>
  <div data-modal="modal-default" class="modal" tabindex="-1">
    <div class="modal__dialog">
      <button data-modal-close data-modal-focus>Close</button>
    </div>
  </div>
`

afterEach(() => {
  modal.destroy()
  modal = null
  document.body.innerHTML = null
})

test("should focus inner modal element and refocus trigger when closed", () => {
  document.body.innerHTML = markup
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

test("should disable focus handling when setting focus false", () => {
  document.body.innerHTML = markup
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
