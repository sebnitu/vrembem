import { addClass, camelCase, removeClass } from "@vrembem/core"

export const Modal = (options) => {

  let api = {}
  const defaults = {
    autoInit: false,

    // Data attributes
    dataModal: "modal",
    dataOpen: "modal-open",
    dataClose: "modal-close",
    dataFocus: "modal-focus",
    dataRequired: "modal-required",

    // State classes
    stateOpen: "is-open",
    stateOpening: "is-opening",
    stateClosing: "is-closing",
    stateClosed: "is-closed", // Default state

    // Feature toggle
    focus: true
  }

  api.settings = { ...defaults, ...options }

  api.memoryTrigger = null
  api.memoryTarget = null

  api.init = () => {
    document.addEventListener("click", run, false)
    document.addEventListener("touchend", run, false)
    document.addEventListener("keyup", escape, false)
  }

  api.destroy = () => {
    api.memoryTrigger = null
    api.memoryTarget = null
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
        getFocus(target)
        api.memoryTarget = target
        this.removeEventListener("transitionend", _listener, true)
      }, true)
    }
  }

  const close = (fromModal = false) => {

    // Get the open modal
    let target = document.querySelector(
      `[data-${api.settings.dataModal}].${api.settings.stateOpen}`
    )

    // If an open modal exists
    if (target) {
      addClass(target, api.settings.stateClosing)
      removeClass(target, api.settings.stateOpen)
      target.addEventListener("transitionend", function _listener() {
        removeClass(target, api.settings.stateClosing)
        returnFocus(fromModal)
        api.memoryTarget = null
        this.removeEventListener("transitionend", _listener, true)
      }, true)
    }
  }

  const getFocus = (target) => {
    if (api.settings.focus) {
      // Search for the focus item if one exists
      let focus = target.querySelector(`[data-${api.settings.dataFocus}]`)
      // Set the focus
      if (focus) {
        focus.focus()
      } else {
        target.focus()
      }
    }
  }

  const returnFocus = (fromModal) => {
    if (api.settings.focus) {
      // If it's not from modal and a trigger is saved to memory, focus it
      if (!fromModal && api.memoryTrigger) {
        // Set focus on initial trigger
        api.memoryTrigger.focus()
        // Clear the trigger from memory
        api.memoryTrigger = null
      }
    }
  }

  const escape = () => {
    // If the escape key is pressed
    // and there's an open modal
    // and the modal is not required
    if (
      event.keyCode == 27 &&
      api.memoryTarget &&
      !api.memoryTarget.hasAttribute(`data-${api.settings.dataRequired}`)
    ) {
      close()
    }
  }

  const run = (event) => {
    const trigger = event.target.closest(`[data-${api.settings.dataOpen}]`)
    if (trigger) {
      const targetData = trigger.dataset[camelCase(api.settings.dataOpen)]
      if (targetData) {
        // Is the trigger coming from a modal?
        let fromModal = event.target.closest(
          `[data-${api.settings.dataModal}]`
        )
        // If it's not from a modal, save the trigger to memory
        if (api.settings.focus && !fromModal) {
          api.memoryTrigger = trigger
        }
        // Close open modal with context
        // Open the target modal
        close(fromModal)
        open(`[data-modal="${targetData}"]`)
      }
      event.preventDefault()
    } else {
      // If it's a close button
      if (event.target.closest(`[data-${api.settings.dataClose}]`)) {
        close()
        event.preventDefault()
      }
      // If the root modal is clicked (screen)
      if (
        event.target.dataset[camelCase(api.settings.dataModal)] &&
        !event.target.hasAttribute(`data-${api.settings.dataRequired}`)
      ) {
        close()
      }
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
