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

    // Feature toggles
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

  const run = (event) => {
    // Trigger click
    const trigger = event.target.closest(`[data-${api.settings.dataOpen}]`)
    if (trigger) {
      const targetData = trigger.dataset[camelCase(api.settings.dataOpen)]
      const fromModal = event.target.closest(
        `[data-${api.settings.dataModal}]`
      )
      saveTrigger(trigger)
      close(fromModal)
      open(`[data-${api.settings.dataModal}="${targetData}"]`)
      event.preventDefault()
    } else {
      // Close click
      if (event.target.closest(`[data-${api.settings.dataClose}]`)) {
        close()
        event.preventDefault()
      }
      // Root click
      if (
        event.target.dataset[camelCase(api.settings.dataModal)] &&
        !event.target.hasAttribute(`data-${api.settings.dataRequired}`)
      ) {
        close()
      }
    }
  }

  const escape = (event) => {
    if (event.keyCode == 27) {
      const target = document.querySelector(
        `[data-${api.settings.dataModal}].${api.settings.stateOpen}`
      )
      if (target && !target.hasAttribute(`data-${api.settings.dataRequired}`)) {
        close()
      }
    }
  }

  const open = (selector) => {
    const target = document.querySelector(selector)
    if (target) {
      saveTarget(target)
      addClass(target, api.settings.stateOpening)
      target.addEventListener("transitionend", function _listener() {
        addClass(target, api.settings.stateOpen)
        removeClass(target, api.settings.stateOpening)
        setFocus(target)
        this.removeEventListener("transitionend", _listener, true)
      }, true)
    }
  }

  const close = (fromModal = false) => {
    const target = document.querySelector(
      `[data-${api.settings.dataModal}].${api.settings.stateOpen}`
    )
    if (target) {
      addClass(target, api.settings.stateClosing)
      removeClass(target, api.settings.stateOpen)
      target.addEventListener("transitionend", function _listener() {
        removeClass(target, api.settings.stateClosing)
        returnFocus(fromModal)
        this.removeEventListener("transitionend", _listener, true)
      }, true)
    }
  }

  const saveTarget = (target) => {
    if (api.settings.focus) {
      api.memoryTarget = target
    }
  }

  const saveTrigger = (trigger) => {
    if (api.settings.focus) {
      api.memoryTrigger = trigger
    }
  }

  const setFocus = () => {
    if (api.settings.focus && api.memoryTarget) {
      const innerFocus = api.memoryTarget.querySelector(
        `[data-${api.settings.dataFocus}]`
      )
      if (innerFocus) {
        innerFocus.focus()
      } else {
        api.memoryTarget.focus()
      }
      api.memoryTarget = null
    }
  }

  const returnFocus = () => {
    if (api.settings.focus && api.memoryTrigger) {
      api.memoryTrigger.focus()
      api.memoryTrigger = null
    }
  }

  if (api.settings.autoInit) api.init()
  return api
}
