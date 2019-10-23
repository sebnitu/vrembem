import { addClass, removeClass } from "@vrembem/core"

// TODO: Ability to toggle focus feature [1]
// TODO: Maybe move focus functionality into it's own methods [2]
// TODO: Make the selector params more usable [3]

export const Modal = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,

    // Data attributes
    selectorModal: "[data-modal]", // dataModal: "modal"
    selectorOpen: "[data-modal-open]", // dataOpen: "modal-open"
    selectorClose: "[data-modal-close]", // dataClose: "modal-close"
    selectorFocus: "[data-modal-focus]", // dataFocus: "modal-focus"
    selectorRequired: "[data-modal-required]", // dataRequired: "modal-required"

    // State classes
    // Default state: stateClosed: is-closed
    stateOpen: "is-open",
    stateOpening: "is-opening",
    stateClosing: "is-closing",
    // stateClosed: "is-closed",

    // Feature toggle
    focus: true // TODO: [1]
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
    memoryTrigger = null
    memoryTarget = null
    document.removeEventListener("click", run, false)
    document.removeEventListener("touchend", run, false)
    document.removeEventListener("keyup", escape, false)
  }

  api.open = (selector) => {
    open(selector)
  }

  api.close = (focus) => {
    close(focus)
  }

  const open = (selector) => {
    // Query the modal
    let target = document.querySelector(selector)

    // If modal exists
    if (target) {
      addClass(target, api.settings.stateOpening)

      target.addEventListener("transitionend", function _listener() {
        addClass(target, api.settings.stateOpen)
        removeClass(target, api.settings.stateOpening)

        // TODO: [2]
        // Search for the focus item if one exists
        let focus = target.querySelector(api.settings.selectorFocus)

        // Set the focus
        if (focus) {
          focus.focus()
        } else {
          target.focus()
        }

        // Save the open modal
        memoryTarget = target

        this.removeEventListener("transitionend", _listener, true)
      }, true)
    }
  }

  const close = (fromModal = false) => {

    // Get the open modal
    let target = document.querySelector(
      `${api.settings.selectorModal}.${api.settings.stateOpen}`
    )

    // If an open modal exists
    if (target) {
      addClass(target, api.settings.stateClosing)
      removeClass(target, api.settings.stateOpen)

      target.addEventListener("transitionend", function _listener() {
        removeClass(target, api.settings.stateClosing)

        // TODO: [2]
        // If it's not from modal and a trigger is saved to memory, focus it
        if (!fromModal && memoryTrigger) {
          // Set focus on initial trigger
          memoryTrigger.focus()
          // Clear the trigger from memory
          memoryTrigger = null
        }

        // Clear the target from memory
        memoryTarget = null

        this.removeEventListener("transitionend", _listener, true)
      }, true)
    }
  }

  const escape = () => {
    // If the escape key is pressed
    // and there's an open modal
    // and the modal is not required
    if (
      event.keyCode == 27 &&
      memoryTarget &&
      !memoryTarget.hasAttribute("data-modal-required")
    ) {
      close()
    }
  }

  const run = (event) => {
    const trigger = event.target.closest(api.settings.selectorOpen)
    if (trigger) {
      const targetData = trigger.dataset.modalOpen // TODO: [3]
      if (targetData) {

        // Is the trigger coming from a modal?
        let fromModal = event.target.closest(api.settings.selectorModal)

        // If it's not from a modal, save the trigger to memory
        if (!fromModal) {
          memoryTrigger = trigger
        }

        // Close modal and pass the context
        close(fromModal)

        // Open the target modal
        open(`[data-modal="${targetData}"]`)
      }

      event.preventDefault()
    } else {

      // If it's a close button
      if (event.target.closest(api.settings.selectorClose)) {
        close()
        event.preventDefault()
      }

      // If the root modal is clicked (screen)
      if (
        event.target.dataset.modal &&
        !event.target.hasAttribute("data-modal-required")
      ) {
        close()
      }
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
