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
    selectorRequired: "[data-modal-required]",
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

      // TODO: Maybe move focus to it's own function
      // Search for the focus item if one exists
      let focus = target.querySelector(api.settings.selectorFocus)

      target.addEventListener("transitionend", function _listener() {
        addClass(target, api.settings.stateOpen)
        removeClass(target, api.settings.stateOpening)

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

  // TODO: Maybe add queue param for opening second modal?
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
    if (memoryTarget && event.keyCode == 27) {
      // If the open target is not required
      if (!memoryTarget.closest(api.settings.selectorRequired)) {
        close()
      }
    }
  }

  const run = (event) => {
    // Save the trigger
    let trigger = event.target.closest(api.settings.selectorOpen)

    // If a trigger was clicked
    if (trigger) {

      // Get the target data from the trigger
      let targetData = trigger.dataset.modalOpen

      // Trigger with target value
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
        !event.target.closest(api.settings.selectorRequired)
      ) {
        close()
      }
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
