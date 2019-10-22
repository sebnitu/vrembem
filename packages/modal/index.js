import { addClass, removeClass } from "@vrembem/core"

// TODO: Add ability to disable "modal" screen close
// TODO: Add ability to disable focus feature
// TODO: Figure out how to handle trigger memory for triggers inside modals
// TODO: Open a modal via URL hash or other params via URL
// TODO: Modal updates URL

export const Modal = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,
    selectorModal: "[data-modal]",
    selectorOpen: "[data-modal-open]",
    selectorClose: "[data-modal-close]",
    selectorFocus: "[data-modal-focus]",
    stateOpen: "is-open",
    stateOpening: "is-opening",
    stateClosing: "is-closing"
  }

  api.settings = { ...defaults, ...options }

  let memoryTrigger
  let memoryTarget

  api.init = () => {
    document.addEventListener("click", run, false)
    document.addEventListener("touchend", run, false)
    document.addEventListener("keyup", escape, false)
  }

  api.destroy = () => {
    memoryTarget = null
    memoryTrigger = null
    document.removeEventListener("click", run, false)
    document.removeEventListener("touchend", run, false)
    document.removeEventListener("keyup", escape, false)
  }

  api.open = (selector) => {
    open(document.querySelectorAll(selector))
  }

  const open = (target) => {
    addClass(target, api.settings.stateOpening)

    // TODO: Maybe move focus to it's own function
    let focus = target.querySelector(api.settings.selectorFocus)
    target.addEventListener("transitionend", function _listener() {
      addClass(target, api.settings.stateOpen)
      removeClass(target, api.settings.stateOpening)

      if (focus) {
        focus.focus()
      } else {
        target.focus()
      }
      this.removeEventListener("transitionend", _listener, true)
    }, true)

  }

  // TODO: Maybe add queue param for opening second modal?
  const close = () => {
    let target = document.querySelector(
      `${api.settings.selectorModal}.${api.settings.stateOpen}`
    )

    if (target) {
      addClass(target, api.settings.stateClosing)
      removeClass(target, api.settings.stateOpen)

      // TODO: Maybe move focus to it's own function
      target.addEventListener("transitionend", function _listener() {
        removeClass(target, api.settings.stateClosing)

        if (memoryTrigger) {
          memoryTrigger.focus()
        }

        memoryTarget = null
        memoryTrigger = null

        this.removeEventListener("transitionend", _listener, true)
      }, true)
    }
  }

  const escape = () => {
    if (event.keyCode == 27) {
      close()
    }
  }

  const run = (event) => {
    let trigger = event.target.closest(api.settings.selectorOpen)

    // If a trigger was clicked
    if (trigger) {

      // Close all open modals
      close()

      let targetData = trigger.dataset.modalOpen

      // Trigger with target value
      if (targetData) {
        memoryTarget = document.querySelector(`[data-modal="${targetData}"]`)
        memoryTrigger = trigger
        open(memoryTarget)
      }

      // Trigger with no value
      else {
        close()
      }

      event.preventDefault()
    } else {

      // If it's a close button
      if (event.target.closest(api.settings.selectorClose)) {
        close()
      }

      // If the root modal is clicked (screen)
      if (event.target.dataset.modal) {
        close()
      }
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
